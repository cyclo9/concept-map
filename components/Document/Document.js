import { useState, useEffect, useMemo, useRef, forwardRef } from 'react'
import { createEditor } from 'slate'
import { Editable, withReact, Slate } from 'slate-react'
import { withHistory } from 'slate-history'
import useSWR from 'swr'
// Remark
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkBreaks from 'remark-breaks'
// Rehype
import rehypeMathjax from 'rehype-mathjax'
import isHotkey from 'is-hotkey'

import styles from "./document.module.css"
import { updateData } from '@/lib/api'
import { ProcessMD } from '@/lib/md'
import { calcMaxScrollTop, calcScaledScrollTop } from '@/lib/syncScroll'
import Loading from '@/components/Loading/Loading.js'

const Document = ({ nodeId, color }) => {
    // * ### Data Fetching ###
    const fetcher = url => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/data?id=${nodeId}`, fetcher, { refreshInterval: 500 })

    // * Reference Hooks
    const editorRef = useRef(null)
    const previewRef = useRef(null)

    // * Shared State
    const [value, setValue] = useState()

    // * ### Synchronized Scrolling ###
    const [scroller, setScroller] = useState(null)

    function scrollPreview(e) {
        const editorMaxScrollTop = calcMaxScrollTop(editorRef.current.scrollHeight, editorRef.current.clientHeight)
        const previewMaxScrollTop = calcMaxScrollTop(previewRef.current.scrollHeight, previewRef.current.clientHeight)
        if (scroller != 'PREVIEW') {
            const editorCurrentScrollTop = e.target.scrollTop
            previewRef.current.scrollTop = calcScaledScrollTop(editorCurrentScrollTop, editorMaxScrollTop, previewMaxScrollTop)
        }
    } 
    
    function scrollEditor(e) {
        const editorMaxScrollTop = calcMaxScrollTop(editorRef.current.scrollHeight, editorRef.current.clientHeight)
        const previewMaxScrollTop = calcMaxScrollTop(previewRef.current.scrollHeight, previewRef.current.clientHeight)
        if (scroller != 'EDITOR') {
            const previewCurrentScrollTop = e.target.scrollTop
            editorRef.current.scrollTop = calcScaledScrollTop(previewCurrentScrollTop, previewMaxScrollTop, editorMaxScrollTop)
        }
    }

    if (isLoading) return <Loading color={color} />
    return (
        <>
            <div className={styles.document}>
                <Editor
                    nodeId={nodeId}
                    ref={editorRef}
                    data={data}
                    value={value}
                    setValue={setValue}
                    setScroller={setScroller}
                    scrollPreview={scrollPreview}
                />
                <Preview
                    ref={previewRef}
                    data={data}
                    value={value}
                    setScroller={setScroller}
                    scrollEditor={scrollEditor}
                />
            </div>
        </>
    )
}
export default Document

const Editor = forwardRef(({ nodeId, data, value, setValue, setScroller, scrollPreview }, ref) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const state = useRef(data);

    // * Save Indicator
    const [isSaved, setSaved] = useState(true)
    useEffect(() => {
        if (isSaved) ref.current.style.borderColor = 'black'
        if (!isSaved) ref.current.style.borderColor = '#00bfff'
    }, [isSaved])

    // ? Scroller
    const mouseEnter = () => setScroller('EDITOR')
    const mouseLeave = () => setScroller(null)

    return (
        <>
            <div
                ref={ref}
                className={styles.editor}
                onScroll={scrollPreview}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
            >
                <Slate
                    editor={editor}
                    value={data} // Initial value
                    onChange={newValue => {
                        setSaved(false)
                        setValue(newValue)
                        state.current = newValue
                    }}
                >
                    <Editable
                        editor={editor}
                        onKeyDown={e => {
                            switch (e.key) {
                                case 'Enter':
                                    e.preventDefault()
                                    editor.insertText('\n'.toString())
                                    break
                                case 'Tab':
                                    e.preventDefault()
                                    editor.insertText('  '.toString())
                                    break
                                case '\\':
                                    e.preventDefault()
                                    editor.insertText('\\'.toString())
                            }

                            if (isHotkey('mod+s', e)) {
                                e.preventDefault()
                                updateData(nodeId, state.current)
                                setSaved(true)
                            }
                        }}
                    />
                </Slate>
            </div>
        </>
    )
})

const Preview = forwardRef(({ data, value, setScroller, scrollEditor }, ref) => {
    const [md, setMD] = useState(ProcessMD(data)) // Initial value

    useEffect(() => {
        if (value != undefined) setMD(ProcessMD(value))
    }, [value])

    // ? Scroller
    const mouseEnter = () => setScroller('PREVIEW')
    const mouseLeave = () => setScroller(null)

    return (
        <>
            <div
                ref={ref}
                className={styles.preview}
                onScroll={scrollEditor}
                onMouseEnter={mouseEnter}
                onMouseLeave={mouseLeave}
            >
                <ReactMarkdown
                    children={md}
                    remarkPlugins={[
                        remarkBreaks,
                        remarkGfm,
                        remarkMath,
                    ]}
                    rehypePlugins={[
                        rehypeMathjax,
                    ]}
                />
            </div>
        </>
    )
})
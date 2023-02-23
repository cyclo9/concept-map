import { useState, useEffect, useMemo, useRef, forwardRef } from 'react'
import { createEditor } from 'slate'
import { Editable, withReact, Slate } from 'slate-react'
import { withHistory } from 'slate-history'
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
import Loading from '@/components/Loading/Loading.js'

// * ##### DOCUMENT #####
const Document = ({ nodeId, color }) => {
    // * ##### DOCUMENT LOGIC #####
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/data?id=${nodeId}`, {
            method: 'GET',
            cache: 'default',
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    // * Editor & Preview Reference Hooks
    const editorRef = useRef(null)
    const previewRef = useRef(null)

    // Editor border turns blue when changes are unsaved
    const [isSaved, setSaved] = useState(true)
    useEffect(() => {
        if (isSaved) editorRef.current.style.borderColor = 'black'
        if (!isSaved) editorRef.current.style.borderColor = '#00bfff '
    }, [isSaved])

    // Sync editor and preview scrollbars
    const [scroller, setScroller] = useState(null)
    const scrollPreview = (e) => { if (scroller != 'PREVIEW') previewRef.current.scrollTop = e.target.scrollTop } 
    const scrollEditor = (e) => { if (scroller != 'EDITOR') editorRef.current.scrollTop = e.target.scrollTop - 10 }

    return (
        <>
            <div className={styles.document}>
                {/* //* ##### PREVIEW ##### */}
                <PreviewWrapper
                    ref={previewRef}
                    scrollEditor={scrollEditor}
                    setScroller={setScroller}
                >
                    {
                        !isLoading ?
                            <Preview
                                value={data}
                            />
                            : <Loading color={color} />
                    }
                </PreviewWrapper>
                
                {/* //* ##### EDITOR ##### */}
                <EditorWrapper
                    ref={editorRef}
                    scrollPreview={scrollPreview}
                    setScroller={setScroller}
                >
                    {
                        !isLoading ?
                            <Editor
                                nodeId={nodeId}
                                value={data}
                                setData={setData}
                                setSaved={setSaved}
                            />
                            : <Loading color={color} />
                    }
                </EditorWrapper>
            </div>
        </>
    )
}
export default Document

// * ##### EDITOR #####
const Editor = ({ nodeId, value, setData, setSaved }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <>
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => {
                    if (value != newValue) setSaved(false)
                    setData(newValue)
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
                        updateData(nodeId, value)
                        setSaved(true)
                    }
                }}
            />
            </Slate>
        </>
    )
}

// * ##### EDITOR #####
const EditorWrapper = forwardRef(({ children, scrollPreview, setScroller }, ref) => {
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
                {children}
            </div>
        </>
    )
})

// * ##### PREVIEW #####
const Preview = ({ value }) => {
    const [md, setMd] = useState('')
    
    useEffect(() => {
        setMd(value[0].children[0].text)
    }, [value])

    return (
        <>
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
        </>
    )
}

// * ##### PREVIEW LAYOUT #####
const PreviewWrapper = forwardRef(({ children, scrollEditor, setScroller }, ref) => {
    const mouseEnter = () => setScroller('PREVIEW')
    const mouseLeave = () => setScroller(null)

    return (
        <div
            ref={ref}
            className={styles.preview}
            onScroll={scrollEditor}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
        >
            {children}
        </div>
    )
})
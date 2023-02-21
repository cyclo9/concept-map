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

    return (
        <>
            <div className={styles.document}>
                <PreviewWrapper>
                    {
                        !isLoading ?
                            <Preview
                                value={data}
                            />
                            : <Loading color={color} />
                    }
                </PreviewWrapper>
                {
                    !isLoading ?
                        <Editor
                            nodeId={nodeId}
                            value={data}
                            setData={setData}
                        />
                        : <div className={styles.editor}>
                            <Loading color={color} />
                        </div>
                }
            </div>
        </>
    )
}
export default Document

// * ##### EDITOR #####
const Editor = ({ nodeId, value, setData }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const [isSaved, setSaved] = useState(true);
    const savedRef = useRef(null)

    useEffect(() => {
        if (isSaved) savedRef.current.style.borderColor = 'black'
        if (!isSaved) savedRef.current.style.borderColor = '#00bfff '
    })

    return (
        <>
            <div ref={savedRef} className={styles.editor}>
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
            </div>
        </>
    )
}

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
const PreviewWrapper = ({ children }) => {
    return (
        <div className={styles.preview}>
            {children}
        </div>
    )
}
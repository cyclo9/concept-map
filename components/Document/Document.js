import { useState, useEffect, useMemo } from 'react'
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
                <EditorWrapper>
                    {
                        !isLoading ?
                            <Editor
                                nodeId={nodeId}
                                value={data}
                                setData={setData}
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
const Editor = ({ nodeId, value, setData }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <>
            <Slate
                editor={editor}
                value={value}
                onChange={newValue => setData(newValue)}
            >
            <Editable
                editor={editor}
                // onChange={editor.onChange}
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
                    }
                }}
            />
            </Slate>
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

// * ##### EDITOR LAYOUT #####
const EditorWrapper = ({ children }) => {
    return (
        <div className={styles.editor}>
            {children}
        </div>
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
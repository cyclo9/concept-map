'use client'

import { useState, useEffect, useRef } from "react"

export default function Login({
	children,
	hash
}: {
	children: React.ReactNode,
	hash: string
}) {

    const crypto = require('crypto')
    const [isLogin, setLogin] = useState<boolean>(false)
    const [insult, setInsult] = useState<string>('') 

    const inputRef = useRef<null | HTMLInputElement>(null)
    
    const insults = [
        '"???"',
        '"lf password"',
        '"remember better"',
        '"you people are the reason why a 1200 SAT score is still in the 90th percentile"'
    ]

	useEffect(() => {
        inputRef.current!.focus()
    }, [])

    const genRandomInt = (max: number): number => {
        return Math.floor(Math.random() * max)
    }

    const authenticate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const input = (e.target as HTMLInputElement).value
            const digest = crypto.createHash('sha256')
                .update(input)
                .digest('hex')
            
            if (digest == hash) {
                setLogin(true)
            } else {
                setInsult(insults[genRandomInt(4)])
            }
        } 
    }
    
	return (
		<>
			{isLogin ? children :
				<div className='bg-[#333] w-screen h-screen flex flex-col justify-center items-center gap-y-5'>
					<input
						ref={inputRef}
						className='w-36 pl-1 rounded'
                        type='password'
                        onKeyDown={authenticate}
                    />
                    <p className='italic text-[red]'>{insult}</p>
				</div>}
		</>
	)
}
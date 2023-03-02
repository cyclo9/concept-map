import { useEffect, useRef } from 'react'

import styles from './login.module.css'

const Login = ({ setStatus, _ }) => {
    const crypto = require('crypto')
    
    const input = useRef(null)

    useEffect(() => {
        input.current.focus()
    })

    function authenticate(e) {
        if (e.keyCode === 13) {
            const value = e.target.value
            const digest = crypto.createHash('sha256')
                .update(value)
                .digest('hex')
            
            if (digest == _) {
                setStatus(true)
            } else {
                // Insert insults in RED
                /**
                 * '???'
                 * 'lf password'
                 * 'remember better'
                 * 'you people are the reason why 1200 sat score is still the 90th percentile'
                 * 'Saved Passwords' scheme (big clown emoji)
                 */
            }
        }
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.login}>
                    <Centerbox>
                        <p className={styles.text}>Login</p>
                    </Centerbox>
                    <Centerbox>
                        <input
                            ref={input}
                            className={styles.input}
                            type='password'
                            onKeyDown={authenticate}
                        />
                    </Centerbox>
                    <Centerbox>
                        <p className={styles.insult}></p>
                    </Centerbox>
                </div>
            </div>
        </>
    )
}
export default Login

const Centerbox = ({ children }) => {
    return (
        <>
            <div className={styles.centerbox}>
                {children}
            </div>
        </>
    )
}
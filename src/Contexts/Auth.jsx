import React, { createContext, useContext, useState, useEffect } from 'react'
const Context = createContext()

const LoginProvider = ({children})=>{

    const [tokenVerified, setTokenVerified] = useState(false)
    const [state, setState] = useState(window.localStorage.getItem('token'))

    function verifyToken () {
        fetch('http://localhost:9000/verify', {
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${state}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setTokenVerified(true)
                setState(data.token)
                return window.localStorage.setItem('token', data.token)
            }
            setTokenVerified(false),
            setState(null),
            window.localStorage.removeItem('token')    
        })
    }
    
    useEffect(()=>{
        if(!localStorage.getItem('token') && state){
            window.localStorage.setItem('token', state)
        }
    },[state])


    useEffect(()=>{
        if(!tokenVerified){
            verifyToken()
        }
    },[tokenVerified])

    const value = {
        state,
        setState
    }
    
    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    ()=> children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useLogin = (setterOnly) =>{
    const { state, setState } = useContext(Context)
    return setterOnly ? [setState] : [state,setState]
}

export {
    LoginProvider,
    useLogin
}
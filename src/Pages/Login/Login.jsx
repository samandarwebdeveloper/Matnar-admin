import "./Login.scss"

import { useState } from "react";

import Logo from "../../Assets/image/matnar-logo.png"
import Input from "../../Components/Input/Input";


function Login() {

    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");


    const fetchLogin = async () => {
        if(name === "" || password === "") {
            return setError("Please fill all fields");
        }
        const response = await fetch("http://localhost:9000/login", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        })
        const data = await response.json()
        if(data.token) {
            localStorage.setItem("token", data.token)
            window.location.href = "/"
        } else {
            setError("Invalid username or password")
        }
    }


    const handlePasswordShow = () => {
        const icon = document.getElementById("password-icon");
        icon.className === "fa-solid fa-eye" ? icon.className = "fa-solid fa-eye-slash" : icon.className = "fa-solid fa-eye";
        const passwordInput = document.getElementById("password-input");
        passwordInput.type === "password" ? passwordInput.type = "text" : passwordInput.type = "password";
    }

    const handleSubmit = () => {
        fetchLogin();
    }



    return (
        <div className="Auth">
            <div className="Auth__header">
                <img className="Auth__header-logo" src={Logo} alt="Site logo" />
            </div>
            <div className="Auth__body">
                    <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                        <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
                        </g>
                    </svg>
                    </div>
            </div>
            <div className="Auth__body-form">
                <div className="Auth__body-form-box">
                    <h2>Login</h2>
                    <Input type="text" error={error} onChange={(e) => setName(e.currentTarget.value)}  placeholder="Name" />
                    <div className="password-wrap">
                        <input 
                            className={error ? "input input-error" : "input"} 
                            id="password-input" 
                            type="password" 
                            onChange={(e) => setPassword(e.currentTarget.value)} placeholder="Password" 
                            onKeyDown={(e) => e.key === "Enter" ? handleSubmit() : null}
                        />
                        <button onClick={handlePasswordShow} className="hidePassword"><i id="password-icon" className="fa-solid fa-eye"></i></button>
                        {error && <p className="error">{error}</p>}
                    </div>
                    <button onClick={handleSubmit} className="Auth__body-form-box-btn">Login</button>
                </div>
            </div>
            <div>
            <svg className="waves2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(31,31,31,0.7" />
                <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(31,31,31,0.5)" />
                <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(31,31,31,0.3)" />
                <use xlinkHref="#gentle-wave" x={48} y={7} fill="#1f1f1f" />
                </g>
            </svg>
            </div>
        </div>
    );
}


export default Login;
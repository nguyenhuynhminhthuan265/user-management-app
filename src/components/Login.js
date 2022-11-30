import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import {useForm} from "react-hook-form";

function Login() {
    const domainLocal = `http://127.0.0.1:8085/api/auth/login`
    const domainHost = `https://auth01-v2.nauht.fun/api/auth/login`
    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorLogin, setIsErrorLogin] = useState(false)
    const [messageError, setMessageError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("sessionId");
    })

    const onSubmit = (data) => {
        console.log(data)
        axios.post(`${domainLocal}`, {
            username: data.username,
            email: data.email,
            password: data.password
        })
            .then(res => {
                console.log(res.data);
                const user = res.data;
                localStorage.setItem("sessionId", user.userId)
                localStorage.setItem("userLogin", JSON.stringify(user))
                navigate('/groups')
            })
            .catch(err => {
                console.log(err);
                setIsErrorLogin(true)
                setMessageError("Check email and password again !!!")
            })
        // let users = JSON.parse(localStorage.getItem("listUserSignUp"));
        // if (users === null) {
        //     setIsErrorLogin(true)
        //     setMessageError("Account is not found!!!")
        //     console.log("Account is not found!!!")
        // }

        // for (const user of users) {
        //     console.log(user)
        //     if (data.email === user.email && data.password === user.password) {
        //         localStorage.setItem("sessionId", user.userId)
        //         localStorage.setItem("userLogin", JSON.stringify(user))
        //
        //         navigate('/groups')
        //     } else {
        //         setIsErrorLogin(true)
        //         setMessageError("Check email and password again !!!")
        //     }
        // }

    }

    return (
        <section className='body-register'>
            <div className="">
                <div className="text-center">
                    <h2>Login page</h2>
                    <span>login service</span>
                    <form id='form' className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email"
                            }
                        })}
                               placeholder="Email"
                               value={email}
                               onChange={event => setEmail(event.target.value)}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <input type="password" {...register("password")}
                               placeholder="Password"
                               value={password}
                               onChange={event => setPassword(event.target.value)}

                        />

                        <button className='btn'>Login</button>
                    </form>

                </div>
                <div className="col-2"></div>
                <div className="text-center">
                    <p>Do you have an account ? <Link to="/sign-up">Sign up</Link></p>
                </div>
                {isErrorLogin && messageError.trim().length > 0 &&
                    <div className="text-center text-danger"><p>{messageError}</p></div>}
            </div>
        </section>
    )
}

export default Login
import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from "axios";
import '../stylesheet/signUp.css';
import {useNavigate} from "react-router-dom";
import uuid from "react-uuid";

function SignUp() {
    const domainLocal = `http://127.0.0.1:8085/api/auth/sign-up`
    const domainHost = `https://auth01-v2.nauht.fun/api/auth/sign-up`
    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [goToDashboard, setGoToDashboard] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        axios.post(`${domainHost}`, {
            username: data.username,
            email: data.email,
            password: data.password
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setUsername('')
                setEmail('')
                setPassword('')
                alert(res.data)

                // success -> go to dashboard
                setGoToDashboard(true)
                setIsRegistered(true)
                console.log("go to dashboard")
                localStorage.setItem("sessionId", uuid())
                navigate("/groups")
            })
            .catch(err => {
                console.log(err.response.data)
                alert(err.response.data)
            })
    }

    console.log(watch('username'));
    return (
        <section className='body-register'>
            <div className="">
                <div className="text-center">
                    <h2>Registration</h2>
                    <span>register service</span>
                    <form id='form' className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("username")}
                               placeholder="Username" value={username}
                               onChange={event => setUsername(event.target.value)}

                        />
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

                        <button className='btn'>Sign up</button>
                    </form>

                </div>
                <div className="col-2"></div>
            </div>
        </section>
    )
}

export default SignUp
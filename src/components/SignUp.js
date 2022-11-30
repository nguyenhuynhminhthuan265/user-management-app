import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from "axios";
import '../stylesheet/signUp.css';
import {useNavigate} from "react-router-dom";
import uuid from "react-uuid";
import {Link} from 'react-router-dom';

function SignUp() {
    const domainLocal = `http://127.0.0.1:8085/api/auth/sign-up`
    const domainHost = `https://auth01-v2.nauht.fun/api/auth/sign-up`
    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isErrorSignUp, setIsErrorSignUp] = useState(false)
    const [messageError, setMessageError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("sessionId");
    })
    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const isUserExist = (user) => {
        let users = localStorage.getItem("listUserSignUp");
        if (isJsonString(users)) users = JSON.parse(users)
        else users = []

        if (users === null || users === undefined) users = []

        for (const item of users) {
            if (item.email === user.email) {
                return true;
            }
        }
        return false;
    }

    const onSubmit = (data) => {
        console.log(data)
        axios.post(`${domainLocal}`, {
            username: data.username,
            email: data.email,
            password: data.password
        })
            .then(res => {
                    console.log("res: ", res)
                    setUsername('')
                    setEmail('')
                    setPassword('')
                    // save user in local -> temporary -> in the future, build back-end API login
                    let users = localStorage.getItem("listUserSignUp");

                    // Validate null and undefined object
                    if (users === null || users === undefined) users = []

                    // Validate object is jsonString
                    if (isJsonString(users)) users = JSON.parse(users)
                    else users = []

                    const newUser = {
                        userId: uuid(),
                        username: data.username,
                        email: data.email,
                    }

                    // Check newUser sign up is exist in DB
                    if (isUserExist(newUser) === true) {
                        setIsErrorSignUp(true);
                        setMessageError("User is existed in DB")
                    } else {
                        users.push(newUser)
                        localStorage.setItem("listUserSignUp", JSON.stringify(users))
                        navigate("/login")
                    }

                }
            )
            .catch(err => {
                console.log(err)
                alert(err)
            })
    }

    // console.log(watch('username'));
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
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        <input type="password" {...register("password")}
                               placeholder="Password"
                               value={password}
                               onChange={event => setPassword(event.target.value)}

                        />
                        {/*{errors.password && <p className="text-danger">{errors.password.message}</p>}*/}

                        <button className='btn'>Sign up</button>
                    </form>

                </div>
                <div className="col-2"></div>
                <div className="text-center">
                    <p>Do you have an account ? <Link to="/login">Sign in</Link></p>
                </div>
                {isErrorSignUp && messageError.trim().length > 0 &&
                    <div className="text-center text-danger"><p>{messageError}</p></div>}
            </div>
        </section>
    )
}

export default SignUp
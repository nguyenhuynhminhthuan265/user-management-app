import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import picProfile from '../images/profile.jpg'
import '../stylesheet/profile.css';
import axios from "axios";

function UserProfile() {
    const domainLocal = `http://127.0.0.1:8085`
    const domainHost = `https://management-app-be.nauht.fun`
    const navigate = useNavigate();
    const [user, setUser] = useState({userId: "", username: "", email: "", role: ""});
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        if (userLogin === null || userLogin === undefined) {
            navigate("/login");
        }
        axios.get(`${domainHost}/api/users/${userLogin.userId}/profile`)
            .then(res => {
                console.log("data: ", res?.data);
                setUser(res?.data)
            }).catch(err => {
            console.log(err);
            alert("Cannot get profile");
        })
    }, [])

    const onClickHome = () => {
        navigate("/groups")
    }
    return (
        <div className='userProfile'>
            <div id='headerProfile'>
                <div className='headerLeft'>
                    <img width="70%" height="70%" src={picProfile}></img>
                    <h5>{user.username}</h5>
                </div>
                <div className='headerRight'>
                    <button onClick={() => onClickHome()}>Home</button>
                </div>
            </div>
            <div className='informationProfile'>
                <div className='title'>
                    <h6>General information</h6>
                </div>
                <div className='detail'>
                    <ul>
                        <li>
                            <span>Username</span>
                            <p>{user.username}</p>
                        </li>
                        <li>
                            <span>Email</span>
                            <p>{user.email}</p>
                        </li>
                        <li>
                            <span>Role</span>
                            <p>{user.role}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import picProfile from '../images/profile.jpg'
import '../stylesheet/header.css';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import {Image} from "react-bootstrap";


function Header() {
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        setUserId(userLogin.userId);
    }, [])


    return (
        <Dropdown className='dropdownHeader'>
            <h2>App Management</h2>
            <Dropdown.Toggle variant="white">
                <Image src={picProfile} width="60%" height="60%"></Image>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href={`/users/${userId}/profile`}>My Profile</Dropdown.Item>
                <Dropdown.Item href={`/login`}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Header
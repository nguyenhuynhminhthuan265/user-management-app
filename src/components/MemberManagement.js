import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import uuid from "react-uuid";
import * as emailjs from "@emailjs/browser";

function MemberManagement() {
    // const SERVICE_ID = "service_bi5icza";
    // const TEMPLATE_ID = "template_qtotivj";
    const {groupId} = useParams()
    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm()
    const [user, setUser] = useState({userId: "", username: "", email: "", role: ""});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            navigate('/sign-up')
        }
        if (localStorage.getItem("localUsers")) {
            const storedList = JSON.parse(localStorage.getItem("localUsers"));
            setUsers(storedList);
        }
        // setUsers(location.state.members ? location.state.members : [])
        if (localStorage.getItem("mapMembersByGroupId")) {
            const mapMembersByGroupId = JSON.parse(localStorage.getItem("mapMembersByGroupId"));
            const members = mapMembersByGroupId[groupId];
            setUsers(members ? members : []);
        } else {
            setUsers([])
        }
    }, [])

    function handleChange(evt) {
        console.log(`element onchange user: `, evt);
        const value = evt.target.value;
        setUser({
            ...user,
            [evt.target.name]: value
        });
    }

    const addMember = (e) => {
        if (user) {
            // const newGroup = {userId: new Date().getTime().toString(), username: user};
            // setUsers([...users, newGroup]);
            // localStorage.setItem("localUsers", JSON.stringify([...users, newGroup]));
            // setUser({userId: "", username: "", email: "", isAdmin: ""});

            user.userId = uuid()
            user.role = "member"
            users.push(user)
            setUsers(users)
            console.log(users)
            setUser({userId: "", username: "", email: "", role: ""})

            // Send mail
            // let templateParams = {
            //     name: 'James',
            //     notes: 'Check this out!'
            // };
            //
            // emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            //     .then(function (response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //     }, function (error) {
            //         console.log('FAILED...', error);
            //     });
            console.log(groupId);

            let mapMembersByGroupId = new Map();
            mapMembersByGroupId[groupId] = users;
            console.log(mapMembersByGroupId)
            localStorage.setItem("mapMembersByGroupId", JSON.stringify(mapMembersByGroupId));
        }
    };

    const handleDelete = (user) => {
        const deleted = users.filter((t) => t.userId !== user.userId);
        setUsers(deleted);
        localStorage.setItem("localUsers", JSON.stringify(deleted))
    }

    const handleClear = () => {
        setUsers([]);
        localStorage.removeItem("localUsers");
    }

    const Logout = () => {
        localStorage.removeItem("sessionId");
        navigate("/login");
    }

    return (
        <div>
            <div className="d-flex flex-row-reverse bd-highlight">
                <form id='form-logout' className="p-2 bd-highlight" onSubmit={Logout}>
                    <button className='btn bg-primary material-icons'>logout</button>
                </form>
            </div>

            <div className="container row">
                <h1 className="mt-3 text-black">Member Management</h1>
                <div className="col-12">
                    <input
                        name="username"
                        type="text"
                        value={user.username}
                        placeholder="Username..."
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 mt-3">
                    <input
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email"
                            }
                        })}
                        name="email"
                        type="text"
                        value={user.email}
                        placeholder="Email..."
                        className="form-control"
                        onChange={handleChange}

                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="col-4 justify-content-center"></div>
                <div className="col-4 justify-content-center mt-3">
                    <button
                        className="btn btn-primary form-control material-icons"
                        onClick={handleSubmit(addMember)}
                    >
                        add
                    </button>
                </div>
                <div className="badge">
                    You have
                    {!users.length
                        ? " no users"
                        : users.length === 1
                            ? " 1 user"
                            : users.length > 1
                                ? ` ${users.length} users`
                                : null}
                </div>
                {users.map((user) => (
                    <React.Fragment key={user.userId}>
                        <div className="col-11">
                            <button
                                className="form-control bg-white btn mt-2"
                                style={{textAlign: "left", fontWeight: "bold"}}
                            >
                                {user.username}
                            </button>
                        </div>

                        <div className="col-1">
                            <button
                                className=" mt-2 btn btn-warning material-icons"
                                onClick={() => handleDelete(user)}
                            >delete
                            </button>
                        </div>
                    </React.Fragment>
                ))}
                {!users.length ? null : (
                    <div>
                        <button className="btn btn-secondary  mt-4 mb-4" onClick={() => handleClear()}>
                            Clear
                        </button>
                    </div>
                )}
            </div>
        </div>

    )
}

export default MemberManagement
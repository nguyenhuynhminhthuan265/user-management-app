import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

function MemberManagement() {
    const [user, setUser] = useState({userId: "", username: "", email: "", isAdmin: ""});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            navigate('/sign-up')
        }
        if (localStorage.getItem("localUsers")) {
            const storedList = JSON.parse(localStorage.getItem("localUsers"));
            setUsers(storedList);
        }
    }, [])

    const addGroup = (e) => {
        if (user) {
            const newGroup = {userId: new Date().getTime().toString(), username: user};
            setUsers([...users, newGroup]);
            localStorage.setItem("localUsers", JSON.stringify([...users, newGroup]));
            setUser({userId: "", username: "", email: [], isAdmin: ""});
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

    return (
        <div className="container row">
            <h1 className="mt-3 text-black">Member Management</h1>
            <div className="col-8">
                <input
                    name="user"
                    type="text"
                    value={user.username}
                    placeholder="Add member..."
                    className="form-control"
                    onChange={(e) => {
                        console.log(`element onchange user: `, e);
                        setUser(e.target.value)
                    }}
                />
            </div>
            <div className="col-4">
                <button
                    className="btn btn-primary form-control material-icons"
                    onClick={addGroup}
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
    )
}

export default MemberManagement
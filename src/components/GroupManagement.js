import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function GroupManagement() {
    const [group, setGroup] = useState({groupId: "", groupName: "", members: [], admin: ""});
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("sessionId")) {
            navigate('/sign-up')
        }
        if (localStorage.getItem("localGroups")) {
            const storedList = JSON.parse(localStorage.getItem("localGroups"));
            setGroups(storedList);
        }
    }, [])

    const addGroup = (e) => {
        if (group) {
            const newGroup = {groupId: new Date().getTime().toString(), groupName: group};
            setGroups([...groups, newGroup]);
            localStorage.setItem("localGroups", JSON.stringify([...groups, newGroup]));
            setGroup({groupId: "", groupName: "", members: [], admin: ""});
        }
    };

    const handleDelete = (group) => {
        const deleted = groups.filter((t) => t.groupId !== group.groupId);
        setGroups(deleted);
        localStorage.setItem("localGroups", JSON.stringify(deleted))
    }

    const handleClear = () => {
        setGroups([]);
        localStorage.removeItem("localGroups");
    }

    const getMembersOfGroup = (group) => {
        console.log(`groupId: ${group.groupId}`)
        navigate(`/groups/${group.groupId}/members`, {state: group})
    }
    return (
        <div className="container row">
            <h1 className="mt-3 text-black">Group Management</h1>
            <div className="col-8">
                <input
                    name="group"
                    type="text"
                    value={group.groupName}
                    placeholder="Add Group..."
                    className="form-control"
                    onChange={(e) => {
                        console.log(`element onchange group: `, e);
                        setGroup(e.target.value)
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
                {!groups.length
                    ? " no groups"
                    : groups.length === 1
                        ? " 1 group"
                        : groups.length > 1
                            ? ` ${groups.length} groups`
                            : null}
            </div>
            {groups.map((group) => (
                <React.Fragment key={group.groupId}>
                    <div className="col-11">
                        <button
                            className="form-control bg-white btn mt-2"
                            style={{textAlign: "left", fontWeight: "bold"}}
                            onClick={() => getMembersOfGroup(group)}
                        >
                            {group.groupName}
                        </button>
                    </div>

                    <div className="col-1">
                        <button
                            className=" mt-2 btn btn-warning material-icons"
                            onClick={() => handleDelete(group)}
                        >delete
                        </button>
                    </div>
                </React.Fragment>
            ))}
            {!groups.length ? null : (
                <div>
                    <button className="btn btn-secondary  mt-4 mb-4" onClick={() => handleClear()}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

import {BrowserRouter as Router, Routes, Route, useLocation, Link} from "react-router-dom";
import GroupManagement from "./components/GroupManagement";
import SignUp from "./components/SignUp";
import MemberManagement from "./components/MemberManagement";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import {useEffect, useState} from "react";
import Header from "./components/Header";

function App() {
    const [isShowHeader, setIsShowHeader] = useState(true);
    useEffect(() => {
        console.log('current Pathname 👉️', window.location.pathname);
        const path = window.location.pathname;
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        if (userLogin === null || userLogin === undefined || path === '/login' || path === '/sign-up') {
            setIsShowHeader(false)
        }
    }, [])
    return (
        <div>
            {/*{isShowHeader ? <Header/> : <div></div>}*/}
            <div className="container border border-primary rounded mt-5">
                <Router>
                    <Routes>
                        <Route path='/' element={<SignUp/>}/>
                        <Route path='/sign-up' element={<SignUp/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/groups' element={<><Header/><GroupManagement/></>}/>
                        <Route path='/groups/:groupId/members' element={<><Header/><MemberManagement/></>}/>
                        <Route path='/users/:userId/profile' element={<><Header/><UserProfile/></>}/>
                        {/*<Route element={<Header/>}>*/}
                        {/*    <Route path='/groups' element={<GroupManagement/>}/>*/}
                        {/*    <Route path='/groups/:groupId/members' element={<MemberManagement/>}/>*/}
                        {/*    <Route path='/users/:userId/profile' element={<UserProfile/>}/>*/}
                        {/*</Route>*/}
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import GroupManagement from "./components/GroupManagement";
import SignUp from "./components/SignUp";
import MemberManagement from "./components/MemberManagement";

function App() {
    return (
        <div className="container border border-primary rounded mt-5">
            <Router>
                <Routes>
                    <Route path='/' element={<SignUp/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/groups' element={<GroupManagement/>}/>
                    <Route path='/groups/:groupId/members' element={<MemberManagement/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

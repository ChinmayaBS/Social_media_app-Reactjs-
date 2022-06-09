import Home from "./pages/home/Home";
import {HashRouter,Routes,Route} from 'react-router-dom';
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Profile from "./pages/profile/Profile";
import { Navigate } from "react-router";

function App() {
  let useremail=localStorage.getItem("useremail");
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={useremail?<Home/>:<Navigate replace to="/Register"/>}/>
        <Route exact path="/Login" element={useremail?<Navigate replace to="/" />:<Login/>} />
        <Route exact path="/Register" element={useremail?<Navigate replace to="/" />:<Register/>} />
        <Route exact path="/Profile/:username/:uid" element={<Profile/>} />
      </Routes>
    </HashRouter>
  );
}
export default App;


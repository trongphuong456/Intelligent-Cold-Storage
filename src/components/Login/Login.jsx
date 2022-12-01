import React, {useState} from 'react'
import './Login.css'
import "./font/themify-icons/themify-icons.css";
import {useNavigate} from "react-router-dom"


 function LoginApp({ onSubmit }) {
    const [userNameLabelUserName, setUerNameLabelUserName] = useState('');
    const [userNameLabelPassword, setUserNameLabelPassword] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [valuePassword, setValuePassword] = useState('');

    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const HandleSubmit = (e) => {
        e.preventDefault();
        const data = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        };
        onSubmit(data);}

    // localStorage.setItem("access token", content.token);
    // localStorage.getItem("access") => Do something 
   
  return (
    <div id="Login">
        <div className="login-component" >
            <form className="form-login" onSubmit={HandleSubmit}>
                <h1>LOGIN</h1>
                <div className="form-text">
                    <label className={userNameLabelUserName}>Username</label>
                    <input 
                        ref={usernameRef}
                        type="text" value={valueInput} onChange={(e) => setValueInput(e.target.value) }
                        onMouseEnter={() => {if(valueInput === "") {setUerNameLabelUserName('focus')}}}
                        onMouseLeave={() => {if( valueInput === "" ) {
                            setUerNameLabelUserName('')
                        }}}    
                    />
                </div>
                <div className="form-text">
                    <label className={userNameLabelPassword}>Password</label>
                    <input 
                        ref={passwordRef}
                        type="password" value={valuePassword} onChange={(e) => setValuePassword(e.target.value)}
                        onMouseEnter={() => setUserNameLabelPassword('focus')}
                        onMouseLeave={() => {if(valuePassword === ""){
                            setUserNameLabelPassword('')
                        }}} 
                    />
                </div>
                <button >Login Now</button>
                <i className="ti-facebook"></i>
                <i className="ti-github"></i>
                <i className="ti-twitter-alt"></i>
            </form>
        </div>
    </div>  
  )
}
const Login = () => {
    let navigate = useNavigate();
    const HandleSubmit = (data) => {
      if (data.username === "phuong123" && data.password === "123456") {
        // routing to ... /mainDashBoard (localhost:3000/mainDashBoard)
  
        const getToken = async () => {
          var authData = {
            username: "nguyentrongphuong99hbl@gmail.com",
            password: "123456",
          };
          const tokenResponse = await fetch(
            "http://iotmind.ddns.net:9090/api/auth/login",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(authData),
            }
          );
          const content = await tokenResponse.json();
          localStorage.setItem("access token", content.token);
          if (localStorage.getItem("access token") !== null) {
            navigate("/home");
          } else {
            navigate("/");
          }
        };
        getToken();
        
      } else {
        alert("Sai thong tin dang nhap");
      }
    };
    return (
      <div >
        <LoginApp onSubmit={HandleSubmit} />
      </div>
    );
  };




export default Login
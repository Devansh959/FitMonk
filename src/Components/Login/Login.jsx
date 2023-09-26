import React, { useState } from 'react'
import styles from "./Login.module.css"
import Inputcontrol from '../InputControl/Inputcontrol'
import { Link , useNavigate } from 'react-router-dom'
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase";


const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email:"",
    pass:"",
    
  });
  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisabled , setSubmitButtonDisabled]=  useState(false);
  const handleSubmission = ()=>{
    if(!values.email || !values.pass){
      setErrorMsg("Please fill all the fields!");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email,values.pass)
    .then(async (res)=>{
      setSubmitButtonDisabled(false);
      navigate('/');
      
    })
    .catch((err)=>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message)
      });
  }
  return (
    
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className="heading">Login</h1>
            <Inputcontrol label="Email" placeholder="Enter email address" onChange={(e)=> setValues((prev)=>({...prev, email: e.target.value}))}/>
            <Inputcontrol label="Password" placeholder="Enter Password" type="Password" onChange={(e)=> setValues((prev)=>({...prev, pass: e.target.value}))}/>
            <div className={styles.footer}>
              <b className={styles.error}>{errorMsg}</b>
                <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
                <p>Don't have an account?{" "}
                <span>
                    <Link to="/signup">Sign up</Link>
                </span>
                </p>
            </div>
        </div>

    </div>
    
  )
}

export default Login
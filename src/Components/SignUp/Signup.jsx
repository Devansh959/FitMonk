import React, { useState } from 'react'
import styles from "./Signup.module.css"
import Inputcontrol from '../InputControl/Inputcontrol'
import { Link,useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword , updateProfile} from "firebase/auth"
import {auth,db} from "../../firebase"
import { addDoc,collection, setDoc,doc } from 'firebase/firestore'

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name:"",
    email:"",
    pass:"",
    
  });
 
  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisabled , setSubmitButtonDisabled]=  useState(false);
  const handleSubmission = ()=>{
    if(!values.name || !values.email || !values.pass){
      setErrorMsg("Please fill all the fields!");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email,values.pass)
    .then(async (res)=>{
      setSubmitButtonDisabled(false);
      const user= res.user;
      await updateProfile(user,{
        displayName: values.name,
      });
      await setDoc(doc(db, "users", user.uid), {
        displayName: values.name,
        email: values.email,
        role: "staff"
      });
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   displayName: values.name,
      //   email: values.email,
      //   role: "staff"
      // });
      console.log(errorMsg);
      navigate('/');
      
      console.log(user);
    })
    .catch((err)=>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message)
      });
  }

  return (
    
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className="heading">Sign up</h1>
            <Inputcontrol label="Name" placeholder="Enter your name" type="text" onChange={(e)=>setValues((prev)=>({...prev, name: e.target.value}))}/>
            <Inputcontrol label="Email" placeholder="Enter email address" type="email" onChange={(e)=>setValues((prev)=>({...prev, email: e.target.value}))}/>
            <Inputcontrol label="Password" placeholder="Enter Password" type="Password" onChange={(e)=>setValues((prev)=>({...prev, pass: e.target.value}))}/>
            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>Sign up</button>
                <p>Already have an account?{" "}
                <span>
                    <Link to="/Login">Login</Link>
                </span>
                </p>
            </div>
        </div>

    </div>
    
  )
}

export default Signup
import React, { useState } from 'react'
import styles from "./Signup.module.css"
import Inputcontrol from '../InputControl/Inputcontrol'
import { Link } from 'react-router-dom'
const Signup = () => {
  const [values, setValues] = useState({

  });
  return (
    
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className="heading">Sign up</h1>
            <Inputcontrol label="Name" placeholder="Enter your name"/>
            <Inputcontrol label="Email" placeholder="Enter email address"/>
            <Inputcontrol label="Password" placeholder="Enter Password"/>
            <div className={styles.footer}>
                <button>Sign up</button>
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
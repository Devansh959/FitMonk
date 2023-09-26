import React from 'react'
import styles from "./Login.module.css"
import Inputcontrol from '../InputControl/Inputcontrol'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className="heading">Login</h1>
            <Inputcontrol label="Email" placeholder="Enter email address"/>
            <Inputcontrol label="Password" placeholder="Enter Password"/>
            <div className={styles.footer}>
                <button>Login</button>
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
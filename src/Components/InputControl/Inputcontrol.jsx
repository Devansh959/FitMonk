import React from 'react'
import styles from "./Inputcontrol.module.css"
const Inputcontrol = (props) => {
  return (
    <div className={styles.container}>
        {props.label && <label>{props.label}</label>}
        <input {...props}/>
    </div>
  )
}

export default Inputcontrol
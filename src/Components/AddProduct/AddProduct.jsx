import React, { useState } from 'react'
import styles from "./Addproduct.module.css"
import Inputcontrol from '../InputControl/Inputcontrol'
import { Link,useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword , updateProfile} from "firebase/auth"
import {auth,db} from "../../firebase"
import { addDoc,collection, setDoc,doc } from 'firebase/firestore'

const AddProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Name:"",
    Description:"",
    Price:"",
    Qty:""
    
  });
 
  const [errorMsg,setErrorMsg] = useState("");
  const [submitButtonDisabled , setSubmitButtonDisabled]=  useState(false);
  const handleSubmission = async()=>{
    if(!values.Name || !values.Description || !values.Price || !values.Qty){
      setErrorMsg("Please fill all the fields!");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    await addDoc(collection(db, "Products"), {
        Name: values.Name,
        Description: values.Description,
        Price: values.Price,
        Qty:values.Qty
      });
      setSubmitButtonDisabled(false);
      navigate("/product");

    
  }

  return (
    
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h1 className="heading">Add Product</h1>
            <Inputcontrol label="Name" placeholder="Enter product" type="text" onChange={(e)=>setValues((prev)=>({...prev, Name: e.target.value}))}/>
            <Inputcontrol label="Description" placeholder="Enter Description" type="text" onChange={(e)=>setValues((prev)=>({...prev, Description: e.target.value}))}/>
            <Inputcontrol label="Price" placeholder="Enter Price" type="text" onChange={(e)=>setValues((prev)=>({...prev, Price: e.target.value}))}/>
            <Inputcontrol label="Qty" placeholder="Enter Quantity" type="text" onChange={(e)=>setValues((prev)=>({...prev, Qty: e.target.value}))}/>
            <div className={styles.footer}>
                <b className={styles.error}>{errorMsg}</b>
                <button onClick={handleSubmission} disabled={submitButtonDisabled}>Add Product</button>
                
            </div>
        </div>

    </div>
    
  )
}

export default AddProduct
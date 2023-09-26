import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import  styles from "./Product.module.css"
import ImgMediaCard from '../Card/Card'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { getDocs,collection } from 'firebase/firestore';




const Product = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Products')); 
        const fetchedData = [];

        querySnapshot.forEach((doc) => {
          
          const item = {
            id: doc.id, 
            ...doc.data(), 
          };
          fetchedData.push(item);
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.maincontainer}>
      {props.userRole!="staff" &&
    <div className={styles.btn}>
     
    <Link to="/product/addproduct">
    <Button color="warning" variant="contained" startIcon={<AddCircleOutline />}>
      Add Product
    </Button></Link>
    </div>}
    <div className={styles.container}>
    {data.map((item) => (
          <ImgMediaCard product={item} key={item.id} userRole={props.userRole}/>
        ))}
        
        
    </div>
    </div>
  )
}

export default Product
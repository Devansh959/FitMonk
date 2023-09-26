import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';


export default function ImgMediaCard(props) {
    const navigate = useNavigate();
    
    const handleDelete = ()=>{
        const documentRef = doc(db, "Products", props.product.id);
        deleteDoc(documentRef)
        .then(() => {
            console.log("Document successfully deleted!");
        })
        .catch((error) => {
            console.error("Error deleting document:", error);
        });
        navigate("/product");

    }
  return (
    <Card sx={{ maxWidth: 300, margin: 2 }}>
    
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.product.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.product.Description}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Price: ${props.product.Price}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Qty: {props.product.Qty}
        </Typography>
      </CardContent>
      <CardActions>
    {props.userRoles!="staff" && 
    <Link to={`/product/edit/${props.product.id}`}>
    <Button color="primary" variant="contained" startIcon={<Edit />}>
      Edit
    </Button>
    </Link>}
    {props.userRoles!="staff" && 
    <Button color="error" variant="contained" startIcon={<Delete />} onClick={handleDelete}>
      Delete 
    </Button>}

      </CardActions>
    </Card>
  );
}

import React, { useEffect, useState } from 'react';
import styles from "./EditProduct.module.css";
import Inputcontrol from '../InputControl/Inputcontrol';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate= useNavigate();
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const documentRef = doc(db, "Products", params.productId);

    // Fetch the document
    getDoc(documentRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          console.log("Document data:", data);
          setProduct(data);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  }, [params.productId]);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    qty: ""
  });

  // Initialize the values state with product data
  useEffect(() => {
    setValues({
      name: product.Name || "", // Provide default values to match the structure of your product data
      description: product.Description || "",
      price: product.Price || "",
      qty: product.Qty || ""
    });
  }, [product]);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    const collectionName = "Products";
    const productId = params.productId;
    const productRef = doc(db, collectionName, productId);

    const updatedData = {
      Name: values.name,
      Description: values.description,
      Price: values.price,
      Qty: values.qty
    };

    setSubmitButtonDisabled(true);
    updateDoc(productRef, updatedData)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      })
      .finally(() => {
        setSubmitButtonDisabled(false);
      });
      navigate("/product");

  };

  return (
    <div className={styles.container}>
      <div className={styles.innerbox}>
        <h1 className="heading">Update Product</h1>
        <Inputcontrol
          label="Name"
          placeholder="Enter product"
          type="text"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Inputcontrol
          label="Description"
          placeholder="Enter Description"
          value={values.description}
          type="text"
          onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
        />
        <Inputcontrol
          label="Price"
          placeholder="Enter Price"
          type="text"
          value={values.price}
          onChange={(e) => setValues((prev) => ({ ...prev, price: e.target.value }))}
        />
        <Inputcontrol
          label="Qty"
          placeholder="Enter Quantity"
          type="text"
          value={values.qty}
          onChange={(e) => setValues((prev) => ({ ...prev, qty: e.target.value }))}
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
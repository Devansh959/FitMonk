
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import Navbar from './Components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import {auth,db } from './firebase';
import Product from './Components/Product/Product';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import { doc, getDoc } from 'firebase/firestore';


function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [userRole, setUserRole] = useState(null); 
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        const documentRef = doc(db, "users", user.uid);

        // Fetch the document
        getDoc(documentRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              console.log("Document data:", data.role);
              setUserRole(data.role);
              console.log(userRole)
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error fetching document:", error);
          });
      }
    });
  }, []); 

  
  // if (userRole === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={currentUser ? currentUser : ""} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/product" element={<Product />} userRole={userRole} />
          <Route path="/product/addproduct" element={<AddProduct />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
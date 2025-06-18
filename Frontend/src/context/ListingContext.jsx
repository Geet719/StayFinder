import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './AuthContext';

export const listingDataContext = createContext();
 

function ListingContext({ children }) {
 const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [frontEndImage1, setFrontEndImage1] = useState('');
    const [frontEndImage2, setFrontEndImage2] = useState(''); 
    const [frontEndImage3, setFrontEndImage3] = useState('');
    const [backEndImage1, setBackEndImage1] = useState('');
    const [backEndImage2, setBackEndImage2] = useState('');
    const [backEndImage3, setBackEndImage3] = useState('');
    const [rent, setRent] = useState('');
    const [city, setCity] = useState('');
    const [landmark, setLandmark] = useState('');
    const [category, setCategory] = useState('');
    const { serverUrl } = useContext(authDataContext);
    

    const handleAddListing = async () => {
        try {
            const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image1', backEndImage1);
    formData.append('image2', backEndImage2);
    formData.append('image3', backEndImage3);
    formData.append('rent', rent);
    formData.append('city', city);
    formData.append('landmark', landmark);
    formData.append('category', category);
    const result = await axios.post(serverUrl + '/api/listing/add', formData,
        { withCredentials: true,})
        

        } catch (error) {
            console.log("Error adding listing:", error);    
        }
    }

   const value = {
    title,setTitle,
    description,setDescription,
    frontEndImage1,setFrontEndImage1,
    frontEndImage2,setFrontEndImage2,       
    frontEndImage3,setFrontEndImage3,
    backEndImage1,setBackEndImage1,
    backEndImage2,setBackEndImage2,
    backEndImage3,setBackEndImage3,
    rent,setRent,
    city,setCity,
    landmark,setLandmark,
    category,setCategory,
    handleAddListing
   }

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingContext

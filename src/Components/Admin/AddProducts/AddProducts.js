import { async } from '@firebase/util';
import React, { useState } from 'react'
import './AddProducts.css'
import { uuid } from 'uuidv4';
import { collection, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { CButton } from '@coreui/react';





function AddProducts() {


    /* 
   Add Product details

    1. id
    2. Name
    3. Description
    4. Category
    5. ImageUrl
    */


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState("");



    const uuidIs = uuidv4();




    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data, 'data after handleSubmit executed')

        if (!name || !description || !image || !category || !price) {
            alert('Please fill all the input')
        } else {
            // const data = {
            //     Name: name,
            //     Description: description,
            //     category: category,
            //     ImageUrl: image,
            // }

            // console.log(data, 'this is data')
            try {
                const query = collection(db, "Products");

                await addDoc(query, {
                    uid: uuidIs,
                    Name: name,
                    Description: description,
                    Category: category,
                    ImageUrl: image,
                    Price: price,
                    Tranding: false,
                    timestamp: serverTimestamp(),
                })
                    .then((response) => {
                        alert('Added succesfully')
                        console.log(response)

                    })
                    .then(() => {
                        setName("")
                        setDescription("")
                        setCategory("")
                        setImage("")
                        setPrice("")
                    })
                    .catch((err) => {

                        const errorMessage = err.message;
                        console.log(err)
                        console.log(err)
                    })
            } catch (error) {
                alert(error)

            }








        }



    }





    return (
        <div className='AddProducts'>
            <div className='heading__components'><h4>Add Products</h4></div>


            <div className='addproducts__main'>

                <div className='addproducts__form'>
                    <form onSubmit={handleSubmit}>
                        <h2>Add Product</h2>

                        <h3>Name</h3>
                        <input type='text' placeholder='Name of food' value={name} onChange={e => setName(e.target.value)} />

                        <h3>Description</h3>
                        <input type='text' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />

                        <h3>Category</h3>
                        <input type='text' placeholder='Category' value={category} onChange={e => setCategory(e.target.value)} />

                        <h3>Image</h3>
                        <input type='url' placeholder='Image Url' value={image} onChange={e => setImage(e.target.value)} />

                        <h3>Price {"($)"}</h3>
                        <input type='number' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
                        <div className='add__button'>
                            <CButton type='submit'>Add</CButton>
                        </div>
                    </form>
                </div>

            </div>


        </div >
    )
}

export default AddProducts
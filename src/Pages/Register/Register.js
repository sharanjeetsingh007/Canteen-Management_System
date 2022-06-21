import React, { useEffect, useState } from 'react';
import "./Register.css";
import { app } from '../../Firebase';
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Redux/slice'
import { changeBooleanTrue, changeBooleanFalse } from '../../Redux/userBoolen'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { async } from '@firebase/util';
import { db } from '../../Firebase'
import { v4 as uuidv4 } from 'uuid';
import { CButton } from '@coreui/react';
import LoadingSpinnerMain from '../../LoadingSpinner/LoadingSpinnerMain';



export default function Register() {

    // states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Repassword, setRepassword] = useState("")

    const [spinner, setSpinner] = useState(false);

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")







    const dispatch = useDispatch()

    const navigate = useNavigate();




    const handleSubmit = async (e) => {
        e.preventDefault();



        const auth = getAuth();
        try {
            if (!name || !email || !Password || !Repassword) {
                setErrorMessage("Please fill all the details")
                setError(true);
                return;
            } else if (Password !== Repassword) {
                setErrorMessage("Password does not match")

                setError(true);
                return;

            }
            else {

                setSpinner(true)

                await createUserWithEmailAndPassword(auth, email, Password)
                    .then((userCredential) => {
                        const user2 = userCredential.user;


                        updateProfile(user2, {
                            displayName: name,
                            photoURL: null,
                        })
                            .then(async () => {
                                await addDoc(collection(db, "Users"), {
                                    uid: user2.uid,
                                    displayName: name,
                                    email: email,
                                    photoURL: null,
                                    role: "user",
                                    timestamp: serverTimestamp(),
                                })
                                await addDoc(collection(db, "Wallets"), {
                                    uid: user2.uid,
                                    name: name,
                                    email: email,
                                    role: "user",
                                    timestamp: serverTimestamp(),
                                    balance: 50,
                                })
                            })



                            .then(() => {
                                localStorage.setItem('role', 'user');
                                dispatch(login({
                                    email: user2.email,
                                    uid: user2.uid,
                                    name: user2.displayName,
                                    photoURL: user2.photoURL,
                                    role: 'user',


                                }))
                                dispatch(changeBooleanTrue())
                            })
                            .then(() => {
                                navigate('/home/user/home')
                                setSpinner(false)


                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                alert(errorMessage)
                                setSpinner(false)

                                // ..
                            });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorMessage)
                        // ..
                    });
            }

        } catch (e) {
            alert("Error adding document: ", e);

        }

    }



    return (<>{spinner == true ? <LoadingSpinnerMain /> :
        <div className='register'>

            <div className='register__main'>
                <h2>Register</h2>
                <hr />
                <h4>Name</h4>
                <input type="text"
                    placeholder='Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <h4>Email</h4>
                <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                />
                <h4>Password</h4>
                <input type="password"
                    placeholder='Password'
                    value={Password}
                    onChange={e => setPassword(e.target.value)}

                />
                <h4>Renter-password</h4>

                <input

                    type="password"
                    placeholder='Renter-password'
                    value={Repassword}
                    onChange={e => setRepassword(e.target.value)}

                />
                {error == true && <h5 className='error__message'>{errorMessage}</h5>}

                <CButton
                    className='button__core'
                    style={{ boxShadow: 'none' }}
                    onClick={handleSubmit}>Submit</CButton>

            </div>

        </div >
    }
    </>
    )
}

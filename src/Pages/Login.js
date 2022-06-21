import React, { useState, useEffect } from 'react'
import "./Login.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/slice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { changeBooleanTrue } from '../Redux/userBoolen';
import { collection, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../Firebase'
import { CTable, CButton, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CSpinner } from '@coreui/react';
import { CAlert, cilWarning } from '@coreui/react'
import LoadingSpinnerMain from '../LoadingSpinner/LoadingSpinnerMain'





export default function Login({ roleValue }) {


    //states
    const [userFirestore, setFirestore] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [alertState, setAlertState] = useState(false);

    // redux
    const dispatch = useDispatch();

    // react-router-dom
    const { state } = useLocation();

    const navigate = useNavigate()

    // finding current user from database
    const filterHandle = async (data, user) => {


        const currentId = await data.filter(item => item.uid === user.uid);

        // console.log(currentId[0].role, 'currentId under filterHandle')

        return currentId[0].role;

    }

    // login function
    const handleLogin = async (e) => {
        e.preventDefault();

        setSpinner(true);

        //firebase authentication
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)

            .then(async (userCredential) => {

                // Signed in 
                const user = userCredential.user;


                // console.log(user, "llogin user👹")



                filterHandle(userFirestore, user)
                    .then((response) => {
                        // console.log(response, 'response promise')
                        // storing the role for protected routes usage
                        localStorage.setItem('role', response);

                        // redux dispatch state to current user
                        dispatch(login({
                            email: user.email,
                            uid: user.uid,
                            displayName: user.displayName,
                            profileUrl: user.photoURL,
                            role: response,

                        }))


                    }).catch((err) => {
                        alert(err.message)
                        setSpinner(false);


                    })

                // redux for protected routes
                dispatch(changeBooleanTrue());
                // ...
            }).then(() => {

                const role = localStorage.getItem('role');

                // navigating to user || admin
                role == 'user' ? navigate(state?.path || "/home/user/home") : navigate(state?.path || "/home/admin/home");
                setSpinner(false);
            })
            .catch((error) => {

                const errorMessage = error.message;
                // error then show alert in page
                if (errorMessage) {
                    setSpinner(false);

                    setAlertState(true);
                }

            });
    }


    // async getting and setting state
    const gettingValue = async (value) => {
        // console.log(value)
        const asyncValue = await value;
        return setFirestore(asyncValue)
        // console.log(user.uid)
        // const currentId = await value.filter((item) => console.log(item.uid));

    }


    useEffect(() => {
        const q = query(collection(db, 'Users'));
        onSnapshot(q, (snapshot) => {
            gettingValue(snapshot.docs.map((doc) => (
                // const data = doc.data();
                // console.log(doc.data().role, 'firestore gettting data 😈'),
                {
                    email: doc.data().email,
                    displayName: doc.data().displayName,
                    uid: doc.data().uid,
                    role: doc.data().role,
                    photoURL: doc.data().photoURL,
                    timestamp: doc.data().timestamp,
                }
            )))
        });

    }, [])


    return (<>{spinner == true ? <LoadingSpinnerMain /> :
        <div className='login'>
            <div className='login__main'>
                <h2>Login</h2>
                <hr />
                <h4>Email</h4>
                <input type="text"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <h4>Password</h4>
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {alertState == true && <h5 className='error__message'>No email/password matched</h5>}

                <CButton
                    className='button__core'
                    style={{ boxShadow: 'none' }}
                    onClick={handleLogin}>Login</CButton>

                <Link to="./register"> <h6>Register now</h6></Link>
            </div>
        </div>
    }
    </>
    )
}

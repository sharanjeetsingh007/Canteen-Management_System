import React, { Component } from "react";
import "./credit-card.css";
import "./form-style.css";
import './Creditcard.css';
import Cards from 'react-credit-cards';
import { useDispatch, useSelector } from 'react-redux';
import { collection, updateDoc, deleteDoc, addDoc, getDoc, getDocs, query, onSnapshot, doc, limit, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from '../../../Firebase';
import { connect } from 'react-redux';
import { emptyCart } from "../../../Redux/cart";
// import { withRouter } from '../../../withRouter'
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { compose } from 'react-redux';
import { withRouter } from 'react-router';







class Creditcard extends Component {

    timeoutID;
    constructor(props) {
        super(props);
        this.redirectCart = this.redirectCart.bind(this);

        // console.log(this.props, 'class')

        // totalCart: this.props.TotalCart;

        this.state = {
            cvc: "",
            expiry: "",
            expiryyear: "",
            focus: "",
            name: "",
            number: "",
            wallets: []
        };



        // console.log(this.state.wallets, 'wallets')

    }


    redirectCart() {

        this.props.navigate('/home/user/cart')
    }





    fetchWallets = () => {
        const q = query(collection(db, 'Wallets'));
        onSnapshot(q, (snapshot) => {

            return this.setState({
                wallets: snapshot.docs.map((doc) => (


                    // const data = doc.data();
                    // return console.log(doc.data().role, 'firestore gettting data 😈🔥'),

                    {
                        uid: doc.id,
                        data: doc.data(),
                        // Name: doc.data().Name,
                        // Description: doc.data().Description,
                        // Category: doc.data().Category,
                        // ImageUrl: doc.data().ImageUrl,
                        // timestamp: doc.data().timestamp,
                    }




                ))
            })


        });
    }


    // componentDidMount() {
    //     console.log('running')
    //     this.fetchWallets()

    //     console.log(this.state.wallets, 'wallets')

    // }


    setup = () => {
        //if any of the events fire, it resets the timer
        window.addEventListener("keypress", () => {
            this.resetTimer();
        });
        window.addEventListener("keyup", () => {
            this.resetTimer();
        });
        window.addEventListener("scroll", () => {
            this.resetTimer();
        });
        window.addEventListener("keydown", () => {
            this.resetTimer();
        });
        window.addEventListener("mousemove", () => {
            this.resetTimer();
        });
        window.addEventListener("mousewheel", () => {
            this.resetTimer();
        });
        window.addEventListener("mousedown", () => {
            this.resetTimer();
        });
        window.addEventListener("touchmove", () => {
            this.resetTimer();
        });
        window.addEventListener("MSPointerMove", () => {
            this.resetTimer();
        });
        window.addEventListener("DOMMouseScroll", () => {
            this.resetTimer();
        });
        window.addEventListener(onscroll, () => {
            this.resetTimer();
        });
        //starts timer of inactivity
        this.startTimer();
    };
    goInactive() {
        // alerting about session expiration and clearing session data
        alert("Your Session expired.Please refresh the page.");

        sessionStorage.clear();
    }
    goActive() {
        //starting timer
        this.startTimer();
    }
    resetTimer() {
        window.clearTimeout(this.timeoutID);
        //calling goactive to again starts the timer once it gets reset
        this.goActive();
    }
    startTimer() {
        //checking after every 1 min
        // wait 30 min before calling goInactive
        this.timeoutID = window.setTimeout(this.goInactive, 60000 * 30);
    }
    //storing data on submit button click
    submit = async (e) => {
        e.preventDefault();
        console.log(this.state.wallets, 'wallets')
        console.log(this.props.TotalCart, 'props')



        if (this.state.name && this.state.number && this.state.cvc && this.state.expiry && this.state.expiryyear) {



            let newBalance = null;
            const walletCurrent = this.state.wallets.filter((item) => item.data.uid == this.props.user.uid)

            console.log(walletCurrent[0].data['name'], 'walletCurrent')



            if (this.props.TotalCart > walletCurrent[0].data.balance) {
                alert('Not enough balance to proceed the payment')
            } else {
                newBalance = walletCurrent[0].data.balance - this.props.TotalCart;

                // console.log(newBalance, 'newBalance')
                // console.log(this.props.cart[0][0], 'this.props.cart[0][0].name👺')

                // console.log(this.props.cart[0][0].UserName, 'this.props.cart[0][0].name👺')



                const updateQuery = doc(db, 'Wallets', walletCurrent[0].uid);

                // console.log(updateQuery, 'updateQuery is run')
                try {
                    await updateDoc(updateQuery, {
                        balance: newBalance,

                    }).then((response) => {
                        alert('Succesfully checkout')
                        if (this.props.cart.length !== 0) {
                            try {
                                const query = collection(db, "Orders");
                                addDoc(query, {

                                    UserId: this.props.cart[0][0].UserId,
                                    // UserName: this.props.cart[0][0].UserName.replace(/ +/g, ""),
                                    UserName: walletCurrent[0].data['name'],

                                    Status: 'Pending',
                                    timeStamp: serverTimestamp(),
                                    Orders: this.props.cart[0][0].Orders,
                                })
                                    .then((response) => {
                                        // alert('Added succesfully')
                                        // console.log(response)

                                    })
                                    .catch((err) => {
                                        const errorMessage = err.message;
                                        console.log(err)
                                        console.log(err)
                                    })
                            } catch (error) {
                                newBalance = walletCurrent[0].data.balance

                                alert(error)
                            }
                        } else {
                            alert('Cart is empty')
                        }
                    })
                        .then(() => {




                            this.props.handleCloseModal(false);
                            sessionStorage.setItem("user", JSON.stringify(this.state));
                            //restoring initial state of the app
                            this.setState({
                                name: "",
                                number: "",
                                cvc: "",
                                expiry: "",
                                expiryyear: "",
                                focus: ""
                            });

                            this.props.dispatch(emptyCart())


                        })
                        .then(() => {
                            this.props.navigate('/home/user/cart')

                        })
                        .catch((err) => {
                            alert(err, 'err procced to checkout')
                        })
                }
                catch (err) {
                    alert(err, 'Error to procced checkout')
                }




            }



        } else {
            alert('Please fill all the card details')
        }






    };

    /*function to remove special characters like + - . e E 
      which are otherwise valid in case of type=number used in case  of cvc*/
    removeSpecial = (e) => {
        var invalidChars = ["-", "+", "e", "E", " ", "."];
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    };

    //function to add space after every 4 character in card number
    addSpace = (e) => {
        const { value, id } = e.target;
        var ele = document.getElementById(id);
        if (value.length === 4 || value.length === 9 || value.length === 14)
            ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    };




    componentDidMount() {


        this.fetchWallets()



        this.setup(); //setting up all window event  listener to detect user activity after component gets mounted
        setInterval(() => {
            var hours = 0.5; // Reset when storage is more than 24hours
            var now = new Date().getTime(); //recording session start time
            var setupTime = sessionStorage.getItem("setupTime"); //pushing setting start time to session storage

            if (setupTime === null) {
                //this only works first time when there is no value in session storage
                sessionStorage.setItem("setupTime", now);
            } else {
                //comparing time passed with the specified time of session

                if (now - setupTime > hours * 60 * 60 * 1000) {
                    //session time exceeds 30 min
                    sessionStorage.clear(); //clearing storage
                    sessionStorage.setItem("setupTime", now); //storing starting time of new session
                }
            }
        }, 1000);
    }

    //function to validate the length of input in case of cvv and replace invalid characters in case of card number
    validateInput = (e) => {
        const { name, value, maxLength, id } = e.target;
        var temp, ele;

        if (id === "cvv") {
            if (value.length > maxLength) {
                temp = value.slice(0, maxLength);
                const num = temp;
                ele = document.getElementById(id);
                ele.value = temp;
                this.setState({ [name]: num });
            } else {
                this.setState({ [name]: value });
            }
        }
        //works when function is invoked by cardNumber input
        else {
            ele = document.getElementById(id);
            //if user enters any invalid characters it gets replaced
            ele.value = ele.value.replace(
                /[A-Za-z}"`~_=.\->\]|<?+*/,;\[:{\\!@#\/'$%^&*()]/g,
                ""
            );
            this.setState({ [name]: ele.value });
        }
    };

    //function to handle focus on input
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };

    //function to handle  input and update the state of variable
    handleInputChange = (e) => {
        const { name, value, id } = e.target;

        if (id === "cardHolder") {
            var ele = document.getElementById(id);
            //if user enters any invalid characters it gets replaced
            ele.value = ele.value.replace(
                /[}"`~_=.\->\]|<?+*/,\d;\[:{\\!@#\/'$%^&*()]/g,
                ""
            );
            this.setState({ [name]: ele.value });
        } else this.setState({ [name]: value });
    };

    render() {


        // console.log(this.state.wallets, 'wallets')
        // console.log(this.props, 'propssssssssssssss')
        // console.log(this.props.navigate, 'propssssssssssssss navigate')
        // const { navigate } = this.props;
        // console.log(this.props.navigate, 'navigate')

        // console.log(this.props.cart[0][0].UserName, 'cart💀')


        return (
            <div className="credit__card__main">
                <div className="credit-card ">
                    <Cards
                        className='card__custom__payment'
                        locale={{ valid: "Expires" }}
                        placeholders={{ name: "FULL NAME" }}
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        expiryyear={this.state.expiryyear}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                </div>
                <div className="card card__custom__payment__inner">
                    <form className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardNumber" className="card-label">
                                Card Number
                            </label>
                            <input
                                style={{ height: '10px', maxHeight: '10px' }}
                                type="text"
                                onChange={this.validateInput}
                                value={this.state.number}
                                onKeyDown={this.removeSpecial}
                                onPaste={(e) => e.preventDefault()}
                                onKeyPress={this.addSpace}
                                onFocus={this.handleInputFocus}
                                name="number"
                                maxLength="19"
                                id="cardNumber"
                                className="form-control form-control-lg"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolder" className="card-label"
                                style={{ marginTop: '10px' }}
                            >
                                Card holder
                            </label>
                            <input
                                type="text"
                                name="name"
                                spellCheck="false"
                                value={this.state.name}
                                maxLength="20"
                                autoComplete="off"
                                onPaste={(e) => e.preventDefault()}
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                                id="cardHolder"
                                className="form-control form-control-lg"
                            />
                        </div>
                        <div className="date-cvv-box">
                            <div className="expiry-class">
                                <div className="form-group card-month ">
                                    <label htmlFor="cardMonth" className="card-label"
                                        style={{ marginTop: '10px' }}

                                    >
                                        Expiration Date
                                    </label>

                                    <select
                                        style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}
                                        id="cardMonth"
                                        data-ref="cardDate"
                                        value={this.state.expiry}
                                        name="expiry"
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className="form-control form-control-lg"
                                    >
                                        <option value="" defaultChecked="true">
                                            Month
                                        </option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div className="form-group card-year">
                                    <select
                                        style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}

                                        id="cardYear"
                                        data-ref="cardDate"
                                        value={this.state.expiryyear}
                                        name="expiryyear"
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        className="form-control form-control-lg"
                                    >
                                        <option value="" defaultChecked="true">
                                            Year
                                        </option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                        <option value="2031">2031</option>
                                    </select>
                                </div>
                            </div>

                            <div className="cvv-class form-group">
                                <label htmlFor="cvv" className="card-label cvv-label"
                                    style={{ marginTop: '10px', fontSize: '12px' }}

                                >
                                    CVV
                                </label>
                                <input
                                    type="number"
                                    onChange={this.validateInput}
                                    onKeyDown={this.removeSpecial}
                                    onPaste={(e) => e.preventDefault()}
                                    onFocus={this.handleInputFocus}
                                    name="cvc"
                                    id="cvv"
                                    value={this.state.cvc}
                                    className="form-control form-control-lg "
                                    maxLength="4"
                                />
                            </div>
                        </div>

                        <button
                            style={{ fontSize: '15px', boxShadow: 'none', height: '30px', width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            className="btn btn-primary btn-lg btn-block"
                            onClick={this.submit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        user: state.user.value,
        cart: state.reducer.cart.cartItems
    }


}


// export default withRouter(connect(mapStateToProps)(Creditcard));

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Creditcard {...props} navigate={navigate} />
}

export default connect(mapStateToProps)(WithNavigate)



// export function WithNavigate(props) {
//     let navigate = useNavigate();
//     return <Creditcard navigate={navigate} />
// }
import React, { useState } from 'react';
import './CardInfo.css';
import checkMark from '../../images/icon-complete.svg';
import ExpirationCheck from '../../Functions/ExpirationCheck';
import ValidateCardNumber from '../../Functions/validateCardNumber';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const CardInfo = () => {
    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [formattedNumber, setFormattedNumber] = useState('0000 0000 0000 0000');
    const [expMonth, setExpMonth] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [cvc, setCVC] = useState(null);
    const [provider, setProvider] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [allCardsInfo, setAllCardsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const validationCheck = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (name === null) {
            setIsLoading(false);
            return setErrorMessage("All fields must be complete")
        }

        if (number.length < 16) {
            setIsLoading(false);
            return setErrorMessage("Please enter 16-digit card number")
        }

        if (cvc.length < 3) {
            setIsLoading(false);
            return setErrorMessage("Please enter 3-digit CVC")
        }
        
        //Validate Card Number
        const isValidCard = ValidateCardNumber(number);

        if (!isValidCard){
            setIsLoading(false);
            return setErrorMessage("Please enter valid card number!");
        }

        //Check for a valid month
        if (expMonth <= 0 || expMonth > 12) {
            setIsLoading(false);
            return setErrorMessage("Expiration month is not valid!")
        }
        
        //Check card expiration
        const isExpired = ExpirationCheck(expMonth, expYear);

        if (isExpired){
            setIsLoading(false);
            return setErrorMessage("Please enter nonexpired card!");
        }
        else {
            const url = 'http://localhost:3001/CardData/addCardDetail';
            await Axios.post(url, {
                name : name,
                number : number,
                expMonth : expMonth,
                expYear : expYear,
                cvc : cvc,
            })
            .then((response) => {
                console.log(response.data)
                if (response.data.statusMessage === "Successful") {
                    getAllCards();
                    setPaymentSuccessful(true);
                }
                else if (response.data.statusMessage === "Failed") {
                    setErrorMessage("Payment Unsuccessful!")
                    setPaymentSuccessful(true);
                }
                else if (response.data.errorMessage){
                    setErrorMessage(response.data.errorMessage);
                }
            })
            .catch((error) => {
                setErrorMessage('An Error Occured! + \n' + error);
            });    
            setIsLoading(false);
        }
    }

    const resetForm = (e) => {
        e.preventDefault();
        setName(null);
        setNumber(null);
        setExpMonth(null);
        setExpYear(null);
        setCVC(null);
        setErrorMessage(null);
        setPaymentSuccessful(false);
    }

    const getAllCards = async () => {
        const url = 'http://localhost:3001/CardData/retrieveAllCards';
        await Axios.post(url)
        .then((response) => {
            if (response.data.errorMessage){
                setErrorMessage(response.data.errorMessage);
            }
            else {
                setAllCardsInfo(response.data[0]);
            }
        })
        .catch((error) => {
            setErrorMessage('An Error Occured! + \n' + error);
        });
        setIsLoading(false);  
    }

    function ccFormat(e) {
        let numString = e;
        let typeCheck = numString.substring(0,2);
        let cType = '';
        let block1 = '';
        let block2 = '';
        let block3 = '';
        let block4 = '';
        let formatted = '';
//Checking provider type---------------------------------
        if (typeCheck.length === 2) {
            typeCheck = parseInt(typeCheck);
            if (typeCheck >=40 && typeCheck <= 49) {
                cType = 'Visa';
            } else if (typeCheck >=51 && typeCheck <= 55) {
                cType = 'MC';
            } else if (typeCheck >=60 && typeCheck <= 62) {
                cType = 'Discover';
            } else if (typeCheck === 34 || typeCheck === 37) {
                cType = 'AMEX';
            } else {
                cType = 'Invalid';
            }
        }
        setProvider(cType)
//Spacing the numbers------------------------------------
        block1 = numString.substring(0,4)
        if (block1.length === 4) {
            block1 = block1 + ' ';
        }
        if (cType === 'Visa' || cType === 'MC' || cType === 'Discover') {
            block2 = numString.substring(4,8);
            if (block2.length === 4) {
                block2 = block2 + ' ';
            }
            block3 = numString.substring(8,12);
            if (block3.length === 4) {
                block3 = block3 + ' ';
            }
            block4 = numString.substring(12,16);
        }
        if (cType === 'AMEX') {
            block2 = numString.substring(4,10);
            if (block2.length === 6) {
                block2 = block2 + '   ';
            }
            block3 = numString.substring(10,15)
        }
        if (cType === 'Invalid') {
            block1 = 'Invalid card number'
        }
        
        formatted = block1 + block2 + block3 + block4;
        setFormattedNumber(formatted)
    }

    return (
        <>
            <div className="big-container">
                <nav className="navbar">
                    <strong>STACKMONSTERS!</strong>
                    <Link to='/savedCards' className='navLink'>Saved Cards</Link>
                </nav>
                <div className="card-display-container">
                    <div className="card-front">
                        <div className="logo">
                            <div className="white-circle"></div>
                            <div className="empty-circle"></div>
                        </div>
                        <div className="name-display">
                            <p className="name-output" id="name-output">{name}</p>
                        </div>
                        <div className="number-display">
                            <p className="number-output" id="number-output">{formattedNumber}</p>
                        </div>
                        <div className="exp-m-display">
                            <p className="exp-m-output" id="exp-m-output">{expMonth}/{expYear}</p>
                        </div>
                    </div>
                    <div className="card-back">
                        <div className="cvc-display">
                            <p className="cvc-output" id="cvc-output">{cvc}</p>
                        </div>
                    </div>
                </div>
                <div className='page_container'>
                    <form className='cardInfo_form'>
                        {isLoading ?
                        <>
                            <h1 className='paymentConfHeader'>PROCESSING...</h1>
                        </>
                        :
                        <>
                            {paymentSuccessful ?
                            <>
                                <img className='paymentConfLogo' src={checkMark} alt="" />
                                <h1 className='paymentConfHeader'>THANK YOU!</h1>
                                <p className='paymentConfMsg'>We've added your card details</p>
                                <button type="submit" onClick={e => resetForm(e)}>CONTINUE</button>
                                <br/><br/><br/><br/>
                            </>
                            :
                            <>
                                <label className='cardHolderNameLabel'>
                                    CARDHOLDER NAME:
                                    <input name='cardHolderName' className='cardHolderName' type='text' placeholder='e.g. Jane Appleseed' pattern='^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$' maxLength='24' autoComplete='name'  defaultValue={name} onChange={(e) => setName(e.target.value)} />
                                </label>
                                <label className='cardHolderNumberLabel'>
                                    CARDHOLDER NUMBER:
                                    <input name='cardHolderNumber' className='cardHolderNumber' type='text' pattern='[0-9]{16}' maxLength="16" placeholder='e.g. 1234 5678 9123 0000' autoComplete='off'  defaultValue={number} onChange={(e) => {setNumber(e.target.value);ccFormat(e.target.value)}}/>
                                </label>
                                <div className="expAndCvcBox">
                                    <label className='cardHolderExpDateLabel'>
                                        EXP. DATE (MM/YY):
                                        <div style={{display: 'flex'}}>
                                            <input name='cardHolderExpMonth' className='cardHolderExpMonth' type='text' placeholder='MM' pattern="[0-9]{2}" maxLength="2" autoComplete='off'  defaultValue={expMonth} onChange={(e) => setExpMonth(e.target.value)}/>
                                            <input name='cardHolderExpYear' className='cardHolderExpYear' type='text' placeholder='YY' pattern="[0-9]{2}" maxLength="2" autoComplete='off'  defaultValue={expYear} onChange={(e) => setExpYear(e.target.value)}/>
                                        </div>
                                    </label>
                                    <label className='cardHolderCVCLabel'>
                                        CVC:
                                        <input name='cardHolderCVCMonth' className='cardHolderCVCMonth' type='text' placeholder='e.g 123' pattern="[0-9]{3}" maxLength="3" autoComplete='off'  defaultValue={cvc} onChange={(e) => setCVC(e.target.value)}/>
                                    </label>
                                </div>
                                <button type="submit" onClick={e => validationCheck(e)}>CONFIRM</button>
                                <p>{errorMessage}</p>
                            </>
                            }
                        </>
                        }
                    </form>
                </div>
                <div className='footer'>
                    <p>Start Date/Time: 06/21/23 2000ET</p>
                </div>
            </div>
        </>
    );
}

export default CardInfo;

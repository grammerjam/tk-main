import React, { useEffect, useState } from 'react';
import './UpdateCardInfo.css';
import checkMark from '../../images/icon-complete.svg';
import ExpirationCheck from '../../Functions/ExpirationCheck';
import ValidateCardNumber from '../../Functions/validateCardNumber';
import Axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateCardInfo = () => {
    const CardID = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [formattedNumber, setFormattedNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvc, setCVC] = useState('');
    const [provider, setProvider] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentUpdateSuccessful, setPaymentUpdateSuccessful] = useState(false);
    const [cardInfo, setCardInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setErrorMessage(null);

        const url = 'http://localhost:3001/CardData/retrieveCardInfo';
        Axios.post(url, {CardID : CardID})
        .then((response) => {
            if (response.data.errorMessage){
                setErrorMessage(response.data.errorMessage);
            }
            else {
                setName(response.data.cardHolderName);
                setNumber(response.data.cardHolderNumber);
                setExpMonth(response.data.cardHolderExpMonth);
                setExpYear(response.data.cardHolderExpYear);
                setCVC(response.data.cardHolderCVC);
                setProvider(response.data.cardHolderProvider);
                ccFormat(response.data.cardHolderNumber);
            }
        })
        .catch((error) => {
            setErrorMessage(<>An Error Occured! <br/> {error.message}</>);
        });
        setIsLoading(false);  
    }, []);

    const validationCheck = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (name === null) {
            setIsLoading(false);
            return setErrorMessage("All fields must be complete")
        }

        if (number.length < 15) {
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
            const url = 'http://localhost:3001/CardData/updateCardDetail';
            await Axios.post(url, {
                cardID : CardID,
                name : name,
                number : number,
                expMonth : expMonth,
                expYear : expYear,
                cvc : cvc,
                provider : provider,
            })
            .then((response) => {
                if (response.data.statusMessage === "Successful") {
                    setPaymentUpdateSuccessful(true);
                    navigate('/savedCards');
                }
                else if (response.data.statusMessage === "Failed") {
                    setErrorMessage("Payment Update Unsuccessful!")
                    setPaymentUpdateSuccessful(false);
                }
                else if (response.data.errorMessage){
                    setErrorMessage(response.data.errorMessage);
                }
            })
            .catch((error) => {
                setErrorMessage(<>An Error Occured! <br/> {error.message}</>);
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
        setPaymentUpdateSuccessful(false);
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
                            {paymentUpdateSuccessful ?
                            <>
                                <img className='paymentConfLogo' src={checkMark} alt="" />
                                <h1 className='paymentConfHeader'>Payment Updated!</h1>
                                <p className='paymentConfMsg'>We've updated your card details</p>
                                <button type="submit" onClick={e => resetForm(e)}>CONTINUE</button>
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

export default UpdateCardInfo;

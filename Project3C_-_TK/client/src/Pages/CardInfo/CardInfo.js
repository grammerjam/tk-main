import React, { useState } from 'react';
import './CardInfo.css';
import checkMark from '../../images/icon-complete.svg';
import ExpirationCheck from '../../Functions/ExpirationCheck';

const CardInfo = () => {
    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [cvc, setCVC] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)

    const validationCheck = (e) => {
        e.preventDefault();
        const isExpired = ExpirationCheck(expMonth, expYear);

        if (isExpired){
            setErrorMessage("Please enter nonexpired card!");
        }
        else {
            setPaymentSuccessful(true);
        }
    }

    const resetForm = (e) => {
        e.preventDefault();
        setName(null);
        setNumber(null);
        setExpMonth(null);
        setExpYear(null);
        setCVC(null);
        setPaymentSuccessful(false);
    }

    return (
        <>
            <div className="big-container">
                <nav className="navbar">
                    STACKMONSTERS!
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
                            <p className="number-output" id="number-output">{number}</p>
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
                        {paymentSuccessful ?
                        <>
                            <img className='paymentConfLogo' src={checkMark} alt="" />
                            <h1 className='paymentConfHeader'>THANK YOU!</h1>
                            <p className='paymentConfMsg'>We've added your card details</p>
                            <button type="submit" onClick={e => resetForm(e)}>CONTINUE</button>
                        </>
                        :
                        <>
                            <label className='cardHolderNameLabel'>
                                CARDHOLDER NAME:
                                <input name='cardHolderName' className='cardHolderName' type='text' placeholder='e.g. Jane Appleseed' pattern='^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$' maxLength='24' autoComplete='name' required defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                            </label>
                            <label className='cardHolderNumberLabel'>
                                CARDHOLDER NUMBER:
                                <input name='cardHolderNumber' className='cardHolderNumber' type='text' pattern='[0-9]{16}' maxLength="16" placeholder='e.g. 1234 5678 9123 0000' autoComplete='off' required defaultValue={number} onChange={(e) => setNumber(e.target.value)}/>
                            </label>
                            <div className="expAndCvcBox">
                                <label className='cardHolderExpDateLabel'>
                                    EXP. DATE (MM/YY):
                                    <div style={{display: 'flex'}}>
                                        <input name='cardHolderExpMonth' className='cardHolderExpMonth' type='text' placeholder='MM' pattern="[0-9]{2}" maxLength="2" autoComplete='off' required defaultValue={expMonth} onChange={(e) => setExpMonth(e.target.value)}/>
                                        <input name='cardHolderExpYear' className='cardHolderExpYear' type='text' placeholder='YY' pattern="[0-9]{2}" maxLength="2" autoComplete='off' required defaultValue={expYear} onChange={(e) => setExpYear(e.target.value)}/>
                                    </div>
                                </label>
                                <label className='cardHolderCVCLabel'>
                                    CVC:
                                    <input name='cardHolderCVCMonth' className='cardHolderCVCMonth' type='text' placeholder='e.g 123' pattern="[0-9]{3}" maxLength="3" autoComplete='off' required defaultValue={cvc} onChange={(e) => setCVC(e.target.value)}/>
                                </label>
                            </div>
                            <button type="submit" onClick={e => validationCheck(e)}>CONFIRM</button>
                            <p>{errorMessage}</p>
                        </>
                        }
                    </form>
                </div>
                <div className='footer'>
                    <p>Start Date/Time: 06/13/23 1200ET</p>
                </div>
            </div>
        </>
    );
}

export default CardInfo;

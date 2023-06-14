import React, { useState } from 'react';
import './PaymentConfirmation.css';
import { useNavigate } from 'react-router-dom';
import checkMark from '../../images/icon-complete.svg';
import CardDisplayInfo from '../../Functions/setCardDisplayInfo';

const PaymentConfirmation = () => {
    const navigate = useNavigate();
    const name = CardDisplayInfo.GetCardInfoName();
    const number = CardDisplayInfo.GetCardInfoNumber();
    const expMonth = CardDisplayInfo.GetCardInfoMonth();
    const expYear = CardDisplayInfo.GetCardInfoYear();
    const cvc = CardDisplayInfo.GetCardInfoCVC();

    const redirect = () => {
        //Navigate to confirmation page if validation is positive.
        navigate('/');
    }

    return (
        <>
            <div className='page_container'>
                <div className='paymentConfirmation_form'>
                    <img src={checkMark} alt="" />
                    <h1>THANK YOU!</h1>
                    <p>We've added your card details</p>
                    <button type="submit" onClick={redirect}>CONTINUE</button>
                </div>
            </div>
            <div class="card-display-container">
                <div class="card-front">
                    <div class="logo">
                    <div class="white-circle"></div>
                    <div class="empty-circle"></div>
                    </div>
                    <div class="name-display">
                    <p class="name-output" id="name-output">{name}</p>
                    </div>
                    <div class="number-display">
                    <p class="number-output" id="number-output">{number}</p>
                    </div>
                    <div class="exp-m-display">
                    <p class="exp-m-output" id="exp-m-output">{expMonth}</p>
                    </div>
                    <div class="exp-y-display">
                    <p class="exp-y-output" id="exp-y-output">{expYear}</p>
                    </div>
                </div>
                <div class="card-back">
                    <div class="cvc-display">
                    <p class="cvc-output" id="cvc-output">{cvc}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentConfirmation;

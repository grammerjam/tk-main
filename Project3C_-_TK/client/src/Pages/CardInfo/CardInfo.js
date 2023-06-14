import React, { useState } from 'react';
import './CardInfo.css';
import { useNavigate } from 'react-router-dom';
import ExpirationCheck from '../../Functions/ExpirationCheck';
import CardDisplayInfo from '../../Functions/setCardDisplayInfo';

const CardInfo = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [cvc, setCVC] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const validationCheck = () => {
        const isExpired = ExpirationCheck(expMonth, expYear);

        if (isExpired){
            setErrorMessage("Please enter nonexpired card!");
        }
        else {
            CardDisplayInfo.SetCardInfo(name, number, expMonth, expYear, cvc);
            navigate('/PaymentConfirmation');
        }
    }

    return (
        <>
            <div className='page_container'>
                <form className='cardInfo_form'>
                    <label className='cardHolderNameLabel'>
                        CARDHOLDER NAME:
                        <input name='cardHolderName' className='cardHolderName' type='text' placeholder='e.g. Jane Appleseed' autoComplete='name' required defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label className='cardHolderNumberLabel'>
                        CARDHOLDER NUMBER:
                        <input name='cardHolderNumber' className='cardHolderNumber' type='text' pattern='[0-9]{16}' maxLength="16" placeholder='e.g. 1234 5678 9123 0000' autoComplete='off' required defaultValue={number} onChange={(e) => setNumber(e.target.value)}/>
                    </label>
                    <label className='cardHolderExpDateLabel'>
                        EXP. DATE (MM/YY):
                        <div>
                            <input name='cardHolderExpMonth' className='cardHolderExpMonth' type='text' placeholder='MM' pattern="[0-9]{2}" maxLength="2" autoComplete='off' required defaultValue={expMonth} onChange={(e) => setExpMonth(e.target.value)}/>
                            <input name='cardHolderExpYear' className='cardHolderExpYear' type='text' placeholder='YY' pattern="[0-9]{2}" maxLength="2" autoComplete='off' required defaultValue={expYear} onChange={(e) => setExpYear(e.target.value)}/>
                        </div>
                    </label>
                    <label className='cardHolderCVCLabel'>
                        CVC:
                        <input name='cardHolderCVCMonth' className='cardHolderCVCMonth' type='text' placeholder='e.g 123' pattern="[0-9]{3}" maxLength="3" autoComplete='off' required defaultValue={cvc} onChange={(e) => setCVC(e.target.value)}/>
                    </label>
                    <button type="submit" onClick={validationCheck}>CONFIRM</button>
                    <p>{errorMessage}</p>
                </form>
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

export default CardInfo;

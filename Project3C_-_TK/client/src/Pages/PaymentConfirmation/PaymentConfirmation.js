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
        </>
    );
}

export default PaymentConfirmation;

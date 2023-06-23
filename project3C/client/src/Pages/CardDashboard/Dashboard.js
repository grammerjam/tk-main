import './Dashboard.css'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [allCardsInfo, setAllCardsInfo] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getAllCards = async () => {
        const url = 'http://localhost:3001/CardData/retrieveAllCards';
        await Axios.post(url)
        .then((response) => {
            if (response.data.errorMessage){
                setErrorMessage(response.data.errorMessage);
            }
            else {
                setAllCardsInfo(response.data[0]);
                console.log(allCardsInfo)
            }
        })
        .catch((error) => {
            setErrorMessage('An Error Occured! + \n' + error);
        });
        setIsLoading(false);  
    }

    const deleteCard = async (cardID) => {
        console.log(cardID)
    }

    const updateCard = async (cardID) => {
        console.log(cardID)
    }

  return (
    <>
        <nav className="navbar">
            <strong>STACKMONSTERS!</strong>
            <Link to='/' className='navLink'>Add New Card</Link>
        </nav>
        <div className='tableContainer'>
            <h1>All Cards</h1>
            <button onClick={getAllCards}>load</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Card ID</th>
                            <th>CardHolder Name</th>
                            <th>Card Number</th>
                            <th>Card Exp Date</th>
                            <th>Card Cvc</th>
                        </tr>
                    </tbody>
                    <tbody>
                    {allCardsInfo.map((cardDetail) => (
                        <tr key={cardDetail.cardID}>
                            <td>{cardDetail.cardID}</td>
                            <td>{cardDetail.cardHolderName}</td>
                            <td>{cardDetail.cardHolderNumber}</td>
                            <td>{cardDetail.cardHolderExpMonth}/{cardDetail.cardHolderExpYear}</td>
                            <td>{cardDetail.cardHolderCVC}</td>
                            <td>{cardDetail.provider}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className='updateDelete' onClick={updateCard}>Update</button>
                <button className='updateDelete' onClick={deleteCard}>Delete</button>
        </div>
    </>
  )
}

export default Dashboard

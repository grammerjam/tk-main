import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [allCardsInfo, setAllCardsInfo] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:3001/CardData/retrieveAllCards';
        
        Axios.post(url)
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
    }, []);

    const updateCard = async (CardID) => {
        navigate(`/updateCardId/${CardID}`);
    }

    const deleteCard = async (cardID) => {
        const url = 'http://localhost:3001/CardData/deleteCardDetail';

        let isOk = window.confirm("Are you sure you want to delete card id " + cardID + "?");

        if (isOk) {
            await Axios.post(url, {cardID : cardID})
            .then((response) => {
                if (response.data.statusMessage === "Successful") {
                    setErrorMessage("Deletion Successful");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else if (response.data.statusMessage === "Failed"){
                    setErrorMessage("Deletion Unsuccessful");
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

  return (
    <>
        <nav className="navbar">
            <strong>STACKMONSTERS!</strong>
            <Link to='/' className='navLink'>Add New Card</Link>
        </nav>
        <div className='tableContainer'>
            <h1>All Cards</h1>
                <h2>{errorMessage}</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Card ID</th>
                            <th>CardHolder Name</th>
                            <th>Card Number</th>
                            <th>Card Exp Date</th>
                            <th>Card Cvc</th>
                            <th>Card Provider</th>
                            <th>Update Card</th>
                            <th>Delete Card</th>
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
                            <td>{cardDetail.cardHolderProvider}</td>
                            <td><button className='updateDelete' onClick={() => updateCard(cardDetail.cardID)}>Update</button></td>
                            <td><button className='updateDelete' onClick={() => deleteCard(cardDetail.cardID)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    </>
  )
}

export default Dashboard

import './Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [allCardsInfo, setAllCardsInfo] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [asc, setAsc] = useState(false)
    let sortOption

    const sortingOption = async (sortOption = 'cardID') => {
        setIsLoading(true);
        setAllCardsInfo([]);
        const url = 'http://localhost:3001/CardData/retrieveAllCardsSorted';
        
        Axios.post(url, {
            sortOption : sortOption
        })
        .then((response) => {
            if (response.data.errorMessage){
                setErrorMessage(response.data.errorMessage);
            }
            else {
                let result = response.data[0];
                let sorted = [];
                if (asc) {
                    for (let i = result.length-1; i >= 0; i--) {
                        sorted.push(result[i])
                    }
                    setAllCardsInfo(sorted);
                    setAsc(false);
                } else {
                    setAllCardsInfo(result);
                    setAsc(true)
                }
            }
        })
        .catch((error) => {
            setErrorMessage(<>An Error Occured! <br/> {error.message}</>);
        });
        setIsLoading(false);  
    }

    useEffect(() => {
        setIsLoading(true);
        sortingOption(sortOption)
        setIsLoading(false);  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCard = async (CardID) => {
        navigate(`/updateCardId/${CardID}`);
    }

    const deleteCard = async (cardID) => {
        const url = 'http://localhost:3001/CardData/deleteCardDetail';

        let isOk = window.confirm("Are you sure you want to delete card id " + cardID + "?");

        if (isOk) {
            setIsLoading(true);
            await Axios.post(url, {cardID : cardID})
            .then((response) => {
                if (response.data.statusMessage === "Successful") {
                    setErrorMessage("Deletion Successful");
                    setTimeout(() => {
                        window.location.reload();
                        setIsLoading(false);
                    }, 2000);
                }
                else if (response.data.statusMessage === "Failed"){
                    setErrorMessage("Deletion Unsuccessful");
                    setIsLoading(false);
                }
                else if (response.data.errorMessage){
                    setErrorMessage(response.data.errorMessage);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setErrorMessage(<>An Error Occured! <br/> {error.message}</>);
            });
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
                            <th onClick={() => sortingOption('cardID')}>Card ID</th>
                            <th onClick={() => sortingOption('cardHolderName')}>CardHolder Name</th>
                            <th onClick={() => sortingOption('cardHolderNumber')}>Card Number</th>
                            <th onClick={() => sortingOption('cardHolderExpMonth')}>Card Exp Date</th>
                            <th onClick={() => sortingOption('cardHolderCVC')}>Card Cvc</th>
                            <th onClick={() => sortingOption('cardHolderProvider')}>Card Provider</th>
                            <th onClick={() => sortingOption('cardSavedDate')}>Card Saved Date</th>
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
                            <td>{cardDetail.cardSavedDate}</td>
                            {isLoading && <td><button className='updateDelete' style = {{backgroundColor : "rgb(139, 0, 139)"}} disabled>Update</button></td>}
                            {!isLoading && <td><button className='updateDelete' onClick={() => updateCard(cardDetail.cardID)}>Update</button></td>}
                            {isLoading && <td><button className='updateDelete' style = {{backgroundColor : "rgb(139, 0, 139)"}} disabled>Delete</button></td>}
                            {!isLoading && <td><button className='updateDelete' onClick={() => deleteCard(cardDetail.cardID)}>Delete</button></td>}
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
    </>
  )
}

export default Dashboard

const ExpirationCheck = (expMonth, expYear) => {
    let expired = false;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (expYear < currentYear) {
        expired = true;
    } 
    else if (expMonth < currentMonth && expYear === currentYear) {
        expired = true;
    } 
    
    return expired;
}

export default ExpirationCheck;

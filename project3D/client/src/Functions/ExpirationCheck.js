const ExpirationCheck = (expMonth, expYear) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (expYear < currentYear) {
        return true;
    } 
    else if (expMonth < currentMonth && expYear === currentYear) {
        return true;
    } 
    return false
}

export default ExpirationCheck;

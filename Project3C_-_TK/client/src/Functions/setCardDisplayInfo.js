var name;
var number;
var expMonth;
var expYear;
var cvc;

const SetCardInfo = (passedName, passedNumber, passedExpMonth, passedExpYear, passedCVC) => {
    name = passedName;
    number = passedNumber;
    expMonth = passedExpMonth;
    expYear = passedExpYear;
    cvc = passedCVC;
}

const GetCardInfoName = () => {
    return name;
}

const GetCardInfoNumber = () => {
    return number;
}

const GetCardInfoMonth = () => {
    return expMonth;
}

const GetCardInfoYear = () => {
    return expYear;
}

const GetCardInfoCVC = () => {
    return cvc;
}

export default {
    SetCardInfo,
    GetCardInfoName,
    GetCardInfoNumber,
    GetCardInfoMonth,
    GetCardInfoYear,
    GetCardInfoCVC
};
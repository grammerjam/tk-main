/*
* Referencing
* https://learnersbucket.com/examples/javascript/credit-card-validation-in-javascript/
*/

const validateCardNumber = number => {
    //Check if the number contains only numeric value  
    //and is of between 13 to 19 digits
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(number) || number === '0000000000000000'){
        return false;
    }

    return luhnCheck(number);
}

const luhnCheck = val => {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j === 1) {
        j = 2;
    } else {
        j = 1;
    }
    }

    //Check if it is divisible by 10 or not.
    return (checksum % 10) === 0;
}

export default validateCardNumber;

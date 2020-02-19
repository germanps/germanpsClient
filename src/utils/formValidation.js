export function minLengthValidation(inputData, minLegth) {
    const { value } = inputData;
    //reset classes
    removeClassErrorSuccess(inputData);
    if (value.lenth >= minLegth) {
        //es correct
        inputData.classList.add('success')
        return true;
    }else{
        inputData.classList.add('error');
        return false;
    }
}

export function emailValidation(inputData){
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;
    //reset clases
    removeClassErrorSuccess(inputData);
    //validate with regExp
    const resultValidation = emailValid.test(value);
    if(resultValidation){
        //success
        inputData.classList.add('success');
        return true;
    }else{
        inputData.classList.add('error');
        return false;
    }
}

function removeClassErrorSuccess(inputData) {
    inputData.classList.remove('success');
    inputData.classList.remove('error');
}
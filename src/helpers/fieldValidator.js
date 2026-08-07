function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}


function nameValidator(name, field_name) {
  const re= /^[a-zA-Z ]*$/;
  if (!name) return field_name+" can't be empty."
  if(!re.test(name)) return field_name+" Invalid characters"
  return ''
}


function pincodeValidator(pincode){
  if(pincode.length != 6) return "Pincode Must be 6 digits Long"
  const re = /\d{6}$/
  if(!re.test(pincode)) return "Invalid Pincode"
  return ''

}
function pinValidator(pincode){
  if(pincode.length != 4) return "Pin Must be 4 digits Long"
  const re = /\d{4}$/
  if(!re.test(pincode)) return "Invalid Pin"
  return ''
}

function panValidator(panno){
  if(panno != undefined){
    if(panno.length != 10) return "Invalid Pan No"
    const re = /^[a-zA-Z]{5}\d{4}[A-Za-z]{1}$/gm
    if(!re.test(panno)) return "Enter Valid PAN No"
    return ''
  }
}

function upiValidation(upiID){
  if(upiID != undefined){
    const re = /[a-zA-Z0-9\\.\\-]{2,256}\\@[a-zA-Z][a-zA-Z]{2,64}/;
    if(!re.test(upiID)) return "Enter Valid UPI Id"
    return ''
  }
}

function passwordValidator(password) {
  if (!password) return "Password can't be empty."
  if (password.length < 5) return 'Password must be at least 5 characters long.'
  return ''
}

function mobilenoValidator(mobileno){
  const re = /^[6789]\d{9}$/
  if(!mobileno) return "Mobile no can't be empty."
  if(mobileno.length != 10) return 'Mobile No must be 10 digits long.'
  if(!re.test(mobileno)) return 'Enter Valid Mobile Number'
  return ''
}
function aadharnoValidator(aadharno){
  const re = /^\d{12}$/gm
  if(!aadharno) return "Aadhar no can't be empty."
  if(aadharno.length != 12) return 'Aadhar no must be 12 digits long.'
  if(!re.test(aadharno)) return 'Enter Valid Aadhar Number'
  return ''
}

function gstinValidator(gstin) {
  if (!gstin) return "GST No can't be empty."
  const re = /^\d{2}[a-zA-Z]{5}\d{4}[A-Za-z]{1}\d[Zz]\S$/gm
  if(!re.test(gstin)) return "Please Enter Valid GSTIN"
  return ''
}

function addressValidator(name) {
  if (!name) return "Name can't be empty."
  return ''
}
  

export { emailValidator, 
  nameValidator, 
  passwordValidator, 
  mobilenoValidator, 
  gstinValidator, 
  addressValidator,
  pincodeValidator,
  panValidator,
  upiValidation,
  aadharnoValidator,
  pinValidator
}
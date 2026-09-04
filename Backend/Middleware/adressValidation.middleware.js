
function addressValidation(req,res, next){
    const {fullName, phone, pincode, flatNo, street, landmark, city, state, addressType} = req.body.address

   
if(!fullName.trim() || fullName.length < 2){
    return res.status(400).json({
        success : false,
        message : "Enter a vlid full name"
    })
}

const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(phone)) {
  return res.status(400).json({
    success: false,
    message: "Invalid phone number"
  });
}

const pincodeRegex = /^[1-9]\d{5}$/;

if (!pincodeRegex.test(pincode)) {
  return res.status(400).json({
    success: false,
    message: "Invalid pincode"
  });
}


const flatNumberRegex = /^[a-zA-Z0-9\s\/\-]+$/;

if (!flatNo.trim()) {
  return res.status(400).json({
    success: false,
    message: "Flat number is required"
  });
}

if (!flatNumberRegex.test(flatNo)) {
  return res.status(400).json({
    success: false,
    message: "Invalid flat number. Only letters, numbers, spaces, '-' and '/' are allowed."
  });
}
if(!street.trim()){
   return res.status(400).json({
    success : false,
    message : "Invalid street or area"
})
}
if(!city.trim()){
   return res.status(400).json({
    success : false,
    message : "Invalid city"
})
}
if(!state.trim()){
   return res.status(400).json({
    success : false,
    message : "Invalid state"
})
}

next()
}


export default addressValidation
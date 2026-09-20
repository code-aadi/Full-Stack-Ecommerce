const registerValidation = (req,res,next) => {
const {name, email, password} = req.body
if(!name){
    return res.status(400).json({
        success : false,
        message : "Please Enter a Valid User name"
    })
}
if(!email){
    return res.status(400).json({
        success : false,
        message : "Please Enter a Valid Email Address"
    })
}
if(!password || password.length < 6){
    return res.status(400).json({
        success : false,
        message : "The password must be at least 6 characters long"
    })
}
next()
}

export default registerValidation
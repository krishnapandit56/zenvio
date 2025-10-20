let otpstore = {}

function setotp(email,otp){
otpstore[email]=otp
}

function getotp(email){
 return otpstore[email]
}

module.exports ={setotp,getotp}
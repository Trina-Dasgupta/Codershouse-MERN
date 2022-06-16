const crypto= require('crypto')
const hashService=require('./hash-service')


const smsSid=process.env.SMS_SID;
const smsAuthToken=process.env.SMS_AUTH_TOKEN;
const twilio=require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
})

class OtpService{
    async generateOtp(){
        const otp=crypto.randomInt(1000,9999);
        return otp;
    }
    

    async sendBySms(phone,otp){
        return await twilio.messages.create({
            to:phone,
            from:process.env.SMS_FROM_NUMBER,
            body:`Welcome! to CodersHouse...Your  OTP IS ${otp}.`
        })
    }

    verifyOtp(hashedOtp,data){
        let computedHash=hashService.hashOtp(data);
        return computedHash===hashedOtp;

        // if(computedHash===hashedOtp){
        //     return true;
        // }
        // return false;
    }
}
module.exports=new OtpService();
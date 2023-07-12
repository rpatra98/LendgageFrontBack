import React, { useState } from "react";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "./mobileOtpPage.css";
import {auth} from '../../firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from "react-hot-toast";
import { TextField } from "@mui/material";
import MainButtons from "../MainButtons/mainButtons";

const MobileOtp = ({upliftData}) => {
    const [emailID, setEmailID] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const emailHandler = (e) => {
        const {value} = e.target;
        // setEmailID(e.target.value);
        setEmailID(value);
        setValidEmail(validateEmail(value));
    }
    const validateEmail = (emailID) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailID);
    }
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    
    const doSomething = () => {
        upliftData({emailID, ph});
    }

    function onCaptchVerify(){
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignup()
                },
                'expired-callback': () => {
                }
              }, auth);
        }
    }

    function onSignup(){
        onCaptchVerify()

        // const phoneNumber = getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+' + ph

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => 
            {
                window.confirmationResult = confirmationResult;
                // setLoading(false);
                setShowOTP(true);
                toast.success('OTP sended successfully!');
            }).catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    }

    function onOTPVerify(){
        // setLoading(true);
        window.confirmationResult.confirm(otp).then(async(res)=>{
            console.log(res)
            setUser(res.user)
            // setLoading(false)
        }).catch(err => {
            console.log(err);
            // setLoading(false);
            alert(
                "Wrong OTP"
            )
        })
    }
    // pull switchToBranch addFiles Commit Push
    return (
        <div className="mobileOtp_main">
            <section className="mobileOtp_pageContent">
            <h1 className="pageHeading">We'll need a phone number to reach you</h1>

                <label htmlFor="emailID" className="textBoxHeading">
                    <h4>Your current email address</h4> 
                </label>
                <TextField
                    required
                    id="standard-required"
                    fullWidth
                    label='Required'
                    variant="standard"
                    sx={{marginTop:-3}}
                    value={emailID}
                    onChange={emailHandler}
                    error={!validEmail}
                    helperText={!validEmail ? 'Please enter a valid email address' : ''}
                />
                
                <Toaster toasterOptions={{duration:4000}}/>
                <div id="recaptcha-container"></div>
                {
                    user ? (
                        <h2 className="textBoxHeading">Phone number is validated successfully</h2>
                        ) : (
                            <div>
                            {
                                showOTP ? (
                                    <div>
                                        <div>
                                            <label htmlFor="ph" className="textBoxHeading">
                                            <h4>Please enter your phone number linked to PAN</h4> 
                                            </label>
                                            <div className="mobileEnterAndButton">
                                                
                                                <PhoneInput country={"in"} onFocus={true} value={ph} onChange={setPh} className="mblNumInput"/>
                                                <button onClick={onSignup} className="minorButton">
                                                    {/*loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)*/}
                                                    <span>RESEND OTP</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="otp" className="textBoxHeading">Enter OTP Number</label>
                                            <h5>Please enter the OTP you have received on your phone</h5>
                                            <div className="mobileEnterAndButton">
                                                <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} className="otpInput"></OtpInput>
                                                <button onClick={onOTPVerify} className="minorButton">
                                                    {/*loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)*/}
                                                    <span>SUBMIT</span>
                                                </button>
                                            </div>
                                            <input type="checkbox" id="legalDoc" name="legalDoc" value="legalDoc"/>
                                            <label htmlFor="legalDoc">I agree to Terms and condition</label>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="ph" className="textBoxHeading">
                                           <h4>Please enter your phone number linked to PAN</h4> 
                                        </label>
                                        <div className="mobileEnterAndButton">
                                            
                                            <PhoneInput country={"in"} value={ph} onChange={setPh} className="mblNumInput"/>
                                            <button onClick={onSignup} className="minorButton">
                                {/*loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)*/}
                                                <span>SEND OTP</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                            </div>
                            )
                }
                </section>
                <MainButtons handleClick={doSomething}/>
                </div>
    );
};

export default MobileOtp;


// import React, { useState } from "react";
// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";
// import OtpInput from "otp-input-react";
// import PhoneInput from "react-phone-input-2";
// // import "react-phone-input-2/lib/style.css";
// import "./mobileOtpPage.css";
// import {auth} from '../../firebase.config';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { toast, Toaster } from "react-hot-toast";

// const MobileOtp = () => {
//     const [otp, setOtp] = useState("");
//     const [ph, setPh] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showOTP, setShowOTP] = useState(false);
//     const [user, setUser] = useState(null);
    
//     function onCaptchVerify(){
//         if(!window.recaptchaVerifier){
//             window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//                 'size': 'invisible',
//                 'callback': (response) => {
//                     onSignup()
//                 },
//                 'expired-callback': () => {
//                 }
//               }, auth);
//         }
//     }

//     function onSignup(){
//         setLoading(true)
//         onCaptchVerify()

//         // const phoneNumber = getPhoneNumberFromUserInput();
//         const appVerifier = window.recaptchaVerifier;

//         const formatPh = '+' + ph

//         signInWithPhoneNumber(auth, formatPh, appVerifier)
//             .then((confirmationResult) => 
//             {
//                 window.confirmationResult = confirmationResult;
//                 setLoading(false);
//                 setShowOTP(true);
//                 toast.success('OTP sended successfully!');
//             }).catch((error) => {
//                 console.log(error);
//                 setLoading(false);
//             });
//     }

//     function onOTPVerify(){
//         setLoading(true);
//         window.confirmationResult.confirm(otp).then(async(res)=>{
//             console.log(res)
//             setUser(res.user)
//             setLoading(false)
//         }).catch(err => {
//             console.log(err);
//             setLoading(false);
//         })
//     }

//     return (
//         <div className="mobileOtp_main">
//             <section className="mobileOtp_pageContent">
//             <h1 className="pageHeading">We'll need a phone number to reach you</h1>

            
//                 <Toaster toasterOptions={{duration:4000}}/>
//                 <div id="recaptcha-container"></div>
//                 {
//                     user ? (
//                         <h2>Mobile Number OK</h2>
//                         ) : (
//                             <div>
//                             {
//                                 showOTP ? (
//                                     <div>
//                                         <div>
//                                             <label htmlFor="ph" className="textBoxHeading">
//                                             <h4>Please enter your phone number linked to PAN</h4> 
//                                             </label>
//                                             <div className="mobileEnterAndButton">
                                                
//                                                 <PhoneInput country={"in"} value={ph} onChange={setPh} className="mblNumInput"/>
//                                                 <button onClick={onSignup} className="minorButton">
//                                                     {loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)}
//                                                     <span>SEND OTP</span>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <label htmlFor="otp" className="textBoxHeading">Enter OTP Number</label>
//                                             <h5>Please enter the OTP you have received on your phone</h5>
//                                             <div className="mobileEnterAndButton">
//                                                 <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType="number" disabled={false} className="otpInput"></OtpInput>
//                                                 <button onClick={onOTPVerify} className="minorButton">
//                                                     {loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)}
//                                                     <span>SUBMIT</span>
//                                                 </button>
//                                             </div>
//                                             <input type="checkbox" id="legalDoc" name="legalDoc" value="legalDoc"/>
//                                             <label htmlFor="legalDoc">I agree to Terms and condition</label>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div>
//                                         <label htmlFor="ph" className="textBoxHeading">
//                                            <h4>Please enter your phone number linked to PAN</h4> 
//                                         </label>
//                                         <div className="mobileEnterAndButton">
                                            
//                                             <PhoneInput country={"in"} value={ph} onChange={setPh} className="mblNumInput"/>
//                                             <button onClick={onSignup} className="minorButton">
//                                                 {loading && (<CgSpinner size={20} style={{marginTop:1}} className="animate-spin"/>)}
//                                                 <span>SEND OTP</span>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )
//                             }
//                             </div>
//                         )
//                 }
//                 </section>
//                 </div>
//     );
// };

// export default MobileOtp;
// <PhoneInput country={"in"} value={ph} onChange={setPh} className="mblNumInput"/>
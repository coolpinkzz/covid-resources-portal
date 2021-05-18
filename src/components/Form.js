import React, {useState} from 'react'
import firebaseApp from "../firebase"
import axios from "axios"
import '../App.css'

import ReCAPTCHA from "react-google-recaptcha";
require('dotenv').config()


//var Recaptcha = require('react-recaptcha');

const Form = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phonenumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [requirement, setRequirement] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const [isverify, setVerify] = useState(false)
    const [SRFID, setSRFID] = useState("")
    var db = firebaseApp.firestore();



    function onChange(value) {
        if (value) {
            setVerify(true)
            document.getElementById("captcha-warning").style.display = "none"
        }
    }


    const handleSubmit = async (e) => {
        if (isverify == true) {
            e.preventDefault();
            setIsLoading(true)
            const data = {
                firstname: firstname,
                lastname: lastname,
                requirement: requirement,
                phonenumber: phonenumber,
                address: address,
                city: city,
                state: state,
                SRFID: SRFID
            }

            db.collection("requirement").add({
                data: data
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

            setTimeout(function () {setIsLoading(false); alert("Your form has been submitted we have sent your requirement to your nearest Volunteer.")}, 3000);

            setTimeout(() => {window.location.reload()}, 5000)


            await axios.post('/send', data)
                .then(res => {
                    console.log("data send", res)
                })
                .catch((error) => {
                    console.log("message not sent")
                    setIsLoading(false)
                    e.target.reset()
                })



            e.target.reset()
        }
        else {
            e.preventDefault();
            document.getElementById("captcha-warning").style.display = "block"

        }
    }
    function handlerequirement(e) {
        if (e.target.value === "other") {
            document.getElementById("req-area").style.display = "block"
            setRequirement(e.target.value)

        } else {
            document.getElementById("req-area").style.display = "none"
            setRequirement(e.target.value)
        }
    }

    return (

        <div className="parentform">
            <div>
                <h2>Submit your Requirement and our Volunteer will reach out to you soon..!!</h2>
            </div>

            <form method="POST" action="/send" onSubmit={handleSubmit} >
                <div className="row mt-3">
                    <div className="col">
                        <input name="firstname" aria-required onChange={e => setFirstName(e.target.value)} type="text" className="p-2 form-control shadow-none " required placeholder="First name" />
                    </div>
                    <div className="col">
                        <input name="lastname" type="text" onChange={e => setLastName(e.target.value)} className="p-2 form-control shadow-none" required placeholder="Last name" />
                    </div>
                    <div className="row mt-3">


                        <div className="col">
                            <label className="p-2" style={{color: "gray"}} htmlFor="inputCity">Your Requirement?</label>
                            <select name="state" id="inputState" onChange={(e) => {handlerequirement(e)}} className="form-control py-3 shadow-none" required>
                                <option value="">e.g Plasma, Oxygen</option>
                                <option value="Plasma">Plasma</option>
                                <option value="Oxygen">Oxygen</option>
                                <option value="Hospital Beds">Hospital Beds</option>
                                <option value="Remdevsir/Medicines">Remdevsir/Medicines</option>
                                <option value="Food">Food</option>
                                <option value="Food">Ambulance</option>
                                <option value="other">Other</option>
                            </select>

                            <input style={{display: "none"}} name="requirement" type="text" onChange={e => setRequirement(e.target.value)} className="my-4 form-control shadow-none" id="req-area" placeholder="Enter your Requirement " />
                        </div>


                    </div>
                    <div className="form-group mt-3">
                        <input name="srfif" maxLength="13" type="text" className="form-control shadow-none p-3" onChange={e => setSRFID(e.target.value)} id="inputAddress" required placeholder="Patient SRF ID" required />
                    </div>

                    <div className="col mt-3">
                        <input name="phonenumber" maxLength="10" type="text" inputMode="numeric" onChange={e => setPhoneNumber(e.target.value)} pattern="[0-9]{8,19}" required className=" form-control shadow-none p-3" placeholder="Enter you Mobile Number" />
                    </div>

                    <div className="form-group mt-3">
                        <input name="address" type="text" className="form-control shadow-none p-3" onChange={e => setAddress(e.target.value)} id="inputAddress" required placeholder="Street Address" />
                    </div>

                    <div className="form-row mt-3">
                        <div className="form-group col">

                            <input placeholder="City" name="city" onChange={e => setCity(e.target.value)} type="text" className="form-control shadow-none p-3" required id="inputCity" />
                        </div>
                        <div className="form-group shadow-none col pt-3 ">

                            <select name="state" id="inputState" onChange={e => {

                                setState(e.target.value)
                            }} className="form-control p-3 shadow-none" required>
                                <option value="">Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                        </div>
                        {/*<div className="py-3 g-recaptcha" id="grecaptcha" data-callback="verifyCaptcha" data-sitekey="6LenQr8aAAAAAK5tHQCXqsIJQPSRFSVTGNpHXIcS"></div>
                        <br />*/}

                        {/*<Recaptcha render="explicit" verifyCallback={(res) => console.log(res)} sitekey="6LcU4L8aAAAAAHMXZ-XrrPubBrXriyDrLY6LB4HY" />*/}

                        <ReCAPTCHA
                            id="form-captcha"
                            className="py-3"
                            sitekey="6LenQr8aAAAAAK5tHQCXqsIJQPSRFSVTGNpHXIcS"
                            onChange={onChange}
                        />
                        <p id="captcha-warning" style={{color: "red", display: "none"}}>Please verify youu are human</p>

                        <div className="row  p-3 shadow-none">

                            <button onSubmit={handleSubmit} type="submit" className="btn btn-warning shadow-none">{isloading ? <div className="spinner-border text-success" role="status">
                                <span className="sr-only"></span>
                            </div> : "Submit"}</button>



                        </div>



                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;
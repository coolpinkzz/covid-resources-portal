import React, {useState} from 'react'
import firebaseApp from "../firebase"
import '../App.css'
import axios from 'axios'
import hero from '../assests/hero.png';
import ReCAPTCHA from 'react-google-recaptcha';
require('dotenv').config()






const VolunteerForm = () => {



    var db = firebaseApp.firestore();
    const [phoneno, setPhone] = useState("")
    const [volname, setVolname] = useState("")
    const [isverify, setVerify] = useState(false)
    const [volstate, setVolState] = useState("")
    const [resourcestype, setResourcesType] = useState("")

    function onChange(value) {
        if (value) {
            setVerify(true)
            document.getElementById("captcha-warning").style.display = "none"
        }
    }
    function handlePhoneSubmit(e) {
        e.preventDefault();
        if (isverify) {
            const vol_data = {
                volunteer_Name: volname,
                phone: phoneno,
                volstate: volstate,
                resourcestype: resourcestype
            }
            db.collection("volunteer_details").add({
                vol_data: vol_data
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

            axios.post('/volunteer', vol_data)
                .then(res => {
                    console.log(res, "volunteer number sent")
                })
                .catch((error) => {
                    console.log("number not sent")
                })

            alert("Congratulation you are a Volunteer now !")

            e.target.reset();
        } else {
            e.preventDefault();
            document.getElementById("captcha-warning").style.display = "block"
        }



    }


    return (
        <div className="text-center vol-container">
            <div className="d-flex p-2 align-items-center justify-content-center">
                <img width="50px" src={hero} alt="hero" />
                <a href="/" style={{textDecoration: "none"}} >      <h2> <span style={{color: "#f0ad4e"}} > Covid</span>  Resources Helpline web Portal</h2></a>
            </div>
            <div className="vol">
                <h2>Register and become a Volunteer #reallifehero</h2>

                <form onSubmit={handlePhoneSubmit}>
                    <div className="d-sm-flex d-block row" >
                        <div className="col my-2">
                            <input onChange={(e) => {setVolname(e.target.value)}} className="p-3 " placeholder="Contant Name" type="text" required />
                        </div>
                        <div className="col my-2">
                            <select name="state" id="inputState" onChange={e => {

                                setVolState(e.target.value)
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
                        <div className="col my-2" >
                            <input onChange={(e) => {setResourcesType(e.target.value)}} className="p-3" placeholder="Resources Availablity" type="text" required />
                        </div>



                    </div>




                    <div className="d-flex align-items-center justify-content-center my-4">

                        <span className="prefix" style={{fontSize: "20px"}}>  +91</span>
                        <input placeholder="Enter 10-Digit Number" onChange={e => {setPhone(e.target.value)}} className="mx-3 p-2" type="tel" required />

                    </div>

                    <ReCAPTCHA
                        className="py-3 d-flex justify-content-center "
                        sitekey="6LenQr8aAAAAAK5tHQCXqsIJQPSRFSVTGNpHXIcS"
                        onChange={onChange}
                    />
                    <p id="captcha-warning" style={{color: "red", display: "none"}}>Please verify you are human</p>



                    <p id="captcha-warning" style={{color: "red", display: "none"}}>Please verify youu are human</p>
                    <button type="submit" className="btn btn-warning">Submit</button>
                    <p style={{fontSize: "16px", fontWeight: "bold"}} className="m-2 pt-3">After registration you will get all the details across your state through text sms when someone need covid resources.</p>
                    <p style={{fontSize: "16px"}}>We request you if you are not able to help people who is outside your range then share those details if you find any lead</p>
                </form>
            </div>
        </div >
    )
}

export default VolunteerForm;
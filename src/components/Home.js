import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import '../App.css'
import Form from './Form';
import Volunteer from './Volunteer'
import hero from '../assests/hero.png';



const Home = () => {


    return (
        <>
            <div className="row">
                <div className="head p-4">
                    <div className="row">
                        <div className="d-flex align-items-center col-sm-5 col-12 text-sm-left ">
                            <img width="50px" src={hero} alt="hero" />
                            <a href="/" style={{textDecoration: "none"}} >     <h2> <span style={{color: "#f0ad4e"}} > Covid</span>  Resources Helpline web Portal</h2></a>
                        </div>
                        <div className="col-sm-6 col-12 text-sm-left ">
                            <button type="submit" className="btn btn-warning"><Link style={{textDecoration: "none", color: "inherit"}} to="/volunteer">Click here to Become Volunteer 🙋</Link> </button>
                        </div>
                    </div>
                </div>
                <div className="col-12">

                    <h5 className="text-center p-2">A platform which help you to get COVID resources from a volunteers who are trying to save people's life due to COVID crisis.</h5>
                    <Form />
                </div>
                <footer style={{textAlign: 'center', fontWeight: "bold"}}>
                    Developed by &lt; Pratik Yadav / &gt;
                </footer>

            </div>

        </>
    )
}

export default Home;
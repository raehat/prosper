import '../index'
import Fade from 'react-bootstrap/Fade';
import React, { useState, useEffect } from 'react';
import homepage_img from '../images/homepage_png.png'
import Footer from '../Footer';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import { userSession } from '../Stacks/ConnectWallet';
import { callReadOnlyFunction, stringAsciiCV, standardPrincipalCV } from "@stacks/transactions";
import { StacksTestnet } from '@stacks/network';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    const [patientExists, setPatientExists] = useState(false);

    const [isPatient, setIsPatient] = useState(0)


    return (
        <div id="home">
            <div id="home1">
                <div id="home2">
                    <div id="left-box">
                        <div>Transforming Healthcare, One Block at a Time. </div>
                    </div>
                    {!userSession.isUserSignedIn() &&
                        <div id='please-connect-element' className='center-when-min'>
                            Please connect with the wallet to get started
                        </div>
                    }
                    {userSession.isUserSignedIn() && <Link to='get-started'>
                        <div id="button-get-started">
                            GET STARTED
                        </div>
                    </Link>}
                </div>
                <img id='home-page-img' src={homepage_img} alt="" />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
import { GetStartedCardDoctor, GetStartedCardPatient } from "./Cards/GetStartedCard";
import { useEffect } from "react";
import { userSession } from "../Stacks/ConnectWallet";
import { callReadOnlyFunction } from "@stacks/transactions";
import { standardPrincipalCV } from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (userSession.isUserSignedIn()) {
                const res = await callReadOnlyFunction({
                    contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                    contractName: "Prosper-3",
                    functionName: "patientExists",
                    functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
                    senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
                    network: new StacksTestnet(),
                });

                const res2 = await callReadOnlyFunction({
                    contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                    contractName: "Prosper-3",
                    functionName: "doctorExists",
                    functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
                    senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
                    network: new StacksTestnet(),
                });

                if (res.type==3)
                    navigate("/patient-page")
                if (res2.type==3)
                    navigate("/doctor-page")
            }
        };
        fetchData();

    }, []);

    return (

        <div id="get-started-parent">

            <div style={{
                margin: 30
            }}></div>

            <div id="get-started">
                <GetStartedCardPatient />
                <GetStartedCardDoctor />
                {/* attribute the author */}
                {/* <a href="https://lovepik.com/images/png-3d-animation-character.html">3d Animation Character Png vectors by Lovepik.com</a> */}
                {/* Image by <a href="https://www.freepik.com/free-psd/3d-female-character-pointing-up_13678514.htm#query=3d%20woman&position=0&from_view=keyword&track=ais">Freepik</a> */}
                {/* <a href='https://pngtree.com/so/3d'>3d png from pngtree.com/</a> */}
            </div>

        </div>

    );
}

export default GetStarted;
import { useState } from "react"
import { userSession } from "../../Stacks/ConnectWallet"
import { StacksTestnet } from "@stacks/network";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { callReadOnlyFunction } from "@stacks/transactions";
import { standardPrincipalCV, cvToString } from "@stacks/transactions";

const DoctorPage = () => {

    const [uniqueNames, setUniquenames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (userSession.isUserSignedIn()) {
                const res = await callReadOnlyFunction({
                    contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                    contractName: "Prosper-3",
                    functionName: "get-patients-assigned-to-doctor",
                    functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
                    senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
                    network: new StacksTestnet(),
                });

                let strList = cvToString(res.value).replace(")", "")
                // strList.replace("(list", "")
                setUniquenames(Array.from(new Set(strList.split(' '))))
                console.log(typeof (uniqueNames))

                uniqueNames.map((add) => (
                    console.log(add)
                ))

                console.log(uniqueNames)
                // setListOfDoctors(res.value.list)
            }
        };
        fetchData();

    }, []);

    function PatientAssignedCard(props) {

        const add = props.add

        const [doctorName, setDoctorName] = useState("")
        const [areaOfExpertise, setareaOfExpertise] = useState("")
        const [practiceType, setpracticeType] = useState("")
        const [doctorPhoneNo, setdoctorphoneno] = useState("")


        useEffect(() => {
            if (add != '(list') {
                const fetchData = async () => {
                    if (userSession.isUserSignedIn()) {
                        const res = await callReadOnlyFunction({
                            contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                            contractName: "Prosper-3",
                            functionName: "get-patient-info",
                            functionArgs: [standardPrincipalCV(add)],
                            senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
                            network: new StacksTestnet(),
                        });

                        console.log(res.value.data)
                        const patientInfo = res.value.data

                        setDoctorName(res.value.data.name.data)
                        setdoctorphoneno(res.value.data['phone-no'].value)
                        setareaOfExpertise(res.value.data['area-of-expertise'].data)
                        setpracticeType(res.value.data['practice-type'].data)

                    }
                };
                fetchData();
            }

        }, []);

        if (add == '(list')
            return null

        return (
            <Card id="doctor-assigned-card">
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                        <b>Name of doctor</b> : {doctorName}
                    </Card.Text>
                    <Card.Text>
                        <b>Phone number: </b> : {doctorPhoneNo}
                    </Card.Text>
                    <Card.Text>
                        <b>Practice Type: </b> : {practiceType}
                    </Card.Text>
                    <Card.Text>
                        <b>Area of expertise: </b> : {areaOfExpertise}
                    </Card.Text>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="dark">ADD</Button>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div id="doctor-page">
            <div id="doctor-page-heading">
                <b>Here is a list of patients who assigned you as their doctor. You can click "treat patient" to treat them.</b>
            </div>
        </div>
    );
}

export default DoctorPage;
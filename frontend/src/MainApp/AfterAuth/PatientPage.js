import { useConnect } from "@stacks/connect-react";
import { callReadOnlyFunction, stringAsciiCV, standardPrincipalCV, standardPrincipalCVFromAddress, cvToString } from "@stacks/transactions";
import { userSession } from "../../Stacks/ConnectWallet";
import { StringAsciiCV } from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";
import { ClarityValue } from "@stacks/transactions";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Card } from 'react-bootstrap';

const PatientPage = () => {

    const navigate = useNavigate();

    const [uniqueNames, setUniquenames] = useState([]);

    // const [listOfDoctors, setListOfDoctors] = useState([])

    // standardPrincipalCV("ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN", "Prosper-3")
    // const res = await callReadOnlyFunction({
    //     contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
    //     contractName: "Prosper-3",
    //     functionName: "get-patient-info",
    //     functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
    //     senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
    //     network : new StacksTestnet(),
    //   })

    // // console.log("testnet:" + userSession.loadUserData().profile.stxAddress.testnet)

    //   console.log("res: " + JSON.stringify(res.value.data.name.data, (_, value) => typeof value === 'bigint' ? value.toString() : value))
    //   console.log("res: " + JSON.stringify(res.value.data['phone-no'].value, (_, value) => typeof value === 'bigint' ? value.toString() : value))
    //   console.log("res: " + JSON.stringify(res.value.data['blood-group'].data, (_, value) => typeof value === 'bigint' ? value.toString() : value))
    //   console.log("res: " + JSON.stringify(res.value.data['treatment-count'].value, (_, value) => typeof value === 'bigint' ? value.toString() : value))

    useEffect(() => {
        const fetchData = async () => {
            if (userSession.isUserSignedIn()) {
                const res = await callReadOnlyFunction({
                    contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                    contractName: "Prosper-3",
                    functionName: "get-doctors-assigned-to-patient",
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

    // console.log(listOfDoctors)

    function DoctorAssignedCard(props) {

        const add = props.add

        const [areaOfExpertise, setareaOfExpertise] = useState("")
        const [nameDoctor, setnameDoctor] = useState("")
        const [phoneNo, setphoneNo] = useState("")
        const [practiceType, setpracticeType] = useState("")


        useEffect(() => {
            if (add != '(list') {
                const fetchData = async () => {
                    if (userSession.isUserSignedIn()) {
                        const res = await callReadOnlyFunction({
                            contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
                            contractName: "Prosper-3",
                            functionName: "get-doctor-info",
                            functionArgs: [standardPrincipalCV(add)],
                            senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
                            network: new StacksTestnet(),
                        });

                        console.log(res.value.data)
                        const doctorInfo = res.value.data

                        setareaOfExpertise(doctorInfo['area-of-expertise'].data)
                        setnameDoctor(doctorInfo['name'].data)
                        setphoneNo(doctorInfo['phone-no'].value)
                        setpracticeType(doctorInfo['practice-type'].data)

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
                        <b>Name of doctor</b> : { nameDoctor }
                    </Card.Text>
                    <Card.Text>
                        <b>Phone number: </b> : { phoneNo }
                    </Card.Text>
                    <Card.Text>
                        <b>Practice Type: </b> : { practiceType }
                    </Card.Text>
                    <Card.Text>
                        <b>Area of expertise: </b> : { areaOfExpertise }
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
        <div id="patient-page">

            <div id="patient-page-heading">
                <b>ADD ADDRESS/PRINCIPAL OF DOCTOR WHO YOU WANT TO ASSIGN YOURSELF</b>
            </div>

            <div id="add-patient-to-user">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Public address of the doctor</Form.Label>
                        <Form.Control type="" placeholder="public address" />
                        <Form.Text>NOTE: It may take some time for data to add in blockchain</Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        ADD
                    </Button>
                </Form>
            </div>

            <div id="list-of-doctos">
                <div id="lod-heading">
                    <b>LIST OF DOCTORS ASSIGNED TO YOU</b>
                </div>
                <div id="list-of-doctors1">
                    {
                        uniqueNames.map((add, index) => (
                            <DoctorAssignedCard add={add} />
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default PatientPage;
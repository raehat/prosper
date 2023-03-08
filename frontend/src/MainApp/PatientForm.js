import { Connect, useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  stringUtf8CV,
  uintCV,
} from "@stacks/transactions";
import { authOptions, userSession } from "../Stacks/ConnectWallet";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ContractCallAddPatient, ContractCallVote, ContractCallAddPatient2 } from '../ContractCalls/ContractCalls';

const PatientForm = () => {

    const { doContractCall } = useConnect()
    const navigate = useNavigate();

    console.log(doContractCall)

    const [pname, setPname] = useState("")
    const [pnumber, setPnumber] = useState("")
    const [pbloodgroup, setPbloodgroup] = useState("")

    return (
        <Form>
            <Form.Group className="mb-3" controlId="">
                <Form.Label>Your name</Form.Label>
                <Form.Control type="" placeholder="Enter your name" value={pname} onChange={(e) => { setPname(e.target.value) }} />
                <Form.Text className="text-muted">
                    Please enter your full name
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="" placeholder="Phone number" value={pnumber} onChange={(e) => { setPnumber(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="">
                <Form.Label>Blood group</Form.Label>
                <Form.Control type="" placeholder="blood group" value={pbloodgroup} onChange={(e) => { setPbloodgroup(e.target.value) }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="All information I have provided is correct and I agree to the fact that this information will
        be stored on the Stacks blockchain" />
            </Form.Group>

            <Button onClick={() => {
                // <ContractCallAddPatient name = {pname} number = {pnumber} bloodgroup={pbloodgroup}/>
                // <Connect authOptions={authOptions}>
                //     <ContractCallAddPatient name={pname} number={pnumber} bloodgroup={pbloodgroup} />
                // </Connect>

                ContractCallAddPatient2(pname, pnumber, pbloodgroup, doContractCall, navigate)
                
            }} variant="primary" type="button">
                Submit
            </Button>

        </Form>
    );
}

export default PatientForm;
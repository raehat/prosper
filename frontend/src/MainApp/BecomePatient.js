import PatientForm from "./PatientForm";
import '../index.css'
import { Connect } from "@stacks/connect-react";
import { authOptions } from "../Stacks/ConnectWallet";

const BecomePatient = () => {
    return (<div>
        <div id="add-patient-heading">
            <b>ADD PATIENT</b>
        </div>
        <div id="please-fill">
            <b>PLEASE FILL ALL THE DETAILS</b>
        </div>
        <div id="patient-form">
            <Connect authOptions={authOptions}>
                <PatientForm />
            </Connect>
        </div>
    </div>);
}

export default BecomePatient;
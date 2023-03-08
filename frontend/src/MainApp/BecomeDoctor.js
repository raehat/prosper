import DoctorForm from "./DoctorForm";

const BecomeDoctor = () => {
    return (<div>
        <div id="add-patient-heading">
            <b>ADD DOCTOR</b>
        </div>
        <div id="please-fill">
            <b>PLEASE FILL ALL THE DETAILS</b>
        </div>
        <div id="patient-form">
            <DoctorForm />
        </div>
    </div>);
}
 
export default BecomeDoctor;
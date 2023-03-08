import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import doctor_png from '../../images/doctor_png_3.png'
import patient_png from '../../images/patient-png.png.png'

function GetStartedCardPatient() {
    return (
        // <div id='gs-card-1'>
        <Card id='gs-card-1' style={{ width: '54rem' }}>
            <Card.Img id='get-started-card-sizing-2' variant="top" src={patient_png} />
            <Card.Body>
                <Card.Title>Become a patient!</Card.Title>
                <Card.Text>
                    You can choose to become a patient! Get access to numerous doctors without worrying about
                    your prescription data being under any manipulation!
                </Card.Text>
                <Link to='/become-patient'>
                    <Button variant="dark">Become a patient</Button>
                </Link>
            </Card.Body>
        </Card>

    );
}

function GetStartedCardDoctor() {
    return (
        // <div id="gs-card-2">
        <Card id='gs-card-2' style={{ width: '54rem' }}>
            <Card.Img id='get-started-card-sizing' variant="top" src={doctor_png} />
            <Card.Body>
                <Card.Title>Become a doctor!</Card.Title>
                <Card.Text>
                    You can choose to register yourself as a doctor! You take care of treatments, we'll take care of you receiving your
                    payments and getting patients!
                </Card.Text>
                <Link to='/become-doctor'>
                    <Button variant="dark">Become a doctor</Button>
                </Link>
            </Card.Body>
        </Card>

    );
}

export { GetStartedCardDoctor, GetStartedCardPatient };
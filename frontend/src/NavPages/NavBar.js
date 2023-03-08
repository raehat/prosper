import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { userSession, ConnectWallet, authenticate, disconnect } from '../Stacks/ConnectWallet';
import { useLocation } from 'react-router-dom'
import ProfileDetails from '../MainApp/Cards/ProfileDetails';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { callReadOnlyFunction } from "@stacks/transactions";
import { standardPrincipalCV } from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";

function NavBar(props) {

  const [showProfile, setShowProfile] = useState(false)
  const [showProfileDoc, setShowProfileDoc] = useState(false)

  const [patientName, setPatientName] = useState("")
  const [phoneNo, setphoneNo] = useState("")
  const [bloodGroup, setbloodGroup] = useState("")
  const [treatmentCount, settreatmentCount] = useState("")

  const [doctorName, setDoctorName] = useState("")
  const [areaOfExpertise, setareaOfExpertise] = useState("")
  const [practiceType, setpracticeType] = useState("")
  const [doctorPhoneNo, setdoctorphoneno] = useState("")

  console.log("lol" + userSession.isUserSignedIn())

  const connected = props.conn
  const setConnected = props.setconn

  const location = useLocation();

  function ExtraElements() {

    console.log("loc: " + location.pathname)

    if (location.pathname == '/patient-page' || location.pathname == '/treatments-patient') {
      return (
        <>
          <LinkContainer to='Your Profile'>
            <Nav.Link className='unclickable' onClick={(event) => {
              event.preventDefault()
              setShowProfile(true)
              console.log(showProfile)
            }}>
              Profile Details
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/treatments-patient'>
            <Nav.Link to='/treatments-patient'>
              Treatments
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/patient-page'>
            <Nav.Link to='/patient-page'>
              Doctors
            </Nav.Link>
          </LinkContainer>

        </>
      )
    }

    if (location.pathname == '/doctor-page') {
      return (
        <>
          <LinkContainer to='Your Profile'>
            <Nav.Link className='unclickable' onClick={(event) => {
              event.preventDefault()
              setShowProfileDoc(true)
              console.log(showProfileDoc)
            }}>
              Profile Details
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/doctor-page'>
            <Nav.Link to='/doctor-page'>
              Patients
            </Nav.Link>
          </LinkContainer>
        </>
      )
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (userSession.isUserSignedIn()) {
        if (location.pathname == '/patient-page' || location.pathname == '/treatments-patient') {
          const res = await callReadOnlyFunction({
            contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
            contractName: "Prosper-3",
            functionName: "get-patient-info",
            functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
            senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
            network: new StacksTestnet(),
          });

          setPatientName(res.value.data.name.data)
          setphoneNo(res.value.data['phone-no'].value)
          setbloodGroup(res.value.data['blood-group'].data)
          settreatmentCount(res.value.data['treatment-count'].value)
        }
        if (location.pathname == '/doctor-page') {
          const res = await callReadOnlyFunction({
            contractAddress: "ST8DK55E6VCWS3JTVEXZQ8XQZM49V6KF3DFRB7HN",
            contractName: "Prosper-3",
            functionName: "get-doctor-info",
            functionArgs: [standardPrincipalCV(userSession.loadUserData().profile.stxAddress.testnet)],
            senderAddress: userSession.loadUserData().profile.stxAddress.testnet,
            network: new StacksTestnet(),
          });

          console.log(res)

          setDoctorName(res.value.data.name.data)
          setdoctorphoneno(res.value.data['phone-no'].value)
          setareaOfExpertise(res.value.data['area-of-expertise'].data)
          setpracticeType(res.value.data['practice-type'].data)

          console.log(res.value.data.name.data)
          console.log(res.value.data['phone-no'].value)
          console.log(res.value.data['area-of-expertise'].data)
          console.log(res.value.data['practice-type'].data)

        }

      }
    };
    if (showProfile || showProfileDoc) {
      fetchData();
    }

  });

  return (
    <>

      <Modal show={showProfile} onHide={() => setShowProfile(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="patient-info-parent">
            <div><b>Name:</b> {doctorName}</div>
            <div><b>Phone number:</b> {phoneNo}</div>
            <div><b>Blood group:</b> {bloodGroup}</div>
            <div><b>Treatment count:</b> {treatmentCount}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowProfile(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProfileDoc} onHide={() => setShowProfileDoc(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="doctor-info-parent">
            <div><b>Name:</b> {doctorName}</div>
            <div><b>Phone number:</b> {doctorPhoneNo}</div>
            <div><b>Area of expertise:</b> {areaOfExpertise}</div>
            <div><b>Practice Type:</b> {practiceType}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowProfileDoc(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <div>
              <b>p</b>rosper
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ms-auto">

              <LinkContainer to='/'>
                <Nav.Link to="/">Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to='about'>
                <Nav.Link to="/about">About</Nav.Link>
              </LinkContainer>

              <ExtraElements />

              <Nav.Link>

                {!userSession.isUserSignedIn() && <div style={{ color: 'green' }} onClick={authenticate}>Connect Wallet</div>}
                {userSession.isUserSignedIn() && <div onClick={disconnect} style
                  ={{ color: 'red' }}
                >Disconnect</div>}

              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
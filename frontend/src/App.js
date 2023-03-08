import logo from './logo.svg';
import NavBar from '../src/NavPages/NavBar'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactDOM } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/NavPages/Home';
import About from '../src/NavPages/About'
import { authenticate, authOptions, ConnectWallet, disconnect } from './Stacks/ConnectWallet';
import { useState } from 'react';
import GetStarted from './MainApp/GetStarted';
import BecomePatient from './MainApp/BecomePatient';
import BecomeDoctor from './MainApp/BecomeDoctor';
import { ContractCallAddPatient, ContractCallVote } from './ContractCalls/ContractCalls';
import { Connect } from '@stacks/connect-react';
import PatientPage from './MainApp/AfterAuth/PatientPage';
import DoctorPage from './MainApp/AfterAuth/DoctorPage';
import TreatmentsPatient from './MainApp/AfterAuth/TreatmentsPatient';

function App() {

  return (
    <BrowserRouter>
      <NavBar ></NavBar>
      <Routes>
        <Route path='/'>
          {/* <Route index element={<Home />} /> */}
          <Route index element={
            <Home/>
          } />
          <Route path="about" element={<About />} />
          <Route path='get-started' element={<GetStarted/>}/>
          <Route path='become-patient' element={<BecomePatient/>}/> 
          <Route path='become-doctor' element={<BecomeDoctor/>}/>
          <Route path='treatments-patient' element={<TreatmentsPatient/>}/>
          <Route path='patient-page' element={
            <Connect authOptions={authOptions}>
              <PatientPage/>
            </Connect>
          }/>
          <Route path='doctor-page' element={ 
            <DoctorPage/>  
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

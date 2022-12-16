
import {Container, Nav, Navbar} from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import Home from "../pages/Home";
import NoPage from "../pages/NoPage";
import Therapists from '../pages/Therapists';
import Calendar from '../pages/Calendar';

function ClinicNavbar() {
  return (
    <>
      {
          <BrowserRouter  bg="dark" variant="dark">
            <Routes className="me-auto">
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="therapists" element={<Therapists />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
      }
    </>
  );
}

export default ClinicNavbar;
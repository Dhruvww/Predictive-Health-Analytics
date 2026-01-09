import Footer from './Common/Footer'
import Header from './Common/Header'
import Appointments from './Pages/Appointments'
import Doctor from './Pages/Doctor'
import History from './Pages/History'
import Predict from './Pages/Predict'
import Login from './Pages/Login'
import Register from './Pages/Register'
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Heart from './Pages/Heart'
import Kidney from './Pages/Kidney'
import Pneumonia from './Pages/Pneumonia'
import BrainTumor from './Pages/BrainTumor'
import About from './Pages/About'
import Welcome from './Pages/Welcome'
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/Dashboard';

function App() {
  const { pathname } = useLocation();
  const hidePaths = ['/Welcome', '/', '/Register'];

  return (
    
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    {!hidePaths.includes(pathname) && <Header />}
    <Routes>
    <Route path='/Dashboard' element={<Dashboard />} />
    <Route path='/Doctor' element={<Doctor />} />
    <Route path='/History' element={<History />} />
    <Route path='/Appointments' element={< Appointments/>} />
    <Route path='/Predict' element={<Predict />} />
    <Route path='/' element={<Login />} />
    <Route path='/Register' element={<Register />} />
    <Route path='/Heart' element={<Heart  />} />
    <Route path='/Kidney' element={<Kidney />}/>
    <Route path="/pneumonia" element={<Pneumonia />} />
    <Route path="/brain_tumor" element={<BrainTumor />} />
    <Route path="/About" element={<About />} />
    <Route path="/Welcome" element={<Welcome />} />
    </Routes>
    {!hidePaths.includes(pathname) && <Footer />}
    </>
  )
}

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);



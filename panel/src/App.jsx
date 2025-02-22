import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Signup from "./pages/Admin/Signup/signup";
import Login from "./pages/Admin/Login/login";
import User from "./pages/User/user";
import Intro from "./pages/Admin/Intro/intro";
import About from "./pages/Admin/About/about";
import Projects from "./pages/Admin/Projects/project";
import Experience from "./pages/Admin/Experience/experience";
import Certification from "./pages/Admin/Certification/certification";
import Contact from "./pages/Admin/Contact/contact";
import Rightbar from './components/rightbar';
import Contactme from './pages/Admin/Contactme/contactme';
import Education from './pages/Admin/Education/education';
import Contactus from './pages/User/Contact/Contact';

function App() {

  console.log("url",process.env)
  return (
    <>
    {/* / */}
      <div className="">
       <BrowserRouter>
       <Routes>
       <Route path='/' element={<User/>} />
       <Route path='/login' element={<Login/>} />
       <Route path='/signup' element={<Signup/>} />
       <Route path='/intro' element={<Intro/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/projects" element={<Projects/>} />
       <Route path="/experience" element={<Experience/>} />
       <Route path="/certification" element={<Certification/>} />
       <Route path="/contact" element={<Contact/>} />
       <Route path="/rightbar" element={<Rightbar/>} />
       <Route path="/contactme" element={<Contactme/>} />
       <Route path="/education" element={<Education/>} />
       <Route path="/contactus" element={<Contactus/>} />
       </Routes>
       </BrowserRouter>
       
       </div>
    </>
  )
}

export default App

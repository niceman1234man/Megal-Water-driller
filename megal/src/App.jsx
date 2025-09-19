import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './admin/Login.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './admin/Dashboard.jsx'
import EditAbout from './admin/EditAbout.jsx'
import Services from './admin/Services.jsx'
import Projects from './admin/Projects.jsx'
import ContactSettings from './admin/ContactSettings.jsx'
import Testimonials from './pages/Testimonial.jsx'
import Gallery from './pages/Gallery.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AboutUs from './pages/About.jsx'
import Servicess from './pages/Services.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Project from './pages/Project.jsx'
import GalleryAdmin from './admin/Gallery.jsx'
import Testimonialss from './admin/Testimonials.jsx'
import MessageAdmin from './admin/MessageAdmin.jsx'
import ForgotPassword from './admin/ForgotPassword.jsx'
import ResetPassword from './admin/ResetPassword.jsx'
import ChangePassword from './admin/ChangePassword.jsx'
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute.jsx'
function App() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/services" element={<Servicess />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Auth routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-about"
            element={
              <ProtectedRoute>
                <EditAbout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <ProtectedRoute>
                <Testimonialss />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute>
                <ContactSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <GalleryAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <MessageAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App
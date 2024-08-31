import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Buy from './pages/Buy';
import SellForm from './pages/SellForm';
import About from './pages/About';
import Accounts from './pages/Accounts';
import { FormProvider } from './context/FormContext';
import { StepProvider } from './context/StepContext';

// import PropertyDetails from './PropertyDetails';
// import EditProperty from './EditProperty';
// import Contact from './Contact';
// import ForgotPasswordPage from './ForgotPasswordPage';

const Layout = () => {

  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/buy/:search_query" element={<Buy />} />
            <Route path="/sell_home" element={
              <FormProvider>
                <StepProvider>
                  <SellForm/>
                </StepProvider>
              </FormProvider>
            } />
            <Route path="/about" element={<About />} />
            <Route path='/accounts' element={<Accounts />} />
            {/* <Route path='/contact' element={<Contact />} /> */}
            {/* <Route path='/forgot-password' element={<ForgotPasswordPage />} /> */}
            {/* <Route path='/property_details/:property_id' element={<PropertyDetails />}/>
            <Route path='/edit-property/:property_id' element={<EditProperty />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Layout;
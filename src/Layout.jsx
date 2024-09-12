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
    <div className='tw-h-screen tw-flex tw-flex-col tw-bg-zinc-100'>
      <Router>
        <Header />
        <main className='tw-h-[90vh] lg:tw-h-[85vh] tw-w-full tw-relative'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
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
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default Layout;
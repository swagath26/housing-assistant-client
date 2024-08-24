import FooterComponent from './FooterComponent';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (location.pathname.includes('/buy')) {
    return null;
  }
  return (
    <FooterComponent />
  );
};

export default Footer;
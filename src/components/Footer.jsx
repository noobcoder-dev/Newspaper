import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaTelegram } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-purple-900 text-white p-4 mt-8">
    <div className="container mx-auto flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <FaFacebookF />
        <FaTwitter />
        <FaYoutube />
        <FaInstagram />
        <FaTelegram />
      </div>
      <p className="text-sm text-center">Copyright (c) News Daily All Rights Reserved</p>
      <p className="text-center text-sm mt-2 text-green-400">Designed by Moses samanthakurthi</p>
    </div>
  </footer>
);
  
export default Footer;

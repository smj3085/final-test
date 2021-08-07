import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FaPlane } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <footer className="footer font-header" sticky="bottom">
      <div>
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
        <h6>
          Developed by TravelBlog <FaPlane />
        </h6>
      </div>
    </footer>
  );
};

export default Footer;

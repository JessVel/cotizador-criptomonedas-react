import React from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import WOW from 'wowjs';

const MensajeError = styled.p`
  background-color: #b7322c;
  padding: 1rem;
  color: #fff;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: "Bebas Neue", cursive;
`;

const Error = ({ mensaje }) => {

  const wow = new WOW.WOW({
    offset: 100,
    mobile: false, 
    live: true 
  })

  wow.init();

  return (
    
    <div  className="wow bounceIn">
    <MensajeError>{mensaje}</MensajeError>
    </div>
    
  );
}

Error.prototypes = {
  mensaje: PropTypes.string.isRequired
}

export default Error;

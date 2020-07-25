import React from "react";
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`
    background-color: #ccc;
    color: #000;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    text-align:center;
    
`;

const Info = styled.p`
 font-size:18px;
    span{
        font-weight:bold;
    }
`;

const Precio= styled.p`
    font-size:30px;
`;

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;

  return (
    <ResultadoDiv>
      <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
      <Info>Precio mas alto del día: <span>{resultado.HIGHDAY}</span></Info>
      <Info>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></Info>
      <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
      <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
      
    </ResultadoDiv>
  );
}

Cotizacion.prototypes = {
  resultado: PropTypes.object.isRequired
}

export default Cotizacion;

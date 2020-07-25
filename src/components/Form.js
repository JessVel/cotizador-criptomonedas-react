import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ( {handleMoneda, handleCriptomoneda} ) => {
  //state del listado de criptomonedas
  const [listacripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar Estadounidense" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "ARG", nombre: "Peso Argentino" },
  ];

  //utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  //utilizar criptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  //ejecutar llamado a la api
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await Axios.get(url);
      setListaCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar si ambos campos estan llenos
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }

    //pasar los daros al componente principal
    setError(false);

    handleMoneda(moneda);
    handleCriptomoneda(criptomoneda);
  };


  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatiorios" /> : null}
      <SelectMonedas />

      <SelectCripto />

      <Boton type="submit" value="Calcular" />
    </form>
  );
}

Form.prototypes = {
  handleMoneda: PropTypes.object.isRequired,
  handleCriptomoneda: PropTypes.object.isRequired
}

export default Form;

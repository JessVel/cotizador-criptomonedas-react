import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Form from "./components/Form";
import Cotizacion from "./components/Cotizacion";
import Footer from './components/Footer';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;

  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  margin-top: 50px;
  margin-bottom: 50px;

  &&::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {
    
    const cotizarCriptomoneda = async () => {
      //evitamos la ejecucion la primera vez
      if (moneda === "") return;

      //consultar api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //mostrar el spinner
      setCargando(true);

      //ocultar spinner y mostrar el resultado
      setTimeout( ()=>{

        //cambiar el estado de cargando
        setCargando(false);

        //guardar cotizacion
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);
      
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  //mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado}/>


  return (
    <>
    <Contenedor>
      <div >
        <Imagen src={imagen} alt="imagen crypto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Form
        handleMoneda={setMoneda}
        handleCriptomoneda={setCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
    <Footer />
    </>
  );
}

export default App;

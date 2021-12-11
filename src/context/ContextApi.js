import React, { createContext, useState, useContext } from "react";
import modelo from "../modelo.json";

const ApiContext = createContext();

export default function ContextApi({ children }) {
  const INITIAL_DISCIPLINA = modelo != null ? modelo : {
    "curso": "",
    "tipo": "", /*Bacharel ou Licenciatura*/
    "anoletivo": "", /** 2021/1 */
    "atividadeComplementarAt": 0,
    "atividadeComplementarAp": 0,
    "atividadeComplementarCredito": 0,
    "quantidadePeriodo": 0,
    "periodos": []
  };

  const [Data, setData] = useState(INITIAL_DISCIPLINA);
  const [step, setStep] = useState(1);

  // const initialDisciplina = {
  //   "nome": "",
  //   "creditos": 0,
  //   "codigo": "",
  //   "cargaHorariaTeorica": 0,
  //   "cargaHorariaPratica": 0
  // };
  const initialDisciplina = modelo;
  const initialPeriodo = (n) => {
    let retornP = { "id": `${n}`, "periodo": `${n}º Período`, "disciplinas": [initialDisciplina] }
    return retornP;
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...Data,
      [name]: value
    });
  }

  const handleChangePeriodos = (e) => {
    const { name, value } = e.target
    let periodosPreenchidos = []

    if (value) {
      for (var i = 0; i < value; i++) {
        periodosPreenchidos.push(initialPeriodo(i + 1));
      }
    }

    setData({
      ...Data,
      [name]: value,
      periodos: periodosPreenchidos,
    })
  }

  const nextStep = () => {
    setStep(prevState => prevState + 1)
  }

  const prevStep = () => {
    setStep(prevState => prevState - 1)
  }

  return (
    <ApiContext.Provider value={{
      Data,
      setData,
      initialPeriodo,
      handleChange,
      nextStep,
      prevStep,
      step,
      handleChangePeriodos
    }}>
      {children}
    </ApiContext.Provider>
  );
}

//Caso tenha uma função nova para exporta tem que adicionar ela aqui no useApi é assim que pego ela nas paginas
export function useContextApi() {
  const context = useContext(ApiContext);
  if (!context)
    throw new Error("useUser must be used within a Context.Provider");
  const {
    Data,
    setData,
    initialPeriodo,
    handleChange,
    nextStep,
    prevStep,
    step,
    handleChangePeriodos
  } = context;
  return {
    Data,
    setData,
    initialPeriodo,
    handleChange,
    nextStep,
    prevStep,
    step,
    handleChangePeriodos
  };
}
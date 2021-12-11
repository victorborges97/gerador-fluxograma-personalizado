import React from "react"
import { useContextApi } from "../../context/ContextApi";
import Fluxograma from "../../pages/Fluxograma";
import NewFluxo from "../NewFluxo";
import TwoFluxo from "../TwoFluxo";

const UserForm = () => {

  const { step } = useContextApi();

  function Passos() {
    switch (step) {
      case 1:
        return (
          <NewFluxo />
        )

      case 2:
        return (
          <TwoFluxo />
        )

      case 3:
        return (
          <Fluxograma />
        )

      default:
        break;
    }
  }



  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {Passos()}
    </div>
  )
}

export default UserForm;

import { Button, ButtonGroup } from "@material-ui/core";
import React, { useState, useEffect } from "react"
import { useContextApi } from "../../context/ContextApi";
import './index.css';

const Fluxograma = () => {

  const { Data: data, prevStep } = useContextApi()

  let totalSomaCreditos = 0;
  let totalSomaChAt = 0;
  let totalSomaChAp = 0;

  const [creditosTotal, setCreditosTotal] = useState(0) // CRÉDITOS
  const [chAtTotal, setChAtTotal] = useState(0) // CH - AT
  const [chApTotal, setChApTotal] = useState(0) // CH - AP


  const [creditosAtivComplementares, setCreditosAtivComplementares] = useState(0) // ATIVIDADES COMPLEMENTARES (Horas)
  const [chatAtivComplementares, setChatAtivComplementares] = useState(0) // ATIVIDADES COMPLEMENTARES (Horas)
  const [chapAtivComplementares, setChapAtivComplementares] = useState(0) // ATIVIDADES COMPLEMENTARES (Horas)

  const texto_header = data && `Fluxograma do Curso de ${data.tipo} em ${data.curso} – ${data.anoletivo}`;

  function contarTotais() {
    data &&
      data.periodos.map(item => {
        if (item.disciplinas) {
          item.disciplinas.map(arr => {
            totalSomaCreditos += Number(arr.creditos);
            totalSomaChAt += Number(arr.cargaHorariaTeorica);
            totalSomaChAp += Number(arr.cargaHorariaPratica);
            return true
          })
        } else {
          return true
        }
      })
  }

  useEffect(() => {
    contarTotais();
    setCreditosTotal(totalSomaCreditos);
    setChAtTotal(totalSomaChAt);
    setChApTotal(totalSomaChAp);
  }, [contarTotais, totalSomaChAp, totalSomaChAt, totalSomaCreditos])


  const Disciplina = ({ disciplina }) => (
    <div className="periodo__container_disciplinas">

      <div className="periodo__container_disciplinas_cred_codigo">
        <div className="cred_codigo__creditos">{disciplina.creditos + " Créd"}</div>
        <div className="cred_codigo__vazio"></div>
        <div className="cred_codigo__codigo">{disciplina.codigo}</div>
      </div>
      <div className="periodo__container_disciplinas_nome">
        {disciplina.nome}
      </div>
      <div className="periodo__container_disciplinas_carga__horaria">
        {disciplina.cargaHorariaTeorica + " T + " + disciplina.cargaHorariaPratica + " P"}
      </div>

    </div>
  )

  const TotalCreditos = ({ creditosTotais }) => (
    <div className="periodo__container_disciplinas">
      <div className="periodo__container_totalcreditos_carga__horaria">
        {creditosTotais}
      </div>
    </div>
  )

  const Periodo = ({ data }) => {
    var creditosTotaisPorPeriodo = 0;
    return (
      <div className="periodo__container">
        <p className="periodo__container_textoperiodo">{data.periodo}</p>
        {
          data && data.disciplinas &&
          data.disciplinas.map((disciplina, idx) => {
            creditosTotaisPorPeriodo = creditosTotaisPorPeriodo + disciplina.creditos
            return (
              <Disciplina key={idx} disciplina={disciplina} />
            )
          })
        }
        {
          data.disciplinas && (
            <TotalCreditos creditosTotais={creditosTotaisPorPeriodo} />
          )
        }
      </div>
    )
  }

  return (
    <div className="page_a4" id="fluxograma">
      <header className="App_header">
        <h3 className="App_header_titulo">{texto_header}</h3>
      </header>
      <section className="conteudo__fluxo">
        <div className="fluxo">
          {
            data && data.periodos &&
            data.periodos.map((periodo, idx) => (
              <Periodo key={idx} data={periodo} />
            ))
          }
        </div>
        <div className="somatorias">
          <table border="0" cellPadding="0" cellSpacing="0" id="sheet0" className="sheet0 gridlines">
            <tbody>
              <tr className="row0">
                <td className="column0">&nbsp;</td>
                <td className="column1 style1 b">CRÉDITOS</td>
                <td className="column2 style1 b">CH - AT</td>
                <td className="column3 style1 b">CH - AP</td>
                <td className="column4 style1 b">CH - TOTAL</td>
              </tr>
              <tr className="row1">
                <td className="column0 style1 s">
                  TOTAL DISCIPLINAS (Horas)
                </td>
                <td className="column1 style2 b">
                  {creditosTotal === 0 ? `-` : creditosTotal}
                </td>
                <td className="column2 style2 b">
                  {chAtTotal === 0 ? `-` : chAtTotal}
                </td>
                <td className="column3 style2 b">
                  {chApTotal === 0 ? `-` : chApTotal}
                </td>
                <td className="column4 style2 b">
                  {chAtTotal + chApTotal === 0 ? `-` : chAtTotal + chApTotal}
                </td>
              </tr>
              <tr className="row2">
                <td className="column0 style1 s">
                  ATIVIDADES COMPLEMENTARES (Horas)
                </td>
                <td className="column1 style2 b">
                  {creditosAtivComplementares === 0 ? `-` : creditosAtivComplementares}
                </td>
                <td className="column2 style2 b">
                  {chatAtivComplementares === 0 ? `-` : chatAtivComplementares}
                </td>
                <td className="column3 style2 b">
                  {chapAtivComplementares === 0 ? `-` : chapAtivComplementares}
                </td>
                <td className="column4 style2 b">
                  {chatAtivComplementares + chapAtivComplementares === 0 ? `-` : chatAtivComplementares + chapAtivComplementares}
                </td>
              </tr>
              <tr className="row3">
                <td className="column0 style1 s">
                  TOTAL GERAL (Horas)
                </td>
                <td className="column1 style2 b">
                  {creditosTotal + creditosAtivComplementares === 0 ? `-` : creditosTotal + creditosAtivComplementares}
                </td>
                <td className="column2 style2 b">
                  {chAtTotal + chatAtivComplementares === 0 ? `-` : chAtTotal + chatAtivComplementares}
                </td>
                <td className="column3 style2 b">
                  {chApTotal + chapAtivComplementares === 0 ? `-` : chApTotal + chapAtivComplementares}
                </td>
                <td className="column4 style2 b">
                  {
                    ((chAtTotal + chApTotal) + (chatAtivComplementares + chapAtivComplementares)) === 0 ?
                      `-` :
                      ((chAtTotal + chApTotal) + (chatAtivComplementares + chapAtivComplementares))
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <ButtonGroup className="no-print" disableElevation variant="contained" color="primary">
        <Button variant="contained" color="primary" onClick={prevStep}>
          Voltar
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Fluxograma;

import React, { useEffect, useState } from 'react';
import { useContextApi } from '../../context/ContextApi';

import Container from '@material-ui/core/Container';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, List, ListSubheader, Collapse, ListItem, ListItemText, ListItemIcon, ButtonGroup } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { BiMessageSquareAdd } from 'react-icons/bi';

// Icon BiMessageSquareAdd

import "./index.css"

const initialDisciplina = {
    "nome": "",
    "creditos": 0,
    "codigo": "",
    "cargaHorariaTeorica": 0,
    "cargaHorariaPratica": 0
  };

const TwoFluxo = (props) => {

    const { Data, handleChange, handleChangePeriodos, setData, nextStep, prevStep } = useContextApi();
    const [open, setOpen] = useState(false);

    const [perioodosItem, setPeriodosItem] = useState([]);
    const [openJson, setOpenJson] = useState({});

    useEffect(() => {
        for(var i=0; i < Data.quantidadePeriodo; i++) {
            setOpenJson({ ...openJson, [`PERIODO${i}`]: false })
        }
        setPeriodosItem(Data.periodos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = (idx) => {
        setOpen(!open);
        setOpenJson({
            ...openJson,
            [`PERIODO${idx+1}`]: !openJson[`PERIODO${idx+1}`]
        })

    };

    const handleClickAdd = (idx) => {
        console.log("ANTES: ",perioodosItem)
        let newData = perioodosItem[idx];
        newData.disciplinas.push(initialDisciplina);
        setPeriodosItem({
            ...perioodosItem,
            [idx]: newData
        })
        console.log("DEPOIS: ",perioodosItem)
    };

    const handleInputDisciplinas = (idxPeriodos, idxDisc, periodo) => (e) => {
        const { name, value } = e.target
        
        let periodoSelecionado = perioodosItem[idxPeriodos]

        let disciplinaSelecionada = periodoSelecionado.disciplinas[idxDisc]
        disciplinaSelecionada[name] = value
 
        console.log(disciplinaSelecionada)
    }   

    const DisciplinasInput = (disciplinas, idxPeriodos, periodo) => {
        return (
            disciplinas.map((item, idx) => (
                <div key={idx} >
                    <TextField
                    label="Nome disciplina"
                    name="nome"
                    onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                    value={item.nome}
                    />
                    <br />
                    <TextField
                    label="Créditos"
                    name="creditos"
                    onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                    value={item.creditos}
                    />
                    <br />
                    <TextField
                    label="Códido da disciplina"
                    name="codigo"
                    onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                    value={item.codigo}
                    />
                    <br />
                    <TextField
                    label="CH - T"
                    name="cargaHorariaTeorica"
                    onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                    value={item.cargaHorariaTeorica}
                    />
                    <br />
                    <TextField
                    label="CH - P"
                    name="cargaHorariaPratica"
                    onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                    value={item.cargaHorariaPratica}
                    />
                    <br />
                </div>
            ))
        )
    }

    return (
        <Container maxWidth="xl">
            <h3 className="titulo">Adicione as disciplinas dos períodos</h3>

            <div className="form__div">

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Períodos selecionados
                        </ListSubheader>
                    }
                >
                    {
                        perioodosItem &&
                        perioodosItem.map((perio, idx) => (
                            <>
                                <ListItem >
                                    <ListItemText primary={perio.periodo} />
                                    <BiMessageSquareAdd className="icon_add__twofluxo" onClick={() => { handleClickAdd(idx) }} />
                                    {open ? <ExpandLess className="icon_expand__twofluxo" onClick={() => { handleClick(idx) }} /> : <ExpandMore className="icon_expand__twofluxo" onClick={() => { handleClick(idx) }} />}
                                </ListItem>
                                <Collapse in={openJson[`PERIODO${idx+1}`]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            perio.disciplinas && 
                                            DisciplinasInput(perio.disciplinas, idx, perio.periodo)
                                        }
                                    </List>
                                </Collapse>
                            </>
                        ))
                    }
                </List>       

                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button variant="contained" color="primary" onClick={prevStep}>
                        Voltar
                    </Button>
                    <Button variant="contained" color="primary" onClick={nextStep}>
                        Avançar
                    </Button>
                </ButtonGroup>
                            
            </div>
        </Container>
    )
}

export default TwoFluxo;
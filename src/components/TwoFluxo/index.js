import React, { useEffect, useState } from 'react';
import { useContextApi } from '../../context/ContextApi';

import Container from '@material-ui/core/Container';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, List, ListSubheader, Collapse, ListItem, ListItemText, ListItemIcon, ButtonGroup } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { BiMessageSquareAdd } from 'react-icons/bi';

// Icon BiMessageSquareAdd

import "./index.css"
import FormikArray from '../Formik';

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
    const [numberIdx, setNumberIdx] = useState(0);

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

    const handleInputDisciplinas = (idxDisc, id) => (e) => {
        const { name, value } = e.target
        
        console.log(`
        ID: ${id}
        INDEX_DISCIPLINA: ${idxDisc}
        `)

        const novo = perioodosItem;

        novo.forEach(disc => {
            if(disc.id.toString() === id.toString()){
                disc.disciplinas[idxDisc][name] = value;
            }
        })

        console.log(novo)

        // setPeriodosItem([
        //     ...perioodosItem,
        //     [numberIdx] = periodoSelecionado
        // ])
    }   

    const DisciplinasInput = ({item, idx, id}) => {
        return (
            <div>
                <TextField
                label="Nome disciplina"
                name="nome"
                onChange={handleInputDisciplinas(idx, id)}
                value={item.nome}
                />
                <br />
                <TextField
                label="Créditos"
                name="creditos"
                // onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                value={item.creditos}
                />
                <br />
                <TextField
                label="Códido da disciplina"
                name="codigo"
                // onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                value={item.codigo}
                />
                <br />
                <TextField
                label="CH - T"
                name="cargaHorariaTeorica"
                // onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                value={item.cargaHorariaTeorica}
                />
                <br />
                <TextField
                label="CH - P"
                name="cargaHorariaPratica"
                // onChange={handleInputDisciplinas(idxPeriodos, idx, periodo)}
                value={item.cargaHorariaPratica}
                />
                <br />
            </div>
        )   
    }

    const handleNextQuestion = () => {
        if(numberIdx+1 < totalIndex){
            setNumberIdx(numberIdx + 1);
        }
    }
    
    const handlePrevQuestion = () => {
        if(numberIdx > 0){
            setNumberIdx(numberIdx - 1);
        }
    }

    const totalIndex = perioodosItem ? perioodosItem.length : 0;

    return (
        <Container maxWidth="xl">
            <h3 className="titulo">Adicione as disciplinas dos períodos</h3>

            <FormikArray InitialValue={perioodosItem} />

            
        </Container>
    )
}

export default TwoFluxo;

/**
 * 
 * <div className="form__div">

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
                        totalIndex > 0 && (
                        <>
                            <ListItem component="div" alignItems="center" >
                                
                                <ArrowBackIos 
                                    className="icon_expand__twofluxo" 
                                    onClick={handlePrevQuestion} 
                                />
                                
                                <ListItem component="div" alignItems="center" >
                                    <span>{perioodosItem[numberIdx].periodo}</span>
                                    <BiMessageSquareAdd 
                                        className="icon_add__twofluxo" 
                                        onClick={() => { alert("Adicionando uma disciplina") }} 
                                    />
                                </ListItem>
                                
                                <ArrowForwardIos 
                                    className="icon_expand__twofluxo" 
                                    onClick={handleNextQuestion} 
                                />
                                
                            </ListItem>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        perioodosItem[numberIdx].disciplinas && 
                                        perioodosItem[numberIdx].disciplinas.map((item, idx) => {
                                            return (
                                                <DisciplinasInput item={item} idx={idx} id={perioodosItem[numberIdx].id} />
                                            )
                                        })
                                    }
                                </List>
                            </Collapse>
                        </>
                        )
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
 * 
 */
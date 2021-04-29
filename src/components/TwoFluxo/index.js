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
        <Container maxWidth="md">
            <div className="container">
                <h3 className="titulo">Adicione as disciplinas dos períodos</h3>

                <FormikArray InitialValue={perioodosItem} />
            </div>
        </Container>
    )
}

export default TwoFluxo;

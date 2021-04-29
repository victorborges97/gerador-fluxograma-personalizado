import React, { useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';

import { Button, ButtonGroup, List, ListItem, ListSubheader, Collapse } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { BiMessageSquareAdd } from 'react-icons/bi';
import TextField from '@material-ui/core/TextField';
import { useContextApi } from '../../context/ContextApi';

import "./index.css";

const FormikArray = () => {

    const { Data, setData, nextStep, prevStep } = useContextApi();
    const totalIndex = Data.periodos ? Data.periodos.length : 0;

    const [numberIdx, setNumberIdx] = useState(0);

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

    const initialDisciplina = {
        "nome": "",
        "creditos": 0,
        "codigo": "",
        "cargaHorariaTeorica": 0,
        "cargaHorariaPratica": 0
      };

    return (
        <Formik
        initialValues={{ periodos: Data.periodos }}
        onSubmit={values => {
            setData({
                ...Data,
                periodos: values.periodos,
            })
            nextStep()
        }}
        >
            <Form className="container_form">
                <FieldArray name={`periodos[${numberIdx}]disciplinas`}>
                    {({ handleChange, handleBlur, handleSubmit, form, ...fieldArrayHelpers }) => {

                        const onAddClick = () => {
                            fieldArrayHelpers.push(initialDisciplina);
                        };

                        const onRemoveClick = () => {
                            fieldArrayHelpers.remove(initialDisciplina);
                        };

                        return (
                            <div className="form__div">
    
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader 
                                            className="center_subheader"
                                            component="div" 
                                            id="nested-list-subheader"
                                        >
                                            <p>
                                                Períodos selecionados
                                            </p>
                                        </ListSubheader>
                                    }
                                >
                                    <ListItem 
                                        component="div" 
                                        alignItems="center" 
                                    >
                                                    
                                        <ArrowBackIos 
                                            className="icon_expand__twofluxo" 
                                            onClick={handlePrevQuestion} 
                                        />
                                        
                                        <ListItem className="center_subheader" component="div" alignItems="center"  >
                                            <p className="center_periodo_icon">
                                                <span>{form.values.periodos[numberIdx].periodo}</span>
                                                <BiMessageSquareAdd 
                                                    className="icon_add__twofluxo" 
                                                    onClick={onAddClick}
                                                />
                                            </p>
                                        </ListItem>
                                        
                                        <ArrowForwardIos
                                            className="icon_expand__twofluxo" 
                                            onClick={handleNextQuestion} 
                                        />
                                        
                                    </ListItem>
                                    
                                    <div>
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <List className="container_periodo" component="div" disablePadding>
                                            {form.values.periodos[numberIdx].disciplinas.map(({ text }, index) => (
                                                <div className="container_periodo_card" key={index} >
                                                    <TextField
                                                    label="Nome disciplina"
                                                    name="nome"
                                                    value={form.values.periodos[numberIdx].disciplinas[index].nome}
                                                    onBlur={form.handleBlur(`periodos[${numberIdx}]disciplinas[${index}].nome`)}
                                                    onChange={form.handleChange(`periodos[${numberIdx}]disciplinas[${index}].nome`)}
                                                    />
                                                    <br />
                                                    <TextField
                                                    label="Créditos"
                                                    name="creditos"
                                                    value={form.values.periodos[numberIdx].disciplinas[index].creditos}
                                                    onBlur={form.handleBlur(`periodos[${numberIdx}]disciplinas[${index}].creditos`)}
                                                    onChange={form.handleChange(`periodos[${numberIdx}]disciplinas[${index}].creditos`)}
                                                    />
                                                    <br />
                                                    <TextField
                                                    label="Códido da disciplina"
                                                    name="codigo"
                                                    value={form.values.periodos[numberIdx].disciplinas[index].codigo}
                                                    onBlur={form.handleBlur(`periodos[${numberIdx}]disciplinas[${index}].codigo`)}
                                                    onChange={form.handleChange(`periodos[${numberIdx}]disciplinas[${index}].codigo`)}
                                                    />
                                                    <br />
                                                    <TextField
                                                    label="CH - T"
                                                    name="cargaHorariaTeorica"
                                                    value={form.values.periodos[numberIdx].disciplinas[index].cargaHorariaTeorica}
                                                    onBlur={form.handleBlur(`periodos[${numberIdx}]disciplinas[${index}].cargaHorariaTeorica`)}
                                                    onChange={form.handleChange(`periodos[${numberIdx}]disciplinas[${index}].cargaHorariaTeorica`)}
                                                    />
                                                    <br />
                                                    <TextField
                                                    label="CH - P"
                                                    name="cargaHorariaPratica"
                                                    value={form.values.periodos[numberIdx].disciplinas[index].cargaHorariaPratica}
                                                    onBlur={form.handleBlur(`periodos[${numberIdx}]disciplinas[${index}].cargaHorariaPratica`)}
                                                    onChange={form.handleChange(`periodos[${numberIdx}]disciplinas[${index}].cargaHorariaPratica`)}
                                                    />
                                                    <br />
                                                    <button onClick={onRemoveClick}>
                                                        Remover
                                                    </button>
                                                </div>
                                            ))}
                                            </List>
                                        </Collapse>
                                    </div>
                                
                                </List>       
    
                                
                                <ButtonGroup 
                                    className="group_button"
                                    disableElevation 
                                    variant="contained" 
                                    color="primary">
                                    <Button variant="contained" color="primary" onClick={prevStep}>
                                        Voltar
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={form.handleSubmit}>
                                        Avançar
                                    </Button>
                                </ButtonGroup>
                            </div>
                        )
                    }}
                </FieldArray>
            </Form>
        </Formik>
    )
};

export default FormikArray;
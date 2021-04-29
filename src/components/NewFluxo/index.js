import React from 'react';
import { useContextApi } from '../../context/ContextApi';

import Container from '@material-ui/core/Container';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import "./index.css"

const NewFluxo = (props) => {

    const { Data, handleChange, handleChangePeriodos, setData, nextStep } = useContextApi();

    const onSubmit = (e) => {
        e.preventDefault()
        if(Data.curso && Data.anoletivo && Data.quantidadePeriodo && Data.tipo){
            nextStep()
        } else {
            alert("Falta preencher algum campo!")
        }
    }

    return (
        <Container maxWidth="md">
            <div className="container">
                <h3 className="titulo">Novo Fluxograma</h3>

                <div className="form__div">

                    <TextField
                        label="Curso"
                        name="curso"
                        onChange={handleChange}
                        value={Data.curso}
                    />
                    <br />
                    <TextField
                        label="Ano Letivo"
                        name="anoletivo"
                        onChange={handleChange}
                        value={Data.anoletivo}
                    />
                    <br />
                    <TextField
                        label="Total CH-AT Atividades Complementares"
                        name="atividadeComplementarAt"
                        onChange={handleChange}
                        value={Data.atividadeComplementarAt}
                    />
                    <br />
                    <TextField
                        label="Total CH-AP Atividades Complementares"
                        name="atividadeComplementarAp"
                        onChange={handleChange}
                        value={Data.atividadeComplementarAp}
                    />
                    <br />
                    <TextField
                        label="Total Créditos Atividades Complementares"
                        name="atividadeComplementarCredito"
                        onChange={handleChange}
                        value={Data.atividadeComplementarCredito}
                    />
                    <br />
                    <FormControl>
                        <InputLabel id="qtde-periodos-select-label">Quantidade de Perídos</InputLabel>
                        <Select
                        labelId="qtde-periodos-select-label"
                        id="qtde-periodos-select"
                        value={Data.quantidadePeriodo}
                        name="quantidadePeriodo"
                        onChange={handleChangePeriodos}
                        >
                            <MenuItem value={6}>6 Perídos</MenuItem>
                            <MenuItem value={8}>8 Perídos</MenuItem>
                            <MenuItem value={10}>10 Perídos</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl>
                        <InputLabel id="tipo-curso-select-label">Tipo de curso</InputLabel>
                        <Select
                        labelId="tipo-curso-select-label"
                        id="tipo-curso-select"
                        value={Data.tipo}
                        name="tipo"
                        onChange={handleChange}
                        >
                            <MenuItem value="Bacharel">Bacharel</MenuItem>
                            <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                        </Select>
                    </FormControl>
                    <br />

                    
                    <ButtonGroup
                        className="group_button"
                        disableElevation 
                        variant="contained" 
                        color="primary">
                        <Button className="group_button" color="primary" onClick={onSubmit}>
                        Avançar
                        </Button>
                    </ButtonGroup>
                
                </div>
            </div>
        </Container>
    )
}

export default NewFluxo;
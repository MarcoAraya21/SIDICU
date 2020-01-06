import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


// --------------------------------------------

import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Show from './show'


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: '#fff'
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Unidades({ openUnidades, handleCloseUnidades, unidades, horas, asignaturaId, asignaturaNombre, handleInputArraysAsignatura, handleAddElementAsignatura, borrarElementoAsignatura, habilitarGeneral, habilitadogeneral, addNotification }) {
    const classes = useStyles();
    const [descripcion, setdescripcion] = useState('');
    const restantes = {
        aula: horas.aula - unidades.reduce((previous, current) => {
        return Number(previous) + Number(current.horas_aula);}, 0),
        extra_aula: horas.extra_aula - unidades.reduce((previous, current) => {
            return Number(previous) + Number(current.horas_extra_aula);}, 0)
    }


    function addElemento(variable) {
        //e.preventDefault();
        fetch(`/api/${variable}/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(
                { asignatura_id: asignaturaId,
                  nombre: descripcion}
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(data => { [handleAddElementAsignatura(variable, data, asignaturaId), addNotification(), setdescripcion("")] })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
    }
    return (
        <div>
            {/* {console.log('horas',horas),
        console.log('restantes', restantes)} */}
            <Dialog fullScreen open={openUnidades} onClose={handleCloseUnidades} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                        <IconButton edge="start" color="inherit" onClick={handleCloseUnidades} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {asignaturaNombre || "Sin Nombre"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                        <React.Fragment>
                            {
                                unidades.length > 0 ?
                                    unidades.map((unidad, i) =>
                                        <Show key={unidad.id}
                                            unidad={unidad}
                                            asignaturaId={asignaturaId}
                                            handleInputArraysAsignatura={handleInputArraysAsignatura}
                                            handleAddElementAsignatura={handleAddElementAsignatura}
                                            borrarElementoAsignatura={borrarElementoAsignatura}
                                            habilitarGeneral={habilitarGeneral}
                                            habilitadogeneral={habilitadogeneral}
                                            addNotification={addNotification}
                                        />
                                    )
                                    :
                                    <p>No posee ninguna unidad asociada</p>
                            }
                            <div className={"col row p-10 border " + (!habilitadogeneral ? "deshabilitado" : "")}  style={{alignItems: "flex-end"}}>
                                <div className="col-6 p-0">
                                    <label>Descripción</label>
                                    <textarea rows="2"
                                        disabled={!habilitadogeneral}
                                        className="form-control"
                                        value={descripcion || ''}
                                        onChange={(e) => setdescripcion(e.target.value)}>
                                    </textarea>
                                </div>
                                <div className="col-6 p-0">
                                    <div align="right">
                                        <button type="button" disabled={!habilitadogeneral || descripcion == ""} className="btn btn-primary" onClick={() => { addElemento('unidades') }}>
                                            <i className="fas fa-plus p-r-5" ></i>Crear Unidad
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                </DialogContent>
            </Dialog>
        </div>
    );
}
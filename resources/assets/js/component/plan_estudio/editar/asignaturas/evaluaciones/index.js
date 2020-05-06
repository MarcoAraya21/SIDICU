import React, { useState } from 'react';
import axios from 'axios';
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

export default function evaluaciones({ openEvaluaciones, handleCloseEvaluaciones, asignatura_evaluaciones, asignaturaId, asignaturaNombre, handleAddElementAsignatura, borrarElementoAsignatura, habilitarGeneral, habilitadogeneral, addNotification, addNotificationAlert }) {
    const classes = useStyles();
    const [evaluaciones, setevaluaciones] = useState([]);
    const [addevaluacion, setaddevaluacion] = useState('');
    const [guardando, setguardando] = useState(false);

    function getEvaluaciones() {
        axios.get('/api/evaluaciones').then((
            response
        ) =>{
                setevaluaciones(response.data);
            }            
        );        
    }


    function addElemento(variable) {
        //e.preventDefault();
        setguardando(true);
        fetch(`/api/${variable}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify(
                { asignatura_id: asignaturaId,
                  evaluacion_id: addevaluacion}
            )
        })
        .then(function(response) {
            if(response.redirected)
            {
                window.location.href = "/";
            }
            else
            {
                if(response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }   
            }
        })
        .then(data => { [handleAddElementAsignatura(variable, data, asignaturaId), addNotification(), setaddevaluacion("")] })
        .catch(error => {
            addNotificationAlert('No se ha podido guardar.')
        })
        .finally(() => setguardando(false));
    }
    const evaluacionesSelect = evaluaciones.filter(evaluacion => !asignatura_evaluaciones.some(asignatura_evaluacion => 
        asignatura_evaluacion.evaluacion_id == evaluacion.id
    ))
    return (
        <div>
            <Dialog fullScreen open={openEvaluaciones} onClose={handleCloseEvaluaciones} TransitionComponent={Transition} onEnter={() => getEvaluaciones()}disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEvaluaciones} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {asignaturaNombre || "Sin Nombre"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className="border p-3 mb-3">
                        <List>
                        {   
                            asignatura_evaluaciones.length > 0 ?
                                asignatura_evaluaciones.map((asignatura_evaluacion,i) =>
                                    <React.Fragment key={i}>
                                        <ListItem button>
                                            <ListItemText primary={asignatura_evaluacion.evaluacion.nombre} />
                                            <div className="mt-2 mb-1">
                                                <button type="button" disabled={!habilitadogeneral} className="btn btn-danger"
                                                    onClick={() => {
                                                    if (window.confirm('¿Estas Seguro?'))
                                                    {                                                    
                                                        borrarElementoAsignatura('asignatura_evaluaciones', asignatura_evaluacion.id, addNotification, addNotificationAlert, asignaturaId)   
                                                    }
                                                    }}>
                                                    <i className="fas fa-times p-r-10" ></i>Eliminar Evaluación
                                                </button>
                                            </div>
                                        </ListItem >
                                        <Divider />
                                    </React.Fragment>
                                )
                            :
                                'No Tiene Evaluaciones Agregadas'
                        }
                            <ListItem>
                                <div className="col row p-0">
                                    <div className="col-6 p-0">
                                        <select
                                            value={addevaluacion}
                                            className="form-control"
                                            onChange={(e)=> setaddevaluacion(e.target.value)}>
                                            <option value="">Seleccione una Opción</option>
                                            
                                            {
                                                evaluacionesSelect.map((opcionEvaluacion,i) =>
                                                        <option key={i} value={opcionEvaluacion.id}>{opcionEvaluacion.nombre}</option>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6 p-0">
                                        <div align="right">
                                        {
                                            guardando ?
                                                <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Creando</button>                      
                                            :
                                                <button type="button" disabled={!habilitadogeneral || addevaluacion == ""} className="btn btn-primary" onClick={() => { addElemento('asignatura_evaluaciones') }}>
                                                    <i className="fas fa-plus p-r-5" ></i>Crear Evaluación
                                                </button>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </ListItem >
                        </List>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
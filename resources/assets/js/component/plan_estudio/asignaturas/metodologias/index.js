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

export default function metodologias({ openMetodologias, handleCloseMetodologias, asignatura_metodologias, asignaturaId, asignaturaNombre, handleAddElementAsignatura, borrarElementoAsignatura, habilitarGeneral, habilitadogeneral, addNotification }) {
    const classes = useStyles();
    const [metodologias, setmetodologias] = useState([]);
    const [addmetodologia, setaddmetodologia] = useState('');

    function getMetodologias() {
        axios.get('/api/metodologias').then((
            response
        ) =>{
                setmetodologias(response.data);
            }            
        );        
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
                  metodologia_id: addmetodologia}
            )
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw "Error en la llamada Ajax";
                }

            })
            .then(data => { [handleAddElementAsignatura(variable, data, asignaturaId), addNotification(), setaddmetodologia("")] })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            })
    }
    const metodologiasSelect = metodologias.filter(metodologia => !asignatura_metodologias.some(asignatura_metodologia => 
        asignatura_metodologia.metodologia_id == metodologia.id
    ))
    return (
        <div>
            {console.log('metodologias', metodologiasSelect)}
            <Dialog fullScreen open={openMetodologias} onClose={handleCloseMetodologias} TransitionComponent={Transition} onEnter={() => getMetodologias()}disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                        <IconButton edge="start" color="inherit" onClick={handleCloseMetodologias} aria-label="close">
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
                            asignatura_metodologias.length > 0 ?
                                asignatura_metodologias.map((asignatura_metodologia,i) =>
                                    <React.Fragment key={i}>
                                        <ListItem button>
                                            <ListItemText primary={asignatura_metodologia.metodologia.nombre} />
                                            <div className="mt-2 mb-1">
                                                <button type="button" disabled={!habilitadogeneral} className="btn btn-danger"
                                                    onClick={() => {
                                                    if (window.confirm('¿Estas Seguro?'))
                                                    {                                                    
                                                        borrarElementoAsignatura('asignatura_metodologias', asignatura_metodologia.id, addNotification, asignaturaId)   
                                                    }
                                                    }}>
                                                    <i className="fas fa-times p-r-10" ></i>Eliminar Requisito
                                                </button>
                                            </div>
                                        </ListItem >
                                        <Divider />
                                    </React.Fragment>
                                )
                            :
                                'No Tiene Metodologias Agregadas'
                        }
                            <ListItem>
                                <div className="col row p-0">
                                    <div className="col-6 p-0">
                                        <select
                                            className="form-control "
                                            onChange={(e)=> setaddmetodologia(e.target.value)}>
                                                {
                                                    addmetodologia == "" ?
                                                    <option value="" selected>Seleccione una Opción</option>
                                                    :
                                                    <option value="">Seleccione una Opción</option>
                                                }
                                            
                                            {
                                                metodologiasSelect.map((opcionMetodologia,i) =>
                                                        <option key={i} value={opcionMetodologia.id}>{opcionMetodologia.nombre}</option>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    {
                                        <div className="col-6 p-0">
                                            <div align="right">
                                                <button type="button" disabled={!habilitadogeneral || addmetodologia == ""} className="btn btn-primary" onClick={() => { addElemento('asignatura_metodologias') }}>
                                                    <i className="fas fa-plus p-r-5" ></i>Crear Requisito
                                                </button>
                                            </div>
                                        </div>
                                    }
                                    
                                </div>
                            </ListItem >
                        </List>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
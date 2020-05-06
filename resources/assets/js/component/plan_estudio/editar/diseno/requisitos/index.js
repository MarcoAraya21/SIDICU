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

export default function requisitos({ openRequisitos, handleCloseRequisitos, requisitos, opcionRequisitos, asignaturaId, asignaturaNombre, handleAddElementAsignatura, borrarElementoAsignatura, habilitarGeneral, habilitadogeneral, addNotification, addNotificationAlert }) {
    const classes = useStyles();
    const [addrequisito, setaddrequisito] = useState('');
    const [guardando, setguardando] = useState(false);

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
                  requisito_id: addrequisito}
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
        .then(data => { [handleAddElementAsignatura(variable, data, asignaturaId), addNotification(), setaddrequisito("")] })
        .catch(error => {
            addNotificationAlert('No se ha podido guardar.')
        })
        .finally(() => setguardando(false));
    }

    const requisitosSelect = opcionRequisitos.filter(opcionRequisito => 
        !requisitos.some(requisito => 
            requisito.requisito_id == opcionRequisito.id
        )
    )
    let nivelesSelect = [...new Set(requisitosSelect.map(requisitoSelect => requisitoSelect.nivel.nombre))].sort();
    var requisitoNivelesSelect = [];
    if(requisitosSelect.length > 0)
    {
        nivelesSelect.map((nivelSelect,i) =>
            requisitoNivelesSelect[i] = {'nombre': nivelSelect, 'requisitos': requisitosSelect.filter(requisitoSelect => requisitoSelect.nivel.nombre == nivelSelect)}
            )
    }
    
    var requisitoNiveles = [];
    if(requisitos.length > 0)
    {
        let niveles = [...new Set(requisitos.map(requisito => requisito.requisito.nivel.nombre))].sort();
        niveles.map((nivel,i) =>
            requisitoNiveles[i] = {'nombre': nivel, 'requisitos': requisitos.filter(requisito => requisito.requisito.nivel.nombre == nivel)}
            )
    }
    return (
        <div>
            <Dialog fullScreen open={openRequisitos} onClose={handleCloseRequisitos} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                        <IconButton edge="start" color="inherit" onClick={handleCloseRequisitos} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Asignatura: {asignaturaNombre || "Sin Nombre"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className="border p-3 mb-3">
                        <List>
                        {   
                            requisitoNiveles.length > 0 ?
                                requisitoNiveles.map((requisitoNivel,i) =>
                                    <React.Fragment key={i}>
                                        <legend>Semestre {requisitoNivel.nombre}</legend>
                                        {
                                            requisitoNivel.requisitos.map((requisito,i) =>
                                            <React.Fragment key={i}>
                                                <ListItem button>
                                                    <ListItemText primary={requisito.requisito.nombre} />
                                                    <div className="mt-2 mb-1">
                                                        <button type="button" disabled={!habilitadogeneral} className="btn btn-danger"
                                                            onClick={() => {
                                                            if (window.confirm('¿Estas Seguro?'))
                                                            {                                                    
                                                                borrarElementoAsignatura('requisitos', requisito.id, addNotification, addNotificationAlert, asignaturaId)   
                                                            }
                                                            }}>
                                                            <i className="fas fa-times p-r-10" ></i>Eliminar Requisito
                                                        </button>
                                                    </div>
                                                </ListItem >
                                                <Divider />
                                            </React.Fragment>
                                            
                                            )
                                        }
                                        
                                    </React.Fragment>
                                )
                            :
                                'No Tiene Requisitos Agregados'
                        }
                            <ListItem>
                                <div className="col row p-0">
                                    <div className="col-6 p-0">
                                        <select
                                            value={addrequisito}
                                            className="form-control"
                                            onChange={(e)=> setaddrequisito(e.target.value)}>
                                            <option value="">Seleccione una Opción</option>
                                            {
                                                requisitoNivelesSelect.map((requisitoNivelSelect,i) =>
                                                    <optgroup key={i} label={'Semestre ' + requisitoNivelSelect.nombre}>
                                                        {
                                                            requisitoNivelSelect.requisitos.map((requisito,i) =>
                                                                <option key={i} value={requisito.id}>{requisito.nombre}</option>
                                                                )
                                                        }
                                                    </optgroup>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    {
                                        <div className="col-6 p-0">
                                            <div align="right">
                                            {
                                                guardando ?
                                                    <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Creando</button>                      
                                                :
                                                    <button type="button" disabled={!habilitadogeneral || addrequisito == ""} className="btn btn-primary" onClick={() => { addElemento('requisitos') }}>
                                                        <i className="fas fa-plus p-r-5" ></i>Crear Requisito
                                                    </button>
                                            }
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
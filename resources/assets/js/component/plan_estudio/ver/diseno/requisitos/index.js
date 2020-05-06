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
    function addElemento(variable) {
        //e.preventDefault();
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
                    <Toolbar>
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
                        </List>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
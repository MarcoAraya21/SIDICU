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
import Edit from './edit';


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

export default function bibliografias({ openBibliografias, handleCloseBibliografias, bibliografias, asignaturaId, asignaturaNombre, handleInputArraysAsignatura, handleAddElementAsignatura, borrarElementoAsignatura, habilitarGeneral, habilitadogeneral, addNotification, addNotificationAlert }) {
    const classes = useStyles();
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
                { asignatura_id: asignaturaId }
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
        .then(data => { [handleAddElementAsignatura(variable, data, asignaturaId), addNotification()] })
        .catch(error => {
            addNotificationAlert('No se ha podido guardar.')
        })
        .finally(() => setguardando(false));
    }
    const basica = bibliografias.filter(bibliografia => bibliografia.tipo_bibliografia_id == 1);
    const complementaria = bibliografias.filter(bibliografia => bibliografia.tipo_bibliografia_id == 2);
    return (
        <div>
            <Dialog fullScreen open={openBibliografias} onClose={handleCloseBibliografias} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                        <IconButton edge="start" color="inherit" onClick={handleCloseBibliografias} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {asignaturaNombre || "Sin Nombre"}
                        </Typography>

                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className="border p-3 mb-3">
                        <legend>Básica</legend>
                        {
                            basica.length > 0 ?
                                basica.map(bibliografia =>
                                    <Edit key={bibliografia.id}
                                        bibliografia={bibliografia}
                                        asignaturaId={asignaturaId}
                                        handleInputArraysAsignatura={handleInputArraysAsignatura}
                                        borrarElementoAsignatura={borrarElementoAsignatura}
                                        habilitarGeneral={habilitarGeneral}
                                        habilitadogeneral={habilitadogeneral}
                                        addNotification={addNotification}
                                        addNotificationAlert={addNotificationAlert}
                                    />
                                )   
                            :
                                'No posee Bibliografia Basica'
                        }
                        <legend>Complementaria</legend>
                        {
                            complementaria.length > 0 ?
                                complementaria.map(bibliografia =>
                                    <Edit key={bibliografia.id}
                                        bibliografia={bibliografia}
                                        asignaturaId={asignaturaId}
                                        handleInputArraysAsignatura={handleInputArraysAsignatura}
                                        borrarElementoAsignatura={borrarElementoAsignatura}
                                        habilitarGeneral={habilitarGeneral}
                                        habilitadogeneral={habilitadogeneral}
                                        addNotification={addNotification}
                                        addNotificationAlert={addNotificationAlert}
                                    />
                                )   
                            :
                                'No posee Bibliografia Basica'
                        }     
                                    
                        <div align="right" className="mt-2 mb-1">
                        {
                            guardando ?
                                <button type="button" className="btn btn-primary p-5 m-l-5 disabled"><i className="fas fa-spinner fa-pulse p-r-10"></i>Creando</button>                      
                            :
                                <button type="button" disabled={!habilitadogeneral} className="btn btn-primary" onClick={() => { addElemento('bibliografias') }}>
                                    <i className="fas fa-plus p-r-5" ></i>Crear Bibliografia
                                </button>
                        }
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
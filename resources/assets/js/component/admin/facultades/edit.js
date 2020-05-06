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
import swal from 'sweetalert';

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




export default function edit({ openFacultad, handleCloseFacultad, facultad, handleInputArraysAdmin}) {
    const classes = useStyles();
    const [facultad2, setfacultad2] = useState({
        id: facultad.id,
        nombre: facultad.nombre,
    });
    const [guardando, setguardando] =  useState(false);
    function handleSubmit(){
        //e.preventDefault();
        setguardando(true),
        fetch('/api/facultades/' + facultad2.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                facultad2
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                if(response.redirected)
                {
                    window.location.href = "/";
                }
                throw "Error en la llamada Ajax";
            }
        })
        .then(data => {
            [
                handleInputArraysAdmin(data, 'facultades'),
                swal({
                    text: "Se ha Guardado Correctamente!",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
            ]
        })
        .catch(function(error) {
            swal({
                text: "No se ha podido guardar, intente nuevamente.",
                icon: "error",
                timer: 2000,
                button: false
            })
        })
        .finally( () => { setguardando(false) })
    }
    return (
        <div>
            <Dialog fullScreen open={openFacultad} onClose={handleCloseFacultad} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseFacultad} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {facultad2 && facultad2.nombre || "Sin Nombre"}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
            
                        <div className="border p-3 mb-3">
                            <div className="col-12">
                                <div className="col row mb-2">
                                    <div className="col-6">
                                        <label>Nombre</label>
                                        <input type="text"
                                            className="form-control " 
                                            value={facultad2.nombre || ''}
                                            onChange={(e)=>setfacultad2({...facultad2, nombre: e.target.value})}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div align="right" className="mt-2 mb-1">
                            {
                                guardando ?
                                    <button type="button" className="btn btn-primary disabled">
                                        <i className="fas fa-spinner fa-pulse p-r-5" ></i>Guardando
                                    </button>
                                :                             
                                    <button type="button" className="btn btn-primary" onClick={() => { handleSubmit() }}>
                                        <i className="fas fa-save p-r-5" ></i>Guardar
                                    </button>
                            }
                            </div>
                        </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
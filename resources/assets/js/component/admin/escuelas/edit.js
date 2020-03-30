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




export default function edit({ openEscuela, handleCloseEscuela, escuela, facultades, handleInputArraysAdmin}) {
    const classes = useStyles();
    const [escuela2, setescuela2] = useState({
        id: escuela.id,
        nombre: escuela.nombre,
        facultad_id: escuela.facultad_id,
    });
    const [guardando, setguardando] =  useState(false);
    function handleSubmit(){
        //e.preventDefault();
        setguardando(true),
        fetch('/api/escuelas/' + escuela2.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                escuela2
            )
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw "Error en la llamada Ajax";
            }
         })
        .then(data => {
            [
                handleInputArraysAdmin(data, 'escuelas'),
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
            <Dialog fullScreen open={openEscuela} onClose={handleCloseEscuela} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseEscuela} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {escuela2 && escuela2.nombre || "Sin Nombre"}
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
                                            value={escuela2.nombre || ''}
                                            onChange={(e)=>setescuela2({...escuela2, nombre: e.target.value})}>
                                        </input>
                                    </div>
                                </div>
                                
                                <div className="col row mb-2">
                                    <div className="col-6">
                                        <label>Facultad</label>
                                        <select value={escuela2.facultad_id || ""}
                                            className="form-control "
                                            onChange={(e)=>setescuela2({...escuela2, facultad_id: e.target.value})}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                facultades.map( (facultad, i) =>
                                                    <option key={i} value={facultad.id}>{facultad.nombre}</option>
                                                    )
                                            }
                                        </select>
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
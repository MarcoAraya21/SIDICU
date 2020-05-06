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




export default function edit({ openCarrera, handleCloseCarrera, carrera, grados, escuelas, handleInputArraysAdmin}) {
    const classes = useStyles();
    const [carrera2, setcarrera2] = useState({
        id: carrera.id,
        nombre: carrera.nombre,
        titulo: carrera.titulo,
        cod_demre: carrera.cod_demre,
        grado_id: carrera.grado_id,
        tipo_grado_id: carrera.tipo_grado_id,
        estado_id: carrera.estado_id,
        escuela_id: carrera.escuela_id,
    });
    const [guardando, setguardando] =  useState(false);
    function handleSubmit(){
        //e.preventDefault();
        setguardando(true),
        fetch('/api/carreras/' + carrera2.id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                carrera2
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
                handleInputArraysAdmin(data, 'carreras'),
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
            <Dialog fullScreen open={openCarrera} onClose={handleCloseCarrera} TransitionComponent={Transition} disableEscapeKeyDown>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseCarrera} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {carrera2 && carrera2.nombre || "Sin Nombre"}
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
                                            value={carrera2.nombre || ''}
                                            onChange={(e)=>setcarrera2({...carrera2, nombre: e.target.value})}>
                                        </input>
                                    </div>
                                    <div className="col-6">
                                        <label>Título</label>
                                        <input type="text"
                                            className="form-control " 
                                            value={carrera2.titulo || ''}
                                            onChange={(e)=>setcarrera2({...carrera2, titulo: e.target.value})}>
                                        </input>
                                    </div>
                                </div>
                                <div className="col row mb-2">
                                    <div className="col-6">
                                        <label>Codigo Demre</label>
                                        <input type="text"
                                            className="form-control " 
                                            value={carrera2.cod_demre || ''}
                                            onChange={(e)=>setcarrera2({...carrera2, cod_demre: e.target.value})}>
                                        </input>
                                    </div>
                                </div>
                                <div className="col row mb-2">
                                    <div className="col-6">
                                        <label>Grado</label>
                                        <select value={carrera2.grado_id || ""}
                                            className="form-control "
                                            onChange={(e)=>setcarrera2({...carrera2, grado_id: e.target.value})}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                grados.map( (grado, i) =>
                                                    <option key={i} value={grado.id}>{grado.nombre}</option>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label>Tipo de Grado</label>
                                        <select value={carrera2.tipo_grado_id || ""}
                                            className="form-control "
                                            onChange={(e)=>setcarrera2({...carrera2, tipo_grado_id: e.target.value})}>
                                            <option disabled value="0">Seleccione una Opción</option>
                                            <option value='1'>Pregrado</option>
                                            <option value='2'>Postgrado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col row mb-2">
                                    <div className="col-4">
                                        <label>Escuela</label>
                                        <select value={carrera2.escuela_id || ""}
                                            className="form-control "
                                            onChange={(e)=>setcarrera2({...carrera2, escuela_id: e.target.value})}>
                                            <option disabled value="">Seleccione una Opción</option>
                                            {
                                                escuelas.map( (escuela, i) =>
                                                    <option key={i} value={escuela.id}>{escuela.nombre}</option>
                                                    )
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label>Estado</label>
                                        <select value={carrera2.estado_id || ""}
                                            className="form-control "
                                            onChange={(e)=>setcarrera2({...carrera2, estado_id: e.target.value})}>
                                            <option disabled value="0">Seleccione una Opción</option>
                                            <option value='1'>Pendiente</option>
                                            <option value='4'>Aprobada</option>
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
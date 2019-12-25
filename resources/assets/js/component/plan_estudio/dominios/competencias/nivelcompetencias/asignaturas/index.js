import React, {useState} from 'react';
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

import NewAsignatura from './new';


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

export default function Asignatura({openAsignatura, handleCloseAsignatura, nivel_competencia, nivel_competencia_generica, asignaturas, handleInputArrays, borrarElemento, handleAddElement, habilitarGeneral, habilitadogeneral, addNotification}) {
  const classes = useStyles();
  const [openNew, setOpenNew] = useState(false);
    
  function handleCloseNew() {
    setOpenNew(false);
  }

  function handleOpenNew() {
    setOpenNew(true);
  }
  
  return (
    <div>
        <Dialog fullScreen open={openAsignatura} onClose={handleCloseAsignatura} TransitionComponent={Transition} disableEscapeKeyDown>
            <AppBar className={classes.appBar}>
            <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
                <IconButton edge="start" color="inherit" onClick={handleCloseAsignatura} aria-label="close">
                <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {nivel_competencia ? nivel_competencia.descripcion
                  : nivel_competencia_generica ? nivel_competencia_generica.descripcion
                  : "Sin Nombre"}
                </Typography>
                
            </Toolbar>
            </AppBar>
            <DialogContent>
            {!nivel_competencia_generica
              ?
                <React.Fragment>
                  <div className="border p-3 mb-3">
                      {
                          nivel_competencia.nivel_competencia_asignaturas && nivel_competencia.nivel_competencia_asignaturas.length > 0 ?
                          <List>
                            {nivel_competencia.nivel_competencia_asignaturas.map((nivel_competencia_asignatura,i) =>
                            <React.Fragment key={i}>
                              <ListItem button>
                                <ListItemText primary={nivel_competencia_asignatura.asignatura.nombre} />
                                <div className="mt-2 mb-1">
                                  <button type="button" disabled={!habilitadogeneral} className="btn btn-danger" onClick={()=>{addElemento('asignaturas')}}>      
                                        <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                    </button>                    
                                </div>
                              </ListItem>
                              {nivel_competencia.nivel_competencia_asignaturas[nivel_competencia.nivel_competencia_asignaturas.length - 1] != nivel_competencia_asignatura &&
                              <Divider />
                              }
                            </React.Fragment>
                            )}
                          </List>
                          :
                          <p>No posee ninguna asignatura asociada</p>
                      }
                  </div>
                  <div align="right" className="mt-2 mb-1">
                    <button type="button" disabled={!habilitadogeneral} className="btn btn-primary" onClick={()=>{handleOpenNew()}}>      
                        <i className="fas fa-plus p-r-5" ></i>Asociar Asignatura
                    </button>                    
                  </div>
                  <NewAsignatura
                    openNew = {openNew}
                    handleCloseNew={handleCloseNew}
                    nivel_competencia = {nivel_competencia}
                    asignaturas={asignaturas}
                    handleInputArrays = {handleInputArrays}
                    handleAddElement = {handleAddElement}
                    borrarElemento = {borrarElemento}
                    habilitarGeneral = {habilitarGeneral}
                    habilitadogeneral = {habilitadogeneral}
                    addNotification = {addNotification}
                   />
                </React.Fragment>
              :
                <React.Fragment>
                  <div className="border p-3 mb-3">
                      {
                          nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas &&
                          nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas.length > 0 ?
                          <List>
                            {nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas.map((nivel_generica_asignatura,i) =>
                            <React.Fragment key={i}>
                              <ListItem button>
                                <ListItemText primary={nivel_generica_asignatura.asignatura.nombre} />
                                <div className="mt-2 mb-1">
                                  <button type="button" disabled={!habilitadogeneral} className="btn btn-danger" onClick={()=>{addElemento('asignaturas')}}>      
                                        <i className="fas fa-times p-r-5" ></i>Eliminar Asociación
                                    </button>                    
                                </div>
                              </ListItem>
                              {nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas[nivel_competencia_generica.nivel_genericas[0].nivel_generica_asignaturas.length - 1] != nivel_generica_asignatura &&
                              <Divider />
                              }
                            </React.Fragment>
                            )}
                          </List>
                          :
                          <p>No posee ninguna asignatura asociada</p>
                      }
                  </div>
                  <div align="right" className="mt-2 mb-1">
                    <button type="button" disabled={!habilitadogeneral} className="btn btn-primary" onClick={()=>{handleOpenNew()}}>      
                        <i className="fas fa-plus p-r-5" ></i>Asociar Asignatura
                    </button>                    
                  </div>
                  <NewAsignatura
                    openNew = {openNew}
                    handleCloseNew={handleCloseNew}
                    nivel_competencia_generica = {nivel_competencia_generica}
                    asignaturas={asignaturas}
                    handleInputArrays = {handleInputArrays}
                    handleAddElement = {handleAddElement}
                    borrarElemento = {borrarElemento}
                    habilitarGeneral = {habilitarGeneral}
                    habilitadogeneral = {habilitadogeneral}
                    addNotification = {addNotification}
                   />
                </React.Fragment>
              }
            </DialogContent>
        </Dialog>
    </div>
  );
}
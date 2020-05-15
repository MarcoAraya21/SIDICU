import React from 'react';
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

export default function Malla({ openMalla, handleCloseMalla, id, nombre, asignaturas}) {
  const classes = useStyles();

  let cantidad = [1,2,3,4,5,6];
  let aux = []
  asignaturas.forEach(element => {
    aux.push(element)    
  });

  return (
    <div>
      <Dialog fullScreen open={openMalla} onClose={handleCloseMalla} TransitionComponent={Transition} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseMalla} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {nombre || "Sin Nombre"}
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent>
          <div>
            <table className="table table-bordered">
            {aux.length > 0 && aux.map((nivel,i) => 
              {asignaturas.filter(asignatura => asignatura.nivel.nombre === i+1).map((asignatura, j) =>
              <td key={j}>
                <p>{i+1}{j+1}</p>
                <p>{asignatura.nombre}</p>
                <p>SCT: {Math.round((((Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, j) => asignatura_hora.cantidad)) + Number(asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, j) => asignatura_hora.cantidad)))*0.75)*18)/27 || 0)}</p>
              </td>
              )}
            )}
           </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
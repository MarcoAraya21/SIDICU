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

export default function Horas({ openHoras, handleCloseHoras, asignatura_horas, asignaturaId, asignaturaNombre, handleInputArraysAsignatura, habilitarGeneral, habilitadogeneral, addNotification }) {
  const classes = useStyles();
  let horas_aula = asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id != 4).reduce((previous, current) => {
        return Number(previous) + Number(current.cantidad);
    }, 0);
  let horas_extra_aula = asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id == 4).reduce((previous, current) => {
      return Number(previous) + Number(current.cantidad);
    }, 0);
  return (
    <div>
      <Dialog fullScreen open={openHoras} onClose={handleCloseHoras} TransitionComponent={Transition} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar className={(!habilitadogeneral ? "deshabilitado" : "")}>
            <IconButton edge="start" color="inherit" onClick={handleCloseHoras} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {asignaturaNombre || "Sin Nombre"}
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className="text-right">
            <em>Horas Pedagógicas: 45 Minutos</em>
            <br/>
            <em>Horas Cronológicas: 60 Minutos</em>
          </div> 
          <div className="border p-3 mb-3">
            <legend>Horas Aula Pedagógicas</legend>
            {
              asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id != 4).map((asignatura_hora, i) =>
                <Edit key={asignatura_hora.id}
                  asignatura_hora={asignatura_hora}
                  asignaturaId={asignaturaId}
                  i={asignatura_hora.id}
                  handleInputArraysAsignatura= {handleInputArraysAsignatura}
                  habilitarGeneral={habilitarGeneral}
                  habilitadogeneral={habilitadogeneral}
                  addNotification={addNotification} />
              )
            }
            <legend>Horas Extra Aula Pedagógicas</legend>
            {
              asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id == 4).map((asignatura_hora, i) =>
                <Edit key={asignatura_hora.id}
                  asignatura_hora={asignatura_hora}
                  asignaturaId={asignaturaId}
                  i={asignatura_hora.id}
                  handleInputArraysAsignatura= {handleInputArraysAsignatura}
                  habilitarGeneral={habilitarGeneral}
                  habilitadogeneral={habilitadogeneral}
                  addNotification={addNotification} />
              )
            }
          </div>
          <div className="border p-3 mb-3">
            <h4>Formula de cálculo de SCT</h4>
            <p>N° SCT = (Total horas cronológicas por semana * 18)/27</p>
            <ul>
              <b>Donde:</b>
              <li>Total horas cronológicas por semana = Horas Aula + Horas Extra Aula</li>
              <li>18, corresponde al número de semanas que contempla un semestre lectivo.</li>
              <li>27, corresponde al valor en horas cronológicas de un SCT</li>
            </ul>
            <b>Reemplazando:</b>
            <p>N° SCT = (({(horas_aula*0.75).toFixed(2)} + {(horas_extra_aula*0.75).toFixed(2)}) * 18)/27</p>
            <p>N° SCT = {(((horas_aula + horas_extra_aula)*18*0.75)/27).toFixed(2)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
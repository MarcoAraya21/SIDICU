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

export default function Horas({ openHoras, handleCloseHoras, asignatura_horas, asignaturaId, asignaturaNombre, handleInputArrays,handleInputArraysAsignatura, habilitarGeneral, habilitadogeneral, addNotification }) {
  const classes = useStyles();

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
          <div className="border p-3 mb-3">
            {
                asignatura_horas.map((asignatura_hora, i) =>
                  <Edit key={asignatura_hora.id}
                    asignatura_hora={asignatura_hora}
                    asignaturaId={asignaturaId}
                    i={i}
                    handleInputArrays={handleInputArrays}
                    handleInputArraysAsignatura= {handleInputArraysAsignatura}
                    habilitarGeneral={habilitarGeneral}
                    habilitadogeneral={habilitadogeneral}
                    addNotification={addNotification} />
                )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
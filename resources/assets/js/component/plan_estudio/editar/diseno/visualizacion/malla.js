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

export default function Malla({ openMalla, handleCloseMalla, id, nombre, asignaturas, niveles}) {
  const classes = useStyles();

  var cantidades = [1,2,3,4,5,6];


  return (
    <div>
      <Dialog fullScreen open={openMalla} onClose={handleCloseMalla} TransitionComponent={Transition} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseMalla} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {nombre || "Malla Curricular"}
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent>
          <div>
            <table className="table table-bordered">
                <tbody>
                {niveles.length > 0 && niveles.map((nivel,i) => 
                  <tr key={i}>
                    {
                      cantidades.map((elemento, ind) =>
                        asignaturas && 
                        (        
                          asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).slice(0,6).length == cantidades.length ?
                        <td key={ind} style={{width: '135px'}}>
                          <p>{nivel.nombre}{elemento}</p>
                          <p>{asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).slice(0,6)[elemento-1].nombre}</p>
                          <p>SCT: {(asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).slice(0,6)[elemento-1].asignatura_horas.reduce((previous, current) => {
                              return Number(previous) + Number(current.cantidad);
                              }, 0)) / 2}
                          </p>
                        </td>
                        :
                          (
                            elemento <= asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).length ?
                            <td key={ind} style={{width: '135px'}}>
                              <p>{nivel.nombre}{elemento}</p>
                              <p>{asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).slice(0,6)[elemento-1].nombre}</p>
                              <p>SCT: {(asignaturas.filter(asignaturas => asignaturas.nivel.nombre == nivel.nombre).slice(0,6)[elemento-1].asignatura_horas.reduce((previous, current) => {
                                  return Number(previous) + Number(current.cantidad);
                                  }, 0)) / 2}
                              </p>
                            </td>
                            :
                              <td key={ind} style={{width: '135px'}}></td>
                          )
                          
                        )
                      )
                    }
                  </tr>
                )}
                </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
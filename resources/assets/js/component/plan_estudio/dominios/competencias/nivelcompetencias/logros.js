import React, { useState } from 'react';
import axios from 'axios';
// import Solicitud from '../seguimiento/DetalleSolicitud2';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { DialogContent } from '@material-ui/core';

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

 
export default function Logros({open, setOpen}) {
  const classes = useStyles();


  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
                <i className="fas fa-times text-danger"></i>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cerrar
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className='bg-gris'>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}
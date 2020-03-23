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

export default function Diseño({ openDiseño, handleCloseDiseño, id, nombre, asignaturas}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={openDiseño} onClose={handleCloseDiseño} TransitionComponent={Transition} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseDiseño} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {nombre || "Sin Nombre"}
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent>
        <div className="table-responsive">
        
        <table className="table table-bordered">
				<tr>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<td rowspan="2"></td>
					<th class="txt-ver" rowspan="3">Duración en semanas</th>
					<td colspan="7">Horas Semanales</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<td colspan="6">Horas Pedagógicas</td>
					<td colspan="3"></td>
				</tr>
				<tr>
					<th class="txt-ver">Nivel</th>
					<th class="txt-ver">CICLOS Y PROGRAMAS</th>
					<th class="txt-ver">CÓDIGO</th>
					<th>ASIGNATURA</th>
					<td class="txt-ver">Teoría</td>
					<td class="txt-ver">Laboratorio</td>
					<td class="txt-ver">Taller</td>
					<td class="txt-ver">Total aula</td>
					<td class="txt-ver">Extra aula</td>
					<td class="txt-ver">Total horas</td>
					<th class="txt-ver">Total horas Cronológica</th>
					<th class="txt-ver">SCT</th>
					<th class="txt-ver">REQUISITO</th>
				</tr>



                {asignaturas.length > 0 && asignaturas.map((asignatura,i) => 
                    <tr key={i}>
                        <td>1{i+1}</td>
                        <td></td>
                        <td>{asignatura.codigo}</td>
                        <td>{asignatura.nombre}</td>
                        <td></td>
                        <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 1).map((asignatura_hora, i) => asignatura_hora.cantidad)}</td>
                        <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 3).map((asignatura_hora, i) => asignatura_hora.cantidad)}</td>
                        <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 2).map((asignatura_hora, i) => asignatura_hora.cantidad)}</td>
                        <td></td>                        
                        <td>{asignatura.asignatura_horas.filter(asignatura_hora => asignatura_hora.tipo_hora_id === 4).map((asignatura_hora, i) => asignatura_hora.cantidad)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
				    </tr>

                )}
			</table>
            
          </div>

          
        </DialogContent>
      </Dialog>
    </div>
  );
}
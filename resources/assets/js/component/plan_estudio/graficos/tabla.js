import React, { useState } from 'react';
import axios from 'axios'
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


export default function Tabla({ openTabla, handleCloseTabla, id, nombre, dominios, competencias_genericas, asignaturas}) {
  const classes = useStyles();
  const [datos, setdatos] = useState([]);

  function getdata(variable) {
    axios.get(`/api/plan_estudios/${variable}/datos`).then((
        response // console.log(response.data.tasks)
    ) =>{
      console.log(response.data)
      setdatos(response.data);
        }            
    );

    
    
}

  let aux = [];
  let aux2 = [];
  let aux3 = [];
  let totalgen = 0;
    dominios && dominios.map((dominio,i) =>
        [aux[i] = 0,
        
        dominio.competencias.map( competencia =>
        competencia.nivel_competencias.map( nivel_competencia => 
        aux[i] = aux[i] + (nivel_competencia.logro_aprendizajes && ((nivel_competencia.logro_aprendizajes.length == 0) ? 1 : nivel_competencia.logro_aprendizajes.length))
        )) ]);
    competencias_genericas && competencias_genericas.map((competencias_generica,i) =>
          [aux2[i] = 0,
          competencias_generica.nivel_competencias.map( nivel_competencia =>
          aux2[i] = aux2[i] + nivel_competencia.logro_aprendizajes.length)]);
    aux2.map((largo,i) =>
          totalgen = totalgen + largo
    );
    aux.map((elemento,i) => 
      elemento == 0 ? aux3[i] = 1 : aux3[i] = elemento
    )

  return (
    <div>
      <Dialog fullScreen open={openTabla} onClose={handleCloseTabla} TransitionComponent={Transition} onEnter={() => getdata(id)} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseTabla} aria-label="close">
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
            <thead>
            <tr>
                <th>Dominios</th>
                <th>Competencia</th>
                <th>Nivel de Competencia</th>
                <th>Logros de Aprendizaje</th>
                <th>Asignatura</th>
            </tr>
            </thead>
        <tbody>
        
        {dominios.map((dominio,i) =>
        <React.Fragment key={i}>
          <tr>
            <td rowSpan={datos.length > 0 && datos[i].casilla_logros || 1}>{dominio.nombre}</td>
            <td rowSpan={datos.length > 0 && datos[i].competencias.length && datos[i].competencias[0].casilla_logros || 1}>{dominio.competencias.length > 0 && dominio.competencias[0].descripcion}</td>
            <td rowSpan={dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length || 1}>{dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].descripcion}</td>
            <td>{dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
            <td rowSpan={dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length || 1}>
              <ul>
                {dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].nivel_competencia_asignaturas.length > 0 && dominio.competencias[0].nivel_competencias[0].nivel_competencia_asignaturas.map((nivel_asignatura,p) =>
                  <li key={p}>{nivel_asignatura.asignatura.nombre}</li>
                )}
              </ul>
            </td>
          </tr>

          {dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.slice(1,dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length).map((logro,j) =>
          <tr key={j}>
            <td>{logro.descripcion}</td>
          </tr>
          )}
          {dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias.slice(1,dominio.competencias[0].nivel_competencias.length).map((nivel,k) =>
          <React.Fragment key={k}>
          <tr>
              <td rowSpan={nivel.logro_aprendizajes.length || 1}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes.length > 0 && nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length || 1}>
              <ul>
                {nivel.nivel_competencia_asignaturas.length > 0 && nivel.nivel_competencia_asignaturas.map((nivel_asignatura,p) =>
                  <li key={p}>{nivel_asignatura.asignatura.nombre}</li>
                )}
              </ul>
              
              </td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr key={i}>
              <td>{logro.descripcion}</td>
            </tr>
            )}
          </React.Fragment>
          )}

          {dominio.competencias.length > 0 && dominio.competencias.slice(1,dominio.competencias.length).map((competencia,l) =>
          <React.Fragment>
          <tr key={l}>
            <td rowSpan={datos.length > 0 && datos[0].competencias.length && datos[0].competencias[l+1].casilla_logros || 1}>{datos.length > 0 && datos[0].competencias.length && datos[0].competencias[l+1].casilla_logros} {competencia.descripcion}</td>
            <td rowSpan={competencia.nivel_competencias[0].logro_aprendizajes.length || 1}>{competencia.nivel_competencias[0].descripcion}</td>
            <td>{competencia.nivel_competencias[0].logro_aprendizajes.length > 0 && competencia.nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
            <td rowSpan={competencia.nivel_competencias[0].logro_aprendizajes.length || 1}>
            <ul>
                {competencia.nivel_competencias[0].nivel_competencia_asignaturas.length > 0 && competencia.nivel_competencias[0].nivel_competencia_asignaturas.map((nivel_asignatura,p) =>
                  <li key={p}>{nivel_asignatura.asignatura.nombre}</li>
                )}
              </ul>
              </td>
          </tr>
            {competencia.nivel_competencias[0].logro_aprendizajes.slice(1,competencia.nivel_competencias[0].logro_aprendizajes.length).map((logro,j) =>
            <tr key={j}>
              <td>{logro.descripcion}</td>
            </tr>
            )}
          {competencia.nivel_competencias.length > 0 && competencia.nivel_competencias.slice(1,3).map((nivel, z) =>
          <React.Fragment key={z}>
            <tr>
              <td rowSpan={nivel.logro_aprendizajes.length || 1}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes.length > 0 && nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length || 1}>
              
              <ul>
                {nivel.nivel_competencia_asignaturas.length > 0 && nivel.nivel_competencia_asignaturas.map((nivel_asignatura,p) =>
                  <li key={p}>{nivel_asignatura.asignatura.nombre}</li>
                )}
              </ul>
              
              </td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr key={i}>
              <td>{logro.descripcion}</td>
            </tr>
            )}
          </React.Fragment>
        )}
            </React.Fragment>
          
          )}
        </React.Fragment>
        )}

<tr>
          <td rowSpan={totalgen}>Generico</td>
          <td rowSpan={aux2[0]}>{competencias_genericas.length > 0 && competencias_genericas[0].descripcion}</td>
          <td rowSpan={competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length}>{competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias[0].descripcion}</td>
          <td>{competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
          <td rowSpan={competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length}>
            <ul>
            {
              asignaturas.filter(asignatura => 
                asignatura.nivel_generica_asignaturas.length > 0 
                && asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura => 
                  nivel_generica_asignatura.nivel_generica.nivel_competencia_id == competencias_genericas[0].nivel_competencias[0].id
                )
              ).map((asignatura, j) => 
                <li key={j}>{asignatura.nombre}</li>
              )
            }
            </ul>
          </td>
        </tr>

        {competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.slice(1,competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length).map((logro, i) => 
        <tr key={i}>
          <td>{logro.descripcion}</td>
        </tr>
        )}
        
        {competencias_genericas.length > 0 && competencias_genericas[0].nivel_competencias.slice(1,3).map((nivel, i) =>
          <React.Fragment key={i}>
            <tr>
              <td rowSpan={nivel.logro_aprendizajes.length}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length}>
                <ul>
                {
                  asignaturas.filter(asignatura => 
                    asignatura.nivel_generica_asignaturas.length > 0 
                    && asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura => 
                      nivel_generica_asignatura.nivel_generica.nivel_competencia_id == nivel.id
                    )
                  ).map((asignatura, j) => 
                    <li key={j}>{asignatura.nombre}</li>
                  )
                }
                </ul>
              </td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr key={i}>
              <td>{logro.descripcion}</td>
            </tr>
            )}
          </React.Fragment>
        )}

        {competencias_genericas.length && competencias_genericas.slice(1,competencias_genericas.length).map((generica,i) =>
        <React.Fragment key={i}>
        <tr>
            <td rowSpan={aux2[i+1]}>{generica.descripcion}</td>
            <td rowSpan={generica.nivel_competencias[0].logro_aprendizajes.length}>{generica.nivel_competencias[0].descripcion}</td>
            <td>{generica.nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
            <td rowSpan={generica.nivel_competencias[0].logro_aprendizajes.length}>
              <ul>
              {
                asignaturas.filter(asignatura => 
                  asignatura.nivel_generica_asignaturas.length > 0 
                  && asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura => 
                    nivel_generica_asignatura.nivel_generica.nivel_competencia_id == generica.nivel_competencias[0].id
                  )
                ).map((asignatura, j) => 
                  <li key={j}>{asignatura.nombre}</li>
                )
              }
              </ul>
            </td>
        </tr>
        {generica.nivel_competencias[0].logro_aprendizajes.slice(1,generica.nivel_competencias[0].logro_aprendizajes.length).map((logro,i) => 
          <tr key={i}>
            <td>{logro.descripcion}</td>
          </tr>
        )}
        {generica.nivel_competencias.slice(1,generica.nivel_competencias.length).map((nivel,i) =>
        <React.Fragment key={i}>
          <tr>
              <td rowSpan={nivel.logro_aprendizajes.length}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length}>
                <ul>
                {
                  asignaturas.filter(asignatura => 
                    asignatura.nivel_generica_asignaturas.length > 0 
                    && asignatura.nivel_generica_asignaturas.some(nivel_generica_asignatura => 
                      nivel_generica_asignatura.nivel_generica.nivel_competencia_id == nivel.id
                    )
                  ).map((asignatura, j) => 
                    <li key={j}>{asignatura.nombre}</li>
                  )
                }
                </ul>
              </td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr key={i}>
              <td>{logro.descripcion}</td>
            </tr>
            )}
        </React.Fragment>
        )}
        </React.Fragment>
        )}



        </tbody>
      </table>
    </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}
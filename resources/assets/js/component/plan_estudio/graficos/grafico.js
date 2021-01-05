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


import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";

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

const StyledNode = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  border: 1px solid blue;
  min-width: 200px;
  max-width: 350px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Tabla({ openGrafico, handleCloseGrafico, id, nombre, dominios, competencias_genericas}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={openGrafico} onClose={handleCloseGrafico} TransitionComponent={Transition} disableEscapeKeyDown>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseGrafico} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {nombre || "Sin Nombre"}
            </Typography>

          </Toolbar>
        </AppBar>
        <DialogContent>
          <div style={{display: 'flex'}}>
          <Tree
        lineWidth={"1px"}
        lineColor={"gray"}
        lineBorderRadius={"5px"}
        label={<StyledNode><b>{nombre}</b></StyledNode>}
      >
       
       
       {dominios.map((dominio,i) =>
          <TreeNode key={i} label={<StyledNode><h6>Dominio {i+1}</h6>{dominio.nombre}</StyledNode>}>
            {dominio.competencias.map((competencia,j) =>
                <TreeNode key={j} label={<StyledNode><h6>Competencia {j+1}</h6>{competencia.descripcion}</StyledNode>}>
                    {competencia.nivel_competencias.map((nivel_competencia,k) =>
                        <TreeNode key={k} label={<StyledNode>
                            <h6 data-toggle="collapse" className="pointer-cursor" data-target={`#nivel${nivel_competencia.id}`}>
                              Nivel {k+1}
                            </h6>
                            <p id={`nivel${nivel_competencia.id}`} className="collapse">
                              
                                {nivel_competencia.descripcion}
                            </p>
                        </StyledNode>}>
                            {nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,l) =>
                                <TreeNode key={l} label={<StyledNode>
                                				
                                          <h6 data-toggle="collapse" className="pointer-cursor" data-target={`#logro${logro_aprendizaje.id}`}>
                                            Logro de Aprendizaje {l+1}
                                          </h6>
                                          <div id={`logro${logro_aprendizaje.id}`} className="collapse">
                                            
                                             {logro_aprendizaje.descripcion}
                                            
                                          </div>
                                        
                                </StyledNode>}>
                                </TreeNode>
                            )}
                        </TreeNode>
                    )}
                </TreeNode>
            )}
        </TreeNode>
    )}
        <TreeNode label={<StyledNode><h6>Dominio Generico</h6></StyledNode>}>
          {competencias_genericas.map((generica,a) =>
            <TreeNode key={a} label={<StyledNode><h6>Competencia Generica {a+1}</h6> {generica.descripcion}</StyledNode>}> 
            {generica.nivel_competencias.map((nivel_competencia,b) =>
              <TreeNode key={b} label={<StyledNode><h6>Nivel {b+1}</h6> {nivel_competencia.descripcion}</StyledNode>}>
                  {nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,c) =>
                      <TreeNode key={c} label={<StyledNode><h6>Logro de aprendizaje {c+1}</h6> {logro_aprendizaje.descripcion}</StyledNode>}>
                      </TreeNode>
                  )}
              </TreeNode>
          )}
      </TreeNode>
          )}
        </TreeNode>
    </Tree>
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
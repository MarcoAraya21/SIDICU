import React from "react";
import styled from "@emotion/styled";
import { Tree, TreeNode } from "react-organizational-chart";

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

export default class StyledTreeExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     
    }

}
  


  render() {
    let aux = [];
    let aux2 = [];
    let aux3 = [];
    let totalgen = 0;
      this.props.dominios && this.props.dominios.map((dominio,i) =>
          [aux[i] = 0,
          
          dominio.competencias.map( competencia =>
          competencia.nivel_competencias.map( nivel_competencia => 
          aux[i] = aux[i] + (nivel_competencia.logro_aprendizajes && ((nivel_competencia.logro_aprendizajes.length == 0) ? 1 : nivel_competencia.logro_aprendizajes.length))
          )) ]);
      this.props.competencias_genericas && this.props.competencias_genericas.map((competencias_generica,i) =>
            [aux2[i] = 0,
            competencias_generica.nivel_competencias.map( nivel_competencia =>
            aux2[i] = aux2[i] + nivel_competencia.logro_aprendizajes.length)]);
      aux2.map((largo,i) =>
            totalgen = totalgen + largo
      );
      aux.map((elemento,i) => 
        elemento == 0 ? aux3[i] = 1 : aux3[i] = elemento
      )
     

      console.log('tamaño', aux);
      console.log('tamañogenericas', aux2);
      console.log('total',totalgen);
      console.log('Tamaño2',aux3);


    return (
      <div>
        <div>
        <h4>Plan de estudio</h4>
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={<StyledNode>{this.props.nombre}</StyledNode>}
      >
       
       
       {this.props.dominios.map((dominio,i) =>
        <TreeNode key={i} label={<StyledNode>{dominio.nombre}</StyledNode>}>
            {dominio.competencias.map((competencia,i) =>
                <TreeNode key={i} label={<StyledNode>{competencia.descripcion}</StyledNode>}>
                    {competencia.nivel_competencias.map((nivel_competencia,i) =>
                        <TreeNode key={i} label={<StyledNode>{nivel_competencia.descripcion}</StyledNode>}>
                            {nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,i) =>
                                <TreeNode key={i} label={<StyledNode>{logro_aprendizaje.descripcion}</StyledNode>}>
                                </TreeNode>
                            )}
                        </TreeNode>
                    )}
                </TreeNode>
            )}
        </TreeNode>
    )}
        <TreeNode label={<StyledNode>Generico</StyledNode>}>
          {this.props.competencias_genericas.map((generica,i) =>
            <TreeNode key={i} label={<StyledNode>{generica.descripcion}</StyledNode>}> 
            {generica.nivel_competencias.map((nivel_competencia,i) =>
              <TreeNode key={i} label={<StyledNode>{nivel_competencia.descripcion}</StyledNode>}>
                  {nivel_competencia.logro_aprendizajes.map((logro_aprendizaje,i) =>
                      <TreeNode key={i} label={<StyledNode>{logro_aprendizaje.descripcion}</StyledNode>}>
                      </TreeNode>
                  )}
              </TreeNode>
          )}
      </TreeNode>
          )}
        </TreeNode>
    </Tree> 
    </div>


    <div className="table-responsive">
      <h4>Tabla</h4>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>Dominios</th>
          <th>Competencia</th>
          <th>Nivel de Competencia</th>
          <th>Logro de Aprendizaje</th>
          <th>Asignatura</th>
        </tr>
        </thead>
        <tbody>
        

        <tr>
          <td rowSpan={totalgen}>Generico</td>
          <td rowSpan={aux2[0]}>{this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].descripcion}</td>
          <td rowSpan={this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length}>{this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias[0].descripcion}</td>
          <td>{this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
          <td rowSpan={this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length}>Asignatura</td>
        </tr>

        {this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.slice(1,this.props.competencias_genericas[0].nivel_competencias[0].logro_aprendizajes.length).map((logro, i) => 
        <tr>
          <td>{logro.descripcion}</td>
        </tr>
        )}
        
        {this.props.competencias_genericas.length > 0 && this.props.competencias_genericas[0].nivel_competencias.slice(1,3).map((nivel, i) =>
          <React.Fragment>
            <tr>
              <td rowSpan={nivel.logro_aprendizajes.length}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length}>Asignatura</td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr>
              <td>{logro.descripcion}</td>
            </tr>
            )}
          </React.Fragment>
        )}

        {this.props.competencias_genericas.length && this.props.competencias_genericas.slice(1,this.props.competencias_genericas.length).map((generica,i) =>
        <React.Fragment>
        <tr>
            <td rowSpan={aux2[i+1]}>{generica.descripcion}</td>
            <td rowSpan={generica.nivel_competencias[0].logro_aprendizajes.length}>{generica.nivel_competencias[0].descripcion}</td>
            <td>{generica.nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
            <td rowSpan={generica.nivel_competencias[0].logro_aprendizajes.length}>Asignaturas</td>
        </tr>
        {generica.nivel_competencias[0].logro_aprendizajes.slice(1,generica.nivel_competencias[0].logro_aprendizajes.length).map((logro,i) => 
          <tr>
            <td>{logro.descripcion}</td>
          </tr>
        )}
        {generica.nivel_competencias.slice(1,generica.nivel_competencias.length).map((nivel,i) =>
        <React.Fragment>
          <tr>
              <td rowSpan={nivel.logro_aprendizajes.length}>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes[0].descripcion}</td>
              <td rowSpan={nivel.logro_aprendizajes.length}>Asignatura</td>
            </tr>
            {nivel.logro_aprendizajes.slice(1,nivel.logro_aprendizajes.length).map((logro,i) =>
            <tr>
              <td>{logro.descripcion}</td>
            </tr>
            )}
        </React.Fragment>
        )}
        </React.Fragment>
        )}
        

        {this.props.dominios.map((dominio,i) =>
        <React.Fragment>
          <tr>
            <td rowSpan={aux3[i]}>{dominio.nombre}</td>
            <td rowSpan="3">{dominio.competencias.length > 0 && dominio.competencias[0].descripcion}</td>
            <td>{dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].descripcion}</td>
            <td>{dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes[0].descripcion}</td>
            <td>Asignatura</td>
          </tr>

          {dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.slice(1,dominio.competencias[0].nivel_competencias[0].logro_aprendizajes.length).map((logro,i) =>
          <tr>
            <td>prueba</td>
          </tr>
          )}




          {dominio.competencias.length > 0 && dominio.competencias[0].nivel_competencias.slice(1,dominio.competencias[0].nivel_competencias.length).map((nivel,i) =>
          <tr>
              <td>{nivel.descripcion}</td>
              <td>{nivel.logro_aprendizajes.length > 0 && nivel.logro_aprendizajes[0].descripcion}</td>
              <td>Asignatura</td>
            </tr>
          )}
          
        </React.Fragment>
        )}

        </tbody>
      </table>
    </div>

    

    </div>

    


    );
  }
}
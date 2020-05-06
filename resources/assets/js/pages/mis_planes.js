import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plan_estudios: []
    }

    this.abortController = new AbortController()


    }

    
    
    handleAddElement(key, elemento) {
      console.log(key);
      console.log(elemento);
      var state = this.state[key];
      state.push(elemento);
      this.setState({[key]: state});
      
  }
    componentWillMount() {
    this.getPlanEstudios();
    }
    componentWillUnmount(){
      this.abortController.abort();
    }

    getPlanEstudios() {
        fetch('/api/mis_planes', {signal: this.abortController.signal})
          .then(response => response.json())
          .then(data => this.setState({ plan_estudios: data}))
          .catch(err => {
            if(err.name === 'AbortError') return 
            throw error
          });        
            //console.log(response.data)       
      }

      listPlanEstudio(plan_estudios){
        return plan_estudios.map(
            (plan_estudio, i) => 
                <tr key={i}>
                    <td>{plan_estudio.id}</td>
                    <td>{plan_estudio.nombre}</td>
                    <td>
                      {
                        plan_estudio.estado_id == 2 ?
                        <Link to={`Plan/Editar/${plan_estudio.id}`} className='btn btn-primary p-5 m-l-5'><i className='fas fa-pencil-alt p-r-10'></i>Editar</Link>
                        :
                        <button disabled className='btn btn-lime p-5 m-l-5'><i className="fas fa-search p-r-10"></i>En Revisión</button>
                      }
                    </td>
                </tr>
                
        )
      }

    render() {
        return (
              <div className='container py-4'>
                 <ol className="breadcrumb pull-right">
                   <li className="breadcrumb-item active">Inicio</li>
                 </ol>
                 <h1 className="page-header">Mis Planes</h1>
                   <div className="panel-body bg-white">
                     <div className="table-responsive">
                       <table className="table table-condensed m-b-0 text-inverse">
                         <thead>
                           <tr>
                             <th>#</th>
                             <th>Plan</th>
                             <th>Editar</th>
                           </tr>
                         </thead>
                         <tbody>
                           {
                             this.listPlanEstudio(this.state.plan_estudios)
                           }
                         </tbody>
                       </table>
                     </div>
                 </div>
             </div> 
        );
    }
}

export default Index;
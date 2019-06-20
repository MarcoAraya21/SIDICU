import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dominios from './plan_estudio/index'
import {borrarElemento} from '../component/utiles/lib';

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plan_estudios: []
    }
    this.handleAddElement = this.handleAddElement.bind(this);
    this.addElemento = this.addElemento.bind(this);
    this.borrarElemento = borrarElemento.bind(this);
    this.abortController = new AbortController()


    }

    
    
    handleAddElement(key, elemento) {
      console.log(key);
      console.log(elemento);
      var state = this.state[key];
      state.push(elemento);
      this.setState({[key]: state});
      
  }

    addElemento(){
      //e.preventDefault();
      fetch(`/api/plan_estudios/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json'
          }
      })
      .then(function(response) {
          if(response.ok) {
              return response.json();
          } else {
              throw "Error en la llamada Ajax";
          }
       
       })
       .then( data => this.handleAddElement('plan_estudios', data));
       
  }

    componentWillMount() {
    this.getPlanEstudios();
    }
    componentWillUnmount(){
      this.abortController.abort();
    }

    getPlanEstudios() {
        fetch('/api/plan_estudios', {signal: this.abortController.signal})
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
                    <td><Link to={`${plan_estudio.id}`} className='btn btn-primary'>Abrir</Link></td>
                    <td><button type="button" className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.borrarElemento('plan_estudios', plan_estudio.id)}}>
                      <i className="fas fa-times p-r-10"></i>Eliminar</button></td>
                </tr>
                
        )
      }

    render() {
        return (
            <div className='container py-4'>
              <ol className="breadcrumb pull-right">
                <li className="breadcrumb-item active">Inicio</li>
              </ol>
              <h1 className="page-header">Planes de Estudio</h1>
                <div className="panel-body bg-white">
                  <div className="table-responsive">
                    <table className="table table-condensed m-b-0 text-inverse">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Plan</th>
                          <th>Link</th>
                          <th>Borrar</th>
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
              <div align="right" className="mt-2">
                <button type="button" className="btn btn-primary" onClick={this.addElemento}>
                <i className="fas fa-plus p-r-5" ></i>
                  Agregar Plan</button>
              </div>           
            </div>
        );
    }
}

export default Index;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Index extends Component {
    constructor (props) {
        super(props)
        this.state = {
            carreras: []
        }
    }
    
    componentWillMount() {
    this.getCarreras();
    }

    getCarreras() {
        fetch('/api/carreras')
          .then(response => response.json())
          .then(data => this.setState({ carreras: data}));        
            //console.log(response.data)       
      }

      listCarreras(carreras){
        return carreras.map(
            (carrera, i) => 
                <tr key={i}>
                    <td>{carrera.id}</td>
                    <td>{carrera.nombre}</td>
                    <td>{carrera.cod_demre}</td>
                    <td><Link to={`${carrera.id}`} className='btn btn-primary'>Abrir</Link></td>
                </tr>
                
        )
      }

    render() {
        return (
            <div className='container py-4'>
              <ol className="breadcrumb pull-right">
                <li className="breadcrumb-item active">Inicio</li>
              </ol>
              <h1 className="page-header">Carreras</h1>
                <div className="panel-body bg-white">
                  <div className="table-responsive">
                    <table className="table table-condensed m-b-0 text-inverse">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Carrera</th>
                          <th>Codigo</th>
                          <th>Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.listCarreras(this.state.carreras)
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
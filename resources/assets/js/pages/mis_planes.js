import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      fetch(`/api/plan_estudios`, {
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
                    <td><Link to={`Plan/Editar/${plan_estudio.id}`} className='btn btn-primary'>Abrir</Link></td>
                    <td><button type="button" className="btn btn-danger p-5 m-l-5"
                    onClick={()=>{ if(window.confirm('¿Estas Seguro?'))
                    this.borrarElemento('plan_estudios', plan_estudio.id)}}>
                      <i className="fas fa-times p-r-10"></i>Eliminar</button></td>
                </tr>
                
        )
      }

    render() {
        return (
      //     <div class="row">
      //       <ul class="nav nav-tabs">
      //         <li class="nav-items">
      //           <a href="#default-tab-1" data-toggle="tab" class="nav-link active">
      //             <span class="d-sm-none">Tab 1</span>
      //             <span class="d-sm-block d-none">Default Tab 1</span>
      //           </a>      
      //         </li>
      //         <li class="nav-items">
      //           <a href="#default-tab-2" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 2</span>
      //             <span class="d-sm-block d-none">Default Tab 2</span>
      //           </a>
      //         </li>
      //         <li class="">
      //           <a href="#default-tab-3" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 3</span>
      //             <span class="d-sm-block d-none">Default Tab 3</span>
      //           </a>
      //         </li>
      //       </ul>
      //       <div class="tab-content">
			// 	<div class="tab-pane fade active show" id="default-tab-1">
      //   <ul class="nav nav-tabs">
      //         <li class="nav-items">
      //           <a href="#default-tab-1" data-toggle="tab" class="nav-link active">
      //             <span class="d-sm-none">Tab 1</span>
      //             <span class="d-sm-block d-none">Default Tab 1</span>
      //           </a>      
      //         </li>
      //         <li class="nav-items">
      //           <a href="#default-tab-2" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 2</span>
      //             <span class="d-sm-block d-none">Default Tab 2</span>
      //           </a>
      //         </li>
      //         <li class="">
      //           <a href="#default-tab-3" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 3</span>
      //             <span class="d-sm-block d-none">Default Tab 3</span>
      //           </a>
      //         </li>
      //       </ul>
      //       <div class="tab-content">
			// 	    <div class="tab-pane fade active show" id="default-tab-1">
      //       <ul class="nav nav-tabs">
      //         <li class="nav-items">
      //           <a href="#default-tab-1" data-toggle="tab" class="nav-link active">
      //             <span class="d-sm-none">Tab 1</span>
      //             <span class="d-sm-block d-none">Default Tab 1</span>
      //           </a>      
      //         </li>
      //         <li class="nav-items">
      //           <a href="#default-tab-2" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 2</span>
      //             <span class="d-sm-block d-none">Default Tab 2</span>
      //           </a>
      //         </li>
      //         <li class="">
      //           <a href="#default-tab-3" data-toggle="tab" class="nav-link">
      //             <span class="d-sm-none">Tab 3</span>
      //             <span class="d-sm-block d-none">Default Tab 3</span>
      //           </a>
      //         </li>
      //       </ul>
      //         </div>
      //        </div>
      //        <div class="tab-content">
			// 	    <div class="tab-pane fade active show" id="default-tab-1"></div>
      //       <div class="card">
			// 		<div class="card-header bg-black text-white pointer-cursor" data-toggle="collapse" data-target="#collapseOne">
			// 			Collapsible Group Item #1
			// 		</div>
			// 		<div id="collapseOne" class="collapse show" data-parent="#accordion">
			// 			<div class="card-body">
			// 				Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      //         <div class="card">
			// 		<div class="card-header bg-black text-white pointer-cursor" data-toggle="collapse" data-target="#collapseOne">
			// 			Collapsible Group Item #1
			// 		</div>
			// 		<div id="collapseOne" class="collapse show" data-parent="#accordion">
			// 			<div class="card-body">
			// 				Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
			// 			</div>
			// 		</div>
			// 	</div>
			// 			</div>
			// 		</div>
			// 	</div>
      //       </div>
      //        </div>

              
			// 	</div>
			// 	<div class="tab-pane fade" id="default-tab-2">
	
			// 	</div>
		
			// 	<div class="tab-pane fade" id="default-tab-3">
			// 		<p>
			// 			<span class="fa-stack fa-4x pull-left m-r-10">
			// 				<i class="fa fa-square-o fa-stack-2x"></i>
			// 				<i class="fab fa-twitter fa-stack-1x"></i>
			// 			</span>
			// 			Praesent tincidunt nulla ut elit vestibulum viverra. Sed placerat magna eget eros accumsan elementum. 
			// 			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis lobortis neque. 
			// 			Maecenas justo odio, bibendum fringilla quam nec, commodo rutrum quam. 
			// 			Donec cursus erat in lacus congue sodales. Nunc bibendum id augue sit amet placerat. 
			// 			Quisque et quam id felis tempus volutpat at at diam. Vivamus ac diam turpis.Sed at lacinia augue. 
			// 			Nulla facilisi. Fusce at erat suscipit, dapibus elit quis, luctus nulla. 
			// 			Quisque adipiscing dui nec orci fermentum blandit.
			// 			Sed at lacinia augue. Nulla facilisi. Fusce at erat suscipit, dapibus elit quis, luctus nulla. 
			// 			Quisque adipiscing dui nec orci fermentum blandit.
			// 		</p>
			// 	</div>
			// </div>
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
                 {/* <div align="right" className="mt-2">
                   <button type="button" className="btn btn-primary" onClick={this.addElemento}>
                   <i className="fas fa-plus p-r-5" ></i>
                     Agregar Plan</button>
                 </div> */}
             </div> 
        );
    }
}

export default Index;
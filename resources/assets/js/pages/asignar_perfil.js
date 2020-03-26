import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.css';
import { CONF_DATATABLE } from '../component/utiles/lib';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            perfiles: []
        }
        this.guardarPerfil = this.guardarPerfil.bind(this);
        this.abortController = new AbortController()

    }
    
    handleInput(e, usuario_id)
    {
        var usuarios = this.state.usuarios.map(usuario => {
            
            if(usuario.id == usuario_id)
            {
                return {...usuario, nuevo_perfil: e.target.value}
            }
            else
            {
                return usuario;
            }
        });
        
        this.setState({usuarios: usuarios});
    }

    componentDidUpdate(prevProps) {
        this.$el = $(this.el);
        this.$el.DataTable(CONF_DATATABLE);
    
    }
    guardarPerfil(usuario) {
        swal({
            title: 'Estas seguro que deseas asignar el perfil de  a "' + usuario.nombre + ' ' + usuario.apellido_paterno + '" ?',
            icon: "info",
            buttons: {
                cancel: 'Cancelar',
                confirm: "Asignar"
            },
            closeOnEsc: false,
            allowOutsideClick: false
            // dangerMode: true,
        })
        .then((value) => {
            if (value) {
                fetch(`/api/usuarios/${usuario.id}`, {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            perfil: usuario.nuevo_perfil
                        }
                    )
                })
                    .then(function (response) {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw "Error en la llamada Ajax";
                        }

                    })
                    .then((data) => {
                        console.log(data);
                        if(data)
                        {
                            
                            swal({
                                title: "Se ha asignado correctamente!",
                                icon: "success",
                                closeOnEsc: false,
                                allowOutsideClick: false
                            });
                            
                            let usuarios = this.state.usuarios.map(usuario2 => {
                                if(usuario2.id == usuario.id)
                                {
                                    return {...usuario2, perfil_id: usuario.nuevo_perfil, perfil: this.state.perfiles.find( perfil => perfil.id == usuario.nuevo_perfil)}
                                }
                                else
                                {
                                    return usuario2;
                                }
                            });
                            
                            this.setState({ usuarios: usuarios })
                        }
                        else
                        {
                            swal({
                                title: "Oops...",
                                text: "No se ha podido editar el perfil.",
                                icon: "danger",
                                closeOnEsc: false,
                                allowOutsideClick: false
                            });
                            
                        }
                    })
                    .catch(function (error) {
                        swal({
                            title: "Oops...",
                            text: "Ha ocurrido un error en el servidor, intente nuevamente!",
                            icon: "error",
                            closeOnEsc: false,
                            allowOutsideClick: false
                        })
                    })
            }
        });

    }


    componentWillMount() {
        this.getUsuarios();
        this.getPerfiles();
    }
    componentWillUnmount() {
        this.abortController.abort();
        this.$el.DataTable().destroy();

    }
    getUsuarios() {
        fetch('/api/usuarios', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ usuarios: data}))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
        });
        //console.log(response.data)       
    }
    getPerfiles(){
        fetch('/api/perfiles', { signal: this.abortController.signal })
            .then(response => response.json())
            .then(data => this.setState({ perfiles: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
        });
    }

    listUsuarios(usuarios) {
        return usuarios.map(
            (usuario, i) =>
                <tr key={i}>
                    <td>{usuario.nombre} {usuario.apellido_paterno}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.rut}</td>
                    <td>{usuario.perfil.nombre}</td>
                    <td>
                        <select defaultValue={""}
                            className={ "form-control"}
                            onChange={(e)=>this.handleInput(e, usuario.id)}>
                            <option disabled value="">Seleccione una Opción</option>
                            {
                                this.state.perfiles.filter(perfil => perfil.id != usuario.perfil.id).map( (perfil, j) =>
                                    <option key={j} value={perfil.id}>{perfil.nombre}</option>
                                    )
                            }
                        </select>
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary p-5 m-l-5"
                            onClick={() => this.guardarPerfil(usuario)}>
                            <i className="fas fa-save p-r-10"></i>Guardar
                        </button>
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
                <h1 className="page-header">Listado de Usuarios</h1>
                <div className="panel-body bg-white">
                    <div className="table-responsive">
                        {
                            this.state.usuarios && this.state.perfiles &&
                            <table className="table table-condensed m-b-0 text-inverse" ref={el => this.el = el}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Rut</th>
                                        <th>Perfil Actual</th>
                                        <th>Cambiar Perfil</th>
                                        <th>Guardar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.listUsuarios(this.state.usuarios)
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
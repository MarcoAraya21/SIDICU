import React, { Component } from 'react'
import Panel from '../../utiles/Panel'
import Show from './show'

export default class index extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
        
    }
    

    
    render() {
        return (
            <div className="container py-4">
                <div className="col ui-sortable-disabled">
                    <legend>Asignaturas</legend>
                    <React.Fragment>
                        {this.props.asignaturas.map((asignatura,i) =>
                            <Panel key = {'asignatura-' + asignatura.id} titulo={asignatura.nombre}>
                                <Show />
                            </Panel>
                        )}
                    </React.Fragment>
                </div>  
            </div>
        );
    }
}
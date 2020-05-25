import React, { Component } from 'react'

export default class redaccion extends Component {
    constructor (props) {
        super(props)
    }

    
    render() {
        return (
            <div className="container py-4">
                <div className="col-12">                   
                    <legend>Redacción del Plan de Estudios</legend>
                    <p className="px-2 py-2 border">
                            {this.props.redaccion || ''}
                    </p>
                </div>
            </div>
        );
    }
}
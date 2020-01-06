import React, { Component } from 'react';

class holi extends Component {
    constructor (props) {
        super(props)
        this.state = {
          nombre: ''
        }
    }
    render() {
        return (
            <div>
                <div class="table-responsive bg-white">
                    <table class="table m-b-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nicky Almera</td>
                                <td>nicky@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Edmund Wong</td>
                                <td>edmund@yahoo.com</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Harvinder Singh</td>
                                <td>harvinder@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default holi;
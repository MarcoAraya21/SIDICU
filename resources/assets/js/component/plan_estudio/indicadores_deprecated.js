import React, { Component } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default class indicadores extends Component {
    constructor (props) {
        super(props)
        this.state = {
            initPie: 0,
            miChart: {}
        }
        this.initGraficos = this.initGraficos.bind(this);
        this.updateGraficos = this.updateGraficos.bind(this);
        
    }
    

    initGraficos()
    {
        var ctx = document.getElementById('pie-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                // labels: dominioAsignaturas.map(elemento => elemento[0]),
                // datasets: {
                //     data: dominioAsignaturas.map(elemento => elemento[1]),
                //     backgroundColor: dominioAsignaturas.map( (el, i) => colores[i]),
                //     borderWidth: 1
                // }
            },
            options:
            {
                title: {
                    display: true,
                    text: "% de Asignaturas por Dominio"
                },
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            let sum = 0;
                            let dataArr = context.chart.data.datasets[0].data;
                            dataArr.map(data => {
                                sum += data;
                            });
                            let percentage = (value*100 / sum).toFixed(2)+"%";
                            return percentage;
                        }
                    }
                }
            }
        })
        this.setState({initPie: 1, miChart: myChart})
    }
    updateGraficos(dominioAsignaturas)
    {
        var colores = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 185, 186, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ];
        this.state.miChart.data.labels = dominioAsignaturas.map(elemento => elemento[0]);
        this.state.miChart.data.datasets[0].data = dominioAsignaturas.map(elemento => elemento[1]);
        this.state.miChart.data.datasets[0].backgroundColor = dominioAsignaturas.map( (el, i) => colores[i]);
        this.state.miChart.data.datasets[0].borderWidth = 1;
        this.state.miChart.update();
        // var colores = [
        //     'rgba(255, 99, 132, 0.2)',
        //     'rgba(54, 162, 235, 0.2)',
        //     'rgba(255, 206, 86, 0.2)',
        //     'rgba(153, 102, 255, 0.2)',
        //     'rgba(255, 159, 64, 0.2)',
        //     'rgba(0, 185, 186, 0.2)',
        //     'rgba(75, 192, 192, 0.2)',
        // ];
        // var ctx = document.getElementById('pie-chart').getContext('2d');
        // // var borrar =  new Chart(ctx).destroy();
        // var myChart = new Chart(ctx, {
        //     type: 'pie',
        //     data: {
        //         labels: dominioAsignaturas.map(elemento => elemento[0]),
        //         datasets: {
        //             data: dominioAsignaturas.map(elemento => elemento[1]),
        //             backgroundColor: dominioAsignaturas.map( (el, i) => colores[i]),
        //             borderWidth: 1
        //         }
        //     },
        //     options:
        //     {
        //         title: {
        //             display: true,
        //             text: "% de Asignaturas por Dominio"
        //         },
        //         plugins: {
        //             datalabels: {
        //                 formatter: function(value, context) {
        //                     let sum = 0;
        //                     let dataArr = context.chart.data.datasets[0].data;
        //                     dataArr.map(data => {
        //                         sum += data;
        //                     });
        //                     let percentage = (value*100 / sum).toFixed(2)+"%";
        //                     return percentage;
        //                 }
        //             }
        //         }
        //     }
        // })
    }

    render() {
        const countAmasS = this.props.asignaturas.reduce((previous, current) => {
            return Number(previous) + 
            (current.asignatura_metodologias.some(asignatura_metodologia => asignatura_metodologia.metodologia_id == 8) ? 1 : 0);
        }, 0);
        const asignaturasAmasS = this.props.asignaturas.filter(asignatura =>  
            asignatura.asignatura_metodologias.some(asignatura_metodologia => asignatura_metodologia.metodologia_id == 8));
        const dominioAsignaturas = this.props.dominios.map( el => [ el.nombre, el.competencias.reduce((previous, current) => {
            return previous + current.nivel_competencias.reduce((previous2, current2) => {
            return previous2 + current2.nivel_competencia_asignaturas.length;
        }, 0);
        }, 0)]);
        return (
            <div className="container py-4">
                <div className="col-12">
                    <legend>Indicadores del Plan de Estudios</legend>
                    {
                        this.state.initPie == 0 ?
                        <button className="btn btn-primary btn-lg" onClick={() => this.initGraficos()}>Generar Gráficos <i className="fa fa-chart-pie"></i></button> 
                        :
                        <button className="btn btn-primary btn-lg" onClick={() => this.updateGraficos(dominioAsignaturas)}>Actualizar Gráficos <i className="fa fa-chart-pie"></i></button> 
                    }
                    <div className="row">
                        <div className="col-md-4">
                            <div className="widget widget-stats bg-blue">
                                <div className="stats-icon"><i className="fa fa-pencil-alt"></i></div>
                                <div className="stats-info">
                                    <h4>En Proceso</h4>
                                    <p>{this.state.indicadores ? this.state.indicadores.EnProceso : 0}</p>	
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="widget widget-stats bg-orange">
                                <div className="stats-icon"><i className="fa fa-search"></i></div>
                                <div className="stats-info">
                                    <h4>En Revisión</h4>
                                    <p>{this.state.indicadores ? this.state.indicadores.EnRevision : 0}</p>	
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="widget widget-stats bg-green">
                                <div className="stats-icon"><i className="fa fa-check"></i></div>
                                <div className="stats-info">
                                    <h4>Finalizados</h4>
                                    <p>{this.state.indicadores ? this.state.indicadores.Finalizados : 0}</p>	
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p>Las siguientes Asignaturas utilizan la metodología <b>Aprendizaje y Servicio</b>:</p>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Nombre de la Asignatura</th>
                                            <th>Semestre</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        asignaturasAmasS.map( (asignatura, i) => 
                                            <tr key={i}>
                                                <td>{asignatura.nombre}</td>
                                                <td>{asignatura.nivel.nombre}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody> 
                                </table>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p>En el siguiente gráfico se considera que una asignatura puede pertenecer a 1 o mas dominios:</p>
                            <canvas id="pie-chart"></canvas>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}
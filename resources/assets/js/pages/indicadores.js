import React, { Component } from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            indicadores: []
        }

    }


    componentWillMount() {
        this.getIndicadores();
    }


    getIndicadores() {
        fetch('/api/indicadores')
            .then(response => response.json())
            .then(data => this.setState({ indicadores: data }))
            .catch(err => {
                if (err.name === 'AbortError') return
                throw error
            });
        //console.log(response.data)       
    }
    
    grafico(competencias)
    {
        console.log(competencias)
        var ctx = document.getElementById('pie-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: competencias.map(elemento => elemento.sigla + ": " + elemento.descripcion),
                datasets: 
                [{
                    data: competencias.map(elemento => Number(elemento.total)),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 185, 186, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderWidth: 1
                }]
                ,
                
            },
            options:
            {
                title: {
                    display: true,
                    text: "% de Competencias Genericas Utilizadas"
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
        });
    }

    render() {
        return (
            <div className='container py-4'>
                <ol className="breadcrumb pull-right">
                    <li className="breadcrumb-item active">Inicio</li>
                </ol>
                <h1 className="page-header">Indicadores Generales</h1>
                <div className="panel-body bg-white">
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
                    {
                        console.log(this.state.indicadores),
                        this.state.indicadores.sinGenericas && this.state.indicadores.sinGenericas.length > 0 &&
                        <div className="text-white bg-red m-b-20 p-4">
                            <div className="text-center f-s-20">
                                <i className="fa fa-times"></i>
                                <p>ALERTA</p>
                            </div>
                            <div className="container-fluid">
                                <p>Los siguientes Planes de Estudios no incluyen competencias genéricas:</p>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-white">#</th>
                                                <th className="text-white">Id</th>
                                                <th className="text-white">Nombre del Plan</th>
                                                <th className="text-white">Asesor Uic</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.indicadores.sinGenericas.map( (plan, i) => 
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{plan.id}</td>
                                                    <td>{plan.nombre}</td>
                                                    <td>{plan.asesor}</td>
                                                </tr>
                                            )
                                        }
                                        </tbody> 
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                    <div class="border p-4 m-b-20">                                    
                        <canvas id="pie-chart"></canvas>
                        {
                            this.state.indicadores &&
                            document.getElementById('pie-chart') &&
                            this.grafico(this.state.indicadores.UsoCompetencias)
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div class="widget widget-stats bg-gradient-blue">
                                <div class="stats-icon stats-icon-lg"><i class="fa fa-globe fa-fw"></i></div>
                                <div class="stats-content">
                                    <div class="stats-title">Competencia Más Usada</div>
                                    <div class="stats-number">{this.state.indicadores.CompetenciaMasUsada ? this.state.indicadores.CompetenciaMasUsada.total : 0}</div>
                                    <div class="stats-desc">{this.state.indicadores.CompetenciaMasUsada ? this.state.indicadores.CompetenciaMasUsada.descripcion : ""}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="widget widget-stats bg-gradient-orange">
                                <div class="stats-icon stats-icon-lg"><i class="fa fa-globe fa-fw"></i></div>
                                <div class="stats-content">
                                    <div class="stats-title">Metodología Más Usada</div>
                                    <div class="stats-number">{this.state.indicadores.MetodologiaMasUsada ? this.state.indicadores.MetodologiaMasUsada.total : 0}</div>
                                    <div class="stats-desc">{this.state.indicadores.MetodologiaMasUsada ? this.state.indicadores.MetodologiaMasUsada.nombre : ""}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="widget widget-stats bg-gradient-green">
                                <div class="stats-icon stats-icon-lg"><i class="fa fa-globe fa-fw"></i></div>
                                <div class="stats-content">
                                    <div class="stats-title">Evaluación Más Usada</div>
                                    <div class="stats-number">{this.state.indicadores.EvaluacionMasUsada ? this.state.indicadores.EvaluacionMasUsada.total : 0}</div>
                                    <div class="stats-desc">{this.state.indicadores.EvaluacionMasUsada ? this.state.indicadores.EvaluacionMasUsada.nombre : ""}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;
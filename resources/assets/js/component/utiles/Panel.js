import React from 'react'
export default function Panel(props) {
    const border = props.border ? 'border' : ''
    const collapse = props.collapse ? 'collapse' : ''
    return(
        <div className={`panel panel-primary ${border}`}>
            <div className="panel-heading">
                <div className="panel-heading-btn">
                    <a href="javascript:;" className="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i className="fa fa-expand"></i></a>
                    <a href="javascript:;" className="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i className="fa fa-minus"></i></a>
                </div>
                <h4 className="panel-title">{props.titulo}</h4>
            </div>
            <div className={`panel-body ${collapse}`}>
                {props.children}
            </div>
        </div>
    )
}
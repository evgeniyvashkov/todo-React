import React, {Component} from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component{

    constructor() {
        super();

        this.buttons = [
            {name : 'all', label : 'all'},
            {name : 'active', label : 'active'},
            {name : 'done', label : 'done'}
        ]
    }

    render () {
        const {filter, onFilterChange } = this.props;
        const buttons = this.buttons.map((el) => {
        const isAtive = (el.name=== filter) ? 'btn-info' : 'btn-outline-secondary';     
            return (
                <button type = "button"    
                    className = {`btn ${isAtive}`}
                    key = {el.name}
                    onClick = {()=>onFilterChange(el.name)}>
                    {el.label}
                </button>
            )
        })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    };
};

// <button type="button" className="btn btn-info">All</button>
//                 <button type="button" 
//                         onClick = {()=>this.props.searchItem()}
//                         className="btn btn-outline-secondary">Done</button>
//                 <button type="button" 
//                         onClick = {()=>this.props.searchItem('important','true')}
//                         className="btn btn-outline-secondary">Active</button>
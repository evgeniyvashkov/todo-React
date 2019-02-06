import React, { Component } from 'react'

import './item-add-form.css'

export default class ItemAddForm extends Component {

    constructor () {
        super();

        this.state = {
            label : ''
        }

        this.onLabelChange = (e)=> {
            this.setState ({
                label : e.target.value
            })
        }

        this.onSubmit = (e)=> {
            e.preventDefault();
            this.props.onAdd(this.state.label);
            this.setState({
                label: ''
            })
        }
    }

    render() {
        const {todos} = this.props;

        return (
            <form className="item-add-form d-flex"
                  onSubmit = {this.onSubmit}>
                <input type="text" 
                        className = "form-control"
                        onChange = { this.onLabelChange }
                        placeholder = "wat needs to be done"
                        value = {this.state.label}
                        />
                <button
                    className="btn btn-outline-secondary">
                    Add item
                </button>
            </form>
        )
    }
}
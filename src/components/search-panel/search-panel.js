import React, { Component } from 'react';
import  './search-panel.css';

export default class SearchPanel extends Component {
    constructor() {
        super();

        this.state = {
            term : ''
        }

        this.changeLabel = (e) => {
            const newLabel = e.target.value;

            this.setState({
                term : newLabel
            });

            this.props.onSearchCheange(newLabel)
        }
    }

    render() {
        return (
            <input
                type="text"
                className="form-control search-input"
                value = { this.state.tarm }
                onChange = { this.changeLabel }
                placeholder="type to search"/>
        )
    }
} 

// const SearchPanel = () => {
//     return (
//         <input
//             type="text"
//             className="form-control search-input"
//             placeholder="type to search" />
//     );
// };

// export default SearchPanel;
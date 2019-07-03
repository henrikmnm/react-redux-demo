import React from 'react';
import { REQ } from '../utils/requestStatus';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProducts: [],
            availableProducts: {
                products: [],
                status: REQ.INIT
            }
        };
    }

    render() {
        return(
            
        )
    }

}
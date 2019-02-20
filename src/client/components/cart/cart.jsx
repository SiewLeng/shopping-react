import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';
import main_styles from '../../style.scss';

class Cart extends React.Component {
    constructor() {
        super();
    }

    render() {
        let itemElements = this.props.cartItem.map((item, index) => {
            return (
                <div key={index}>
                    <img src={item.mediumImage}/>
                    <h4 > {item.name} </h4>
                    <h4> USD {item.salePrice} </h4>
                </div>
            )
        })

        return (
            <div>
                {itemElements}
            </div>
        );
    }
}

export default Cart;
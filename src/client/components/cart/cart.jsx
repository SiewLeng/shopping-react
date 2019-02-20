import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';
import main_styles from '../../style.scss';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
        cartItem: []
    };
  }

  render() {
    return (
      <div>
          <h3> this.props.product["name"]</h3>
      </div>
    );
  }
}

export default Product;
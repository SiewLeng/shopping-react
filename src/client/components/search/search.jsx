import React from 'react';

import styles from './style.scss';

import Cart from '../../components/cart/cart';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchItem: '',
      itemList: [],
      product: [],
      cartItem: [],
    };

    this.changeHandler = this.changeHandler.bind( this );
    this.submitSearch = this.submitSearch.bind(this);
    this.showProduct = this.showProduct.bind(this);
  }

    changeHandler(event){
        this.setState({searchItem:event.target.value});
    }

    submitSearch() {
        var reactThis = this;
        let url = "/query/" + this.state.searchItem;

        const reqListener = function () {
            console.log("url " + url );
            console.log("responseText" + this.responseText);

            //transform the response to real js objects

            const result = JSON.parse( this.responseText).items;
            // here, we can't do this.setState

            //refer to react state instead
            reactThis.setState({itemList: result});
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url);
        oReq.send();
    }

    showProduct(index) {
        let tempProduct =  Object.assign({}, this.state.itemList[index]);
        this.setState({product: [tempProduct]});
    }

    addToCart(item) {
        let tempProduct =  Object.assign({}, item);
        let tempCartList = [tempProduct,...this.state.cartItem];
        this.setState({cartItem : tempCartList});
    }

  render() {
    let itemsElements = [];
    let eachProduct = [];

    if (this.state.itemList.length > 0) {
        itemsElements = this.state.itemList.map((item, index) => {
            return (
                <button
                    key={index}
                    onClick={()=>{
                        this.showProduct(index);
                    }}
                    >
                        {item.name}
                </button>
            );
        })
    }

    if (this.state.product.length > 0) {
        eachProduct = this.state.product.map((item, index) => {
            return (
                <div key= {index}>
                    <img src={item.mediumImage}/>
                    <h4 > {item.name} </h4>
                    <h4> USD {item.salePrice} </h4>
                    <h4> {item.shortDescription} </h4>
                    <button
                        key={index}
                        onClick={()=>{
                            this.addToCart(item);
                        }}
                    >
                        add to cart
                    </button>
                </div>
            )
        });
    }

    return (
      <div>
        <div>
            <input onChange={this.changeHandler}/>
            <button onClick={this.submitSearch}>submit</button>
        </div> <br/>
        <div>
            {itemsElements}
        </div>
        <h2> Product </h2>
        <div>
            {eachProduct}
        </div>
         <h2> Cart Items </h2>
        <Cart cartItem={this.state.cartItem} />
      </div>
    );
  }
}

export default Search;
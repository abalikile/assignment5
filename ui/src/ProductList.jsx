import React from 'react';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class ProductList extends React.Component {
  constructor() {
    super();
    // assigning an empty array to the products state variable.
    this.state = { products: [] };
    /* bind() method helps in passing eventhandlers and
other functions as props to the child component. */
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
  // constructing a GraphQL query
    const query = `query{
      productList{
        id productname price 
        category image

      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  // method to add a new product
  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { product });
    if (data) {
      this.loadData();
    }
  }


  async deleteProduct(index) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    const { products } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.productDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products } = this.state;
    return (
      <>
        <h1>My Company Inventory</h1>
        <p>Showing all available products</p>
        <hr />
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <p>Add a new product to inventory</p>
        <hr />

        <ProductAdd createProduct={this.createProduct} />
        {/* passing createProduct() method itself as a part of props. */}
      </>
    );
  }
}

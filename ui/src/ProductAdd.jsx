import React from 'react';
import PropTypes from 'prop-types';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    // pre-populating the $ symbol
    this.state = { value: '$' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // To read the price value using onChange.
  handleChange(e) {
    this.setState({ value: e.target.reset });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;

    const product = {
      productname: form.productname.value,
      price: form.price.value,
      category: form.category.value,
      image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.productname.value = ''; form.price.value = '$'; form.category.value = 'Shirts'; form.image.value = '';
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <div>
          <div className="fleft">
            <label htmlFor="category">
              Category
              <br />
              <select name="category" id="category">
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </select>
            </label>
          </div>

          <div className="fleft">
            <label htmlFor="price">
              Price Per Unit
              <br />
              <input name="price" id="price" type="text" onChange={this.handleChange} value={this.state.value} />
            </label>
          </div>

          <div className="fleft">
            <label htmlFor="productname">
              ProductName
              <br />
              <input type="text" name="productname" />
            </label>
          </div>

          <div className="fleft">
            <label htmlFor="image">
              Image Url
              <br />
              <input type="url" name="image" />
            </label>
          </div>


          <div>
            <button type="submit" className="color3">Add Product</button>
          </div>
        </div>
      </form>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};

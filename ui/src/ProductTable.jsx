import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({
  product, deleteProduct, index,
}) => (
  <tr>
    <td>{product.productname}</td>
    <td>
      $
      {product.price}
    </td>
    <td>{product.category}</td>
    <td><Link to={`/view/${product.id}`}>View</Link></td>
    <td>
      <Link to={`/edit/${product.id}`}>Edit</Link>
      {' '}
&nbsp;
      <button type="button" onClick={() => { deleteProduct(index); }}>Delete</button>
    </td>
  </tr>
));

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    // id is taken as key value which uniquely identifies a row.
    <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th className="color1">Product Name</th>
          <th className="color2">Price</th>
          <th className="color1">Category</th>
          <th className="color2">Image</th>
          <th className="color1">Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}

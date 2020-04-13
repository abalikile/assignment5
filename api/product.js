const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  return products;
}

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}

function validate(product) {
  const errors = [];
  if (product.productname.length < 1) {
    errors.push('Field "productname" is mandatory.');
  }
  if (product.price) {
    // 'Field "Price" cannot have alphabets. only two digits allowed after decimal places.'

    const regex = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
    if (!regex.test(product.price)) {
      errors.push('Field "Price" invalid.');
    }
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { product }) {
  const db = getDb();
  validate(product);
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');


  const result = await db.collection('products').insertOne(newProduct);
  const savedProduct = await db.collection('products')
    .findOne({ _id: result.insertedId });
  return savedProduct;
}
// validating the products based on the new inputs
async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.category || changes.productname || changes.price || changes.image) {
    const product = await db.collection('products').findOne({ id });
    Object.assign(product, changes);
    validate(product);
  }
  // once validation succeeds, updateOne() function with $set operation is used to save the changes.
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('products').findOne({ id });
  return savedIssue;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  product.deleted = new Date();

  let result = await db.collection('deleted_products').insertOne(product);
  if (result.insertedId) {
    result = await db.collection('products').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}


module.exports = {
  list,
  add,
  get,
  update,
  delete: remove,
};

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLPrice = new GraphQLScalarType({
  name: 'GraphQLPrice',
  description: 'A Price type in GraphQL as a scalar',
  // serialize() will convert price value to string
  serialize(value) {
    return value.toString();
  },

  parseValue(value) {
    const first = value.replace(/[$]/g, '');
    return first;
  },

  parseLiteral(ast) {
    const temp = ast.value;
    if (ast.kind === Kind.Float) {
      const first = temp.replace(/[$]/g, '');
      return first;
    }
    return temp;
  },
});
module.exports = GraphQLPrice;

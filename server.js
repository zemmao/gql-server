const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		message: String
	}
`);

const root = {
	message: () => 'Hello World!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
}));

const PORT = 4000;
app.listen(
	PORT, () => console.log(`Express GraphQL Server running on port ${PORT}`));
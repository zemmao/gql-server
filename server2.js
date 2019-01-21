const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		course(id: Int!) :Course,
		courses(topic: String): [Course]
	},
	type Mutation {
		updateCourseTopic(id: Int!, topic: String!): Course
	},
	type Course {
		id: Int,
		title: String,
		author: String,
		description: String,
		topic: String,
		url: String
	}
`);

const coursesData = [
	{
		id: 1,
		title: 'The Complete Node.js Developer Course',
		author: 'Andrew Mead, Rob Percival',
		description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs/'
}, {
		id: 2,
		title: 'Node.js, Express & MongoDB Dev to Deployment',
		author: 'Brad Traversy',
		description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
		topic: 'Node.js',
		url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
}, {
			id: 3,
			title: 'JavaScript: Understanding The Weird Parts',
			author: 'Anthony Alicea',
			description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
			topic: 'JavaScript',
			url: 'https://codingthesmartway.com/courses/understand-javascript/'
	}
];

const getCourse = function (args) {
	return coursesData.filter(course => course.id = args.id)[0];
};

const getCourses = function (args) {
	if (args.topic) {
		return coursesData.filter(course => course.topic === args.topic);
	} else {
		return coursesData;
	}
};

const updateCourseTopic = function({ id, topic }) {
	coursesData.map(course => {
		if (course.id === id) {
			course.topic = topic;
			return course;
		}
	});
	return coursesData.filter(course => course.id === id)[0];
};

const root = {
	course: getCourse,
	courses: getCourses,
	updateCourseTopic
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
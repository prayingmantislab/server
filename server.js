const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

let appSchema = buildSchema(`
type Query 
{
  allCourses: [Course],
  course(id: Int!): Course
},
type Mutation
{
  addCourse(id: Int title: String, description: String, topic: String): Course,
  updateCourse(id: Int, title: String, description: String, topic: String): Course
  removeCourse(id: Int): Course
  removeTitleFromCourse(id: Int): Course

}    

type Course
     {
        id: Int,
        title: String,
        description: String,
        topic: String,
     }
     `);


function getAllCourses() 
{
    return coursesData
}
function addCourse(args) 

{
  let obj = { id: args.id, title: args.title, description: args.description, topic: args.topic } 
    coursesData.push(obj)
    return obj 
}



function getCourse(args) 
{
  let id = args.id;
  return coursesData.find(x => x.id == id)
}

let rootFunctions = {
    allCourses: getAllCourses,
    oneCourse: getCourse,
    addCourse: addCourse
}

let app = express();
app.use('/graphql', express_graphql.graphqlHTTP({
    schema: appSchema,
    rootValue: rootFunctions,
    graphiql: true
}));
app.listen(4000);



let coursesData = [
  {
    id: 1,
    title: 'Angular',
    description: 'description1',
    topic: 'frontend',
  },
  {
    id: 2,
    title: '.NET',  
    description: 'description2',
    topic: 'backend',
  },
  { 
    id: 3,
    title: 'React',
    description: 'description3',
    topic: 'frontend',
  }
];


const _ = require('lodash')
const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql

let books = [
  {id: '1', name: 'Harry Potter - The Socerers Stone', genre: 'Fantasy', authorId: '2'},
  {id: '2', name: 'Harry Potter - The Chamber of Secret', genre: 'Fantasy', authorId: '2'},
  {id: '3', name: 'Harry Potter - The Prisoner of Azkaban', genre: 'Fantasy', authorId: '2'},
  {id: '4', name: 'The perks of being a wall-flower', genre: 'Drama', authorId: '1'}
]

const authors = [
  {id: '1', name: 'Stephen Chbosky', age: 48},
  {id: '2', name: 'Joanne Rowling', age: 52}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId === parent.id)                
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootqueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),      
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),      
      resolve(parent, args) {
        return authors
      }
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        //code to get books from db/other source
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID}},
      resolve(parent, args) {
        //code to get authors from db/other source
        return _.find(authors, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
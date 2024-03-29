import {ApolloServer, AuthenticationError, gql, UserInputError } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import express from 'express'
import http from 'http'
import { PubSub } from 'graphql-subscriptions'
import './db.js'
import Person from './models/person.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'Palabra_secreta_para_generar_tokens_seguros'

const pubsub = new PubSub()

const SUBSCRIPTION_EVENTS = {
    PERSON_ADDED: 'PERSON_ADDED'
}

const typeDefinitions = gql`
    enum YesNo {
        YES
        NO
    }

    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        check: String!
        id: ID!
    }

    type User {
        username: String!
        friends: [Person]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person
        me: User
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
        editPhoneNumber(
            name: String!
            phone: String!
        ): Person
        createUser(
            username: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        addAsFriend(
            name: String!
        ): User
    }

    type Subscription {
        personAdded: Person!
    }
`

const resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if(!args.phone) return Person.find({})
            return Person.find({ phone: { $exists: args.phone === 'YES' } })
        },
        findPerson: async (root, args) => {
            const { name } = args
            return Person.findOne({ name })
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const { currentUser } = context
            if (!currentUser) throw new AuthenticationError('Not authenticated')

            const person = new Person({ ...args })
            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            pubsub.publish(SUBSCRIPTION_EVENTS.PERSON_ADDED, { personAdded: person })
            return person
        },
        editPhoneNumber: async (root, args) => {
            const person = await Person.findOne({ name: args.name })
            
            if(!person) return

            person.phone = args.phone
            
            try {
                await person.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return person
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username
            })

            return user.save().catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            
            //Login hecho de forma rapida y no recomendada por propositos educativos
            
            if(!user || args.password !== 'midupassword') {
                throw new UserInputError('Wrong credentials', {
                    invalidArgs: args
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return {
                value: jwt.sign(userForToken, JWT_SECRET)
            }
        },
        addAsFriend: async (root, args, {currentUser}) => {
            if (!currentUser) throw new AuthenticationError('Not authenticated')

            const person = await Person.findOne({name: args.name})

            const friendlyAlready = person => {
                return currentUser.friends.some(p => p._id.equals(person._id))
            }

            if (!friendlyAlready(person)) {
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            }

            return currentUser
        }
    },
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    },
    Subscription: {
        personAdded: {
            subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_EVENTS.PERSON_ADDED])
        }
    }
}

const start = async (typeDefs, resolvers) => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe
    },
    {
        server: httpServer,
        path: '/'
    })

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const token = auth.substring(7)
                const {id} = jwt.verify(token, JWT_SECRET)
                const currentUser = await User.findById(id).populate('friends')
                return { currentUser }
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        }
                    }
                }
            }
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: '/',
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

start(typeDefinitions, resolvers)
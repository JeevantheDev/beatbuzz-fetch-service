require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');

const db = require('./model');
const server = require('./server');

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const apolloServer = server();

const startServer = async () => {
  db.sequelize.sync({ force: false }).then(() => {
    console.log('DB has been re sync');
  });

  const PORT = 7996;

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: PORT },
    context: ({ req }) => {
      const user = jwt.verify(req.headers.authorization, process.env.secretKey);

      if (!user)
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      return req.headers;
    },
  });

  console.log(`Song service is running on url ${url} `);
};

startServer();

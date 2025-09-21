// libraries
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('src/server/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

server.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

server.use(router);
server.listen(port);

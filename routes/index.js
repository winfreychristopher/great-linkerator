const apiRouter = require('express').Router();

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const linksRouter = require('./links');
apiRouter.use('/links', linksRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

module.exports = apiRouter;
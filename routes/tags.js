const express = require("express");
const { getLinksByTagName } = require("../db");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/:tagName/links", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const links = await getLinksByTagName(tagName);
    console.log(links, "THIS IS TAG LINKS");
    res.send(links);
  } catch (error) {
    next(error);
  }
});

module.exports = tagsRouter;

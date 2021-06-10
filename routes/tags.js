const express = require('express');
const { getLinksByTagName } = require('../db');
const tagsRouter = express.Router();

tagsRouter.get("/:tagName/links", async (req, res, next) => {
    const { tagName } = req.params
    try {
        const links = await getLinksByTagName(tagName)
        res.send(links)
    } catch(error) {
        throw error
    }
})
module.exports = tagsRouter
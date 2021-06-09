const express = require("express");
const { getAllLinks, createLinks } = require("../db");
const linksRouter = express.Router();


linksRouter.get("/", async (req, res, next) => {
    try {
        const links = await getAllLinks()
        res.send(links)
    } catch(error) {
        throw error
    }
})

linksRouter.post("/", async (req, res, next) => {
    const {url, comment, date_shared, tags = ""} = req.body
    linkData = {}
    try {
        linkData.url = url
        linkData.comment = comment
        linkData.date_shared = date_shared
        linkData.tags = tags

        const links = await createLinks(linkData)
        res.send(links)
    } catch(error) {
        throw error
    }
})

//update links


//update clicks
// need to target the id of the link to update the clicks



module.exports = linksRouter
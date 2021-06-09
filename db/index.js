// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/linkerator-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

//links

async function createLinks({url, comment, date_shared}) {
  try {
    const { rows: [links] } = await client.query(`
      INSERT INTO link(url, comment, date_shared)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [url, comment, date_shared]);
    return links;
  } catch (error) {
    throw error; 
  }
}

async function getLinksById(id) {
  try {
    const { rows: [links] } = await client.query(`
      SELECT *
      FROM link
      WHERE id=${id}
    `)
    return links;
  } catch (error) {
    throw error;
  }
}

//getAll

async function getAllLinks() {
  try {
    const { rows: [links] } = await client.query(`
      SELECT *
      
    `)
  } catch(error) {
    throw error
  }
}


//url

async function getLinksByUrl() {
  try {
    const { rows:[links] } = await client.query(`

    `)
  } catch(error) {
    throw error
  }
}
//tags

async function getLinksByTags() {
  try {
     
  } catch(error) {
    throw error
  }
}

//clickcount

async function getLinksByClickCount() {
  try {

  } catch(error) {
    throw error
  }
}





//tags


async function createTags(id, name) {
  try {
    const { rows: [tags] } = await client.query(`
      INSERT INTO tags(id, name)
      VALUES ($1, $2)
      RETURNING *
      `, [id, name]);
    return tags;
  } catch (error) {
    throw error; 
  }
}


async function gettagsById(id) {
  try {
    const { rows: [tags] } = await client.query(`
      SELECT *
      FROM tags
      WHERE id=${id}
    `)
    return tags;
  } catch (error) {
    throw error;
  }
}


//links_Tags

async function createLinkTags(linkId, tagId) {
  try {
    const { rows: {linkTags} } = await client.query(`
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      RETURNING *
      `, [linkId, tagId]);
    return linkTags;
  } catch (error) {
    throw error; 
  }
}



// export
module.exports = {
  client,
  createLinks,
  createTags,
  createLinkTags,
  getLinksById,
  gettagsById,
  
  // db methods
}
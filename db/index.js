// Connect to DB
const { Client } = require("pg");
const DB_NAME = "localhost:5432/linkerator-dev";
const DB_URL = process.env.DATABASE_URL || `postgres://${DB_NAME}`;
const client = new Client(DB_URL);

// database methods
//links
async function createLinks({
  url,
  comment,
  date_shared,
  click_count,
  tags = [],
}) {
  try {
    
    const {
      rows: [links],
    } = await client.query(
      `
      INSERT INTO links(url, comment, date_shared, click_count)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [url, comment, date_shared, click_count]
    );
    const tagsList = await createTags(tags);
    return await addTagsToLinks(links.id, tagsList);
  } catch (error) {
    throw error;
  }
}

const updateLinks = async ({ id, url, comment = [] }) => {

  try {
      const {rows: links} = await client.query(`
          UPDATE links
          SET url = $2, comment = $3
          WHERE id = $1
          RETURNING *
      `, [id, url, comment]);
      return links;
  } catch (error) {
      throw error;
  }
}

async function getLinksById(linkId) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      SELECT *
      FROM links
      WHERE id=$1;
    `,
      [linkId]
    );
    if (!link) {
      throw {
        name: "ListNotFoundError",
        message: "Could not find a link with that linkId",
      };
    }
    const { rows: tags } = await client.query(
      `
      SELECT tags.*
      FROM tags
      JOIN link_tags ON tags.id=link_tags."tagsId"
      WHERE link_tags."linkId"=$1;
    `,
      [linkId]
    );
    link.tags = tags;
    return link;
  } catch (error) {
    throw error;
  }
}

async function getLinksByUrl(url) {
  try {
    const {
      rows: links,
    } = await client.query(`
    SELECT *
    FROM links
    WHERE url LIKE $1
    `, [`%${url}%`]);
    return links;
  } catch (error) {
    throw error;
  }
}

//tags
async function getLinksByTagName(tagName) {
  try {
    const { rows: links } = await client.query(
      `
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagsId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );

    return await Promise.all(links.map((link) => getLinksById(link.id)));
  } catch (error) {
    throw error;
  }
}

//clickcount
const updateClickCount = async (linkId) => {
  try {
    const { rows } = await client.query(
      `
      UPDATE links
      SET click_count = click_count + 1
      WHERE id = $1;
    `,
      [linkId]
    );
   
  } catch (error) {
    throw error;
  }
};

//tags
async function createTags(tagsList) {
  if (tagsList.length === 0) {
    return;
  }
  console.log(tagsList, "CREATE TAGS");
  const insertValues = tagsList.map((_, index) => `$${index + 1}`).join("), (");
  const selectValues = tagsList.map((_, index) => `$${index + 1}`).join(", ");
  try {
    await client.query(
      `INSERT INTO tags(name)
      VALUES (${insertValues})
      ON CONFLICT (name) DO NOTHING;`,
      tagsList
    );
    const { rows } = await client.query(
      `SELECT * FROM tags
      WHERE name
      IN (${selectValues});`,
      tagsList
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

//links_Tags
async function createLinkTags(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO link_tags("linkId", "tagsId")
      VALUES ($1, $2)
      RETURNING *
      `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToLinks(linkId, tagList = []) {
  try {
    const createLinkTagPromises = tagList.map((tag) =>
      createLinkTags(linkId, tag.id)
    );
    await Promise.all(createLinkTagPromises);
    return await getLinksById(linkId);
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  try {
    const { rows: links } = await client.query(`
      SELECT id
      FROM links
    `);

    const allLinks = await Promise.all(
      links.map((link) => getLinksById(link.id))
    );
    return allLinks;
  } catch (error) {
    throw error;
  }
}

//tags

async function getTagsById(id) {
  try {
    const {
      rows: [tags],
    } = await client.query(`
      SELECT *
      FROM tags
      WHERE id=${id}
    `);
    return tags;
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
  getTagsById,
  updateClickCount,
  getLinksByUrl,
  getLinksByTagName,
  getAllLinks,
  updateLinks
  // db methods
};

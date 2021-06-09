// code to build and initialize DB goes here
const {
  client,
  createLinks,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE links(
        id SERIAL PRIMARY KEY,
        url VARCHAR(255) UNIQUE NOT NULL,
        click_count INTEGER,
        date_shared VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL
      );
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL
      );
      CREATE TABLE link_tags(
        id SERIAL PRIMARY KEY,
        "linkId" INTEGER REFERENCES links(id),
        "tagsId" INTEGER REFERENCES tags(id),
        UNIQUE("linkId", "tagsId")
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting To Populate Data...");
  try {
    // create useful starting data
    const linksToCreate = [
      {
        url: "https://www.google.com/",
        click_count: 1000000,
        comment: "This website is pretty popular...",
        date_shared: "June 8, 2021",
        tags: ["google", "search"],
      },
      {
        url: "https://www.ign.com/",
        click_count: 50000,
        comment: "Can't spell ignorance without IGN",
        date_shared: "June 8, 2021",
        tags: ["gaming-news", "gaming-journalism"],
      },
    ];
    const links = await Promise.all(linksToCreate.map(createLinks));
    console.log("Links created:");
    console.log(links);
    console.log("Finished Populating Data!");
  } catch (error) {
    console.error("Error Creating Data!");
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
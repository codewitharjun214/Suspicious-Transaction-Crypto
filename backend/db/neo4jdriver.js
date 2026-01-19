import neo4j, { driver } from 'neo4j-driver'
// import dotenv from 'dotenv'

// dotenv.config({
//   path: 'Neo4j-2bdd9fa8-Created-2024-12-02.txt',
//   debug: true,
//   encoding: 'utf8',
// })

const URI = process.env.NEO4J_URI || "neo4j+s://72e5d724.databases.neo4j.io";
const USER = process.env.NEO4J_USER || "neo4j";
const PASSWORD = process.env.NEO4J_PASSWORD || "";
export const calldB = (async () => {
   
    let driver
    console.log("Connecting to db");
  
    try {
      if (!PASSWORD) {
        console.warn('NEO4J_PASSWORD is not set. Please set NEO4J_URI, NEO4J_USER and NEO4J_PASSWORD in environment for production deployments.');
      }
      driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
      console.log(await driver.verifyAuthentication())
      const serverInfo = await driver.getServerInfo()
      console.log('Connection established')
      console.log(serverInfo)
    } catch(err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`)
      await driver.close()
      return
    }

    await driver.close()
  })();

  export const getDriver = () => {
    let driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    return driver
  }

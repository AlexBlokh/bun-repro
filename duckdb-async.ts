import { Database } from "duckdb-async";

const query =
  Bun.argv[2] || "select * from sample_data.hn.hacker_news limit 10;";
const db = await Database.create(`md:?motherduck_token=${process.env.TOKEN}`);

console.log(query);
await db.all(query);
await db.all(query); // crashes on second

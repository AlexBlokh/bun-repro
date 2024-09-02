// import duckdb from "duckdb"; doesn't bundle properly
import duckdb from "./duckdb";
import util from "util";

const query =
  Bun.argv[2] || "select * from sample_data.hn.hacker_news limit 10;";
const db = new duckdb.Database(`md:?motherduck_token=${process.env.TOKEN}`);

console.log(query);
// works
// db.prepare(query).all((err, res) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("success:1");
//   }
// });


// segfault
const promisified = (query: string): Promise<any[]> => {
  return new Promise((resolve, rej) => {
    db.prepare(query).all((err, res) => {
      if (err) {
        console.error(err);
        rej(err);
      }
      resolve(res);
    });
  });
};

await promisified(query);


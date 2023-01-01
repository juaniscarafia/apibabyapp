const { Pool } = require("better-sqlite-pool");
const error = require("../utils/error");

// Conexiones
let pool;

function handleConPool() {
  // Create a new pool:
  pool = new Pool("./database/babyappDB.db");

  // use Promise:
  pool.acquire()
    .then(() => {
      console.log("Conectado a SQLITE base: babyappDB");
    })
    .catch((err) => {
      console.error("[db error]", err);
      setTimeout(handleConPool, 2000);
    });
}

handleConPool();

function listMeasureMilks() {
  //.get() --> One Row
  //.all() --> All Rows
  return new Promise((resolve,reject) => {
    pool.acquire()
      .then(db => {
        let res = db.prepare(`SELECT json_object('Date', Date,
        'Measures', json_group_array(json_object('Time', Time, 'Measure', Measure,'NameMilk',Name, 'DescriptionMilk', Description))
        ) AS Data
        FROM MeasureMilks MM
        LEFT JOIN Milks M ON M.IdMilk = MM.IdMilk
        GROUP BY Date
        ORDER BY Date DESC
        LIMIT 5 OFFSET 0;`).all();

        db.release();
        
        let list = []

        res.forEach(data => {
          list.push(JSON.parse(Object.values(data)));
        });
        
        resolve(list);
      })
      .catch(function (err) {
        return reject(err);
      });
  });
}

module.exports = {
  listMeasureMilks
};
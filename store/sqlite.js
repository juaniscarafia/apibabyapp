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

function login(data) {
  return new Promise((resolve,reject) => {
    pool.acquire()
      .then(db => {
        let access = db.prepare(`SELECT * FROM Fathers WHERE Name = ? AND Password = ?;`).get(data.name,data.password);

        if (access === undefined) {
          db.release();
          return resolve('Acceso denegado!');
        }

        db.release();
        return resolve(access);
      })
      .catch(function (err) {
        db.release();
        return reject(err);
      });
  });
}

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
        ORDER BY Id DESC
        LIMIT 10 OFFSET 0;`).all();

        db.release();
        
        let list = []

        res.forEach(data => {
          list.push(JSON.parse(Object.values(data)));
        });
        
        return resolve(list);
      })
      .catch(function (err) {
        db.release();
        return reject(err);
      });
  });
}

function listMilks() {
  //.get() --> One Row
  //.all() --> All Rows
  return new Promise((resolve,reject) => {
    pool.acquire()
      .then(db => {
        let res = db.prepare(`SELECT IdMilk,Name FROM Milks`).all();

        db.release();
        
        return resolve(res);
      })
      .catch(function (err) {
        db.release();
        return reject(err);
      });
  });
}

function insertMeasureMilks(data) {
  return new Promise((resolve,reject) => {
    pool.acquire()
      .then(db => {
        const stmt = db.prepare(`INSERT INTO "MeasureMilks" ("Date", "Time", "Measure", "IdMilk", "IdBaby") 
        VALUES (?, ?, ?, ?, ?);`);
        const info = stmt.run(data.Date, data.Time, data.Measure, data.IdMilk, data.IdBaby);

        db.release();
        return resolve(info.changes);
      })
      .catch(function (err) {
        db.release();
        return reject(err);
      });
  });
}

function updateMeasureMilks(data) {
  return new Promise((resolve,reject) => {
    pool.acquire()
      .then(db => {
        const stmt = db.prepare(`UPDATE MeasureMilks SET Date=?,Time=?,Measure=?,IdMilk=?,IdBaby=? WHERE Id= ?;`);
        const info = stmt.run(data.Date, data.Time, data.Measure, data.IdMilk, data.IdBaby, data.Id);

        db.release();
        return resolve(info.changes);
      })
      .catch(function (err) {
        db.release();
        return reject(err);
      });
  });
}

module.exports = {
  listMeasureMilks,
  listMilks,
  insertMeasureMilks,
  updateMeasureMilks,
  login
};
const { Pool, Client } = require('pg');
const timerFn = require('timer-node');
const timer = timerFn('test-timer');


// const pool = new Pool(
//   {
//     user: 'whittledeedoodleedoo',
//     host: 'localhost',
//     database: 'whittledeedoodleedoo'
//   }
// );

// pool.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack);
//   } else {
//     console.log('connected');
//   }
// });

// pool.query('SELECT * FROM millions WHERE id=5;', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const client = new Client({
  user: 'whittledeedoodleedoo',
  host: 'localhost',
  database: 'whittledeedoodleedoo'
});

client.connect (err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to postgres');
  }
});

const getItemByPostgresId = function(inputId, callback) {
  timer.start();
  const queryString = `SELECT * FROM millions WHERE ProductId=${inputId};`;
  client.query(queryString, (err, res) => {
    if (err) {
      client.end();
      return callback (err, null);
    } else {
      timer.stop();
      console.log(`Database queried by ID ${inputId} in ${timer.seconds()} seconds`);
      console.log(`Database queried by ID ${inputId} in ${timer.milliseconds()} milliseconds`);
      client.end();
      return callback(null, (res.rows[0]));
    }
  });
};

const seedPostgresData = function(callback) {
  timer.start();
  const createTableText = 
  `DROP TABLE IF EXISTS millions;

  CREATE TABLE millions (
      ProductId SERIAL primary key,
      ItemName VARCHAR (250),
      Price NUMERIC (7, 2),
      Rating NUMERIC (7, 2),
      RatingCount SMALLINT,
      Category VARCHAR (30),
      Photo VARCHAR (250)
  );`;
  const seedDataText = 
  `COPY millions (ItemName, Price, Rating, RatingCount, Category, Photo) FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products1.csv' (FORMAT CSV, DELIMITER(','));
  COPY millions (ItemName, Price, Rating, RatingCount, Category, Photo) FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products2.csv' (FORMAT CSV, DELIMITER(','));`;

  client.query(createTableText, (err) => {
    if (err) {
      console.error('create table error', err.stack);
    } else {
      console.log("table 'millions' created");
    }
  });

  client.query(seedDataText, (err) => {
    if (err) {
      console.error('data seed error', err.stack);
    } else {
      console.log("10 million records created in 'millions' table");
      callback();
      timer.stop();
      console.log(`Postgres database seeded in ${timer.seconds()} seconds`);
      console.log(`Postgres database seeded in ${timer.milliseconds()} milliseconds`);
    }
    client.end();
  });
};

module.exports = { getItemByPostgresId, seedPostgresData };

/*
module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res)
    })
  },
  
  getClient: (callback) {
    pool.connect((err, client, done) => {
      const query = client.query.bind(client)
      // monkey patch the query method to keep track of the last query executed
      client.query = () => {
        client.lastQuery = arguments
        client.query.apply(client, arguments)
      }
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!')
        console.error(`The last executed query on this client was: ${client.lastQuery}`)
      }, 5000)
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err)
        // clear our timeout
        clearTimeout(timeout)
        // set the query method back to its old un-monkey-patched version
        client.query = query
      }
      callback(err, client, release)
    })
  }
}
*/
const { Pool, Client } = require('pg');


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
  const queryString = `SELECT * FROM millions WHERE id=${inputId};`;
  client.query(queryString, (err, res) => {
    if (err) {
      console.error('getItemById error', err.stack);
    } else {
      return callback(res.rows[0]);
    }
    client.end();
  });
};

const seedPostgresData = function(callback) {
  //const start = Date.now()
  const createTableText = 
  `DROP TABLE IF EXISTS millions;

  CREATE TABLE millions (
      id SERIAL primary key,
      item_name VARCHAR (250),
      price NUMERIC (7, 2),
      rating NUMERIC (7, 2),
      rating_count SMALLINT,
      category VARCHAR (30),
      photo_url VARCHAR (250)
  );`;
  const seedDataText = 
  `COPY millions (item_name, price, rating, rating_count, category, photo_url) FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products1.txt' (FORMAT CSV, DELIMITER(','));
  COPY millions (item_name, price, rating, rating_count, category, photo_url) FROM '/Users/whittledeedoodleedoo/hratx43/hratx43-SDC/sdc-carousel/database/products2.txt' (FORMAT CSV, DELIMITER(','));`;

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
      console.log("10 millions records created in 'millions' table");
      callback();
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
var pg = require('pg');

// const conString = "postgres://postgres@localhost:5432/new-test"
const conString = { 
    user:"postgres",
    database:"susie",
    port:5432,
    max:20,
    idleTimeoutMillis:3000,
   }
const client = new pg.Client(conString);

console.log(conString)

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
   require('./sql/base')    
});


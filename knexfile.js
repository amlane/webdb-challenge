// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
        filename: './data/database.db3' //database can be whatever you name it
    },
    useNullAsDefault: true,
    migrations: {
      directory:   './data/migrations',
    }, 
    seeds: {
      directory: './data/seeds',
    },
  },
};

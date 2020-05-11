require('dotenv').config()
const knew = require('knex');

const knexInstance = knew({
    client: 'pg',
    connection: process.env.DB_URL,
});
console.log('knex and driver installed correctly');

knexInstance
  .select('product_id', 'name', 'price', 'category')
  .from('amazong_products')
  .where({ name: 'Point of view gun' })
  .then(result => {
    console.log(result)
  })
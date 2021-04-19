const knex = require('./knex');
const users = require('./users.json');
const users_statistic = require('./users_statistic.json');

async function createTables() {
  try {
    // Create a table
    await knex.schema
      .createTable('users', table => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('gender');
        table.string('ip_address');
      })
      .createTable('users_statistic', table => {
        table.integer('user_id');
        table.string('date');
        table.integer('page_views');
        table.integer('clicks');
      })

    // Then query the table...
    await knex('users').insert(users.filter(i => {
      return i.id < 501 && { id: i.id, first_name: i.first_name, last_name: i.last_name, email: i.email, gender: i.gender, ip_address: i.ip_address }
    }))
    await knex('users').insert(users.filter(i => {
      return i.id > 500 && { id: i.id, first_name: i.first_name, last_name: i.last_name, email: i.email, gender: i.gender, ip_address: i.ip_address }
    }))

    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return index <= 499 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))

    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 499 < index && index <= 999 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 999 < index && index <= 1499 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 1499 < index && index <= 1999 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 1999 < index && index <= 2499 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 2499 < index && index <= 2999 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 2999 < index && index <= 3499 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 3499 < index && index <= 3999 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 4499 < index && index <= 4999 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))
    await knex('users_statistic').insert(users_statistic.filter(( i, index ) => {
      return 4999 < index && index <= 5499 && { user_id: i.user_id, date: i.date, page_views: i.page_views, clicks: i.clicks }
    }))

    // Finally, add a catch statement
  } catch(e) {
    console.error(e);
  }
}

module.exports = createTables;
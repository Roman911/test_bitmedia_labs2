const knex = require('./knex');

async function getAllUsers(limit, offset) {
  const users = await knex('users')
    .select('*')
    .orderBy('id', 'users')
    .innerJoin('users_statistic', 'users.id', 'users_statistic.user_id')
    .limit(limit || 100)
    .offset(offset || 0)

  const hydrated = {}

  await users.forEach(row => {
    if ( !(row.id in hydrated)) {
      hydrated[row.id] = {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        gender: row.gender,
        ip_address: row.ip_address,
        total_clicks: row.clicks,
        total_page_views: row.page_views
      }
    }
    hydrated[row.id].total_clicks += row.clicks
    hydrated[row.id].total_page_views += row.page_views
  })

  return hydrated
}

function getUser(id) {
  return knex('users_statistic')
    .whereRaw('user_id = ?', [id])
}

module.exports = {
  getAllUsers,
  getUser
}
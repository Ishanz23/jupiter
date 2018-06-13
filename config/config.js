const mongoUser = 'sayantan'
const mongoPwd = 'ishan123'
const mongoDBName = 'gql-ninja'
const mongoServer = 'ds039271.mlab.com'
const mongoPort = 39271
const mongoUri = `mongodb://${mongoUser}:${mongoPwd}@${mongoServer}:${mongoPort}/${mongoDBName}`

module.exports = {
  mongoUser,
  mongoPwd,
  mongoDBName,
  mongoServer,
  mongoPort,
  mongoUri 
}
let connection = null;

function setConnection(conn) {
  connection = conn;
}

function getConnection() {
  return connection;
}

module.exports = {
  setConnection,
  getConnection,
};

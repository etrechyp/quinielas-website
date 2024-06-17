import Sequelize from 'sequelize';

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: true,
});

async function query(sql, options = {}) {
  try {
    const [results, metadata] = await sequelize.query(sql, options);
    return results;
  } catch (error) {
    throw error;
  }
}

async function startTransaction() {
  const transaction = await sequelize.transaction();
  return transaction;
}

async function commit(transaction) {
  await transaction.commit();
}

async function rollback(transaction) {
  await transaction.rollback();
}

export { sequelize, query, startTransaction, commit, rollback };

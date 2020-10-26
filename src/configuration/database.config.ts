// export class DatabaseConfig {}
export default () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME || 'spark_transaction_recorder'
  }
});

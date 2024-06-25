import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // e.g., 'localhost'
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Set to false for local development
    trustServerCertificate: true, // Necessary for self-signed certificates
    enableArithAbort: true,
  },
};

export async function executeQuery(query, params = {}) {
  let pool;
  try {
    pool = await sql.connect(config);
    const request = pool.request();

    // Add parameters to the request if there are any
    Object.keys(params).forEach(key => {
      request.input(key, params[key]);
    });

    const result = await request.query(query);
    return result.recordset; // Returns an array of objects
  } catch (err) {
    console.error('SQL error', err);
    throw new Error('Error executing query');
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

export async function getData() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query("SELECT top 5 * FROM q where cat1 like N'%ریاضی%' ");
    return result.recordset;
  } catch (err) {
    console.error(err);
    return [];
  }
}
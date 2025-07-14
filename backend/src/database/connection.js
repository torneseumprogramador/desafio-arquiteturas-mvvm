const mysql = require('mysql2/promise');
require('dotenv').config();

class DatabaseConnection {
  constructor() {
    this.pool = null;
    this.config = {
      host: process.env.DB_HOST || 'mysql',
      user: process.env.DB_USER || 'todo_user',
      password: process.env.DB_PASSWORD || 'todo_password',
      database: process.env.DB_NAME || 'todo_db',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
  }

  async connect() {
    try {
      this.pool = mysql.createPool(this.config);
      
      // Testar conexão
      const connection = await this.pool.getConnection();
      console.log('✅ Conectado ao MySQL');
      connection.release();
      
      return this.pool;
    } catch (error) {
      console.error('❌ Erro ao conectar ao MySQL:', error);
      throw error;
    }
  }

  async getConnection() {
    if (!this.pool) {
      await this.connect();
    }
    return this.pool.getConnection();
  }

  async execute(query, params = []) {
    if (!this.pool) {
      await this.connect();
    }
    return this.pool.execute(query, params);
  }

  async query(query, params = []) {
    if (!this.pool) {
      await this.connect();
    }
    return this.pool.query(query, params);
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
      console.log('🔌 Conexão com MySQL fechada');
    }
  }
}

// Singleton instance
const databaseConnection = new DatabaseConnection();

module.exports = databaseConnection; 
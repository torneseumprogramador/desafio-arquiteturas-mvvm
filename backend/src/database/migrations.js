const databaseConnection = require('./connection');

class DatabaseMigrations {
  static async createTables() {
    try {
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          text VARCHAR(255) NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
      
      await databaseConnection.execute(createTableSQL);
      console.log('✅ Tabela tasks criada/verificada');
      
    } catch (error) {
      console.error('❌ Erro ao criar tabelas:', error);
      throw error;
    }
  }

  static async runMigrations() {
    try {
      console.log('🔄 Executando migrações...');
      await this.createTables();
      console.log('✅ Migrações concluídas com sucesso');
    } catch (error) {
      console.error('❌ Erro nas migrações:', error);
      throw error;
    }
  }
}

module.exports = DatabaseMigrations; 
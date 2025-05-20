'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        affected_table TEXT NOT NULL,
        operation_type TEXT NOT NULL,
        user_name TEXT NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        previous_data JSONB,
        new_data JSONB
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION log_audit() RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'DELETE' THEN
          INSERT INTO audit_logs(affected_table, operation_type, user_name, previous_data)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(OLD)::jsonb);
        ELSIF TG_OP = 'UPDATE' THEN
          INSERT INTO audit_logs(affected_table, operation_type, user_name, previous_data, new_data)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        ELSIF TG_OP = 'INSERT' THEN
          INSERT INTO audit_logs(affected_table, operation_type, user_name, new_data)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(NEW)::jsonb);
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
    `);

    const tables = ['"Users"', '"Vehicles"', '"Drivers"', '"Roles"'];
    for (const table of tables) {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_trigger WHERE tgname = 'audit_${table.replace(/"/g, '').toLowerCase()}'
          ) THEN
            CREATE TRIGGER audit_${table.replace(/"/g, '').toLowerCase()}
            AFTER INSERT OR UPDATE OR DELETE ON ${table}
            FOR EACH ROW EXECUTE FUNCTION log_audit();
          END IF;
        END
        $$;
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    const tables = ['"Users"', '"Vehicles"', '"Drivers"', '"Roles"'];
    for (const table of tables) {
      await queryInterface.sequelize.query(`
        DROP TRIGGER IF EXISTS audit_${table.replace(/"/g, '').toLowerCase()} ON ${table};
      `);
    }

    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS log_audit();`);
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS audit_logs;`);
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        tabla_afectada TEXT NOT NULL,
        tipo_operacion TEXT NOT NULL,
        usuario TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        datos_anteriores JSONB,
        datos_nuevos JSONB
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION registrar_auditoria() RETURNS TRIGGER AS $$
      BEGIN
        IF TG_OP = 'DELETE' THEN
          INSERT INTO audit_logs(tabla_afectada, tipo_operacion, usuario, datos_anteriores)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(OLD)::jsonb);
        ELSIF TG_OP = 'UPDATE' THEN
          INSERT INTO audit_logs(tabla_afectada, tipo_operacion, usuario, datos_anteriores, datos_nuevos)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb);
        ELSIF TG_OP = 'INSERT' THEN
          INSERT INTO audit_logs(tabla_afectada, tipo_operacion, usuario, datos_nuevos)
          VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(NEW)::jsonb);
        END IF;
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
    `);

    const tablas = ['"Usuarios"', '"Vehiculos"', '"Personas"', '"Roles"'];
    for (const tabla of tablas) {
      await queryInterface.sequelize.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_trigger WHERE tgname = 'auditar_${tabla.replace(/"/g, '').toLowerCase()}'
          ) THEN
            CREATE TRIGGER auditar_${tabla.replace(/"/g, '').toLowerCase()}
            AFTER INSERT OR UPDATE OR DELETE ON ${tabla}
            FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();
          END IF;
        END
        $$;
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    const tablas = ['"Usuarios"', '"Vehiculos"', '"Personas"', '"Roles"'];
    for (const tabla of tablas) {
      await queryInterface.sequelize.query(`
        DROP TRIGGER IF EXISTS auditar_${tabla.replace(/"/g, '').toLowerCase()} ON ${tabla};
      `);
    }

    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS registrar_auditoria();`);
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS audit_logs;`);
  }
};

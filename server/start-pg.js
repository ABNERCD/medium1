const EmbeddedPostgres = require('embedded-postgres').default;
const path = require('path');

async function startLocalPostgres() {
  const pgDataDir = path.join(__dirname, '.pgdata');
  const pg = new EmbeddedPostgres({
    databaseDir: pgDataDir,
    user: 'postgres',
    password: 'password',
    port: 5432,
    persistent: true,
  });

  try {
    console.log('⏳ Inicializando instancia local de PostgreSQL en puerto 5432...');
    try {
      await pg.initialise();
    } catch (e) {
      // Ya inicializado previamente
    }
    await pg.start();
    try {
      await pg.createDatabase('legacy_vault');
      console.log('✅ Base de datos "legacy_vault" creada exitosamente.');
    } catch (e) {
      console.log('ℹ️ La base de datos "legacy_vault" ya existe.');
    }
    console.log('🟢 PostgreSQL local corriendo en postgresql://postgres:password@localhost:5432/legacy_vault');
  } catch (err) {
    console.error('❌ Error al iniciar PostgreSQL embebido:', err);
    process.exit(1);
  }
}

startLocalPostgres();

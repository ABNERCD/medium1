async function verifyBackendAndDatabase() {
  const url = 'http://localhost:4000/api/health';
  console.log(`🔍 Ejecutando prueba automática contra ${url} ...`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('📦 Respuesta recibida:', JSON.stringify(data, null, 2));

    if (response.ok && data.status === 'OK' && data.database === 'CONNECTED') {
      console.log('\n============================================================');
      console.log('✅ ÉXITO TOTAL: El Backend (Express) y la Base de Datos (PostgreSQL + Prisma) están conectados y respondiendo correctamente.');
      console.log('============================================================\n');
      process.exit(0);
    } else {
      console.error('⚠️ El servidor respondió pero la base de datos no está en estado CONNECTED:', data);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error al conectar con el endpoint /api/health:', error.message);
    process.exit(1);
  }
}

verifyBackendAndDatabase();

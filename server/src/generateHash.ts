// En: server/src/generateHash.ts
import bcrypt from 'bcryptjs';

async function createHash() {
  // ▼▼▼ PON AQUÍ LA CONTRASEÑA EXACTA QUE QUIERES USAR ▼▼▼
  const password = 'admin_password_123'; 
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  console.log('Tu contraseña es:', password);
  console.log('Tu HASH seguro es (cópialo completo):');
  console.log(hash);
}

createHash(); 
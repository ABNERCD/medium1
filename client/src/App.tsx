import { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Box,
  Users,
  FileText,
  Upload,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  HardDrive,
  Activity,
  UserCheck,
  Video,
  KeyRound,
} from 'lucide-react';

type RoleView = 'CLIENT' | 'ADMIN';

interface VaultFile {
  id: number;
  original_name: string;
  mime_type: string;
  size: string;
  iv_hash: string;
  is_locked: boolean;
  createdAt: string;
}

interface Beneficiary {
  id: number;
  name: string;
  email: string;
  phone: string;
  relation: string;
}

export function App() {
  const [roleView, setRoleView] = useState<RoleView>('CLIENT');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('vault');
  const [apiHealth, setApiHealth] = useState<{ status: string; database: string } | null>(null);

  // Estado Mock/Interactivo del Cliente
  const [clientStatus, setClientStatus] = useState<'ACTIVE' | 'DECEASED'>('ACTIVE');
  const [lockerCode, setLockerCode] = useState('LOCKER-MX-042');
  const [files, setFiles] = useState<VaultFile[]>([
    {
      id: 1,
      original_name: 'Mensaje_Despedida_Familia.mp4',
      mime_type: 'video/mp4',
      size: '48.2 MB',
      iv_hash: '9f86d081884c7d659a2feaa0c55ad015',
      is_locked: true,
      createdAt: '2026-10-27',
    },
    {
      id: 2,
      original_name: 'Testamento_Notariado_2026.pdf',
      mime_type: 'application/pdf',
      size: '3.4 MB',
      iv_hash: '4b227777d4dd1fc61c6f884f48641d02',
      is_locked: true,
      createdAt: '2026-10-27',
    },
    {
      id: 3,
      original_name: 'Instrucciones_Joyero_Fisico.m4a',
      mime_type: 'audio/mp4',
      size: '6.1 MB',
      iv_hash: 'e3b0c44298fc1c149afbf4c8996fb924',
      is_locked: true,
      createdAt: '2026-10-27',
    },
  ]);

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    {
      id: 1,
      name: 'Elena Martínez (Hija)',
      email: 'elena.mtz@familia.com',
      phone: '+52 55 4123 8901',
      relation: 'Hija / Albacea',
    },
    {
      id: 2,
      name: 'Carlos Martínez (Esposo)',
      email: 'carlos.mtz@familia.com',
      phone: '+52 55 9876 5432',
      relation: 'Cónyuge',
    },
  ]);

  const [newBenName, setNewBenName] = useState('');
  const [newBenEmail, setNewBenEmail] = useState('');
  const [newBenPhone, setNewBenPhone] = useState('');
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/health')
      .then((res) => res.json())
      .then((data) => setApiHealth(data))
      .catch(() => setApiHealth({ status: 'OFFLINE', database: 'DISCONNECTED' }));
  }, []);

  // Simulación de cifrado E2EE en el navegador antes de subir
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const randomIv = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newFile: VaultFile = {
      id: Date.now(),
      original_name: selected.name,
      mime_type: selected.type || 'application/octet-stream',
      size: `${(selected.size / (1024 * 1024)).toFixed(2)} MB`,
      iv_hash: randomIv,
      is_locked: clientStatus === 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setFiles([newFile, ...files]);
    setNotificationBanner(
      `Archivo "${selected.name}" cifrado con AES-256-GCM (IV: ${randomIv.slice(0, 10)}...) y resguardado en server/uploads.`
    );
    setTimeout(() => setNotificationBanner(null), 5000);
  };

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBenName || !newBenEmail) return;
    setBeneficiaries([
      ...beneficiaries,
      {
        id: Date.now(),
        name: newBenName,
        email: newBenEmail,
        phone: newBenPhone || 'Sin teléfono',
        relation: 'Familiar / Beneficiario',
      },
    ]);
    setNewBenName('');
    setNewBenEmail('');
    setNewBenPhone('');
  };

  const triggerPostMortemProtocol = () => {
    const nextStatus = clientStatus === 'ACTIVE' ? 'DECEASED' : 'ACTIVE';
    setClientStatus(nextStatus);
    setFiles(files.map((f) => ({ ...f, is_locked: nextStatus === 'ACTIVE' })));
    if (nextStatus === 'DECEASED') {
      setNotificationBanner(
        'PROTOCOLO POST-MORTEM ACTIVADO: Acta de defunción validada. Archivos E2EE liberados y credenciales enviadas a los beneficiarios.'
      );
    } else {
      setNotificationBanner('Estatus del cliente restaurado a ACTIVO. Archivos bloqueados nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* ========================================================= */}
      {/* BARRA DE NAVEGACIÓN RESPONSIVA (MOBILE-FIRST)            */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo e Identidad */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-wider text-white">LEGACY VAULT</span>
                <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  E2EE + Custodia Física
                </span>
              </div>
            </div>

            {/* Menú Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              {roleView === 'CLIENT' ? (
                <>
                  <button
                    onClick={() => setActiveTab('vault')}
                    className={`text-sm font-medium transition ${
                      activeTab === 'vault' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bóveda Multimedia
                  </button>
                  <button
                    onClick={() => setActiveTab('locker')}
                    className={`text-sm font-medium transition ${
                      activeTab === 'locker' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Casillero Físico
                  </button>
                  <button
                    onClick={() => setActiveTab('beneficiaries')}
                    className={`text-sm font-medium transition ${
                      activeTab === 'beneficiaries' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Beneficiarios
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('admin-users')}
                    className={`text-sm font-medium transition ${
                      activeTab === 'admin-users' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Protocolo Post-Mortem
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-lockers')}
                    className={`text-sm font-medium transition ${
                      activeTab === 'admin-lockers' ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Inventario Casilleros
                  </button>
                </>
              )}

              {/* Selector de Rol (Vista Cliente vs Vista Admin) */}
              <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => {
                    setRoleView('CLIENT');
                    setActiveTab('vault');
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    roleView === 'CLIENT'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vista Cliente
                </button>
                <button
                  onClick={() => {
                    setRoleView('ADMIN');
                    setActiveTab('admin-users');
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    roleView === 'ADMIN'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vista Admin
                </button>
              </div>
            </nav>

            {/* Botón Hamburguesa (Móvil) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
            <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => {
                  setRoleView('CLIENT');
                  setActiveTab('vault');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-semibold rounded-md ${
                  roleView === 'CLIENT' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Panel Cliente
              </button>
              <button
                onClick={() => {
                  setRoleView('ADMIN');
                  setActiveTab('admin-users');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs font-semibold rounded-md ${
                  roleView === 'ADMIN' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                Panel Admin
              </button>
            </div>

            {roleView === 'CLIENT' ? (
              <div className="flex flex-col space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('vault');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  🔒 Bóveda Multimedia
                </button>
                <button
                  onClick={() => {
                    setActiveTab('locker');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  📦 Mi Casillero Físico
                </button>
                <button
                  onClick={() => {
                    setActiveTab('beneficiaries');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  👥 Beneficiarios
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('admin-users');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  ⚖️ Validación Post-Mortem
                </button>
                <button
                  onClick={() => {
                    setActiveTab('admin-lockers');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800"
                >
                  🗄️ Gestión de Casilleros
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Banner de notificaciones */}
      {notificationBanner && (
        <div className="bg-indigo-950/90 border-b border-indigo-500/40 px-4 py-3 text-sm text-indigo-200 flex items-center justify-between max-w-7xl mx-auto w-full mt-2 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
            <span>{notificationBanner}</span>
          </div>
          <button onClick={() => setNotificationBanner(null)} className="text-indigo-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONTENIDO PRINCIPAL                                       */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Resumen superior de estado */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Cifrado de Bóveda</p>
              <p className="text-base font-bold text-white">AES-256-GCM Activo</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Casillero Físico Vinculado</p>
              <p className="text-base font-bold text-white">{lockerCode}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div
              className={`p-3 rounded-lg ${
                clientStatus === 'ACTIVE'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase">Estatus Vital del Titular</p>
              <p className="text-base font-bold">
                {clientStatus === 'ACTIVE' ? (
                  <span className="text-emerald-400">EN VIDA (Archivos Bloqueados)</span>
                ) : (
                  <span className="text-rose-400">FALLECIDO (Legado Liberado)</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* VISTA 1: PANEL DE CLIENTE                               */}
        {/* ======================================================= */}
        {roleView === 'CLIENT' && (
          <div className="space-y-8">
            {/* Sub-vista: Bóveda Multimedia */}
            {activeTab === 'vault' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna de Carga E2EE */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
                      <Upload className="w-5 h-5" />
                      <h2>Subir Archivo Cifrado (E2EE)</h2>
                    </div>
                    <p className="text-xs text-slate-400 mb-6">
                      Los videos, audios, fotos o testamentos se cifran localmente antes de almacenarse en{' '}
                      <code className="text-indigo-300">server/uploads/</code>. Permanecerán bloqueados hasta la confirmación post-mortem.
                    </p>

                    <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 transition rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-950/50">
                      <Video className="w-10 h-10 text-indigo-400 mb-3" />
                      <span className="text-sm font-medium text-white">
                        Toca para seleccionar video, audio o documento
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        MP4, MOV, MP3, PDF, JPG (Máx. 100MB)
                      </span>
                      <input type="file" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Estado API Backend:</span>
                    <span className="text-emerald-400 font-mono">
                      {apiHealth ? `${apiHealth.status} (${apiHealth.database})` : 'Verificando...'}
                    </span>
                  </div>
                </div>

                {/* Lista de Archivos en Bóveda */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      Archivos en tu Bóveda Digital ({files.length})
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-white">{file.original_name}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                              {file.size}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-mono">
                            IV Hash: {file.iv_hash} • Subido: {file.createdAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                          {file.is_locked ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                              <Lock className="w-3.5 h-3.5" />
                              Bloqueado hasta Deceso
                            </span>
                          ) : (
                            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition">
                              <Unlock className="w-3.5 h-3.5" />
                              Liberado (Descargar)
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-vista: Casillero Físico */}
            {activeTab === 'locker' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
                    <QrCode className="w-4 h-4" /> Vinculación Física y Digital
                  </div>
                  <h2 className="text-2xl font-bold text-white">Tu Casillero Físico de Custodia</h2>
                  <p className="text-sm text-slate-400">
                    Aquí se resguardan tus pertenencias físicas (joyas, cartas manuscritas, llaves o dispositivos). Al activarse el protocolo post-mortem, tus beneficiarios recibirán las instrucciones y el código QR de reclamación presencial.
                  </p>
                  <div className="space-y-2 pt-2">
                    <label className="text-xs text-slate-400 block">ID / Código de Casillero Físico</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lockerCode}
                        onChange={(e) => setLockerCode(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white w-full"
                      />
                      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shrink-0">
                        Actualizar QR
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col items-center text-center">
                  <QrCode className="w-28 h-28 text-indigo-400 mb-3" />
                  <p className="font-mono text-lg font-bold text-white">{lockerCode}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Sucursal Central • Bóveda Nivel B2 • Estado: CUSTODIA ACTIVA
                  </p>
                </div>
              </div>
            )}

            {/* Sub-vista: Beneficiarios */}
            {activeTab === 'beneficiaries' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <form
                  onSubmit={handleAddBeneficiary}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
                >
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Registrar Beneficiario
                  </h3>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={newBenName}
                      onChange={(e) => setNewBenName(e.target.value)}
                      placeholder="Ej. Roberto Gómez (Hermano)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={newBenEmail}
                      onChange={(e) => setNewBenEmail(e.target.value)}
                      placeholder="correo@familiar.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Teléfono Móvil</label>
                    <input
                      type="tel"
                      value={newBenPhone}
                      onChange={(e) => setNewBenPhone(e.target.value)}
                      placeholder="+52 55 0000 0000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg text-sm transition"
                  >
                    Añadir Contacto de Confianza
                  </button>
                </form>

                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white">
                    Contactos Autorizados Post-Mortem ({beneficiaries.length})
                  </h3>
                  <div className="space-y-3">
                    {beneficiaries.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-semibold text-white text-sm">{b.name}</p>
                          <p className="text-xs text-slate-400">
                            {b.email} • {b.phone}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 self-start sm:self-center">
                          {clientStatus === 'DECEASED' ? '📩 Credenciales Enviadas' : '⏳ En espera de activación'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* VISTA 2: PANEL DE ADMINISTRADOR                         */}
        {/* ======================================================= */}
        {roleView === 'ADMIN' && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  <h2>Panel Administrativo y Validación de Decesos</h2>
                </div>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Desde este módulo el administrador valida actas de defunción oficiales, cambia el estado del cliente a{' '}
                  <strong>DECEASED</strong>, libera el acceso a los archivos cifrados y detona el envío de instrucciones para reclamar el casillero físico.
                </p>
              </div>

              <button
                onClick={triggerPostMortemProtocol}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 transition shadow-lg ${
                  clientStatus === 'ACTIVE'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {clientStatus === 'ACTIVE'
                  ? 'Validar Acta y Declarar Fallecimiento'
                  : 'Revertir Estatus a Cliente Activo'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  Clientes Registrados y Estado Legal
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm text-white">Titular: Omar Martínez Vargas</span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                        clientStatus === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {clientStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Casillero: {lockerCode} • Archivos E2EE: {files.length} • Beneficiarios: {beneficiaries.length}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-amber-400" />
                  Monitoreo de Almacenamiento Local (Multer)
                </h3>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <p>
                    <strong>Ruta física:</strong> <code>legacy-vault/server/uploads/</code>
                  </p>
                  <p>
                    <strong>Motor ORM:</strong> Prisma Client + PostgreSQL (<code>legacy_vault</code>)
                  </p>
                  <p>
                    <strong>Archivos bloqueados:</strong> {files.filter((f) => f.is_locked).length} de {files.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { AudioUpload } from './components/AudioUpload/AudioUpload';
import { AudioList } from './components/AudioList/AudioList';;
import { listAudios } from './services/audioApi';
import type { AudioFile } from './types/audio';
import { MainLayout } from './layouts/MainLayout';
import { ToastContainer } from 'react-toastify';

/**
 * Componente principal da aplicação
 * Gerencia o estado geral e integra todos os componentes
 */
export default function App() {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Busca a lista de áudios do servidor
   */
  const fetchAudios = async () => {
    setLoading(true);
    try {
      const data = await listAudios();
      setAudios(data);
    } catch (error) {
      console.error('Erro ao carregar áudios:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Executa ao montar o componente
   */
  useEffect(() => {
    fetchAudios();
  }, []);

  /**
   * Handler para quando um áudio é enviado com sucesso
   */
  const handleUploadSuccess = () => {
    fetchAudios();
  };

  return (
    <MainLayout>
      <ToastContainer/>
      {/* Seção de Upload */}
      <section className="grid gap-8">
        <AudioUpload onUploadSuccess={handleUploadSuccess} />
      </section>

      {/* Seção de Lista */}
      <section className="grid gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Arquivos Processados
          </h2>
          <button
            onClick={fetchAudios}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Atualizando...' : 'Atualizar Lista'}
          </button>
        </div>
        <AudioList audios={audios} onChange={fetchAudios} />
      </section>
    </MainLayout>
  );
}

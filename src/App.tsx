import { useEffect, useState } from 'react';
import { AudioUpload } from './components/AudioUpload';
import { AudioList, type AudioFile } from './components/AudioList';
import { listAudios } from './service/audioApi';
import { Music } from 'lucide-react';
import { MainLayout } from './layouts/MainLayout';

function App() {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAudios = async () => {
    try {
      setLoading(true);
      const data = await listAudios();
      setAudios(data);
    } catch (error) {
      console.error('Erro ao buscar áudios', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <Music className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-extrabold text-gray-900">♫ Audio Processor</h1>
          </div>

          <div className="grid gap-8">
            <section>
              <AudioUpload onUploadSuccess={fetchAudios} />
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Arquivos Processados</h2>
                <button
                  onClick={fetchAudios}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Atualizando...' : 'Atualizar Lista'}
                </button>
              </div>
              <AudioList audios={audios} onChange={fetchAudios} />
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;

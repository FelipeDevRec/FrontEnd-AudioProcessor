import { useEffect, useState } from 'react';
import { AudioUpload } from './components/AudioUpload';
import { AudioList } from './components/AudioList';
import { audioService } from './service/api';
import { Music } from 'lucide-react';

function App() {
  const [audios, setAudios] = useState([]);

  const fetchAudios = async () => {
    try {
      const response = await audioService.getAll();
      setAudios(response.data);
    } catch (error) {
      console.error("Erro ao buscar áudios", error);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center mb-10">
          <Music className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-extrabold text-gray-900">Audio Processor</h1>
        </div>

        <div className="grid gap-8">
          {/* Sessão de Upload */}
          <section>
            <AudioUpload onUploadSuccess={fetchAudios} />
          </section>

          {/* Sessão de Listagem */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Arquivos Processados</h2>
              <button 
                onClick={fetchAudios}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Atualizar Lista
              </button>
            </div>
            <AudioList audios={audios} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;

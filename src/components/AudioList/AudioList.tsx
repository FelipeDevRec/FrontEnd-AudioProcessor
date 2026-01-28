import { Zap, MessageCircle, Eye } from 'lucide-react';
import type { AudioFile } from '../../types/audio';
import { useAudioList } from '../../hooks/useAudioList';
import { useAudioSummary } from '../../hooks/useAudioSummary';
import { SummaryModal } from '.././AudioList/SummaryModal';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface Props {
  audios: AudioFile[];
  onChange?: () => void;
}


/**
 * 
 * Componente AudioList - Lista de áudios processados
 * Refatorado para usar custom hooks
 */
export const AudioList = ({ audios: externalAudios }: Props) => {
  // Hooks customizados
  const {
    audios,
    loadingId,
    actionType,
    handleCompress,
    handleSummarize,
    isCompressed,
  } = useAudioList();

  const {
    data: summaryData,
    loading: summaryLoading,
    showModal,
    fetchSummary,
    closeModal,
  } = useAudioSummary();

  /**
   * Handler para visualizar resumo
   */
  const [isSummaryLoading, setLoading] = useState(false);
  const handleViewSummary = async (audioId: number) => {
    try {
      await fetchSummary(audioId);
    } catch (error) {
      setLoading(true);
      toast.error('Erro ao carregar resumo do áudio.');
    }
    
  };

  // Usar audios externos se fornecidos, senão usar do hook
  const displayAudios = externalAudios.length > 0 ? externalAudios : audios;

  return (
    <>
      {/* Tabela de áudios */}
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Arquivo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Formato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {displayAudios.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-sm text-gray-500 text-center"
                >
                  Nenhum arquivo processado ainda.
                </td>
              </tr>
            )}

            {displayAudios.map((audio) => {
              const compressed = isCompressed(audio.status);
              const isLoading = loadingId === audio.id;

              return (
                <tr key={audio.id} className="hover:bg-gray-50">
                  {/* ID */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {audio.id}
                  </td>

                  {/* Arquivo */}
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {audio.originalFilename}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        compressed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {audio.status}
                    </span>
                  </td>

                  {/* Formato */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {audio.format?.toUpperCase()}
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Botão Comprimir */}
                      <button
                        onClick={() => handleCompress(audio.id)}
                        disabled={compressed || isLoading}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                          compressed || isLoading
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-white bg-blue-600 hover:bg-blue-700'
                        }`}
                        title={
                          compressed
                            ? 'Arquivo já está comprimido'
                            : 'Comprimir áudio'
                        }
                      >
                        <Zap className="w-3 h-3" />
                        {isLoading && actionType === 'compress'
                          ? 'Comprimindo...'
                          : compressed
                            ? 'Comprimido'
                            : 'Comprimir'}
                      </button>

                      {/* Botão Resumir */}
                      <button
                        onClick={() => handleSummarize(audio.id)}
                        disabled={isSummaryLoading}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                          isSummaryLoading && actionType === 'summarize'
                            ? 'text-white bg-green-600 opacity-75'
                            : 'text-white bg-green-600 hover:bg-green-700'
                        }`}
                        title="Gerar resumo do áudio"
                      >
                        <MessageCircle className="w-3 h-3" />
                        {isSummaryLoading && actionType === 'summarize'
                          ? 'Resumindo...'
                          : 'Resumir'}
                      </button>

                      {/* Botão Ver */}
                      <button
                        onClick={() => handleViewSummary(audio.id)}
                        disabled={isSummaryLoading}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                          isSummaryLoading
                            ? 'text-gray-400 bg-gray-100 cursor-wait'
                            : 'text-white bg-purple-600 hover:bg-purple-700'
                        }`}
                        title="Visualizar resumo"
                      >
                        <Eye className="w-3 h-3" />
                        Ver
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal de Resumo */}
      <SummaryModal
        summaryData={summaryData}
        isOpen={showModal}
        isLoading={summaryLoading}
        onClose={closeModal}
      />
    </>
  );
};

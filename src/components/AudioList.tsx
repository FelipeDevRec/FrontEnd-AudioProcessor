import React, { useState } from 'react';
import { compressAudio, summarizeAudio, getSummary, type AudioSummaryData } from '../service/audioApi';
import { Zap, MessageCircle, X } from 'lucide-react';

export type AudioFile = {
  id: number;
  originalFilename: string;
  status: string;
  format: string;
};

type Props = {
  audios: AudioFile[];
  onChange?: () => void;
};

export const AudioList = ({ audios, onChange }: Props) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<'compress' | 'summarize' | null>(null);
  const [summaryData, setSummaryData] = useState<AudioSummaryData | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  async function handleCompress(id: number) {
    try {
      setLoadingId(id);
      setActionType('compress');
      await compressAudio(id);
      onChange?.();
    } catch (error) {
      console.error('Erro ao comprimir', error);
      alert('Erro ao comprimir arquivo.');
    } finally {
      setLoadingId(null);
      setActionType(null);
    }
  }

  async function handleSummarize(id: number) {
    try {
      setLoadingId(id);
      setActionType('summarize');
      await summarizeAudio(id);
      onChange?.();
    } catch (error) {
      console.error('Erro ao resumir', error);
      alert('Erro ao resumir arquivo.');
    } finally {
      setLoadingId(null);
      setActionType(null);
    }
  }

  async function handleViewSummary(id: number) {
    try {
      const data = await getSummary(id);
      setSummaryData(data);
      setShowSummaryModal(true);
    } catch (error) {
      console.error('Erro ao buscar resumo', error);
      alert('Resumo ainda não disponível.');
    }
  }

  const isCompressed = (status: string) =>
    status?.toUpperCase() === 'COMPRESSED' ||
    status?.toUpperCase() === 'COMPLETED';

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {audios.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                  Nenhum arquivo processado ainda.
                </td>
              </tr>
            )}

            {audios.map((audio) => {
              const compressed = isCompressed(audio.status);
              const isLoading = loadingId === audio.id;

              return (
                <tr key={audio.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {audio.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {audio.originalFilename}
                  </td>
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {audio.format?.toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCompress(audio.id)}
                        disabled={compressed || isLoading}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium transition-colors
                          ${
                            compressed || isLoading
                              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                              : 'text-white bg-blue-600 hover:bg-blue-700'
                          }`}
                        aria-busy={isLoading && actionType === 'compress'}
                      >
                        <Zap className="w-3 h-3" />
                        {isLoading && actionType === 'compress'
                          ? 'Comprimindo...'
                          : compressed
                          ? 'Comprimido'
                          : 'Comprimir'}
                      </button>

                      <button
                        onClick={() => handleSummarize(audio.id)}
                        disabled={isLoading}
                        className={`inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium transition-colors
                          ${
                            isLoading && actionType === 'summarize'
                              ? 'text-white bg-green-600 opacity-75'
                              : 'text-white bg-green-600 hover:bg-green-700'
                          }`}
                        aria-busy={isLoading && actionType === 'summarize'}
                      >
                        <MessageCircle className="w-3 h-3" />
                        {isLoading && actionType === 'summarize'
                          ? 'Resumindo...'
                          : 'Resumir'}
                      </button>

                      <button
                        onClick={() => handleViewSummary(audio.id)}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                        title="Ver resumo"
                      >
                        📋
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
      {showSummaryModal && summaryData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">📋 Resumo do Áudio</h3>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 uppercase font-medium mb-2">
                  Resumo
                  {summaryData.isTruncated && (
                    <span className="text-xs text-orange-600 font-normal ml-2">(truncado)</span>
                  )}
                </p>
                <p className="text-gray-800 text-base leading-relaxed bg-gray-50 p-4 rounded">
                  {summaryData.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                    ID do Áudio
                  </p>
                  <p className="text-gray-800 font-semibold">{summaryData.audioId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                    Tempo de Processamento
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {summaryData.processingTime}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                  Data de Extração
                </p>
                <p className="text-gray-800">
                  {new Date(summaryData.extractedAt).toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                <span className="text-sm text-gray-600">
                  Tamanho do resumo:{' '}
                  <strong>{summaryData.summaryLength}</strong> caracteres
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    summaryData.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {summaryData.status.toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSummaryModal(false)}
              className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

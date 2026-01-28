import { X } from 'lucide-react';
import type { AudioSummaryData } from '../../types/audio';

interface SummaryModalProps {
  summaryData: AudioSummaryData | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

/**
 * Modal que exibe o resumo de um áudio
 * Componente independente e reutilizável
 */
export const SummaryModal = ({
  summaryData,
  isOpen,
  isLoading,
  onClose,
}: SummaryModalProps) => {
  if (!isOpen || !summaryData) return null;

  return (
    <div className="inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999] overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 max-h-[80vh] flex flex-col">
        {/* Header fixo */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900">
            📋 Resumo do Áudio #{summaryData.audioId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {summaryData.summary && summaryData.summary.trim() ? (
            <>
              {/* Resumo */}
              <div>
                <p className="text-sm text-gray-500 uppercase font-medium mb-2">
                  Resumo
                  {summaryData.isTruncated && (
                    <span className="text-xs text-orange-600 font-normal ml-2">
                    </span>
                  )}
                </p>
                <div className="text-gray-800 text-base leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                  "{summaryData.summary}"
                </div>
              </div>

              {/* Grid de informações */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                    ID do Áudio
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {summaryData.audioId}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                    Tempo de Processamento
                  </p>
                  <p className="text-gray-800 font-semibold">
                    {summaryData.processingTime || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Data de extração */}
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-500 uppercase font-medium mb-1">
                  Data de Extração
                </p>
                <p className="text-gray-800">
                  {summaryData.extractedAt
                    ? new Date(summaryData.extractedAt).toLocaleString('pt-BR')
                    : 'N/A'}
                </p>
              </div>

              {/* Status e tamanho */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded border border-blue-200">
                <span className="text-sm text-gray-700">
                  Tamanho do resumo:{' '}
                  <strong>{summaryData.summaryLength}</strong> caracteres
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded ${
                    summaryData.status === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {summaryData.status?.toUpperCase() || 'DESCONHECIDO'}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-2 text-lg">⏳</p>
              <p className="text-gray-600 mb-1 font-medium">
                Carregando resumo...
              </p>
              <p className="text-sm text-gray-500">Aguarde um momento.</p>
            </div>
          )}
        </div>

        {/* Footer fixo */}
        <div className="p-6 border-t flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
};

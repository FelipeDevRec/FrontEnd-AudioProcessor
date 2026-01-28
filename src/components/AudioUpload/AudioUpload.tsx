import React, { useState } from 'react';
import { uploadAudio } from '../../services/audioApi';
import { Upload } from 'lucide-react';

type Props = {
  onUploadSuccess: () => void;
};

export const AudioUpload = ({ onUploadSuccess }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setLoading(true);
    setMessage('');

    try {
      await uploadAudio(file);
      setMessage('✅ Áudio carregado com sucesso!');
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      setMessage('❌ Erro ao carregar arquivo.');
    } finally {
      setLoading(false);
    }
  };

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
      <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">📤 Upload de Áudio</h2>

        <div
          role="button"
          tabIndex={0}
          aria-label="Área de upload. Clique ou arraste um arquivo de áudio (.mp3, .wav) para aqui"
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-blue-200 bg-white hover:border-blue-400'
            }
            ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={() => {
            if (!loading) {
              document.getElementById('audio-input')?.click();
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !loading) {
              e.preventDefault();
              document.getElementById('audio-input')?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
        >
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2" />
              <p className="text-blue-600 font-medium">Processando...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <p className="text-gray-700 font-semibold mb-2">
                Arraste um arquivo aqui ou clique para selecionar
              </p>
              <p className="text-sm text-gray-500">Formatos suportados: .mp3, .wav</p>
            </>
          )}
        </div>

      <input
        id="audio-input"
        type="file"
        accept=".mp3,.wav"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={loading}
        aria-label="Selecione um arquivo de áudio"
      />

      {message && (
        <p className="mt-4 text-sm font-semibold text-center">{message}</p>
      )}
    </div>
  );
};

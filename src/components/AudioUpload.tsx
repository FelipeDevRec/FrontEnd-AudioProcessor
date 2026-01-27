import React, { useState } from 'react';
import { audioService } from '../service/api';

export const AudioUpload = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await audioService.upload(e.target.files[0]);
      setMessage('✅ Audio carregado com sucesso!');
      onUploadSuccess();
    } catch (error) {
      setMessage('❌ Erro ao carregar arquivo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Upload de Áudio</h2>
      
      <div className="relative border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          disabled={loading}
          accept=".mp3,.wav"
        />
        
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-blue-600 font-medium">Processando...</p>
          </div>
        ) : (
          <p className="text-gray-500">Arraste um arquivo ou clique para selecionar (.mp3, .wav)</p>
        )}
      </div>
      
      {message && <p className="mt-4 text-sm font-semibold text-center">{message}</p>}
    </div>
  );
};

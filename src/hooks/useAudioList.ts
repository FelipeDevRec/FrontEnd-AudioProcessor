import { useState, useCallback, useEffect } from 'react';
import type { AudioListState, ActionType } from '../types/audio';
import { listAudios, compressAudio, summarizeAudio } from '../services/audioApi';
import { toast } from 'react-toastify';

/**
 * Custom Hook para gerenciar a lista de áudios
 * Encapsula toda a lógica de fetch, compress e summarize
 */
export const useAudioList = () => {
  const [state, setState] = useState<AudioListState>({
    audios: [],
    loading: false,
    error: null,
  });

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);


  /**
   * Busca a lista de áudios do servidor
   */
  const fetchAudios = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await listAudios();
      setState((prev) => ({ ...prev, audios: data, loading: false }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar áudios';
      setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
      toast.error('Erro ao carregar áudios');
    }
  }, [toast]);

  /**
   * Comprime um áudio pelo ID
   */
  const handleCompress = useCallback(
    async (id: number) => {
      try {
        setLoadingId(id);
        setActionType('compress');
        await compressAudio(id);
        toast.success('Áudio comprimido com sucesso!');
        await fetchAudios();
      } catch (err) {
        toast.error('Erro ao comprimir áudio');
        console.error('Erro ao comprimir:', err);
      } finally {
        setLoadingId(null);
        setActionType(null);
      }
    },
    [fetchAudios, toast]
  );

  /**
   * Sumariza um áudio pelo ID
   */
  const handleSummarize = useCallback(
    async (id: number) => {
      try {
        setLoadingId(id);
        setActionType('summarize');
        await summarizeAudio(id);
        toast.warning(`Áudio ${id} enviado para resumir!`);
        await fetchAudios();
      } catch (err) {
        toast.error('Erro ao resumir áudio');
        console.error('Erro ao resumir:', err);
      } finally {
        setLoadingId(null);
        setActionType(null);
      }
    },
    [fetchAudios, toast]
  );

  /**
   * Verifica se um áudio está comprimido
   */
  const isCompressed = useCallback((status: string) => {
    return status?.toUpperCase() === 'COMPRESSED' || status?.toUpperCase() === 'COMPLETED';
  }, []);

  // Buscar áudios ao montar o componente
  useEffect(() => {
    fetchAudios();
  }, [fetchAudios]);

  return {
    audios: state.audios,
    loading: state.loading,
    error: state.error,
    loadingId,
    actionType,
    fetchAudios,
    handleCompress,
    handleSummarize,
    isCompressed,
  };
};

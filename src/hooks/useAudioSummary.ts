import { useState, useCallback } from 'react';
import type { AudioSummaryState } from '../types/audio';
import { getSummary } from '../services/audioApi';
import { toast } from 'react-toastify';

/**
 * Custom Hook para gerenciar o resumo de um áudio
 * Encapsula toda a lógica de fetch, state e tratamento de erros
 */
export const useAudioSummary = () => {
  const [state, setState] = useState<AudioSummaryState>({
    data: null,
    loading: false,
    error: null,
    showModal: false,
  });


  /**
   * Busca o resumo de um áudio pelo ID
   */
  const fetchSummary = useCallback(
    async (audioId: number) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await getSummary(audioId);
        console.log('Resumo recebido:', data);
        
        // Se o resumo está vazio, mostrar aviso
        if (!data.summary) {
          setState((prev) => ({
            ...prev,
            loading: false,
            showModal: true,    // abre o popup mesmo sem resumo
            data: null,
            error: 'Resumo não disponível. Clique em "Resumir" primeiro.',
          }));
          toast.warning('Resumo não disponível. Clique em "Resumir" primeiro.');
          return;
        }

        setState((prev) => ({
          ...prev,
          data,
          loading: false,
          showModal: true,
          error: null,
        }));
      } catch (err) {
        toast.error('Resumo ainda não disponível. Clique em "Resumir" primeiro.');
      }
    },
    [toast]
  );

  /**
   * Fecha o modal de resumo
   */
  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, showModal: false, data: null }));
  }, []);

  /**
   * Limpa todos os estados
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      showModal: false,
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    showModal: state.showModal,
    fetchSummary,
    closeModal,
    reset,
  };
};

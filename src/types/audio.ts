/**
 * Tipos centralizados para a aplicação de Audio Processor
 */

export type AudioFile = {
  id: number;
  originalFilename: string;
  status: string;
  format: string;
};

export type AudioSummaryData = {
  id: number;
  audioId: number;
  summary: string;
  extractionTimeMs: number;
  extractedAt: string;
  isTruncated: boolean;
  processingTime: string;
  status: string;
  summaryLength: number;
};

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ActionType = 'compress' | 'summarize' | null;

export interface AudioListState {
  audios: AudioFile[];
  loading: boolean;
  error: string | null;
}

export interface AudioSummaryState {
  data: AudioSummaryData | null;
  loading: boolean;
  error: string | null;
  showModal: boolean;
}

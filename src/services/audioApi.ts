const API_BASE_URL = 'http://localhost:8080';

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


export async function uploadAudio(file: File): Promise<AudioFile> {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await fetch(`${API_BASE_URL}/api/audio/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!resp.ok) {
    throw new Error('Falha no upload');
  }

  return resp.json();
}

export async function listAudios(): Promise<AudioFile[]> {
  const resp = await fetch(`${API_BASE_URL}/api/audio`);
  if (!resp.ok) {
    throw new Error('Falha ao listar áudios');
  }
  return resp.json();
}

export async function compressAudio(id: number): Promise<void> {
  const resp = await fetch(`${API_BASE_URL}/api/audio/${id}/compress`, {
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error('Falha ao comprimir áudio');
  }
}

export async function summarizeAudio(id: number): Promise<void> {
  const resp = await fetch(`${API_BASE_URL}/api/audio/${id}/summarize`, {
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error('Falha ao resumir áudio');
  }
}

export async function getSummary(id: number): Promise<AudioSummaryData> {
  const resp = await fetch(`${API_BASE_URL}/api/audio/${id}/summary`);
  if (!resp.ok) {
    throw new Error('Falha ao buscar resumo');
  }
  return resp.json();
}

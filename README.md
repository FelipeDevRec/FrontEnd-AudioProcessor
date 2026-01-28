# Audio Processor - Frontend

> Uma aplicação web moderna para fazer upload e gerenciar arquivos de áudio, desenvolvida como atividade prática do **Laboratório 4** da disciplina de Programação 7 (CSPR-471) na Jala University.

##  Sobre o Projeto

Este é um frontend para um **sistema de processamento de áudio** que permite aos usuários fazer upload de arquivos de áudio e visualizar uma lista dos arquivos já processados. A aplicação foi desenvolvida com foco em:

- ✅ **Experiência do usuário amigável (UX)** durante o processo de upload
- ✅ **Feedback visual** com spinner de carregamento
- ✅ **Integração com API REST** do servidor backend
- ✅ **Programação assíncrona** robusta com tratamento de erros
- ✅ **Testes automatizados** para componentes críticos

## Stack Tecnológico

- **Framework**: React 19.2.0 com TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1.18 + PostCSS
- **Requisições HTTP**: Axios
- **Testing**: Vitest
- **Linting**: ESLint
- **Idioma**: TypeScript 96.4%

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AudioUpload/     # Formulário de upload com spinner de carregamento
│   └── AudioList/       # Lista de áudios processados
├── hooks/              # Custom React hooks
│   └── [hooks custom]
├── layouts/            # Layouts da aplicação
│   └── MainLayout       # Layout principal com grid responsivo
├── services/           # Serviços e lógica de negócio
│   └── audioApi.ts     # Integração com API do backend
├── types/              # Definições de tipos TypeScript
│   └── audio.ts        # Tipos para objetos de áudio
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point da aplicação
```

## Funcionalidades Implementadas

### 1. **Upload de Áudio**
- Formulário que aceita múltiplos formatos de áudio
- Spinner de carregamento durante o envio
- Feedback visual quando o upload é concluído com sucesso
- Tratamento de erros com mensagens informativas

### 2. **Lista de Áudios**
- Exibição de todos os áudios já processados
- Informações: nome do arquivo e metadados
- Atualização automática ao enviar novo arquivo
- Interface responsiva com grid layout

### 3. **Integração com API**
- Comunicação assíncrona com o servidor backend
- Gerenciamento de estado global de carregamento
- Tratamento robusto de erros HTTP

## Começando

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- Backend da aplicação rodando (veja [Backend Audio Processor](https://gitlab.com/jala-university1/cohort-1/PT.CSPR-471.GA.T1.26.M1/SA/felipe-da-conceicao-alves/capstone))

### Instalação

```bash
# Clonar repositório
git clone https://github.com/FelipeDevRec/FrontEnd-AudioProcessor.git
cd FrontEnd-AudioProcessor

# Instalar dependências
npm install

# Definir variáveis de ambiente (se necessário)
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:5173
```

### Build para Produção

```bash
# Compilar para produção
npm run build

# Visualizar build localmente
npm run preview
```

### Testes

```bash
# Executar testes
npm run test

# Executar testes com coverage
npm run test:coverage

# Mode watch para desenvolvimento
npm run test:watch
```

### Linting

```bash
# Verificar código com ESLint
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix
```

## Detalhes da Implementação

### Componente `AudioUpload`
Componente principal responsável por:
- Renderizar formulário com input de arquivo
- Gerenciar estado local de carregamento
- Exibir spinner durante upload
- Comunicar com a API via `audioApi.ts`
- Executar callback ao sucesso

**Props:**
```typescript
interface AudioUploadProps {
  onUploadSuccess?: (audio: AudioFile) => void;
}
```

### Componente `AudioList`
Responsável por:
- Receber lista de áudios como prop
- Renderizar lista com layout responsivo
- Reagir a mudanças na lista

**Props:**
```typescript
interface AudioListProps {
  audios: AudioFile[];
  onChange?: (audios: AudioFile[]) => void;
}
```

### Service `audioApi.ts`
Serviço de integração com backend:
- Método `listAudios()` - Busca lista de áudios
- Método `uploadAudio(file)` - Envia arquivo para servidor

## Testes

Os componentes principais possuem testes que verificam:
- Renderização correta do spinner durante carregamento
- Comportamento do formulário de upload
- Chamadas corretas à API
- Feedback visual em diferentes estados

## 📊 Requisitos da Atividade (Lab 4)

| Requisito | Status | Descrição |
|-----------|--------|----------|
| Criar aplicação web base | ✅ | Usando React + TypeScript + Vite |
| Formulário de upload | ✅ | Input de arquivo funcional |
| Spinner de carregamento | ✅ | Exibido durante envio |
| UX amigável | ✅ | Feedback visual e mensagens claras |
| Lista de áudios | ✅ | Exibe arquivos processados |
| Integração com API | ✅ | Comunica com backend |
| Testes | ✅ | Testes para componente de upload |
| Programação assíncrona | ✅ | Uso correto de async/await |


## 📄 Licença

Este projeto é parte da avaliação da disciplina na Jala University. Todos os direitos reservados.

---

**Desenvolvido por**: Felipe Alves  
**Período**: Semana 4 - Programação 7  
**Data**: Janeiro 2026

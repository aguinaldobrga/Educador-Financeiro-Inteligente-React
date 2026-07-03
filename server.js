import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// Compatibilidade com __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega as variáveis de ambiente do .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

// =====================================================
// Rota Principal: Chat com a Sofia AI
// =====================================================
app.post('/api/chat', async (req, res) => {
  const { message, userName, transactions, goals } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem é obrigatória' });
  }

  if (!API_KEY) {
    console.error('❌ Chave VITE_GEMINI_API_KEY não foi encontrada no .env.local');
    return res.status(500).json({ error: 'Erro de configuração no servidor: API Key ausente.' });
  }

  // Prepara o contexto de dados do usuário para enriquecer o prompt da IA
  const transactionsContext =
    transactions && transactions.length > 0
      ? transactions
          .map(
            t =>
              `- [${t.date}] ${t.description}: R$ ${t.amount} (${t.type === 'income' ? 'Receita' : 'Despesa'} - ${t.category})`
          )
          .join('\n')
      : 'Nenhuma transação cadastrada ainda.';

  const goalsContext =
    goals && goals.length > 0
      ? goals
          .map(
            g =>
              `- ${g.title}: Meta de R$ ${g.targetAmount} (Acumulado: R$ ${g.currentAmount}, Prazo: ${g.deadline})`
          )
          .join('\n')
      : 'Nenhuma meta definida.';

  const systemPrompt = `Você é a Sofia, uma assessora e educadora virtual de finanças pessoais extremamente simpática, empática e inteligente. Você trabalha para o app Plan.ia.

Dados financeiros atuais do usuário "${userName || 'Usuário'}":

📊 Transações:
${transactionsContext}

🎯 Metas financeiras:
${goalsContext}

---

Regras de comportamento:
1. Responda SEMPRE em português brasileiro, de forma clara, amigável e didática.
2. Use emojis de forma moderada para manter o papo leve e acolhedor.
3. Quando o usuário perguntar sobre saúde financeira, transações ou metas, use os dados acima para fornecer uma resposta contextualizada e precisa.
4. Para perguntas gerais de finanças (ex: "o que é LCI?", "como criar uma reserva de emergência?"), dê respostas diretas, estruturadas e fáceis de entender.
5. Nunca recomende ativos de risco específicos com certeza absoluta; sempre mencione a importância de conhecer o perfil de investidor.
6. Mantenha as respostas concisas (máximo 3 parágrafos curtos ou uma lista de até 5 tópicos) para caber bem na interface de chat.
7. Se não souber algo, seja honesto e sugira que o usuário consulte um especialista.`;

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: systemPrompt },
              { text: `Mensagem do usuário: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
          candidateCount: 1,
        }
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('❌ Erro da API Gemini:', response.status, errBody);
      throw new Error(`Erro na API do Gemini: ${response.status}`);
    }

    const data = await response.json();
    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Desculpe, não consegui processar sua mensagem no momento. Tente novamente! 😊';

    res.json({ response: aiText });
  } catch (error) {
    console.error('❌ Erro ao chamar a API do Gemini:', error.message);
    res.status(500).json({ error: 'Erro interno ao processar a resposta da IA.' });
  }
});

// =====================================================
// Health Check
// =====================================================
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    model: MODEL_NAME,
    message: 'Servidor Sofia AI funcionando ✅'
  });
});

// =====================================================
// Inicializa o servidor
// =====================================================
app.listen(PORT, () => {
  console.log(`\n✅ Servidor Sofia AI rodando na porta ${PORT}`);
  console.log(`   Modelo: ${MODEL_NAME}`);
  console.log(`   API Key configurada: ${API_KEY ? '✅ Sim' : '❌ Não encontrada no .env.local'}\n`);
});

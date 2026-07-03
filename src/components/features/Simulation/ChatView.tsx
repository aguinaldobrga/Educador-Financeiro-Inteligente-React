import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Transaction, Goal } from "@/types/types";
import { 
  Send,  
  Bot, 
  User, 
  Clock
} from 'lucide-react';

interface ChatViewProps {
  userName: string;
  transactions: Transaction[];
  goals: Goal[];
}

const PRESET_QUERIES = [
  'Como começo a montar minha reserva de emergência?',
  'Qual é a diferença básica entre Renda Fixa e Renda Variável?',
  'Como posso aplicar a regra 50/30/20 no meu dia a dia?',
  'Onde posso deixar o dinheiro do meu fundo de emergência?'
];


export function ChatView({ userName, transactions, goals }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: `Olá, ${userName}! Eu sou a Sofia, sua assistente e educadora de finanças pessoais. 👩‍💼\n\nComo posso ajudar você a planejar seu orçamento, simular investimentos ou resolver dúvidas financeiras hoje? Selecione uma das perguntas sugeridas abaixo ou escreva sua própria dúvida!`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle message submission
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(async () => {
      let responseText = '';

      // Direct API call to the server proxy with complete financial data
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: textToSend, userName, transactions, goals })
        });
        
        if (res.ok) {
          const data = await res.json();
          responseText = data.response;
        } else {
          throw new Error('API failed');
        }
      } catch (e) {
        // Fallback response for unhandled custom queries if server is not fully initialized or offline
        responseText = `Que excelente pergunta, ${userName}! Como mentora financeira, eu sugiro analisar esse ponto de perto. 

        Atualmente, para esse tipo de dúvida, recomendo avaliar duas frentes:
        1. **O impacto no seu fluxo de caixa mensal:** Isso cabe na regra dos 30% de gastos variáveis ou deve ser planejado como uma meta de longo prazo?
        2. **A taxa de juros real ou rendimento:** Se for uma oportunidade, compare com o rendimento do Tesouro Selic (10.5% - 11.5% ao ano) para ver se compensa.

        Gostaria de detalhar melhor qual o valor envolvido ou qual prazo você está planejando?`;
        }

      const aiMsg: ChatMessage = {
        id: `m-${Date.now()}-ai`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id="chat-view" className="bg-card/40 border border-border/50 rounded-2xl flex flex-col h-[70vh] backdrop-blur-sm overflow-hidden">
      
      {/* Chat Header */}
      <div className="bg-background/60 p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-md">
            <Bot size={22} className="animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold font-display text-foreground text-sm">Sofia AI</h3>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            </div>

            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Assessora Virtual
            </span>
          </div>
        </div>

        <div 
          className="flex items-center gap-1.5 bg-card px-3 py-1.5 rounded-lg border border-border text-[10px] text-muted-foreground font-semibold font-mono">
          <Clock size={12} className="text-primary" />
          <span>Online • {now.toLocaleTimeString('pt-BR')}</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m) => {
          const isAI = m.sender === 'ai';
          return (
            <div 
              key={m.id} 
              className={`flex gap-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isAI ? 'bg-primary/15 text-primary' : 'bg-secondary-button text-foreground'
              }`}>
                {isAI ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 whitespace-pre-wrap ${
                isAI 
                  ? 'bg-background/50 text-foreground border border-border' 
                  : 'bg-primary text-primary-foreground shadow-lg'
              }`}>
                <p>{m.text}</p>
              </div>
            </div>
          );
        })}

        {/* Typing Loader Indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[80%] mr-auto">
            <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-background/30 text-muted-foreground p-3.5 rounded-2xl border border-border text-xs flex items-center gap-1.5">
              <span className="animate-bounce inline-block w-1 h-1 bg-muted-foreground rounded-full"></span>
              <span className="animate-bounce inline-block w-1 h-1 bg-muted-foreground rounded-full [animation-delay:0.2s]"></span>
              <span className="animate-bounce inline-block w-1 h-1 bg-muted-foreground rounded-full [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Sofia está analisando...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Preset quick queries list */}
      {messages.length === 1 && !isTyping && (
        <div className="p-4 bg-background/20 border-t border-border space-y-2">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Perguntas Frequentes</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUERIES.map((query) => (
              <button
                key={query}
                id={`preset-chat-${query.slice(0,10)}`}
                onClick={() => handleSendMessage(query)}
                className="text-left text-[11px] bg-card hover:bg-secondary-button text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl border border-border transition-colors cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Message Form */}
      <div className="p-4 bg-background/60 border-t border-border flex gap-2">
        <input
          id="chat-message-input"
          type="text"
          placeholder="Tire suas dúvidas financeiras com a Sofia..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping}
          className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-xs text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors"
        />
        <button
          id="chat-send-btn"
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isTyping}
          className={`px-4.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            inputText.trim() && !isTyping 
              ? 'bg-primary hover:opacity-90 text-primary-foreground' 
              : 'bg-secondary-button text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Send size={15} />
        </button>
      </div>

    </div>
  );
}

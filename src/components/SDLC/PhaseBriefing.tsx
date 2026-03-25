import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, FileText, ChevronRight, Activity, FastForward } from 'lucide-react';
import type { Scenario } from '../../data/scenarios';

interface PhaseBriefingProps {
  scenario: Scenario;
  onComplete: (data: any) => void;
}

const PhaseBriefing = ({ scenario, onComplete }: PhaseBriefingProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let index = 0;
    const messages = Array.isArray(scenario.briefing) ? scenario.briefing : [scenario.briefing || "Resumo não disponível."];
    setDisplayedMessages([]);
    setIsTyping(true);

    const interval = setInterval(() => {
      setDisplayedMessages((prev) => [...prev, messages[index]]);
      index++;
      if (index >= messages.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 3000); // 3 segundos por mensagem realça o "Digitando..." e consome os 1-2 minutos de introdução gradativa.

    return () => clearInterval(interval);
  }, [scenario]);

  useEffect(() => {
     if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
     }
  }, [displayedMessages, isTyping]);

  const handleSkip = () => {
    const messages = Array.isArray(scenario.briefing) ? scenario.briefing : [scenario.briefing || ""];
    setDisplayedMessages(messages);
    setIsTyping(false);
  };

  const handleFinish = () => {
    onComplete({ accepted: true, projectType: scenario.projectType });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '850px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', maxHeight: '85vh' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={24} color="var(--primary-color)" /> Reunião de Abertura (Briefing)
        </h3>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Activity size={16} /> Complexidade Exigida: <strong>{scenario.complexity}</strong>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        background: 'var(--panel-bg)', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid var(--panel-border)',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* Stakeholder Avatar Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '130px', borderRight: '1px solid var(--panel-border)', paddingRight: '1rem' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary-color)' }}>
            <User size={35} color="var(--primary-color)" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{scenario.stakeholder}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{scenario.role}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary-color)', marginTop: '4px', fontWeight: 'bold' }}>@{scenario.company}</div>
          </div>
          
          <div style={{ marginTop: 'auto', width: '100%', borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
             <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px' }}>Status</div>
             <div style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> Online
             </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div ref={chatRef} style={{ 
            flex: 1, 
            overflowY: 'auto', 
            paddingRight: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
             {displayedMessages.map((msg, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   style={{ 
                     background: 'var(--input-bg)', 
                     padding: '1rem 1.2rem', 
                     borderRadius: '12px',
                     borderTopLeftRadius: '0',
                     border: '1px solid var(--panel-border)',
                     fontSize: '1.05rem',
                     lineHeight: '1.6',
                     alignSelf: 'flex-start',
                     maxWidth: '90%'
                   }}
                >
                   {msg}
                </motion.div>
             ))}
             {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '0.9rem' }}>
                   Um cliente está digitando... <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>✏️</motion.span>
                </div>
             )}
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
             <div className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <FileText size={16} color="var(--primary-color)" /> Projeto Requerido: <strong>{scenario.theme}</strong>
             </div>
             <div className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <FileText size={16} color="var(--primary-color)" /> Formato de Delivery: <strong>{scenario.projectType}</strong>
             </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        {isTyping ? (
           <button 
             onClick={handleSkip}
             className="btn-premium" 
             style={{ background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px' }}>
             <FastForward size={16} /> Pular Diálogo
           </button>
        ) : <div />}

        <button 
          className="btn-premium" 
          onClick={handleFinish}
          disabled={isTyping}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isTyping ? 0.5 : 1, padding: '12px 24px', fontSize: '1.1rem' }}
        >
          {isTyping ? 'Reunião em Andamento...' : 'Aceitar Termos e Iniciar Projeto'} 
          {!isTyping && <ChevronRight size={20} />}
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseBriefing;

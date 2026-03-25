import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, User, FileText, ChevronRight, Activity } from 'lucide-react';
import type { Scenario } from '../../data/scenarios';

interface PhaseBriefingProps {
  scenario: Scenario;
  onComplete: (data: any) => void;
}

const PhaseBriefing = ({ scenario, onComplete }: PhaseBriefingProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const text = scenario.briefing || "Resumo não disponível.";
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20); // Typing speed

    return () => clearInterval(interval);
  }, [scenario]);

  const handleFinish = () => {
    onComplete({ accepted: true, projectType: scenario.projectType });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={24} color="var(--primary-color)" /> Fase 1: Briefing do Cliente
        </h3>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Activity size={16} /> Complexidade Esperada: <strong>{scenario.complexity}</strong>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        background: 'rgba(0,0,0,0.2)', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid var(--panel-border)'
      }}>
        {/* Stakeholder Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '120px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary-color)' }}>
            <User size={32} color="var(--primary-color)" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>{scenario.stakeholder}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{scenario.role}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>@{scenario.company}</div>
          </div>
        </div>

        {/* Message Bubble */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ 
            background: 'var(--panel-bg)', 
            padding: '1.5rem', 
            borderRadius: '12px',
            borderTopLeftRadius: '0',
            border: '1px solid var(--panel-border)',
            minHeight: '120px',
            fontSize: '1.05rem',
            lineHeight: '1.6'
          }}>
            {displayedText}
            {isTyping && <span className="typing-cursor">|</span>}
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
             <div className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <FileText size={16} color="var(--primary-color)" /> Projeto: <strong>{scenario.theme}</strong>
             </div>
             <div className="glass-panel" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <FileText size={16} color="var(--primary-color)" /> Formato: <strong>{scenario.projectType}</strong>
             </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button 
          className="btn-premium" 
          onClick={handleFinish}
          disabled={isTyping}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isTyping ? 0.5 : 1 }}
        >
          {isTyping ? 'Lendo...' : 'Aceitar Projeto Oficialmente'} 
          {!isTyping && <ChevronRight size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseBriefing;

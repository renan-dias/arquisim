import { motion } from 'framer-motion';
import { Search, ShieldAlert, Rocket } from 'lucide-react';
import type { Scenario } from '../../data/scenarios';

interface PhaseReviewProps {
  projectData: any;
  scenario: Scenario;
  onComplete: () => void;
}

const PhaseReview = ({ projectData, scenario, onComplete }: PhaseReviewProps) => {
  const diff = 10000 - projectData.architecture.expectedStats.cost;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '800px', width: '100%' }}
    >
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Search size={24} color="var(--primary-color)" /> Revisão Estratégica Pré-Lançamento
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Resumo do Software</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><strong>Projeto:</strong> {projectData.briefing?.companyName}</li>
            <li><strong>Cliente:</strong> {scenario.stakeholder} ({scenario.company})</li>
            <li><strong>Arquitetura:</strong> {projectData.architecture?.architecture}</li>
            <li><strong>Linguagem:</strong> {projectData.architecture?.language}</li>
            <li><strong>Banco (BD):</strong> {projectData.architecture?.database}</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
           <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Status do Lançamento</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>Capital Investido:</span>
               <span style={{ color: '#ef4444' }}>$-{projectData.architecture.expectedStats.cost}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>Caixa Restante:</span>
               <span style={{ color: '#10b981' }}>${diff}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--panel-border)', paddingTop: '1rem' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldAlert size={16} color="#f59e0b" /> Bugs Pendentes:</span>
               <span style={{ color: projectData.bugs > 0 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{projectData.bugs} {projectData.bugs === 0 ? '(Clean)' : ''}</span>
             </div>
           </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Você está prestes a colocar este código em Produção. Seus bugs não resolvidos começarão a afetar seus usuários e gerarão Reclamações que drenarão seu capital. Você está pronto?
        </p>
        <button className="btn-premium" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }} onClick={onComplete}>
          <Rocket size={24} /> Lançar para Produção!
        </button>
      </div>
    </motion.div>
  );
};

export default PhaseReview;

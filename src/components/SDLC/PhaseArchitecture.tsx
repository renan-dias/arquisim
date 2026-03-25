import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Code, Shield } from 'lucide-react';

export interface TechOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  time: number;
  bugRisk: number;
  icon: any;
}

export const architectures: TechOption[] = [
  { id: 'monolith', name: 'Monólito Tradicional', description: 'Tudo no mesmo servidor. Rápido e barato, mas difícil de escalar.', cost: 500, time: 2, bugRisk: 20, icon: Server },
  { id: 'microservices', name: 'Microserviços', description: 'Serviços isolados. Caro e demorado, mas escala infinitamente.', cost: 2000, time: 5, bugRisk: 40, icon: Server },
  { id: 'serverless', name: 'Serverless (Cloud)', description: 'Funções sob demanda. Custo pago por uso, arquitetura moderna.', cost: 1200, time: 3, bugRisk: 15, icon: Server },
  { id: 'event_driven', name: 'Event-Driven', description: 'Orientado a eventos em tempo real. Alta performance, mais complexo.', cost: 1800, time: 4, bugRisk: 35, icon: Server },
  { id: 'soa', name: 'SOA (Service Oriented)', description: 'Serviços orientados a Enterprise. Caro e pesado.', cost: 2500, time: 6, bugRisk: 10, icon: Server }
];

export const languages: TechOption[] = [
  { id: 'js', name: 'JavaScript / Node', description: 'Ecosistema rico, dinâmica pode gerar bugs furtivos.', cost: 300, time: 1, bugRisk: 30, icon: Code },
  { id: 'java', name: 'Java', description: 'Sólido, Enterprise, tipado. Mais lento pra escrever.', cost: 800, time: 4, bugRisk: 10, icon: Code },
  { id: 'python', name: 'Python', description: 'Excelente para IA e dados. Pode ter gargalos de performance.', cost: 400, time: 2, bugRisk: 25, icon: Code },
  { id: 'go', name: 'Go (Golang)', description: 'Alta performance, compilação super rápida.', cost: 700, time: 3, bugRisk: 15, icon: Code },
  { id: 'rust', name: 'Rust', description: 'Memória segura por padrão. Curva de aprendizado íngreme.', cost: 1000, time: 5, bugRisk: 5, icon: Code },
  { id: 'ruby', name: 'Ruby on Rails', description: 'Desenvolvimento extremamente rápido, custo de servidor.', cost: 400, time: 1, bugRisk: 25, icon: Code },
  { id: 'php', name: 'PHP', description: 'Fácil hospedagem em qualquer lugar. Famoso monólito.', cost: 200, time: 1, bugRisk: 30, icon: Code }
];

export const databases: TechOption[] = [
  { id: 'sql', name: 'SQL (Postgres/MySQL)', description: 'Dados estruturados e relacionais. Seguro.', cost: 400, time: 2, bugRisk: 10, icon: Database },
  { id: 'nosql', name: 'NoSQL (MongoDB)', description: 'Esquema livre. Ótimo para crescimento rápido.', cost: 300, time: 1, bugRisk: 25, icon: Database },
  { id: 'graph', name: 'Graph (Neo4j)', description: 'Relacionamento complexo focado em redes.', cost: 900, time: 3, bugRisk: 20, icon: Database },
  { id: 'cache', name: 'Cache (Redis)', description: 'Altíssima velocidade na RAM. Perde dados se desligar.', cost: 600, time: 2, bugRisk: 15, icon: Database },
  { id: 'warehouse', name: 'Data Warehouse', description: 'Focado em Analytics e BI gigantesco.', cost: 1500, time: 4, bugRisk: 10, icon: Database }
];

interface PhaseArchitectureProps {
  onComplete: (data: any) => void;
}

const PhaseArchitecture = ({ onComplete }: PhaseArchitectureProps) => {
  const [selectedArch, setSelectedArch] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [selectedDb, setSelectedDb] = useState<string>('');

  const calculateExpectedStats = () => {
    const arch = architectures.find(a => a.id === selectedArch);
    const lang = languages.find(l => l.id === selectedLang);
    const db = databases.find(d => d.id === selectedDb);

    if (!arch || !lang || !db) return null;

    return {
      cost: arch.cost + lang.cost + db.cost,
      time: arch.time + lang.time + db.time,
      bugRisk: arch.bugRisk + lang.bugRisk + db.bugRisk
    };
  };

  const expectedStats = calculateExpectedStats();

  const handleProceed = () => {
    if (expectedStats) {
      onComplete({
        architecture: selectedArch,
        language: selectedLang,
        database: selectedDb,
        expectedStats
      });
    }
  };

  const renderOption = (item: TechOption, selectedId: string, onSelect: (id: string) => void) => {
    const isSelected = selectedId === item.id;
    const Icon = item.icon;
    return (
      <div 
        key={item.id}
        onClick={() => onSelect(item.id)}
        style={{
          padding: '1rem',
          border: `2px solid ${isSelected ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '8px',
          background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Icon size={18} color={isSelected ? 'var(--primary-color)' : 'var(--text-secondary)'} />
          <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{item.name}</h4>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', minHeight: '40px' }}>
          {item.description}
        </p>
        <div style={{ fontSize: '0.75rem', display: 'flex', gap: '12px', color: 'var(--text-secondary)' }}>
          <span>💰 ${item.cost}</span>
          <span>⏱️ {item.time}s</span>
          <span>🐛 {item.bugRisk}%</span>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '1000px', width: '100%' }}
    >
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Shield size={24} color="var(--primary-color)" /> Fase 2: Decisões Arquiteturais
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        
        <div>
          <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>Arquitetura</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {architectures.map(a => renderOption(a, selectedArch, setSelectedArch))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>Linguagem</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {languages.map(l => renderOption(l, selectedLang, setSelectedLang))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--panel-border)', paddingBottom: '0.5rem' }}>Banco de Dados</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {databases.map(d => renderOption(d, selectedDb, setSelectedDb))}
          </div>
        </div>
        
      </div>

      {expectedStats && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            marginTop: '2rem', 
            padding: '1.5rem', 
            background: 'rgba(0,0,0,0.2)', 
            borderRadius: '8px',
            border: '1px solid var(--primary-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h4 style={{ color: 'var(--primary-color)', marginBottom: '8px' }}>Projeção da Sprint</h4>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div><strong>Custo Base:</strong> ${expectedStats.cost}</div>
              <div><strong>Tempo Base:</strong> {expectedStats.time} Sprints</div>
              <div><strong>Risco de Bugs:</strong> {expectedStats.bugRisk}%</div>
            </div>
          </div>
          <button className="btn-premium" onClick={handleProceed}>
            Aprovar Arquitetura
          </button>
        </motion.div>
      )}

    </motion.div>
  );
};

export default PhaseArchitecture;

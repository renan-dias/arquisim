import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, CheckCircle, Code, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Scenario } from '../../data/scenarios';

interface PhaseImplementationProps {
  stats: { time: number; bugRisk: number };
  scenario: Scenario;
  onComplete: (bugs: number) => void;
}

interface MinigameBug { id: number; x: number; y: number; }
interface CodeLine { id: number; text: string; isError: boolean }

const projectStages: Record<string, string[]> = {
  'Web App': ['Modelagem de Dados', 'Desenvolvimento de API', 'Frontend e Integração'],
  'Mobile App': ['Prototipagem de UI', 'Desenvolvimento Nativo', 'Integração de Notificações e Auth'],
  'API': ['Definição de Rotas REST', 'Regras de Negócio e Segurança', 'Testes de Carga'],
  'Desktop': ['Estruturação do Core Logics', 'Acessibilidade de UI', 'Gerador de Instalador OS'],
  'Data Pipeline': ['Crawler e Web Scraping', 'Tratamento de Dados Brutos', 'Armazenamento em Data Warehouse'],
  'IoT': ['Firmware dos Sensores', 'Protocolo MQTT', 'Sincronização Cloud']
};

const hackerCodeSnippets = [
  "import { core } from '@system/engine';",
  "function optimizeMemoryLeack(heap) {",
  "  if (heap > MAX_ALLOC) return abort();",
  "  gc.run(true); // force run",
  "}",
  "await database.connect(process.env.DB_URI);",
  "const results = yield db.query('SELECT * FROM users');",
  "if (!results) throw new DataError();",
  "renderDOM(AppCpn, document.getElementById('root'));",
  "const socket = new WebSocket('ws://localhost:8080');",
  "socket.on('message', handleRealTimeUpdates);",
  "crypto.createHash('sha256').update(pwd).digest('hex');",
  "docker.run('-d', '-p', '80:80', 'nginx:latest');",
  "cluster.fork();",
  "try { compile() } catch (e) { fallback() }",
  "module.exports = { startServer };",
  "const matrix = new Array(1024).fill(0).map(() => Math.random());",
  "console.log('Mounting components...', performance.now());",
  "export const config = { runtime: 'edge', regions: ['iad1'] };",
  "class Singleton { static getInstance() { return instance; } }",
  "let observer = new IntersectionObserver((entries) => { ... });",
  "fetch('https://api.github.com/').then(r => r.json());"
];

const PhaseImplementation = ({ stats, scenario, onComplete }: PhaseImplementationProps) => {
  const sprintDurationMs = (stats?.time || 3) * 3000; 
  const stages = projectStages[scenario.projectType] || ['Análise', 'Desenvolvimento', 'Testes'];
  
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isStageRunning, setIsStageRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [activeBugs, setActiveBugs] = useState<MinigameBug[]>([]);
  const [bugsSquashed, setBugsSquashed] = useState(0);
  const [missedBugs, setMissedBugs] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Hacker typing states
  const [typedLines, setTypedLines] = useState<CodeLine[]>([]);
  const codeEndRef = useRef<HTMLDivElement>(null);
  const lineCounter = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const bugIdCounter = useRef(0);

  useEffect(() => {
    if (codeEndRef.current) {
      codeEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typedLines]);

  useEffect(() => {
    if (!isStageRunning) return;

    let startTime = Date.now();
    let isRunning = true;

    // Progress Bar Loop
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / sprintDurationMs) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(progressInterval);
        setIsStageRunning(false);
        isRunning = false;

        // Limpa erros ao passar de etapa
        if (currentStageIndex < stages.length - 1) {
          setCurrentStageIndex(c => c + 1);
          setProgress(0);
          toast.success(`Etapa "${stages[currentStageIndex]}" concluída! Inicie a próxima.`);
        } else {
          setIsFinished(true);
        }
      }
    }, 100);

    // Bug Spawner Loop
    const spawnRate = Math.max(800, 3000 - (stats.bugRisk * 30)); 
    const spawnInterval = setInterval(() => {
      if (!isRunning) return;
      if (Math.random() * 100 < stats.bugRisk * 1.5) {
        spawnBug();
      }
    }, spawnRate);

    return () => {
      clearInterval(progressInterval);
      clearInterval(spawnInterval);
      isRunning = false;
    };
  }, [isStageRunning, currentStageIndex, sprintDurationMs, stats.bugRisk, stages]);

  // Hacker Typing Effect Loop
  useEffect(() => {
    if (!isStageRunning) return;
    
    let isTyping = true;
    
    const typeLine = () => {
       if (!isTyping) return;
       // Speed gets much faster as progress increases
       const typingSpeed = Math.max(10, 150 - (progress * 1.4));
       const hasBugs = activeBugs.length > 0;
       
       setTypedLines(prev => {
         const rawLine = hackerCodeSnippets[Math.floor(Math.random() * hackerCodeSnippets.length)];
         const text = hasBugs ? `[ERROR] ${rawLine} - SIGSEGV` : rawLine;
         const newLine = { id: lineCounter.current++, text, isError: hasBugs };
         return [...prev, newLine].slice(-40); // allow filling the whole container background
       });

       setTimeout(typeLine, typingSpeed);
    };

    setTimeout(typeLine, 100);

    return () => { isTyping = false; };
  }, [isStageRunning, activeBugs.length, progress]);

  // Bug expiration
  useEffect(() => {
    if (activeBugs.length > 0 && !isFinished) {
      const timer = setTimeout(() => {
        setActiveBugs(prev => {
          if (prev.length > 0) {
            setMissedBugs(m => m + 1);
            return prev.slice(1);
          }
          return prev;
        });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [activeBugs, isFinished]);

  const spawnBug = () => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newBug: MinigameBug = {
      id: bugIdCounter.current++,
      // subtract padding and bug size to avoid spawning outside
      x: Math.max(10, Math.random() * (width - 60)),
      y: Math.max(10, Math.random() * (height - 60)),
    };
    setActiveBugs(prev => [...prev, newBug]);
  };

  const squashBug = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveBugs(prev => prev.filter(b => b.id !== id));
    setBugsSquashed(prev => prev + 1);
  };

  const startNextStage = () => {
    setTypedLines([{ id: lineCounter.current++, text: `// Iniciando: ${stages[currentStageIndex]}...`, isError: false }]);
    setIsStageRunning(true);
  };

  const handleFinish = () => {
    const finalMissed = missedBugs + activeBugs.length;
    toast(`Todas as sub-etapas concluídas! Vocês deixaram escapar ${finalMissed} bugs.`, { icon: '🏁' });
    onComplete(finalMissed);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={24} color="var(--primary-color)" /> Fase 4: Implementação ({scenario.projectType})
        </h3>
        <div style={{ display: 'flex', gap: '1rem', fontWeight: 'bold' }}>
           <span style={{ color: '#10b981' }}>Corrigidos: {bugsSquashed}</span>
           <span style={{ color: '#ef4444' }}>Abertos: {missedBugs + activeBugs.length}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {stages.map((stage, idx) => (
          <div key={idx} style={{ 
            flex: 1, 
            padding: '8px', 
            textAlign: 'center', 
            fontSize: '0.8rem',
            background: idx < currentStageIndex || isFinished ? 'rgba(16, 185, 129, 0.2)' : idx === currentStageIndex ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.2)',
            border: idx === currentStageIndex ? '1px solid var(--primary-color)' : '1px solid var(--panel-border)',
            borderRadius: '4px',
            color: idx < currentStageIndex || isFinished ? '#10b981' : idx === currentStageIndex ? '#fff' : 'var(--text-secondary)'
          }}>
            {stage}
          </div>
        ))}
      </div>

      {!isStageRunning && !isFinished && (
        <button className="btn-premium" onClick={startNextStage} style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
           <Play size={18} /> Iniciar Etapa: {stages[currentStageIndex]}
        </button>
      )}

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '2rem' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: 'var(--primary-color)',
            transition: 'width 0.1s linear'
          }} 
        />
      </div>

      {/* IDE Editor Minigame Area */}
      <div 
        ref={containerRef}
        style={{ 
          height: '400px', 
          background: '#0f172a', 
          borderRadius: '8px', 
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--panel-border)',
          fontFamily: 'monospace',
          color: '#10b981',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', userSelect: 'none', pointerEvents: 'none', opacity: 0.35 }}>
           {typedLines.map(line => (
              <div 
                key={line.id} 
                style={{ 
                  background: line.isError ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  color: line.isError ? '#ef4444' : '#10b981',
                  padding: '2px 4px',
                  borderRadius: '2px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'clip'
                }}
              >
                <span style={{ opacity: 0.5, marginRight: '8px' }}>{String(line.id).padStart(3, '0')}</span>
                {line.text}
              </div>
           ))}
           <div ref={codeEndRef} />
        </div>

        <AnimatePresence>
          {activeBugs.map(bug => (
            <motion.div
              key={bug.id}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(e: any) => squashBug(e, bug.id)}
              style={{
                position: 'absolute',
                left: bug.x,
                top: bug.y,
                width: '40px',
                height: '40px',
                background: 'rgba(239, 68, 68, 0.4)',
                border: '2px solid #ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'crosshair',
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)',
                zIndex: 5
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Bug size={24} color="#ef4444" />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isFinished && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             style={{
               position: 'absolute',
               inset: 0,
               background: 'rgba(0,0,0,0.85)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white',
               zIndex: 10
             }}
           >
             <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
             <h2 style={{ marginBottom: '0.5rem' }}>Pipeline Concluído!</h2>
             <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>A base de código foi compilada com as etapas requeridas.</p>
             <button className="btn-premium" onClick={handleFinish}>
               Ir para Registro de Domínio
             </button>
           </motion.div>
        )}
      </div>

    </motion.div>
  );
};

export default PhaseImplementation;

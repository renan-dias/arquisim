import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import PhaseBriefing from '../components/SDLC/PhaseBriefing';
import PhasePlanning from '../components/SDLC/PhasePlanning';
import PhaseArchitecture from '../components/SDLC/PhaseArchitecture';
import PhaseImplementation from '../components/SDLC/PhaseImplementation';
import PhaseDomain from '../components/SDLC/PhaseDomain';
import PhaseReview from '../components/SDLC/PhaseReview';
import PhaseLaunch from '../components/SDLC/PhaseLaunch';
import GlobalNotepad from '../components/GlobalNotepad';

import { scenarios } from '../data/scenarios';
import type { Scenario } from '../data/scenarios';

const PlayerRoom = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [projectData, setProjectData] = useState<any>({});
  const [scenario, setScenario] = useState<Scenario | null>(null);
  
  const [studentName, setStudentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [money, setMoney] = useState(10000);

  // Lê o estado inicial do localStorage
  useEffect(() => {
    const savedStateStr = localStorage.getItem('arquisim_player_state');
    if (savedStateStr) {
      try {
        const state = JSON.parse(savedStateStr);
        setStudentName(state.studentName || 'CEO');
        setCompanyName(state.companyName || 'Empresa V2');
        setMoney(state.money !== undefined ? state.money : 10000);
        setCurrentPhase(state.currentPhase || 1);
        setProjectData(state.projectData || {});

        // Cenário
        if (!state.scenarioId) {
          const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
          setScenario(randomScenario);
          state.scenarioId = randomScenario.id;
          localStorage.setItem('arquisim_player_state', JSON.stringify(state));
        } else {
          setScenario(scenarios.find(s => s.id === state.scenarioId) || scenarios[0]);
        }
      } catch (e) {
        console.error('Erro ao ler state local', e);
      }
    } else {
      // Fallback de segurança se acessar a rota diretamente
      setStudentName('Arquiteto Chefe');
      setCompanyName('Corporação V2');
      setScenario(scenarios[0]);
      setCurrentPhase(1);
    }
  }, []);

  const persistPhase = async (phaseNum: number, extraData: any = {}, newMoney?: number) => {
    setCurrentPhase(phaseNum);
    setProjectData((prevData: any) => {
      const updatedProjectData = { ...prevData, ...extraData };
      const savedStateStr = localStorage.getItem('arquisim_player_state');
      if (savedStateStr) {
        try {
          const state = JSON.parse(savedStateStr);
          state.currentPhase = phaseNum;
          state.projectData = updatedProjectData;
          if (newMoney !== undefined) state.money = newMoney;
          localStorage.setItem('arquisim_player_state', JSON.stringify(state));
        } catch (e) {
          console.error(e);
        }
      }
      return updatedProjectData;
    });
    if (newMoney !== undefined) setMoney(newMoney);
  };

  const handleCompleteBriefing = async (briefingData: any) => {
    await persistPhase(2, { briefing: briefingData });
  };

  const handleCompletePlanning = async (planningData: any) => {
    await persistPhase(3, { planning: planningData });
  };

  const handleCompleteArchitecture = async (archData: any) => {
    await persistPhase(4, { architecture: archData });
  };

  const handleCompleteImplementation = async (bugsGenerated: number) => {
    await persistPhase(5, { bugs: bugsGenerated });
  };

  const handleCompleteDomain = async (domainData: any) => {
    const newMoney = money - domainData.price;
    await persistPhase(6, { domain: domainData }, newMoney);
  };

  const handleCompleteReview = async () => {
    await persistPhase(7);
    toast.success('Sistema lançado globalmente em ambiente local/offline!');
  };

  const handleUpdateRelease = async (featureName: string, _featureDesc: string) => {
    await persistPhase(2);
    if (featureName) {
      toast(`Iniciando o desenvolvimento da feature: ${featureName}`, { icon: '✨' });
    } else {
      toast('Retornando à prancheta de Modelagem...', { icon: '🏗️' });
    }
  };

  const handleLiveMoneyUpdate = (newTotal: number) => {
    const floored = Math.floor(newTotal);
    setMoney(floored);
    const savedStateStr = localStorage.getItem('arquisim_player_state');
    if (savedStateStr) {
      try {
        const state = JSON.parse(savedStateStr);
        state.money = floored;
        localStorage.setItem('arquisim_player_state', JSON.stringify(state));
      } catch (e) {
        // ignore
      }
    }
  };

  const phaseNames = [
    'Aguardando Host', 
    'Briefing', 
    'Modelagem Lógica (UML)', 
    'Arquitetura', 
    'Sprints de Implementação', 
    'Registro de Domínio',
    'Revisão Pré-Deploy', 
    'Lançamento & Operação Vivo'
  ];

  return (
    <div className="page-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {companyName || 'Carregando...'}
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}> CEO: {studentName}</span>
          </h2>
          <span style={{ color: 'var(--text-secondary)' }}>Modo: Offline V2 | Caixa: <span style={{ color: money >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>${money.toLocaleString()}</span></span>
        </div>
        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--primary-color)" />
          <span>Fase: {phaseNames[currentPhase]}</span>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {currentPhase === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Iniciando Simulação Local...</h3>
            <div style={{ marginTop: '2rem' }} className="loader"></div>
          </motion.div>
        )}
        
        {currentPhase === 1 && scenario && <PhaseBriefing scenario={scenario} onComplete={handleCompleteBriefing} />}
        {currentPhase === 2 && <PhasePlanning onComplete={handleCompletePlanning} />}
        {currentPhase === 3 && <PhaseArchitecture scenario={scenario} onComplete={handleCompleteArchitecture} />}
        {currentPhase === 4 && scenario && <PhaseImplementation scenario={scenario} stats={projectData.architecture?.expectedStats} onComplete={handleCompleteImplementation} />}
        {currentPhase === 5 && <PhaseDomain companyName={companyName} projectData={projectData} onComplete={handleCompleteDomain} />}
        {currentPhase === 6 && scenario && <PhaseReview scenario={scenario} projectData={projectData} onComplete={handleCompleteReview} />}
        {currentPhase === 7 && <PhaseLaunch roomId="solo" playerId="local" stats={projectData.architecture?.expectedStats} bugs={projectData.bugs || 0} currentMoney={money} companyName={companyName} studentName={studentName} projectData={projectData} scenario={scenario} onUpdateMoney={handleLiveMoneyUpdate} onLaunchUpdate={handleUpdateRelease} />}
      </main>
      <GlobalNotepad />
    </div>
  );
};

export default PlayerRoom;

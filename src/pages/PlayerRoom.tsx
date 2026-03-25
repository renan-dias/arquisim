import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

import PhaseBriefing from '../components/SDLC/PhaseBriefing';
import PhasePlanning from '../components/SDLC/PhasePlanning';
import PhaseArchitecture from '../components/SDLC/PhaseArchitecture';
import PhaseImplementation from '../components/SDLC/PhaseImplementation';
import PhaseDomain from '../components/SDLC/PhaseDomain';
import PhaseReview from '../components/SDLC/PhaseReview';
import PhaseLaunch from '../components/SDLC/PhaseLaunch';

import { scenarios } from '../data/scenarios';
import type { Scenario } from '../data/scenarios';
import toast from 'react-hot-toast';

const PlayerRoom = () => {
  const { roomId, playerId } = useParams();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [projectData, setProjectData] = useState<any>({});
  const [scenario, setScenario] = useState<Scenario | null>(null);
  
  const [studentName, setStudentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [money, setMoney] = useState(10000);

  useEffect(() => {
    if (!roomId || !playerId) return;

    const playerRef = doc(db, 'rooms', roomId, 'players', playerId);
    
    getDoc(playerRef).then((snap) => {
       if (snap.exists()) {
          const data = snap.data();
          setStudentName(data.studentName || '');
          setCompanyName(data.companyName || '');
          setMoney(data.money || 10000);

          if (!data.scenarioId) {
             const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
             updateDoc(playerRef, { scenarioId: randomScenario.id });
             setScenario(randomScenario);
          } else {
             setScenario(scenarios.find(s => s.id === data.scenarioId) || scenarios[0]);
          }
       }
    });

    const roomRef = doc(db, 'rooms', roomId);
    let lastEventCount = 0;

    const unsubRoom = onSnapshot(roomRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        
        setCurrentPhase(prev => {
           if (data.isClosed) return 999;
           if (data.isActive && prev === 0) return 1;
           return prev;
        });
        
        const currentEventCount = Object.values(data.globalEvents || {}).filter(Boolean).length;
        if (currentEventCount > lastEventCount) {
           setCurrentPhase(prev => {
             if (prev > 0 && prev !== 999) {
               toast('⚠️ Um Evento Global Ocorreu no Mercado!', { icon: '🌍', style: { border: '1px solid var(--danger-color)' } });
             }
             return prev;
           });
        }
        lastEventCount = currentEventCount;
      }
    });

    const unsubPlayer = onSnapshot(playerRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.currentPhase > currentPhase) {
          setCurrentPhase(data.currentPhase);
        }
        if (data.projectData) {
          setProjectData(data.projectData);
        }
        if (data.money !== undefined) setMoney(data.money);
      }
    });

    return () => {
      unsubRoom();
      unsubPlayer();
    };
  }, [roomId, playerId]);

  const persistPhase = async (phaseNum: number, extraData: any = {}, newMoney?: number) => {
    if (!roomId || !playerId) return;
    const playerRef = doc(db, 'rooms', roomId, 'players', playerId);
    
    // In V3 we also persist the bank balance when moving phases
    const updatePayload: any = {
      currentPhase: phaseNum,
      projectData: { ...projectData, ...extraData }
    };
    if (newMoney !== undefined) updatePayload.money = newMoney;

    await updateDoc(playerRef, updatePayload);
  };

  const handleCompleteBriefing = async (briefingData: any) => {
    setProjectData({ ...projectData, briefing: briefingData });
    setCurrentPhase(2);
    await persistPhase(2, { briefing: briefingData });
  };

  const handleCompletePlanning = async (planningData: any) => {
    setProjectData({ ...projectData, planning: planningData });
    setCurrentPhase(3);
    await persistPhase(3, { planning: planningData });
  };

  const handleCompleteArchitecture = async (archData: any) => {
    setProjectData({ ...projectData, architecture: archData });
    setCurrentPhase(4);
    await persistPhase(4, { architecture: archData });
  };

  const handleCompleteImplementation = async (bugsGenerated: number) => {
    setProjectData({ ...projectData, bugs: bugsGenerated });
    setCurrentPhase(5); 
    await persistPhase(5, { bugs: bugsGenerated });
  };

  const handleCompleteDomain = async (domainData: any) => {
    const newMoney = money - domainData.price;
    setMoney(newMoney);
    setProjectData({ ...projectData, domain: domainData });
    setCurrentPhase(6); 
    await persistPhase(6, { domain: domainData }, newMoney);
  };

  const handleCompleteReview = async () => {
    setCurrentPhase(7); 
    await persistPhase(7);

    // Notifica Global as V3 Expansion Request
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        [`announcements.${Date.now()}`]: `NOVO LANÇAMENTO: O Aluno ${studentName} (Empresa: ${companyName}) lançou o sistema do cliente ${scenario?.company} no mercado global!`
      });
    }
  };

  const handleUpdateRelease = async () => {
    // Restart logic from Sprint but keeping architecture and funds
    setCurrentPhase(4);
    await persistPhase(4);
    toast('Voltando para as Trincheiras! Arrumem esses bugs!', { icon: '🛠️' });
  };

  const handleLiveMoneyUpdate = (newTotal: number) => {
    if (Math.abs(money - newTotal) > 500) { // Throttle writes slightly
      setMoney(Math.floor(newTotal));
      // update firebase locally too so it syncs up to admin
      if (roomId && playerId) {
         updateDoc(doc(db, 'rooms', roomId, 'players', playerId), { money: Math.floor(newTotal) });
      }
    } else {
      setMoney(Math.floor(newTotal));
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
          <span style={{ color: 'var(--text-secondary)' }}>Sala: {roomId} | Caixa: <span style={{ color: money >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>${money.toLocaleString()}</span></span>
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Aguardando o Professor Iniciar...</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Aguarde a ativação da simulação para sua corporação iniciar os trabalhos.
            </p>
            <div style={{ marginTop: '2rem' }} className="loader"></div>
          </motion.div>
        )}
        
        {currentPhase === 1 && scenario && <PhaseBriefing scenario={scenario} onComplete={handleCompleteBriefing} />}
        {currentPhase === 2 && <PhasePlanning onComplete={handleCompletePlanning} />}
        {currentPhase === 3 && <PhaseArchitecture onComplete={handleCompleteArchitecture} />}
        {currentPhase === 4 && scenario && <PhaseImplementation scenario={scenario} stats={projectData.architecture?.expectedStats} onComplete={handleCompleteImplementation} />}
        {currentPhase === 5 && <PhaseDomain companyName={companyName} projectData={projectData} onComplete={handleCompleteDomain} />}
        {currentPhase === 6 && scenario && <PhaseReview scenario={scenario} projectData={projectData} onComplete={handleCompleteReview} />}
        {currentPhase === 7 && <PhaseLaunch stats={projectData.architecture?.expectedStats} bugs={projectData.bugs} currentMoney={money} companyName={companyName} studentName={studentName} projectData={projectData} scenario={scenario} onUpdateMoney={handleLiveMoneyUpdate} onLaunchUpdate={handleUpdateRelease} />}
        
        {currentPhase === 999 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', border: '1px solid var(--danger-color)' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--danger-color)' }}>A Simulação foi Encerrada pelo Professor.</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Agradecemos por jogar o ArquiSim Empresarial. Todo o mercado global foi fechado e os servidores deligados.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PlayerRoom;

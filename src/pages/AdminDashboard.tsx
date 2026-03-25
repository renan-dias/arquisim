import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Settings, Play, Users, FileDown, TrendingUp, DollarSign } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { doc, onSnapshot, collection, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminDashboard = () => {
  const { roomId } = useParams();
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [globalEvents, setGlobalEvents] = useState<any>({ aiBubble: false, comBurst: false, lgpd: false });

  useEffect(() => {
    if (!roomId) return;
    
    const roomRef = doc(db, 'rooms', roomId);
    const unsubRoom = onSnapshot(roomRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setIsSimulationActive(data.isActive);
        if (data.globalEvents) setGlobalEvents(data.globalEvents);
      }
    });

    const playersRef = collection(db, 'rooms', roomId, 'players');
    const unsubPlayers = onSnapshot(playersRef, (snapshot) => {
      const pList: any[] = [];
      snapshot.forEach(doc => {
        pList.push({ id: doc.id, ...doc.data() });
      });
      // Sort by money descending
      pList.sort((a, b) => (b.money || 0) - (a.money || 0));
      setPlayers(pList);
    });

    return () => {
      unsubRoom();
      unsubPlayers();
    };
  }, [roomId]);

  const startSimulation = async () => {
    if (!roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), { isActive: true, isClosed: false });
  };

  const toggleEvent = async (eventName: string) => {
    if (!roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), {
      [`globalEvents.${eventName}`]: !globalEvents[eventName]
    });
  };

  const exportReport = () => {
    const docPdf = new jsPDF();
    docPdf.setFontSize(20);
    docPdf.text(`Relatório da Simulação - Sala ${roomId}`, 20, 20);
    
    docPdf.setFontSize(14);
    docPdf.text('Ranking Final de Empresas', 20, 40);
    
    docPdf.setFontSize(12);
    players.forEach((p, idx) => {
      docPdf.text(`${idx + 1}. ${p.companyName || 'Anônimo'} (CEO: ${p.studentName}) - Caixa: $${p.money || 0} - Fase Atual: ${p.currentPhase}`, 20, 50 + (idx * 10));
    });
    
    docPdf.save(`ArquiSim-Relatorio-${roomId}.pdf`);
  };

  return (
    <div className="page-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={24} /> Painel de Controle (God Mode)
          </h2>
          <span style={{ color: 'var(--text-secondary)' }}>Código da Sala: {roomId}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-premium btn-secondary" onClick={exportReport}>
            <FileDown size={18} /> Exportar PDF
          </button>
          {!isSimulationActive ? (
            <button className="btn-premium" onClick={startSimulation}>
              <Play size={18} /> Iniciar Simulação
            </button>
          ) : (
            <>
              <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>Simulação Ligada</span>
              <button 
                className="btn-premium" 
                style={{ background: 'var(--danger-color)' }}
                onClick={async () => {
                  if (roomId && confirm('Tem certeza que deseja encerrar a sala para todos?')) {
                     await updateDoc(doc(db, 'rooms', roomId), { isClosed: true });
                  }
                }}
              >
                Encerrar Sala
              </button>
            </>
          )}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', flex: 1 }}>
        <main className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--primary-color)" /> Ranking das Empresas
          </h3>
          
          {players.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>Aguardando conexão dos alunos...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {players.map((p, idx) => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>#{idx + 1}</span>
                     <div>
                       <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{p.companyName || 'Empresa'}</div>
                       <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>CEO: {p.studentName || 'Aluno'} | Fase SDLC: {p.currentPhase}</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: (p.money || 0) >= 0 ? 'var(--secondary-color)' : 'var(--danger-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    <DollarSign size={18} /> {(p.money || 0).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <Users size={18} /> Alunos ({players.length})
            </h4>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {players.map(p => (
                 <div key={p.id}>• {p.name}</div>
              ))}
              {players.length === 0 && '...' }
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Eventos Globais</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
               {[
                 { id: 'pandemic', label: 'Pandemia Global', icon: '🦠', type: 'danger' },
                 { id: 'lgpd', label: 'Auditoria LGPD', icon: '⚖️', type: 'warning' },
                 { id: 'hacker', label: 'Ataque Ransomware', icon: '💻', type: 'danger' },
                 { id: 'investor', label: 'Investidor Anjo', icon: '💰', type: 'success' },
                 { id: 'ai_hype', label: 'Hype de Inteligência Artificial', icon: '🤖', type: 'success' },
                 { id: 'inflation', label: 'Inflação Acelerada', icon: '📈', type: 'warning' },
                 { id: 'cloud_outage', label: 'Queda na AWS', icon: '🔥', type: 'danger' },
                 { id: 'viral', label: 'App Viralizou no TikTok', icon: '📱', type: 'success' },
                 { id: 'crypto_crash', label: 'Crash das Criptos', icon: '📉', type: 'danger' },
                 { id: 'new_iphone', label: 'Lançamento do Novo iPhone', icon: '🍏', type: 'info' },
                 { id: 'data_leak', label: 'Vazamento de Dados da Concorrência', icon: '🕵️', type: 'info' },
                 { id: 'tax_hike', label: 'Aumento de Impostos (Software)', icon: '🏛️', type: 'warning' },
                 { id: 'open_source_win', label: 'Liberação de Tech Open Source', icon: '🔓', type: 'success' },
                 { id: 'energy_crisis', label: 'Crise de Energia (Datacenters)', icon: '⚡', type: 'danger' },
                 { id: 'silicon_shortage', label: 'Falta de Semicondutores', icon: '🔌', type: 'warning' },
                 { id: 'gov_subsidies', label: 'Subsídios do Governo para TI', icon: '🏅', type: 'success' },
                 { id: 'fiber_cut', label: 'Rompimento de Cabo Submarino', icon: '🦈', type: 'danger' },
                 { id: 'patent_troll', label: 'Processo de Patente', icon: '📜', type: 'warning' },
                 { id: 'dev_strike', label: 'Greve dos Desenvolvedores', icon: '🪧', type: 'danger' },
                 { id: 'black_friday', label: 'Tráfego de Black Friday', icon: '🛍️', type: 'info' },
                 { id: 'quantum_leap', label: 'Avanço na Computação Quântica', icon: '⚛️', type: 'info' },
                 { id: 'euro_gdpr', label: 'Multa GDPR Severa (Ativa na UE)', icon: '💶', type: 'danger' },
                 { id: 'agile_trend', label: 'Nova Metodologia Ágil', icon: '🚀', type: 'success' },
                 { id: 'burnout', label: 'Crise de Burnout no Setor', icon: '😩', type: 'warning' },
                 { id: 'buyout', label: 'Rumor de Aquisição Bilionária', icon: '🤝', type: 'success' },
                 { id: 'sql_inject', label: 'Vulnerabilidade Zero-Day no SQL', icon: '💉', type: 'danger' },
                 { id: 'space_internet', label: 'Internet Satélite Global Ativada', icon: '🛰️', type: 'success' },
                 { id: 'metaverse', label: 'Bolha do Metaverso Estoura', icon: '🥽', type: 'warning' },
                 { id: 'bug_bounty', label: 'Programa de Bug Bounty', icon: '🛡️', type: 'success' },
                 { id: 'legacy_death', label: 'Fim do Suporte a Java Antigo', icon: '☕', type: 'danger' }
               ].map(evt => (
                 <button 
                   key={evt.id}
                   onClick={() => toggleEvent(evt.id)} 
                   className="btn-secondary" 
                   style={{ 
                     padding: '8px', 
                     borderRadius: '4px', 
                     textAlign: 'left', 
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     background: globalEvents[evt.id] 
                       ? (evt.type === 'danger' ? 'rgba(239, 68, 68, 0.3)' 
                          : evt.type === 'success' ? 'rgba(16, 185, 129, 0.3)' 
                          : evt.type === 'warning' ? 'rgba(245, 158, 11, 0.3)' 
                          : 'rgba(59, 130, 246, 0.3)')
                       : '',
                     border: globalEvents[evt.id] ? `1px solid ${evt.type === 'danger' ? '#ef4444' : evt.type === 'success' ? '#10b981' : evt.type === 'warning' ? '#f59e0b' : '#3b82f6'}` : '1px solid transparent'
                   }}>
                   <span>{evt.icon}</span>
                   <span>{globalEvents[evt.id] ? '✅ ' : ''}{evt.label}</span>
                 </button>
               ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminDashboard;

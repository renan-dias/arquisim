import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Rocket, AlertTriangle, Activity, Star, Users, MessageSquare } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PhaseLaunchProps {
  roomId: string;
  playerId: string;
  stats: any;
  bugs: number;
  currentMoney: number;
  companyName: string;
  studentName: string;
  projectData: any;
  scenario: any;
  onUpdateMoney: (newTotal: number) => void;
  onLaunchUpdate: (featureName: string, featureDesc: string) => void;
}

const userNames = ['@maria_dev', '@joaosilva', '@cyber_punk', '@carlos_ti', '@ana_business', 'contato@cliente.com', '@tech_guru', 'suporte@empresa.br'];

const complaintsPool = [
  "O app trava toda hora no meu smartphone!",
  "Lento... muito lento. Parece que roda em carroça.",
  "Onde está a proteção de dados LGPD nesse banco?",
  "Não funciona de sexta, os servidores caem direto.",
  "A fonte tá pequena, zero acessibilidade de UI.",
  "Estou tentando fazer login há 2 dias. Consertem os bugs!",
  "Perdi meus dados após a atualização. Arquitetura péssima."
];

const praisesPool = [
  "O sistema tá voando hoje! Muito rápido. 🚀",
  "Finalmente uma interface limpa e intuitiva.",
  "Integração perfeita, SLA absurdo, não tenho do que reclamar.",
  "Excelente atualização, os novos recursos de segurança estão show.",
  "10/10 - Recomendo pra todas as empresas parceiras!"
];

const PhaseLaunch = ({ stats, bugs, currentMoney, companyName, studentName, projectData, scenario, onUpdateMoney, onLaunchUpdate }: PhaseLaunchProps) => {
  const [salesData, setSalesData] = useState<number[]>([]);
  const [costData, setCostData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  
  const [consoleLogs, setConsoleLogs] = useState<{ time: string; msg: string; type: 'sale' | 'complaint' | 'praise' | 'info'; author?: string }[]>([]);
  const [competitors, setCompetitors] = useState<{ name: string; share: number; appName?: string }[]>([]);
  const [myShare, setMyShare] = useState(100);

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [featureName, setFeatureName] = useState('');
  const [featureDesc, setFeatureDesc] = useState('');

  const initialStars = Math.max(0, 5 - (bugs * 0.5));
  const [rating, setRating] = useState(initialStars);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'sale' | 'complaint' | 'praise' | 'info', author?: string) => {
    const time = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [...prev, { time, msg, type, author }].slice(-25));
  };

  const exportSAD = () => {
    const doc = new jsPDF();
    
    // --- Helper function for PDF Headers ---
    const addHeader = (title: string, page: number) => {
      doc.setFillColor(37, 99, 235); // Approx primary-color (#2563eb)
      doc.rect(0, 0, 210, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text('ArquiSim V2 - Tycoon Analytics', 10, 13);
      doc.text(`Página ${page}`, 190, 13, { align: 'right' });
      
      doc.setTextColor(40, 40, 40);
      doc.setFontSize(20);
      doc.text(title, 20, 35);
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 40, 190, 40);
    };

    // --- Page 1: Cover ---
    doc.setFillColor(15, 23, 42); // Very dark blue
    doc.rect(0, 0, 210, 297, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(32);
    doc.text('S.A.D', 105, 120, { align: 'center' });
    doc.setFontSize(20);
    doc.text('System Architecture Document', 105, 135, { align: 'center' });
    
    doc.setFillColor(37, 99, 235);
    doc.rect(85, 145, 40, 2, 'F');

    doc.setFontSize(14);
    doc.text(`Projeto: ${scenario?.theme || 'Sistema Corporativo'}`, 105, 160, { align: 'center' });
    doc.text(`Proprietário: ${companyName}`, 105, 170, { align: 'center' });
    doc.text(`Arquiteto Chefe: ${studentName}`, 105, 180, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Gerado automaticamente em ${new Date().toLocaleString()}`, 105, 280, { align: 'center' });

    // --- Page 2: Visão Geral ---
    doc.addPage();
    addHeader('1. Visão Geral do Sistema', 2);
    
    doc.setFontSize(12);
    doc.text('1.1 Requisitos do Contratante', 20, 50);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    const splitBriefing = doc.splitTextToSize(`"${scenario?.briefing || 'Nenhuma exigência pré-definida.'}"`, 170);
    doc.text(splitBriefing, 20, 60);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text('1.2 Classificação do Projeto', 20, 90);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Cliente Contratante: ${scenario?.company || 'N/A'}`, 25, 100);
    doc.text(`Principal Stakeholder: ${scenario?.stakeholder || 'N/A'}`, 25, 108);
    doc.text(`Categoria de Plataforma: ${scenario?.projectType || 'Software Customizado'}`, 25, 116);
    doc.text(`Complexidade Estimada: ${scenario?.complexity || 'Variável'}`, 25, 124);

    // --- Page 3: Arquitetura e Engenharia ---
    doc.addPage();
    addHeader('2. Arquitetura e Engenharia', 3);
    
    doc.setFontSize(12);
    doc.text('2.1 Stack Tecnológico Selecionado', 20, 50);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Linguagem Principal: ${projectData.architecture?.language || 'Genérica'}`, 25, 60);
    doc.text(`Banco de Dados: ${projectData.architecture?.database || 'Não relacional / Genérico'}`, 25, 68);
    doc.text(`Padrão de Sistema: ${projectData.architecture?.pattern || 'Monolito Clássico'}`, 25, 76);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text('2.2 Diagrama Lógico de Componentes (Nós)', 20, 95);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    let y = 105;
    const nodes = projectData.planning?.nodes || [];
    if (nodes.length > 0) {
      nodes.forEach((n: any, idx: number) => {
        const typeNormalized = (n.type || 'NODE').toUpperCase();
        doc.text(`${idx + 1}. [${typeNormalized}] ${n.data?.label || 'Serviço sem nome'}`, 25, y);
        y += 8;
        if (y > 270) {
           doc.addPage();
           addHeader('2. Arquitetura e Engenharia (Cont.)', (doc.internal as any).getNumberOfPages());
           y = 50;
        }
      });
    } else {
      doc.text('A equipe não registrou formalmente os nós lógicos no Diagrama UML interativo.', 25, y);
    }

    // --- Page 4: Telemetria e Finanças ---
    doc.addPage();
    addHeader('3. Telemetria e Operações Vivas', (doc.internal as any).getNumberOfPages());
    
    doc.setFontSize(12);
    doc.text('3.1 Registro de Domínio Público', 20, 50);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`DNS Primário: ${projectData.domain?.name || 'Localhost/Sem Domínio Público Validado'}`, 25, 60);
    
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text('3.2 Métricas de SLA e Dívida Técnica', 20, 80);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Vazamento Crítico em Prod: ${bugs} bug(s) exposto(s).`, 25, 90);
    doc.text(`Avaliação de Satisfação Final (Rating): ${rating.toFixed(2)} / 5.0 Estrelas`, 25, 98);
    doc.text(`Qualidade Cumulativa da Arquitetura: Tempo ${stats?.time || 5}/10 | Escala ${stats?.scalability || 5}/10`, 25, 106);

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(12);
    doc.text('3.3 Auditoria Gerencial Operacional', 20, 130);
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Saldo Corrente do Caixa em Operação: $${currentMoney.toLocaleString()}`, 25, 140);
    
    // Tabela estilo executiva simulada
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 150, 170, 8, 'F');
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(9);
    doc.text('MÉTRICA', 25, 155.5);
    doc.text('STATUS TÉCNICO', 150, 155.5);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 158, 190, 158);
    
    doc.setTextColor(80, 80, 80);
    doc.text('Manutenção Contínua (Custos)', 25, 166); doc.text(bugs > 0 ? 'CRÍTICO' : 'ESTÁVEL', 150, 166);
    doc.line(20, 170, 190, 170);

    doc.text('Aprovação Social (Feed Positivo)', 25, 178); doc.text(rating >= 4 ? 'ALTO' : rating > 2 ? 'MÉDIO' : 'BAIXO', 150, 178);
    doc.line(20, 182, 190, 182);

    doc.text('Tráfego Constante Observado', 25, 190); doc.text('Medido via Dashboard', 150, 190);
    doc.line(20, 194, 190, 194);

    // --- Page 5: Anotações do Arquiteto (Notepad Global) ---
    const savedNotes = localStorage.getItem('arquisim_notepad');
    if (savedNotes && savedNotes.trim().length > 0) {
      doc.addPage();
      addHeader('4. Rascunhos e Notas (Apenso)', (doc.internal as any).getNumberOfPages());
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const splitNotes = doc.splitTextToSize(savedNotes, 170);
      doc.text(splitNotes, 20, 50);
    }

    doc.save(`ArquiSim_SAD_${companyName.replace(/ /g, '_')}.pdf`);
    toast.success('Documento Profissional (SAD) gerado com sucesso!');
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleLogs]);

  // Simulação Local Offline do Market Share
  useEffect(() => {
    const simulatedBots = [
      { name: 'TechCorp SA', baseRating: 4.2, appName: 'Sistema Legado' },
      { name: 'InovaSoft Ltda', baseRating: 3.8, appName: 'App Concorrente' },
      { name: 'DevGurus Inc', baseRating: 4.5, appName: 'Solução Premium' }
    ];

    let totalStars = rating;
    simulatedBots.forEach(b => totalStars += b.baseRating);

    if (totalStars === 0) totalStars = 1;

    const myCalculatedShare = Math.round((rating / totalStars) * 100);
    setMyShare(myCalculatedShare);

    const mappedCompetitors = [
      { name: `${companyName || 'Sua Empresa'} (Você)`, share: myCalculatedShare, appName: scenario?.company },
      ...simulatedBots.map(b => ({
        name: b.name,
        share: Math.round((b.baseRating / totalStars) * 100),
        appName: b.appName
      }))
    ].sort((a, b) => b.share - a.share);

    setCompetitors(mappedCompetitors);
  }, [rating, companyName, scenario]);

  useEffect(() => {
    let internalMoney = currentMoney;

    const interval = setInterval(() => {
      // Loop Econômico base de 3s
      const baseMarketPool = 3000 + (rating * 1000); 
      let nextSale = (baseMarketPool * (myShare / 100)) + (Math.random() * 200);
      
      if (bugs > 5) nextSale -= 800; // Penalidade grave
      nextSale = Math.max(0, nextSale);

      const baseCost = stats?.cost ? stats.cost / 2 : 200;
      const maintenanceCost = bugs * 100;
      const nextCost = baseCost + maintenanceCost + (Math.random() * 100);

      const delta = nextSale - nextCost;
      internalMoney += delta;
      
      // Update global money
      onUpdateMoney(Math.floor(internalMoney));

      setLabels(prev => {
        const next = [...prev, `Mês ${prev.length + 1}`];
        if (next.length > 10) next.shift();
        return next;
      });

      setSalesData(prev => {
        const next = [...prev, nextSale];
        if (next.length > 10) next.shift();
        return next;
      });

      setCostData(prev => {
        const next = [...prev, nextCost];
        if (next.length > 10) next.shift();
        return next;
      });

      // Events Log Generator
      if (delta > 0 && Math.random() > 0.5) {
         addLog(`+$${delta.toFixed(0)} - Assinatura Paga Confirmada.`, 'sale');
      }
      
      if (bugs > 0 && Math.random() > 0.5) {
         const randomComplaint = complaintsPool[Math.floor(Math.random() * complaintsPool.length)];
         const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
         addLog(randomComplaint, 'complaint', randomUser);
         setRating(r => Math.max(0, r - 0.05));
      } else if (bugs === 0 && Math.random() > 0.7) {
         const randomPraise = praisesPool[Math.floor(Math.random() * praisesPool.length)];
         const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
         addLog(randomPraise, 'praise', randomUser);
         setRating(r => Math.min(5, r + 0.1));
      }

    }, 3000);

    return () => clearInterval(interval);
  }, [stats, bugs, rating, myShare]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Receitas ($)',
        data: salesData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4
      },
      {
        label: 'Custos ($)',
        data: costData,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8' } },
      title: { display: false }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148, 163, 184, 0.2)' } },
      y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148, 163, 184, 0.2)' } }
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{ padding: '2rem', maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              <Activity size={28} color="var(--primary-color)" /> Fase 7: Operação & Feedback (Live Offline)
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Seu sistema está rodando localmente. Cada ciclo consome capital baseado nos custos operacionais.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-premium btn-secondary" onClick={exportSAD} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              📋 Exportar Doc (SAD)
            </button>
            <div style={{ background: 'var(--canvas-bg)', padding: '1rem 2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid var(--panel-border)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Caixa Atual</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: currentMoney >= 0 ? '#10b981' : '#ef4444' }}>
                ${currentMoney.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Rocket size={24} color="var(--primary-color)" /> Central de Operações Vivas
          </h3>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}>
               <Star size={18} fill="#f59e0b" color="#f59e0b" />
               <span style={{ fontWeight: 'bold' }}>{rating.toFixed(1)} / 5.0</span>
             </div>
             
             <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: bugs > 0 ? '1px solid #ef4444' : '1px solid #10b981', background: bugs > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }}>
               <AlertTriangle size={18} color={bugs > 0 ? "#ef4444" : "#10b981"} />
               <span style={{ fontWeight: 'bold' }}>{bugs} Bugs Críticos</span>
             </div>

             <button onClick={() => setIsFeatureModalOpen(true)} className="btn-premium" style={{ background: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <RefreshCw size={18} /> Lançar Nova Feature
             </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
           <div style={{ height: '400px', flex: '1 1 500px', background: 'var(--panel-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', overflow: 'hidden' }}>
             <Line data={data} options={options} />
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 350px', minHeight: '400px' }}>
              <div style={{ flex: '0 0 auto', background: 'var(--panel-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                 <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}><Users size={18} /> Concorrentes Simulados</h4>
                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {competitors.map((c, i) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                         <span>{i + 1}. {c.name}</span>
                         <span style={{ fontWeight: 'bold', color: i === 0 ? '#f59e0b' : '' }}>{c.share}%</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <div style={{ flex: 1, height: '250px', background: 'var(--input-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                 <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', flexShrink: 0 }}><MessageSquare size={18} /> Feed de Feedback Local</h4>
                 <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {consoleLogs.map((log, i) => {
                       if (log.type === 'sale' || log.type === 'info') {
                          return (
                             <div key={i} style={{ color: log.type === 'sale' ? '#10b981' : 'var(--text-secondary)', fontSize: '0.75rem', padding: '4px 0', fontFamily: 'monospace', borderBottom: '1px solid var(--panel-border)' }}>
                               [{log.time}] sys_msg: {log.msg}
                             </div>
                          );
                       }
                       return (
                          <div key={i} style={{ 
                             background: log.type === 'complaint' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                             border: log.type === 'complaint' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                             padding: '10px',
                             borderRadius: '8px',
                             marginBottom: '8px',
                             fontFamily: 'Inter, sans-serif'
                          }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: log.type === 'complaint' ? '#ef4444' : '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#fff', fontWeight: 'bold' }}>
                                  {log.author?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{log.author}</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>• {log.time}</span>
                             </div>
                             <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                                {log.msg}
                             </div>
                          </div>
                       )
                    })}
                    <div ref={logsEndRef} />
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* MODAL: NOVA FEATURE SDLC */}
      {isFeatureModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ padding: '2rem', width: '450px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid var(--primary-color)' }}>
             <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Desenvolver Nova Funcionalidade</h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
               Isso reiniciará o ciclo a partir da Fase 2 (Planejamento UML), preservando toda a arquitetura atual em produção, permitindo empilhar expansões e consertar bugs antigos. O Live Ops continuará faturando enquanto sua dev team coda a feature nova em paralelo!
             </p>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
               <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Nome do Módulo/Feature</label>
               <input className="input-premium" type="text" placeholder="Ex: Gateway de Pagamento, Perfil Social..." value={featureName} onChange={e => setFeatureName(e.target.value)} />
               
               <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Epecificação Resumida (Briefing)</label>
               <textarea className="input-premium" style={{ height: '80px', resize: 'none' }} placeholder="Descreva brevemente a regra de negócio..." value={featureDesc} onChange={e => setFeatureDesc(e.target.value)} />
             </div>

             <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn-premium btn-secondary" style={{ flex: 1 }} onClick={() => setIsFeatureModalOpen(false)}>Cancelar</button>
                <button className="btn-premium" style={{ flex: 1 }} onClick={() => {
                   if (!featureName.trim()) {
                     toast.error('Dê um nome à feature!');
                     return;
                   }
                   setIsFeatureModalOpen(false);
                   onLaunchUpdate(featureName, featureDesc);
                }}>Investir em P&D</button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhaseLaunch;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, User } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Home = () => {
  const [studentName, setStudentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !companyName) {
      toast.error('Preencha os campos de Aluno e Empresa.');
      return;
    }
    
    setLoading(true);
    try {
      const joinId = `${studentName} (${companyName})`;

      // Salva o estado inicial inteiramente no localStorage
      const initialState = {
        studentName,
        companyName,
        currentPhase: 1, // Começa direto na Fase 1
        money: 10000,
        projectData: {},
        joinedAt: new Date().toISOString(),
        rating: 5,
        bugs: 0
      };

      localStorage.setItem('arquisim_player_state', JSON.stringify(initialState));

      toast.success('Empresa registrada localmente! Iniciando simulação...');
      // Usamos a rota padrão mantendo o formato, mas com IDs locais/offline
      navigate(`/player/solo/${encodeURIComponent(joinId)}`);
    } catch (error) {
       toast.error('Erro ao salvar os dados localmente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ padding: '3rem', maxWidth: '450px', width: '100%', textAlign: 'center' }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <Building size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ArquiSim V2</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tycoon Simulator & Engenharia de Software</p>
          <span style={{ display: 'inline-block', marginTop: '4px', fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            Modo Offline Seguro
          </span>
        </div>

        <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ position: 'relative' }}>
             <User size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
             <input
               type="text"
               value={studentName}
               onChange={(e) => setStudentName(e.target.value)}
               placeholder="Seu Nome de Aluno (CEO)"
               className="input-premium"
               style={{ paddingLeft: '38px', width: '100%' }}
             />
          </div>

          <div style={{ position: 'relative' }}>
             <Building size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
             <input
               type="text"
               value={companyName}
               onChange={(e) => setCompanyName(e.target.value)}
               placeholder="Nome da sua Empresa Mágica"
               className="input-premium"
               style={{ paddingLeft: '38px', width: '100%' }}
             />
          </div>
          
          <button 
             type="submit" 
             className="btn-premium" 
             style={{ marginTop: '1rem', width: '100%' }}
             disabled={loading}
          >
            {loading ? 'Preparando Prancheta...' : 'Abrir Empresa e Iniciar'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;

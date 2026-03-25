import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LogIn, Building, User } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode || !studentName || !companyName) {
      toast.error('Preencha os campos de Sala, Aluno e Empresa.');
      return;
    }
    
    setLoading(true);
    try {
      const code = roomCode.toUpperCase();
      const roomRef = doc(db, 'rooms', code);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const joinId = `${studentName} (${companyName})`;
        const playerRef = doc(db, `rooms/${code}/players`, joinId);
        
        await setDoc(playerRef, {
          companyName: companyName,
          studentName: studentName,
          currentPhase: 0,
          joinedAt: new Date(),
          projectData: {},
          money: 10000, 
          rating: 5,
        });

        // Add history log event if active
        if (roomSnap.data().isActive) {
           await updateDoc(roomRef, {
             [`announcements.${Date.now()}`]: `A empresa ${companyName} (CEO: ${studentName}) registrou um CNPJ no Vale do Silício.`
           });
        }

        toast.success('Sala encontrada! Acessando...');
        navigate(`/player/${code}/${encodeURIComponent(joinId)}`);
      } else {
        toast.error('Sala não encontrada. Verifique o código com o professor.');
      }
    } catch (error) {
       toast.error('Erro ao acessar a sala de simulação.');
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
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ArquiSim V3</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tycoon Simulator & Engenharia de Software</p>
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

          <div style={{ position: 'relative' }}>
             <LogIn size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
             <input
               type="text"
               value={roomCode}
               onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
               placeholder="Código da Sala (Ex: COMP-X)"
               className="input-premium"
               maxLength={10}
               style={{ paddingLeft: '38px', width: '100%', textTransform: 'uppercase' }}
             />
          </div>
          
          <button 
             type="submit" 
             className="btn-premium" 
             style={{ marginTop: '1rem', width: '100%' }}
             disabled={loading}
          >
            {loading ? 'Conectando ao Ecosistema...' : 'Abrir Empresa e Iniciar'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;

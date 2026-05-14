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
    if (!studentName || !companyName) {
      toast.error('Preencha os campos de Aluno e Empresa.');
      return;
    }
    
    setLoading(true);
    try {
      const joinId = `${studentName} (${companyName})`;

      if (roomCode) {
        const code = roomCode.toUpperCase();
        const roomRef = doc(db, 'rooms', code);
        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
          const playerRef = doc(db, `rooms/${code}/players`, joinId);
          
          await setDoc(playerRef, {
            companyName: companyName,
            studentName: studentName,
            currentPhase: roomSnap.data().isActive ? 1 : 0,
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
          toast.error('Sala não encontrada. Verifique o código ou deixe em branco para jogar sozinho.');
        }
      } else {
        // Criar sala solo automaticamente
        const code = 'SOLO-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        const roomRef = doc(db, 'rooms', code);
        
        await setDoc(roomRef, {
          isActive: true,
          createdAt: new Date().toISOString(),
          isSolo: true,
          globalEvents: {
            aiBubble: false,
            comBurst: false,
            lgpd: false,
            pandemic: false,
            dataBreach: false,
            angelInvest: false,
            seniorShortage: false,
            cloudOutage: false
          }
        });

        const playerRef = doc(db, `rooms/${code}/players`, joinId);
        await setDoc(playerRef, {
          companyName: companyName,
          studentName: studentName,
          currentPhase: 1, // Inicia direto na fase 1
          joinedAt: new Date(),
          projectData: {},
          money: 10000, 
          rating: 5,
        });

        toast.success('Jogo Solo iniciado com sucesso!');
        navigate(`/player/${code}/${encodeURIComponent(joinId)}`);
      }
    } catch (error) {
       toast.error('Erro ao acessar a simulação.');
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
               placeholder="Código da Sala (Opcional - Vazio para Solo)"
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
            {loading ? 'Conectando ao Ecosistema...' : (roomCode ? 'Entrar na Sala' : 'Iniciar Jogo Solo')}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;

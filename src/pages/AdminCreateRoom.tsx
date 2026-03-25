import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Server, Settings } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const AdminCreateRoom = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const roomRef = doc(db, 'rooms', newCode);
      await setDoc(roomRef, {
        isActive: false,
        createdAt: new Date().toISOString(),
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
      navigate(`/admin/${newCode}`);
    } catch (e) {
      console.error(e);
      setIsCreating(false);
    }
  };

  return (
    <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{ padding: '3rem', maxWidth: '500px', width: '100%', textAlign: 'center' }}
      >
        <Settings size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Acesso do Professor</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Crie uma nova sessão do ArquiSim para seus alunos.
        </p>

        <button 
          onClick={handleCreateRoom}
          className="btn-premium" 
          style={{ width: '100%' }}
          disabled={isCreating}
        >
          <Server size={20} />
          {isCreating ? 'Gerando Sala...' : 'Criar Nova Sala (God Mode)'}
        </button>
      </motion.div>
    </div>
  );
};

export default AdminCreateRoom;

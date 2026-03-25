import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const GlobalNotepad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('arquisim_notepad');
    if (saved) {
      setNotes(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('arquisim_notepad', notes);
    toast.success('Anotações salvas no navegador!');
  };

  const handleClose = () => {
    localStorage.setItem('arquisim_notepad', notes); // auto-save on close
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9998
        }}
      >
        <PenTool size={24} />
      </motion.button>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '24px',
              width: '350px',
              height: '450px',
              background: 'var(--panel-bg)',
              borderRadius: '12px',
              border: '1px solid var(--primary-color)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ 
              background: 'rgba(37, 99, 235, 0.1)', 
              padding: '12px 16px', 
              borderBottom: '1px solid var(--panel-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', color: 'var(--primary-color)' }}>
                <PenTool size={18} /> Rascunho da Proposta
              </h4>
              <button 
                onClick={handleClose}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Notepad Area */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anote aqui as dicas do cliente, ideias de banco de dados, requisitos extras..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '16px',
                fontSize: '0.95rem',
                lineHeight: '1.5',
                resize: 'none',
                outline: 'none',
                fontFamily: 'monospace'
              }}
            />

            {/* Footer */}
            <div style={{ 
              padding: '12px 16px', 
              borderTop: '1px solid var(--panel-border)',
              background: 'var(--input-bg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                 Sincroniza do PDF Final
              </span>
              <button 
                onClick={handleSave}
                style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem'
                }}
              >
                <Save size={16} /> Salvar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalNotepad;

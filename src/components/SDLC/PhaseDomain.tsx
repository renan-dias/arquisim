import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface PhaseDomainProps {
  companyName: string;
  projectData: any;
  onComplete: (domainData: any) => void;
}

const extensions = [
  { ext: '.com', price: 50 },
  { ext: '.com.br', price: 40 },
  { ext: '.io', price: 150 },
  { ext: '.tech', price: 120 },
  { ext: '.net', price: 45 },
  { ext: '.ai', price: 400 },
];

const PhaseDomain = ({ projectData, onComplete }: PhaseDomainProps) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setSearched(true);
    setSelectedDomain(null);
  };

  const handleBuy = () => {
    if (!selectedDomain) return;
    
    // Simulate buying logic success
    toast.success(`Domínio ${selectedDomain.name} adquirido por $${selectedDomain.price}!`);
    onComplete({
      name: selectedDomain.name,
      price: selectedDomain.price
    });
  };

  // Fake availability generator based on project name length and some random logic
  const checkAvailability = (ext: string) => {
    // just dummy logic: .com is sometimes taken for generic words
    if (ext === '.com' && query.length < 5) return false;
    if (ext === '.com.br' && query.toLowerCase() === 'app') return false;
    return true; 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '800px', width: '100%' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Globe size={48} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Registro Nacional de Domínios</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Antes de lançar o {projectData.briefing?.companyName}, você precisa de um endereço na web. Busque e registre seu domínio (os custos serão debitados do seu caixa).
        </p>
      </div>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
          <input 
            type="text" 
            placeholder="Ex: meunovoapp"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            className="input-premium"
            style={{ paddingLeft: '48px', width: '100%', fontSize: '1.2rem' }}
          />
        </div>
        <button type="submit" className="btn-premium" style={{ whiteSpace: 'nowrap' }}>
          Buscar Domínio
        </button>
      </form>

      {searched && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {extensions.map(ext => {
            const isAvailable = checkAvailability(ext.ext);
            const domainName = `${query}${ext.ext}`;
            const isSelected = selectedDomain?.name === domainName;

            return (
              <div 
                key={ext.ext}
                onClick={() => isAvailable && setSelectedDomain({ name: domainName, price: ext.price })}
                style={{
                  padding: '1.5rem',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.2)',
                  border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--panel-border)',
                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                  opacity: isAvailable ? 1 : 0.5,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{domainName}</h4>
                  {isAvailable ? (
                    <span style={{ color: '#10b981', fontSize: '0.85rem' }}>Disponível</span>
                  ) : (
                    <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>Registrado</span>
                  )}
                </div>
                {isAvailable && (
                  <div style={{ fontWeight: 'bold' }}>
                    ${ext.price}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {selectedDomain && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid var(--primary-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <h4 style={{ marginBottom: '4px' }}>Resumo do Pedido</h4>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Você está comprando <strong>{selectedDomain.name}</strong> por 1 ano.</p>
          </div>
          <button className="btn-premium" onClick={handleBuy} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <ShoppingCart size={18} /> Pagar ${selectedDomain.price}
          </button>
        </motion.div>
      )}

    </motion.div>
  );
};

export default PhaseDomain;

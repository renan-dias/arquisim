import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Network, Plus, CheckCircle, Smartphone, Server, Database, Globe } from 'lucide-react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow';
import type { Node, Edge, Connection, NodeChange, EdgeChange } from 'reactflow';
import 'reactflow/dist/style.css';
import toast from 'react-hot-toast';

interface PhasePlanningProps {

  onComplete: (data: any) => void;
}

const initialNodes: Node[] = [
  {
    id: 'user',
    type: 'default',
    data: { label: 'Usuário (Cliente)' },
    position: { x: 50, y: 150 },
    style: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' }
  }
];

const initialEdges: Edge[] = [];

let idCounter = 1;

const PhasePlanning = ({ onComplete }: PhasePlanningProps) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const containerRef = useRef<HTMLDivElement>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#10b981', strokeWidth: 2 } }, eds)),
    []
  );

  const addNode = (_type: string, label: string, color: string, _icon: any) => {
    const newNode: Node = {
      id: `node_${idCounter++}`,
      data: { label },
      position: { x: 250 + (Math.random() * 50), y: 100 + (Math.random() * 100) },
      style: { background: color, color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', minWidth: '120px', textAlign: 'center' }
    };
    setNodes((nds) => [...nds, newNode]);
    toast.success(`${label} adicionado ao quadro.`);
  };

  const handleComplete = () => {
    if (nodes.length < 3) {
      toast.error('Adicione mais componentes na sua arquitetura antes de aprovar!');
      return;
    }
    if (edges.length === 0) {
      toast.error('Conecte os módulos do seu sistema arrastando as bordas entre eles!');
      return;
    }

    onComplete({ nodes, edges, validation: 'Aprovado' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel"
      style={{ padding: '2rem', maxWidth: '1000px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', height: '85vh' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Network size={24} color="var(--primary-color)" /> Fase 3: Diagramação e Arquitetura Lógica
        </h3>
        <button className="btn-premium" onClick={handleComplete}>
          <CheckCircle size={18} /> Aprovar Diagrama
        </button>
      </div>

      <p style={{ color: 'var(--text-secondary)' }}>
        Modele sua solução no quadro branco arrastando as caixas e ligando os pontos de conexão para mostrar como os dados trafegam. Este diagrama irá para o relatório PDF final.
      </p>

      <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
        {/* Toolbar */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Componentes Lógicos</h4>
          
          <button className="btn-secondary" onClick={() => addNode('client', 'App / Frontend', '#4f46e5', Smartphone)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <span><Globe size={16} /> Web/App</span>
            <Plus size={16} />
          </button>
          
          <button className="btn-secondary" onClick={() => addNode('server', 'Servidor / API', '#059669', Server)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <span><Server size={16} /> API Server</span>
            <Plus size={16} />
          </button>
          
          <button className="btn-secondary" onClick={() => addNode('db', 'Banco de Dados', '#ea580c', Database)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <span><Database size={16} /> Banco de Dados</span>
            <Plus size={16} />
          </button>
          
          <button className="btn-secondary" onClick={() => addNode('external', 'Serviço Externo', '#9333ea', Network)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
            <span><Network size={16} /> 3rd Party API</span>
            <Plus size={16} />
          </button>

          <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong>Dica:</strong> Arraste do limite de uma caixa até outra para conectá-las.
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} style={{ flex: 1, background: 'var(--canvas-bg)', borderRadius: '8px', border: '1px solid var(--panel-border)', position: 'relative' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background color="var(--reactflow-lines)" gap={16} />
            <Controls style={{ fill: 'var(--text-primary)' }} />
          </ReactFlow>
        </div>
      </div>
    </motion.div>
  );
};

export default PhasePlanning;

export interface Scenario {
  id: string;
  theme: string;
  company: string;
  stakeholder: string;
  role: string;
  briefing: string;
  projectType: 'Web App' | 'Mobile App' | 'API' | 'Desktop' | 'Data Pipeline' | 'IoT';
  budgetMsg?: string;
  timeMsg?: string;
  complexity: 'Baixa' | 'Média' | 'Alta';
}

export const scenarios: Scenario[] = [
  {
    id: "SCN-001",
    theme: "E-commerce Monstruoso",
    company: "MegaShop SA",
    stakeholder: "Roberto Cavalcante",
    role: "VP de Vendas",
    projectType: "Web App",
    complexity: "Média",
    briefing: "Olá, me chamo Roberto, sou o VP de Vendas da MegaShop. Resolvi entrar em contato com vocês porque nossa plataforma atual quebrou na Black Friday. Quero um sistema web moderno que aguente 50.000 usuários simultâneos. Não me venha com arquiteturas lentas, precisamos de velocidade e um front-end impecável."
  },
  {
    id: "SCN-002",
    theme: "App de Entregas (Delivery)",
    company: "ZupFood",
    stakeholder: "Letícia Mendes",
    role: "CEO",
    projectType: "Mobile App",
    complexity: "Média",
    briefing: "Oie, tudo bem? Aqui é a Letícia da ZupFood. Seguinte: meus motoboys estão usando WhatsApp pra gerir entregas. Uma bagunça. Preciso que sua empresa crie nosso aplicativo nativo. Tem que ter GPS em tempo real, pagamento via PIX integrado, e rodar tanto em Android quanto iOS lisinho!"
  },
  {
    id: "SCN-003",
    theme: "Sistema Bancário Core",
    company: "Banco Trust",
    stakeholder: "Dr. Almir Ribeiro",
    role: "Diretor de TI",
    projectType: "API",
    complexity: "Alta",
    briefing: "Bom dia. Sou o Diretor de TI do Banco Trust. Estamos modernizando nosso core bancário legado de 1998. Necessitamos de uma arquitetura de API Gateway ultra segura, orientada a microserviços, com banco de dados relacional parrudo. Um bug aqui e nós perdemos milhões, então foco em segurança e transações ACID."
  },
  {
    id: "SCN-004",
    theme: "Rede Social para Pets",
    company: "PetGram",
    stakeholder: "Camila Fox",
    role: "Founder & CMO",
    projectType: "Mobile App",
    complexity: "Baixa",
    briefing: "Oieeee pessoal da eng!! Sou a Cami do PetGram! Minha ideia é genial: um Tinder, só que pra cachorros marcarem passeios no parque. Quero um app super colorido, feed de fotos rolando rápido, e backend que aguente muiiita foto pesada de Golden Retriever. Bora codar? 🐾"
  },
  {
    id: "SCN-005",
    theme: "ERP de Logística Portuária",
    company: "PortoNave Br",
    stakeholder: "Capitão Jonas",
    role: "Gerente Operacional",
    projectType: "Desktop",
    complexity: "Alta",
    briefing: "Saudações. Aqui é o Gerente Operacional do porto. Temos centenas de contêineres entrando todo dia e o sistema atual vive caindo na rede interna dos navios. Queremos um sistema Desktop nativo, robusto, que comunique com os guindastes via rede local. Sem invenções Cloud, o mar não tem Wi-Fi 100% do tempo."
  },
  {
    id: "SCN-006",
    theme: "Sistema de Telemedicina",
    company: "Saúde+",
    stakeholder: "Dra. Sônia",
    role: "Chefe Médica",
    projectType: "Web App",
    complexity: "Média",
    briefing: "Boa tarde. Sou a Dra. Sônia. A nova LGPD está aí e nossas vídeo-chamadas via Skype não são seguras. Preciso de um portal Web App de Telemedicina criptografado ponta-a-ponta com agendamento integrado. O sigilo do paciente é prioridade zero, ok?"
  },
  {
    id: "SCN-007",
    theme: "Pipeline de Dados - Machine Learning",
    company: "NeuralAnalytics",
    stakeholder: "Eduardo DataMaker",
    role: "Lead Data Scientist",
    projectType: "Data Pipeline",
    complexity: "Alta",
    briefing: "E aí, devs! Eduardo aqui. Tô liderando a parte de M.L da NeuralAnalytics. Nossos modelos estão com fome de dados. Quero que construam um Data Pipeline parrudíssimo que puxe dados do Twitter, processe sentimentos e jogue num Data Warehouse gigante. Use linguagens focadas em IA e dados massivos por favor."
  },
  {
    id: "SCN-008",
    theme: "AgroTech Sensoriamento",
    company: "Fazenda Inteligente",
    stakeholder: "Sr. João Pedro",
    role: "Latifundiário",
    projectType: "IoT",
    complexity: "Alta",
    briefing: "Opa, bom dia moçada. Tenho 20 mil hectares de soja. Comprei uns sensores de solo modernosos. Quero um sistema de Internet das Coisas (IoT). O milho não espera a internet voltar. Onde a internet for fraca, faz eles mandarem os dados de pacote pequeno mesmo. Confio em vocês."
  },
  {
    id: "SCN-009",
    theme: "Automação de Marketing",
    company: "Viralize Marketing",
    stakeholder: "Fernando H.",
    role: "Growth Hacker",
    projectType: "Web App",
    complexity: "Média",
    briefing: "Fala time!! Fernando do Growth! Preciso de um SaaS que automatize disparo de emails e crie funis dinâmicos em tempo real com eventos Kafka. Tem que ser uma arquitetura que aguente picos absurdos se o cliente vier do BBB! Sem gargalo no banco!"
  },
  {
    id: "SCN-010",
    theme: "Plataforma de E-learning",
    company: "EducaPlus",
    stakeholder: "Marcela Silva",
    role: "Coordenadora EAD",
    projectType: "Web App",
    complexity: "Baixa",
    briefing: "Olá, boa tarde! Sou a Marcela. A pandemia adiantou nossos planos online. Precisamos de um AVA (Ambiente Virtual) que rode vídeos pesados pra milhões de alunos sem travar a nuvem. Uma arquitetura ágil de video-streaming."
  },
  {
    id: "SCN-011",
    theme: "Chatbot de SAC",
    company: "CallCenter Giga",
    stakeholder: "Antônio Santos",
    role: "Supervisor",
    projectType: "API",
    complexity: "Baixa",
    briefing: "Olá. Quero uma API de chatbot neural que intercepta e responde nossos clientes antes de chegar num humano. Quero escalabilidade e redução de fila. Uma base NoSQL basta pros logs."
  },
  {
    id: "SCN-012",
    theme: "Corretora de Criptomoedas",
    company: "CoinBR",
    stakeholder: "Arthur Satoshi",
    role: "Co-Founder",
    projectType: "Web App",
    complexity: "Alta",
    briefing: "Bilionários, beleza? Aqui é o Arthur. Vamos criar a próxima grande exchange do Brasil. Requisitos: microsserviços blindados e cache em memória (Redis) absurdo de rápido. O delay de 1 segundo custa dinheiro no trade."
  },
  { id: "SCN-013", theme: "App de Fitness", company: "GymBros", stakeholder: "Leo Stronda", role: "Personal Star", projectType: "Mobile App", complexity: "Baixa", briefing: "E aíí! Bora fazer o maior app de treino do mundo. Monólito ou qualquer coisa, desde que saia rápido pra Android e iOS. Quero gamificação!" },
  { id: "SCN-014", theme: "Gerenciador de Estacionamentos", company: "ParkAuto", stakeholder: "Carlos B.", role: "Dono", projectType: "IoT", complexity: "Média", briefing: "Boa tarde, Carlos da ParkAuto. Nossas cancelas precisam comunicar via IoT com uma nuvem central pra checar o cartão do cliente e abrir. Pode usar SQL simples." },
  { id: "SCN-015", theme: "Sistema de Folha de Pagamento", company: "RH Solutions", stakeholder: "Fátima Mendes", role: "Gerente HR", projectType: "Desktop", complexity: "Baixa", briefing: "Olá! Precisamos de um software Desktop seguro para o sistema de pagamento dos nossos 50 mil funcionários e gerar boletos." },
  { id: "SCN-016", theme: "Buscador de Passagens Aéreas", company: "VoaLá", stakeholder: "Tiago Silva", role: "Product Owner", projectType: "Web App", complexity: "Alta", briefing: "Olá time! Precisamos de um motor web que faz crawler nas aéreas em tempo real. Exige forte carga concorrente e cache (Redis) gigante!" },
  { id: "SCN-017", theme: "App de Meditação", company: "ZenLife", stakeholder: "Mestra Luiza", role: "Guru Mestre", projectType: "Mobile App", complexity: "Baixa", briefing: "Paz. Quero um app minimalista onde os usuários toquem o áudio offline e subam seu humor na nuvem de forma eventual." },
  { id: "SCN-018", theme: "Gateway de Pagamento", company: "PayTux", stakeholder: "Rick CFO", role: "Diretor", projectType: "API", complexity: "Alta", briefing: "Fala. Nosso card-processing requer PCI-Compliance, relacional robusto (Postgres) e não pode falhar NUNCA. Linguagem tipada obrigatória." },
  { id: "SCN-019", theme: "Monitor de Trânsito Cidades", company: "GovBR", stakeholder: "Prefeito Marcos", role: "Político", projectType: "IoT", complexity: "Alta", briefing: "Boa tarde aos desenvolvedores. Nossas 20 mil câmeras de trânsito emitem streams constantes. Precisamos de um sistema real-time via Kafka pra acionar a polícia." },
  { id: "SCN-020", theme: "Análise de DNA", company: "GeneSys", stakeholder: "Doutor Victor", role: "Pesquisador", projectType: "Data Pipeline", complexity: "Média", briefing: "Olá laboratório! Minha equipe minera genomas pesando Terabytes. Construa pipelines em Python/Go jogando tudo no Data Warehouse rápido!" },
  { id: "SCN-021", theme: "Jogo Multiplayer Web", company: "IndieDevZ", stakeholder: "Gui Player", role: "Gamedev", projectType: "Web App", complexity: "Média", briefing: "Iae galere, quero um app Web com Websockets, evento atrás de evento. Não pode ter lag. Escolham bem a arquitetura." },
  { id: "SCN-022", theme: "Controle de Frigorífico", company: "Boiadeiro", stakeholder: "Clóvis", role: "Dono", projectType: "Desktop", complexity: "Baixa", briefing: "Opa. Computador de matadouro não tem cloud chic né. Me faz um desktop que imprime etiqueta e não enche o saco." },
  { id: "SCN-023", theme: "App de Encontros Sugar", company: "Docinho", stakeholder: "Patrícia D.", role: "Founder", projectType: "Mobile App", complexity: "Média", briefing: "Oizinho! Queremos um app mobile. A arquitetura precisa esconder nossos dados pra não dar vazamento por LGPD! Segurança alta no SQL!" },
  { id: "SCN-024", theme: "CRM de Advogados", company: "DireitoJá", stakeholder: "Dr. Lemos", role: "Sócio Sênior", projectType: "Web App", complexity: "Média", briefing: "Boa tarde. Precisamos de um CRM Web com busca de textos completa para milhares de processos em PDF. Banco de Dados robustos e busca rápida." },
  { id: "SCN-025", theme: "Previsão do Tempo AI", company: "Weathr", stakeholder: "Clara S.", role: "Meteorologista", projectType: "Data Pipeline", complexity: "Alta", briefing: "Estão me ouvindo? O clima de amanhã depende de Big Data hoje. Spark pipeline processando peta de informações térmicas pro D.Ware." },
  { id: "SCN-026", theme: "Gerador de Memes Web3", company: "DogeMeme", stakeholder: "Kyle", role: "CryptoBro", projectType: "Web App", complexity: "Baixa", briefing: "WAGMI guys! Só me larga um appzinho onde arrasta a foto, cunha um Nft e faz checkout web3 na nuvem com React e Node. Foguete nao tem ré." },
  { id: "SCN-027", theme: "Monitoramento de Idosos Isolados", company: "CuidAR", stakeholder: "Dona Maria", role: "Diretora da ONG", projectType: "IoT", complexity: "Média", briefing: "Boa tarde, jovens. Queremos conectar relógios nos idosos e nossos servidores devem alertar o posto médico. Não pode falhar o banco de dados." },
  { id: "SCN-028", theme: "Frente de Caixa Supermercado", company: "Mercado Dois Irmãos", stakeholder: "Seu Zé", role: "Gerente", projectType: "Desktop", complexity: "Baixa", briefing: "Bom dia. Minhas caixas ficam offline e sem rede. O programa tem q ser no Windows mesmo (Desktop) gravando no disco depois sobe pra nuvem." },
  { id: "SCN-029", theme: "Streaming de Rádio", company: "FM Mais", stakeholder: "DJ Rato", role: "Locutor", projectType: "Mobile App", complexity: "Baixa", briefing: "Baaaaao meu povo! Ouve aí, quero os aplicativo dos ouvinte doidão, manda som na orelha e aceita pedido de música ao vivasso." },
  { id: "SCN-030", theme: "Detecção de Fraudes de Cartão", company: "BankSecure", stakeholder: "Cel. Matias", role: "Head of Security", projectType: "API", complexity: "Alta", briefing: "Escute com atenção: APIs restritas e sigilosas, Machine Learning online validando em nanosegundos as compras em nosso Graph DB. Cumpra a missão." }
];

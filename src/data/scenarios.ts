export interface Scenario {
  id: string;
  theme: string;
  company: string;
  stakeholder: string;
  role: string;
  briefing: string[];
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
    briefing: [
      "Olá, tudo bem?",
      "Me chamo Roberto, sou o VP de Vendas aqui da MegaShop.",
      "Resolvi entrar em contato com vocês porque a nossa situação está crítica. Nossa plataforma atual simplesmente derreteu na última Black Friday.",
      "Nós precisamos construir um sistema web web moderno do zero.",
      "A expectativa é que a arquitetura aguente cerca de 50.000 usuários simultâneos nos momentos de pico.",
      "Não me venha com arquiteturas lentas, precisamos de velocidade de carregamento absurda e um front-end perfeitamente clean.",
      "Vocês conseguem assumir essa bronca pra gente?"
    ]
  },
  {
    id: "SCN-002",
    theme: "App de Entregas (Delivery)",
    company: "ZupFood",
    stakeholder: "Letícia Mendes",
    role: "CEO",
    projectType: "Mobile App",
    complexity: "Média",
    briefing: [
      "Oie, tudo bem por aí?",
      "Aqui é a Letícia, fundadora e CEO da ZupFood.",
      "Preciso da ajuda da equipe de engenharia de vocês urgente.",
      "Hoje meus motoboys estão usando grupos de WhatsApp pra gerenciar as entregas... Virou uma bagunça completa.",
      "Preciso que sua empresa crie nosso aplicativo nativo do zero.",
      "Os requisitos fundamentais são: GPS integrado rodando em background (tempo real), e um sistema de checkout com pagamento via PIX super rápido.",
      "E detalhe: tem que rodar tanto no Android quanto no iOS lisinho!"
    ]
  },
  {
    id: "SCN-003",
    theme: "Sistema Bancário Core",
    company: "Banco Trust",
    stakeholder: "Dr. Almir Ribeiro",
    role: "Diretor de TI",
    projectType: "API",
    complexity: "Alta",
    briefing: [
      "Bom dia.",
      "Sou o Diretor de TI do Banco Trust.",
      "Estamos passando por uma fase tensa de modernização do nosso core bancário, que é legado e roda desde 1998.",
      "Necessitamos de uma arquitetura de API Gateway ultra segura, fortemente tipada e puramente orientada a microserviços.",
      "O banco de dados precisa ser relacional, parrudo e distribuído.",
      "Nesse projeto, um bug minúsculo e nós perderemos milhões. Portanto, foco absoluto na segurança e certifiquem-se de desenhar transações ACID perfeitas."
    ]
  },
  {
    id: "SCN-004",
    theme: "Rede Social para Pets",
    company: "PetGram",
    stakeholder: "Camila Fox",
    role: "Founder & CMO",
    projectType: "Mobile App",
    complexity: "Baixa",
    briefing: [
      "Oieeee pessoal da engenharia!!",
      "Sou a Cami do PetGram! Minha ideia é tipo genial cara...",
      "Eu quero criar um Tinder, só que feito exclusivamente pra cachorros marcarem passeios no parque!",
      "Eu quero um app super hiper colorido, com um feed de fotos que role bem rápido estilo TikTok.",
      "O nosso backend tem que aguentar muiiita foto pesada da galera subindo vídeo de Golden Retriever toda hora.",
      "Bora codar isso acontecer? 🐾"
    ]
  },
  {
    id: "SCN-005",
    theme: "ERP de Logística Portuária",
    company: "PortoNave Br",
    stakeholder: "Capitão Jonas",
    role: "Gerente Operacional",
    projectType: "Desktop",
    complexity: "Alta",
    briefing: [
      "Saudações, marujos.",
      "Aqui é o Gerente Operacional do porto.",
      "Temos centenas de contêineres colossais entrando todos os dias e o sistema atual vive caindo na rede interna dos navios, gerando prejuízos incalculáveis no embarque.",
      "Queremos que vocês construam um sistema Desktop nativo.",
      "Ele deve ser fechado e robusto, sem muita frescura de UI, que faça comunicação com os guindastes via rede local TCP/IP.",
      "E sem invenções mágicas de Cloud Computing vitalícia. O mar não tem Wi-Fi 100% do tempo, então garantam a persistência offline em rede restrita!"
    ]
  },
  {
    id: "SCN-006",
    theme: "Sistema de Telemedicina",
    company: "Saúde+",
    stakeholder: "Dra. Sônia",
    role: "Chefe Médica",
    projectType: "Web App",
    complexity: "Média",
    briefing: [
      "Boa tarde, especialistas.",
      "Sou a Dra. Sônia.",
      "Com a nova aprovação da LGPD rigorosa, nossas vídeo-chamadas via Skype no consultório tornaram-se legalmente irregulares e não são seguras para uso médico.",
      "Contratamos vocês para desenvolver um Web App de Telemedicina 100% criptografado de ponta-a-ponta.",
      "Lembrem-se que os requisitos envolvem também um agendamento integrado via calendário relacional.",
      "Repito: O sigilo do quadro clínico do paciente é prioridade zero. Escolham a infraestrutura de dados a dedo."
    ]
  },
  {
    id: "SCN-007",
    theme: "Pipeline de Dados - Machine Learning",
    company: "NeuralAnalytics",
    stakeholder: "Eduardo DataMaker",
    role: "Lead Data Scientist",
    projectType: "Data Pipeline",
    complexity: "Alta",
    briefing: [
      "E aí, devs! Eduardo aqui.",
      "Tô liderando a parte de M.L (Machine Learning) da NeuralAnalytics.",
      "Direto ao ponto: nossos modelos preditivos estão com fome absurda de dados limpos.",
      "Quero que vocês construam um Data Pipeline parrudíssimo pro nosso novo sistema.",
      "O objetivo do software é pescar dados de streamings como o Twitter, processar os textos para análise de sentimentos e empilhar tudo assincronamente em um Data Warehouse mastodôntico.",
      "Por favor, adotem a melhor arquitetura de ETL e não fujam das linguagens performáticas."
    ]
  },
  {
    id: "SCN-008",
    theme: "AgroTech Sensoriamento",
    company: "Fazenda Inteligente",
    stakeholder: "Sr. João Pedro",
    role: "Latifundiário",
    projectType: "IoT",
    complexity: "Alta",
    briefing: [
      "Opa, bom dia moçada da cidade grande.",
      "Eu tenho um pouco mais de 20 mil hectares de área de plantio de soja no interior.",
      "Comprei aquelas caixinhas de sensores de solo recém-lançadas da China...",
      "Preciso de uma plataforma focada em Internet das Coisas (IoT) pra controlar o irrigamento automático da safra.",
      "Mas pensem numa coisa: lá tem sinal oscilando muito. Então a arquitetura precisa despachar pacotes ultraleves de métrica para os satélites de forma resiliente usando protocolos como MQTT.",
      "Confio no time de vocês, hein. Dinheiro não falta, é só não me decepcionar."
    ]
  },
  {
    id: "SCN-009",
    theme: "Automação de Marketing",
    company: "Viralize Marketing",
    stakeholder: "Fernando H.",
    role: "Growth Hacker",
    projectType: "Web App",
    complexity: "Média",
    briefing: [
      "Fala meeeeeeeeeeeeeu time!! Fernando do Growth na área!",
      "Nós somos agressivos nas metas e nossa ferramenta de envio atual tá nos afundando e perdendo leads quentes.",
      "Preciso encomendar um SaaS com vocês. O objetivo central é disparar milhōes de emails e capturas instantâneas baseadas num motor reativo de filas.",
      "A estrutura do app em si deve gerar funis de campanha ao vivo. Eu diria que eventos assíncronos (como Apache Kafka) seriam fundamentais e obrigatórios.",
      "Não deixem gargalos no Banco de Dados pelo amor de deus!"
    ]
  },
  {
    id: "SCN-010",
    theme: "Plataforma de E-learning",
    company: "EducaPlus",
    stakeholder: "Marcela Silva",
    role: "Coordenadora EAD",
    projectType: "Web App",
    complexity: "Baixa",
    briefing: [
      "Olá, boa tarde a todos!",
      "Meu nome é Marcela e coordeno as atividades teóricas do grupo EducaPlus.",
      "Tivemos que mudar as coisas muito rápido pra plataforma digital nos últimos anos.",
      "A gente precisa migrar para um AVA (Ambiente Virtual de Aprendizagem) sob medida desenvolvido especialmente para nossos mais de 8 mil alunos online na plataforma.",
      "Muitos estudantes possuem laptops simples, então criem um cliente web leve.",
      "E caprichem num bucket cloud forte para os vídeos pesados."
    ]
  },
  {
    id: "SCN-011",
    theme: "Chatbot de SAC",
    company: "CallCenter Giga",
    stakeholder: "Antônio Santos",
    role: "Supervisor",
    projectType: "API",
    complexity: "Baixa",
    briefing: [
      "Olá.",
      "O setor de reclamações tem 3 horas de fila de espera neste exato momento.",
      "Isso é inaceitável. Quero encomendar uma API de chatbot neural independente.",
      "O que ela vai fazer? Simples, vai interceptar todos os clientes impacientes nas pontas (WhatsApp, redes sociais, chat web) e filtrar 60% deles com respostas rápidas tiradas de uma Base de Conhecimento.",
      "Dessa vez um pilar de Logs NoSQL vai dar conta de registrar tudo sem ferver a máquina."
    ]
  },
  {
    id: "SCN-012",
    theme: "Corretora de Criptomoedas",
    company: "CoinBR",
    stakeholder: "Arthur Satoshi",
    role: "Co-Founder",
    projectType: "Web App",
    complexity: "Alta",
    briefing: [
      "Bilionários, beleza?",
      "Aqui é o Arthur. Fundo a CoinBR mês que vem.",
      "Nós vamos amassar os concorrentes institucionais batendo em UX e taxa-zero no spot trade.",
      "Pra isso, a nossa arquitetura técnica inteira tem que ser absurdamente afiada a níveis ridículos. Uma latência de meio segundo custa a vida financeira nossa e dos usuários.",
      "Desenhem microsserviços blindados com cache em memória fortíssimo (como Redis).",
      "É vida real. É dinheiro global."
    ]
  },
  { id: "SCN-013", theme: "App de Fitness", company: "GymBros", stakeholder: "Leo Stronda", role: "Personal Star", projectType: "Mobile App", complexity: "Baixa", briefing: ["E aíí!", "Bora lançar o maior app de treino das lojas Apple e Android em tempo recorde cara! As pessoas sentem dificuldade em ter uma rotina.", "O sistema nem precisa ser tãao parrudo hoje. Pode usar um backend mais simples na largada até validar com os primeiros clientes.", "O foco deve ser um Frontend insano em Mobile."] },
  { id: "SCN-014", theme: "Gerenciador de Cancelas", company: "ParkAuto", stakeholder: "Carlos B.", role: "Dono", projectType: "IoT", complexity: "Média", briefing: ["Boa tarde, aqui é o Carlos da ParkAuto.", "Preciso interligar todas as catracas do nosso estacionamento particular numa infraestrutura Cloud nativa.", "As catracas vão emitir ping via IoT em uma controladora mestre pra checar se o cartão do mensalista compensou em saldo e logo então liberar a porta.", "Use um Cloud simples e um BD seguro."] },
  { id: "SCN-015", theme: "Folha de Pagamentos", company: "RH Solutions", stakeholder: "Fátima Mendes", role: "Gerente HR", projectType: "Desktop", complexity: "Baixa", briefing: ["Olá, time de tecnologia!", "Nossas empresas clientes exigem níveis absurdos de sigilo legal de impostos nas transações financeiras.", "Precisamos de um App Desktop pesado em que o contador faz o fechamento local e o sistema encriptografado apenas sinca com um banco central as apurações."] },
  { id: "SCN-016", theme: "Buscador de Passagens Aéreas", company: "VoaLá", stakeholder: "Tiago Silva", role: "Product Owner", projectType: "Web App", complexity: "Alta", briefing: ["Olá time!", "A gente tá num oceano vermelho contra a 123Milhas e Decolar hoje... Precisamos de um novo motor de buscas pra passagens.", "O sistema precisa despachar Crawler/Scrapings em múltiplas companhias aéreas simultaneamente com milhões de threads.", "Concorrência bruta, CACHE altíssimo. Boa sorte."] },
  { id: "SCN-017", theme: "App de Meditação", company: "ZenLife", stakeholder: "Mestra Luiza", role: "Guru Mestre", projectType: "Mobile App", complexity: "Baixa", briefing: ["Que o universo respire junto conosco...", "Eu tenho uma comunidade maravilhosa querendo os meus guias diários.", "Vocês fariam a gentileza de arquitetar um app simples, aconchegante, sem muita firula que o pessoal dê o play no fone de ouvido nos trens sem gastar muitos dados?", "Um BD NoSQL pra guardar os perfis já é amável."] },
  { id: "SCN-018", theme: "Gateway de Múltiplos Pagamentos", company: "PayTux", stakeholder: "Rick CFO", role: "Diretor Financeiro", projectType: "API", complexity: "Alta", briefing: ["Fala galera.", "Sou bem objetivo com o negócio. Nosso card-processing não para de rodar na Amazon gerando dinheiro absurdo dia após dia. Nós queremos refazer ele do zero em casa na nossa equipe.", "Linguagem Altamente Tipada.", "PCI-Compliance em mente. Relacional Forte e que não se permita Double Spending (compra que processa e debita duas vezes)... Façam as magias de vocês."] },
  { id: "SCN-019", theme: "Monitor de Trânsito Cidades", company: "GovBR", stakeholder: "Prefeito Marcos", role: "Político Municipal", projectType: "IoT", complexity: "Alta", briefing: ["Boa tarde aos diretores do projeto da empresa de vocês.", "Nosso município precisa entrar na Era Digital logo ou eu nao me reelejo no fim do ciclo.", "A prefeitura tá com 20 mil câmeras novas adquiridas espalhadas nos semáforos, preciso de um ecossistema IoT gigantesco com Kafka ou Filas de alta resistência.", "Se virem. Paguem meu SLA."] },  
  { id: "SCN-020", theme: "Análise de DNA", company: "GeneSys", stakeholder: "Doutor Victor", role: "Pesquisador", projectType: "Data Pipeline", complexity: "Média", briefing: ["Olá, laboratório virtual!", "Aqui extraímos, mineramos e desconstruímos o genoma humano gerando Terabytes de log ininteligível pro homem mas perfeito pras máquinas.", "A gente necessita de um Pipeline de Dados em linguagens fortíssimas como Golang/Rust/Python atreladas a um Data Lake infinito. Tá feito o pedido."] },
  { id: "SCN-021", theme: "Jogo Multiplayer Web", company: "IndieDevZ", stakeholder: "Gui Player", role: "Gamedev Indie", projectType: "Web App", complexity: "Média", briefing: ["Iae galereeeee!", "Meu joguinho anterior bombou na Twitch ontem, já lancei um KickStarter que juntou uma grana violenta hoje... Eu decidi que vou tercerizar o Backend do meu novo Server-Side Game.", "Isso tem que ser de última, com zero lags de rede em Websockets síncronos.", "Estudem bem o backend node que vocês vão desenhar porque os players não aceitam Ping Alto!"] },  
  { id: "SCN-022", theme: "Controle de Frigorífico", company: "Boiadeiro Carnes", stakeholder: "Clóvis", role: "Dono", projectType: "Desktop", complexity: "Baixa", briefing: ["Opa... Beleza menino??", "Cê sabe que computador de matadouro vive cheio de sangue bovino em cima do teclado e não tem essas cloud chique que você vende pras startup não.", "Aqui o sistema roda em cima da câmara gélida e se travar apita tudo no almoxarife.", "Quero um treco que funciona offline no rwindows rodando leve.", "Dá pra fazer pra ontem?"] },
  { id: "SCN-023", theme: "App de Encontros Premium", company: "Docinho", stakeholder: "Patrícia D.", role: "Founder", projectType: "Mobile App", complexity: "Média", briefing: ["Oizinho equipe!", "É verdade que vocês entregam um produto final em pouquíssimos dias de Sprints e Planejamento arquitetural?", "Queremos um app de encontros com UX formidável voltado ao mercado AA de grana.", "O banco de dados de Matches precisa ser incrivelmente sigiloso, por conta que os ricaços temem por sua LGPD... Usem Criptografia sólida nesse projeto pf :3"] },
];

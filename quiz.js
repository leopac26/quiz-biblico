/*// LIMITES DAS FASES (20 perguntas por fase = 60 total)
const phaseLimits = [20, 40, 60];

let currentPhase = 1;
let currentIndex = 0;
let score = 0;
let currentQuestions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const phaseInfo = document.getElementById("phase-info");
const nextPhaseBtn = document.getElementById("next-phase-btn");

// SUA URL DO GOOGLE APPS SCRIPT
const PLANILHA_URL = "https://script.google.com/macros/s/AKfycbxnjeL3emA81saDy2pn83H50L_m83CeaGu4Gm00VLeEeGK8i6xb9v2HrG5tSr1W3x2swA/exec";

// TODAS AS PERGUNTAS (60)
const allQuestions = [
  {
    question: "(1) A quem Paulo chamou de 'meu companheiro de lutas' (Filemon 1:2)?",
    answers: [
      { text: "Apolo", correct: false },
      { text: "Afia", correct: false },
      { text: "Arquipo", correct: true },
      { text: "Adonias", correct: false }
    ]
  },
  {
    question: "(2) Quais discípulos perguntaram a Jesus se podiam fazer descer fogo do céu? (Lucas 9:54)",
    answers: [
      { text: "João e Tiago", correct: true },
      { text: "Pedro e João", correct: false },
      { text: "Tiago e Pedro", correct: false },
      { text: "Tiago e Mateus", correct: false }
    ]
  },
  {
    question: "(3) Qual era o nome da serpente de bronze que Moisés tinha feito? (2 Reis 18:4)",
    answers: [
      { text: "Aserá", correct: false },
      { text: "Leviatã", correct: false },
      { text: "Neustã", correct: true },
      { text: "Athenis", correct: false }
    ]
  },
  {
    question: "(4) Qual era o nome babilônico de Daniel? (Daniel 1:7)",
    answers: [
      { text: "Aspenaz", correct: false },
      { text: "Beltessazar", correct: true },
      { text: "Abede-Nego", correct: false },
      { text: "Mongero", correct: false }
    ]
  },
  {
    question: "(5) Qual o nome que Jacó deu ao lugar onde sonhou com Deus?",
    answers: [
      { text: "Betuel", correct: false },
      { text: "Luz", correct: false },
      { text: "Bezel", correct: false },
      { text: "Betel", correct: true }
    ]
  },
  {
    question: "(6) Qual o livro da Bíblia que termina com um ponto de interrogação? (Jonas 4:11)",
    answers: [
      { text: "Jonas", correct: true },
      { text: "Joel", correct: false },
      { text: "Judas", correct: false },
      { text: "João", correct: false }
    ]
  },
  {
    question: "(7) Qual livro se encontra no Novo Testamento?",
    answers: [
      { text: "Sofonias", correct: false },
      { text: "Obadias", correct: false },
      { text: "Habacuque", correct: false },
      { text: "Filemom", correct: true }
    ]
  },
  {
    question: "(8) Em quais livros da Bíblia não encontramos a palavra Deus?",
    answers: [
      { text: "Ester e Cânticos", correct: true },
      { text: "Ageu e Amós", correct: false },
      { text: "Oséias e Eclesiastes", correct: false },
      { text: "Obadias e Malaquias", correct: false }
    ]
  },
  {
    question: "(9) Qual o menor livro da Bíblia?",
    answers: [
      { text: "Judas", correct: false },
      { text: "II João", correct: true },
      { text: "III João", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(10) Na visão profética de João, qual era o número de cavaleiros do Apocalipse?",
    answers: [
      { text: "7", correct: false },
      { text: "6", correct: false },
      { text: "5", correct: false },
      { text: "4", correct: true }
    ]
  },
  {
    question: "(11) Quem escreveu a Epístola de Judas?",
    answers: [
      { text: "Judas irmão de Tiago", correct: true },
      { text: "Judas Iscariotes", correct: false },
      { text: "João Evangelista", correct: false },
      { text: "Lucas", correct: false }
    ]
  },
  {
    question: "(12) Quem teve seu corpo disputado pelo arcanjo Miguel e o Diabo?",
    answers: [
      { text: "Jesus", correct: false },
      { text: "Elizeu", correct: false },
      { text: "Moisés", correct: true },
      { text: "Abraão", correct: false }
    ]
  },
  {
    question: "(13) Qual era o nome da profetisa que estava fazendo a igreja de Tiatira cair?",
    answers: [
      { text: "Jezabel", correct: true },
      { text: "Lilith", correct: false },
      { text: "Dalila", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(14) A Morte montada em um cavalo amarelo surgiu na abertura de qual selo?",
    answers: [
      { text: "1º selo", correct: false },
      { text: "7º selo", correct: false },
      { text: "4º selo", correct: true },
      { text: "6º selo", correct: false }
    ]
  },
  {
    question: "(15) Quem foi a única mulher citada na Bíblia a ter status de juíza?",
    answers: [
      { text: "Jael", correct: false },
      { text: "Débora", correct: true },
      { text: "Ester", correct: false },
      { text: "Rute", correct: false }
    ]
  },
  {
    question: "(16) A quem o Apóstolo Paulo chamou de 'médico amado'?",
    answers: [
      { text: "Jesus", correct: false },
      { text: "Demas", correct: false },
      { text: "Lucas", correct: true },
      { text: "João", correct: false }
    ]
  },
  {
    question: "(17) Quem governou sendo rei e sacerdote ao mesmo tempo?",
    answers: [
      { text: "Joacaz", correct: false },
      { text: "Manassés", correct: false },
      { text: "Melquias", correct: false },
      { text: "Melquisedeque", correct: true }
    ]
  },
  {
    question: "(18) Que animal mordeu a mão do Apóstolo Paulo?",
    answers: [
      { text: "Lagarto", correct: false },
      { text: "Escorpião", correct: false },
      { text: "Víbora", correct: true },
      { text: "Abelha", correct: false }
    ]
  },
  {
    question: "(19) Qual era a idade de Calebe quando pediu Hebrom para Josué?",
    answers: [
      { text: "40 anos", correct: false },
      { text: "70 anos", correct: false },
      { text: "120 anos", correct: false },
      { text: "85 anos", correct: true }
    ]
  },
  {
    question: "(20) Por quantas moedas Judas entregou Jesus?",
    answers: [
      { text: "30 moedas de ouro", correct: false },
      { text: "30 moedas de prata", correct: true },
      { text: "100 denários", correct: false },
      { text: "30 moedas de bronze", correct: false }
    ]
  },
  {
    question: "(21) Quem foram apelidados por Jesus de Boanerges ('Filhos do Trovão')?",
    answers: [
      { text: "João e Pedro", correct: false },
      { text: "Lucas e Pedro", correct: false },
      { text: "Pedro e Tiago", correct: false },
      { text: "João e Tiago", correct: true }
    ]
  },
  {
    question: "(22) Qual era o nome da única filha de Lia?",
    answers: [
      { text: "Zilpa", correct: false },
      { text: "Diná", correct: true },
      { text: "Raquel", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(23) Qual o discípulo que acompanhou Jesus até a sua crucificação?",
    answers: [
      { text: "André", correct: false },
      { text: "Tiago", correct: false },
      { text: "João", correct: true },
      { text: "Pedro", correct: false }
    ]
  },
  {
    question: "(24) Quantos capítulos tem o Livro de Naum?",
    answers: [
      { text: "1", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "3", correct: true }
    ]
  },
  {
    question: "(25) O Velho Testamento reúne mais livros do que o Novo Testamento?",
    answers: [
      { text: "sim", correct: true },
      { text: "não", correct: false },
      { text: "Ambos tem a mesma quantidade", correct: false }
    ]
  },
  {
    question: "(26) A estátua do sonho de Nabucodonosor era composta de quais elementos?",
    answers: [
      { text: "Toda em ouro", correct: false },
      { text: "Ouro, prata, ônix e ferro", correct: false },
      { text: "Ouro, prata, bronze, onix e ferro", correct: false },
      { text: "Ouro, prata, bronze, ferro e barro", correct: true }
    ]
  },
  {
    question: "(27) Quem era conhecido por ser cobrador de impostos?",
    answers: [
      { text: "João Batista", correct: false },
      { text: "Bartolomeu", correct: false },
      { text: "Zaqueu", correct: true },
      { text: "Judas Tadeu", correct: false }
    ]
  },
  {
    question: "(28) Quanto tempo Jonas ficou preso dentro da barriga de um grande peixe?",
    answers: [
      { text: "7 dias", correct: false },
      { text: "3 dias", correct: true },
      { text: "1 dia", correct: false },
      { text: "4 dias", correct: false }
    ]
  },
  {
    question: "(29) Quais foram os dois nomes indicados para substituir Judas Iscariotes?",
    answers: [
      { text: "Barsabás e Matias", correct: true },
      { text: "Paulo e Matias", correct: false },
      { text: "Paulo e José", correct: false },
      { text: "Matias e Paulo", correct: false }
    ]
  },
  {
    question: "(30) Em Tessalônica, Paulo, Silas e Timóteo se refugiaram na casa de qual irmão?",
    answers: [
      { text: "Apolo", correct: false },
      { text: "Barnabé", correct: false },
      { text: "Arquipo", correct: false },
      { text: "Jasom", correct: true }
    ]
  },
  {
    question: "(31) Adão viveu ao todo quantos anos?",
    answers: [
      { text: "930 anos", correct: true },
      { text: "1000 anos", correct: false },
      { text: "500 anos", correct: false },
      { text: "850 anos", correct: false }
    ]
  },
  {
    question: "(32) Jesus enviou quantos discípulos para a missão de pregar o Evangelho?",
    answers: [
      { text: "7 discípulos", correct: false },
      { text: "70 discípulos", correct: true },
      { text: "12 discípulos", correct: false },
      { text: "6 discípulos", correct: false }
    ]
  },
  {
    question: "(33) Em qual dia da criação foi feito o sol, a lua e as estrelas?",
    answers: [
      { text: "1º dia", correct: false },
      { text: "3º dia", correct: false },
      { text: "4º dia", correct: true },
      { text: "6º dia", correct: false }
    ]
  },
  {
    question: "(34) O Livro de Atos dos Apóstolos é conhecido como...",
    answers: [
      { text: "um livro histórico", correct: true },
      { text: "um livro profético", correct: false },
      { text: "um livro poético", correct: false },
      { text: "um livro teológico", correct: false }
    ]
  },
  {
    question: "(35) Depois do Dilúvio, Noé viveu por mais quantos anos?",
    answers: [
      { text: "350 anos", correct: true },
      { text: "100 anos", correct: false },
      { text: "200 anos", correct: false },
      { text: "50 anos", correct: false }
    ]
  },
  {
    question: "(36) Qual é o quinto livro do Novo Testamento?",
    answers: [
      { text: "Evangelho de Marcos", correct: false },
      { text: "Carta aos Romanos", correct: false },
      { text: "Atos dos Apóstolos", correct: true },
      { text: "Evangelho de Lucas", correct: false }
    ]
  },
  {
    question: "(37) Qual era o nome da mulher de Jó?",
    answers: [
      { text: "Abgail", correct: false },
      { text: "Dâmares", correct: false },
      { text: "A BÍBLIA NÃO DIZ", correct: true },
      { text: "Sophia", correct: false }
    ]
  },
  {
    question: "(38) Quem Noé amaldiçoou após saber que foi visto em nudez?",
    answers: [
      { text: "Canaã", correct: true },
      { text: "Cam", correct: false },
      { text: "Jafé", correct: false },
      { text: "Esaú", correct: false }
    ]
  },
  {
    question: "(39) Qual das alternativas não é um livro apócrifo?",
    answers: [
      { text: "Livro de Enoque", correct: false },
      { text: "Livro de Ageu", correct: true },
      { text: "Livro de Tobias", correct: false },
      { text: "Livro de Tomé", correct: false }
    ]
  },
  {
    question: "(40) Qual destes livros contém mais de um capítulo?",
    answers: [
      { text: "Judas", correct: false },
      { text: "Obadias", correct: false },
      { text: "Joel", correct: true }
    ]
  },
  {
    question: "(41) Qual é o versículo mais extenso da Bíblia?",
    answers: [
      { text: "Ester 8:9", correct: true },
      { text: "Salmos 119:43", correct: false },
      { text: "Isaías 24:2", correct: false },
      { text: "Jeremias 3:5", correct: false }
    ]
  },
  {
    question: "(42) Quantos versículos tem Salmos 119?",
    answers: [
      { text: "176 versículos", correct: true },
      { text: "200 versículos", correct: false },
      { text: "100 versículos", correct: false },
      { text: "150 versículos", correct: false }
    ]
  },
  {
    question: "(43) Qual a mulher que acolheu o seu inimigo e depois o matou? (Juízes 4:18-21)",
    answers: [
      { text: "Raquel", correct: false },
      { text: "Débora", correct: false },
      { text: "Jael", correct: true },
      { text: "Rebeca", correct: false }
    ]
  },
  {
    question: "(44) Que homem depois de morto, matou mais pessoas do que em vida? (Juízes 16:30)",
    answers: [
      { text: "Elias", correct: false },
      { text: "Sansão", correct: true },
      { text: "Judas", correct: false },
      { text: "Davi", correct: false }
    ]
  },
  {
    question: "(45) Quem se tornou rei enquanto procurava as jumentas do seu pai? (1 Samuel 9:3)",
    answers: [
      { text: "Davi", correct: false },
      { text: "Saul", correct: true },
      { text: "Acabe", correct: false },
      { text: "Salomão", correct: false }
    ]
  },
  {
    question: "(46) Quem tinha um cabelo que pesava mais de dois quilos? (2 Samuel 14:26)",
    answers: [
      { text: "Absalão", correct: true },
      { text: "Davi", correct: false },
      { text: "Sansão", correct: false },
      { text: "Eliabe", correct: false }
    ]
  },
  {
    question: "(47) Quem teve a vida prolongada por mais 15 anos após orar? (Isaías 38:5)",
    answers: [
      { text: "Enoque", correct: false },
      {text: "Matusalém", correct: false },
      { text: "Ezequias", correct: true },
      { text: "Elias", correct: false }
    ]
  },
  {
    question: "(48) Quem foi apelidado pela multidão em Listra de Zeus e Hermes? (Atos 14:12)",
    answers: [
      { text: "Pedro e João", correct: false },
      { text: "Barnabé e Paulo", correct: true },
      { text: "Jesus e Paulo", correct: false },
      { text: "João e Marcos", correct: false }
    ]
  },
  {
    question: "(49) Quais os 2 homens que Paulo disse que naufragaram na fé? (1 Timóteo 1:19-20)",
    answers: [
      { text: "Himeneu e Alexandre", correct: true },
      { text: "Janes e Jambres", correct: false },
      { text: "Silas e Barnabé", correct: false },
      { text: "Dimas e Tito", correct: false }
    ]
  },
  {
    question: "(50) Qual foi o profeta que surgiu depois de Malaquias? (Mateus 3:1)",
    answers: [
      { text: "Zacarias", correct: false },
      { text: "Joel", correct: false },
      { text: "João Batista", correct: true },
      { text: "Elias", correct: false }
    ]
  },
  {
    question: "(51) Quantos carros de ferro Jabim possuía? (Juízes 4:2)",
    answers: [
      { text: "900 carros de ferro", correct: true },
      { text: "300 carros de ferro", correct: false },
      { text: "100 carros de ferro", correct: false },
      { text: "1.000 carros de ferro", correct: false }
    ]
  },
  {
    question: "(52) Qual o nome do pai de Saul? (1 Samuel 9:1)",
    answers: [
      { text: "Abiel", correct: false },
      { text: "Quis", correct: true },
      { text: "Zeror", correct: false },
      { text: "Cis", correct: false }
    ]
  },
  {
    question: "(53) Sísera foi morto em que situação? (Juízes 4:21)",
    answers: [
      { text: "Enquanto dormia", correct: true },
      { text: "Enquanto lutava", correct: false },
      { text: "Enquanto orava", correct: false },
      { text: "Enquanto fugia", correct: false }
    ]
  },
  {
    question: "(54) Balaão foi chamado por quem para amaldiçoar o povo de Israel? (Números 22:4)",
    answers: [
      { text: "Moabe", correct: false },
      { text: "Balaque", correct: true },
      { text: "Zipor", correct: false },
      { text: "Zadoque", correct: false }
    ]
  },
  {
    question: "(55) Oséias profetizou durante o reinado de quais reis? (Oséias 1:1)",
    answers: [
      { text: "Saul, Davi e Salomão", correct: false },
      { text: "Jozias, Joacaz, Ocazias e Jorão", correct: false },
      { text: "Uzias, Jotão, Acaz, Ezequias e Jeroboão", correct: true },
      { text: "Ezequiel, Isaías, Jeremias e Daniel", correct: false }
    ]
  },
  {
    question: "(56) Oséias se casou com... (Oséias 1:2-3)",
    answers: [
      { text: "Uma rainha", correct: false },
      { text: "Uma mulher adúltera", correct: true },
      { text: "Uma mulher estrangeira", correct: false },
      { text: "Uma levita", correct: false }
    ]
  },
  {
    question: "(57) Sofonias foi profeta durante qual reinado? (Sofonias 1:1)",
    answers: [
      { text: "Reinado de Josias", correct: true },
      { text: "Reinado de Acabe", correct: false },
      { text: "Reinado de Acaz", correct: false },
      { text: "Reinado de Salomão", correct: false }
    ]
  },
  {
    question: "(58) Que povo recebeu Paulo com grande interesse? (Atos 17:11)",
    answers: [
      { text: "Os tessalônios", correct: false },
      { text: "Os bereanos", correct: true },
      { text: "Os atenienses", correct: false },
      { text: "Os coríntios", correct: false }
    ]
  },
  {
    question: "(59) O que deixou Paulo indignado em Atenas? (Atos 17:16-17)",
    answers: [
      { text: "A promiscuidade do povo grego", correct: false },
      { text: "A quantidade de ídolos na cidade", correct: true },
      { text: "A falta de sinagogas", correct: false },
      { text: "A frieza espiritual", correct: false }
    ]
  },
  {
    question: "(60) Em Atenas, onde Paulo foi levado para falar sobre Jesus? (Atos 17:19)",
    answers: [
      { text: "Coliseu", correct: false },
      { text: "Santuário", correct: false },
      { text: "Areópago", correct: true },
      { text: "Sinagoga", correct: false }
    ]
  }
];

// FUNÇÃO PARA EMBARALHAR
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// FUNÇÃO CORRIGIDA PARA ENVIAR AO GOOGLE SHEETS (COM NO-CORS)
async function enviarParaPlanilha(dados) {
  try {
    console.log("📤 Enviando dados para planilha:", dados);
    
    // Usando mode: 'no-cors' para evitar erro de CORS
    await fetch(PLANILHA_URL, {
      method: "POST",
      mode: "no-cors",  // ESSE É O SEGREDO!
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados)
    });
    
    // Com no-cors, não podemos ler a resposta, mas assumimos que deu certo
    console.log("✅ Dados enviados para planilha (mode: no-cors)");
    
    // Salva localmente também como backup
    const localStorageKey = `respostas_backup_${dados.nome}`;
    const respostasSalvas = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    respostasSalvas.push({...dados, data_backup: new Date().toISOString()});
    localStorage.setItem(localStorageKey, JSON.stringify(respostasSalvas));
    
  } catch (erro) {
    console.error("❌ Erro ao enviar para planilha:", erro);
  }
}

// INICIAR QUIZ
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  const nome = document.getElementById("usuario").value.trim();
  if (!nome) {
    alert("Digite seu nome para começar o quiz.");
    return;
  }
  localStorage.setItem("usuario", nome);
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  startPhase(1);
});

// COMEÇAR FASE
function startPhase(phase) {
  currentPhase = phase;
  currentIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  nextPhaseBtn.classList.add("hidden");

  const start = phase === 1 ? 0 : phaseLimits[phase - 2];
  const end = phaseLimits[phase - 1];
  currentQuestions = shuffleArray([...allQuestions.slice(start, end)]);

  phaseInfo.textContent = `📖 Fase ${currentPhase} - ${currentQuestions.length} perguntas`;
  showQuestion();
}

// MOSTRAR PERGUNTA
function showQuestion() {
  const question = currentQuestions[currentIndex];
  questionEl.textContent = question.question;
  answersEl.innerHTML = "";

  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => checkAnswer(btn, answer.correct);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

// VERIFICAR RESPOSTA
function checkAnswer(button, isCorrect) {
  const buttons = answersEl.querySelectorAll("button");
  const usuario = localStorage.getItem("usuario") || "Anônimo";
  const perguntaAtual = currentQuestions[currentIndex].question;
  const respostaSelecionada = button.textContent;
  const totalPerguntasFase = currentQuestions.length;

  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    button.style.backgroundColor = "#2e7d32";
    score++;
  } else {
    button.style.backgroundColor = "#c62828";
    const currentQ = currentQuestions[currentIndex];
    buttons.forEach((btn, idx) => {
      if (currentQ.answers[idx].correct) {
        btn.style.backgroundColor = "#2e7d32";
      }
    });
  }

  // ENVIA PARA PLANILHA
  enviarParaPlanilha({
    nome: usuario,
    fase: currentPhase,
    pergunta: perguntaAtual,
    resposta: respostaSelecionada,
    acertou: isCorrect,
    pontuacao: score,
    total: totalPerguntasFase,
    data_hora: new Date().toLocaleString("pt-BR"),
    timestamp: new Date().toISOString()
  });

  nextBtn.classList.remove("hidden");
}

// PRÓXIMA PERGUNTA
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// MOSTRAR RESULTADO
async function showResult() {
  questionEl.textContent = "";
  answersEl.innerHTML = "";
  resultEl.classList.remove("hidden");

  const usuario = localStorage.getItem("usuario") || "Anônimo";
  const total = currentQuestions.length;
  const acertos = score;
  const acertoPercent = Math.round((acertos / total) * 100);

  // ENVIA RESULTADO FINAL DA FASE
  await enviarParaPlanilha({
    nome: usuario,
    tipo: "RESULTADO_FINAL_FASE",
    fase: currentPhase,
    pontuacao_final: acertos,
    total_perguntas: total,
    percentual_acerto: acertoPercent,
    aprovado: acertoPercent >= 60,
    data_hora: new Date().toLocaleString("pt-BR"),
    timestamp: new Date().toISOString()
  });

  if (acertoPercent >= 60 && currentPhase < phaseLimits.length) {
    resultEl.innerHTML = `✅ Parabéns! Você acertou ${acertos}/${total} (${acertoPercent}%).<br>🚀 Você pode avançar para a próxima fase!`;
    nextPhaseBtn.classList.remove("hidden");
  } else if (acertoPercent >= 60) {
    resultEl.innerHTML = `🏆 PARABÉNS! Você completou o QUIZ!<br>⭐ Acertos: ${acertos}/${total} (${acertoPercent}%) ⭐`;
    
    // Envia conclusão do quiz
    await enviarParaPlanilha({
      nome: usuario,
      tipo: "CONCLUIU_QUIZ",
      pontuacao_total: acertos,
      percentual_global: acertoPercent,
      data_hora: new Date().toLocaleString("pt-BR"),
      timestamp: new Date().toISOString()
    });
  } else {
    resultEl.innerHTML = `📚 Você acertou ${acertos}/${total} (${acertoPercent}%).<br>⚠️ Precisa de 60% para avançar. Tente novamente!`;
  }
}

// AVANÇAR FASE
nextPhaseBtn.addEventListener("click", () => {
  if (currentPhase < phaseLimits.length) {
    startPhase(currentPhase + 1);
  }
});

// FUNÇÕES ADICIONAIS
function consultarProgresso() {
  const usuario = localStorage.getItem("usuario") || "desconhecido";
  const data = localStorage.getItem(`progresso_${usuario}`);

  if (data) {
    const p = JSON.parse(data);
    document.getElementById("progresso-info").innerHTML =
      `👤 ${p.usuario} | 📘 Fase ${p.fase} | ⭐ ${p.pontuacao} pts | 🕓 ${new Date(p.data).toLocaleString()}`;
  } else {
    document.getElementById("progresso-info").innerHTML = "⚠️ Nenhum progresso salvo";
  }
}

function verAcertosUsuario() {
  const usuario = localStorage.getItem("usuario") || "Anônimo";
  alert(`📊 ${usuario}, você tem ${score} acertos nesta fase!\n\nOs dados estão sendo salvos localmente e enviados para a planilha do Google!`);
}

function salvarProgressoLocal() {
  const usuario = localStorage.getItem("usuario") || "desconhecido";
  const progresso = {
    usuario,
    fase: currentPhase,
    pontuacao: score,
    data: new Date().toISOString()
  };
  localStorage.setItem(`progresso_${usuario}`, JSON.stringify(progresso));
  console.log("✅ Progresso salvo localmente");
}*/







// LIMITES DAS FASES (20 perguntas por fase = 60 total)
const phaseLimits = [20, 40, 60];

let currentPhase = 1;
let currentIndex = 0;
let score = 0;
let currentQuestions = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const phaseInfo = document.getElementById("phase-info");
const nextPhaseBtn = document.getElementById("next-phase-btn");

// ⭐ APENAS A URL DO GOOGLE SHEETS - SEM RENDER!
const PLANILHA_URL = "https://script.google.com/macros/s/AKfycbyjLevWPLSwdQE_CIY5bdZezSEPPRcxpq_8KuAPSqgKcPttIOfYRN7dKJcawmoa15wQ/exec";

 // TODAS AS PERGUNTAS (60)
const allQuestions = [
  {
    question: "(1) A quem Paulo chamou de 'meu companheiro de lutas' (Filemon 1:2)?",
    answers: [
      { text: "Apolo", correct: false },
      { text: "Afia", correct: false },
      { text: "Arquipo", correct: true },
      { text: "Adonias", correct: false }
    ]
  },
  {
    question: "(2) Quais discípulos perguntaram a Jesus se podiam fazer descer fogo do céu? (Lucas 9:54)",
    answers: [
      { text: "João e Tiago", correct: true },
      { text: "Pedro e João", correct: false },
      { text: "Tiago e Pedro", correct: false },
      { text: "Tiago e Mateus", correct: false }
    ]
  },
  {
    question: "(3) Qual era o nome da serpente de bronze que Moisés tinha feito? (2 Reis 18:4)",
    answers: [
      { text: "Aserá", correct: false },
      { text: "Leviatã", correct: false },
      { text: "Neustã", correct: true },
      { text: "Athenis", correct: false }
    ]
  },
  {
    question: "(4) Qual era o nome babilônico de Daniel? (Daniel 1:7)",
    answers: [
      { text: "Aspenaz", correct: false },
      { text: "Beltessazar", correct: true },
      { text: "Abede-Nego", correct: false },
      { text: "Mongero", correct: false }
    ]
  },
  {
    question: "(5) Qual o nome que Jacó deu ao lugar onde sonhou com Deus?",
    answers: [
      { text: "Betuel", correct: false },
      { text: "Luz", correct: false },
      { text: "Bezel", correct: false },
      { text: "Betel", correct: true }
    ]
  },
  {
    question: "(6) Qual o livro da Bíblia que termina com um ponto de interrogação? (Jonas 4:11)",
    answers: [
      { text: "Jonas", correct: true },
      { text: "Joel", correct: false },
      { text: "Judas", correct: false },
      { text: "João", correct: false }
    ]
  },
  {
    question: "(7) Qual livro se encontra no Novo Testamento?",
    answers: [
      { text: "Sofonias", correct: false },
      { text: "Obadias", correct: false },
      { text: "Habacuque", correct: false },
      { text: "Filemom", correct: true }
    ]
  },
  {
    question: "(8) Em quais livros da Bíblia não encontramos a palavra Deus?",
    answers: [
      { text: "Ester e Cânticos", correct: true },
      { text: "Ageu e Amós", correct: false },
      { text: "Oséias e Eclesiastes", correct: false },
      { text: "Obadias e Malaquias", correct: false }
    ]
  },
  {
    question: "(9) Qual o menor livro da Bíblia?",
    answers: [
      { text: "Judas", correct: false },
      { text: "II João", correct: true },
      { text: "III João", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(10) Na visão profética de João, qual era o número de cavaleiros do Apocalipse?",
    answers: [
      { text: "7", correct: false },
      { text: "6", correct: false },
      { text: "5", correct: false },
      { text: "4", correct: true }
    ]
  },
  {
    question: "(11) Quem escreveu a Epístola de Judas?",
    answers: [
      { text: "Judas irmão de Tiago", correct: true },
      { text: "Judas Iscariotes", correct: false },
      { text: "João Evangelista", correct: false },
      { text: "Lucas", correct: false }
    ]
  },
  {
    question: "(12) Quem teve seu corpo disputado pelo arcanjo Miguel e o Diabo?",
    answers: [
      { text: "Jesus", correct: false },
      { text: "Elizeu", correct: false },
      { text: "Moisés", correct: true },
      { text: "Abraão", correct: false }
    ]
  },
  {
    question: "(13) Qual era o nome da profetisa que estava fazendo a igreja de Tiatira cair?",
    answers: [
      { text: "Jezabel", correct: true },
      { text: "Lilith", correct: false },
      { text: "Dalila", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(14) A Morte montada em um cavalo amarelo surgiu na abertura de qual selo?",
    answers: [
      { text: "1º selo", correct: false },
      { text: "7º selo", correct: false },
      { text: "4º selo", correct: true },
      { text: "6º selo", correct: false }
    ]
  },
  {
    question: "(15) Quem foi a única mulher citada na Bíblia a ter status de juíza?",
    answers: [
      { text: "Jael", correct: false },
      { text: "Débora", correct: true },
      { text: "Ester", correct: false },
      { text: "Rute", correct: false }
    ]
  },
  {
    question: "(16) A quem o Apóstolo Paulo chamou de 'médico amado'?",
    answers: [
      { text: "Jesus", correct: false },
      { text: "Demas", correct: false },
      { text: "Lucas", correct: true },
      { text: "João", correct: false }
    ]
  },
  {
    question: "(17) Quem governou sendo rei e sacerdote ao mesmo tempo?",
    answers: [
      { text: "Joacaz", correct: false },
      { text: "Manassés", correct: false },
      { text: "Melquias", correct: false },
      { text: "Melquisedeque", correct: true }
    ]
  },
  {
    question: "(18) Que animal mordeu a mão do Apóstolo Paulo?",
    answers: [
      { text: "Lagarto", correct: false },
      { text: "Escorpião", correct: false },
      { text: "Víbora", correct: true },
      { text: "Abelha", correct: false }
    ]
  },
  {
    question: "(19) Qual era a idade de Calebe quando pediu Hebrom para Josué?",
    answers: [
      { text: "40 anos", correct: false },
      { text: "70 anos", correct: false },
      { text: "120 anos", correct: false },
      { text: "85 anos", correct: true }
    ]
  },
  {
    question: "(20) Por quantas moedas Judas entregou Jesus?",
    answers: [
      { text: "30 moedas de ouro", correct: false },
      { text: "30 moedas de prata", correct: true },
      { text: "100 denários", correct: false },
      { text: "30 moedas de bronze", correct: false }
    ]
  },
  {
    question: "(21) Quem foram apelidados por Jesus de Boanerges ('Filhos do Trovão')?",
    answers: [
      { text: "João e Pedro", correct: false },
      { text: "Lucas e Pedro", correct: false },
      { text: "Pedro e Tiago", correct: false },
      { text: "João e Tiago", correct: true }
    ]
  },
  {
    question: "(22) Qual era o nome da única filha de Lia?",
    answers: [
      { text: "Zilpa", correct: false },
      { text: "Diná", correct: true },
      { text: "Raquel", correct: false },
      { text: "Ester", correct: false }
    ]
  },
  {
    question: "(23) Qual o discípulo que acompanhou Jesus até a sua crucificação?",
    answers: [
      { text: "André", correct: false },
      { text: "Tiago", correct: false },
      { text: "João", correct: true },
      { text: "Pedro", correct: false }
    ]
  },
  {
    question: "(24) Quantos capítulos tem o Livro de Naum?",
    answers: [
      { text: "1", correct: false },
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "3", correct: true }
    ]
  },
  {
    question: "(25) O Velho Testamento reúne mais livros do que o Novo Testamento?",
    answers: [
      { text: "sim", correct: true },
      { text: "não", correct: false },
      { text: "Ambos tem a mesma quantidade", correct: false }
    ]
  },
  {
    question: "(26) A estátua do sonho de Nabucodonosor era composta de quais elementos?",
    answers: [
      { text: "Toda em ouro", correct: false },
      { text: "Ouro, prata, ônix e ferro", correct: false },
      { text: "Ouro, prata, bronze, onix e ferro", correct: false },
      { text: "Ouro, prata, bronze, ferro e barro", correct: true }
    ]
  },
  {
    question: "(27) Quem era conhecido por ser cobrador de impostos?",
    answers: [
      { text: "João Batista", correct: false },
      { text: "Bartolomeu", correct: false },
      { text: "Zaqueu", correct: true },
      { text: "Judas Tadeu", correct: false }
    ]
  },
  {
    question: "(28) Quanto tempo Jonas ficou preso dentro da barriga de um grande peixe?",
    answers: [
      { text: "7 dias", correct: false },
      { text: "3 dias", correct: true },
      { text: "1 dia", correct: false },
      { text: "4 dias", correct: false }
    ]
  },
  {
    question: "(29) Quais foram os dois nomes indicados para substituir Judas Iscariotes?",
    answers: [
      { text: "Barsabás e Matias", correct: true },
      { text: "Paulo e Matias", correct: false },
      { text: "Paulo e José", correct: false },
      { text: "Matias e Paulo", correct: false }
    ]
  },
  {
    question: "(30) Em Tessalônica, Paulo, Silas e Timóteo se refugiaram na casa de qual irmão?",
    answers: [
      { text: "Apolo", correct: false },
      { text: "Barnabé", correct: false },
      { text: "Arquipo", correct: false },
      { text: "Jasom", correct: true }
    ]
  },
  {
    question: "(31) Adão viveu ao todo quantos anos?",
    answers: [
      { text: "930 anos", correct: true },
      { text: "1000 anos", correct: false },
      { text: "500 anos", correct: false },
      { text: "850 anos", correct: false }
    ]
  },
  {
    question: "(32) Jesus enviou quantos discípulos para a missão de pregar o Evangelho?",
    answers: [
      { text: "7 discípulos", correct: false },
      { text: "70 discípulos", correct: true },
      { text: "12 discípulos", correct: false },
      { text: "6 discípulos", correct: false }
    ]
  },
  {
    question: "(33) Em qual dia da criação foi feito o sol, a lua e as estrelas?",
    answers: [
      { text: "1º dia", correct: false },
      { text: "3º dia", correct: false },
      { text: "4º dia", correct: true },
      { text: "6º dia", correct: false }
    ]
  },
  {
    question: "(34) O Livro de Atos dos Apóstolos é conhecido como...",
    answers: [
      { text: "um livro histórico", correct: true },
      { text: "um livro profético", correct: false },
      { text: "um livro poético", correct: false },
      { text: "um livro teológico", correct: false }
    ]
  },
  {
    question: "(35) Depois do Dilúvio, Noé viveu por mais quantos anos?",
    answers: [
      { text: "350 anos", correct: true },
      { text: "100 anos", correct: false },
      { text: "200 anos", correct: false },
      { text: "50 anos", correct: false }
    ]
  },
  {
    question: "(36) Qual é o quinto livro do Novo Testamento?",
    answers: [
      { text: "Evangelho de Marcos", correct: false },
      { text: "Carta aos Romanos", correct: false },
      { text: "Atos dos Apóstolos", correct: true },
      { text: "Evangelho de Lucas", correct: false }
    ]
  },
  {
    question: "(37) Qual era o nome da mulher de Jó?",
    answers: [
      { text: "Abgail", correct: false },
      { text: "Dâmares", correct: false },
      { text: "A BÍBLIA NÃO DIZ", correct: true },
      { text: "Sophia", correct: false }
    ]
  },
  {
    question: "(38) Quem Noé amaldiçoou após saber que foi visto em nudez?",
    answers: [
      { text: "Canaã", correct: true },
      { text: "Cam", correct: false },
      { text: "Jafé", correct: false },
      { text: "Esaú", correct: false }
    ]
  },
  {
    question: "(39) Qual das alternativas não é um livro apócrifo?",
    answers: [
      { text: "Livro de Enoque", correct: false },
      { text: "Livro de Ageu", correct: true },
      { text: "Livro de Tobias", correct: false },
      { text: "Livro de Tomé", correct: false }
    ]
  },
  {
    question: "(40) Qual destes livros contém mais de um capítulo?",
    answers: [
      { text: "Judas", correct: false },
      { text: "Obadias", correct: false },
      { text: "Joel", correct: true }
    ]
  },
  {
    question: "(41) Qual é o versículo mais extenso da Bíblia?",
    answers: [
      { text: "Ester 8:9", correct: true },
      { text: "Salmos 119:43", correct: false },
      { text: "Isaías 24:2", correct: false },
      { text: "Jeremias 3:5", correct: false }
    ]
  },
  {
    question: "(42) Quantos versículos tem Salmos 119?",
    answers: [
      { text: "176 versículos", correct: true },
      { text: "200 versículos", correct: false },
      { text: "100 versículos", correct: false },
      { text: "150 versículos", correct: false }
    ]
  },
  {
    question: "(43) Qual a mulher que acolheu o seu inimigo e depois o matou? (Juízes 4:18-21)",
    answers: [
      { text: "Raquel", correct: false },
      { text: "Débora", correct: false },
      { text: "Jael", correct: true },
      { text: "Rebeca", correct: false }
    ]
  },
  {
    question: "(44) Que homem depois de morto, matou mais pessoas do que em vida? (Juízes 16:30)",
    answers: [
      { text: "Elias", correct: false },
      { text: "Sansão", correct: true },
      { text: "Judas", correct: false },
      { text: "Davi", correct: false }
    ]
  },
  {
    question: "(45) Quem se tornou rei enquanto procurava as jumentas do seu pai? (1 Samuel 9:3)",
    answers: [
      { text: "Davi", correct: false },
      { text: "Saul", correct: true },
      { text: "Acabe", correct: false },
      { text: "Salomão", correct: false }
    ]
  },
  {
    question: "(46) Quem tinha um cabelo que pesava mais de dois quilos? (2 Samuel 14:26)",
    answers: [
      { text: "Absalão", correct: true },
      { text: "Davi", correct: false },
      { text: "Sansão", correct: false },
      { text: "Eliabe", correct: false }
    ]
  },
  {
    question: "(47) Quem teve a vida prolongada por mais 15 anos após orar? (Isaías 38:5)",
    answers: [
      { text: "Enoque", correct: false },
      {text: "Matusalém", correct: false },
      { text: "Ezequias", correct: true },
      { text: "Elias", correct: false }
    ]
  },
  {
    question: "(48) Quem foi apelidado pela multidão em Listra de Zeus e Hermes? (Atos 14:12)",
    answers: [
      { text: "Pedro e João", correct: false },
      { text: "Barnabé e Paulo", correct: true },
      { text: "Jesus e Paulo", correct: false },
      { text: "João e Marcos", correct: false }
    ]
  },
  {
    question: "(49) Quais os 2 homens que Paulo disse que naufragaram na fé? (1 Timóteo 1:19-20)",
    answers: [
      { text: "Himeneu e Alexandre", correct: true },
      { text: "Janes e Jambres", correct: false },
      { text: "Silas e Barnabé", correct: false },
      { text: "Dimas e Tito", correct: false }
    ]
  },
  {
    question: "(50) Qual foi o profeta que surgiu depois de Malaquias? (Mateus 3:1)",
    answers: [
      { text: "Zacarias", correct: false },
      { text: "Joel", correct: false },
      { text: "João Batista", correct: true },
      { text: "Elias", correct: false }
    ]
  },
  {
    question: "(51) Quantos carros de ferro Jabim possuía? (Juízes 4:2)",
    answers: [
      { text: "900 carros de ferro", correct: true },
      { text: "300 carros de ferro", correct: false },
      { text: "100 carros de ferro", correct: false },
      { text: "1.000 carros de ferro", correct: false }
    ]
  },
  {
    question: "(52) Qual o nome do pai de Saul? (1 Samuel 9:1)",
    answers: [
      { text: "Abiel", correct: false },
      { text: "Quis", correct: true },
      { text: "Zeror", correct: false },
      { text: "Cis", correct: false }
    ]
  },
  {
    question: "(53) Sísera foi morto em que situação? (Juízes 4:21)",
    answers: [
      { text: "Enquanto dormia", correct: true },
      { text: "Enquanto lutava", correct: false },
      { text: "Enquanto orava", correct: false },
      { text: "Enquanto fugia", correct: false }
    ]
  },
  {
    question: "(54) Balaão foi chamado por quem para amaldiçoar o povo de Israel? (Números 22:4)",
    answers: [
      { text: "Moabe", correct: false },
      { text: "Balaque", correct: true },
      { text: "Zipor", correct: false },
      { text: "Zadoque", correct: false }
    ]
  },
  {
    question: "(55) Oséias profetizou durante o reinado de quais reis? (Oséias 1:1)",
    answers: [
      { text: "Saul, Davi e Salomão", correct: false },
      { text: "Jozias, Joacaz, Ocazias e Jorão", correct: false },
      { text: "Uzias, Jotão, Acaz, Ezequias e Jeroboão", correct: true },
      { text: "Ezequiel, Isaías, Jeremias e Daniel", correct: false }
    ]
  },
  {
    question: "(56) Oséias se casou com... (Oséias 1:2-3)",
    answers: [
      { text: "Uma rainha", correct: false },
      { text: "Uma mulher adúltera", correct: true },
      { text: "Uma mulher estrangeira", correct: false },
      { text: "Uma levita", correct: false }
    ]
  },
  {
    question: "(57) Sofonias foi profeta durante qual reinado? (Sofonias 1:1)",
    answers: [
      { text: "Reinado de Josias", correct: true },
      { text: "Reinado de Acabe", correct: false },
      { text: "Reinado de Acaz", correct: false },
      { text: "Reinado de Salomão", correct: false }
    ]
  },
  {
    question: "(58) Que povo recebeu Paulo com grande interesse? (Atos 17:11)",
    answers: [
      { text: "Os tessalônios", correct: false },
      { text: "Os bereanos", correct: true },
      { text: "Os atenienses", correct: false },
      { text: "Os coríntios", correct: false }
    ]
  },
  {
    question: "(59) O que deixou Paulo indignado em Atenas? (Atos 17:16-17)",
    answers: [
      { text: "A promiscuidade do povo grego", correct: false },
      { text: "A quantidade de ídolos na cidade", correct: true },
      { text: "A falta de sinagogas", correct: false },
      { text: "A frieza espiritual", correct: false }
    ]
  },
  {
    question: "(60) Em Atenas, onde Paulo foi levado para falar sobre Jesus? (Atos 17:19)",
    answers: [
      { text: "Coliseu", correct: false },
      { text: "Santuário", correct: false },
      { text: "Areópago", correct: true },
      { text: "Sinagoga", correct: false }
    ]
  }
 // ... SUAS 60 PERGUNTAS AQUI ...
];

// FUNÇÃO PARA EMBARALHAR
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ⭐ FUNÇÃO APENAS PARA O GOOGLE SHEETS (SEM RENDER)
async function enviarParaPlanilha(dados) {
  try {
    const usuario = localStorage.getItem("usuario") || "Anônimo";
    if (!dados.nome) dados.nome = usuario;
    
    console.log("📤 Enviando para planilha:", dados);
    
    await fetch(PLANILHA_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    
    console.log("✅ Dados enviados para planilha!");
    
    // Backup local
    const backupKey = `backup_${usuario}`;
    const backups = JSON.parse(localStorage.getItem(backupKey) || "[]");
    backups.push({...dados, data_backup: new Date().toISOString()});
    if (backups.length > 100) backups.shift();
    localStorage.setItem(backupKey, JSON.stringify(backups));
    
  } catch (erro) {
    console.error("❌ Erro no envio:", erro);
  }
}

// INICIAR QUIZ
const startBtn = document.getElementById("start-btn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    const nome = document.getElementById("usuario").value.trim();
    if (!nome) {
      alert("Digite seu nome para começar o quiz.");
      return;
    }
    localStorage.setItem("usuario", nome);
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    startPhase(1);
  });
}

// COMEÇAR FASE
function startPhase(phase) {
  currentPhase = phase;
  currentIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  nextPhaseBtn.classList.add("hidden");

  const start = phase === 1 ? 0 : phaseLimits[phase - 2];
  const end = phaseLimits[phase - 1];
  currentQuestions = shuffleArray([...allQuestions.slice(start, end)]);

  phaseInfo.textContent = `📖 Fase ${currentPhase} - ${currentQuestions.length} perguntas`;
  showQuestion();
}

// MOSTRAR PERGUNTA
function showQuestion() {
  const question = currentQuestions[currentIndex];
  questionEl.textContent = question.question;
  answersEl.innerHTML = "";

  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => checkAnswer(btn, answer.correct);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

// ⭐ VERIFICAR RESPOSTA (ENVIA APENAS PARA PLANILHA)
function checkAnswer(button, isCorrect) {
  const buttons = answersEl.querySelectorAll("button");
  const usuario = localStorage.getItem("usuario") || "Anônimo";
  const perguntaAtual = currentQuestions[currentIndex].question;
  const respostaSelecionada = button.textContent;
  const totalPerguntasFase = currentQuestions.length;

  buttons.forEach((btn) => btn.disabled = true);

  if (isCorrect) {
    button.style.backgroundColor = "#2e7d32";
    score++;
  } else {
    button.style.backgroundColor = "#c62828";
    const currentQ = currentQuestions[currentIndex];
    buttons.forEach((btn, idx) => {
      if (currentQ.answers[idx].correct) {
        btn.style.backgroundColor = "#2e7d32";
      }
    });
  }

  // ⭐ ENVIA APENAS PARA PLANILHA
  enviarParaPlanilha({
    nome: usuario,
    fase: currentPhase,
    pergunta: perguntaAtual,
    resposta: respostaSelecionada,
    acertou: isCorrect,
    pontuacao: score,
    total: totalPerguntasFase,
    timestamp: new Date().toISOString()
  });

  nextBtn.classList.remove("hidden");
}

// PRÓXIMA PERGUNTA
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// ⭐ MOSTRAR RESULTADO (SEM CHAMAR RENDER)
async function showResult() {
  questionEl.textContent = "";
  answersEl.innerHTML = "";
  resultEl.classList.remove("hidden");

  const usuario = localStorage.getItem("usuario") || "Anônimo";
  const total = currentQuestions.length;
  const acertos = score;
  const acertoPercent = Math.round((acertos / total) * 100);

  // ⭐ ENVIA RESULTADO FINAL PARA PLANILHA
  await enviarParaPlanilha({
    nome: usuario,
    tipo: "RESULTADO_FINAL_FASE",
    fase: currentPhase,
    pontuacao_final: acertos,
    total_perguntas: total,
    percentual_acerto: acertoPercent,
    aprovado: acertoPercent >= 60,
    timestamp: new Date().toISOString()
  });

  if (acertoPercent >= 60 && currentPhase < phaseLimits.length) {
    resultEl.innerHTML = `✅ Parabéns! Você acertou ${acertos}/${total} (${acertoPercent}%).<br>🚀 Você pode avançar para a próxima fase!`;
    nextPhaseBtn.classList.remove("hidden");
  } else if (acertoPercent >= 60) {
    resultEl.innerHTML = `🏆 PARABÉNS! Você completou o QUIZ!<br>⭐ Acertos: ${acertos}/${total} (${acertoPercent}%) ⭐`;
    
    await enviarParaPlanilha({
      nome: usuario,
      tipo: "CONCLUIU_QUIZ",
      pontuacao_total: acertos,
      percentual_global: acertoPercent,
      timestamp: new Date().toISOString()
    });
  } else {
    resultEl.innerHTML = `📚 Você acertou ${acertos}/${total} (${acertoPercent}%).<br>⚠️ Precisa de 60% para avançar. Tente novamente!`;
  }
}

// AVANÇAR FASE
nextPhaseBtn.addEventListener("click", () => {
  if (currentPhase < phaseLimits.length) {
    startPhase(currentPhase + 1);
  }
});

// FUNÇÕES ÚTEIS
function consultarProgresso() {
  const usuario = localStorage.getItem("usuario") || "desconhecido";
  const backupKey = `backup_${usuario}`;
  const backups = JSON.parse(localStorage.getItem(backupKey) || "[]");
  
  if (backups.length > 0) {
    const ultimo = backups[backups.length - 1];
    document.getElementById("progresso-info").innerHTML = 
      `👤 ${usuario} | 📊 ${backups.length} respostas salvas | 🕓 Última: ${new Date(ultimo.timestamp).toLocaleString()}`;
  } else {
    document.getElementById("progresso-info").innerHTML = "⚠️ Nenhum progresso salvo";
  }
}

function verAcertosUsuario() {
  const usuario = localStorage.getItem("usuario") || "Anônimo";
  alert(`📊 ${usuario}, você tem ${score} acertos nesta fase!\n\nOs dados estão sendo enviados para o Google Sheets!`);
}

// ⭐ NÃO TEM MAIS FUNÇÃO salvarProgresso() chamando o Render!
const phaseLimits = [10, 30, 60];
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

// INICIAR QUIZ
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
  const nome = document.getElementById("usuario").value.trim();
  if (!nome) {
    alert("Digite seu nome para começar o quiz.");
    return;
  }
  localStorage.setItem("usuario", nome.toLowerCase());
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  startPhase(1);
});

// EMBARALHAR
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// COMEÇAR FASE
function startPhase(phase) {
  currentPhase = phase;
  currentIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  nextPhaseBtn.classList.add("hidden");

  // Defina suas perguntas (simulação de perguntas)
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
        answers: [{text: "João e Tiago", correct: true},{text: "Pedro e João", correct: false},{text: "Tiago e Pedro", correct:false },{text: "Tiago e Mateus", correct: false }]
    },
    {
        question: "(3) Qual era o nome da serpente de bronze que Moisés tinha feito? (2 Reis 18:4)",
        answers: [{text:'Aserá', correct: false},{text:'Leviatã', correct: false},{text:'Neustã', correct: true},{text:"Athenis",correct: false}]
    },
    {
        question: "(4) Qual era o nome babilônico de Daniel? (Daniel 1:7)",
        answers: [{text:'Aspenaz', correct: false},{text:'Beltessazar', correct: true},{text:'Abede-Nego', correct: false},{text:"Mongero",correct: false}]
    },
    {
        question: "(5) Qual o nome que Jacó deu ao lugar onde sonhou com Deus?",
        answers: [{text:'Betuel', correct: false},{text:'Luz', correct: false},{text:'Bezel', correct: false},{text:"Betel",correct: true}]
    },
    {
        question: "(6) Qual o livro da Bíblia que termina com um ponto de interrogação? (Jonas 4:11)",
        answers: [{text:'Jonas', correct: true},{text:'Joel', correct: false},{text:'Judas', correct: false},{text:"João",correct: false}]
    },
    {
        question: "(7) Qual livro se encontra no Novo Testamento?",
        answers: [{text:'Sofonias', correct: false},{text:'Obadias', correct: false},{text:'Habacuque', correct: false},{text:"Filemom",correct: true}]
    },
    {
        question: "(8) Em quais livros da Bíblia não encontramos a palavra Deus?",
        answers: [{text:'Ester e Cânticos', correct: true},{text:'Ageu e Amós', correct: false},{text:'Oséias e Eclesiastes', correct: false},{text:"Obadias e Malaquias",correct: false}]
    },
    {
        question: "(9) Qual o menor livro da Bíblia?",
        answers: [{text:'Judas', correct: false},{text:'II João', correct: true},{text:'III João', correct: false},{text:"Ester",correct: false}]
    },
    {
        question: "(10) Na visão profética de João, qual era o número de cavaleiros do Apocalipse?",
        answers: [{text:'7', correct: false},{text:'6', correct: false},{text:'5', correct: false},{text:"4",correct: true}]
    },


            {
            question:'(11)  Quem escreveu a Epístola de Judas?',
            answers:[
               { text:'a) Judas irmão de Tiago', correct: true},
               {text:'b) Judas Iscariotes', correct: false},
               {text:'c) João Evangelista', correct: false},
               {text:"d) Lucas ",correct: false}
            
            ]},
            {
            question:'(12) Quem teve seu corpo disputado pelo arcanjo Miguel e o Diabo?',
            answers:[
               { text:'Jesus ', correct: false},
               {text:'Elizeu', correct: false},
               {text:'Moisés', correct: true},
               {text:"Abraão",correct: false}
            
            ]},
            {
            question:'(13) Qual era o nome da profetisa que estava fazendo a igreja de Tiatira cair em imoralidade sexual e idolatria?',
            answers:[
               { text:'Jezabel', correct: true},
               {text:'Lilith', correct: false},
               {text:'Dalila', correct: false},
               {text:"Ester",correct: false}
            
            ]},
            {
            question:'(14) A Morte montada em um cavalo amarelo surgiu na abertura de qual selo em Apocalipse?',
            answers:[
               { text:'a) 1º selo', correct: false},
               {text:'b) 7º selo', correct: false},
               {text:'c) 4º selo', correct: true},
               {text:"d) 6º selo",correct: false}
            
            ]},
            {
            question:'(15) Quem foi a única mulher citada na Bíblia a ter o status de juíza e líder de Israel?',
            answers:[
               { text:'a) Jael', correct: false},
               {text:'b) Débora', correct: true},
               {text:'c) Ester', correct: false},
               {text:"d) Rute",correct: false}
            
            ]},
            {
            question:"(16)  A quem o Apóstolo Paulo chamou de 'médico amado'?",
            answers:[
               { text:'a) Jesus', correct: false},
               {text:'b) Demas', correct: false},
               {text:'c) Lucas', correct: true},
               {text:"d) João",correct: false}
            
            ]},
            {
            question:'(17) Quem governou sendo rei e sacerdote ao mesmo tempo?',
            answers:[
               { text:'a) Joacaz', correct: false},
               {text:'b) Manassés ', correct: false},
               {text:'c) melquias', correct: false},
               {text:"d)  Melquisedeque",correct: true}
            
            ]},
            {
            question:'(18) Que animal mordeu a mão do Apóstolo Paulo?',
            answers:[
               { text:'a) Lagarto', correct: false},
               {text:'b) Escorpião', correct: false},
               {text:'c) Víbora', correct: true},
               {text:"d) Abelha",correct: false}
            
            ]},
            {
            question:'(19) Qual era a idade de Calebe quando pediu Hebrom para Josué?',
            answers:[
               { text:'a) 40 anos', correct: false},
               {text:'b) 70 anos', correct: false},
               {text:'c) 120 anos', correct: false},
               {text:"d) 85 anos",correct: true}
            
            ]},
            {
            question:'(20) Por quantas moedas Judas entregou Jesus?',
            answers:[
               { text:'a) 30 moedas de ouro', correct: false},
               {text:'b) 30 moedas de prata', correct: true},
               {text:'c) 100 denários', correct: false},
               {text:"d) 30 moedas de bronze",correct: false}
            
            ]},
            {
            question:"(21) Quem foram apelidados por Jesus de Boanerges que significa 'Filhos do Trovão'?",
            answers:[
               { text:'a) João e Pedro', correct: false},
               {text:'b) lucas e pedro', correct: false},
               {text:'c) Pedro e Tiago', correct: false},
               {text:"João e Tiago",correct: true}
            
            ]},
            {
            question:'(22) Qual era o nome da única filha de Lia?',
            answers:[
               { text:'a) Zilpa', correct: false},
               {text:'b) Diná', correct: true},
               {text:'c) Raquel', correct: false},
               {text:"d)Ester",correct: false}
            
            ]},
            {
            question:'(23) Qual o discípulo que acompanhou Jesus até a sua crucificação?',
            answers:[
               { text:'a) André', correct: false},
               {text:'b) Tiago', correct: false},
               {text:'c) João', correct: true},
               {text:"d) Pedro",correct: false}
            
            ]},
            {
            question:'(24) Quantos capítulos tem o Livro de Naum?',
            answers:[
               { text:'1', correct: false},
               {text:'4', correct: false},
               {text:'5', correct: false},
               {text:"3",correct: true}
            
            ]},
            {
            question:'(25) O Velho Testamento reúne mais livros do que o Novo Testamento?',
            answers:[
               { text:'sim', correct: true},
               {text:'não', correct: false},
               {text:'Ambos tem a mesma quantidade', correct: false},
              
            
            ]},
            {
            question:'(26) A estátua do sonho de Nabucodonosor era composta de quais elementos?',
            answers:[
               { text:'a) Toda em ouro', correct: false},
               {text:'b) Ouro, prata, ônix e ferro', correct: false},
               {text:'c) Ouro, prata, bronze, onix e ferro', correct: false},
               {text:"d) Ouro, prata, bronze, ferro e barro.",correct: true}
            
            ]},
            {
  question:'(27) Quem era conhecido por ser cobrador de impostos?',
  answers:[
     { text:'a) João Batista', correct: false },
     { text:'b) Bartolomeu', correct: false },
     { text:'c) Zaqueu', correct: true },
     { text:'d) Judas Tadeu', correct: false }
  ]
},
            {
            question:'(28) Quanto tempo Jonas ficou preso dentro da barriga de um grande peixe?',
            answers:[
               { text:'a) 7 dias', correct: false},
               {text:'b) 3 dias', correct: true},
               {text:'c) 1 dia', correct: false},
               {text:"d) 4 dias",correct: false}
            
            ]},
            {
            question:'(29) Qual foram os dois nomes indicados para substituir Judas Iscariotes?',
            answers:[
               { text:'a) Barsabás e Matias.', correct: true},
               {text:'b) Paulo e Matias.', correct: false},
               {text:'c) Paulo e José.', correct: false},
               {text:"d) Matias e Paulo",correct: false}
            
            ]},
            {
            question:'(30)  Em Tessalônica, Paulo, Silas e Timóteo se refugiaram na casa de qual irmão?',
            answers:[
               { text:'a) Apolo', correct: false},
               {text:'b) Barnabé', correct: false},
               {text:'c) arquipo', correct: false},
               {text:"d) Jasom",correct: true}
            
            ]},
            {
            question:'(31) Adão viveu ao todo quantos anos?',
            answers:[
               { text:'a) 930 anos', correct: true},
               {text:'b) 1000 anos', correct: false},
               {text:'c) 500 anos', correct: false},
               {text:"d) 850 anos",correct: false}
            
            ]},
            {
            question:'(32) Jesus enviou quantos discípulos para a missão de pregar o Evangelho?',
            answers:[
               { text:'a) 7 discípuloss', correct: false},
               {text:'b) 70 discípulos', correct: true},
               {text:'c) 12 discípulos', correct: false},
               {text:"d) 6 discípulos",correct: false}
            
            ]},
            {
            question:'(33)  Em qual dia da criação foi feito o sol, a lua e as estrelas?',
            answers:[
               { text:'a) 1º dia', correct: false},
               {text:'b) 3º dia', correct: false},
               {text:'c) 4º dia', correct: true},
               {text:"d) 6º dia",correct: false}
            
            ]},
            {
            question:'(34) O Livro de Atos dos Apóstolos é conhecido como...',
            answers:[
               { text:'a) um livro histórico', correct: true},
               {text:'b) um livro profético', correct: false},
               {text:'c) um livro poético', correct: false},
               {text:"d) um livro teologico",correct: false}
            
            ]},
            {
            question:'(35) Depois do Dilúvio, Noé viveu por mais quantos anos?',
            answers:[
               { text:'a) 350 anos', correct: true},
               {text:'b) 100 anos', correct: false},
               {text:'c) 200 anos', correct: false},
               {text:"d) 50 anos",correct: false}
            
            ]},
            {
            question:'(36) Qual é o quinto livro do Novo Testamento?',
            answers:[
               { text:'a)Evangelho de Marcos', correct: false},
               {text:'b) Carta aos Romanos', correct: false},
               {text:'c) Atos dos Apóstolos', correct: true},
               {text:"d) Evangelho de lucas",correct: false}
            
            ]},
            {
            question:'(37) Qual era o nome da mulher de Jó?',
            answers:[
               { text:'a)Abgail', correct: false},
               {text:'b) Dâmares', correct: false},
               {text:'c) A BIBLIA NÃO DIZ', correct: true},
               {text:"d) Sophia",correct: false}
            
            ]},
            {
            question:'(38)  Quem Noé amaldiçoou após saber que foi visto em nudez?',
            answers:[
               { text:'a) Canaã', correct: true},
               {text:'b) Cam', correct: false},
               {text:'c) Jafé', correct: false},
               {text:"d) Ezau",correct: false}
            
            ]},
            {
            question:'(39) Qual das alternativas não é um livro apócrifo?',
            answers:[
               { text:'a) Livro Enoque', correct: false},
               {text:'b) Livro de Ageu', correct: true},
               {text:'c) Livro de Tobias', correct: false},
               {text:"d) Livro de Thomas",correct: false}
            
            ]},
            {
            question:'(40) Qual destes livros contém mais de um capítulo?',
            answers:[
               { text:'a) Judas', correct: false},
               {text:'b) Obadias', correct: false},
               {text:'c) Joel', correct: true},
               
            
            ]},
            {
            question:'(41) Qual é o versículo mais extenso da Bíblia?',
            answers:[
               { text:'a)Ester 8:9', correct: true},
               {text:'b) Salmos 119:43', correct: false},
               {text:'c) Isaías 24:2', correct: false},
               {text:"d) jeremias 3:5",correct: false}
            
            ]},
            {
               question: "(42) Quantos versículos tem Salmos 119?",
               answers: [
                   { text: "a) 176 versículos", correct: true },
                   { text: "b) 200 versículos.", correct: false },
                   { text: "c) 100 versículos.", correct: false },
                   { text: "d) 150 versículos.", correct: false }
               ]},
           {
               question: "(43) Qual a mulher que acolheu o seu inimigo e depois o matou? (Juízes 4:18-21)",
               answers: [
                   { text: "a) Raquel", correct: false },
                   { text: "b) Débora", correct: false },
                   { text: "c) Jael", correct: true },
                   { text: "d) Rebeca", correct: false }
               ]
           },
           {
               question: "(44) Que homem depois de morto, matou mais pessoas do que em vida? (Juízes 16:30)",
               answers: [
                   { text: "a) Elias", correct: false },
                   { text: "b) Sansão", correct: true },
                   { text: "c) Judas", correct: false },
                   { text: "d) Davi", correct: false }
               ]
           },
           {
               question: "(45) Quem se tornou rei enquanto procurava as jumentas do seu pai? (1 Samuel 9:3)",
               answers: [
                   { text: "a) Davi", correct: false },
                   { text: "b) Saul", correct: true },
                   { text: "c) Acabe", correct: false },
                   { text: "d) Salomão", correct: false }
               ]
           },
           {
               question: "(46) Quem tinha um cabelo que pesava mais de dois quilos e era necessário cortar todo ano? (2 Samuel 14:26)",
               answers: [
                   { text: "a) Absalão", correct: true },
                   { text: "b) Davi", correct: false },
                   { text: "c) Sansão", correct: false },
                   { text: "d) Eliabe", correct: false }
               ]
           },
           {
               question: "(47) Quem teve a vida prolongada por mais 15 anos após orar? (Isaías 38:5)",
               answers: [
                   { text: "a) Enoque", correct: false },
                   { text: "b) Matusalém", correct: false },
                   { text: "c) Ezequias", correct: true },
                   { text: "d) Elias", correct: false }
               ]
           },
           {
               question: "(48) Quem foram apelidados pela multidão em Listra de Zeus e Hermes? (Atos 14:12)",
               answers: [
                   { text: "a) Pedro e João", correct: false },
                   { text: "b) Barnabé e Paulo", correct: true },
                   { text: "c) Jesus e Paulo", correct: false },
                   { text: "d) João e Marcos", correct: false }
               ]
           },
           {
               question: "(49) Quais os 2 homens que o Apóstolo Paulo disse que naufragaram na fé? (1 Timóteo 1:19-20)",
               answers: [
                   { text: "a) Himeneu e Alexandre", correct: true },
                   { text: "b) Janes e Jambres", correct: false },
                   { text: "c) Silas e Barnabé", correct: false },
                   { text: "d) Dimas e Tito", correct: false }
               ]
           },
           {
               question: "(50) Qual foi o profeta que surgiu depois de Malaquias? (Mateus 3:1)",
               answers: [
                   { text: "a) Zacarias", correct: false },
                   { text: "b) Joel", correct: false },
                   { text: "c) João Batista", correct: true },
                   { text: "d) Elias", correct: false }
               ]
           },
           {
               question: "(51) Quantos carros de ferro Jabim possuía? (Juízes 4:2)",
               answers: [
                   { text: "a) 900 carros de ferro.", correct: true },
                   { text: "b) 300 carros de ferro.", correct: false },
                   { text: "c) 100 carros de ferro.", correct: false },
                   { text: "d) 1.000 carros de ferro.", correct: false }
               ]
           },
           {
               question: "(52) Qual o nome do pai de Saul? (1 Samuel 9:1)",
               answers: [
                   { text: "a) Abiel", correct: false },
                   { text: "b) Quis", correct: true },
                   { text: "c) Zeror", correct: false },
                   { text: "d) Cis", correct: false }
               ]
           },
           {
               question: "(53) Sísera foi morto em que situação? (Juízes 4:21)",
               answers: [
                   { text: "a) Enquanto dormia.", correct: true },
                   { text: "b) Enquanto lutava.", correct: false },
                   { text: "c) Enquanto orava.", correct: false },
                   { text: "d) Enquanto fugia.", correct: false }
               ]
           },
           {
               question: "(54) Balaão foi chamado por quem para amaldiçoar o povo de Israel? (Números 22:4)",
               answers: [
                   { text: "a) Moabe", correct: false },
                   { text: "b) Balaque", correct: true },
                   { text: "c) Zipor", correct: false },
                   { text: "d) Zadoque", correct: false }
               ]
           },
           {
               question: "(55) Oseias profetizou durante o reinado de quais reis? (Oséias 1:1)",
               answers: [
                   { text: "a) Saul, Davi e Salomão.", correct: false },
                   { text: "b) Jozias, Joacaz, Ocazias e Jorão.", correct: false },
                   { text: "c) Uzias, Jotão, Acaz, Ezequias e Jeroboão.", correct: true },
                   { text: "d) Ezequiel, Isaías, Jeremias e Daniel.", correct: false }
               ]
           },
           {
               question: "(56) Oséias se casou com... (Oséias 1:2-3)",
               answers: [
                   { text: "a) Uma rainha.", correct: false },
                   { text: "b) Uma mulher adúltera.", correct: true },
                   { text: "c) Uma mulher estrangeira.", correct: false },
                   { text: "d) Uma levita.", correct: false }
               ]
           },
           {
               question: "(57) Sofonias foi profeta durante qual reinado? (Sofonias 1:1)",
               answers: [
                   { text: "a) Reinado de Josias.", correct: true },
                   { text: "b) Reinado de Acabe.", correct: false },
                   { text: "c) Reinado de Acaz.", correct: false },
                   { text: "d) Reinado de Salomão.", correct: false }
               ]
           },
           {
               question: "(58) Que povo recebeu Paulo com grande interesse, e examinou as Escrituras, para ver se tudo era verdade? (Atos 17:11)",
               answers: [
                   { text: "a) Os tessalônios.", correct: false },
                   { text: "b) Os bereanos.", correct: true },
                   { text: "c) Os atenienses.", correct: false },
                   { text: "d) Os coríntios.", correct: false }
               ]
           },
           {
               question: "(59) O que deixou Paulo indignado em Atenas? (Atos 17:16-17)",
               answers: [
                   { text: "a) A promiscuidade do povo grego.", correct: false },
                   { text: "b) A quantidade de ídolos na cidade.", correct: true },
                   { text: "c) A falta de sinagogas na cidade.", correct: false },
                   { text: "d) A frieza espiritual.", correct: false }
               ]
           },
           {
               question: "(60) Em Atenas, onde Paulo foi levado para falar sobre Jesus Cristo? (Atos 17:19)",
               answers: [
                   { text: "a) Coliseu.", correct: false },
                   { text: "b) Santuário.", correct: false },
                   { text: "c) Areópago", correct: true },
                   { text: "d) Sinagoga", correct: false }
               ]
           },
    ];

  const start = phase === 1 ? 0 : phaseLimits[phase - 2];
  const end = phaseLimits[phase - 1];
  currentQuestions = shuffleArray(allQuestions.slice(start, end));

  phaseInfo.textContent = `Fase ${currentPhase} - ${currentQuestions.length} perguntas`;
  showQuestion();
}

// MOSTRAR PERGUNTA
function showQuestion() {
  const question = currentQuestions[currentIndex];
  questionEl.textContent = question.question;
  answersEl.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text; // ✅ corrigido
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

// VERIFICAR RESPOSTA
function checkAnswer(selectedIndex) {
  const question = currentQuestions[currentIndex];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (question.answers[index].correct) {
      btn.style.backgroundColor = "green";
    } else if (index === selectedIndex) {
      btn.style.backgroundColor = "red";
    }
  });

  if (question.answers[selectedIndex].correct) {
    score++;
  }

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
function showResult() {
  questionEl.textContent = "";
  answersEl.innerHTML = "";
  resultEl.classList.remove("hidden");

  const total = currentQuestions.length;
  const acertos = score;
  const acertoPercent = Math.round((acertos / total) * 100);

  if (acertoPercent >= 60 && currentPhase < phaseLimits.length) {
    resultEl.innerHTML = `Parabéns! Você acertou ${acertos}/${total} (${acertoPercent}%).<br>Você pode avançar para a próxima fase.`;
    nextPhaseBtn.classList.remove("hidden");
  } else if (acertoPercent >= 60) {
    resultEl.innerHTML = `🎉 Parabéns! Você concluiu todas as fases com sucesso!<br>Acertos: ${acertos}/${total} (${acertoPercent}%)`;
  } else {
    resultEl.innerHTML = `Você acertou ${acertos}/${total} (${acertoPercent}%).<br>Você precisa de ao menos 60% para avançar. Tente novamente.`;
  }
}

// AVANÇAR PARA PRÓXIMA FASE
nextPhaseBtn.addEventListener("click", () => {
  if (currentPhase < phaseLimits.length) {
    startPhase(currentPhase + 1);
  }
});

// SALVAR PROGRESSO
function salvarProgresso() {
  const nome = localStorage.getItem("usuario") || "desconhecido";
  const progresso = {
    nome,
    fase: currentPhase,
    pontuacao: score,
    data: new Date().toISOString()
  };

  localStorage.setItem(`progresso_${nome}`, JSON.stringify(progresso));
  alert("✅ Progresso salvo com sucesso!");
}

// CONSULTAR PROGRESSO
function consultarProgresso() {
  const nome = localStorage.getItem("usuario") || "desconhecido";
  const data = localStorage.getItem(`progresso_${nome}`);

  if (data) {
    const progresso = JSON.parse(data);
    document.getElementById("progresso-info").innerHTML =
      `👤 Usuário: ${progresso.nome}<br>` +
      `📘 Fase: ${progresso.fase}<br>` +
      `⭐ Pontuação: ${progresso.pontuacao}<br>` +
      `🕓 Data: ${new Date(progresso.data).toLocaleString()}`;
  } else {
    document.getElementById("progresso-info").innerHTML =
      "⚠️ Nenhum progresso salvo encontrado.";
  }
}

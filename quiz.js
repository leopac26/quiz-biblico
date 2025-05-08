/*
const $startGameButton = document.querySelector('.start-quiz')
const $questionsContainer = document.querySelector('.questions-container')
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")
const $timerBar = document.getElementById("timerBar")
const $timeText = document.getElementById("timeText")

let currentQuestionIndex = 0
let totalCorrect = 0
let timer
let countdownInterval

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1))
       ;[array[i], array[j]] = [array[j], array[i]]
   }
}


    function startGame() {
        const playerName = document.getElementById("playerName").value.trim()
        if (!playerName) {
          alert("Por favor, digite seu nome antes de começar.")
          return
        }
      
        // Salvar nome no localStorage
        localStorage.setItem("quizPlayerName", playerName)
        localStorage.setItem("quizProgress", "0") // zerar progresso
      
        shuffleArray(questions)
        $startGameButton.classList.add("hide")
        $questionsContainer.classList.remove("hide")
        displayNextQuestion()
      
        // (opcional) Enviar para backend se estiver online
      
      

    // Enviar dados ao backend quando o jogo começar
    fetch('http://localhost:3000/api/registrar-acesso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Acesso registrado com sucesso:', data);
    })
    .catch(error => {
      console.error('Erro ao registrar acesso:', error);
    });
}

function displayNextQuestion(){
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    const currentQuestion = questions[currentQuestionIndex]
    $questionText.textContent = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        newAnswer.addEventListener("click", selectAnswer)
        $answersContainer.appendChild(newAnswer)
    })

    startTimer()
}

function resetState(){
    clearTimeout(timer)
    clearInterval(countdownInterval)

    $timeText.textContent = ""
    $timerBar.style.transition = "none"
    $timerBar.style.width = "0%"

    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    clearTimeout(timer)
    clearInterval(countdownInterval)
  
    const answerClicked = event.target
    const playerName = localStorage.getItem("quizPlayerName") || "Desconhecido"
  
    if (answerClicked.dataset.correct) {
      document.body.classList.add("correct")
      totalCorrect++
  
      // Atualizar progresso salvo
      localStorage.setItem("quizProgress", totalCorrect.toString())
    } else {
      document.body.classList.add("incorrect")
    }
  
    document.querySelectorAll(".answer").forEach(button => {
      if (button.dataset.correct) button.classList.add("correct")
      else button.classList.add("incorrect")
      button.disabled = true
    })
  
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
  }
  

function finishGame(){
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)
    const playerName = localStorage.getItem("quizPlayerName") || "Jogador"

    let message = ""
    switch (true) {
        case (performance >= 90):
            message = "Excelente :)"
            break
        case (performance >= 70):
            message = "Muito bom :)"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!<br>
            <span>Resultado: ${message}</span>
        </p>
        <button onclick="window.location.reload()" class="button">Refazer teste</button>
    `
}

function startTimer(){
    clearTimeout(timer)
    clearInterval(countdownInterval)

    let timeLeft = 30 // muda os segundos que aparece na tela
    $timeText.textContent = `Tempo restante: ${timeLeft}s`

    $timerBar.style.transition = 'none'
    $timerBar.style.width = '100%'

    setTimeout(() => {
        $timerBar.style.transition = 'width 30s linear' // muda os segundos que aparece na barra
        $timerBar.style.width = '0%'
    }, 50)

    countdownInterval = setInterval(() => {
        timeLeft--
        $timeText.textContent = `Tempo restante: ${timeLeft}s`
        if (timeLeft <= 0) {
            clearInterval(countdownInterval)
        }
    }, 1000)

    timer = setTimeout(() => {
        disableAnswers()
        document.body.classList.add("incorrect")
        $nextQuestionButton.classList.remove("hide")
        currentQuestionIndex++
    }, 30000) // muda o tempo de resposta
}

function disableAnswers(){
    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })

    window.addEventListener("DOMContentLoaded", () => {
        const savedName = localStorage.getItem("quizPlayerName")
        if (savedName) {
          document.getElementById("playerName").value = savedName
        }
      })
      
}*/

const $startGameButton = document.querySelector('.start-quiz')
const $questionsContainer = document.querySelector('.questions-container')
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")
const $timerBar = document.getElementById("timerBar")
const $timeText = document.getElementById("timeText")

let currentQuestionIndex = 0
let totalCorrect = 0
let timer
let countdownInterval
let currentPhase = 0
let phaseLimits = [10, 20, 30] // número de perguntas por fase

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1))
       ;[array[i], array[j]] = [array[j], array[i]]
   }
}

function startGame() {
    const playerName = document.getElementById("playerName").value.trim()
    if (!playerName) {
        alert("Por favor, digite seu nome antes de começar.")
        return
    }

    localStorage.setItem("quizPlayerName", playerName)
    localStorage.setItem("quizProgress", "0")

    shuffleArray(questions)

    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()

    fetch('https://pwa-api-production-503d.up.railway.app/api/registrar-instalacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            evento: 'quiz_iniciado',
            nome: playerName,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        })
    })
    .then(response => response.json())
    .then(data => console.log('Quiz iniciado registrado com sucesso:', data))
    .catch(error => console.error('Erro ao registrar início do quiz:', error))
}

function displayNextQuestion() {
    resetState()

    const phaseStartIndex = phaseLimits.slice(0, currentPhase).reduce((a, b) => a + b, 0)
    const phaseEndIndex = phaseStartIndex + phaseLimits[currentPhase]

    if (currentQuestionIndex >= phaseEndIndex || currentQuestionIndex >= questions.length) {
        return finishPhase()
    }

    const currentQuestion = questions[currentQuestionIndex]
    $questionText.textContent = currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) newAnswer.dataset.correct = answer.correct
        newAnswer.addEventListener("click", selectAnswer)
        $answersContainer.appendChild(newAnswer)
    })

    startTimer()
}

function finishPhase() {
    const startIndex = phaseLimits.slice(0, currentPhase).reduce((a, b) => a + b, 0)
    const endIndex = startIndex + phaseLimits[currentPhase]
    const questionsThisPhase = endIndex - startIndex
    const previousCorrect = parseInt(localStorage.getItem(`phase${currentPhase - 1}TotalCorrect`) || "0", 10)
    const correctThisPhase = totalCorrect - previousCorrect
    const performance = Math.floor((correctThisPhase * 100) / questionsThisPhase)

    localStorage.setItem(`phase${currentPhase}TotalCorrect`, totalCorrect)

    let message = ""
    if (performance >= 90) message = "Excelente!"
    else if (performance >= 60) message = "Muito bom! Vamos para a próxima fase?"
    else message = "Fim do jogo! Treine mais e tente de novo!"

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${correctThisPhase} de ${questionsThisPhase} nesta fase.<br>
            <span>${message}</span>
        </p>
    `

    if (performance >= 60 && currentPhase + 1 < phaseLimits.length) {
        const nextButton = document.createElement("button")
        nextButton.textContent = "Próxima fase"
        nextButton.classList.add("button")
        nextButton.addEventListener("click", nextPhase)
        $questionsContainer.appendChild(nextButton)
    } else if (performance >= 60 && currentPhase + 1 >= phaseLimits.length) {
        const finishButton = document.createElement("button")
        finishButton.textContent = "Ver resultado final"
        finishButton.classList.add("button")
        finishButton.addEventListener("click", finishGame)
        $questionsContainer.appendChild(finishButton)
    } else {
        const retryButton = document.createElement("button")
        retryButton.textContent = "Refazer"
        retryButton.classList.add("button")
        retryButton.addEventListener("click", () => window.location.reload())
        $questionsContainer.appendChild(retryButton)
    }
}

function nextPhase() {
    currentPhase++
    currentQuestionIndex = phaseLimits.slice(0, currentPhase).reduce((a, b) => a + b, 0)
    resetState()
    $questionText.textContent = ""
    displayNextQuestion()
}

function resetState() {
    clearTimeout(timer)
    clearInterval(countdownInterval)

    $timeText.textContent = ""
    $timerBar.style.transition = "none"
    $timerBar.style.width = "0%"

    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    clearTimeout(timer)
    clearInterval(countdownInterval)

    const answerClicked = event.target
    const playerName = localStorage.getItem("quizPlayerName") || "Desconhecido"

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
        localStorage.setItem("quizProgress", totalCorrect.toString())
    } else {
        document.body.classList.add("incorrect")
    }

    disableAnswers()
    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = Math.min(30, questions.length)
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)
    const playerName = localStorage.getItem("quizPlayerName") || "Jogador"

    let message = ""
    if (performance >= 90) message = "Excelente :)"
    else if (performance >= 70) message = "Muito bom :)"
    else message = "Pode melhorar :("

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!<br>
            <span>Resultado: ${message}</span>
        </p>
    `
    const retryButton = document.createElement("button")
    retryButton.textContent = "Refazer teste"
    retryButton.classList.add("button")
    retryButton.addEventListener("click", () => window.location.reload())
    $questionsContainer.appendChild(retryButton)

    fetch('https://pwa-api-production-503d.up.railway.app/api/registrar-instalacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            evento: 'quiz_finalizado',
            nome: playerName,
            acertos: totalCorrect,
            total: totalQuestion,
            desempenho: performance,
            timestamp: new Date().toISOString()
        })
    })
    .then(response => response.json())
    .then(data => console.log('Quiz finalizado registrado com sucesso:', data))
    .catch(error => console.error('Erro ao registrar fim do quiz:', error))
}

function startTimer() {
    clearTimeout(timer)
    clearInterval(countdownInterval)

    let timeLeft = 30
    $timeText.textContent = `Tempo restante: ${timeLeft}s`

    $timerBar.style.transition = 'none'
    $timerBar.style.width = '100%'

    setTimeout(() => {
        $timerBar.style.transition = 'width 30s linear'
        $timerBar.style.width = '0%'
    }, 50)

    countdownInterval = setInterval(() => {
        timeLeft--
        $timeText.textContent = `Tempo restante: ${timeLeft}s`
        if (timeLeft <= 0) {
            clearInterval(countdownInterval)
        }
    }, 1000)

    timer = setTimeout(() => {
        disableAnswers()
        document.body.classList.add("incorrect")
        $nextQuestionButton.classList.remove("hide")
        currentQuestionIndex++
    }, 30000)
}

function disableAnswers() {
    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }
        button.disabled = true
    })
}

window.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("quizPlayerName")
    if (savedName) {
        document.getElementById("playerName").value = savedName
    }
})

const questions = [
   {
        question: "(1) A quem Paulo chamou de 'meu companheiro de lutas' (Filemon 1:2)?",
        answers:[{text: "Apolo", correct: false },{text: "Afia", correct: false },{text: "Arquipo", correct: true},{text: "Adonias", correct: false}]
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
               {text:'b) Ouro, prata, , onix e ferro', correct: false},
               {text:'Ouro, prata, bronze, onix e ferro', correct: false},
               {text:"d) Ouro, prata, bronze, ferro e barro.",correct: true}
            
            ]},
            {
            question:'(27) Quem era conhecido por ser cobrador de impostos?',
            answers:[
               { text:'a) Zacarias', correct: false},
               {text:'b) Zebedeu', correct: false},
               {text:'c) Zaqueu', correct: true},
               {text:"d) Zebeus",correct: false}
            
            ]},
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
           {
               question: "(61) No discurso de Paulo em Atenas, quem creu e se juntou a ele? (Atos 17:34)",
               answers: [
                   { text: "a) Nicodemos", correct: false },
                   { text: "b) Dionísio", correct: true },
                   { text: "c) Arquimedes", correct: false },
                   { text: "d) Barnabé", correct: false }
               ]
           },
           {
               question: "(62) Qual foi o destino de Paulo depois de Atenas? (Atos 18:1)",
               answers: [
                   { text: "a) Tessalônica", correct: false },
                   { text: "b) Roma", correct: false },
                   { text: "c) Corinto", correct: true },
                   { text: "d) Éfeso", correct: false }
               ]
           },
           {
               question: "(63) Quem jurou não comer nem beber enquanto não matassem Paulo? (Atos 23:12-14)",
               answers: [
                   { text: "a) Os judeus.", correct: true },
                   { text: "b) Os gregos.", correct: false },
                   { text: "c) Os romanos.", correct: false },
                   { text: "d) Os coríntios.", correct: false }
               ]
           },
           {
               question: "(64) Quais são as 7 igrejas que receberam as cartas em Apocalipse? (Apocalipse 1:11)",
               answers: [
                   { text: "a) Éfeso, Filipo, Pérgamo, Tiatira, Creta, Filadélfia e Laodiceia.", correct: false },
                   { text: "b) Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia.", correct: true },
                   { text: "c) Éfeso, Macedônia, Pérgamo, Filipo, Tessalônica, Filadélfia e Laodiceia.", correct: false },
                   { text: "d) Antioquia, Esmirna, Tiatira, Sardes, Tessalônica, Filadélfia e Laodiceia.", correct: false }
               ]
           },
          {
               question: "(65) O que houve quando o Cordeiro quebrou o último selo? (Apocalipse 8:1)",
               answers: [
                   { text: "a) O Diabo foi aprisionado durante 2000 anos.", correct: false },
                   { text: "b) Houve um sinal que arrebatou os crentes em Cristo.", correct: false },
                   { text: "c) Houve silêncio nos céus cerca de meia hora.", correct: true },
                   { text: "d) Os anjos tocaram as trombetas.", correct: false }
               ]
           },
           {
               question: "(66) Qual era a característica da besta que saiu da terra? (Apocalipse 13:11)",
               answers: [
                   { text: "a) Dois chifres como cordeiro, mas que falava como dragão.", correct: true },
                   { text: "b) Dez chifres e sete cabeças, com dez coroas, uma sobre cada chifre.", correct: false },
                   { text: "c) Sete chifres, sete cabeças e da sua língua saía fogo.", correct: false },
                   { text: "d) Um corpo de leopardo, pés de urso e boca de leão.", correct: false }
               ]
           },
           {
               question: "(67) Quantas taças da ira de Deus foram derramadas em Apocalipse? (Apocalipse 16:1)",
               answers: [
                   { text: "a) 6 taças.", correct: false },
                   { text: "b) 12 taças.", correct: false },
                   { text: "c) 7 taças.", correct: true },
                   { text: "d) 10 taças.", correct: false }
               ]
           },
           {
               question: "(68) De que material era o muro da Nova Jerusalém? (Apocalipse 21:18)",
               answers: [
                   { text: "a) Ouro", correct: false },
                   { text: "b) Jaspe", correct: true },
                   { text: "c) Vidro", correct: false },
                   { text: "d) Bronze", correct: false }
               ]
           },
           
            {
              question: "(69) Quem foi o primogênito de Jacó? (Gênesis 29:32)",
              answers: [
                { text: "a) Júda", correct: false },
                { text: "b) José", correct: false },
                { text: "c) Rúben", correct: true },
                { text: "d) Simeão", correct: false }
              ]
            },
            {
              question: "(70) Quem viu um arbusto em chamas que não se consumia? (Êxodo 3:2-3)",
              answers: [
                { text: "a) Abraão", correct: false },
                { text: "b) Isaque", correct: false },
                { text: "c) Moisés", correct: true },
                { text: "d) Noé", correct: false }
              ]
            }];

           
          
                  
          
          
           
       
           

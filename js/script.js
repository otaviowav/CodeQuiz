// Obtendo todas as requisições dos elementos
const start_btn = document.querySelector(".start_btn button");
const info_caixa = document.querySelector(".info_caixa");
const sair = info_caixa.querySelector(".botoes .sair");
const reiniciar = info_caixa.querySelector(".botoes .reiniciar");
const caixa_quiz = document.querySelector(".caixa_quiz");
const lista_de_opcao = document.querySelector(".lista_de_opcao")
const timeCount = caixa_quiz.querySelector(".tempo .tempo_segundo");
const linhaTempo = caixa_quiz.querySelector("header .linha_tempo");


// Ação do botão Start
start_btn.onclick = () => {
    info_caixa.classList.add("activeInfo"); // Mostrar a caixa de informação "Regras"
}

// Ação do botão Sair
sair.onclick = () => {
    info_caixa.classList.remove("activeInfo"); // Fechar a caixa de informação "Regras"
}

// Ação do botão Continuar
reiniciar.onclick = () => {
    info_caixa.classList.remove("activeInfo"); // Fechar a caixa de informação "Regras"
    caixa_quiz.classList.add("activeQuiz"); // Mostrar a caixa do Quiz
    showQuestions(0);
    questCont(1);
    startTimer(15);
    startTimerLine(0);
}

let contQuestoes = 0;
let numQuestao = 1;
let counter;
let valorTempo = 15;
let widthValue = 0;
let userScore = 0;


const proximo_btn = caixa_quiz.querySelector(".proximo_btn");
const caixa_de_resultado = document.querySelector(".caixa_de_resultado");
const reiniciar_quiz = caixa_de_resultado.querySelector(".botoes .reiniciar");
const sair_quiz = caixa_de_resultado.querySelector(".botoes .sair");

// Ação do botão "Proxima"
proximo_btn.onclick = () => {
    if (contQuestoes < questions.length - 1) {
        contQuestoes++;
        numQuestao++;
        showQuestions(contQuestoes);
        questCont(numQuestao);
        clearInterval(counter)
        startTimer(valorTempo);
        clearInterval(counterLine)
        startTimerLine(widthValue);
        proximo_btn.style.display = "none";
    } else {
        console.log("Quiz completado");
        showResultBox();
    }
}


// Obtendo as questões e opções do Array
function showQuestions(index) {
    const questao_texto = document.querySelector(".questao_texto")
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="opcao">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="opcao">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="opcao">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="opcao">' + questions[index].options[3] + '<span></span></div>'
    questao_texto.innerHTML = que_tag;
    lista_de_opcao.innerHTML = option_tag;

    const opcao = lista_de_opcao.querySelectorAll(".opcao");
    for (let i = 0; i < opcao.length; i++) {
        opcao[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

    function optionSelected(answer){
        clearInterval(counter);
        clearInterval(counterLine);
        let userResp = answer.textContent;
        let respCorreta = questions[contQuestoes].answer;
        let alloptions = lista_de_opcao.children.length;
        if(userResp == respCorreta){
            userScore += 1;
            console.log(userScore);
            answer.classList.add("correta");
            console.log("Resposta correta");
            answer.insertAdjacentHTML("beforeend", tickIcon);
        }else{
            answer.classList.add("incorreta");
            console.log("Resposta incorreta");
            answer.insertAdjacentHTML("beforeend", crossIcon);

            // Resposta incorreta automaticamente selecionar a correta
            for(let i = 0; i < alloptions; i++) {
                if(lista_de_opcao.children[i].textContent == respCorreta){
                    lista_de_opcao.children[i].setAttribute("class", "opcao correta");
                    lista_de_opcao.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
        }

        // Desabilitando as outras questões após alguma ser selecionada
        for (let i = 0; i < alloptions; i++) {
            lista_de_opcao.children[i].classList.add("desabilitado")
            
        }
        proximo_btn.style.display = "block";
    }

function showResultBox(){
    info_caixa.classList.remove("activeInfo"); // Fechar a caixa de informação "Regras"
    caixa_quiz.classList.remove("activeQuiz"); // Fechar a caixa do Quiz
    caixa_de_resultado.classList.add("activeResult"); // Mostrar a caixa de resultado
    const scoreText = caixa_de_resultado.querySelector(".score_do_teste");
    if(userScore > 3){
        let scoreTag = '<span>Parabéns, pequeno Padawan! você obteve <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Humm, legal mas você obteve apenas <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sinto muito gafanhoto, você obteve apenas <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00";
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        linhaTempo.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}



function questCont(index) {
    const cont_quest_rodape = caixa_quiz.querySelector(".total_questoes");
    let totalQuestContTag = '<span><p>' + index + '</p>de<p>' + questions.length + '</p>Perguntas</span>'
    cont_quest_rodape.innerHTML = totalQuestContTag;
}
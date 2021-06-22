// Obtendo todas as requisições dos elementos
const start_btn = document.querySelector(".start_btn button");
const info_caixa = document.querySelector(".info_caixa");
const sair = info_caixa.querySelector(".botoes .sair");
const reiniciar = info_caixa.querySelector(".botoes .reiniciar");
const caixa_quiz = document.querySelector(".caixa_quiz");


 // Ação do botão Start
 start_btn.onclick = ()=>{
     info_caixa.classList.add("activeInfo"); // Mostrar a caixa de informação "Regras"
 }

// Ação do botão Sair
sair.onclick = ()=>{
    info_caixa.classList.remove("activeInfo"); // Fechar a caixa de informação "Regras"
}

// Ação do botão Continuar
reiniciar.onclick = ()=>{
    info_caixa.classList.remove("activeInfo"); // Fechar a caixa de informação "Regras"
    caixa_quiz.classList.add("activeQuiz"); // Mostrar a caixa do Quiz
    showQuestions()
}

let contQuestoes = 0;
// Obtendo as questões e opções do Array
function showQuestions(){
    const questao_texto = document.querySelector(".questao_texto")
    let que_tag = '<span>' + questions[].question + '</span>';
    questao_texto.innerHTML = que_tag;
}
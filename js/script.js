// Obtendo todas as requisições dos elementos
const start_btn = document.querySelector(".start_btn button");
const info_caixa = document.querySelector(".info_caixa");
const sair = info_caixa.querySelector(".botoes .sair");
const reiniciar = info_caixa.querySelector(".botoes .reiniciar");
const caixa_quiz = document.querySelector(".caixa_quiz");
const lista_de_opcao = document.querySelector(".lista_de_opcao")


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
    showQuestions(0)
    questCont(1)
}

let contQuestoes = 0;
let numQuestao = 1;

const proximo_btn = caixa_quiz.querySelector(".proximo_btn");

// Ação do botão "Proxima"
proximo_btn.onclick = () => {
    if (contQuestoes < questions.length - 1) {
        contQuestoes++;
        numQuestao++;
        showQuestions(contQuestoes);
        questCont(numQuestao);
    } else {
        console.log("Quiz completado")
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
        let userResp = answer.textContent;
        let respCorreta = questions[contQuestoes].answer;
        let alloptions = lista_de_opcao.children.length;
        if(userResp == respCorreta){
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
    }


function questCont(index) {
    const cont_quest_rodape = caixa_quiz.querySelector(".total_questoes");
    let totalQuestContTag = '<span><p>' + index + '</p>de<p>' + questions.length + '</p>Perguntas</span>'
    cont_quest_rodape.innerHTML = totalQuestContTag;
}
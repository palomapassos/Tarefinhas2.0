//interação
const form = document.querySelector("form");
const entrada = document.querySelector(".entrada");
const marcarTodas = document.querySelector(".check-entrada");
const limparFeitas = document.querySelector(".limparFeitas");
const buttonTodas = document.querySelector(".todas");
const buttonAFazer = document.querySelector(".naoFeitas");
const buttonCompletadas = document.querySelector(".completas");

//outras seleções
const contador = document.querySelector(".contador");
const aFazer = document.querySelector(".aFazer");
const feitas = document.querySelector(".feitas");
let contFazer = aFazer.querySelectorAll('li').length;
const li = document.querySelector('li');


//função contagem de tarefas
const atualizandoContador = () => {
    contFazer = aFazer.querySelectorAll('li').length;
    contFazer===1 ? 
    contador.innerText=contFazer+" item" : contador.innerText= contFazer+" itens";
}

// função criando tarefa
const criarTarefa = () => {
  
  //criando checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  
  //criando o texto
  const texto = document.createElement("span");
  texto.innerText = entrada.value;
  
  //criando botão de remover
  const botaoRemover = document.createElement("button");
  botaoRemover.innerText="Remover";
  
  //criando a tarefa
  const tarefa = document.createElement("li");
  
  //acrescentando elementos de tarefa
  tarefa.append(checkbox);
  tarefa.append(texto);
  tarefa.append(botaoRemover);
  aFazer.append(tarefa);
  
   //contando tarefas
  atualizandoContador();
  
  //chamando a função de remover ao clicar individualmente
   botaoRemover.addEventListener("click", removerTarefa);
  
  //chamando a função de remover feitas ao clicar
    limparFeitas.addEventListener("click", removerFeitas);
  
  //chamando a função de colocar como feita ao marcar individualmente
   checkbox.addEventListener("input", tarefaFeita);
  
   //chamando a função de colocar todas como feitas ao marcar 
   marcarTodas.addEventListener("input", todasFeitas);
  
}

// função removendo tarefa
const removerTarefa = (event) => {
  const botaoRemover = event.target;
  const tarefa = botaoRemover.closest("li");
  tarefa.remove();
  atualizandoContador();
}

// função removendo feitas
const removerFeitas = (event) => {
  const tarefas = feitas.querySelectorAll("li");
  for(let i=0; i<tarefas.length; i++){
    tarefas[i].remove();
  } 
  marcarTodas.checked = false;
  atualizandoContador();
}

// função marcando como feita
const tarefaFeita = (event) => {
  const checkbox = event.target;
  const tarefa = checkbox.closest("li");
  const contFeitas = feitas.querySelectorAll("li").length;
   checkbox.checked ?
      feitas.append(tarefa) : aFazer.append(tarefa);
   atualizandoContador();
   (contFeitas>0 && contFazer===0) ?
      marcarTodas.checked = true : marcarTodas.checked = false;
 }

//função marca todas como feitas
const todasFeitas = () => {
  const tarefasFazer = aFazer.querySelectorAll("li");
  const tarefasFeitas = feitas.querySelectorAll("li");
  const checkboxFazer = aFazer.querySelectorAll("input");
  const checkboxFeitas = feitas.querySelectorAll("input");
    if(marcarTodas.checked){
      for(let i=0; i<tarefasFazer.length; i++){
        feitas.append(tarefasFazer[i]); 
        checkboxFazer[i].checked = true;
      }
    }else{
      for(let i=0; i<tarefasFeitas.length; i++){
        aFazer.append(tarefasFeitas[i]);
        checkboxFeitas[i].checked = false;
      }
    }
  atualizandoContador();
}


// dando start com um evento
form.addEventListener("submit", () => {
  
  // evitando que a página navegue
  event.preventDefault();
  
  // chamando a função de criar tarefa
  criarTarefa();
  
  // tornando o input vazio novamente
  entrada.value = "";
  
});

//mostrando todas as tarefas
buttonTodas.addEventListener("click", () => {
  aFazer.style.display = 'block';
  feitas.style.display = 'block';
})

//mostrando as tarefas a fazer
buttonAFazer.addEventListener("click", () => {
  aFazer.style.display = 'block';
  feitas.style.display = 'none';
})

//mostrando as tarefas feitas
buttonCompletadas.addEventListener("click", () => {
    feitas.style.display = 'block';
    aFazer.style.display = 'none';
})


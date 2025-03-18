function registrar(){
    let tarefa = document.getElementById('taskInput')
    let priority = document.getElementById('priority')
    console.log(priority.value)
    if(tarefa.value.length === 0 || tarefa.value == ' '){
        alert('Você não deve deixar espaços em branco')
    }else if(priority.value > '3' || priority.value < '1'){
        alert('Você deve colocar um valor entre 1 e 3 como prioridade')
    }else{
        addEntry(tarefa.value, priority.value)
    }
}
function deletar(item, tarefas){
    console.log('chegou aqui')
    tarefas.splice(item, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    taskList()
}
function taskList(){
    let list = document.getElementById('taskList')
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))
    list.innerHTML = ''
    for(let i = 0; i < tarefas.length; i++){
        let item = document.createElement('li')
        let textoTarefa = document.createTextNode(tarefas[i].tarefa)
        let button = document.createElement('button')
        button.addEventListener('click', () => deletar(i, tarefas))
        if(tarefas[i].prioridade == 1){
            item.style.background = '#FA8072'
        }else if(tarefas[i].prioridade == 2){
            item.style.background = 'yellow'
        }else{
            item.style.background = 'lightgreen'
        }
        item.appendChild(textoTarefa)
        item.appendChild(button)
        list.appendChild(item)
    }
}
function addEntry(tarefa, prioridade){
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))
    if(tarefas == null) tarefas = []
    console.log(tarefas)
    let entry = {tarefa, prioridade}
    tarefas.push(entry)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    taskList()
}
function ordenar(){
    console.log('chegou aqui')
    let ordem = document.getElementById('priorityFilter')
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))
    let ordenação
    if(ordem.value == '1'){
        console.log('chegou aqui')
         ordenação = tarefas.sort((a, b) => a.prioridade - b.prioridade)
        console.log(ordenação)
    }else if(ordem.value == '3'){
         ordenação = tarefas.sort((a, b)=> b.prioridade - a.prioridade)
    }else if(ordem.value == '2') {
        ordenação = tarefas.sort((a, b) => {
            if (a.prioridade === '2' && b.prioridade !== '2') return -1
            if (b.prioridade === '2' && a.prioridade !== '2') return 1
            return a.prioridade - b.prioridade;
        })
    }
    localStorage.setItem('tarefas', JSON.stringify(ordenação))
    taskList()
}
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tarefas")) {
        taskList();
    }
});

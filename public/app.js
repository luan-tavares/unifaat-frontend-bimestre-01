
import { editName } from "./editName.js";

const names = [
    "Ana Martins",
    "Carlos Souza",
    "Fernanda Lima",
    "João Oliveira",
    "Mariana Costa",
    "Pedro Almeida",
    "Camila Rocha",
    "Lucas Fernandes",
    "Beatriz Gomes"
];


// Obter os elementos
const sectionListElement = document.getElementById("list-container");
const inputListAddElement = document.getElementById("list-add");
const buttonListAddElement = document.getElementsByClassName("btn")[0];

console.log(
    sectionListElement,
    inputListAddElement,
    buttonListAddElement
);


// Criar um ELEMENTO ul - elemento que engloba uma lista
const ulElement = document.createElement("ul");

// Adicionar uma classe
ulElement.setAttribute("class", "list-names");

// Inserir o ul no container principal
sectionListElement.append(ulElement);


// Criar os itens iniciais da lista
names.forEach((name) => {

    // Criar o elemento li
    const liElement = document.createElement("li");

    // Criar o elemento que contém o nome
    const nameElement = document.createElement("span");
    nameElement.classList.add("name");
    nameElement.textContent = name;

    // Adicionar o nome dentro do li
    liElement.append(nameElement);

    // Listener para editar o nome
    liElement.addEventListener("click", editName);

    // Criar o botão excluir
    const buttonDeleteElement = document.createElement("button");

    buttonDeleteElement.innerHTML = "<strong>Excluir</strong>";

    buttonDeleteElement.addEventListener("click", (event) => {

        // Obter o elemento que acionou a ação
        const currentTargetElement = event.currentTarget;

        // Obter o li, seu elemento pai
        const liParentElement = currentTargetElement.parentElement;

        // Remover o li
        liParentElement.remove();
    });

    // Adicionar o botão Excluir
    liElement.append(" ", buttonDeleteElement);

    // Adicionar o li na lista
    ulElement.append(liElement);
});


// Adicionar novos itens
buttonListAddElement.addEventListener("click", (event) => {

    event.preventDefault();

    const inputValue = inputListAddElement.value;

    // Não permitir valor vazio
    if (inputValue.trim() === "") {
        return;
    }

    // Criar o elemento li
    const liElement = document.createElement("li");

    // Criar o elemento que contém o nome
    const nameElement = document.createElement("span");
    nameElement.classList.add("name");
    nameElement.textContent = inputValue;

    // Adicionar o nome dentro do li
    liElement.append(nameElement);

    // Listener para editar o nome
    liElement.addEventListener("click", editName);

    // Criar o botão Excluir
    const buttonDeleteElement = document.createElement("button");

    buttonDeleteElement.innerHTML = "<strong>Excluir</strong>";

    buttonDeleteElement.addEventListener("click", (event) => {

        // Obter o elemento que acionou a ação
        const currentTargetElement = event.currentTarget;

        // Obter o li, seu elemento pai
        const liParentElement = currentTargetElement.parentElement;

        // Remover o li
        liParentElement.remove();
    });

    // Adicionar o botão Excluir
    liElement.append(" ", buttonDeleteElement);

    // Adicionar o li na lista
    ulElement.append(liElement);

    // Limpar o input
    inputListAddElement.value = "";
});


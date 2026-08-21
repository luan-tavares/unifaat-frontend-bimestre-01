const names = [
    "Ana Martins",
    "Carlos Souza",
    "Fernanda Lima",
    "João Oliveira",
    "Mariana Costa",
    "Pedro Almeida",
    "Camila Rocha",
    "Lucas Fernandes",
    "Beatriz Gomes",
    "Jefferson github"
];

// Obter os elementos
const sectionListElement = document.getElementById("list-container");
const inputListAddElement = document.getElementById("list-add");
const buttonListAddElementList = document.getElementsByClassName("btn");

const buttonListAddElement = buttonListAddElementList[0];

// Criar um ELEMENTO ul - elemento que engloba uma lista
const ulElement = document.createElement("ul");

// Adicionar uma classe
ulElement.setAttribute("class", "list-names");

// Inserir no nó do container principal da árvore DOM
sectionListElement.append(ulElement);

names.forEach((name) => {
    // Criar o elemento li
    const liElement = document.createElement("li");

    // Adicionar o conteúdo do elemento li
    liElement.innerText = name;

    // Criar o botão excluir
    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.innerText = "Excluir";

    buttonDeleteElement.addEventListener("click", (event) => {
        const liElement = event.currentTarget.parentElement;
        liElement.remove();
    });

    // Adicionar o botão ao li
    liElement.append(buttonDeleteElement);

    // Adicionar o li ao ul
    ulElement.append(liElement);
});

buttonListAddElement.addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = inputListAddElement.value;

    if (inputValue === "") {
        return;
    }

    // Criar o novo li
    const liElement = document.createElement("li");
    liElement.innerText = inputValue;

    // Criar o botão excluir
    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.innerText = "Excluir";

    buttonDeleteElement.addEventListener("click", (event) => {
        const liElement = event.currentTarget.parentElement;
        liElement.remove();
    });

    // Adicionar o botão ao li
    liElement.append(buttonDeleteElement);

    // Adicionar o novo item à lista
    ulElement.append(liElement);

    // Limpar o input
    inputListAddElement.value = "";
});
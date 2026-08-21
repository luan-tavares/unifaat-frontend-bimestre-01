
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
// Adicionar uma classe - JEITO NÃO RECOMENDADO
ulElement.setAttribute("class", "list-names");
// AQUI O ELEMENTO JÁ EXISTE, JÁ ESTÁ REFERENCIADO EM UMA CONSTANTE.
// PORÉM NÃO FOI INSERIDO NA ÁVORE DOM


//iNSERIR ENO NÓ DO CONTAINER PRINCIPAL DA ÁRVORE DOM
sectionListElement.append(ulElement);


names.forEach((name) => {
    // Criar o elemento li, item de uma lista
    const liElement = document.createElement("li");

    // Adicionar um conteúdo texto no elemento li
    liElement.innerText = name;

    // Criar o botao excluir
    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        event.currentTarget.parentElement.remove();
    });
  

    // Adicionar na árvore DOM, no nosso ul principal
    liElement.append(buttonDeleteElement);
    ulElement.append(liElement);
});



buttonListAddElement.addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = inputListAddElement.value;

    if (inputValue === "") {
        return;
    }

    const liElement = document.createElement("li");
    liElement.innerText = inputValue;

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.innerText = "Excluir";

    buttonDeleteElement.addEventListener("click", (event) => {
    event.currentTarget.parentElement.remove();
    });

    liElement.append(buttonDeleteElement);
    ulElement.append(liElement);

    inputListAddElement.value = "";

});



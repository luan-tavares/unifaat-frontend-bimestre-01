
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

const sectionListElement = document.getElementById("list-container");
const inputListAddElement = document.getElementById("list-add");
const buttonListAddElement = document.getElementsByClassName("btn")[0];

const ulElement = document.createElement("ul");
ulElement.setAttribute("class", "list-names");
sectionListElement.append(ulElement);

function createListItem(name) {
    const liElement = document.createElement("li");
    const textNode = document.createTextNode(name);
    const buttonDeleteElement = document.createElement("button");

    buttonDeleteElement.type = "button";
    buttonDeleteElement.textContent = "Excluir";
    buttonDeleteElement.classList.add("delete-btn");

    buttonDeleteElement.addEventListener("click", () => {
        const liParentElement = buttonDeleteElement.parentElement;
        if (liParentElement) {
            liParentElement.remove();
        }
    });

    liElement.append(textNode, " ", buttonDeleteElement);

    return liElement;
}

names.forEach((name) => {
    ulElement.append(createListItem(name));
});

buttonListAddElement.addEventListener("click", (event) => {
    event.preventDefault();

    const inputValue = inputListAddElement.value.trim();

    if (inputValue === "") {
        return;
    }

    ulElement.append(createListItem(inputValue));
    inputListAddElement.value = "";
    inputListAddElement.focus();
});



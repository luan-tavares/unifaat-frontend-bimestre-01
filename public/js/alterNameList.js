export default function alterNameList(liElement) {
    const currentName = liElement.firstChild.textContent.trim();

    liElement.innerHTML = "";

    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.value = currentName;

    const buttonAlterElement = document.createElement("button");
    buttonAlterElement.classList.add("btn", "btn-primary", "btn-sm");
    buttonAlterElement.innerText = "Alterar";

    liElement.append(inputElement, buttonAlterElement);

    function confirmAlteration() {
        const newName = inputElement.value.trim();

        if (newName === "") {
            return;
        }

        liElement.innerHTML = "";

        const textElement = document.createTextNode(newName);

        const buttonDeleteElement = document.createElement("button");
        buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
        buttonDeleteElement.innerText = "Excluir";

        buttonDeleteElement.addEventListener("click", (event) => {
            event.preventDefault();
            event.currentTarget.parentElement.remove();
        });

        liElement.append(textElement, buttonDeleteElement);
    }

    buttonAlterElement.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        confirmAlteration();
    });

    inputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            confirmAlteration();
        }
    });

    inputElement.focus();
}
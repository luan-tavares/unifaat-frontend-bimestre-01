export function editName(event) {

    const liElement = event.currentTarget;

    // Se o clique foi em um botão, não entra no modo de edição
    if (event.target.tagName === "BUTTON") {
        return;
    }

    // Localizar o nome usando querySelector
    const nameElement = liElement.querySelector(".name");

    if (!nameElement) {
        return;
    }

    // Guardar o nome anterior
    const oldName = nameElement.textContent;

    // Remover o nome antigo
    nameElement.remove();

    // Criar o input
    const inputElement = document.createElement("input");

    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", oldName);

    // Criar o botão Alterar
    const buttonAlterElement = document.createElement("button");

    buttonAlterElement.textContent = "Alterar";

    // Adicionar input e botão ao li
    liElement.append(inputElement, " ", buttonAlterElement);

    // Colocar foco no input
    inputElement.focus();


    // Função para confirmar a alteração
    function confirmEdit() {

        const newName = inputElement.value.trim();

        // Não permitir nome vazio
        if (newName === "") {
            inputElement.value = oldName;
            return;
        }

        // Criar novamente o elemento do nome
        const newNameElement = document.createElement("span");

        newNameElement.classList.add("name");
        newNameElement.textContent = newName;

        // Remover input e botão Alterar
        inputElement.remove();
        buttonAlterElement.remove();

        // Adicionar o novo nome
        liElement.prepend(newNameElement);
    }


    // Confirmar clicando em Alterar
    buttonAlterElement.addEventListener("click", confirmEdit);


    // Confirmar pressionando Enter
    inputElement.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            confirmEdit();
        }

    });
}
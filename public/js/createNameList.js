// Removemos os console.log
// console.log("target:", event.target);
// console.log("currentTarget:", event.currentTarget);

// Isso deixa explícito que o botão é um botão de ação, não de envio de formulário.
// buttonDeleteElement.type = "button";

// Isso melhora a acessibilidade, porque leitores de tela conseguem identificar melhor a ação do botão.
// buttonDeleteElement.setAttribute("aria-label", `Excluir ${name}`);

export default function createNameList(name) {
    const liElement = document.createElement("li");

    liElement.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    liElement.append(document.createTextNode(name));

    const buttonDeleteElement = document.createElement("button");

    buttonDeleteElement.type = "button";
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.setAttribute("aria-label", `Excluir ${name}`);
    buttonDeleteElement.innerText = "Excluir";

    buttonDeleteElement.addEventListener("click", (event) => {
        event.preventDefault();

        event.currentTarget.parentElement.remove();
    });

    liElement.append(buttonDeleteElement);

    return liElement;
}
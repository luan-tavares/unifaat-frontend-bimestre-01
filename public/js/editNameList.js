export default function enterEditMode(liElement, currentName, onConfirm) {

    while (liElement.firstChild) {
        liElement.firstChild.remove();
    }

    const inputEditElement = document.createElement("input");
    inputEditElement.setAttribute("type", "text");
    inputEditElement.classList.add("form-control", "form-control-sm");
    inputEditElement.value = currentName;

    const buttonAlterarElement = document.createElement("button");
    buttonAlterarElement.classList.add("btn", "btn-primary", "btn-sm");
    buttonAlterarElement.innerText = "Alterar";

    function confirmEdit() {
        const newValue = inputEditElement.value.trim();
        onConfirm(newValue === "" ? currentName : newValue);
    }

    buttonAlterarElement.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        confirmEdit();
    });

    inputEditElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        confirmEdit();
    });

    liElement.append(inputEditElement);
    liElement.append(buttonAlterarElement);

    inputEditElement.focus();

}

export default function editNameList(liElement, createListItem) {
    liElement.addEventListener("click", (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        const currentName = liElement.firstChild.textContent.trim();
        const inputElement = document.createElement("input");
        const buttonEditElement = document.createElement("button");

        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("value", currentName);
        inputElement.classList.add("form-control", "me-2");

        buttonEditElement.setAttribute("type", "button");
        buttonEditElement.classList.add("btn", "btn-success", "btn-sm");
        buttonEditElement.innerText = "Alterar";

        const confirmEdit = () => {
            const newName = inputElement.value.trim();

            if (newName === "") {
                inputElement.value = currentName;
                inputElement.focus();
                return;
            }

            const updatedItem = createListItem(newName);

            while (liElement.firstChild) {
                liElement.firstChild.remove();
            }

            while (updatedItem.firstChild) {
                liElement.append(updatedItem.firstChild);
            }
        };

        buttonEditElement.addEventListener("click", confirmEdit);
        inputElement.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                confirmEdit();
            }
        });

        while (liElement.firstChild) {
            liElement.firstChild.remove();
        }

        liElement.append(inputElement, buttonEditElement);
        inputElement.focus();
    });
}

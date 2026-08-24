
import createNameList from "./createNameList.js";
import createUl from "./createUl.js";
import initList from "./initList.js";
import editNameList from "./editNameList.js";

window.addEventListener("DOMContentLoaded", () => {


    const sectionListElement = document.querySelector("#list-container");
    const addSectionElement = document.querySelector("#add-section");
    const buttonListAddElement = addSectionElement.querySelector("button");
    const inputListAddElement = addSectionElement.querySelector("input");


    const ulElement = createUl();

    const createEditableListItem = (name) => {
        const liElement = createNameList(name);
        editNameList(liElement, createEditableListItem);
        return liElement;
    };

    sectionListElement.append(ulElement);

    initList(ulElement, createEditableListItem);

    buttonListAddElement.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        const inputElement = event.currentTarget.parentElement.querySelector("input");

        const inputValue = inputElement.value.trim();

        if (inputValue === "") {
            return;
        }
        const liElement = createEditableListItem(inputValue);
        ulElement.prepend(liElement);
        inputElement.value = "";
    });

    inputListAddElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        const buttonElement = event.currentTarget.parentElement.querySelector("button");
        buttonElement.dispatchEvent(new Event("click"));

    });

});

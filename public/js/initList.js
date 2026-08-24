import createNameList from "./createNameList.js";
import jsonContent from "../example.json" with { type: "json" };

export default function initList(ulElement, createListItem = createNameList) {

    jsonContent.data.forEach(({ name }) => {
        const liElement = createListItem(name);

        ulElement.append(liElement);
    });

}

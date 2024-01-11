import { getData } from "../common.js";
const $bookTable = $('#top-books tbody');
const $visitorTable = $('#top-visitors tbody');
const books = getData("books");
const visitors = getData("visitors");
const cards = getData("cards");
function setTable(table, array) {
    let map = new Map();
    cards.forEach(item => {
        let value = array[0].author ? item.bookId : item.visitorId;
        if (map.has(value))
            map.set(value, map.get(value) + 1);
        else map.set(value, 1);
    });
    Array.from(map).sort((a, b) => {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
    }).every((item, ind) => {
        if (ind == 5) return false;
        table.append(`
        <tr>
            <td>${ind + 1}</td>
            <td>${array.find((x) => x.id == item[0]).name}</td>
            <td>${item[1]}</td>
        </tr>`);
        return true;
    })
}
setTable($bookTable, books);
setTable($visitorTable, visitors);
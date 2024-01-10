import {getData} from "../common.js";
let $bookTable = $('#top-books tbody'); 
let $visitorTable = $('#top-visitors tbody'); 
let books = getData("books");
let visitors = getData("visitors");
let cards = getData("cards");
function setTable(table,array)
{
    let map = new Map();
    cards.forEach(item => {
        let value = array[0].author ? item.bookId : item.visitorId;
        if(map.has(value))
            map.set(value,map.get(value)+1);
        else map.set(value,1);
    });
    console.info(map);
    Array.from(map).sort((a,b)=>{
        if(a[1] < b[1]) return 1;
        if(a[1] > b[1]) return -1;
        return 0;
    }).every((item,ind)=>{
        if(ind == 5) return false;
        table.append(`
        <tr>
            <td>${ind+1}</td>
            <td>${array.find((x)=>x.id == item[0]).name}</td>
            <td>${item[1]}</td>
        </tr>`);
        return true;
    })
}
setTable($bookTable,books);
setTable($visitorTable,visitors);
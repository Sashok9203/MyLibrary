import {closeWindow,openWindow,$table,getData,setData,getId,$sortValue,$newButton,$sort_button,$search_button,$searchValue, Card} from "../common.js";

let Cards = getData("cards");
let Visitors = getData("visitors");
let Books = getData("books");
let $bookCB = $('#books-combobox');
let $visitorCB = $('#visitors-combobox');

$('.edit-window button').click(saveCard);

$sort_button.click(()=>{
    setDataToTable('',$sortValue.val());
});

$newButton.click(()=>{
    newCard();
});

$search_button.click(()=>{
    setDataToTable($searchValue.val());
});

function setVisitorsCB()
{
    Visitors.forEach((item)=>{
        $visitorCB.append(`<option value="${item.id}">${item.name}</option>`);
    });
}

function setBooksCB()
{
   $bookCB.empty();
   Books.forEach((item)=>{
    if(item.booksCount > 0)
        $bookCB.append(`<option value="${item.id}">${item.name}</option>`);
   });
   
}

function saveCard()
{
    if(!checkUserInput())
    {
        alert('The input fields are not filled correctly...');
        return;
    }
    let selectedBook = Books.find((item)=>item.id == $bookCB.val());
    Cards.push(new Card(
        getId('card_id'),
        $visitorCB.val(),
        selectedBook.id)
      );
    selectedBook.booksCount--;
    setDataToTable();
    setData("cards",Cards);
    setData("books",Books);
    closeWindow();
}

function checkUserInput(){
   return($bookCB.val() && $visitorCB.val())
}

function setDataToTable(filter,sort)
{
    let tempCardsArray;
    if(filter){
        filter = filter.toLowerCase();
        tempCardsArray = Cards.filter((item)=>(Books.find((x)=>x.id == item.bookId).name.toLowerCase().includes(filter) || 
                                               Visitors.find((x)=>x.id == item.visitorId).name.toLowerCase().includes(filter)||
                                               item.borrow_date.includes(filter)||
                                               (item.return_date && item.return_date.includes(filter))));
    }
    else
       tempCardsArray = Cards;

    if(sort){
       let lessCondition,moreCondition;
       switch(sort)
        {
            case 'id':
                lessCondition = (a,b) =>a.id < b.id;
                moreCondition = (a,b) =>a.id > b.id;
                break;
            case 'visitor':
                lessCondition = (a,b) =>Visitors.find((item)=>item.id == a.visitorId).name < Visitors.find((item)=>item.id == b.visitorId).name;
                moreCondition = (a,b) =>Visitors.find((item)=>item.id == a.visitorId).name > Visitors.find((item)=>item.id == b.visitorId).name;
                break;
            case 'book':
                lessCondition = (a,b) =>Books.find((item)=>item.id == a.bookId).name < Books.find((item)=>item.id == b.bookId).name;
                moreCondition = (a,b) =>Books.find((item)=>item.id == a.bookId).name > Books.find((item)=>item.id == b.bookId).name;;
                break;
            case 'borrow_date':
                lessCondition = (a,b) =>a.borrow_date < b.borrow_date;
                moreCondition = (a,b) =>a.borrow_date > b.borrow_date;
                break; 
            case 'return_date':
                lessCondition = (a,b) =>(a.return_date && !b.return_date) || (a.return_date < b.return_date);
                moreCondition = (a,b) =>(!a.return_date && b.return_date) || (a.return_date > b.return_date);
                break;
        }
        tempCardsArray.sort((a,b)=>{
            if(moreCondition(a,b)) return 1;
            if (lessCondition(a,b)) return -1;
         return 0;
        });
     }
    $table.empty();
    tempCardsArray.forEach(element => {
        let returnElement = element.return_date?
           `<td>${element.return_date}</td>`:
           `<td><img id = "${element.id}" class = "return" src = "../Images/return.png"></td>`;
        $table.append(`
        <tr>
            <td>${element.id}</td>
            <td>${Books.find((item)=>item.id == element.bookId).name}</td>
            <td>${Visitors.find((item)=>item.id == element.visitorId).name}</td>
            <td>${element.borrow_date}</td>
            ${returnElement}           
        </tr>`);
    });
    $('.return').click(returnBook);
}

function returnBook(event)
{
    if(!confirm(`Are you sure ?`)) return;
    let element = Cards.find((item)=> item.id == event.target.id);
    let returnedBook = Books.find((item)=> item.id == element.bookId);
    returnedBook.booksCount++;
    element.return_date = new Date(Date.now()).toISOString().split('T')[0];
    setDataToTable();
    setData("cards",Cards);
    setData("books",Books);
}

function newCard()
{
    setBooksCB();
    openWindow('New Card');
}

setVisitorsCB();
setDataToTable();







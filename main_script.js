import {sortFunct,closeWindow,openWindow,$table,getData,setData,Book,getId,$sortValue,$newButton,$sort_button,$search_button,$searchValue} from "../common.js";

let Books = getData("books");
let Cards = getData("cards");
let editableBook = null;
let $nameInput = $('#name');
let $authorInput = $('#author');
let $yearInput = $('#year');
let $publishingInput = $('#publishing');
let $pagesInput = $('#pages');
let $countInput = $('#count');
$('.edit-window button').click(saveBook);

$sort_button.click(()=>{
    setDataToTable('',$sortValue.val());
});

$newButton.click(()=>{
    editWindow();
});

$search_button.click(()=>{
    setDataToTable($searchValue.val());
});


function saveBook()
{
    if(!checkUserInput())
    {
        alert('The input fields are not filled correctly...');
        return;
    }
    if(editableBook)
    {
        editableBook.name = $nameInput.val();
        editableBook.author = $authorInput.val();
        editableBook.year = $yearInput.val();
        editableBook.publishing = $publishingInput.val();
        editableBook.pagesCount = $pagesInput.val();
        editableBook.booksCount = $countInput.val();
    }
    else{
      Books.push(new Book(
        getId('book_id'),
        $nameInput.val(),
        $authorInput.val(),
        $yearInput.val(),
        $publishingInput.val(),
        $pagesInput.val(),
        $countInput.val())
      );
    }
    setDataToTable();
    setData("books",Books);
    closeWindow();
}

function checkUserInput()
{
   return($nameInput.val() 
          && $authorInput.val() 
          && $yearInput.val() 
          && $yearInput.val() > 0
          && $publishingInput.val()
          && $pagesInput.val()
          && $pagesInput.val() > 0
          && $countInput.val()
          && $countInput.val() > 0)
}

function setDataToTable(filter,sort)
{
    let tempBookArray;
    if(filter){
        filter = filter.toLowerCase();
        tempBookArray = Books.filter((item)=>(item.name.toLowerCase().includes(filter) || item.author.toLowerCase().includes(filter) || item.publishing.toLowerCase().includes(filter)))
    }
    else
       tempBookArray = Books;
    if(sort)
        tempBookArray.sort(sortFunct(sort));
    $table.empty();
    tempBookArray.forEach(element => {
        $table.append(`
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.year}</td>
            <td>${element.publishing}</td>
            <td>${element.pagesCount}</td>
            <td>${element.booksCount}</td>
            <td><img id = "${element.id}" class = "edit" src = "Images/edit.png"></td>
            <td><img id = "${element.id}" class = "remove" src = "Images/delete.png"></td>
        </tr>`);
    });
    $('.edit').click(edit);
    $('.remove').click((event)=>{
        remove(event);
        setDataToTable();
    });
}

function edit(event)
{
    let element = Books.find((item)=> item.id == event.target.id);
    editWindow(element);
}

function remove(event)
{
    let element = Cards.some((item)=>item.bookId == event.target.id);
    if(!confirm(`Are you sure you want to delete this book?\n${element?'This book has an entry in the visitors cards ! ! !':''}`)) return;
    event.preventDefault();
    if(element)
    {
       Cards.filter((item)=>item.bookId == event.target.id)
            .forEach((item)=>{Cards.splice(Cards.indexOf(item),1)});
       setData('cards',Cards);
    }
    element = Books.find((item)=> item.id == event.target.id);
    let index =  Books.indexOf(element);
    Books.splice(index,1);
    setData('books',Books);
    setDataToTable();
}

function editWindow(obj)
{
    let winName;
    if(obj)
    {
       setWindowData(obj);
       winName ='Edit book';
    }
    else
    {
       editableBook = null;
       $(':input','.edit-window').val('');
       winName ='New book';
    }
    openWindow(winName);
}

function setWindowData(obj)
{
    editableBook = obj;
    $nameInput.val(obj.name);
    $authorInput.val(obj.author);
    $yearInput.val(obj.year);
    $publishingInput.val(obj.publishing);
    $pagesInput.val(obj.pagesCount);
    $countInput.val(obj.booksCount);
}

setDataToTable();







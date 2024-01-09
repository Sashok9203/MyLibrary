let myStorange = window.localStorage;
let $sortValue = $('#sort-combobox');
let $newButton = $('#title button');
let $sort_button = $('#sort button');
let $search_button = $('#search button');
let $searchValue = $('#search input');
let $table = $('tbody');
let $popupWindow = $('.edit-window');
let $popupWindowName = $('.edit-window #window-name');
let $owerlay = $('.owerlay');

$('.edit-window img').click(closeWindow);


function getData(name)
{
    let data = [];
    if(myStorange.getItem(name) === null)
        setData(name,data);
    else
        data = JSON.parse(myStorange.getItem(name));
    return data;
}

function setData(name,data){
    myStorange.setItem(name,JSON.stringify(data));
}

function getId(type){
    let id = 1;
    if(myStorange.getItem(type) === null)
        myStorange.setItem(type,1);
    else
    {
       id = myStorange.getItem(type);
       myStorange.setItem(type,++id);
    }
    return id ;
}


class Book{
   
    constructor(id,name,author,year,publishing,pagesCount,booksCount)
    {
       this.id = id;
       this.name = name;
       this.author = author;
       this.year = year;
       this.publishing = publishing;
       this.pagesCount = pagesCount;
       this.booksCount = booksCount;
    }
    
}

class Visitor{
   
    constructor(id,name,telephone)
    {
       this.id = id;
       this.name = name;
       this.telephone = telephone;
    }
}

class Card{
   
    constructor(id,visitorId,bookId,visitorName,bookName)
    {
       this.id = id;
       this.visitorId = visitorId;
       this.bookId = bookId;
       this.borrow_date = new Date(Date.now()).toISOString().split('T')[0];
       this.return_date = null;
    }
}


function initData()
{
    let storage = window.localStorage;
    let array;
    //storage.clear();  
    if(storage.getItem("books") === null)
    {
        array = [new Book(getId("book_id"),"Book1","Author1",1990,"Publishing1",120,2),
        new Book(getId("book_id"),"Book2","Author2",1992,"Publishing2",122,22),
        new Book(getId("book_id"),"Book3","Author3",1993,"Publishing3",130,3),
        new Book(getId("book_id"),"Book4","Author4",1994,"Publishing4",140,4),
        new Book(getId("book_id"),"Book5","Author5",2000,"Publishing5",150,5)];
        storage.setItem("books",JSON.stringify(array));
    }
    if(storage.getItem("visitors") === null)
    {
        array = [new Visitor(getId("visitor_id"),"Saray P.H","098-876-76-56"),
        new Visitor(getId("visitor_id"),"Saray2 P.H","098-276-26-26"),
        new Visitor(getId("visitor_id"),"Saray3 P.H","098-836-36-36"),
        new Visitor(getId("visitor_id"),"Saray4 P.H","098-846-46-46"),
        new Visitor(getId("visitor_id") ,"Saray5 P.H","098-856-56-56")];
        storage.setItem("visitors", JSON.stringify(array));
    }
    if(storage.getItem("cards") === null)
    {
        array = [new Card(getId("card_id"),1,1,"Saray1 P.H","Book1"),
        new Card(getId("card_id"),2,2,"Saray2 P.H","Book2"),
        new Card(getId("card_id"),2,3,"Saray2 P.H","Book3"),
        new Card(getId("card_id"),4,4,"Saray4 P.H","Book4"),
        new Card(getId("card_id"),1,4,"Saray1 P.H","Book4")];
        storage.setItem("cards", JSON.stringify(array));
    }
}

function openWindow(winName)
{
    $popupWindowName.text(winName);
    $owerlay.css('display','block');
    $popupWindow.css('display','flex');
}

function closeWindow()
{
    $owerlay.css('display','none');
    $popupWindow.css('display','none');
}

initData();

export {closeWindow,openWindow,getData,setData,Book,getId,Card,Visitor,$sortValue,$newButton,$sort_button,$search_button,$searchValue,$table};
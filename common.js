const myStorange = window.localStorage;
const $sortValue = $('#sort-combobox');
const $newButton = $('#title button');
const $sort_button = $('#sort button');
const $search_button = $('#search button');
const $searchValue = $('#search input');
const $table = $('tbody');
const $popupWindow = $('.edit-window');
const $popupWindowName = $('.edit-window #window-name');
const $owerlay = $('.owerlay');

$('.edit-window img').click(closeWindow);


function getData(name) {
    let data = [];
    if (myStorange.getItem(name) === null)
        setData(name, data);
    else
        data = JSON.parse(myStorange.getItem(name));
    return data;
}

function setData(name, data) {
    myStorange.setItem(name, JSON.stringify(data));
}

function getId(type) {
    let id = 1;
    if (myStorange.getItem(type) === null)
        myStorange.setItem(type, 1);
    else {
        id = myStorange.getItem(type);
        myStorange.setItem(type, ++id);
    }
    return id;
}


class Book {
    constructor(id, name, author, year, publishing, pagesCount, booksCount) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.year = year;
        this.publishing = publishing;
        this.pagesCount = pagesCount;
        this.booksCount = booksCount;
    }
}

class Visitor {
    constructor(id, name, telephone) {
        this.id = id;
        this.name = name;
        this.telephone = telephone;
    }
}

class Card {
    constructor(id, visitorId, bookId) {
        this.id = id;
        this.visitorId = visitorId;
        this.bookId = bookId;
        this.borrow_date = new Date(Date.now()).toISOString().split('T')[0];
        this.return_date = null;
    }
}

function sortFunct(sort) {
    let lessCondition = new Function('a', 'b', `return a.${sort} < b.${sort}`);
    let moreCondition = new Function('a', 'b', `return a.${sort} > b.${sort}`);;
    return (a, b) => {
        if (moreCondition(a, b)) return 1;
        if (lessCondition(a, b)) return -1;
        return 0;
    };
}

function initData() {
    let storage = window.localStorage;
    let array;
    //storage.clear();  
    if (storage.getItem("books") === null) {
        array = [new Book(getId("book_id"), "Flexbox in CSS", "Estelle Weyl", 2017, "O’Reilly Media", 150, 3),
        new Book(getId("book_id"), "The Joy of JavaScript", "Luis Atencio", 2021, "Manning Publications", 122, 4),
        new Book(getId("book_id"), "Windows Internals Part 2", "Andrea Allievi", 2021, "Pearson Education", 921, 3),
        new Book(getId("book_id"), "Microsoft .NET Framework 3.5, ADO.NET Application Development", "Jim Wightman", 2022, "Microsoft Press", 526, 4),
        new Book(getId("book_id"), "SQL in a Nutshell: A Desktop Quick Reference", "Kevin Kline", 2022, "O’Reilly Media", 360, 5),
        new Book(getId("book_id"), "Code like a Pro in C#", "Jort Rodenburg", 2021, "Manning Publications", 418, 5),
        new Book(getId("book_id"), "C# in Depth 4th Edition by Jon Skeet", "Jon Skeet", 2019, "Manning Publications", 528, 5),
        new Book(getId("book_id"), "C++ Primer Plus", "Stephen Prata", 2012, "Pearson Education", 1429, 5),];
        storage.setItem("books", JSON.stringify(array));
    }
    if (storage.getItem("visitors") === null) {
        array = [new Visitor(getId("visitor_id"), "Sinclair Fonzo", "068-876-76-56"),
        new Visitor(getId("visitor_id"), "Fayette McIlwraith", "055-276-26-26"),
        new Visitor(getId("visitor_id"), "Padgett Pretty", "097-346-36-36"),
        new Visitor(getId("visitor_id"), "Fanechka Werndly", "099-812-46-46"),
        new Visitor(getId("visitor_id"), "Carmen Piatkow", "093-456-56-56"),
        new Visitor(getId("visitor_id"), "Rachael Keyzman", "067-746-46-46"),
        new Visitor(getId("visitor_id"), "Camella Elliott", "099-816-46-46"),
        new Visitor(getId("visitor_id"), "Ezri Phipard-Shears", "093-046-46-46")];
        storage.setItem("visitors", JSON.stringify(array));
    }
    if (storage.getItem("cards") === null) {
        array = [{ id: getId("card_id"), visitorId: 1, bookId: 1, borrow_date: "2023-02-12", return_date: "2023-02-25" },
        { id: getId("card_id"), visitorId: 1, bookId: 8, borrow_date: "2023-01-02" },
        { id: getId("card_id"), visitorId: 1, bookId: 2, borrow_date: "2023-08-10", return_date: "2023-10-25" },
        { id: getId("card_id"), visitorId: 2, bookId: 6, borrow_date: "2023-09-22", return_date: "2023-10-20" },
        { id: getId("card_id"), visitorId: 3, bookId: 3, borrow_date: "2023-03-23" },
        { id: getId("card_id"), visitorId: 2, bookId: 3, borrow_date: "2023-11-12", return_date: "2023-12-01" },
        { id: getId("card_id"), visitorId: 5, bookId: 2, borrow_date: "2023-03-07" },
        { id: getId("card_id"), visitorId: 8, bookId: 5, borrow_date: "2023-08-12" }];
        storage.setItem("cards", JSON.stringify(array));
    }
}

function openWindow(winName) {
    $popupWindowName.text(winName);
    $owerlay.css('display', 'block');
    $popupWindow.css('display', 'flex');
}

function closeWindow() {
    $owerlay.css('display', 'none');
    $popupWindow.css('display', 'none');
}

initData();

export { sortFunct, closeWindow, openWindow, getData, setData, Book, getId, Card, Visitor, $sortValue, $newButton, $sort_button, $search_button, $searchValue, $table };
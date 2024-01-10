import {closeWindow,openWindow,$table,getData,setData,Visitor,getId,$sortValue,$newButton,$sort_button,$search_button,$searchValue} from "../common.js";

let Visitors = getData("visitors");
let editableVisitor = null;
let $nameInput = $('#name');
let $phoneInput = $('#telephone');
$phoneInput.attr('placeholder','(XXX-XXX-XX-XX) (XXX-XXX-XXXX) (XXX XXX XX XX) (XXX XXX XXXX)');

$('.edit-window button').click(saveVisitor);

$sort_button.click(()=>{
    setDataToTable('',$sortValue.val());
});

$newButton.click(()=>{
    editWindow();
});

$search_button.click(()=>{
    setDataToTable($searchValue.val());
});

function saveVisitor()
{
    if(!checkUserInput())
    {
        alert('The input fields are not filled correctly...');
        return;
    }
    if(editableVisitor)
    {
        editableVisitor.name = $nameInput.val();
        editableVisitor.telephone = $phoneInput.val();
    }
    else{
      Visitors.push(new Visitor(
        getId('visitor_id'),
        $nameInput.val(),
        $phoneInput.val())
      );
    }
    setDataToTable();
    setData("visitors",Visitors);
    closeWindow();
}

function checkUserInput()
{
  return($nameInput.val() 
          && $phoneInput.val()
          && (/^\d{3}[-\s]{1}\d{3}[-\s]{1}\d{2}[-\s]{0,1}\d{2}[-\s]{0,1}$/gm).test($phoneInput.val()))
}

function setDataToTable(filter,sort)
{
    let tempVisitorsArray;
    if(filter){
        filter = filter.toLowerCase();
        tempVisitorsArray = Visitors.filter((item)=>(item.name.toLowerCase().includes(filter) || item.telephone.includes(filter)))
    }
    else
       tempVisitorsArray = Visitors;

    if(sort){
       let lessCondition,moreCondition;
       switch(sort)
        {
             case 'id':
                 lessCondition = (a,b) =>a.id < b.id;
                 moreCondition = (a,b) =>a.id > b.id;
                 break;
             case 'name':
                 lessCondition = (a,b) =>a.name < b.name;
                 moreCondition = (a,b) =>a.name > b.name;
                 break;
             case 'telephone':
                 lessCondition = (a,b) =>a.telephone < b.telephone;
                 moreCondition = (a,b) =>a.telephone > b.telephone;
                 break;
        }
        tempVisitorsArray.sort((a,b)=>{
            if(moreCondition(a,b)) return 1;
            if(lessCondition(a,b)) return -1;
         return 0;
        });
     }
    $table.empty();
    tempVisitorsArray.forEach(element => {
        $table.append(`
        <tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.telephone}</td>
            <td><img id = "${element.id}" class = "edit" src = "../Images/edit.png"></td>
        </tr>`);
    });
    $('.edit').click(edit);
}

function edit(event)
{
    let element = Visitors.find((item)=> item.id == event.target.id);
    editWindow(element);
}

function editWindow(obj)
{
    let winName;
    if(obj)
    {
       setWindowData(obj);
       winName ='Edit visitor';
    }
    else
    {
       editableVisitor = null;
       $(':input','.edit-window').val('');
       winName ='New visitor';
    }
    openWindow(winName);
}

function setWindowData(obj)
{
    editableVisitor = obj;
    $nameInput.val(obj.name);
    $phoneInput.val(obj.telephone);
}

setDataToTable();







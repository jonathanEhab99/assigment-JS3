var bookmarksNameInp = document.getElementById("bookmarksNameInp");
var bookmarksUrlInp = document.getElementById("bookmarksUrlInp");
var dataControl = document.getElementById("dataControl");
var validationMsg = document.getElementById("valid");

var box ;
var IUpdate;
if (localStorage.getItem("books") != null) {
  box = JSON.parse(localStorage.getItem("books"));
  displayData(box);
} else {
  var box = [];
}
function setDis(nameKey = "", data = []) {
  localStorage.setItem(nameKey, JSON.stringify(data));
  displayData(data);
}

function addData() {
  var bookMark = {
    name: bookmarksNameInp.value,
    mail: bookmarksUrlInp.value,
  };
  if (
    validationName(bookmarksNameInp) &&
    validationMail(bookmarksUrlInp)
  ) {
   
    if (dataControl.innerHTML === "Send") {
      box.push(bookMark);
      setDis("books", box);

    } else {
      box.splice(IUpdate, 1, bookMark);
      setDis("books", box);
    }
      clearValid();
      clearForm();
  } else {
    validationMsg.innerHTML = `
    <p class="text-danger lh-1">
    please follow the rule
    * name must start with capital ch and between 3-10 ch and has no space
    *url starts with www. or https:\\ , ends with .domain and has no space 
    </p>
    
    `

  }
  dataControl.innerHTML = "Send";
}

function clearValid() {
    bookmarksNameInp.classList.remove('is-valid','is-invalid')
    bookmarksUrlInp.classList.remove('is-valid','is-invalid')
}
function validationMail(mail) {
  var regX = /^(https:\/\/|www\.)[\w\S]+\.[a-z]{2,5}$/;
    if (regX.test(mail.value)) {

        mail.classList.remove('is-invalid')
        mail.classList.add('is-valid')
    var x = true;
  } else {
      mail.classList.add('is-invalid')
        var x = false;
        
  }

  return x;

}

function validationName(name) {
  var regX = /^[A-Z][a-z0-9\S]{3,15}$/;
    if (regX.test(name.value)) {
      name.classList.remove('is-invalid')
      name.classList.add('is-valid')
        var x = true;
    } else {
        var x = false;
        name.classList.add('is-invalid')
  }
  return x;
}
function clearForm() {
  bookmarksNameInp.value = "";
  bookmarksUrlInp.value = "";
    validationMsg.innerHTML = ``;
    clearValid()
}

function displayData(data) {
  var list = ``;
  for (var i = 0; i < data.length; i++) {
    list += `
<tr>
<td>${i+1}</td>
                <td>${data[i].name}</td>
                <td>
                <a href="${data[i].mail}" target="_blank" class="text-decoration-none text-dark">
                    <button onclick="visitData(${i})" class="btn bg-second btn-sm">
                        <i class="fa-solid fa-eye text-white"></i>
                    </button></a>
                </td>
                <td>
                    <button onclick="deleteRow(${i})" class="btn btn-danger btn-sm">
                    <i class="fa-solid fa-trash-can text-white"></i>
                    </button>
                </td>
                
            </tr>
`;
  }
  document.getElementById("tableList").innerHTML = list;
}

function deleteRow(index) {
  box.splice(index, 1);
    setDis("books", box);
    clearValid()
  validationMsg.innerHTML = ``;

}


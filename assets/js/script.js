const container = document.querySelector(".container");
const notediv = document.querySelectorAll(".container .note");
const fullpage = document.querySelector(".fullpage");

const fullpagenote = document.querySelector("#fullpage-note");
let untitle = 0;
let noteindex = 0;
let untitledata = "";
let notedata = "";

document.addEventListener("DOMContentLoaded", () => {
  resetupuntitle();
  cheakemptynote();
  click();
});
//////////llocal stroge
const notesArray = createlocalstorage("notes");
function createlocalstorage(storagename) {
  return JSON.parse(localStorage.getItem(storagename) || "[]");
}
let id = 0;

///////

fullpage.addEventListener("click", (e) => {
  if (e.target.id === "closebtn") {
    fullpage.style.display = "none";
  } else if (e.target.id === "delete") {
    const untitledata1 =
      e.target.parentNode.offsetParent.children[0].children[0].children[1]
        .value;
    const notedata1 = e.target.parentNode.offsetParent.children[1].value;

    const data = notesArray.filter((item, index) => {
      if (item.Title !== untitledata1 && item.Data !== notedata1) {
        console.log(item);
        return item;
      }
    });
    console.log(data);
    console.log(untitledata === "Untitle" && notedata === "Enter your text");
    if (untitledata === "Untitle" &&notedata === "Enter your text") {
      fullpage.style.display = "none";
    } else {
      confirm('delete this """');
      if (confirm) {
        addstroge(data, "notes");
        resetupuntitle();
        cheakemptynote();
        fullpage.style.display = "none";
      } else {
        e.stopImmediatePropagation();
      }
    }
  } else if (e.target.id === "savebtn") {
    const untitledata1 =
      e.target.parentNode.offsetParent.children[0].children[0].children[1]
        .value;
    const notedata1 = e.target.parentNode.offsetParent.children[1].value;
    console.log(untitledata1);
    console.log(notedata1);
    console.log(notesArray);
    const filterdata = createlocalstorage("notes").filter((value) => {
      console.log(value.Title, untitledata1);
      console.log(value.Title === untitledata1);
      if (value.Title === untitledata1) {
        console.log(value);
        return value;
      }
    });
    console.log(filterdata);
    if (untitledata1 === untitledata && notedata1 === notedata) {
      fullpage.style.display = "none";
    } else if (!filterdata.length) {
      confirm("save changes !!");
      if (confirm) {
        const olddata = notesArray.filter((item) => {
          return item.Title !== untitledata1;
        });
        const newdata = jsonparmatdata(
          Math.floor(Math.random() * 50000),
          untitledata1,
          notedata1,time()
        );
        const pushdata = olddata.concat(newdata);
        addstroge(pushdata, "notes");
        fullpage.style.display = "none";
        resetupuntitle();
        cheakemptynote();
      }
    } else {
      alert("Change Title Name!!!");
    }
  }
  click();
});
function createfullpage(textarea, title) {
  const fullpagehtml = `<div class="first">
    <div class="note">
        <h5>Note Title </h5>
        <input type="text" id="fullpage-untitle" placeholder="untitle-1" value="${title}">
    </div>
    <div class="close">
        <i class="fa-solid fa-upload "  id="savebtn"></i>
        <i class="fa-regular fa-circle-xmark        
            " id="closebtn"></i>
            <i class="fa-solid fa-trash" id="delete"></i>
    </div>
</div>
<textarea name="fullpage-note" id="fullpage-note" class="fullpage-note" cols="10" rows="10">${textarea}</textarea>`;

  fullpage.innerHTML = fullpagehtml;
}

function newuntitlecreate(title, data) {
  container.innerHTML += `<div class="note">
    <div><h5>Note</h5>
    <input type="text" id="untitle" placeholder="untitle-1" value='${
      title ? title : "Untitle"
    }'></div>
    <div class="logotext">
    ${data ? data : "Enter your text"}
    </div>
</div>`;

  click();
}

function jsonparmatdata(id, title, notes, time) {
  return {
    id: id,
    Title: title,
    Data: notes,
    time:  time ,
  };
}

function addstroge(data, storagename) {
  localStorage.removeItem(storagename);
  localStorage.setItem(storagename, JSON.stringify(data));
}

function cheakemptynote() {
  const notes = document.querySelectorAll(".container .note");
  const notedata = notes.length ? notes[notes.length - 1].children[1].textContent:"fghjk"
  // console.log(notedata);
  const title = notes.length ? notes[notes.length - 1].children[0].children[1].value:"sdfghj"
  if (notedata === "" && title === "") {
    return;
  } else {
    newuntitlecreate();
  }
}

function click() {
  const notediv = document.querySelectorAll(".container .note");
  notediv.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      // console.dir(item.children[0].lastChild
      //     .value);
      createfullpage(
        item.children[1].innerText,
        item.children[0].lastChild.value
      );
      fullpage.style.display = "block";
      noteindex = index;
      const fullpageuntitle = document.querySelector("#fullpage-untitle");
      if (fullpageuntitle.value === "") {
        fullpageuntitle.value = `Untitle-${untitle <= 0 ? 1 : untitle}`;
        console.dir(fullpageuntitle);
      } else {
      }
      const textsreadata = document.getElementById("fullpage-note");
      untitledata = fullpageuntitle.value;
      notedata = textsreadata.value;
      ////////
    });
  });
}

function resetupuntitle() {
  container.innerHTML = "";
  const notesArray = JSON.parse(localStorage.getItem("notes") || "[]");
  notesArray.forEach((item, index) => {
    newuntitlecreate(item.Title, item.Data);
  });
  click();
}

///////////search box
const Elementsearchbox = document.getElementById("searchbox");
Elementsearchbox.addEventListener("input", searchbox);
function searchbox(event) {
  const svalue = event.target.value;
  if (!svalue) {
    localStorage.removeItem("searchData");
    console.log("remove");
    resetupuntitle();
  } else {
    const filterdata = notesArray.filter((value) => {
      if (value.Data.includes(svalue) || value.Title.includes(svalue)) {
        return value;
      }
    });
    console.log(filterdata);
    if (filterdata.length) {
      console.log("hihii");
      container.innerHTML = "";
      addstroge(filterdata, "searchData");
      const Storage = createlocalstorage("searchData");
      console.log(Storage);
      Storage.forEach((value) => {
        newuntitlecreate(value.Title, value.Data);
      });
    } else {
      console.log("rerere");
      resetupuntitle();
    }
  }
  cheakemptynote();
  click();
}
localStorage.removeItem("searchData");


function time(){
  return new Date().toLocaleTimeString([], { hour12: true })
}
// console.log(time());


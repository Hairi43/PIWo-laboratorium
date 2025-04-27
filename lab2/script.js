"use strict";

const lastDeleted = [];

// Lists section

const addList = () => {
    const input = document.getElementById("new-list-input");
    const name = input.value.trim();
    if (name === '') {
        return;
    }

    const nameLowercase = name.toLowerCase();
    const exists = document.getElementById(nameLowercase);

    // if list of this name doesn't exist (is null) then 'else' creates one
    if (exists !== null && typeof(exists) !== "undefined") {
        return;
    } else {
        const listSection = document.createElement("section");

        const listTitle = document.createElement("span");
        listTitle.className = "list-title";
        listTitle.textContent = name;

        listSection.id = "section-list-title";
        listSection.appendChild(listTitle);

        const ul = document.createElement("ul");
        ul.id = nameLowercase;
        ul.style.display = "flex";
        listSection.appendChild(ul);

        const lists = document.getElementById("lists");
        lists.appendChild(listSection);

        const newSelectOption = document.createElement("option");
        newSelectOption.value = nameLowercase;
        newSelectOption.textContent = name;
        document.getElementById("available-lists").appendChild(newSelectOption);
    }
    input.value = "";
};


document.getElementById("lists").addEventListener("click", function(e){
    console.log(e.target.nodeName);
    // e.target is the clicked element
	if(e.target && e.target.nodeName === "SPAN") {
        toggleList(e.target.textContent.toLowerCase());
	}
    if(e.target && e.target.className === "task-wrapper") {
        toggleDone(e.target);
	}
    if(e.target && e.target.nodeName === "LI") {
        toggleDone(e.target.parentNode);
	}
    if(e.target && (e.target.className === "date" || e.target.nodeName === "P")) {
        toggleDone(e.target.parentNode.parentNode);
	}

    if (e.target && e.target.className === "btn" && e.target.textContent === "X") {
        console.log(e.target.parentNode);
        showModal(e.target.parentNode);
    }
});


const toggleList = (id) => {
    const list = document.getElementById(id);
    if (list !== null && typeof(list) !== "undefined") {
        if (list.style.display === "flex") {
            list.style.display = "none";
        } else {
            list.style.display = "flex";
        }
    }
}




// Tasks section

const addTask = () => {
    const input = document.getElementById("new-task-input");
    const text = input.value.trim();

    if (text === '') {
        return;
    }

    const select = document.getElementById("available-lists");
    
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    // dataset gets custom data attributes (data-done in this case in html li element)
    // it's for checking if task is crossed out or not
    li.dataset.done = "false";
    li.appendChild(p);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.className = "btn";


    const list = document.getElementById(select.value);

    if (list === "null") {
        return;
    }

    const taskWrapper = document.createElement("section");
    taskWrapper.className = "task-wrapper";
    taskWrapper.appendChild(li);
    taskWrapper.appendChild(closeBtn);

    list.appendChild(taskWrapper);

    input.value = "";
}


const toggleDone = (taskWrapper) => {
    const li = taskWrapper.firstElementChild;
    const isDone = li.dataset.done;
    if (isDone === "true"){
        li.dataset.done = "false";
    } else {
        li.dataset.done = "true";
    }

    if (isDone !== "true") {
        console.log("child", li.nodeName);
        const date = new Date().toLocaleString("pl-PL");
        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` (${date})`;
        dateSpan.className = "date";

        li.firstChild.style = "text-decoration: line-through;";
        li.style = "color: gray;"; 
        li.appendChild(dateSpan);
    } else {
        const dateSpan = li.children[1];
        if (dateSpan) {
            dateSpan.remove();
        }
        li.style = "color: black;";
        li.firstChild.style = "text-decoration: none;";
    }
}



const deleteTask = (taskWrapper) => {
    lastDeleted.push(taskWrapper);
    taskWrapper.style = "display: none;";
    if (lastDeleted && lastDeleted.length > 1) {
        // removes first element from array, so array only stores
        // only one last removed element
        lastDeleted.shift();
    }
};


const showModal = (textWrapper) => {
    // textWrapper.firstChild.firstChild means 
    // => textWrapper.li.p
    const text = textWrapper.firstChild.firstChild.textContent;

    const modal = document.createElement("dialog");
    modal.id = "modal";

    const modalContent = document.createElement("p");
    modalContent.textContent = `Czy na pewno chcesz usunąć zadanie o treści: "${text}"?`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn";
    removeBtn.id = "remove-btn";
    removeBtn.textContent = "Usuń";
    removeBtn.onclick = () => {
        deleteTask(textWrapper);
        modal.remove();
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.className = "btn"
    cancelBtn.textContent = "Anuluj";
    cancelBtn.id = "cancel-btn";
    cancelBtn.onclick = () => modal.remove();

    modal.appendChild(modalContent);
    modal.appendChild(removeBtn);
    modal.appendChild(cancelBtn);

    document.body.appendChild(modal);
    modal.showModal();
};



document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        undoDelete();
    }
});


const undoDelete = () => {
    if (Array.isArray(lastDeleted) && lastDeleted.length !== 0) {
        const removedTask = lastDeleted.pop();
        removedTask.style = "display: flex;";
    }
};


const filterlists = () => {
    const search = document.getElementById('search').value;
    const caseInsensitive = document.getElementById('caseInsensitive').checked;
    const lists = document.querySelectorAll('ul');

    lists.forEach(list => {
        Array.from(list.children).forEach(taskWrapper => {
            const p = taskWrapper.querySelector("p");
            if (typeof(p) === "undefined" || p === null) {
                return;
            }
            
            const text = p.textContent.trim();
            const match = caseInsensitive ? text.toLowerCase().includes(search.toLowerCase()) : text.includes(search);

            taskWrapper.style.display = match ? 'flex' : 'none';
        });
    });
};
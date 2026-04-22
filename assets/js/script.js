// add item

document.querySelectorAll(".add-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let categoryInput = btn.getAttribute("data-input");
        let input = document.getElementById(categoryInput);

        input.showModal();
    });
});

document.querySelectorAll(".submit-item").forEach(btn => {
    btn.addEventListener("click", () => {
        let categoryList = btn.getAttribute("data-category-list");
        let taskInput = btn.getAttribute("data-task")

        let task = document.getElementById(taskInput);
        let list = document.getElementById(categoryList);

        let li = document.createElement("li");
        li.classList.add("item");
        li.draggable = true;
        li.textContent = task.value;
        list.appendChild(li);
        task.value = ""

        let categoryInput = btn.getAttribute("data-input");
        let input = document.getElementById(categoryInput);
        input.close();

        dragAndDropSystem()
    });
});

//remove item

document.querySelector(".remove-item").addEventListener("dragover", dragOverRemove);
document.querySelector(".remove-item").addEventListener("dragleave", dragLeaveRemove);
document.querySelector(".remove-item").addEventListener("drop", dropRemove);

function dragOverRemove(e) {
    e.currentTarget.classList.add("hover");
    e.preventDefault();
}

function dragLeaveRemove(e) {
    e.currentTarget.classList.remove("hover");

}

function dropRemove(e) {
    e.currentTarget.classList.remove("hover");
    let dragItem = document.querySelector(".dragging");
    dragItem.remove();
}

// clear itens
let categoryListToclearId = null;
document.querySelectorAll(".clear-itens-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let confirmWindowId = btn.getAttribute("data-confirm");
        let confirmWindow = document.getElementById(confirmWindowId);
        confirmWindow.showModal();
        categoryListToclearId = btn.getAttribute("data-category-list");
    })
});

document.querySelectorAll(".confirm-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let response = btn.getAttribute("data-response");
        let confirmWindowId = btn.getAttribute("data-confirm");
        let confirmWindow = document.getElementById(confirmWindowId);
        if (response === "false") {
            confirmWindow.close();
            return;
        }
        let listToclear = document.getElementById(categoryListToclearId);
        listToclear.replaceChildren();
        confirmWindow.close();
    });
});

// close windows
document.querySelectorAll(".close-window-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let windowId = btn.getAttribute("data-close");
        let window = document.getElementById(windowId);
        if (window.querySelector("input")) {
            window.querySelector("input").value = "";
        }
        window.close();
    });
});

// drag and drop
let dragAndDropSystem = () => {

    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragend", dragEnd);
    });

    function dragStart(e) {
        e.currentTarget.classList.add("dragging");
        document.querySelector(".remove-item").style.visibility = "visible";
    }

    function dragEnd(e) {
        e.currentTarget.classList.remove("dragging");
        document.querySelector(".remove-item").style.visibility = "hidden";
    }

    document.querySelectorAll(".area-itens").forEach(area => {
        area.addEventListener("dragover", dragOver);
        area.addEventListener("dragleave", dragLeave);
        area.addEventListener("drop", drop);
    });

    function dragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add("hover");
    }

    function dragLeave(e) {
        e.currentTarget.classList.remove("hover");
    }

    function drop(e) {
        e.currentTarget.classList.remove("hover");
        let dragItem = document.querySelector(".dragging");
        let itemList = e.currentTarget.querySelector("ul");
        itemList.appendChild(dragItem);
    }
}

dragAndDropSystem();
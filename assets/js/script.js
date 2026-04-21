document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});

function dragStart(e) {
    e.currentTarget.classList.add("dragging");
}

function dragEnd(e) {
    e.currentTarget.classList.remove("dragging");
}

document.querySelectorAll(".area-task").forEach(area => {
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
    let taskList = e.currentTarget.querySelector("ul");
    taskList.appendChild(dragItem);
}
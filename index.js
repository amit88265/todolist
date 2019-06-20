let leftTasks = 0, CheckedTask = 0, count = 0, notesCount = 0;

document.getElementById("inpt").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {

        const taskEle = document.createElement("div");
        taskEle.className = "ListofTasks";

        const divWithHr = document.createElement("div");
        divWithHr.className = "divWithHr";

        const parentOfTasks = document.getElementById("task");

        const inptbx = document.getElementById("inpt");
        let newTask = inptbx.value;

        let chkbox = document.createElement("input");
        chkbox.type = "checkbox";
        chkbox.className = "allTaskEle";
        chkbox.id = "tickbox" + notesCount;
        taskEle.appendChild(chkbox);

        let customCheckBox = document.createElement("label");
        customCheckBox.setAttribute("for", "tickbox" + notesCount++);
        customCheckBox.className = "customCBox";
        taskEle.append(customCheckBox);

        let note = document.createElement("p");
        note.className = "allTaskEle";
        note.id = "para";
        note.innerText = newTask;
        note.style.display = "inline";
        taskEle.appendChild(note);

        chkbox.addEventListener('change', function (e) {

            if (chkbox.checked === false) {
                CheckedTask--;
                leftTasks++;
                note.style.textDecoration = 'none';
            } else {
                CheckedTask++;
                if (leftTasks > 0) {
                    leftTasks--;
                }
                note.style.textDecoration = 'line-through';
            }
            if (CheckedTask > 0) {
                document.getElementById("clearbtn").style.display = 'inline';
            }
            else if (CheckedTask === 0) {
                document.getElementById("clearbtn").style.display = 'none';
            }
            document.getElementById("clearbtn").innerText = "Clear Completed [" + CheckedTask + "]";
            let para = document.getElementById("item_left");
            para.innerText = leftTasks + ' items left';
        });

        let btn = document.createElement("button");
        btn.className = "allTaskEle";
        btn.id = "button";
        btn.innerText = 'x';
        taskEle.appendChild(btn);

        let lineHr = document.createElement("hr");
        lineHr.className = "lineHr";

        btn.addEventListener('click', function (e) {

            let checkOrnot = Array.from(document.getElementsByClassName("divWithHr"));
            for (let i = 0; i < checkOrnot.length; i++) {
                if (checkOrnot[i].firstChild.firstChild.checked === false) {
                    if (leftTasks > 0) {
                        leftTasks--;
                    }
                    break;
                }
            }

            divWithHr.remove();
            let para = document.getElementById("item_left");
            para.innerText = leftTasks + ' items left';

            if (leftTasks <= 0) {
                document.getElementById("stack").style.display = 'none';
            }
        });




        divWithHr.appendChild(taskEle);
        divWithHr.appendChild(lineHr);
        parentOfTasks.appendChild(divWithHr);


        document.getElementById("stack").style.display = '';



        leftTasks++;

        inptbx.value = '';

        let para = document.getElementById("item_left");
        para.innerText = leftTasks + ' items left';
    }

});

document.getElementById("allbtn").addEventListener("click", function (e) {
    let checkOrnot = Array.from(document.getElementsByClassName("divWithHr"));
    let i = 0;
    while (i < checkOrnot.length) {
        checkOrnot[i].style.display = '';

        i++;
    }

});

document.getElementById("activebtn").addEventListener("click", function (e) {
    let checkOrnot = Array.from(document.getElementsByClassName("divWithHr"));
    let i = 0;
    while (i < checkOrnot.length) {
        if (checkOrnot[i].firstChild.firstChild.checked === true) {
            checkOrnot[i].style.display = 'none';
        }
        else {
            checkOrnot[i].style.display = '';
        }
        i++;
    }

});
document.getElementById("completedbtn").addEventListener("click", function (e) {
    let checkOrnot = Array.from(document.getElementsByClassName("divWithHr"));
    let i = 0;
    while (i < checkOrnot.length) {
        if (checkOrnot[i].firstChild.firstChild.checked === false) {
            checkOrnot[i].style.display = 'none';
        }
        else {
            checkOrnot[i].style.display = '';
        }
        i++;
    }

});
document.getElementById("clearbtn").addEventListener("click", function (e) {
    let checkOrnot = Array.from(document.getElementsByClassName("divWithHr"));
    let i = 0;
    while (i < checkOrnot.length) {
        if (checkOrnot[i].firstChild.firstChild.checked === true) {
            CheckedTask--;
            checkOrnot[i].remove();
        }
        i++;
    }

    document.getElementById("clearbtn").style.display = 'none';
    if (leftTasks <= 0) {
        document.getElementById("stack").style.display = 'none';
    }

    let para = document.getElementById("item_left");
    para.innerText = leftTasks + ' items left';

    document.getElementById("clearbtn").innerText = "Clear Completed [" + CheckedTask + "]";

});

document.getElementById("arrow_down").addEventListener('click', function (e) {
    let flag = 0;
    let allNodes = Array.from(document.getElementsByClassName("ListofTasks"));
    allNodes.forEach(element => {
        if (element.firstChild.checked === false) {
            markCheck();
            flag = 1;
        }
    });
    if (flag == 0) {
        unMarkCheck();
    }

});

function unMarkCheck() {
    document.getElementById("clearbtn").style.display = 'none';
    let allNodes = Array.from(document.getElementsByClassName("ListofTasks"));
    allNodes.forEach(element => {
        element.firstChild.checked = false;
        CheckedTask--;
        leftTasks++;
    });
    document.getElementById("clearbtn").innerText = "Clear Completed [" + CheckedTask + "]";
    let para = document.getElementById("item_left");
    para.innerText = leftTasks + ' items left';
}

function markCheck() {
    document.getElementById("clearbtn").style.display = 'inline';
    let allNodes = Array.from(document.getElementsByClassName("ListofTasks"));
    allNodes.forEach(element => {
        if (element.firstChild.checked === false) {
            CheckedTask++;
        }
        element.firstChild.checked = true;


        if (leftTasks > 0) {
            leftTasks--;
        }

    });
    document.getElementById("clearbtn").innerText = "Clear Completed [" + CheckedTask + "]";
    let para = document.getElementById("item_left");
    para.innerText = leftTasks + ' items left';
}
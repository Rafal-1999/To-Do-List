{
    const tasks = [
        {
            content: "Poczytać książkę.",
            done: true,
        },
        {
            content: "Nauczyć się języka JavaScript.",
            done: false,
        }
    ];

    const init = () => {
        const form = document.querySelector(".js-form");
        const newTask = document.querySelector(".js-newTask");
        const firstOption = document.querySelector(".js-firstOption");
        const secondOption = document.querySelector(".js-secondOption");

        form.addEventListener("submit", e => {
            e.preventDefault();
            onFormSubmit(newTask);
        });

        hideAndShowDoneTasks(firstOption);
        completeAllTasks(secondOption);

        render();
    };

    const onFormSubmit = (newTask) => {
        const taskContent = newTask.value.trim();
        // Add a condition when the task already exists
        if (taskContent === "") {
            newTask.focus();
            return;
        } else {
            newTask.value = "";
            newTask.focus();
        }

        addNewTask(taskContent);
    };

    const addNewTask = (taskContent) => {
        tasks.push(
            {
                content: taskContent,
            }
        );

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const renderButtons = () => {
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__tasks-item">
                <button class="list__action-button list__action-button--done js-doneButton">
                    ${task.done ? "<i class=\"icon-check list__icon\"></i>" : ""}
                </button>
                <p class="list__tasks-content${task.done ? " list__tasks-content--done" : ""}">
                    ${task.content}
                </p>
                <button class="list__action-button list__action-button--remove js-removeButton">
                    <i class="icon-trash-empty list__icon"></i>
                </button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const render = () => {
        renderButtons();
        renderTasks();

        bindButtonsOptionsEvents();
        bindTasksOptionsEvents();
    };

    const bindButtonsOptionsEvents = () => {};

    const bindTasksOptionsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");

        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                toggleDoneTask(taskIndex);
            });
        });
    };

    const hideAndShowDoneTasks = (firstOption) => {
        firstOption.addEventListener("click", () => {
            firstOption.innerText = firstOption.innerText === "Ukryj ukończone" ? "Pokaż ukończone" : "Ukryj ukończone";
        });
    };

    const completeAllTasks = (secondOption) => {
        secondOption.addEventListener("click", () => {
        });
    };

    init();
}
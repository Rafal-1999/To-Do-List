{
    let tasks = [
        {
            content: "Poczytać książkę.",
            done: true,
        },
        {
            content: "Nauczyć się języka JavaScript.",
            done: false,
        }
    ];
    let hideDoneTasks = false;

    const init = () => {
        const form = document.querySelector(".js-form");
        const newTask = document.querySelector(".js-newTask");

        form.addEventListener("submit", e => {
            e.preventDefault();
            onFormSubmit(newTask);
        });

        render();
    };

    const onFormSubmit = (newTask) => {
        const taskContent = newTask.value.trim();

        if (taskContent === "") {
            newTask.focus();
            return;
        } else {
            newTask.value = "";
            newTask.focus();
        }

        existTask(taskContent);
    };

    const existTask = (taskContent) => {
        if (tasks.some(({ content }) => content === taskContent)) {
            alert("Podane zadanie jest już na liście.");
            return;
        }

        addNewTask(taskContent);
    };

    const addNewTask = (taskContent) => {
        tasks = [
            ...tasks,
            {
                content: taskContent,
                done: false,
            }
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1)
        ];

        render();
    };

    // To do in the future
    const crossOutSmoothlyDoneTask = () => {};

    const renderButtons = () => {
        const optionsButtons = document.querySelector(".js-optionsButtons");

        if (tasks.length === 0) {
            optionsButtons.innerHTML = "";
        } else {
            optionsButtons.innerHTML = `
            <button class="list__option-button js-firstOption">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="list__option-button js-secondOption" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        }
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__tasks-item${task.done && hideDoneTasks ? " list__tasks-item--done" : ""}">
                <button class="list__action-button list__action-button--done js-doneButton">
                    ${task.done ? "<i class=\"icon-check list__icon\"></i>" : ""}
                </button>
                <p class="list__paragraph">
                    <span class="list__tasks-content${task.done ? " list__tasks-content--done" : ""} js-taskContent">
                        ${task.content}
                    </span>
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

    const bindButtonsOptionsEvents = () => {
        const firstOption = document.querySelector(".js-firstOption");

        if (!firstOption) {
            return;
        }

        firstOption.addEventListener("click", () => {
            hideAndShowDoneTasks();
        });

        const secondOption = document.querySelector(".js-secondOption");

        secondOption.addEventListener("click", () => {
            completeAllTasks();
        });
    };

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

    const hideAndShowDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((tasksList) => ({
            ...tasksList,
            done: true
        }));

        render();
    };

    init();
}
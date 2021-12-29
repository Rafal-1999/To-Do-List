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
        form.addEventListener("submit", e => {
            e.preventDefault();
            onFormSubmit(newTask);
        });
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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            ${task.content}
            </li>
            <button class="js-removeButton">Usuń</button>
            `;
        }
        document.querySelector(".js-taskBlock").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-removeButton");

        // Created function responsible for removing a specific task from array.
        removeButtons.forEach((removeButton, taskIndex) => {
        });
    };

    init();
}
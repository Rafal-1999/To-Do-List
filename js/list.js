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
        const taskBlock = document.querySelector(".js-taskBlock");
        form.addEventListener("submit", e => {
            e.preventDefault();
            onFormSubmit(newTask);
        });
    };

    const onFormSubmit = (newTask) => {
        const taskContent = newTask.value.trim();
        if (taskContent === "") {
            newTask.focus();
            return;
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
            <ul>
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            ${task.content}
            </li>
            </ul>
            `;
        }
        innerHTML = htmlString;
    };

    init();
}
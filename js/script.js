'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //popup
    const modalTrigger = document.querySelector('.popap__open'),
    modal = document.querySelector('.popup'),
    modalContent =document.querySelector('.popap__content'),
    modalCloseBtn = document.querySelector('.popup__close');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; 

    }
    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();

    });
    
    modalCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === document.querySelector('.popup__overlay') && e.target !== modalContent) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
            document.querySelector('.popup__inp-txt').value = '';
        }
    });
    // task add and remove 
    let tasks = [];
    const tasksShell = document.querySelector('.tasks__content-in'),
          formAddTask = document.querySelector('.addTask');
    
    tasks = JSON.parse(localStorage.getItem('tasks'));
    formAddTask.addEventListener('submit', (e) => {
        e.preventDefault();
        let newTask = document.querySelector('.popup__inp-txt').value;

        tasks.push(newTask);
        localStorage.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        createTaskList(tasks, tasksShell);
        closeModal();
        formAddTask.reset();
    }); 
    function createTaskList(tasks, parent ) {
        parent.innerHTML = ''; // clear html code 
        let raw = localStorage.getItem('tasks');
        raw = JSON.parse(raw);
        raw.forEach( (task) => {
            parent.innerHTML += `
            <div class="task">
                <div class="task__txt"><span class="txt">${task}</span></div>
                <div class="task__remove"><i class="far fa-trash-alt"></i></div>
            </div>
            `;
        });
        document.querySelectorAll('.task__remove').forEach((btn, i) => {
            btn.addEventListener('click' , () => {
                btn.parentElement.remove();
                tasks.splice(i, 1); 
                localStorage.clear()
                localStorage.setItem('tasks', JSON.stringify(tasks));

                createTaskList(tasks, tasksShell);
            });
        });
    }
    createTaskList(tasks, tasksShell);
});


      
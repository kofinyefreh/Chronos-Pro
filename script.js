'use strict';

////////////////////////////////////////////////////////////
//  Selectors
const listBtn = document.querySelector('.list-btn');
const taskBtn = document.querySelector('.task-btn');
const modalList = document.querySelector('.add-list-item-modal');
const modalTask = document.querySelector('.add-task-item-modal');
const [overlay1, overlay2] = document.querySelectorAll('.overlay');
const [closeIcon1, closeIcon2] = document.querySelectorAll('.close');
const listInput = document.querySelector('.list--input');
const taskInputTitle = document.querySelector('.task--input--title');
const taskInputDescription = document.querySelector(
  '.task--input--description'
);
const addListBtn = document.querySelector('.add-list-btn');
const addTaskBtn = document.querySelector('.add-task-btn');
const [caution1, caution2, caution3] = document.querySelectorAll('.caution');
const listItem = document.querySelector('.item');
const listCategories = document.querySelector('.categories');
const displayTasks = document.querySelector('.display--tasks');

//////////////////////////////////////////////////////////
//  Global variables
const lists = [
  { 'All Lists': [123] },
  {
    School: [
      {
        task: 'Read',
        taskDescription:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe esse incidunt, error quidem dignissimos vero recusandae pariatur exercitationem! Aliquam dicta nisi reprehenderit ab sit amet harum voluptate consequuntur, mollitia, necessitatibus inventore tenetur praesentium quia eum? Praesentium modi fugit cupiditate ad error doloribus nemo at accusamus, ut nihil recusandae atque?',
        date: Date.now(),
        status: 'none',
        completed: false,
        archived: false,
      },
      {
        task: 'Sweep',
        taskDescription:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe esse incidunt, error quidem dignissimos vero recusandae pariatur exercitationem! Aliquam dicta nisi reprehenderit ab sit amet harum voluptate consequuntur, mollitia, necessitatibus inventore tenetur praesentium quia eum? Praesentium modi fugit cupiditate ad error doloribus nemo at accusamus, ut nihil recusandae atque?',
        date: Date.now(),
        status: 'none',
        completed: false,
        archived: false,
      },
    ],
  },
  {
    Home: [
      {
        task: 'Eat',
        taskDescription:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe esse incidunt, error quidem dignissimos vero recusandae pariatur exercitationem! Aliquam dicta nisi reprehenderit ab sit amet harum voluptate consequuntur, mollitia, necessitatibus inventore tenetur praesentium quia eum? Praesentium modi fugit cupiditate ad error doloribus nemo at accusamus, ut nihil recusandae atque?',
        date: Date.now(),
        status: 'none',
        completed: false,
        archived: false,
      },
    ],
  },
];

let titles;
let clicked = document.querySelector('.item--0');
const none = 'none';

/////////////////////////////////////////////////////////////
// Global Functions

// Add List modal
// list modal close and open functions
const openModal = function (e, modalType, overlayType, inputType) {
  modalType.classList.remove('hidden');
  overlayType.classList.remove('hidden');
  inputType.focus();
};

const closeModal = function (e, modalType, overlayType) {
  modalType.classList.add('hidden');
  overlayType.classList.add('hidden');
};

const keyCloseModal = function (e, modalType, overlayType) {
  if (e.key === 'Escape' && !modalType.classList.contains('hidden')) {
    modalType.classList.add('hidden');
    overlayType.classList.add(hidden);
  }
};

// Capitalize first letters
const capitalize = function (word) {
  if (word.includes(' ')) {
    let newWord = [];
    word.split(' ').map(word => {
      const [first, ...others] = word.toLowerCase().split('');
      const changed = [first.toUpperCase(), ...others].join('');
      newWord.push(changed);
    });
    return newWord.join(' ');
  } else {
    const [first, ...others] = word.toLowerCase().split('');
    const changed = [first.toUpperCase(), ...others].join('');
    return changed;
  }
};

// Check input validity function for lists
const checkTextValid = function (
  e,
  cautionType,
  buttonType,
  beginValue,
  endValue
) {
  const value = e.target.value.trim();
  if (value.length === 0 || value.length > endValue) {
    cautionType.textContent = `Input should be greater than ${beginValue} but not more than ${endValue} characters`;
    cautionType.style.color = 'rgb(255, 107, 107)';
    buttonType.disabled = true;
    buttonType.classList.remove('good');
  } else {
    cautionType.textContent = 'Valid Text';
    cautionType.style.color = 'green';
    buttonType.disabled = false;
    buttonType.classList.add('good');
  }
};

// Check input validity function for lists
const validTask = function (e) {
  const value = e.target.value.trim();
  if (value.length === 0 || value.length > 50) {
    caution2.textContent = `Input should be greater than 1 but not more than 50 characters`;
    caution2.style.color = 'rgb(255, 107, 107)';
    taskInputDescription.disabled = true;
    addTaskBtn.disabled = true;
    addTaskBtn.classList.remove('good');
  } else {
    caution2.textContent = 'Valid Text';
    caution2.style.color = 'green';
    taskInputDescription.disabled = false;
  }
  if (
    taskInputDescription.value.length >= 1 &&
    taskInputDescription.value.length <= 500 &&
    value.length > 0
  ) {
    addTaskBtn.disabled = false;
    addTaskBtn.classList.add('good');
  }
};

// Rendering lists function
const renderlists = function () {
  titles = [];
  lists.forEach((_, index) => {
    titles.push(...Object.keys(lists.at(index)));
  });
  console.log(titles);

  // Create dom elements
  listCategories.innerHTML = '';
  titles.forEach((item, index) => {
    const h3 = document.createElement('h3');
    h3.className = `${
      clicked.textContent === item
        ? `item item--${index} selected`
        : `item item--${index}`
    }`;
    h3.textContent = item;
    listCategories.appendChild(h3);
  });
};

// Render tasks function
const renderTasks = function () {
  const clickedValue = clicked.textContent;

  const found = lists.find(item => Object.keys(item).at(0) === clickedValue);

  displayTasks.innerHTML = '';
  found[clickedValue].forEach(function (item, index) {
    const task = document.createElement('div');
    task.innerHTML = `
    <div class="task--${index}">
            <div class="task">
              <div class="task-title">
                <span><i class="fa-regular fa-circle"></i></span>
                <p>${item.task}</p>
              </div>
              <div class="date"> ${new Date(item.date)} </div>
            </div>
            <div class="task-open">
              <p class="task-description">
                  ${item.taskDescription}
              </p>

              <!-- option buttons -->
              <div class="options">
                <div class="button edit">
                  <i class="fa-regular fa-pen-to-square" title="Edit"></i>
                </div>

                <div class="button archive">
                  <i class="fa-solid fa-box-archive" title="Archive"></i>
                </div>

                <div class="button delete">
                  <i class="fa-solid fa-trash" title="Delete"></i>
                </div>
              </div>
            </div>
          </div>
    `;
    displayTasks.appendChild(task);
  });
};

/////////////////////////////////////////////////////////////
// Modal list event handlers
listBtn.addEventListener('click', function (e) {
  openModal(e, modalList, overlay1, listInput);
});
overlay1.addEventListener('click', function (e) {
  closeModal(e, modalList, overlay1);
});
closeIcon1.addEventListener('click', function (e) {
  closeModal(e, modalList, overlay1);
});
document.addEventListener('keydown', function (e) {
  keyCloseModal(e, modalList, overlay1);
});

// task modal
taskBtn.addEventListener('click', function (e) {
  openModal(e, modalTask, overlay2, taskInputTitle);
});
overlay2.addEventListener('click', function (e) {
  closeModal(e, modalTask, overlay2);
});
closeIcon2.addEventListener('click', function (e) {
  closeModal(e, modalTask, overlay2);
});

document.addEventListener('keydown', function (e) {
  keyCloseModal(e, modalTask, overlay2);
});

renderlists();

// Add List input modal styling and logic
listInput.addEventListener('input', function (e) {
  checkTextValid(e, caution1, addListBtn, 1, 24);
});

// Appending List item into lists Array
addListBtn.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    lists.some(item => Object.keys(item).at(0) === capitalize(listInput.value))
  ) {
    return;
  }

  lists.push({
    [capitalize(listInput.value)]: [],
  });
  console.log(lists);
  listInput.value = '';

  // Reset caution text to default
  checkTextValid(e, caution1, addListBtn, 1, 24);

  // close modal
  closeModal(e, modalList, overlay1);
  renderlists();
  renderTasks();
});

// Seleting list type
listCategories.addEventListener('click', function (e) {
  if (!e.target.classList.contains('item')) return;
  const allLists = document.querySelectorAll('.item');
  [...allLists].forEach(item => item.classList.remove('selected'));
  e.target.classList.add('selected');
  clicked = e.target;
  renderTasks();
});

// Add Task caution text and button events
taskInputTitle.addEventListener('input', validTask);

taskInputDescription.addEventListener('input', function (e) {
  checkTextValid(e, caution3, addTaskBtn, 1, 500);
});

// Add task logic
addTaskBtn.addEventListener('click', function (e) {
  e.preventDefault();

  // Guard clause
  const listType = clicked.textContent;
  if (listType === 'All Lists') return;

  const clickedValue = clicked.textContent;

  const found = lists.find(item => Object.keys(item).at(0) === clickedValue);
  found[clickedValue].unshift({
    task: taskInputTitle.value.trim(),
    taskDescription: taskInputDescription.value.trim(),
    date: Date.now(),
    status: 'none',
    completed: false,
    archived: false,
  });

  taskInputDescription.value = '';
  taskInputTitle.value = '';
  validTask(e);
  closeModal(e, modalTask, overlay2);
  renderTasks();
});

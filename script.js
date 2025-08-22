'use strict';

////////////////////////////////////////////////////////////
//  Selectors
const listBtn = document.querySelector('.list-btn');
const taskBtn = document.querySelector('.task-btn');
const modalList = document.querySelector('.add-list-item-modal');
const modalTask = document.querySelector('.add-task-item-modal');
const overlay1 = document.querySelector('.overlay1');
const overlay2 = document.querySelector('.overlay2');
const closeIcon1 = document.querySelector('.close1');
const closeIcon2 = document.querySelector('.close2');
const listInput = document.querySelector('.list--input');
const taskInputTitle = document.querySelector('.task--input--title');
const taskInputDescription = document.querySelector(
  '.task--input--description'
);
const addListBtn = document.querySelector('.add-list-btn');
const addTaskBtn = document.querySelector('.add-task-btn');
const caution1 = document.querySelector('.caution1');
const caution2 = document.querySelector('.caution2');
const caution3 = document.querySelector('.caution3');
const listItem = document.querySelector('.item');
const listCategories = document.querySelector('.categories');

//////////////////////////////////////////////////////////
//  Global variables
const lists = [
  { 'All Lists': [] },
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
    ],
  },
  {
    Home: [
      {
        task: 'Read',
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

// Categories clicked state
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

// Check input validity function
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

// Rendering lists on the UI

const renderlists = function () {
  const titles = [];
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
renderlists();

// Add List input modal styling and logic
listInput.addEventListener('input', function (e) {
  checkTextValid(e, caution1, addListBtn, 1, 18);
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
    [capitalize(listInput.value)]: [
      {
        task: 'Read',
        taskDescription:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium saepe esse incidunt, error quidem',
        date: Date.now(),
        status: 'none',
        completed: false,
        archived: false,
      },
    ],
  });
  console.log(lists);
  listInput.value = '';

  // Reset caution text to default
  checkTextValid(e, caution1, addListBtn, 1, 18);

  // close modal
  closeModal(e, modalList, overlay1);
  renderlists();
});

// Seleting list type
listCategories.addEventListener('click', function (e) {
  const allLists = document.querySelectorAll('.item');
  [...allLists].forEach(item => item.classList.remove('selected'));
  e.target.classList.add('selected');
  clicked = e.target;
});

// Add Task caution text and button events
taskInputTitle.addEventListener('input', function (e) {
  const value = e.target.value.trim();
  if (value.length === 0 || value.length > 50) {
    caution2.textContent = `Input should be greater than ${1} but not more than ${50} characters`;
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
    taskInputDescription.value.length <= 300 &&
    value.length > 0
  ) {
    addTaskBtn.disabled = false;
    addTaskBtn.classList.add('good');
  }
});

taskInputDescription.addEventListener('input', function (e) {
  checkTextValid(e, caution3, addTaskBtn, 1, 18);
});

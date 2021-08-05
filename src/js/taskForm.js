import getLevels from '../tamplates/tasks/levels.hbs';
import getUsers from '../tamplates/tasks/users.hbs';
import getTasksMarkup from '../tamplates/tasks/item.hbs';
import { v4 as uuidv4 } from 'uuid';
import { data } from './data';
import { persister } from './persistor';

const refs = {
  taskForm: document.forms.taskForm,
  name: document.forms.taskForm.elements.name,
  level: document.forms.taskForm.elements.level,
  user: document.forms.taskForm.elements.user,
  taskList: document.querySelector('.taskList'),
};

const users = persister.getStorage('users');

if (users.length) {
  persister.getStorage('tasks');
} else {
  data.tasks.items = [];
  persister.setStorage('tasks');
}
refs.level.innerHTML = getLevels(data.tasks.levels);
refs.user.innerHTML = getUsers(data.users.items);
refs.taskList.innerHTML = getTasksMarkup(data.tasks.items);

export const createUsersOptions = () => {
  refs.user.innerHTML = getUsers(data.users.items);
  if (data.users.items.length) {
    data.tasks.task.user = data.users.items[0].userEmail;
    data.tasks.task.level = data.tasks.levels[0];
  }
};

createUsersOptions();

const onHandleChange = e => {
  const { name, value } = e.target;
  data.tasks.task[name] = value;
};

const onHandleSubmit = e => {
  e.preventDefault();
  if (!data.users.items.length) {
    alert('no users, no tasks!!');
    return;
  }
  data.tasks.items = [...data.tasks.items, { ...data.tasks.task, id: uuidv4() }];
  data.tasks.task.name = '';
  data.tasks.task.level = data.tasks.levels[0];
  data.tasks.task.user = data.users.items[0].userEmail;
  refs.taskForm.reset();
  refs.taskList.innerHTML = getTasksMarkup(data.tasks.items);
  persister.setStorage('tasks');
};

const onHandleClick = e => {
  if (e.target?.dataset?.button !== 'taskDeleteButton') {
    return;
  }
  data.tasks.items = data.tasks.items.filter(task => task.id !== e.target.id);
  refs.taskList.innerHTML = getTasksMarkup(data.tasks.items);
  persister.setStorage('tasks');
};

refs.taskForm.addEventListener('input', onHandleChange);
refs.taskForm.addEventListener('submit', onHandleSubmit);
refs.taskList.addEventListener('click', onHandleClick);

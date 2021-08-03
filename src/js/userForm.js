import { data } from './data';
import { v4 as uuidv4 } from 'uuid';
import template from '../tamplates/users/item.hbs';

const refs = {
  userForm: document.forms.userForm,
  name: document.forms.userForm.elements.usersName,
  email: document.forms.userForm.elements.usersEmail,
  usersList: document.querySelector('.usersList'),
};

const onHandleChange = e => {
  const { name, value } = e.target;
  data.users.user[name] = value;
};

const onHandleSubmit = e => {
  e.preventDefault();
  data.users.items = [...data.users.items, { ...data.users.user, id: uuidv4() }];
  data.users.user.userName = '';
  data.users.user.userEmail = '';
  refs.userForm.reset();
  refs.usersList.innerHTML = template(data.users.items);
};
const onHandleDelete = e => {
  if (e.target?.dataset?.button !== 'userDeleteButton') {
    return;
  }
  data.users.items = data.users.items.filter(user => user.id !== e.target.id);
  refs.usersList.innerHTML = template(data.users.items);
};

refs.userForm.addEventListener('input', onHandleChange);
refs.userForm.addEventListener('submit', onHandleSubmit);
refs.usersList.addEventListener('click', onHandleDelete);

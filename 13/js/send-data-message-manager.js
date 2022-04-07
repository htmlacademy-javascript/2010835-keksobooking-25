import { isEscapeKey } from './util.js';

const body = document.querySelector('body');

const successMessageTemplate = document.querySelector('#success').content;
const successMessageBlock = successMessageTemplate.querySelector('.success');

const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageBlock = errorMessageTemplate.querySelector('.error');
const tryAgainButton = errorMessageBlock.querySelector('button');

let _onSuccessMessageRemove = () => {};
let _onErrorMessageRemove = () => {};

const onSuccessScreenEscKeydown = (evt) => {
  if(isEscapeKey(evt)){
    removeSuccessMessage();
  }
};

function onSuccessScreenAreaClick(){
  removeSuccessMessage();
}

function showSuccessMessage(onSuccessMessageRemove){
  _onSuccessMessageRemove = onSuccessMessageRemove;
  body.insertAdjacentElement('beforeend', successMessageBlock);
  body.addEventListener('keydown', onSuccessScreenEscKeydown);
  body.addEventListener('mousedown', onSuccessScreenAreaClick);
}

function removeSuccessMessage(){
  body.removeEventListener('keydown', onSuccessScreenEscKeydown);
  body.removeEventListener('mousedown', onSuccessScreenAreaClick);
  body.removeChild(successMessageBlock);
  _onSuccessMessageRemove();
}

function onErrorScreenAreaClick(){
  removeErrorMessage();
}

function onTryAgainButtonClick(){
  removeErrorMessage();
}

function onErrorScreenEscKeydown(evt){
  if(isEscapeKey(evt)){
    removeErrorMessage();
  }
}

function removeErrorMessage(){
  body.removeChild(errorMessageBlock);
  body.removeEventListener('mousedown', onErrorScreenAreaClick);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('click', onErrorScreenEscKeydown);
  _onErrorMessageRemove();
}

function showErrorMessage(onErrorMessageRemove){
  _onErrorMessageRemove = onErrorMessageRemove;
  body.addEventListener('mousedown', onErrorScreenAreaClick);
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('keydown', onErrorScreenEscKeydown);
  body.insertAdjacentElement('beforeend', errorMessageBlock);
}


export {showSuccessMessage, showErrorMessage};


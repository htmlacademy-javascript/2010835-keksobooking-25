const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreviewer = document.querySelector('.ad-form-header__preview img');

const housingChooser = document.querySelector('.ad-form__upload input');
const housingPreviewer = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches){
    avatarPreviewer.src = URL.createObjectURL(file);
  }
});

housingChooser.addEventListener('change', () => {
  const file = housingChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches){
    housingPreviewer.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
  }
});


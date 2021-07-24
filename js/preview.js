const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const OFFER_PREVIEW_WIDTH=70;
const OFFER_PREVIEW_HEIGHT=70;

const previewAvatar = document.querySelector('.ad-form-header__preview-photo');
const avatarChooser = document.querySelector('input[name="avatar"]');

const offerPhotoChooser=document.querySelector('input[name="images"]');
const offerPhotoContainer=document.querySelector('.ad-form__photo');
const offerImage=document.createElement('img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


offerPhotoChooser.addEventListener('change', () => {
  const file = offerPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  offerImage.width=OFFER_PREVIEW_WIDTH;
  offerImage.height=OFFER_PREVIEW_HEIGHT;
  offerPhotoContainer.appendChild(offerImage);

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      offerImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});


export {previewAvatar,offerPhotoContainer};

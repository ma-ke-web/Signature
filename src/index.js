import Signature from './signature';

const signature = new Signature({
  el: document.getElementById('canvas'),
  lineWidth: 5
});

const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', function() {
  let dataUrl = signature.saveAsDataUrl();
  console.log(dataUrl);
  let file = signature.saveAsFile();
  console.log(file);
  signature.download();
});

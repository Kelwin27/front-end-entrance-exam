import '../css/style.css';
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';

document.body.addEventListener('click', function (event) {
  const currentEditable = document.querySelector('[contenteditable="true"]');
  if (currentEditable && currentEditable !== event.target) {
    currentEditable.removeAttribute('contenteditable');
    localStorage.setItem(
      currentEditable.className,
      currentEditable.textContent
    );
  }

  if (event.target.classList.contains('edit')) {
    event.target.setAttribute('contenteditable', 'true');
    event.target.focus();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.edit').forEach(function (editable) {
    const savedContent = localStorage.getItem(editable.className);
    if (savedContent) {
      editable.textContent = savedContent;
    }
  });
});

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
    addRippleEffect(event, () => {
      event.target.setAttribute('contenteditable', 'true');
      event.target.focus();
    });
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

function addRippleEffect(event, callback) {
  const target = event.target;
  if (!target.classList.contains('edit')) return;

  const ripple = document.createElement('span');
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');

  target.appendChild(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
    if (callback) callback();
  });
}

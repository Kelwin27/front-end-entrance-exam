import html2pdf from 'html2pdf.js';
import '../css/style.css';

document.body.addEventListener('click', (event) => {
  const currentEditable = document.querySelector('[contenteditable="true"]');
  if (currentEditable && currentEditable !== event.target) {
    currentEditable.removeAttribute('contenteditable');
    const index = currentEditable.dataset.indexNumber;
    localStorage.setItem(
      `${currentEditable.className} ${index ?? ''}`,
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

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main');
  document.addEventListener('click', (event) => {
    const button = document.querySelector('.printBtn');
    if (event.target === button) {
      addRippleEffect(event, () => {
        const element = document.querySelector('.main');

        const opt = {
          margin: 1,
          filename: 'CV.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf().set(opt).from(element).save();
      });
    }
  });

  document.querySelectorAll('.edit').forEach(function (editable) {
    const id = `${editable.className} ${editable.dataset.indexNumber ?? ''}`;
    const savedContent = localStorage.getItem(id);
    if (!savedContent) {
      return;
    }
    if (savedContent !== editable.textContent) {
      editable.textContent = savedContent;
    } else {
      localStorage.removeItem(id);
    }
  });
});

function addRippleEffect(event, callback) {
  const target = event.target;
  if (
    !target.classList.contains('edit') &&
    !target.classList.contains('printBtn')
  )
    return;

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

document.addEventListener('change', (event) => {
	if (!event.target.matches('select')) return;

	event.preventDefault();
  
  let label = event.target.previousElementSibling
  label.style.visibility = 'visible';
}, false);

window.addEventListener('load', (event) => {
  event.preventDefault();
  showSelectLabels();
}, false);

const showSelectLabels = () => {
  let selects = document.getElementsByTagName('select');

  for(select of selects) {
    let label = select.previousElementSibling;
  
    if(select.selectedIndex) label.style.visibility = 'visible';
  }
}
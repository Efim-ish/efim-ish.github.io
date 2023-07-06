const osHeader = document.querySelector('div.os-header');
const osMiddle = document.querySelector('div.os-middle');
const osFooter = document.querySelector('div.os-footer');
const notesIcon = document.getElementById('notes-icon');
const calculatorIcon = document.getElementById('calculator-icon');
const notesApp = document.getElementById('notes-app');
const calculatorApp = document.getElementById('calculator-app');
const noteDate = document.getElementById('note-date');

const d = new Date();
const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
noteDate.textContent = `${month} ${d.getDate()}, ${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;

const dragElement = app => {

	const dragMouseDown = e => {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	const elementDrag = e => {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		moveApp(app, (app.offsetLeft - pos1), (app.offsetTop - pos2));
	}

	const moveApp = (app, newX, newY) => {
		newX = Math.max(0, newX);
		newX = Math.min(osMiddle.offsetWidth - app.offsetWidth, newX);
		newY = Math.max(osHeader.offsetHeight, newY);
		newY = Math.min(osHeader.offsetHeight + osMiddle.offsetHeight - app.offsetHeight, newY);
		app.style.left = newX + "px";
		app.style.top = newY + "px";
	}

	const closeDragElement = () => {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}

	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	const appTitlebar = app.querySelector('div.app-titlebar');
	if (appTitlebar) { // if app has a titlebar, titlebar will move the app
		appTitlebar.onmousedown = dragMouseDown;
	} else { // else, the app will move itself
		app.onmousedown = dragMouseDown;
	}
}

// Make the apps draggable:
const apps = document.querySelectorAll('div.app');
for (const app of apps) {
	dragElement(app);
}

const toggleApp = app => {
	app.classList.toggle('app-hidden');
}

notesIcon.addEventListener('click', () => { toggleApp(notesApp); })
calculatorIcon.addEventListener('click', () => { toggleApp(calculatorApp); })

for (const app of apps) {
	const closeButton = app.querySelector('div.app-titlebar div.traffic-button-close');
	const minimizeButton = app.querySelector('div.app-titlebar div.traffic-button-minimize');
	closeButton.addEventListener('click', () => { toggleApp(app); })
	minimizeButton.addEventListener('click', () => { toggleApp(app); })
}

const RAINBOW_COLORS = ['dodgerblue', 'greenyellow', 'magenta', 'red', 'yellow', 'aqua', 'green', 'orange'];

const canvas = document.querySelector('#canvas');
const sizeSlider = document.querySelector('#size-slider');
const modes = document.querySelector('#modes');
const brushColor = document.querySelector('#brush-color');
const backgroundColor = document.querySelector('#background-color');
const clearBtn = document.querySelector('#clear-btn');
const toggleGrid = document.querySelector('#toggle-grid');

let selectedBrushMode = 'brush';
let selectedBrushColor = 'black';
let selectedBackgroundColor = 'white';
let mouseDown = false;
let gridToggle = true;

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function generateCanvas(size) {
    canvas.style.backgroundColor = selectedBackgroundColor;
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            if (gridToggle) {
                cell.setAttribute('class', 'cell');
            }
            else {
                cell.classList.remove('cell');
            }
            cell.style.cssText = `width: ${canvas.offsetWidth / size}px; height: ${canvas.offsetHeight / size}px`;
            row.appendChild(cell);
            cell.addEventListener('mousedown', onMouseDown);
            cell.addEventListener('mouseup', onMouseUp)
            cell.addEventListener('mouseover', onMouseOver);
        }
        canvas.appendChild(row);
    }    
}

function resetCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
}

function updateCanvasSizeText() {
    const canvasSizeText = document.querySelector('#canvas-size');
    canvasSizeText.textContent = `Canvas Size: ${sizeSlider.value} x ${sizeSlider.value}`;
}

function onMouseDown(event) {
    mouseDown = true;
    if (selectedBrushMode === 'rainbow') {
        selectedBrushColor = RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
    }
    event.target.style.backgroundColor = selectedBrushColor;
}

function onMouseUp() {
    mouseDown = false;
}

function onMouseOver(event) {
    if (mouseDown) {
        event.target.style.backgroundColor = selectedBrushColor;
        if (selectedBrushMode === 'rainbow') {
            selectedBrushColor = RAINBOW_COLORS[Math.floor(Math.random() * RAINBOW_COLORS.length)];
        }
    }
}

function selectBrushMode() {
    let currentActive = modes.querySelector('.active');
    if (currentActive) currentActive.classList.remove('active');

    switch (selectedBrushMode) {
        case 'brush':
            selectedBrushColor = brushColor.value;
            break;
        case 'eraser':
            selectedBrushColor = selectedBackgroundColor;
            break;
    }
}

function preventDragHandler(e) {
    e.preventDefault();
}



toggleGrid.addEventListener('click', () => {
    gridToggle = !gridToggle;
    for (let row of canvas.children) {
        for (let cell of row.children) {
            if (gridToggle) {
                cell.setAttribute('class', 'cell');
            }
            else {
                cell.classList.remove('cell');
            }
        }
    }
});

clearBtn.addEventListener('click', () => {
    resetCanvas();
    generateCanvas(sizeSlider.value);
});

canvas.addEventListener('dragstart', preventDragHandler);

sizeSlider.addEventListener('change', () => {
    resetCanvas();
    generateCanvas(sizeSlider.value);
    updateCanvasSizeText();
});

modes.addEventListener('click', (event) => {
    if (event.target !== modes) {
        selectedBrushMode = event.target.id;
        selectBrushMode();
        event.target.classList.add('active');
    }
});

brushColor.addEventListener('change', () => {
    selectedBrushColor = brushColor.value;
    if (selectedBrushMode === 'brush') {
        selectBrushMode();
    }
});

backgroundColor.addEventListener('change', () => {
    selectedBackgroundColor = backgroundColor.value;
    canvas.style.backgroundColor = selectedBackgroundColor;
});

generateCanvas(sizeSlider.value);

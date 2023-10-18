const canvas = document.querySelector('#canvas');
const sizeSlider = document.querySelector('#size-slider');
const modes = document.querySelector('#modes');
const brushColor = document.querySelector('#brush-color');

let selectedBrushMode = 'brush';
let selectedBrushColor = 'black';
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function generateCanvas(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
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
    event.target.style.backgroundColor = selectedBrushColor;
    console.log(event.target);
}

function onMouseUp() {
    mouseDown = false;
}

function onMouseOver(event) {
    if (mouseDown) {
        event.target.style.backgroundColor = selectedBrushColor;
    }
}

function selectBrushMode() {
    let currentActive = modes.querySelector('.active');
    if (currentActive) currentActive.classList.remove('active');

    switch (selectedBrushMode) {
        case 'rainbow':
            selectedBrushColor = 'pink';
            break;
        case 'eraser':
            selectedBrushColor = 'white';
            break;
        case 'brush':
            selectedBrushColor = brushColor.value;
            break;
    }
}



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

generateCanvas(sizeSlider.value);

sizeSlider.addEventListener('change', () => {
    resetCanvas();
    generateCanvas(sizeSlider.value);
    updateCanvasSizeText();
});

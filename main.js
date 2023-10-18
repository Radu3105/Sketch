const CANVAS_ROW_CELLS = 16;

const canvas = document.querySelector('#canvas');
const sizeSlider = document.querySelector('#size-slider');

function generateCanvas(size) {
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.style.cssText = `width: ${canvas.offsetWidth / size}px; height: ${canvas.offsetHeight / size}px`;
            row.appendChild(cell);
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

generateCanvas(sizeSlider.value);

sizeSlider.addEventListener('change', () => {
    resetCanvas();
    generateCanvas(sizeSlider.value);
    updateCanvasSizeText();
});
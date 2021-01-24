// WRITING
const writeContainer = document.getElementById('write-container');

const writeCanvas = document.createElement('canvas');
const writeContext = writeCanvas.getContext('2d');

let drawingAllowed = false;
let drawLineWidth = 3;

writeCanvas.id = 'write-canvas';
writeCanvas.classList.add('foreground');

writeCanvas.width = writeContainer.offsetWidth;
writeCanvas.height = writeContainer.offsetHeight;
writeContainer.appendChild(writeCanvas);

const position = { x: 0, y: 0 };

document.addEventListener('mousemove', drawByMouse);
document.addEventListener('mousedown', setPositionByMouse);
document.addEventListener('mouseenter', setPositionByMouse);
document.addEventListener('touchmove', draw);
document.addEventListener('touchstart', setPositionByTouch);

function setPositionByTouch(event) {
    position.x = event.touches[0].clientX - writeCanvas.offsetLeft;
    position.y = event.touches[0].clientY - writeCanvas.offsetTop;
}

function setPositionByMouse(event) {
    position.x = event.clientX - writeCanvas.offsetLeft;
    position.y = event.clientY - writeCanvas.offsetTop;
}

function drawByMouse(event) {
    if (event.buttons !== 1) return;
    draw(event, false);
}

function draw(event, byTouch = true) {
    if (!drawingAllowed) return;

    writeContext.beginPath();

    writeContext.lineWidth = drawLineWidth;
    writeContext.lineCap = 'round';
    writeContext.strokeStyle = '#000000';

    writeContext.moveTo(position.x, position.y);
    byTouch ? setPositionByTouch(event) : setPositionByMouse(event);
    writeContext.lineTo(position.x, position.y);

    writeContext.stroke();
}

// TOOLBOX
const toolbox = document.getElementsByClassName('toolbox')[0];
const toolboxButtons = document.getElementsByName('toolbox');

toolboxButtons.forEach(function(button) {
    button.onclick = changeTool;
})

function changeTool(event) {
    const newTool = event.target.value;

    drawingAllowed = newTool !== 'cursor';

    if (drawingAllowed) {
        if (newTool === 'draw') {
            writeContext.globalCompositeOperation = 'source-over';
            drawLineWidth = 3;
        }

        if (newTool === 'erase') {
            writeContext.globalCompositeOperation = 'destination-out';
            drawLineWidth = 15;
        }
    }
}
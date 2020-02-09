const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

INITIAL_COLOR = "#2c2c2c";
ctx.strokeStyle = INITIAL_COLOR;

ctx.linewidth = 2.5;

canvas.width = 700;
canvas.height = 600;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;
}
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function onMouseDown(event) {
    console.log(event);
    painting = true;
}

function onMouseUp(event) {
    stopPainting();
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM() {
    ctx.preventDefault();
}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function handleColorClick(event) {
    console.log(event);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }

}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS[Export]";
    link.click();


}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

console.log(Array.from(colors));

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;

}
if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}
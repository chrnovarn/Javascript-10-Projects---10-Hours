const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const clearBtn = document.getElementById("clear");
const sizeEl = document.getElementById("size");

const colorEl = document.getElementById("color");
const ctx = canvas.getContext('2d');

let size = parseInt(sizeEl.innerText);
let x = undefined;
let y = undefined;
let isPressed = false;
let color =  'black';

canvas.addEventListener("mousedown", (e)=> {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});
canvas.addEventListener("mouseup", (e)=> {
    isPressed = false;
    x = undefined;
    y = undefined;
});
canvas.addEventListener("mousemove", (e) => {

    if(isPressed){
        let x2 = e.offsetX;
        let y2 = e.offsetY;
        drawCircle(x2,y2);
        drawLine(x,y, x2,y2);
        x = x2;
        y = y2;
    }
});

function drawCircle(x,y){
    
    ctx.beginPath();
    ctx.arc(x , y ,size, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawLine(x1,y1, x2,y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineWidth = size*2;
    ctx.strokeStyle = color;
    ctx.stroke();
}
increaseBtn.addEventListener("click", () => {
    
    if(size < 50){
        size += 5;
    }
    updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
    if(size > 5){
        size -= 5;
    }
    updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => {
    color = e.target.value;
})

clearBtn.addEventListener("click", (e) => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

function updateSizeOnScreen(){
    sizeEl.innerText = size;
}
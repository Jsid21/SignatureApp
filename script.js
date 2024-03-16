let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let imgdown = document.querySelector("#downloadimg");
let clr = document.querySelector("#clear");
let color = document.querySelector("#colour");
let theme = document.querySelector("#theme");
let linewidth = document.querySelector("#linewidth");
let dropmenu = document.querySelector("#dropdnw");
let scrn = document.querySelector(".container-fluid");

// Function to adjust canvas size
function adjustCanvasSize() {
    canvas.height = window.innerHeight - 30;
    canvas.width = window.innerWidth - 25;
}

// Function to get touch position relative to canvas
function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Call adjustCanvasSize initially and whenever the window is resized
adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);

let painting = false;

function startposition(e) {
    painting = true;
    if (e.type === 'mousedown') {
        draw(e);
    } else if (e.type === 'touchstart') {
        draw(getTouchPos(canvas, e));
    }
}

function endposition() {
    painting = false;
    ctx.beginPath();
}

function draw(pos) {
    if (!painting) return;
    ctx.lineWidth = linewidth.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = color.value;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

canvas.addEventListener("mousedown", startposition);
canvas.addEventListener("mouseup", endposition);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchstart", startposition);
canvas.addEventListener("touchmove", (e) => {
    draw(getTouchPos(canvas, e));
});
canvas.addEventListener("touchend", endposition);

imgdown.addEventListener("click", () => {
    let img = canvas.toDataURL("image/png");
    console.log(img);
    imgdown.href = img;
});

clr.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

color.addEventListener("change", (e) => {
    ctx.strokeStyle = color.value;
});

let bkTheme = false;
theme.addEventListener("change", () => {
    if (bkTheme === false) {
        bkTheme = true;
        canvas.style.backgroundColor = "black";
        color.value = "#ffffff";
        ctx.strokeStyle = color.value;
    } else if (bkTheme === true) {
        bkTheme = false;
        canvas.style.backgroundColor = "white";
        color.value = "#000000";
        ctx.strokeStyle = color.value;
    }
});

linewidth.addEventListener("change", () => {
    ctx.lineWidth = linewidth.value;
});

let coln = document.getElementsByClassName("col");
console.dir(coln[0]);
let varmenu = document.querySelector("#menu");
console.dir(varmenu);
varmenu.style.position = "absolute";
varmenu.style.top = "25px";
varmenu.style.left = "20px";
varmenu.style.color = "#BFB8AD";

window.addEventListener("load", () => {
    if (window.matchMedia("(max-width: 480px)").matches) {
        dropmenu.style.display = "none";
        coln[0].style.flexDirection = "column";
        varmenu.classList.add("fa-bars");
        popstart();
        let swap = false;

        varmenu.addEventListener("click", () => {
            if (swap === false) {
                dropmenu.style.display = "";
                swap = !swap;
                varmenu.classList.remove("fa-bars");
                varmenu.classList.add("fa-xmark");
            } else if (swap === true) {
                swap = !swap;
                varmenu.classList.add("fa-bars");
                varmenu.classList.remove("fa-xmark");
                dropmenu.style.display = "none";
            }
        });
    } else {
        coln[0].style.flexDirection = "row";
        dropmenu.style.display = "";
        varmenu.style.display = "none";
    }
});

function popstart() {
    let pop = document.createElement("div");
    pop.className = "alert";
    pop.classList.add("alert-success");
    pop.role = "alert";
    pop.innerText = "Click on the Menu button for formatting and download ";
    scrn.appendChild(pop);
    setTimeout(() => {
        pop.remove();
    }, 4000);
}

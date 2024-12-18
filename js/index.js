function toggleContent(id) {
    const content = document.getElementById(`vai-${id}`);
    console.log(content)
    content.classList.toggle('expandido');
}

// 


let mybutton = document.getElementById("seta");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



//

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputCor = document.querySelector(".input__cor");
const ferramentas = document.querySelectorAll(".botao__ferramenta");
const botoesTamanho = document.querySelectorAll(".botao__tamanho");
const botaoLimpar = document.querySelector(".botao__limpar");
const botaoSalvar = document.querySelector(".botao__salvar");

let tamanhoPincel = 20;
let isPainting = false;
let ferramentaAtiva = "brush";

let inicioX = 0;
let inicioY = 0; 


const getMousePos = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
};


inputCor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
    ctx.strokeStyle = target.value; 
});


canvas.addEventListener("mousedown", (event) => {
    const { x, y } = getMousePos(event);
    inicioX = x;
    inicioY = y; 
    isPainting = true;

    if (ferramentaAtiva === "brush") {
        desenhar(x, y);
    }

    if (ferramentaAtiva === "rubber") {
        apagar(x, y);
    }
});


canvas.addEventListener("mousemove", (event) => {
    if (isPainting) {
        const { x, y } = getMousePos(event);

        if (ferramentaAtiva === "brush") {
            desenhar(x, y);
        }

        if (ferramentaAtiva === "rubber") {
            apagar(x, y);
        }
    }
});


canvas.addEventListener("mouseup", (event) => {
    if (isPainting) {
        if (ferramentaAtiva === "square") {
            const { x, y } = getMousePos(event);
            desenharQuadrado(inicioX, inicioY, x, y);
        }
    }
    isPainting = false;
});


const desenharQuadrado = (x1, y1, x2, y2) => {
    const largura = x2 - x1;
    const altura = y2 - y1;

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.rect(x1, y1, largura, altura); 
    ctx.fill();
    ctx.closePath();
};


const apagar = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, tamanhoPincel / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
};


const desenhar = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, tamanhoPincel / 2, 0, 2 * Math.PI);
    ctx.fill();
};


const selecionarFerramenta = ({ target }) => {
    const ferramentaSelecionada = target.closest("button");
    const acao = ferramentaSelecionada.getAttribute("data-action");

    if (acao) {
        ferramentas.forEach((ferramenta) => ferramenta.classList.remove("active"));
        ferramentaSelecionada.classList.add("active");
        ferramentaAtiva = acao;
    }
};


const selecionarTamanho = ({ target }) => {
    const ferramentaSelecionada = target.closest("button");
    const tamanho = ferramentaSelecionada.getAttribute("data-size");

    botoesTamanho.forEach((botao) => botao.classList.remove("active"));
    ferramentaSelecionada.classList.add("active");
    tamanhoPincel = tamanho;
};


botaoLimpar.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


botaoSalvar.addEventListener("click", () => {
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "obra-de-arte-mais-foda-do-mundo.png";
    link.click();
});


ferramentas.forEach((ferramenta) => {
    ferramenta.addEventListener("click", selecionarFerramenta);
});

botoesTamanho.forEach((botao) => {
    botao.addEventListener("click", selecionarTamanho);
});


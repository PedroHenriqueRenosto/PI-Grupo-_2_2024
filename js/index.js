const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputCor = document.querySelector(".input__cor");
const ferramentas = document.querySelectorAll(".botao__ferramenta");
const botoesTamanho = document.querySelectorAll(".botao__tamanho");
const botaoLimpar = document.querySelector(".botao__limpar");

let tamanhoPincel = 20;

let isPainting = false;

let ferramentaAtiva = "brush";

inputCor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
    isPainting = true;

    if (ferramentaAtiva == "brush") {
        desenhar(clientX, clientY);
    }

    if (ferramentaAtiva == "rubber") {
        apagar(clientX, clientY);
    }
});

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    if (isPainting) {
        if (ferramentaAtiva == "brush") {
            desenhar(clientX, clientY);
        }

        if (ferramentaAtiva == "rubber") {
            apagar(clientX, clientY);
        }
    }
});

canvas.addEventListener("mouseup", () => {
    isPainting = false;
});

const desenhar = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        tamanhoPincel / 4,
        0,
        4 * Math.PI
    );
    ctx.fill();
};

const apagar = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        tamanhoPincel / 2,
        0,
        2 * Math.PI
    );
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

ferramentas.forEach((ferramenta) => {
    ferramenta.addEventListener("click", selecionarFerramenta);
});

botoesTamanho.forEach((botao) => {
    botao.addEventListener("click", selecionarTamanho);
});

botaoLimpar.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
 
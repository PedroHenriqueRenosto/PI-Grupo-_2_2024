function toggleContent(index) {
    const content = document.getElementById(`content-${index}`);

    content.classList.toggle('expanded');
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputCor = document.querySelector(".input__cor");
const ferramentas = document.querySelectorAll(".botao__ferramenta");
const botoesTamanho = document.querySelectorAll(".botao__tamanho");
const botaoLimpar = document.querySelector(".botao__limpar");

let tamanhoPincel = 20;

let isPainting = false;

let ferramentaAtiva = "brush";


const getMousePos = (event) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};


inputCor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
});

canvas.addEventListener("mousedown", (event) => {
    isPainting = true;
    const { x, y } = getMousePos(event);

    if (ferramentaAtiva == "brush") {
        desenhar(x, y);
    }

    if (ferramentaAtiva == "rubber") {
        apagar(x, y);
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (isPainting) {
        const { x, y } = getMousePos(event);

        if (ferramentaAtiva == "brush") {
            desenhar(x, y);
        }

        if (ferramentaAtiva == "rubber") {
            apagar(x, y);
        }
    }
});


canvas.addEventListener("mouseup", () => {
    isPainting = false;
});



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

const desenhar = (x, y) => {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, tamanhoPincel / 2, 0, 2 * Math.PI);
    ctx.fill();
};
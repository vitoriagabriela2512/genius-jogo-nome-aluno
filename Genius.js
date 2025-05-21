let sequenciaJogo = [];
let sequenciaJogador = [];
let nivel = 0;
let podeClicar = false;
let recorde = 0;

const botoes = document.querySelectorAll('.btn');
const startBtn = document.getElementById('start');
const nivelTexto = document.getElementById('nivel');
const recordeTexto = document.getElementById('recorde');
const temaBtn = document.getElementById('tema-btn');

const sons = {
  verde: document.getElementById('som-verde'),
  vermelho: document.getElementById('som-vermelho'),
  amarelo: document.getElementById('som-amarelo'),
  azul: document.getElementById('som-azul'),
  erro: document.getElementById('som-erro')
};

startBtn.addEventListener('click', iniciarJogo);

botoes.forEach(btn => {
  btn.addEventListener('click', e => verificarClique(e.target.dataset.cor));
});

temaBtn.addEventListener('click', () => {
  document.body.classList.toggle('modo-claro');
  temaBtn.textContent = document.body.classList.contains('modo-claro')
    ? ' Tema Escuro'
    : ' Tema Claro';
});

function iniciarJogo() {
  sequenciaJogo = [];
  sequenciaJogador = [];
  nivel = 0;
  nivelTexto.textContent = 'Rodada 1';
  gerarProximaCor();
}

function gerarProximaCor() {
  podeClicar = false;
  sequenciaJogador = [];
  nivel++;
  nivelTexto.textContent = `Rodada ${nivel}`;
  const cores = ['verde', 'vermelho', 'amarelo', 'azul'];
  const corAleatoria = cores[Math.floor(Math.random() * 4)];
  sequenciaJogo.push(corAleatoria);
  mostrarSequencia();
}

function mostrarSequencia() {
  let i = 0;
  const intervalo = setInterval(() => {
    const cor = sequenciaJogo[i];
    tocarSom(cor);
    animarBotao(cor);
    i++;
    if (i >= sequenciaJogo.length) {
      clearInterval(intervalo);
      podeClicar = true;
    }
  }, 800);
}

function verificarClique(cor) {
  if (!podeClicar) return;
  sequenciaJogador.push(cor);
  tocarSom(cor);
  animarBotao(cor);
  const pos = sequenciaJogador.length - 1;

  if (sequenciaJogador[pos] !== sequenciaJogo[pos]) {
    somErro();
    atualizarRecorde();
    nivelTexto.textContent = 'Errou! Reiniciando...';
    podeClicar = false;
    setTimeout(iniciarJogo, 2000);
    return;
  }

  if (sequenciaJogador.length === sequenciaJogo.length) {
    setTimeout(gerarProximaCor, 1000);
  }
}

function tocarSom(cor) {
  const som = sons[cor];
  som.pause();
  som.currentTime = 0;
  som.play().catch(e => {
    console.warn("Erro ao tocar som:", e);
  });
}

function somErro() {
  sons.erro.pause();
  sons.erro.currentTime = 0;
  sons.erro.play().catch(e => {
    console.warn("Erro ao tocar som de erro:", e);
  });
}

function animarBotao(cor) {
  const botao = document.querySelector(`.btn.${cor}`);
  botao.classList.add('ativa');
  setTimeout(() => botao.classList.remove('ativa'), 300);
}

function atualizarRecorde() {
  if (nivel > recorde) {
    recorde = nivel;
    recordeTexto.textContent = `Recorde: ${recorde}`;
  }
}

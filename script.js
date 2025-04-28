const ENDPOINT_ACADEMIA = 'https://aplica-o-2-api-bd.vercel.app/alunos';
const ENDPOINT_ALUNOS = 'https://aplica-o-2-api-bd.vercel.app/alunos/lista';

// Usar teclado numérico
function alternarTeclado() {
  const teclado = document.getElementById('teclado');
  teclado.classList.toggle('hidden');
};

// Função para inserir um número
function inserirNumero(num) {
  const input = document.getElementById('cpf');
    if (input.value.length < 11) {
    input.value += num;
    };
};

// Função para limpar cpf
function limparCPF() {
  document.getElementById('cpf').value = '';
};

// Função para remover números digitados errados
function removerUltimoNumero() {
  const input = document.getElementById('cpf');
  input.value = input.value.slice(0, -1);
};

// Função para verificar o cpf
async function verificarCPF() {
  const cpf = document.getElementById('cpf').value.trim();

  if (cpf === "") {
    exibirErro("Por favor, informe seu CPF.");
    return;
  }

  try {
    const respostaHttp = await fetch(`${ENDPOINT_ALUNOS}`);
    if (!respostaHttp.ok) {
      console.error(`Erro ao buscar lista de alunos: ${respostaHttp.status}`);
      exibirErro("Erro ao verificar CPF. Tente novamente mais tarde.");
      return;
    }

    const alunos = await respostaHttp.json();
    const usuario = alunos.find(aluno => aluno.cpf === cpf);

    if (!usuario) {
      exibirErro("CPF não cadastrado. Por favor, procure a administração.");
      return;
    }

    if (usuario.status !== "Ativo") {
      exibirErro("Seu acesso está bloqueado. Por favor, procure a administração.");
      return;
    }

    document.getElementById('tela-login').classList.add('hidden');
    document.getElementById('tela-treino').classList.remove('hidden');

  } catch (error) {
    console.error("Erro ao verificar CPF:", error);
    exibirErro("Erro ao verificar CPF. Tente novamente mais tarde.");
  }
};

// Função para o botão iniciar o treino
function iniciarTreino() {
  document.getElementById('tela-treino').classList.add('hidden');
  document.getElementById('tela-conclusao').classList.remove('hidden');
};

function exibirErro(mensagem) {
  document.getElementById('tela-login').classList.add('hidden');
  document.getElementById('tela-erro').classList.remove('hidden');
  document.getElementById('erro-msg').textContent = mensagem;
}

function voltarLogin() {
  document.getElementById('tela-erro').classList.add('hidden');
  document.getElementById('tela-login').classList.remove('hidden');
  document.getElementById('cpf').value = '';
}

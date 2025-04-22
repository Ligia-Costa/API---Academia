const ENDPOINT_ACADEMIA = 'https://aplica-o-2-api-bd.vercel.app/alunos';
const ENDPOINT_ALUNOS = 'https://aplica-o-2-api-bd.vercel.app/alunos/lista';

// Lista de CPFs autorizados (simulação) - REMOVER ESTA LISTA
// const usuariosAutorizados = [
//   { cpf: "12345678900", pagamento: true },
//   { cpf: "11122233344", pagamento: true },
//   { cpf: "55566677788", pagamento: false } // pagamento pendente
// ];

//Login para o ADM
function mostrarLogin() {
  document.getElementById('tela-adm').classList.remove('hidden');
};

//Função para fechar a tela do ADM
function fecharTelaADM() {
  document.getElementById('tela-adm').classList.add('hidden');
  document.getElementById('senha-adm').value = '';
  document.getElementById('erro-senha').classList.add('hidden');
};

//Função para validar a senha do ADM
function validarSenha() {
  const senha = document.getElementById('senha-adm').value;
  const senhaCorreta = "adm123"; //

  if (senha === senhaCorreta) {
    window.location.href = "adm.html"; // redireciona para página ADM
  } else {
    document.getElementById('erro-senha').classList.remove('hidden');
  };
};

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
    alert("Por favor, informe seu CPF.");
    return;
  }

  try {
    const respostaHttp = await fetch(`${ENDPOINT_ALUNOS}`);
    if (!respostaHttp.ok) {
      console.error(`Erro ao buscar lista de alunos: ${respostaHttp.status}`);
      alert("Erro ao verificar CPF. Tente novamente mais tarde.");
      return;
    }
    const alunos = await respostaHttp.json();

    const usuario = alunos.find(aluno => aluno.cpf === cpf);

    if (!usuario) {
      alert("CPF não cadastrado. Por favor, procure a administração.");
      return;
    }

    if (usuario.status !== "Ativo") {
      alert("Seu acesso está bloqueado. Por favor, procure a administração.");
      return;
    }

    document.getElementById('tela-login').classList.add('hidden');
    document.getElementById('tela-treino').classList.remove('hidden');

  } catch (error) {
    console.error("Erro ao verificar CPF:", error);
    alert("Erro ao verificar CPF. Tente novamente mais tarde.");
  }
};

// Função para o botão iniciar o treino
function iniciarTreino() {
  document.getElementById('tela-treino').classList.add('hidden');
  document.getElementById('tela-conclusao').classList.remove('hidden');
};
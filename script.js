const ENDPOINT_ACADEMIA = 'https://aplica-o-2-api-bd.vercel.app/alunos';
const ENDPOINT_ALUNOS = 'https://aplica-o-2-api-bd.vercel.app/alunos/lista';
let nome = "";

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
    nome = usuario ? usuario.nome : null;

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

    await carregarTreinoAluno(cpf);

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

function imprimirTreino() {
  const conteudoImpressao = document.getElementById('conteudo-impressao').innerHTML;
  const nomeAluno = nome;
  const janelaImpressao = window.open('', '_blank');
  janelaImpressao.document.write(`<!DOCTYPE html>
      <html>
      <head>
          <title>Treino do Dia - Aluno</title>
          <style>
              body {
                  font-family: sans-serif;
                  font-size: 10pt;
                  line-height: 1.2;
              }
              .treino-container {
                  width: 58mm;
                  margin: 0 auto;
              }
              .treino-titulo {
                  text-align: center;
                  font-weight: bold;
                  margin-bottom: 0.5em;
                  font-size: 12pt;
              }
              .treino-grupo {
                  margin-bottom: 0.8em;
              }
              .treino-grupo-titulo {
                  font-weight: bold;
                  margin-bottom: 0.3em;
              }
              .treino-lista {
                  list-style-type: none;
                  padding-left: 0;
              }
              .treino-lista li {
                  margin-bottom: 0.2em;
              }
              .observacoes {
                  margin-top: 1em;
                  font-size: 9pt;
                  font-style: italic;
              }
          </style>
      </head>
      <body>
          <div class="treino-container">
              <div class="treino-titulo">Treino do Dia</div>
              <div class="treino-grupo">
                  <div class="treino-grupo-titulo">Nome: ${nomeAluno}</div>
                  <div class="treino-grupo-titulo">Data: <span id="data-impressao"></span></div>
              </div>
              <div class="treino-grupo">
                  <ul class="treino-lista">
                      ${conteudoImpressao}
                  </ul>
              </div>
              <div class="observacoes">Observações: Realizar os exercícios com atenção e respeitar os limites do seu corpo.</div>
              <div class="observacoes">Atenção: O uso de equipamentos de segurança é obrigatório.</div>
          </div>
          <script>
              document.getElementById('data-impressao').textContent = new Date().toLocaleDateString();
              window.onload = function() {
                  window.print();
                  window.onafterprint = function() {
                      window.close();
                  };
              };
          </script>
      </body>
      </html>
  `);
  janelaImpressao.document.close();
};

// Função para buscar treino do aluno pelo CPF
async function carregarTreinoAluno(cpf) {
  try {
    const respostaAlunos = await fetch(`${ENDPOINT_ALUNOS}`);
    const alunos = await respostaAlunos.json();
    const usuario = alunos.find(aluno => aluno.cpf === cpf);

    if (!usuario) {
      exibirErro('Aluno não encontrado.');
      return;
    }

    const respostaTreinos = await fetch(`https://aplica-o-2-api-bd.vercel.app/alunos/${usuario.id}/treinos`);
    const treinos = await respostaTreinos.json();

    if (!Array.isArray(treinos) || treinos.length === 0) {
      exibirErro('Nenhum treino encontrado para este aluno.');
      return;
    }

    const treinoAtual = treinos[treinos.length - 1]; // Pega o último treino salvo
    preencherTelaTreino(treinoAtual.exercicios);

  } catch (error) {
    console.error('Erro ao carregar treino:', error);
    exibirErro('Erro ao buscar treino.');
  }
};

// Função para preencher treino na tela e para imprimir
function preencherTelaTreino(exercicios) {
  const superiorLista = document.getElementById('lista-superior');
  const inferiorLista = document.getElementById('lista-inferior');
  superiorLista.innerHTML = '';
  inferiorLista.innerHTML = '';

  const printSuperior = document.getElementById('print-superior');
  const printInferior = document.getElementById('print-inferior');
  printSuperior.innerHTML = '';
  printInferior.innerHTML = '';

  exercicios.forEach(exercicio => {
    const item = document.createElement('li');
    item.textContent = `${exercicio.nome} - ${exercicio.quantidade}`;

    const itemPrint = document.createElement('li');
    itemPrint.textContent = `${exercicio.nome} - ${exercicio.quantidade}`;

    if (exercicio.modalidade === 'Superior') {
      superiorLista.appendChild(item);
      printSuperior.appendChild(itemPrint);
    } else if (exercicio.modalidade === 'Inferior') {
      inferiorLista.appendChild(item);
      printInferior.appendChild(itemPrint);
    }
  });
};

// Função para imprimir o treino
function imprimirTreino() {
  const conteudo = document.getElementById('conteudo-impressao').innerHTML;
  const janela = window.open('', '', 'width=800,height=600');
  janela.document.write('<html><head><title>Imprimir Treino</title></head><body>');
  janela.document.write(conteudo);
  janela.document.write('</body></html>');
  janela.document.close();
  janela.print();
};

# 🏋️‍♂️ Sistema de Academia com Autenticação por CPF

Sistema de controle de acesso para academias, com **validação de CPF**, **verificação de matrícula**, e **painel administrativo** para cadastro, edição e exclusão de alunos. Totalmente integrado ao Firebase Firestore, com backend em Flask.

---

## 🚀 Tecnologias Utilizadas

### 👨‍💻 Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide%20Icons-000000?style=for-the-badge&logo=lucide&logoColor=white)]()

### ⚙️ Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

---

## 📁 Estrutura do Projeto

```
📦 projeto/
├── app.py
├── index.html
├── adm.html
├── script.js
├── scriptAdm.js
├── logo.jpg
├── .env
├── requirements.txt
└── README.md
```
---

## 🧪 Funcionalidades

- ✅ Login com CPF
- ✅ Teclado numérico customizado
- ✅ Verificação de matrícula no Firebase
- ✅ Treino do dia
- ✅ Tela de iniciação motivacional
- ✅ Área do Administrador com:
  - Cadastro de alunos
  - Edição e exclusão
  - Listagem com busca dinâmica
---
## 🌍 Teste o Projeto Online  

Você pode testar a aplicação diretamente na Vercel clicando no botão abaixo:  

[![Testar na Vercel](https://img.shields.io/badge/Testar%20na%20Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://api-academia-two.vercel.app/)  

Se o botão não funcionar, copie e cole o seguinte link no seu navegador:  

🔗 **[Acesse o projeto aqui](https://api-academia-two.vercel.app/)**  

---

## 📡 Endpoints da API

| Método | Rota              | Descrição                       |
|--------|-------------------|---------------------------------|
| GET    | `/`               | Teste da API                    |
| GET    | `/alunos`         | Retorna aluno aleatório         |
| GET    | `/alunos/lista`   | Lista todos os alunos           |
| GET    | `/alunos/<id>`    | Busca aluno por ID              |
| POST   | `/alunos/`        | Cadastra novo aluno             |
| PUT    | `/alunos/<id>`    | Atualiza aluno existente        |
| DELETE | `/alunos/<id>`    | Exclui aluno                    |

---

## 💡 Ideias Futuras

- Registro de frequência diário
- Histórico de treinos por aluno
- Notificações por e-mail
- Sistema de renovação automática

---

## 👨‍💻👩🏻‍💻 Projeto desenvolvido por

**Igor Gabriel e Lígia Costa**  
Curso Técnico em Análise e Desenvolvimento de Sistemas - SENAI - 2025

---

## 📄 Licença

Este projeto está sob a licença MIT.
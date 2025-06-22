# Testes de API com Playwright (JavaScript)

Este projeto realiza testes automatizados de **back-end** (API REST) utilizando o [Playwright](https://playwright.dev/) com JavaScript:

- Service Objects (POM adaptado para APIs)
- Massas de dados externas (fixtures JSON)
- Anexos e logs nos relatórios
- Relatórios interativos (HTML e Allure)

---

## 📁 Estrutura do Projeto

```

playwright-api-tests/
├── apis/ # Service Objects com chamadas de API
│ └── productsApi.js
├── fixtures/ # Fixtures e dados de teste
│ ├── customFixtures.js
│ └── productsData.json
├── tests/ # Casos de teste (specs)
│ └── products.spec.js
├── utils/ # Utilitários e anexos de resposta
│ └── attachResponse.js
├── playwright.config.js # Configuração dos testes
├── package.json
└── README.md

```
---

## ⚙️ Requisitos

- Node.js 18 ou superior
- npm
- Java e allure-commandline (caso use Allure Report)

---

## ✅ Como Executar os Testes

### 1. Instalar as dependências:

npm install

npm install allure-playwright

npm install --save-dev allure-commandline

### 2. Rodar testes:

 - Prompts em geral: 

 npx playwright test

- BASH / WSL:

 DEBUG=pw:api npx playwright test


### 3. Gerar relatorios:

- Nativo:

 npx playwright show-report

- Allure (recomendado):

npx allure generate ./allure-results --clean -o ./allure-report

npx allure open ./allure-report

---

## 👨‍💻 Autor

Vinicios Virissimo

---
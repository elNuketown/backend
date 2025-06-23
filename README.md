# Testes de API com JS + Playwright

Este projeto utiliza Playwright + JavaScript para realizar validações de API

---

## 📁 Estrutura do Projeto

```
backend/
├── .github/
│   └── workflows/
│       └── CI.yml
├── apis/
│   └── Api.js
├── fixtures/
│   ├── customFixtures.js
│   └── productsData.json
├── tests/
│   └── api.spec.js
├── utils/
│   └── attachResponse.js
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.js
└── README.md
```
---

## ⚙️ Requisitos

| Item                   | Versão/Requisito                               |
|------------------------|------------------------------------------------|
| Node.js                | 18 LTS ou superior                             |
| Playwright             | ^1.53.1                                        |
| @playwright/test       | ^1.53.1 (recomenda-se `npx playwright test`)   |
| Allure CLI             | ^2.34.0 (`allure-commandline`)                 |
| Allure Playwright      | ^2.2.0                                         |
| Navegadores Playwright | Instalados com: `npx playwright install`       |

---

## ✅ Como Executar os Testes

### 1. Instalação as dependências:

npm install

npm install allure-playwright

npm install --save-dev allure-commandline

### 2. Execução de testes:

npx playwright test


### 3. Geração de relatorios:

- Nativo:

 npx playwright show-report

- Allure (recomendado):

npx allure generate ./allure-results --clean -o ./allure-report

npx allure open ./allure-report

---

## 👨‍💻 Autor

Vinicios Virissimo

---
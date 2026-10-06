# Playwright Test Report

[![Playwright Tests](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml/badge.svg)](https://github.com/PacoMatias89/playwright-test-report/actions/workflows/playwright.yml)
[![Release](https://img.shields.io/github/v/release/PacoMatias89/playwright-test-report)](https://github.com/PacoMatias89/playwright-test-report/releases)
[![License](https://img.shields.io/github/license/PacoMatias89/playwright-test-report)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[English](README.md) | **Español**

Base reutilizable de automatización con Playwright + TypeScript para pruebas end-to-end y API.

El proyecto está pensado para QA Automation Engineers y desarrolladores que quieran una base práctica que puedan clonar, ejecutar, entender y adaptar a sus propias aplicaciones sin introducir complejidad innecesaria en el framework.

El repositorio incluye una pequeña implementación pública de demostración que utiliza la web de Playwright para las pruebas E2E y JSONPlaceholder para las pruebas API. Estos sistemas son solo ejemplos: la infraestructura de automatización está diseñada para sustituirse por el sistema bajo prueba de cada equipo.

## Características

- Playwright Test con TypeScript
- Pruebas end-to-end
- Pruebas API con las fixtures `request` de Playwright
- Ejecución con Chromium, Firefox y WebKit
- Playwright Projects independientes para E2E y API
- Clasificación de tests con `@e2e`, `@api`, `@smoke` y `@regression`
- Configuración multi-entorno mediante `TEST_ENV`
- Soporte dinámico para `.env.<entorno>`
- Custom fixtures E2E con `test.extend()`
- Datos de prueba reutilizables
- Page Object Model
- URLs base independientes para navegador y API
- Ejecución paralela en local
- Ejecución controlada en CI con un worker
- Retries en CI
- Reportes HTML
- Reportes JUnit XML
- Screenshots en caso de fallo
- Conservación de vídeo en caso de fallo
- Trazas de Playwright en caso de fallo
- Comprobación de tipos con TypeScript
- Integración con GitHub Actions
- Reportes y evidencias de fallo publicados como artifacts de CI

## Stack tecnológico

- Node.js
- TypeScript
- Playwright
- Playwright Test
- dotenv
- Git
- GitHub Actions

## Estructura del proyecto

```text
playwright-test-report/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── config/
│   └── environments.ts
│
├── fixtures/
│   └── e2eFixtures.ts
│
├── pages/
│   └── HomePage.ts
│
├── test-data/
│   └── api/
│       └── posts.ts
│
├── tests/
│   ├── api/
│   │   └── health.spec.ts
│   └── e2e/
│       └── navigation.spec.ts
│
├── reports/
│   ├── html/
│   └── junit/
│
├── test-results/
│
├── .env
├── .env.example
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── README.es.md
└── tsconfig.json
```

Los directorios generados, como `reports/` y `test-results/`, están ignorados por Git.

Los archivos locales de entorno como `.env`, `.env.qa`, `.env.staging` u otros perfiles `.env.*` también están ignorados. Los archivos de ejemplo pueden versionarse utilizando `.env.example` o `.env.<entorno>.example`.

## Requisitos

Entorno recomendado:

- Node.js 22+
- npm
- Git

La pipeline de CI utiliza Node.js 22.

Comprueba la instalación:

```bash
node --version
npm --version
git --version
```

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/PacoMatias89/playwright-test-report.git
cd playwright-test-report
```

Instala las dependencias:

```bash
npm ci
```

Instala los navegadores soportados por Playwright:

```bash
npx playwright install chromium firefox webkit
```

En Linux o entornos CI también pueden instalarse las dependencias del sistema:

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Configuración de entornos

El framework soporta un entorno por defecto y perfiles de entorno opcionales.

### Entorno por defecto

Crea `.env` a partir del ejemplo incluido.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Bash:

```bash
cp .env.example .env
```

Ejemplo:

```dotenv
BASE_URL=https://playwright.dev
API_BASE_URL=https://jsonplaceholder.typicode.com
```

### Entornos con nombre

Define `TEST_ENV` para seleccionar dinámicamente un archivo de entorno.

Por ejemplo:

```text
TEST_ENV=qa
        ↓
.env.qa
```

PowerShell:

```powershell
$env:TEST_ENV="qa"
npm test
```

Bash:

```bash
TEST_ENV=qa npm test
```

El framework no impone nombres de entorno. Cada equipo puede utilizar su propia convención:

```text
.env.dev
.env.qa
.env.pre
.env.uat
.env.staging
.env.cliente-a
```

La selección sigue esta regla:

```text
TEST_ENV=<nombre>
        ↓
.env.<nombre>
```

Si `TEST_ENV` no está definido, se utiliza `.env`.

Las variables también pueden inyectarse directamente desde un sistema CI/CD sin necesidad de disponer de un archivo `.env` físico.

### Variables

| Variable       | Propósito                                         |
| -------------- | ------------------------------------------------- |
| `BASE_URL`     | URL base utilizada por los proyectos de navegador |
| `API_BASE_URL` | URL base utilizada por el proyecto API            |
| `TEST_ENV`     | Selector opcional del perfil de entorno           |

Las URLs obligatorias se validan al cargar la configuración de Playwright.

## Playwright Projects

La suite utiliza Playwright Projects independientes para separar lógicamente la ejecución E2E de la ejecución API.

```text
Playwright
│
├── chromium ─┐
├── firefox  ─┼── tests/e2e/**
├── webkit   ─┘
│
└── api ───────── tests/api/**
```

Los proyectos de navegador utilizan `BASE_URL`.

El proyecto API utiliza `API_BASE_URL`.

Así evitamos ejecutar los tests API una vez por cada navegador.

## Clasificación de tests

Los tests se clasifican mediante dos dimensiones independientes.

### Tipo de test

```text
@e2e
@api
```

### Alcance de ejecución

```text
@smoke
@regression
```

Ejemplo:

```text
Test E2E crítico
→ @e2e @smoke @regression

Test API crítico
→ @api @smoke @regression
```

Esto permite mantener los tests organizados por tipo técnico y, al mismo tiempo, ejecutar suites como smoke o regression.

## Ejecución de tests

### Suite completa

```bash
npm test
```

Actualmente ejecuta:

```text
Chromium E2E
Firefox E2E
WebKit E2E
API
```

### Suite E2E

```bash
npm run test:e2e
```

Ejecuta los tests E2E en Chromium, Firefox y WebKit.

### Suite API

```bash
npm run test:api
```

Ejecuta únicamente el proyecto API.

### Suite Smoke

```bash
npm run test:smoke
```

Ejecuta los tests etiquetados con `@smoke`.

### Suite Regression

```bash
npm run test:regression
```

Ejecuta los tests etiquetados con `@regression`.

### Chromium

```bash
npm run test:chromium
```

### Firefox

```bash
npm run test:firefox
```

### WebKit

```bash
npm run test:webkit
```

### Modo headed

```bash
npm run test:headed
```

### Playwright UI Mode

```bash
npm run test:ui
```

### Comprobación TypeScript

```bash
npm run typecheck
```

## Pruebas end-to-end

El ejemplo E2E público utiliza la web de Playwright únicamente como sistema de demostración.

```text
tests/e2e/navigation.spec.ts
        │
        ▼
fixtures/e2eFixtures.ts
        │
        ▼
pages/HomePage.ts
        │
        ▼
Playwright page
        │
        ├── Chromium
        ├── Firefox
        └── WebKit
```

El proyecto utiliza una pequeña capa Page Object Model para mantener selectores e interacciones fuera de los archivos de test.

Los Page Objects E2E pueden proporcionarse mediante custom fixtures.

Ejemplo:

```typescript
async ({ page, homePage }) => {
  await homePage.goto();

  await expect(page).toHaveTitle(/Playwright/);
  await expect(homePage.getStartedLink).toBeVisible();
};
```

Un equipo que adapte el proyecto puede sustituir `HomePage` por sus propios objetos sin modificar el mecanismo de fixtures.

## Custom Fixtures

Las dependencias reutilizables de E2E se definen utilizando el mecanismo nativo `test.extend()` de Playwright.

Ejemplo actual:

```text
Fixtures nativas de Playwright
        │
        └── page
             │
             ▼
       custom fixture
             │
             └── homePage
```

Los tests solicitan únicamente las fixtures que necesitan.

La capa de fixtures se mantiene deliberadamente pequeña y no introduce managers, factories, registries ni abstracciones innecesarias.

## Pruebas API

Los tests API utilizan la fixture nativa `request` de Playwright.

El proyecto API proporciona `API_BASE_URL` como `baseURL`, permitiendo utilizar endpoints relativos:

```typescript
const response = await request.get(`/posts/${existingPost.id}`);
```

Ejemplo público actual:

```text
GET /posts/{id}
        │
        ├── validación del status
        ├── response.ok()
        ├── validación de content-type
        └── validación del response body
```

El endpoint forma parte de la implementación demo. Cada equipo puede sustituirlo por sus propios tests API manteniendo la configuración, reporting, tags, entornos y modelo de ejecución del framework.

## Datos de prueba

Los datos reutilizables de los escenarios viven fuera de los archivos de test.

Estructura actual:

```text
test-data/
└── api/
    └── posts.ts
```

Ejemplo:

```typescript
export const postTestData = {
  existingPost: {
    id: 1,
    userId: 1,
  },
} as const;
```

El objetivo es separar los datos reutilizables del comportamiento del test sin convertir cada literal o assertion en configuración externa.

## Retries y paralelismo

La ejecución local prioriza feedback rápido:

```text
retries = 0
workers = valor por defecto de Playwright
```

La ejecución CI prioriza predictibilidad:

```text
retries = 2
workers = 1
```

La configuración utiliza:

```typescript
fullyParallel: false,
retries: process.env.CI ? 2 : 0,
workers: process.env.CI ? 1 : undefined,
```

Los retries están desactivados en local para que los fallos sean visibles inmediatamente durante el desarrollo.

La ejecución completamente paralela dentro de un mismo archivo de tests tampoco está activada por defecto.

## Reporte HTML

Playwright genera un reporte HTML después de la ejecución.

Ubicación:

```text
reports/html/
```

Para abrirlo:

```bash
npm run report:html
```

El reporte incluye información como:

- tests ejecutados
- tests correctos, fallidos y omitidos
- duración
- proyecto/navegador de Playwright
- información del fallo
- evidencias asociadas

## Reporte JUnit XML

Se genera un reporte compatible con JUnit en:

```text
reports/junit/results.xml
```

La salida JUnit puede ser consumida por herramientas CI/CD y reporting como Jenkins, integraciones de GitHub Actions, GitLab CI, Azure DevOps y otros sistemas compatibles con JUnit.

## Evidencias de fallo

Playwright conserva evidencias de depuración cuando un test falla.

### Screenshot

Se capturan screenshots únicamente cuando falla un test.

### Vídeo

Los vídeos se conservan únicamente para tests fallidos.

### Trace

Las trazas se conservan para tests fallidos y pueden abrirse con Playwright Trace Viewer:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer permite inspeccionar:

- acciones ejecutadas
- locators
- snapshots del DOM
- tiempos
- actividad de red
- estado del navegador

## Integración continua

El repositorio incluye:

```text
.github/workflows/playwright.yml
```

El workflow se ejecuta con:

- push a `main`
- pull request hacia `main`
- ejecución manual mediante `workflow_dispatch`

La pipeline realiza:

```text
Checkout del repositorio
        ↓
Node.js 22
        ↓
npm ci
        ↓
Comprobación TypeScript
        ↓
Instalación Chromium + Firefox + WebKit
        ↓
Ejecución de la suite completa
        ↓
Publicación de reportes y evidencias
```

CI utiliza:

```text
workers = 1
retries = 2
```

La rama `develop` se utiliza para desarrollo y validación local. La rama estable `main` representa el código publicado y activa el workflow de CI de release.

## Artifacts de CI

GitHub Actions publica las evidencias generadas siempre que el workflow no sea cancelado.

Incluyen:

```text
reports/html/
reports/junit/
test-results/
```

Según el resultado de la ejecución, pueden contener:

- reportes HTML
- JUnit XML
- screenshots
- vídeos
- trazas
- contexto de error generado por Playwright

## Comandos disponibles

| Comando                   | Descripción                                     |
| ------------------------- | ----------------------------------------------- |
| `npm test`                | Ejecuta la suite completa                       |
| `npm run test:e2e`        | Ejecuta E2E en todos los navegadores soportados |
| `npm run test:api`        | Ejecuta los tests API                           |
| `npm run test:smoke`      | Ejecuta tests con`@smoke`                       |
| `npm run test:regression` | Ejecuta tests con`@regression`                  |
| `npm run test:chromium`   | Ejecuta los tests E2E en Chromium               |
| `npm run test:firefox`    | Ejecuta los tests E2E en Firefox                |
| `npm run test:webkit`     | Ejecuta los tests E2E en WebKit                 |
| `npm run test:headed`     | Ejecuta los tests con navegador visible         |
| `npm run test:ui`         | Abre Playwright UI Mode                         |
| `npm run typecheck`       | Ejecuta la comprobación de tipos TypeScript     |
| `npm run report:html`     | Abre el reporte HTML generado                   |

## Utilizar el framework con tu proyecto

El repositorio incluye tests demo para que una copia limpia pueda ejecutarse inmediatamente.

Para adaptarlo a otro sistema:

1. Configura tus propias `BASE_URL` y `API_BASE_URL`.
2. Crea los perfiles de entorno que necesite tu equipo.
3. Sustituye o amplía los Page Objects demo.
4. Sustituye o amplía los tests E2E demo.
5. Sustituye o amplía los tests API demo.
6. Añade tus propios datos de prueba.
7. Reutiliza Projects, tags, fixtures, reporting, estrategia de retries e integración CI existentes.

La infraestructura debe permanecer independiente del sistema concreto bajo prueba.

## Principios de arquitectura

El proyecto busca deliberadamente una arquitectura pequeña:

```text
Tests
  │
  ├── Test Data
  ├── Fixtures
  ├── Page Objects
  └── Configuration
          │
          ▼
      Playwright
```

Los principios principales son:

- mantenibilidad
- claridad
- reutilización
- incorporación sencilla de nuevos usuarios
- priorizar funcionalidades nativas de Playwright frente a abstracciones propias
- separar la infraestructura reusable de la implementación demo
- no introducir una capa arquitectónica sin una necesidad práctica

## Estrategia de releases

`main` representa la última versión pública estable.

`develop` contiene el trabajo de la siguiente versión.

Los cambios se validan en `develop` y se publican en `main` como un cambio de release limpio una vez completada la versión.

## Roadmap

### v1.0.0 — Foundation

- base Playwright + TypeScript
- testing E2E
- testing API
- Page Object Model
- configuración de entorno
- reporting
- evidencias de fallo
- GitHub Actions

### v1.1.0 — Framework Foundations

- clasificación de tests
- suites smoke y regression
- Playwright Projects
- Chromium, Firefox y WebKit
- proyecto API independiente
- soporte multi-entorno
- custom fixtures reutilizables
- datos de prueba reutilizables
- retries
- ejecución paralela controlada

### v1.2.0 — Real-world QA Patterns

Áreas previstas:

- autenticación reutilizable
- `storageState`
- API clients
- validación de schemas
- parametrización de tests
- interceptación de red
- mocks

### v1.3.0 — CI/CD & Developer Experience

Áreas previstas:

- integración con Jenkins
- pipelines Jenkins parametrizados
- integraciones CI/CD adicionales cuando aporten valor
- Docker
- tooling para developers
- exploración de CLI y scaffolding

### v2.0.0 — Reporting

Áreas previstas:

- reporting propio
- modelo de resultados más rico
- exploración de dashboard

El roadmap puede evolucionar a medida que aparezcan necesidades reales.

## Contribuir

Puedes utilizar issues y pull requests para proponer mejoras, correcciones o nuevas capacidades de testing.

Los cambios deberían mantener el proyecto práctico, comprensible y próximo a los conceptos nativos de Playwright.

## Licencia

Este proyecto está licenciado bajo MIT. Consulta [LICENSE](LICENSE) para más información.

---

Construido como una base práctica de automatización Playwright para QA engineers y developers.

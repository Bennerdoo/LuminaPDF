<p align="center">
  <img src="https://raw.githubusercontent.com/Bennerdoo/docmaster/main/docs/lumina.png" width="120" alt="Lumina PDF Logo">
</p>

<h1 align="center">Lumina PDF</h1>
<p align="center">
  <strong>The Ultimate Privacy-First, Open-Core PDF Management and Automation Platform</strong>
</p>

<p align="center">
  <a href="https://github.com/Bennerdoo/docmaster">
    <img src="https://img.shields.io/github/stars/Bennerdoo/docmaster?style=for-the-badge&color=8A2BE2&logo=github" alt="GitHub stars">
  </a>
  <a href="https://github.com/Bennerdoo/docmaster/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Bennerdoo/docmaster?style=for-the-badge&color=00c6ff" alt="License">
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge&color=39ff14" alt="PRs Welcome">
</p>

<hr />

Lumina PDF is a premium, enterprise-grade, open-core PDF platform designed for complete data sovereignty and seamless document workflow orchestration. Run it as a highly responsive **cross-platform desktop application**, access it in the browser as a **stateful modern React SPA**, or deploy it on on-premise infrastructure as a **highly scalable containerized service** with an extensive private REST API.

Unlike cloud-based services, Lumina PDF performs document processing **100% locally** or within your controlled infrastructure. There are no tracking scripts, no external analytics, and no remote document uploads.

---

## 🌟 Key Capabilities

### 🖥️ Everywhere You Work
*   **Desktop App (Tauri + Rust)**: Completely local, lightning-fast native experience with system JRE bundling, low memory footprints, and native PDF file association.
*   **Modern Web UI**: A stunning, stateful React 18 Single Page Application styled with Mantine UI and TailwindCSS, boasting a rich dark mode, sleek micro-animations, and fluid transitions.
*   **Server Deployments**: Optimized Spring Boot container images running on Java 21+ (Java 25 recommended), fully ready for deployment on GCP, AWS, Azure, or bare-metal Kubernetes.

### 🛠️ Stateful Multi-Tool Workflows
*   **Chain Operations**: Upload a PDF once and seamlessly pass it between tools (e.g., *Split ➔ OCR ➔ Compress ➔ Sign*) without losing context or reloading documents.
*   **100GB+ Document Handling**: Engineered with advanced memory management, client-side IndexedDB caching, Web Worker thumbnails, and explicit memory resource release to process massive PDF workloads in the browser without crashes.

### 🤖 Intelligent AI Engine
*   **AI reasoning service**: Built with FastAPI, Pydantic, and `pydantic-ai` to plan, reason, and interpret complex document tasks securely and locally.
*   **Structured Outputs**: Native support for LLM-driven structured extraction, document understanding, and delegate tool orchestration.

### 🔒 Enterprise Security & Compliance
*   **Security Mode**: Enabled via `DOCKER_ENABLE_SECURITY=true`. Features multi-tenant logins, role-based access controls (RBAC), secure auditing logs, and single sign-on (SSO).
*   **Data Sovereignty**: Built from the ground up for strict data protection compliance, fully air-gapped environment compatible.

---

## 🗺️ System Architecture

Lumina PDF uses a clean, modern three-tier architecture separating presentation, heavy processing, and logical reasoning:

```mermaid
graph TD
    subgraph Client Layer
        Desktop["Tauri Desktop App (Rust + JRE)"]
        Browser["React 18 SPA (Mantine + Tailwind)"]
    end

    subgraph Service Proxy
        Backend["Spring Boot API Gateway (Java 21/25)"]
    end

    subgraph Core Processing Engines
        PDFBox["Apache PDFBox (Core Operations)"]
        LibreOffice["LibreOffice (Conversions)"]
        qpdf["qpdf (PDF Optimization)"]
        AIEngine["Python AI Engine (FastAPI + Pydantic-AI)"]
    end

    Client Layer -->|REST APIs / JSON| Backend
    Backend --> PDFBox
    Backend --> LibreOffice
    Backend --> qpdf
    Backend -->|Typed Contracts| AIEngine
```

---

## 💼 Over 50+ Specialized PDF Tools

Lumina PDF houses a comprehensive suite of PDF tools, organized into intuitive categories:

| Category | Tools Included |
| :--- | :--- |
| **Page Operations** | Split Pages, Merge Files, Rotate Pages, Reorganize / Reorder, Crop, Delete Pages |
| **Conversion** | PDF to Word, PDF to Excel, PDF to Image, HTML to PDF, Word/Excel to PDF, Markdown to PDF, Image to PDF |
| **Security & Signing** | Digital Signatures, Secure Redaction, Flatten Fields, Encrypt (Add Password), Decrypt (Remove Password) |
| **Quality & Optimization**| Advanced Compression, PDF Repair, Repair Line Art, Flatten Layers, OCR (Optical Character Recognition) |
| **Workflows & Pipelines**| Custom Pipelines, Multi-file Batch Processing, Template Auto-fill, Automated Watermarking |

---

## 🚀 Quick Start (Docker)

Launch the full-featured, local Lumina PDF server with a single command:

```bash
docker run -d -p 8080:8080 --name lumina-pdf ghcr.io/bennerdoo/luminapdf:latest
```

Once running, navigate to `http://localhost:8080` in your web browser.

---

## 🔒 Enabling Security & User Management

To enable enterprise user logins, role-based security, and access logs, deploy using the following **Docker Compose** configuration:

```yaml
version: '3.8'

services:
  lumina-pdf:
    container_name: lumina-pdf-secure
    image: ghcr.io/bennerdoo/luminapdf:latest
    ports:
      - "8080:8080"
    environment:
      - DISABLE_ADDITIONAL_FEATURES=false
      - SECURITY_ENABLELOGIN=true
      - SYSTEM_DEFAULTLOCALE=en-GB
      - UI_APPNAME=Lumina PDF
      - SYSTEM_MAXFILESIZE=100
    volumes:
      - ./lumina/config:/configs:rw
      - ./lumina/logs:/logs:rw
      - ./lumina/tessdata:/usr/share/tessdata:rw
    restart: always
```

---

## 📦 Docker Build Variants

We provide three distinct Docker builds tailored for different environment requirements:

*   **Ultra-Lite (`Dockerfile.ultra-lite`)**: A highly stripped-down image containing only core PDFBox operations. Ideal for resource-constrained setups and microservice architectures.
*   **Standard (`Dockerfile`)**: The recommended image. Contains the Spring Boot core, Mantine frontend, qpdf, and standard system tools.
*   **Fat (`Dockerfile.fat`)**: Includes all of the above, plus pre-downloaded offline models (e.g., Tesseract OCR languages), heavy fonts, LibreOffice, and full offline dependencies for total air-gapped capability.

---

## 💻 Local Development

Lumina PDF uses [Task](https://taskfile.dev/) as a unified command runner. Install Task, then use the following commands to speed up your local development.

### 🛠️ Environment Setup & Quick Start

1.  **Install All Dependencies**:
    ```bash
    task install
    ```
2.  **Launch the Full Stack (Frontend + Backend + AI Engine)**:
    ```bash
    task dev:all
    ```
    *   *Frontend Dev Server*: `http://localhost:5173`
    *   *Backend API*: `http://localhost:8080`
    *   *AI Engine*: `http://localhost:5001`

### 💻 Component-Specific Development

*   **Spring Boot Backend**:
    *   Start in dev mode: `task backend:dev`
    *   Format code: `task backend:format` (Google Java Format)
*   **React Frontend**:
    *   Start Vite: `task frontend:dev`
    *   Install frontend packages: `task frontend:install`
*   **Python AI Engine**:
    *   Start FastAPI engine: `task engine:dev`
    *   Run static analysis & checks: `task engine:check`
*   **Tauri Desktop App**:
    *   Launch desktop developer window: `task desktop:dev`
    *   Build production desktop package: `task desktop:build`

### 🧪 Testing & Quality Gates

Ensure all components are strictly validated before making Pull Requests:

```bash
# Run backend, frontend, and engine tests in parallel
task test

# Full quality gate (Linter + TypeScript validation + Test suite)
task check

# Comprehensive integration test (Builds all Docker variants & executes Cucumber)
./test.sh
```

---

## 🌐 Internationalization (i18n)

Lumina PDF is fully localized into over **40+ languages**. 
*   **Rule**: All translation updates must be made in `en-GB` first (located in `frontend/public/locales/en-GB/translation.toml`).
*   Translations are converted to JSON and loaded dynamically by the React SPA.
*   Refer to the [Language Guide](devGuide/HowToAddNewLanguage.md) for more details.

---

## 🤝 Contributing

We love contributions! Please make sure to read our [Developer Guide](DeveloperGuide.md) and [Contributing Guidelines](CONTRIBUTING.md) before writing code. 

### Key References
*   [Developer Guide](DeveloperGuide.md) — Comprehensive technical overview.
*   [Adding React Tools Guide](ADDING_TOOLS.md) — Step-by-step instructions on implementing new PDF tools.
*   [AI Engine Guidelines](AGENTS.md) — Architecture and style rules for python services.

---

## 📄 License

Lumina PDF is open-core. See the [LICENSE](LICENSE) file for details.

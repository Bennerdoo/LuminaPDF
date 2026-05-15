<p align="center">
  <img src="https://raw.githubusercontent.com/Bennerdoo/docmaster/main/docs/lumina.png" width="80" alt="Lumina PDF logo">
</p>

<h1 align="center">Lumina PDF - The Open-Source PDF Platform</h1>

Lumina PDF is a powerful, open-source PDF editing platform. Run it as a personal desktop app, in the browser, or deploy it on your own servers with a private API. Edit, sign, redact, convert, and automate PDFs without sending documents to external services.

<p align="center">
  <a href="https://github.com/Bennerdoo/docmaster">
    <img src="https://img.shields.io/github/stars/Bennerdoo/docmaster?style=social" alt="GitHub Repo stars">
  </a>
</p>

![Lumina PDF - Dashboard](images/home-light.png)

## Key Capabilities

- **Everywhere you work** - Desktop client, browser UI, and self-hosted server with a private API.
- **50+ PDF tools** - Edit, merge, split, sign, redact, convert, OCR, compress, and more.
- **Automation & workflows** - No-code pipelines direct in UI with APIs to process millions of PDFs.
- **Enterprise‑grade** - SSO, auditing, and flexible on‑prem deployments.
- **Developer platform** - REST APIs available for nearly all tools to integrate into your existing systems.
- **Global UI** - Interface available in 40+ languages.

## Quick Start

```bash
docker run -p 8080:8080 ghcr.io/bennerdoo/luminapdf:latest
```

Then open: http://localhost:8080

## Support

- **Bug Reports**: [Github issues](https://github.com/Bennerdoo/docmaster/issues)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

This project uses [Task](https://taskfile.dev/) as a unified command runner for all build, dev, and test commands. Run `task install` to get started, or see the [Developer Guide](DeveloperGuide.md) for full details.

For adding translations, see the [Translation Guide](devGuide/HowToAddNewLanguage.md).

## License

Lumina PDF is open-core. See [LICENSE](LICENSE) for details.

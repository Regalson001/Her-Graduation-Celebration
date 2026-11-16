# PressSphere — Global Real-Time News Aggregation & Search Engine

![Version](https://img.shields.io/badge/version-1.0.0-0ea5e9.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x%20%7C%2020.x-22c55e.svg)
![Express](https://img.shields.io/badge/Express.js-4.19-slate.svg)
![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20ES6%2B-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)

**PressSphere** is a full-stack, real-time global news search and aggregation platform engineered for speed, security, and editorial clarity. Designed with a modern dark-mode user interface and powered by a lightweight Node.js/Express proxy server, PressSphere enables users to monitor breaking headlines, filter global journalism across seven core verticals, and execute deep keyword searches across thousands of international publications—all without exposing sensitive API credentials on the client side.

---

## Table of Contents

1. [Overview & System Architecture](#overview--system-architecture)
2. [Core Features](#core-features)
3. [Technology Stack](#technology-stack)
4. [Directory & File Structure](#directory--file-structure)
5. [Local Installation & Setup](#local-installation--setup)
6. [Environment Configuration](#environment-configuration)
7. [API Documentation](#api-documentation)
8. [Frontend Architecture & UI Design](#frontend-architecture--ui-design)
9. [Security & Performance Considerations](#security--performance-considerations)
10. [Deployment Guide](#deployment-guide)
11. [Troubleshooting](#troubleshooting)
12. [Roadmap & Future Enhancements](#roadmap--future-enhancements)
13. [Contributing & License](#contributing--license)

---

## Overview & System Architecture

Modern web applications that rely on third-party data providers face a critical vulnerability: embedding API keys directly inside client-side JavaScript exposes credentials to anyone inspecting browser network traffic or source files.

**PressSphere** solves this using a decoupled **Client–Proxy–Provider** architecture:

```text
┌─────────────────────────┐      HTTP GET /api/news      ┌──────────────────────────┐
│   Browser Client        │ ───────────────────────────► │   Express.js Server      │
│  (index.html / app.js)  │ ◄─────────────────────────── │       (server.js)        │
└─────────────────────────┘         JSON Payload         └────────────┬─────────────┘
                                                                      │
                                                       Injects process.env.NEWS_API_KEY
                                                                      │
                                                                      ▼
                                                         ┌──────────────────────────┐
                                                         │     NewsAPI.org v2       │
                                                         │   (External Data Feed)   │
                                                         └──────────────────────────┘

![image](https://github.com/user-attachments/assets/86458e58-dab6-40d8-a541-46b3682b8d27)<h1 align="center">🔫 gh-pr-ai 🔫</h1>
<h2 align="center">AI-Powered GitHub PR Review Assistant</h2>

<p align="center">
    <img alt="hero" width="450" src="https://emoji-route.deno.dev/svg/🔫" />
</p>

> [!NOTE]
> 
> gh-pr-ai is a powerful AI-driven tool that helps developers review GitHub Pull Requests efficiently. It provides detailed code analysis and suggestions in real-time, making the code review process smoother and more effective.

## 🌟 Features

> **gh-pr-ai** comes packed with powerful features:

- **AI-Powered Analysis** – Intelligent code review with detailed suggestions
- **Real-time Processing** – Instant feedback as you review PRs
- **Feature Flag Management** – Flexible control using Flagsmith integration
- **Modern UI** – Clean and responsive interface with typing animation

## 💻 Installation

> Get started with **gh-pr-ai** in minutes:

```bash
# Clone the repository
git clone https://github.com/ArnavK-09/gh-pr-ai.git

# Install dependencies
bun install

# Start the development server
bun run dev
```

## 🚀 Live Demo

> [!TIP]
> Experience gh-pr-ai in action at: [gh-pr-ai.onrender.com](https://gh-pr-ai.onrender.com)

## 🛠️ Tech Stack

### Backend
- **Bun** – Fast all-in-one JavaScript runtime
- **Elysia.js** – Modern and performant web framework
- **SQLite** – Lightweight and reliable database
- **Vercel AI SDK** – Advanced AI integration

### Frontend
- **React** – UI library for interactive components
- **Tailwind CSS** – Utility-first styling framework
- **Marked** – Markdown parsing and rendering

## 🎯 Flagsmith Integration

gh-pr-ai leverages Flagsmith for feature flag management, enabling:

- Dynamic feature toggling
- Environment-specific configurations
- Gradual feature/CONFIG rollouts

The integration is handled in `src/flagsmith.ts`, making it easy to manage feature flags across the application.

### Feature Flags Overview

Below is a comprehensive list of feature flags used in gh-pr-ai:

| Flag Name | Description | Default State | Impact |
|-----------|-------------|---------------|--------|
| `enableAIReview` | Controls AI-powered code review functionality | Enabled | Activates intelligent code analysis and suggestions |
| `useMarkdown` | Toggle Markdown rendering in PR comments | Enabled | Enables rich text formatting in review comments |
| `debugMode` | Enables detailed logging and debugging features | Disabled | Shows additional debugging information for development |
| `experimentalFeatures` | Controls access to experimental features | Disabled | Enables testing of new features before full release |

### Flagsmith Dashboard

> Here's how our feature flags are managed in the Flagsmith dashboard:

| Screenshot |
|------------|
| ![image](https://github.com/user-attachments/assets/9a2943a3-9bd7-4450-a702-88b83351f27d) |
| ![image](https://github.com/user-attachments/assets/e6f9feb7-29fb-41c2-b570-7dd355e2790a) |
| ![image](https://github.com/user-attachments/assets/8318c6c6-0f36-42bd-8c66-2e79e87ae785) |
| ![image](https://github.com/user-attachments/assets/e6e07a43-72ad-4545-aa48-f106b8686b3a) |
| ![image](https://github.com/user-attachments/assets/804fb257-80a6-4c22-b181-a517d29f6634) |

## 📁 Project Structure

```
├── src/                # Backend source files
│   ├── flagsmith.ts    # Flagsmith configuration
│   ├── index.ts        # Main server entry
│   ├── lib/            # Core utilities
│   ├── routers/        # API route handlers
│   └── types.ts        # TypeScript definitions
├── frontend/
│   └── index.html      # Single-file React frontend
└── package.json        # Project dependencies
```

## 💻 Contributing

> [!TIP]  
> We welcome contributions to improve **gh-pr-ai**! If you have suggestions, bug fixes, or new feature ideas, follow these steps:

1. **Fork the Repository**  
   Click the **Fork** button at the top-right of the repo page.

2. **Clone Your Fork**  
   Clone the repo locally:

   ```bash
   git clone https://github.com/ArnavK-09/gh-pr-ai.git
   ```

3. **Create a Branch**  
   Create a new branch for your changes:

   ```bash
   git checkout -b your-feature-branch
   ```

4. **Make Changes**  
   Implement your changes (bug fixes, features, etc.).

5. **Commit and Push**  
   Commit your changes and push the branch:

   ```bash
   git commit -m "feat(scope): description"
   git push origin your-feature-branch
   ```

6. **Open a Pull Request**  
   Open a PR with a detailed description of your changes.

7. **Collaborate and Merge**  
   The maintainers will review your PR, request changes if needed, and merge it once approved.

## 🙋‍♂️ Issues

Found a bug or need help? Please create an issue on the [GitHub repository](https://github.com/ArnavK-09/gh-pr-ai/issues) with a detailed description.

## 👤 Author

<table>
  <tbody>
    <tr>
        <td align="center" valign="top" width="14.28%"><a href="https://github.com/ArnavK-09"><img src="https://github.com/ArnavK-09.png?s=100" width="130px;" alt="Arnav K"/></a><br /><a href="https://github.com/ArnavK-09"><h3><b>Arnav K</b></h3></a></td>
    </tr>
  </tbody>
</table>

---

<h2 align="center">📄 License</h2>

<p align="center">
<strong>gh-pr-ai</strong> is licensed under the <code>MIT</code> License. See the <a href="https://github.com/ArnavK-09/gh-pr-ai/blob/main/LICENSE">LICENSE</a> file for more details.
</p>

---

<p align="center">
    <strong>🌟 If you find this project helpful, please give it a star on GitHub! 🌟</strong>
</p>

# Contributing to Super Developer Dashboard

First off, thank you for considering contributing to the Super Developer Dashboard! It's people like you that make this project better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected to see
- **Include screenshots or animated GIFs** if applicable
- **Specify your environment** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any alternative solutions** you've considered

### Your First Code Contribution

Unsure where to begin? You can start by looking through `beginner` and `good-first-issue` labeled issues:

- **Beginner issues** - issues which should only require a few lines of code
- **Good first issues** - issues which are a bit more involved than beginner issues

## 🚀 Getting Started

1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/super-developer-dashboard.git
   cd super-developer-dashboard
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Process

### Project Structure

```
super-developer-dashboard/
├── app/              # Next.js app directory (routes, layouts)
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
├── public/          # Static assets
├── src/             # Additional source files
├── styles/          # Global styles
└── test/            # Test files
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### Building the Project

```bash
pnpm build
```

## 🔄 Pull Request Process

1. **Ensure your code follows the project's style guidelines**
2. **Update documentation** if you've made changes to the API or functionality
3. **Add or update tests** as necessary
4. **Ensure all tests pass** before submitting
5. **Update the README.md** if needed
6. **Write a clear PR description** explaining:
   - What changes you made
   - Why you made them
   - How to test them
7. **Link related issues** in your PR description (e.g., "Closes #123")
8. **Request review** from maintainers
9. **Address review feedback** promptly

### PR Title Format

Use conventional commit format for PR titles:

- `feat: add new feature`
- `fix: resolve bug in component`
- `docs: update README`
- `style: format code`
- `refactor: restructure module`
- `test: add missing tests`
- `chore: update dependencies`

## 🎨 Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Use **meaningful variable names**
- Add **JSDoc comments** for complex functions
- Keep functions **small and focused**
- Use **async/await** over promises when possible

### React Components

- Use **functional components** with hooks
- Keep components **small and reusable**
- Use **TypeScript interfaces** for props
- Follow **React best practices** for performance
- Use **descriptive component names**

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Follow existing **naming conventions**
- Keep styles **modular and scoped**
- Avoid **inline styles** when possible

### File Naming

- Use **kebab-case** for files: `my-component.tsx`
- Use **PascalCase** for component files: `MyComponent.tsx`
- Use **camelCase** for utility files: `myHelper.ts`

## 📝 Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(auth): add magic link authentication

Implemented Supabase magic link authentication with email verification.
Includes client-safe implementation using useEffect.

Closes #42
```

```
fix(dashboard): resolve layout overflow issue

Fixed horizontal overflow on mobile devices by adjusting grid layout.
```

## 🔍 Code Review

All submissions require review. We use GitHub pull requests for this purpose. Here's what reviewers look for:

- **Code quality** and adherence to style guidelines
- **Test coverage** for new features
- **Documentation** completeness
- **Performance** considerations
- **Security** implications
- **Backward compatibility**

## 🙏 Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute!

## 📞 Questions?

Feel free to:
- Open an issue for discussion
- Ask questions in pull requests
- Reach out to the maintainers

Happy coding! 🚀

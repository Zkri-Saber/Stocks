# CLAUDE.md — AI Assistant Guide for Stocks

## Project Overview

**Stocks** is a newly initialized repository. This file establishes the conventions and structure that AI assistants should follow when contributing to this project.

## Repository Structure

```
Stocks/
├── CLAUDE.md          # AI assistant guide (this file)
```

> This project is in its initial setup phase. Update this section as the codebase grows.

## Development Workflow

### Getting Started

1. Clone the repository and check out your working branch.
2. Install dependencies as defined by the project's package manager (to be determined).
3. Follow the conventions below when adding code.

### Branch Naming

- Feature branches follow the pattern: `claude/<description>-<session-id>`
- Always push with `git push -u origin <branch-name>`

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Keep the subject line under 72 characters

## Code Conventions

### General

- Keep code simple and readable; avoid over-engineering
- Prefer small, focused functions over large monolithic ones
- Do not add dead code, commented-out blocks, or unused imports
- Only add comments where the logic is non-obvious

### File Organization

- Group related files in directories by feature or domain
- Keep test files close to the code they test
- Use consistent naming conventions (to be established with the first source files)

## Testing

- Write tests for new functionality
- Run the full test suite before pushing changes
- Do not push code that breaks existing tests

## CI/CD

No CI/CD pipeline is configured yet. Update this section when one is added.

## Key Commands

> To be filled in as the project's tooling is established. Example entries:
>
> ```bash
> # Install dependencies
> # <package-manager> install
>
> # Run tests
> # <test-runner>
>
> # Build
> # <build-command>
>
> # Lint
> # <lint-command>
> ```

## Notes for AI Assistants

- Always read existing files before modifying them
- Do not introduce security vulnerabilities (SQL injection, XSS, command injection, etc.)
- Prefer editing existing files over creating new ones
- Do not add features, refactors, or "improvements" beyond what is requested
- When unsure about a convention, check existing code patterns first
- Update this CLAUDE.md when new tooling, structure, or conventions are established

# Contributing to GrimRepo

Thank you for your interest in contributing to GrimRepo! This guide will help you get started.

## Tri-Perimeter Contribution Framework (TPCF)

GrimRepo uses the **Tri-Perimeter Contribution Framework** to balance openness with security:

### Perimeter 3: Community Sandbox (Current Status)

✅ **Fully Open Contribution**

Anyone can contribute! This perimeter is designed for:
- Community experimentation
- Low-risk features
- Documentation improvements
- Test additions
- Bug fixes

**Access**: Public GitLab repository
**Approval**: Standard merge request review
**Barriers**: Minimal - just follow our Code of Conduct

### Perimeter 2: Trusted Contributors (Future)

As the project matures, we may introduce:
- Commit access for proven contributors
- Direct push rights (with review)
- Release management privileges

**Path**: Consistent contributions + maintainer nomination

### Perimeter 1: Core Team (Future)

Reserved for:
- Security-critical code
- Infrastructure access
- Signing keys
- Credential management

**Path**: Long-term trust + formal verification

## Getting Started

### Prerequisites

**Required**:
- Git
- Node.js 18+ and npm
- TypeScript knowledge

**Recommended**:
- [just](https://github.com/casey/just) - task runner
- [Nix](https://nixos.org) with flakes - reproducible builds
- A userscript manager (Tampermonkey, Violentmonkey)

### Development Setup

```bash
# 1. Fork the repository on GitLab
# 2. Clone your fork
git clone https://gitlab.com/YOUR-USERNAME/grimrepo-scripts.git
cd grimrepo-scripts

# 3. Add upstream remote
git remote add upstream https://gitlab.com/extensions-library/monkey-scripts/grimrepo-scripts.git

# 4. Install dependencies (dev only)
npm install

# 5. Run tests to verify setup
npm test

# 6. Create a feature branch
git checkout -b feature/your-feature-name
```

### Using Nix (Optional but Recommended)

For reproducible development environment:

```bash
# Enter development shell
nix develop

# All tools and dependencies now available
just test
```

## How to Contribute

### Types of Contributions

We welcome:

1. **Bug Reports** - See "Reporting Bugs" below
2. **Feature Requests** - See "Suggesting Features" below
3. **Code Contributions** - See "Pull Request Process" below
4. **Documentation** - Improvements, clarifications, examples
5. **Tests** - Additional test coverage
6. **Design Feedback** - UX/UI suggestions
7. **Security Reports** - See SECURITY.md

### Reporting Bugs

**Before submitting**, please:
- Check existing issues to avoid duplicates
- Verify you're using the latest version
- Test with minimal configuration

**Bug Report Template**:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Environment**
- GrimRepo version: [e.g., 1.0.0]
- Browser: [e.g., Firefox 120]
- Userscript Manager: [e.g., Tampermonkey 5.0]
- Platform: [e.g., GitLab, GitHub, Bitbucket]
- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]

**Additional context**
Any other relevant information.
```

### Suggesting Features

We value thoughtful feature proposals. Please include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **Alternatives Considered**: What other approaches did you think about?
4. **Impact**: Who benefits? How much complexity does it add?
5. **Implementation Ideas**: (optional) How might this be built?

### Pull Request Process

#### Before You Start

1. **Check existing issues/MRs** to avoid duplicate work
2. **Open an issue first** for significant changes (discuss before coding)
3. **Keep changes focused** - one feature/fix per MR
4. **Read our Code of Conduct** - be respectful and professional

#### Development Workflow

```bash
# 1. Update your fork
git fetch upstream
git checkout main
git merge upstream/main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes
# ... edit code ...

# 4. Run validations locally
just validate  # or: npm run validate

# 5. Commit with clear messages
git add .
git commit -m "feat: add repository structure validator

- Implements directory presence checking
- Adds template generation for missing folders
- Includes unit tests with 100% coverage

Closes #123"

# 6. Push to your fork
git push origin feature/your-feature-name

# 7. Open Merge Request on GitLab
```

#### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring without behavior change
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, etc.

**Example**:
```
feat(audit): add LICENSE.txt compliance checker

Implements scanning for LICENSE file presence and validation
of common open source licenses (MIT, Apache, GPL, etc.).

Closes #42
```

#### Code Standards

**TypeScript**:
- Use **strict mode** (`tsconfig.json` already configured)
- **No `any` types** in production code
- **Explicit return types** for public functions
- **Immutable data structures** (prefer `const`, `readonly`)
- **Pure functions** where possible (no side effects)

**Testing**:
- **100% coverage** for new code (aim for it, we'll guide you)
- **Unit tests** for individual functions
- **Integration tests** for module interactions
- **Descriptive test names**: `it('should validate LICENSE when file exists')`

**Documentation**:
- **JSDoc comments** for public APIs
- **README updates** for new features
- **CHANGELOG entry** (we'll help with this)

**Formatting**:
```bash
# Auto-format code
npm run format

# Check formatting
npm run lint
```

#### Merge Request Checklist

Before requesting review, ensure:

- [ ] Code follows project style (linter passes)
- [ ] All tests pass (`npm test`)
- [ ] New tests added for new features
- [ ] Documentation updated (README, JSDoc)
- [ ] CHANGELOG.md updated (if user-facing change)
- [ ] No breaking changes (or clearly documented)
- [ ] Commit messages follow Conventional Commits
- [ ] MR description explains changes clearly
- [ ] No merge conflicts with `main`

#### Review Process

1. **Automated Checks**: CI/CD runs tests, linting, type checking
2. **Maintainer Review**: Code quality, design, tests
3. **Feedback Loop**: Address review comments
4. **Approval**: Maintainer approves MR
5. **Merge**: Squash-merge into `main`

**Timeline**:
- Initial review: Within 3-5 business days
- Follow-up: Within 2 business days
- (We're human - gentle pings after 7 days are welcome)

## Development Guidelines

### Architecture Principles

1. **Offline-First**: No network calls in core functionality
2. **Zero Runtime Dependencies**: Self-contained execution
3. **Type Safety**: Leverage TypeScript's type system
4. **Memory Safety**: Immutable patterns, no buffer overflows
5. **Modularity**: Clear separation of concerns

### Code Organization

```
src/
├── bootstrap.ts     # Repo structure bootstrapper
├── community.ts     # Community standards helper
├── audit.ts         # Golden registry auditor
├── index.ts         # Main entry point
└── types.ts         # Shared type definitions

tests/
├── bootstrap.test.ts
├── community.test.ts
└── audit.test.ts
```

### Testing Philosophy

- **Unit Tests**: Test individual functions in isolation
- **Integration Tests**: Test module interactions
- **No Mocking**: Prefer real implementations (offline-first makes this easy)
- **Property-Based Testing**: (future) Use `fast-check` for edge cases

### Performance Considerations

- Avoid DOM thrashing (batch reads/writes)
- Use `requestIdleCallback` for non-urgent tasks
- Lazy-load features (don't block initial render)
- Profile before optimizing (no premature optimization)

## Community

### Communication Channels

- **Issues**: Bug reports, feature requests, discussions
- **Merge Requests**: Code review, implementation discussions
- **Email**: For private/sensitive topics (see SECURITY.md)

### Code of Conduct

We are committed to providing a welcoming, safe, and harassment-free environment. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

**In Summary**:
- Be respectful and professional
- Focus on the code, not the person
- Welcome newcomers and diverse perspectives
- Assume good faith
- Violations will be addressed promptly

### Recognition

Contributors are recognized:

1. **MAINTAINERS.md**: Long-term contributors promoted to maintainers
2. **Humans.txt**: All contributors credited in `.well-known/humans.txt`
3. **Changelog**: Contributor names in release notes
4. **GitLab Insights**: Contribution statistics visible

## Emotional Safety

Per our [Palimpsest License](LICENSE.txt), we prioritize:

### Right to Reversibility
- **Failed experiments are OK** - we won't hold them against you
- **Feel free to explore** - breaking things in development is expected
- **Abandoned PRs are fine** - life happens, no guilt

### Anxiety Reduction
- **Ask questions anytime** - there are no "stupid questions"
- **Request help early** - we're here to support you
- **Take breaks** - sustainable contribution is healthy contribution

### Constructive Critique
- Code review focuses on **code quality**, not personal worth
- Feedback is **actionable and specific**, not vague or dismissive
- **Disagreement is welcome**, personal attacks are not

## Legal

### Contributor License Agreement (CLA)

By contributing, you agree that:

1. Your contributions are your own original work
2. You have the right to submit your contributions
3. Your contributions are licensed under the project's licenses (MIT + Palimpsest v0.8)
4. You grant maintainers the right to relicense (unlikely, but reserved)

No formal CLA signing required - your merge request submission implies agreement.

### Copyright

- You **retain copyright** of your contributions
- The project gains a **perpetual license** to use your contributions
- You are **credited** in relevant files and documentation

### Third-Party Code

If including third-party code:
- Ensure license compatibility (MIT, Apache 2.0, BSD are generally OK)
- Document the source and license in comments
- Update LICENSE.txt if necessary

## Questions?

- **General questions**: Open a GitLab issue with "Question:" prefix
- **Real-time chat**: (coming soon) Discord/Matrix channel
- **Private inquiries**: Contact maintainers (see MAINTAINERS.md)

## Thank You!

Every contribution, no matter how small, makes GrimRepo better. We appreciate your time, expertise, and goodwill.

**Happy contributing!** 🎉

---

**Last Updated**: 2025-01-22
**Version**: 1.0

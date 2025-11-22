# GrimRepo Scripts - Architecture Documentation

## Overview

GrimRepo Scripts is a modular, offline-first, type-safe toolkit for repository auditing and scaffolding. This document describes the system architecture, design decisions, and extension points.

## Design Principles

### 1. Offline-First
**All core functionality works without network access.**

- No external API calls during audit/scaffolding
- Templates embedded in code, not fetched
- Userscript runs entirely client-side
- Configuration stored in browser LocalStorage

**Rationale**: Privacy, air-gap compatibility, reliability

### 2. Type Safety
**Leverage TypeScript's type system to prevent bugs at compile time.**

- `strict: true` in tsconfig.json
- No `any` types in production code
- Explicit return types for all public functions
- Readonly arrays and properties where applicable

**Rationale**: Eliminate entire classes of runtime errors

### 3. Memory Safety
**Use immutable patterns to prevent memory-related bugs.**

- `const` by default, `let` only when mutation necessary
- `readonly` for arrays and object properties
- No manual memory management (garbage collected JavaScript)
- Functional programming patterns (map, filter, reduce over mutation)

**Rationale**: Prevent buffer overflows, use-after-free, null pointer dereferences

### 4. Modularity
**Clear separation of concerns, loose coupling.**

- Each module has a single responsibility
- Modules communicate through well-defined interfaces
- No circular dependencies
- Public API in `index.ts`, internal implementation private

**Rationale**: Testability, maintainability, extensibility

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         User's Browser                       │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │           Userscript Manager (Tampermonkey)        │     │
│  │                                                      │     │
│  │  ┌────────────────────────────────────────────┐    │     │
│  │  │        GrimRepo Scripts (index.ts)         │    │     │
│  │  │                                              │    │     │
│  │  │  ┌──────────────┐  ┌────────────────────┐  │    │     │
│  │  │  │  Platform    │  │  Repo Context      │  │    │     │
│  │  │  │  Detection   │  │  Extraction        │  │    │     │
│  │  │  └──────────────┘  └────────────────────┘  │    │     │
│  │  │           │                  │              │    │     │
│  │  │           ▼                  ▼              │    │     │
│  │  │  ┌───────────────────────────────────┐     │    │     │
│  │  │  │      Audit Orchestrator           │     │    │     │
│  │  │  └───────────────────────────────────┘     │    │     │
│  │  │           │                                 │    │     │
│  │  │           ├──────────┬──────────┐          │    │     │
│  │  │           ▼          ▼          ▼          │    │     │
│  │  │  ┌─────────────┐ ┌─────────┐ ┌─────────┐  │    │     │
│  │  │  │ bootstrap.ts│ │community│ │ audit.ts│  │    │     │
│  │  │  │  (Structure)│ │   .ts   │ │ (Score) │  │    │     │
│  │  │  └─────────────┘ └─────────┘ └─────────┘  │    │     │
│  │  │           │          │          │          │    │     │
│  │  │           └──────────┴──────────┘          │    │     │
│  │  │                     │                      │    │     │
│  │  │                     ▼                      │    │     │
│  │  │          ┌─────────────────────┐           │    │     │
│  │  │          │  Audit Result       │           │    │     │
│  │  │          │  (JSON/Markdown)    │           │    │     │
│  │  │          └─────────────────────┘           │    │     │
│  │  │                     │                      │    │     │
│  │  │                     ▼                      │    │     │
│  │  │          ┌─────────────────────┐           │    │     │
│  │  │          │   UI Renderer       │           │    │     │
│  │  │          │  (Modal/Overlay)    │           │    │     │
│  │  │          └─────────────────────┘           │    │     │
│  │  └────────────────────────────────────────────┘    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │            GitLab / GitHub / Bitbucket             │     │
│  │                (Repository Page)                   │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Module Descriptions

### `src/types.ts`
**Purpose**: Shared type definitions

**Exports**:
- `RepoStructure`: Directory analysis result
- `CommunityStandards`: File analysis result
- `AuditResult`: Complete audit output
- `GrimRepoConfig`: User configuration
- `Platform`: GitLab | GitHub | Bitbucket | unknown
- `PlatformContext`: Detected repository context

**Dependencies**: None (foundational types)

### `src/bootstrap.ts`
**Purpose**: Repo structure bootstrapper

**Key Functions**:
- `analyzeStructure(paths: string[]): RepoStructure`
  - Compares existing paths against `STANDARD_DIRECTORIES`
  - Returns missing/present directories and score

- `generateDirectoryTemplate(dir: DirectoryCheck): string`
  - Generates README.md template for a directory

- `getStructureRecommendations(structure: RepoStructure): string[]`
  - Human-readable recommendations

**Algorithm**:
1. Normalize input paths (lowercase, trim trailing slashes)
2. Compare against standard directory list
3. Weight by priority (required=10, recommended=5, optional=1)
4. Calculate score: `(earnedPoints / maxPoints) * 100`

**Dependencies**: `types.ts`

### `src/community.ts`
**Purpose**: Community standards helper

**Key Functions**:
- `analyzeCommunityStandards(files: string[]): CommunityStandards`
  - Compares existing files against `STANDARD_FILES`
  - Handles LICENSE/LICENSE.txt equivalence

- `getCommunityRecommendations(standards: CommunityStandards): string[]`
  - Human-readable recommendations

- `checkRSRCompliance(standards: CommunityStandards): boolean`
  - Returns true if Bronze-level RSR requirements met

**Algorithm**:
1. Normalize file paths (case-insensitive)
2. Handle LICENSE special case (LICENSE or LICENSE.txt)
3. Weight by priority (same as bootstrap)
4. Calculate score

**Dependencies**: `types.ts`

### `src/audit.ts`
**Purpose**: Golden registry auditor

**Key Functions**:
- `auditRepository(paths: string[], files: string[]): AuditResult`
  - Orchestrates structure + community analysis
  - Calculates overall score (60% community, 40% structure)
  - Determines quality level (raw/bronze/silver/gold/rhodium)

- `generateAuditReport(audit: AuditResult): string`
  - Markdown-formatted report

- `generateJSONReport(audit: AuditResult): string`
  - JSON for programmatic consumption

**Quality Level Logic**:
- **Rhodium**: Score ≥95 AND RSR-compliant
- **Gold**: Score ≥85 AND RSR-compliant
- **Silver**: Score ≥75 AND RSR-compliant
- **Bronze**: Score ≥60 AND RSR-compliant
- **Raw**: Otherwise

**Dependencies**: `types.ts`, `bootstrap.ts`, `community.ts`

### `src/index.ts`
**Purpose**: Main entry point, public API

**Key Functions**:
- `init(config?: Partial<GrimRepoConfig>): void`
  - Initializes userscript, detects platform

- `detectPlatform(): Platform`
  - Inspects `window.location.hostname`

- `getRepositoryContext(): PlatformContext | null`
  - Extracts owner/repo from URL

- `runAudit(paths: string[], files: string[]): string`
  - Programmatic API for CI/CD

- `selfCheck(): void`
  - Verifies GrimRepo's own RSR compliance

**Auto-Initialization**:
```typescript
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}
```

**Dependencies**: All other modules

## Data Flow

### 1. User visits repository page
```
Browser loads page
  ↓
Userscript manager injects GrimRepo
  ↓
index.ts::init() called automatically
  ↓
detectPlatform() determines GitLab/GitHub/Bitbucket
  ↓
getRepositoryContext() extracts owner/repo from URL
```

### 2. User triggers audit (future: button click)
```
UI event handler
  ↓
Fetch directory/file list from DOM or API
  ↓
analyzeStructure(paths) → RepoStructure
  ↓
analyzeCommunityStandards(files) → CommunityStandards
  ↓
auditRepository(paths, files) → AuditResult
  ↓
generateAuditReport(result) → Markdown
  ↓
Render in modal/overlay
```

### 3. Programmatic usage (CI/CD)
```
import { runAudit } from '@grimrepo/core'
  ↓
const paths = ['src/', 'tests/'];
const files = ['README.md', 'LICENSE.txt'];
  ↓
const report = runAudit(paths, files);
  ↓
console.log(report); // Markdown report
```

## Configuration

### Default Configuration
```typescript
const DEFAULT_CONFIG: GrimRepoConfig = {
  enabled: true,
  autoSuggest: true,
  strictMode: false,
  customDirs: [],
  customFiles: [],
};
```

### Custom Configuration
```typescript
init({
  enabled: true,
  autoSuggest: false, // Don't auto-show suggestions
  strictMode: true,   // Fail on optional items
  customDirs: [
    { path: 'ci/', purpose: 'CI/CD scripts', priority: 'required' }
  ],
  customFiles: [
    { path: 'CODEOWNERS', purpose: 'Code ownership', priority: 'recommended' }
  ],
});
```

## Extension Points

### 1. Custom Templates
**Location**: `bootstrap.ts` and `community.ts`

**How to extend**:
```typescript
// Add to STANDARD_DIRECTORIES
{
  path: 'custom-dir/',
  purpose: 'Custom functionality',
  priority: 'optional',
  template: '# Custom Template\n\nYour content here.'
}
```

### 2. Custom Scoring
**Location**: `audit.ts::calculateOverallScore()`

**How to extend**:
```typescript
function calculateOverallScore(structureScore: number, communityScore: number): number {
  // Custom weighting (e.g., 50/50 instead of 60/40)
  return Math.round((communityScore * 0.5) + (structureScore * 0.5));
}
```

### 3. Platform Support
**Location**: `index.ts::detectPlatform()`

**How to extend**:
```typescript
export function detectPlatform(): Platform {
  const hostname = window.location.hostname.toLowerCase();

  if (hostname.includes('gitlab')) return 'gitlab';
  if (hostname.includes('github')) return 'github';
  if (hostname.includes('bitbucket')) return 'bitbucket';
  if (hostname.includes('gitea')) return 'gitea'; // NEW

  return 'unknown';
}
```

## Testing Strategy

### Unit Tests
**Location**: `tests/*.test.ts`

**Coverage**:
- All public functions
- Edge cases (empty inputs, case sensitivity, special characters)
- Boundary conditions (score thresholds)

**Framework**: Jest with ts-jest

**Example**:
```typescript
describe('analyzeStructure', () => {
  it('should calculate perfect score when all dirs present', () => {
    const paths = ['src/', 'tests/', 'docs/', ...];
    const result = analyzeStructure(paths);
    expect(result.score).toBe(100);
  });
});
```

### Integration Tests
**Future**: Test module interactions

```typescript
describe('Full Audit', () => {
  it('should assign bronze level to minimal compliant repo', () => {
    const paths = ['src/', 'tests/'];
    const files = ['README.md', 'LICENSE.txt', 'SECURITY.md', ...];
    const result = auditRepository(paths, files);
    expect(result.level).toBe('bronze');
  });
});
```

## Build Process

### Development
```bash
npm run build:watch  # TypeScript compiler in watch mode
npm run test:watch   # Jest in watch mode
```

### Production
```bash
npm run build        # TypeScript → dist/
npm run validate     # typecheck + lint + test
```

### CI/CD
```yaml
# .gitlab-ci.yml
test:
  script:
    - npm ci
    - npm run validate
```

## Deployment

### Userscript
**Target**: `dist/grimrepo.user.js`

**Headers**:
```javascript
// ==UserScript==
// @name         GrimRepo Scripts
// @namespace    https://grimrepo.dev/
// @version      1.0.0
// @description  Audit-grade tooling for repositories
// @author       GrimRepo Contributors
// @match        https://gitlab.com/*
// @match        https://github.com/*
// @match        https://bitbucket.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
```

### NPM Package
**Target**: `@grimrepo/core`

```bash
npm publish
```

## Performance Considerations

### Audit Time
**Target**: <100ms for typical repository

**Optimizations**:
- Lazy evaluation (don't generate templates unless requested)
- Memoization for repeated audits
- Efficient Set-based lookups instead of array iterations

### Memory Usage
**Target**: <10MB total memory footprint

**Strategies**:
- Immutable data structures (shared memory via structural sharing)
- No large embedded assets (templates are small strings)
- Garbage collection-friendly (no long-lived references)

## Security Considerations

### Input Validation
- All file paths normalized and sanitized
- No `eval()` or `Function()` on user input
- XSS prevention (escape all user-provided content before rendering)

### Secrets Management
- No credentials stored in code or LocalStorage
- No API keys required (offline-first)

### Supply Chain
- Minimal dependencies (TypeScript, Jest for dev only)
- npm audit runs in CI/CD
- Dependabot/Renovate for automatic updates

## Future Architecture

### Planned Changes

1. **UI Layer** (Phase 1)
   - React or Vanilla JS components for modal/overlay
   - Shadow DOM for style isolation

2. **Storage Layer** (Phase 1)
   - LocalStorage wrapper for configuration persistence
   - IndexedDB for audit history (optional)

3. **API Layer** (Phase 4)
   - REST API for self-hosted deployment
   - GraphQL for complex queries (Rhodium Register)

4. **Plugin System** (Phase 5)
   - Third-party plugins for custom audits
   - Hook system (pre-audit, post-audit, render)

### Architectural Decision Records (ADRs)

**ADR-001: TypeScript over JavaScript**
- **Decision**: Use TypeScript with strict mode
- **Rationale**: Type safety prevents runtime errors, improves developer experience
- **Status**: Accepted

**ADR-002: Offline-First Architecture**
- **Decision**: No network calls in core functionality
- **Rationale**: Privacy, air-gap compatibility, reliability
- **Status**: Accepted

**ADR-003: Immutable Data Structures**
- **Decision**: Use `readonly` and `const` by default
- **Rationale**: Memory safety, predictability, testability
- **Status**: Accepted

**ADR-004: Monorepo vs. Multiple Packages**
- **Decision**: Monorepo for now, split later if needed
- **Rationale**: Simplicity, easier development, can refactor later
- **Status**: Accepted, revisit in Phase 3

## Contributing to Architecture

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Proposing architectural changes
- Writing ADRs
- Code review process
- Design discussions

## Questions?

- **GitLab Issues**: https://gitlab.com/extensions-library/monkey-scripts/grimrepo-scripts/-/issues
- **Email**: architecture@grimrepo.dev (coming soon)

---

**Last Updated**: 2025-01-22
**Version**: 1.0

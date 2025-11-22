# GrimRepo Scripts - Task Automation
# Install: https://github.com/casey/just

# List all available recipes
default:
    @just --list

# Build the project
build:
    @echo "🔨 Building TypeScript..."
    npm run build

# Run type checking
typecheck:
    @echo "🔍 Type checking..."
    npm run typecheck

# Run tests
test:
    @echo "🧪 Running tests..."
    npm test

# Run tests with coverage
test-coverage:
    @echo "📊 Running tests with coverage..."
    npm run test:coverage

# Run tests in watch mode
test-watch:
    @echo "👀 Running tests in watch mode..."
    npm run test:watch

# Lint code
lint:
    @echo "🔎 Linting code..."
    npm run lint

# Fix linting issues
lint-fix:
    @echo "🔧 Fixing linting issues..."
    npm run lint:fix

# Format code
format:
    @echo "✨ Formatting code..."
    npm run format

# Check code formatting
format-check:
    @echo "📐 Checking code formatting..."
    npm run format:check

# Run all validations (typecheck, lint, test)
validate:
    @echo "✅ Running all validations..."
    npm run validate

# Clean build artifacts
clean:
    @echo "🧹 Cleaning build artifacts..."
    npm run clean
    rm -rf node_modules

# Install dependencies
install:
    @echo "📦 Installing dependencies..."
    npm install

# Reinstall dependencies (clean install)
reinstall: clean install

# Build and run local development version
dev: build
    @echo "🚀 Development build complete"

# Run RSR compliance self-check
self-check: build
    @echo "🔍 Running RSR compliance self-check..."
    @node -e "const { selfCheck } = require('./dist/index.js'); selfCheck();"

# Generate audit report for current repository
audit:
    @echo "📋 Generating audit report..."
    @node -e "const { runAudit } = require('./dist/index.js'); const paths = []; const files = []; console.log(runAudit(paths, files));"

# Prepare for release (validate + build)
release: validate build
    @echo "🎉 Release preparation complete!"

# Check for outdated dependencies
outdated:
    @echo "📅 Checking for outdated dependencies..."
    npm outdated

# Update dependencies
update:
    @echo "⬆️  Updating dependencies..."
    npm update

# Security audit
security-audit:
    @echo "🔒 Running security audit..."
    npm audit

# Fix security vulnerabilities
security-fix:
    @echo "🔐 Fixing security vulnerabilities..."
    npm audit fix

# Count lines of code
loc:
    @echo "📏 Counting lines of code..."
    @find src -name '*.ts' -exec wc -l {} + | tail -n 1

# Show project statistics
stats:
    @echo "📊 Project Statistics:"
    @echo ""
    @echo "TypeScript Files:"
    @find src -name '*.ts' | wc -l
    @echo ""
    @echo "Test Files:"
    @find tests -name '*.test.ts' | wc -l
    @echo ""
    @echo "Lines of Code:"
    @just loc

# Verify RSR Bronze compliance
verify-rsr:
    @echo "🏅 Verifying RSR Bronze Compliance..."
    @echo ""
    @echo "✅ Checking documentation files..."
    @test -f README.md && echo "  ✓ README.md" || echo "  ✗ README.md"
    @test -f LICENSE.txt && echo "  ✓ LICENSE.txt" || echo "  ✗ LICENSE.txt"
    @test -f SECURITY.md && echo "  ✓ SECURITY.md" || echo "  ✗ SECURITY.md"
    @test -f CONTRIBUTING.md && echo "  ✓ CONTRIBUTING.md" || echo "  ✗ CONTRIBUTING.md"
    @test -f CODE_OF_CONDUCT.md && echo "  ✓ CODE_OF_CONDUCT.md" || echo "  ✗ CODE_OF_CONDUCT.md"
    @test -f MAINTAINERS.md && echo "  ✓ MAINTAINERS.md" || echo "  ✗ MAINTAINERS.md"
    @test -f CHANGELOG.md && echo "  ✓ CHANGELOG.md" || echo "  ✗ CHANGELOG.md"
    @echo ""
    @echo "✅ Checking .well-known directory..."
    @test -f .well-known/security.txt && echo "  ✓ security.txt" || echo "  ✗ security.txt"
    @test -f .well-known/ai.txt && echo "  ✓ ai.txt" || echo "  ✗ ai.txt"
    @test -f .well-known/humans.txt && echo "  ✓ humans.txt" || echo "  ✗ humans.txt"
    @echo ""
    @echo "✅ Checking build system..."
    @test -f package.json && echo "  ✓ package.json" || echo "  ✗ package.json"
    @test -f tsconfig.json && echo "  ✓ tsconfig.json" || echo "  ✗ tsconfig.json"
    @test -f justfile && echo "  ✓ justfile" || echo "  ✗ justfile"
    @test -f flake.nix && echo "  ✓ flake.nix" || echo "  ✗ flake.nix"
    @echo ""
    @echo "✅ Checking CI/CD..."
    @test -f .gitlab-ci.yml && echo "  ✓ .gitlab-ci.yml" || echo "  ✗ .gitlab-ci.yml"
    @echo ""
    @echo "🎯 RSR Compliance Check Complete!"

# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub/GitLab issues.**

Instead, please report security vulnerabilities to us privately using one of these methods:

### Primary Contact

**Email**: security@grimrepo.dev (coming soon)
**PGP Key**: Available at `.well-known/security.txt`

**Response Time**: We aim to acknowledge reports within 48 hours and provide an initial assessment within 7 days.

### Alternative Contacts

For immediate security concerns, you can also reach maintainers via:
- GitLab Security Issue (private): https://gitlab.com/extensions-library/monkey-scripts/grimrepo-scripts/-/issues/new?issuable_template=security
- See `.well-known/security.txt` for additional contact methods

## What to Include in Your Report

Please include as much of the following information as possible:

1. **Type of vulnerability** (e.g., XSS, injection, authentication bypass)
2. **Affected component(s)** (e.g., specific module, function, or endpoint)
3. **Step-by-step reproduction** instructions
4. **Proof-of-concept** or exploit code (if available)
5. **Impact assessment** (what an attacker could achieve)
6. **Suggested remediation** (if you have ideas)
7. **Your contact information** for follow-up questions

## Our Commitment

When you report a vulnerability, you can expect:

1. **Acknowledgment** within 48 hours
2. **Regular updates** on our investigation and remediation progress
3. **Credit** in our security advisories (if you wish to be named)
4. **Coordinated disclosure** - we will work with you on timing of public disclosure
5. **No legal action** against good-faith security researchers

## Security Update Process

1. **Triage** (1-2 days): Validate and assess severity
2. **Fix Development** (variable): Develop and test patch
3. **Advisory Draft** (1 day): Prepare security advisory
4. **Coordinated Disclosure** (negotiated): Work with reporter on timing
5. **Public Release**: Patch release + public advisory
6. **Post-Mortem** (optional): Analyze root cause and prevention

## Severity Classification

We use the following severity levels:

### Critical
- Remote code execution
- Authentication bypass
- Data breach potential
- **Response**: Emergency patch within 24-48 hours

### High
- Privilege escalation
- Cross-site scripting (stored)
- SQL injection
- **Response**: Patch within 7 days

### Medium
- Cross-site scripting (reflected)
- Information disclosure
- Denial of service (authenticated)
- **Response**: Patch within 30 days

### Low
- Minor information leaks
- Denial of service (unauthenticated, limited impact)
- **Response**: Patch in next scheduled release

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest version
2. **Review Permissions**: Understand what access the userscript requires
3. **Audit Sources**: Only install from official sources (GitLab, GreasyFork)
4. **Report Issues**: If something seems suspicious, report it

### For Contributors

1. **Input Validation**: Validate all external inputs
2. **Output Encoding**: Properly encode outputs to prevent XSS
3. **No Secrets**: Never commit API keys, tokens, or credentials
4. **Dependency Audits**: Run `npm audit` before submitting PRs
5. **SAST Tools**: Use static analysis tools during development

## Known Security Considerations

### Userscript Environment

As a userscript, GrimRepo runs in users' browsers with elevated privileges. We take special precautions:

1. **Content Security Policy**: We restrict inline scripts and external resources
2. **DOM Isolation**: We use shadow DOM to prevent interference
3. **No External Calls**: Offline-first architecture minimizes attack surface
4. **Minimal Permissions**: We request only necessary browser permissions

### Sandboxing

- User-provided configurations are validated and sanitized
- No `eval()` or `Function()` constructors on user input
- Strict TypeScript types prevent injection vulnerabilities

## Security Audit History

| Date       | Auditor               | Scope          | Findings | Status   |
|------------|-----------------------|----------------|----------|----------|
| 2025-01-15 | Internal Review       | Full codebase  | 0        | Complete |

## Vulnerability Disclosure Policy

We follow **Coordinated Vulnerability Disclosure**:

1. **Private Reporting**: Vulnerabilities reported privately
2. **Investigation Period**: 90-day maximum before public disclosure
3. **Patch Development**: We develop and test fixes
4. **Coordinated Release**: Public disclosure after patch is available
5. **Credit**: Security researchers credited in advisories (opt-in)

## Security Hall of Fame

We recognize security researchers who help improve GrimRepo:

- *No vulnerabilities reported yet*

Thank you to all researchers who help keep GrimRepo secure!

## Additional Resources

- **Security.txt**: See `.well-known/security.txt` (RFC 9116 compliant)
- **CVE Database**: We register CVEs for qualifying vulnerabilities
- **Security Advisories**: https://gitlab.com/extensions-library/monkey-scripts/grimrepo-scripts/-/security/advisories

## Questions?

For security-related questions (non-vulnerabilities), contact:
- **Email**: security@grimrepo.dev (coming soon)
- **GitLab Issues**: https://gitlab.com/extensions-library/monkey-scripts/grimrepo-scripts/-/issues

---

**Last Updated**: 2025-01-22
**Version**: 1.0

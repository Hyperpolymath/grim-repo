# Maintainers

This document lists the current maintainers of the GrimRepo project and describes our governance structure.

## Current Maintainers

### Lead Maintainer

**Role**: Final decision authority, project vision, release management

- **Name**: [To be assigned]
- **GitLab**: [@username](https://gitlab.com/username)
- **Email**: lead@grimrepo.dev (coming soon)
- **Timezone**: UTC
- **Since**: 2025-01-22

### Core Maintainers

**Role**: Code review, merge authority, architectural decisions

*No core maintainers assigned yet. Contributors will be promoted based on sustained contributions.*

### Module Maintainers

**Role**: Domain expertise, specific component ownership

| Module                    | Maintainer | GitLab | Since |
|---------------------------|------------|--------|-------|
| Repo Structure Bootstrap  | TBD        | -      | -     |
| Community Standards Helper| TBD        | -      | -     |
| Golden Registry Auditor   | TBD        | -      | -     |
| Build System & CI/CD      | TBD        | -      | -     |
| Documentation             | TBD        | -      | -     |

## Governance Model

GrimRepo uses a **benevolent dictatorship** model with **meritocratic progression**:

### Decision-Making Hierarchy

1. **Lead Maintainer**: Final authority on disputes and direction
2. **Core Maintainers**: Consensus-based decisions on architecture and major changes
3. **Module Maintainers**: Authority within their domain
4. **Community Contributors**: Input via issues, discussions, and merge requests

### Decision Process

**Minor Changes** (bug fixes, docs, tests):
- Any maintainer can merge after review
- Use judgment; default to more eyes on complex changes

**Moderate Changes** (new features, refactoring):
- Require approval from module maintainer + 1 core maintainer
- Lead maintainer can override if needed

**Major Changes** (breaking changes, architecture shifts):
- Require RFC (Request for Comments) issue
- Core maintainer consensus (majority vote)
- Lead maintainer can veto or override

**Emergency Changes** (security, critical bugs):
- Lead maintainer or any core maintainer can merge immediately
- Post-merge review and notification required

## Becoming a Maintainer

### Contributor → Module Maintainer

**Criteria**:
- 3+ months of consistent contributions
- Demonstrated expertise in specific module
- 10+ merged merge requests
- Positive community interactions
- Alignment with project values

**Process**:
1. Nomination by existing maintainer
2. Discussion among core maintainers
3. Lead maintainer approval
4. Public announcement and MAINTAINERS.md update

### Module Maintainer → Core Maintainer

**Criteria**:
- 6+ months as module maintainer
- Contributions across multiple modules
- 25+ merged merge requests
- Demonstrated good judgment in reviews
- Community mentorship and leadership

**Process**:
1. Self-nomination or nomination by core maintainer
2. Core maintainer vote (2/3 majority)
3. Lead maintainer approval
4. Public announcement and access provisioning

### Core Maintainer → Lead Maintainer

**Process**:
- Appointment by outgoing lead maintainer, or
- Core maintainer vote (unanimous) if position is vacant
- Community consultation period (2 weeks)
- Formal handoff of responsibilities

## Responsibilities

### All Maintainers

- **Code Review**: Timely, constructive feedback on merge requests
- **Issue Triage**: Label, prioritize, and respond to issues
- **Code of Conduct**: Enforce community standards
- **Communication**: Keep contributors informed
- **Availability**: Respond within 5 business days (best effort)

### Module Maintainers

- **Domain Expertise**: Deep knowledge of specific component
- **Architecture**: Maintain module design and interfaces
- **Mentorship**: Guide contributors in your domain
- **Documentation**: Keep module docs up-to-date

### Core Maintainers

- **Strategic Direction**: Participate in project roadmap discussions
- **Release Management**: Assist with versioning and releases
- **Cross-Module Coordination**: Ensure consistency across codebase
- **Conflict Resolution**: Help resolve disputes

### Lead Maintainer

- **Vision**: Set and communicate project direction
- **Final Decisions**: Break deadlocks and make hard calls
- **Releases**: Coordinate and publish releases
- **Representation**: Speak for project externally
- **Delegation**: Empower and support other maintainers

## Time Commitment

**Expected Availability** (guidelines, not strict requirements):

- **Module Maintainer**: 2-4 hours/week
- **Core Maintainer**: 4-8 hours/week
- **Lead Maintainer**: 8-12 hours/week

**Flexible Arrangements**:
- Life happens - we understand absences
- Announce extended unavailability (>2 weeks) when possible
- Backup coverage for critical responsibilities

## Stepping Down

Maintainers can step down at any time, for any reason, without guilt or justification (per our [Palimpsest License](LICENSE.txt) emotional safety guarantees).

**Process**:

1. **Notification**: Inform lead maintainer privately
2. **Transition Period**: 2-4 weeks handoff (if possible)
3. **Knowledge Transfer**: Document ongoing work
4. **Public Announcement**: Thank you and recognition
5. **Emeritus Status**: Listed as "Emeritus Maintainer" with gratitude

**Emeritus Maintainers** retain:
- GitLab project membership
- Credit in documentation
- Invitation to return anytime
- No ongoing obligations

## Inactive Maintainers

If a maintainer becomes unresponsive (>60 days without prior notice):

1. **Outreach**: Attempt contact via multiple channels
2. **Grace Period**: 30 days for response
3. **Transition**: If still unresponsive, temporarily remove merge rights
4. **Emeritus**: Move to emeritus status with gratitude
5. **Reinstatement**: Easy path to return when ready

**Philosophy**: We prioritize maintainer well-being over project urgency.

## Conflict Resolution

### Process

1. **Direct Communication**: Parties attempt to resolve directly
2. **Mediation**: Lead maintainer or neutral core maintainer mediates
3. **Core Maintainer Input**: If unresolved, seek broader input
4. **Lead Decision**: Lead maintainer makes final call
5. **Escalation**: Egregious violations → Code of Conduct enforcement

### Principles

- **Assume Good Faith**: Start with charitable interpretation
- **Focus on Code**: Separate technical from personal
- **Transparency**: Document decisions (with privacy protection)
- **Learn and Improve**: Conflicts are opportunities to improve processes

## Compensation

**Current Status**: All maintainers are unpaid volunteers.

**Future Possibilities**:
- Sponsorship programs (GitHub Sponsors, Open Collective)
- Paid support contracts for enterprise users
- Conference/travel funding for representing project

**Principles**:
- Compensation will be transparent and equitable
- Payment does not grant additional decision authority
- Volunteering remains valid and valued

## Communication

### Internal (Maintainers)

- **Weekly Sync**: (coming soon) Short async update
- **Monthly Meeting**: (coming soon) Video call for planning
- **Private Chat**: (coming soon) Matrix/Discord for maintainers
- **Email**: For sensitive/private discussions

### Public (Community)

- **GitLab Issues**: Feature requests, bug reports, discussions
- **Merge Requests**: Code review, technical discussion
- **Changelog**: User-facing changes
- **Release Notes**: Highlights and breaking changes

## Maintainer Emeriti

We honor past maintainers who contributed significantly:

*No emeriti yet - founding maintainers still active!*

## Contact

- **General Questions**: Open a GitLab issue
- **Private Maintainer Contact**: maintainers@grimrepo.dev (coming soon)
- **Lead Maintainer**: lead@grimrepo.dev (coming soon)

---

**Last Updated**: 2025-01-22
**Version**: 1.0

**Thank you to all maintainers, past, present, and future, for your service to the GrimRepo community!**

// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Repo Structure Bootstrapper
 * Ensures essential directories exist with proper scaffolding
 */

import type { RepoStructure, DirectoryCheck } from './types';

/**
 * Standard directory structure for modern repositories
 */
const STANDARD_DIRECTORIES: ReadonlyArray<DirectoryCheck> = [
  {
    path: 'src/',
    purpose: 'Source code',
    priority: 'required',
    template: '# Source Code\n\nMain application source code goes here.',
  },
  {
    path: 'tests/',
    purpose: 'Test files',
    priority: 'required',
    template: '# Tests\n\nTest suites and test utilities go here.',
  },
  {
    path: 'docs/',
    purpose: 'Documentation',
    priority: 'recommended',
    template: '# Documentation\n\nDetailed documentation, guides, and API references.',
  },
  {
    path: 'examples/',
    purpose: 'Example code',
    priority: 'recommended',
    template: '# Examples\n\nUsage examples and sample applications.',
  },
  {
    path: '.gitlab/',
    purpose: 'GitLab CI/CD config',
    priority: 'optional',
  },
  {
    path: '.github/',
    purpose: 'GitHub-specific config',
    priority: 'optional',
  },
  {
    path: 'scripts/',
    purpose: 'Build and automation scripts',
    priority: 'recommended',
  },
  {
    path: '.well-known/',
    purpose: 'RFC-compliant metadata',
    priority: 'recommended',
  },
];

/**
 * Analyzes repository structure and identifies missing directories
 */
export function analyzeStructure(existingPaths: ReadonlyArray<string>): RepoStructure {
  const pathSet = new Set(existingPaths.map(normalizePath));

  const missing: DirectoryCheck[] = [];
  const present: string[] = [];

  for (const dir of STANDARD_DIRECTORIES) {
    const normalized = normalizePath(dir.path);
    if (pathSet.has(normalized)) {
      present.push(dir.path);
    } else {
      missing.push(dir);
    }
  }

  const score = calculateStructureScore(missing, present);

  return {
    missingDirs: missing,
    presentDirs: present,
    score,
  };
}

/**
 * Normalizes file paths for comparison
 */
function normalizePath(path: string): string {
  return path.toLowerCase().replace(/\/+$/, '');
}

/**
 * Calculates structure completeness score (0-100)
 */
function calculateStructureScore(
  missing: ReadonlyArray<DirectoryCheck>,
  present: ReadonlyArray<string>
): number {
  const total = STANDARD_DIRECTORIES.length;

  // Weight by priority
  let maxPoints = 0;
  let earnedPoints = 0;

  for (const dir of STANDARD_DIRECTORIES) {
    const points = getPriorityWeight(dir.priority);
    maxPoints += points;

    const normalized = normalizePath(dir.path);
    const isPresent = present.some(p => normalizePath(p) === normalized);

    if (isPresent) {
      earnedPoints += points;
    }
  }

  return maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;
}

/**
 * Gets numeric weight for priority level
 */
function getPriorityWeight(priority: 'required' | 'recommended' | 'optional'): number {
  switch (priority) {
    case 'required':
      return 10;
    case 'recommended':
      return 5;
    case 'optional':
      return 1;
  }
}

/**
 * Generates README template for a directory
 */
export function generateDirectoryTemplate(dir: DirectoryCheck): string {
  return dir.template ?? `# ${dir.path}\n\n${dir.purpose}\n`;
}

/**
 * Gets human-readable recommendations
 */
export function getStructureRecommendations(structure: RepoStructure): ReadonlyArray<string> {
  const recommendations: string[] = [];

  for (const missing of structure.missingDirs) {
    if (missing.priority === 'required') {
      recommendations.push(`⚠️  Required: Create ${missing.path} for ${missing.purpose}`);
    } else if (missing.priority === 'recommended') {
      recommendations.push(`💡 Recommended: Add ${missing.path} for ${missing.purpose}`);
    }
  }

  if (structure.score === 100) {
    recommendations.push('✅ Structure is complete!');
  } else if (structure.score >= 80) {
    recommendations.push('✅ Structure is mostly complete');
  } else if (structure.score >= 60) {
    recommendations.push('⚠️  Structure needs improvement');
  } else {
    recommendations.push('❌ Structure is incomplete');
  }

  return recommendations;
}

// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Community Standards Helper
 * Audits and assists with community health files
 */

import type { CommunityStandards, FileCheck } from './types';

/**
 * Standard community health files
 */
const STANDARD_FILES: ReadonlyArray<FileCheck> = [
  {
    path: 'LICENSE',
    purpose: 'License terms',
    priority: 'required',
  },
  {
    path: 'LICENSE.txt',
    purpose: 'License terms (alternative)',
    priority: 'required',
  },
  {
    path: 'README.md',
    purpose: 'Project overview',
    priority: 'required',
  },
  {
    path: 'CONTRIBUTING.md',
    purpose: 'Contribution guidelines',
    priority: 'recommended',
  },
  {
    path: 'CODE_OF_CONDUCT.md',
    purpose: 'Community conduct standards',
    priority: 'recommended',
  },
  {
    path: 'SECURITY.md',
    purpose: 'Security policies',
    priority: 'recommended',
  },
  {
    path: 'CHANGELOG.md',
    purpose: 'Version history',
    priority: 'recommended',
  },
  {
    path: 'MAINTAINERS.md',
    purpose: 'Project maintainers',
    priority: 'optional',
  },
  {
    path: '.well-known/security.txt',
    purpose: 'RFC 9116 security contact',
    priority: 'recommended',
  },
];

/**
 * Analyzes community standards compliance
 */
export function analyzeCommunityStandards(existingFiles: ReadonlyArray<string>): CommunityStandards {
  const fileSet = new Set(existingFiles.map(normalizeFilePath));

  const missing: FileCheck[] = [];
  const present: string[] = [];

  // Special handling for LICENSE (accept either LICENSE or LICENSE.txt)
  const hasLicense = fileSet.has('license') || fileSet.has('license.txt') || fileSet.has('license.md');

  for (const file of STANDARD_FILES) {
    const normalized = normalizeFilePath(file.path);

    // Skip LICENSE.txt check if LICENSE exists
    if (file.path === 'LICENSE.txt' && hasLicense) {
      continue;
    }
    // Skip LICENSE check if LICENSE.txt exists
    if (file.path === 'LICENSE' && fileSet.has('license.txt')) {
      continue;
    }

    if (fileSet.has(normalized)) {
      present.push(file.path);
    } else {
      missing.push(file);
    }
  }

  const score = calculateCommunityScore(missing, present);

  return {
    missingFiles: missing,
    presentFiles: present,
    score,
  };
}

/**
 * Normalizes file paths for comparison
 */
function normalizeFilePath(path: string): string {
  return path.toLowerCase().replace(/\\/g, '/');
}

/**
 * Calculates community standards score (0-100)
 */
function calculateCommunityScore(
  missing: ReadonlyArray<FileCheck>,
  present: ReadonlyArray<string>
): number {
  let maxPoints = 0;
  let earnedPoints = 0;

  // Count LICENSE only once
  const uniqueFiles = new Set<string>();
  for (const file of STANDARD_FILES) {
    if (file.path.startsWith('LICENSE')) {
      if (!uniqueFiles.has('LICENSE')) {
        uniqueFiles.add('LICENSE');
        maxPoints += getPriorityWeight(file.priority);
      }
    } else {
      uniqueFiles.add(file.path);
      maxPoints += getPriorityWeight(file.priority);
    }
  }

  for (const file of STANDARD_FILES) {
    const normalized = normalizeFilePath(file.path);
    const isPresent = present.some(p => normalizeFilePath(p) === normalized);

    if (isPresent) {
      if (file.path.startsWith('LICENSE')) {
        // Count LICENSE only once
        const alreadyCounted = present.some(p =>
          p !== file.path && normalizeFilePath(p).startsWith('license')
        );
        if (!alreadyCounted) {
          earnedPoints += getPriorityWeight(file.priority);
        }
      } else {
        earnedPoints += getPriorityWeight(file.priority);
      }
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
 * Gets human-readable recommendations for community standards
 */
export function getCommunityRecommendations(standards: CommunityStandards): ReadonlyArray<string> {
  const recommendations: string[] = [];

  for (const missing of standards.missingFiles) {
    if (missing.priority === 'required') {
      recommendations.push(`⚠️  Required: Add ${missing.path} for ${missing.purpose}`);
    } else if (missing.priority === 'recommended') {
      recommendations.push(`💡 Recommended: Add ${missing.path} for ${missing.purpose}`);
    }
  }

  if (standards.score === 100) {
    recommendations.push('✅ Community standards are complete!');
  } else if (standards.score >= 80) {
    recommendations.push('✅ Community standards are mostly complete');
  } else if (standards.score >= 60) {
    recommendations.push('⚠️  Community standards need improvement');
  } else {
    recommendations.push('❌ Community standards are incomplete');
  }

  return recommendations;
}

/**
 * Checks if repository meets basic RSR compliance
 */
export function checkRSRCompliance(standards: CommunityStandards): boolean {
  const required = [
    'readme.md',
    'license',
    'license.txt',
    'security.md',
    'contributing.md',
    'code_of_conduct.md',
  ];

  const presentNormalized = new Set(
    standards.presentFiles.map(normalizeFilePath)
  );

  // Must have README and either LICENSE or LICENSE.txt
  const hasReadme = presentNormalized.has('readme.md');
  const hasLicense = presentNormalized.has('license') || presentNormalized.has('license.txt');
  const hasSecurity = presentNormalized.has('security.md');
  const hasContributing = presentNormalized.has('contributing.md');
  const hasCodeOfConduct = presentNormalized.has('code_of_conduct.md');

  return hasReadme && hasLicense && hasSecurity && hasContributing && hasCodeOfConduct;
}

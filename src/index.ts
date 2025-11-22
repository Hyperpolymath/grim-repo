// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * GrimRepo Scripts - Main Entry Point
 * Modular audit-grade tooling for narratable, scaffolded, and legible repositories
 */

export * from './types';
export * from './bootstrap';
export * from './community';
export * from './audit';

import type { PlatformContext, Platform, GrimRepoConfig } from './types';
import { auditRepository, generateAuditReport } from './audit';

/**
 * Default configuration
 */
const DEFAULT_CONFIG: GrimRepoConfig = {
  enabled: true,
  autoSuggest: true,
  strictMode: false,
  customDirs: [],
  customFiles: [],
};

/**
 * Detects the current platform (GitLab, GitHub, Bitbucket)
 */
export function detectPlatform(): Platform {
  const hostname = window.location.hostname.toLowerCase();

  if (hostname.includes('gitlab')) {
    return 'gitlab';
  } else if (hostname.includes('github')) {
    return 'github';
  } else if (hostname.includes('bitbucket')) {
    return 'bitbucket';
  }

  return 'unknown';
}

/**
 * Extracts repository context from current URL
 */
export function getRepositoryContext(): PlatformContext | null {
  const platform = detectPlatform();

  if (platform === 'unknown') {
    return null;
  }

  const path = window.location.pathname;
  const parts = path.split('/').filter(p => p.length > 0);

  if (parts.length < 2) {
    return null;
  }

  return {
    platform,
    repoOwner: parts[0],
    repoName: parts[1],
    currentPath: '/' + parts.slice(2).join('/'),
  };
}

/**
 * Main initialization function for userscript
 */
export function init(config: Partial<GrimRepoConfig> = {}): void {
  const finalConfig: GrimRepoConfig = { ...DEFAULT_CONFIG, ...config };

  if (!finalConfig.enabled) {
    console.log('[GrimRepo] Disabled by configuration');
    return;
  }

  const context = getRepositoryContext();

  if (!context) {
    console.log('[GrimRepo] Not on a supported platform or repository page');
    return;
  }

  console.log(`[GrimRepo] Initialized on ${context.platform} for ${context.repoOwner}/${context.repoName}`);

  // Additional initialization would go here in full userscript
  // For now, this is a minimal implementation
}

/**
 * Runs audit on provided paths and files
 * This is the main API for programmatic usage
 */
export function runAudit(paths: string[], files: string[]): string {
  const result = auditRepository(paths, files);
  return generateAuditReport(result);
}

/**
 * Version information
 */
export const VERSION = '1.0.0';

/**
 * RSR compliance self-check
 */
export function selfCheck(): void {
  const requiredFiles = [
    'README.md',
    'LICENSE.txt',
    'SECURITY.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'MAINTAINERS.md',
    'CHANGELOG.md',
    '.well-known/security.txt',
    '.well-known/ai.txt',
    '.well-known/humans.txt',
  ];

  const requiredDirs = [
    'src/',
    'tests/',
    'docs/',
    '.well-known/',
  ];

  console.log('🔍 GrimRepo Self-Check (RSR Bronze Compliance)\n');

  const result = auditRepository(requiredDirs, requiredFiles);

  console.log(`Overall Score: ${result.overallScore}/100`);
  console.log(`Quality Level: ${result.level.toUpperCase()}\n`);

  if (result.level === 'bronze' || result.level === 'silver' || result.level === 'gold' || result.level === 'rhodium') {
    console.log('✅ This repository is RSR-compliant!');
  } else {
    console.log('❌ This repository is NOT yet RSR-compliant');
  }

  console.log('\nRecommendations:');
  for (const rec of result.recommendations) {
    console.log(`  ${rec}`);
  }
}

// Auto-initialize if running in browser environment
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}

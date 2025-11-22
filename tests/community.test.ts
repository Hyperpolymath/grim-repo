// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Tests for Community Standards Helper
 */

import { analyzeCommunityStandards, getCommunityRecommendations, checkRSRCompliance } from '../src/community';

describe('analyzeCommunityStandards', () => {
  it('should identify all missing files when none exist', () => {
    const result = analyzeCommunityStandards([]);

    expect(result.missingFiles.length).toBeGreaterThan(0);
    expect(result.presentFiles.length).toBe(0);
    expect(result.score).toBeLessThan(100);
  });

  it('should identify present files correctly', () => {
    const files = ['README.md', 'LICENSE', 'CONTRIBUTING.md'];
    const result = analyzeCommunityStandards(files);

    expect(result.presentFiles.length).toBeGreaterThan(0);
    expect(result.score).toBeGreaterThan(0);
  });

  it('should handle LICENSE and LICENSE.txt as equivalent', () => {
    const withLICENSE = analyzeCommunityStandards(['README.md', 'LICENSE']);
    const withLICENSETxt = analyzeCommunityStandards(['README.md', 'LICENSE.txt']);

    // Both should have similar scores (LICENSE presence recognized either way)
    expect(Math.abs(withLICENSE.score - withLICENSETxt.score)).toBeLessThan(10);
  });

  it('should calculate perfect score when all files present', () => {
    const files = [
      'LICENSE.txt',
      'README.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'SECURITY.md',
      'CHANGELOG.md',
      'MAINTAINERS.md',
      '.well-known/security.txt',
    ];
    const result = analyzeCommunityStandards(files);

    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.missingFiles.length).toBeLessThanOrEqual(1);
  });

  it('should be case-insensitive', () => {
    const files = ['readme.md', 'license.txt', 'contributing.md'];
    const result = analyzeCommunityStandards(files);

    expect(result.presentFiles.length).toBeGreaterThan(0);
  });
});

describe('getCommunityRecommendations', () => {
  it('should recommend adding required files', () => {
    const standards = analyzeCommunityStandards([]);
    const recommendations = getCommunityRecommendations(standards);

    const hasRequiredRec = recommendations.some(r =>
      r.includes('Required') || r.includes('⚠️')
    );

    expect(hasRequiredRec).toBe(true);
  });

  it('should praise complete standards', () => {
    const files = [
      'LICENSE.txt',
      'README.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'SECURITY.md',
      'CHANGELOG.md',
      'MAINTAINERS.md',
      '.well-known/security.txt',
    ];
    const standards = analyzeCommunityStandards(files);
    const recommendations = getCommunityRecommendations(standards);

    const hasCompletionMessage = recommendations.some(r =>
      r.includes('complete')
    );

    expect(hasCompletionMessage).toBe(true);
  });
});

describe('checkRSRCompliance', () => {
  it('should return false when required files missing', () => {
    const standards = analyzeCommunityStandards([]);
    expect(checkRSRCompliance(standards)).toBe(false);
  });

  it('should return true when all RSR required files present', () => {
    const files = [
      'README.md',
      'LICENSE.txt',
      'SECURITY.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
    ];
    const standards = analyzeCommunityStandards(files);
    expect(checkRSRCompliance(standards)).toBe(true);
  });

  it('should accept LICENSE instead of LICENSE.txt', () => {
    const files = [
      'README.md',
      'LICENSE',
      'SECURITY.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
    ];
    const standards = analyzeCommunityStandards(files);
    expect(checkRSRCompliance(standards)).toBe(true);
  });
});

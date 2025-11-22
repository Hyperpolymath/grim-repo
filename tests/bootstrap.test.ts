// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Tests for Repo Structure Bootstrapper
 */

import { analyzeStructure, generateDirectoryTemplate, getStructureRecommendations } from '../src/bootstrap';

describe('analyzeStructure', () => {
  it('should identify all missing directories when none exist', () => {
    const result = analyzeStructure([]);

    expect(result.missingDirs.length).toBeGreaterThan(0);
    expect(result.presentDirs.length).toBe(0);
    expect(result.score).toBeLessThan(100);
  });

  it('should identify present directories correctly', () => {
    const paths = ['src/', 'tests/', 'docs/'];
    const result = analyzeStructure(paths);

    expect(result.presentDirs).toContain('src/');
    expect(result.presentDirs).toContain('tests/');
    expect(result.presentDirs).toContain('docs/');
    expect(result.score).toBeGreaterThan(0);
  });

  it('should handle mixed case paths', () => {
    const paths = ['SRC/', 'Tests/', 'DOCS/'];
    const result = analyzeStructure(paths);

    // Should normalize and find matches
    expect(result.presentDirs.length).toBeGreaterThan(0);
  });

  it('should calculate perfect score when all dirs present', () => {
    const paths = [
      'src/',
      'tests/',
      'docs/',
      'examples/',
      '.gitlab/',
      '.github/',
      'scripts/',
      '.well-known/',
    ];
    const result = analyzeStructure(paths);

    expect(result.score).toBe(100);
    expect(result.missingDirs.length).toBe(0);
  });

  it('should weight required directories more heavily', () => {
    const withRequired = analyzeStructure(['src/', 'tests/']);
    const withOptional = analyzeStructure(['.gitlab/', '.github/']);

    expect(withRequired.score).toBeGreaterThan(withOptional.score);
  });
});

describe('generateDirectoryTemplate', () => {
  it('should generate template for directory with explicit template', () => {
    const dir = {
      path: 'src/',
      purpose: 'Source code',
      priority: 'required' as const,
      template: '# Custom Template',
    };

    const template = generateDirectoryTemplate(dir);
    expect(template).toBe('# Custom Template');
  });

  it('should generate default template when none specified', () => {
    const dir = {
      path: 'lib/',
      purpose: 'Library code',
      priority: 'optional' as const,
    };

    const template = generateDirectoryTemplate(dir);
    expect(template).toContain('lib/');
    expect(template).toContain('Library code');
  });
});

describe('getStructureRecommendations', () => {
  it('should recommend creating required directories', () => {
    const structure = analyzeStructure([]);
    const recommendations = getStructureRecommendations(structure);

    const hasRequiredRec = recommendations.some(r =>
      r.includes('Required') || r.includes('⚠️')
    );

    expect(hasRequiredRec).toBe(true);
  });

  it('should praise perfect structure', () => {
    const paths = [
      'src/',
      'tests/',
      'docs/',
      'examples/',
      '.gitlab/',
      '.github/',
      'scripts/',
      '.well-known/',
    ];
    const structure = analyzeStructure(paths);
    const recommendations = getStructureRecommendations(structure);

    const hasCompletionMessage = recommendations.some(r =>
      r.includes('complete')
    );

    expect(hasCompletionMessage).toBe(true);
  });
});

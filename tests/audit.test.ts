// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Tests for Golden Registry Auditor
 */

import { auditRepository, generateAuditReport, generateJSONReport } from '../src/audit';

describe('auditRepository', () => {
  it('should combine structure and community analysis', () => {
    const paths = ['src/', 'tests/'];
    const files = ['README.md', 'LICENSE.txt'];

    const result = auditRepository(paths, files);

    expect(result).toHaveProperty('structure');
    expect(result).toHaveProperty('community');
    expect(result).toHaveProperty('overallScore');
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('recommendations');
  });

  it('should assign "raw" level to minimal repository', () => {
    const result = auditRepository([], []);

    expect(result.level).toBe('raw');
    expect(result.overallScore).toBeLessThan(60);
  });

  it('should assign "bronze" level to RSR-compliant repository', () => {
    const paths = ['src/', 'tests/', 'docs/', '.well-known/'];
    const files = [
      'README.md',
      'LICENSE.txt',
      'SECURITY.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'CHANGELOG.md',
    ];

    const result = auditRepository(paths, files);

    expect(result.level).toMatch(/bronze|silver|gold|rhodium/);
    expect(result.overallScore).toBeGreaterThanOrEqual(60);
  });

  it('should assign higher levels to more complete repositories', () => {
    const fullPaths = [
      'src/',
      'tests/',
      'docs/',
      'examples/',
      '.gitlab/',
      '.github/',
      'scripts/',
      '.well-known/',
    ];
    const fullFiles = [
      'LICENSE.txt',
      'README.md',
      'CONTRIBUTING.md',
      'CODE_OF_CONDUCT.md',
      'SECURITY.md',
      'CHANGELOG.md',
      'MAINTAINERS.md',
      '.well-known/security.txt',
    ];

    const result = auditRepository(fullPaths, fullFiles);

    expect(result.level).toMatch(/gold|rhodium/);
    expect(result.overallScore).toBeGreaterThanOrEqual(85);
  });

  it('should provide recommendations', () => {
    const result = auditRepository([], []);

    expect(result.recommendations.length).toBeGreaterThan(0);
  });
});

describe('generateAuditReport', () => {
  it('should generate markdown report', () => {
    const paths = ['src/'];
    const files = ['README.md'];
    const audit = auditRepository(paths, files);

    const report = generateAuditReport(audit);

    expect(report).toContain('# GrimRepo Audit Report');
    expect(report).toContain('Overall Score');
    expect(report).toContain('Quality Level');
    expect(report).toContain('Structure Analysis');
    expect(report).toContain('Community Standards Analysis');
    expect(report).toContain('Recommendations');
  });

  it('should include scores in report', () => {
    const audit = auditRepository(['src/'], ['README.md']);
    const report = generateAuditReport(audit);

    expect(report).toMatch(/\d+\/100/);
  });
});

describe('generateJSONReport', () => {
  it('should generate valid JSON', () => {
    const audit = auditRepository(['src/'], ['README.md']);
    const json = generateJSONReport(audit);

    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('should include all audit properties', () => {
    const audit = auditRepository(['src/'], ['README.md']);
    const json = generateJSONReport(audit);
    const parsed = JSON.parse(json);

    expect(parsed).toHaveProperty('structure');
    expect(parsed).toHaveProperty('community');
    expect(parsed).toHaveProperty('overallScore');
    expect(parsed).toHaveProperty('level');
    expect(parsed).toHaveProperty('recommendations');
  });
});

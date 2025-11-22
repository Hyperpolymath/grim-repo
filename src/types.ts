// SPDX-License-Identifier: MIT AND Palimpsest-0.8
/**
 * Shared type definitions for GrimRepo
 */

/**
 * Repository structure analysis result
 */
export interface RepoStructure {
  readonly missingDirs: ReadonlyArray<DirectoryCheck>;
  readonly presentDirs: ReadonlyArray<string>;
  readonly score: number;
}

/**
 * Directory presence check
 */
export interface DirectoryCheck {
  readonly path: string;
  readonly purpose: string;
  readonly priority: 'required' | 'recommended' | 'optional';
  readonly template?: string;
}

/**
 * Community standards audit result
 */
export interface CommunityStandards {
  readonly missingFiles: ReadonlyArray<FileCheck>;
  readonly presentFiles: ReadonlyArray<string>;
  readonly score: number;
}

/**
 * File presence check
 */
export interface FileCheck {
  readonly path: string;
  readonly purpose: string;
  readonly priority: 'required' | 'recommended' | 'optional';
  readonly template?: string;
}

/**
 * Repository audit result
 */
export interface AuditResult {
  readonly structure: RepoStructure;
  readonly community: CommunityStandards;
  readonly overallScore: number;
  readonly level: 'raw' | 'bronze' | 'silver' | 'gold' | 'rhodium';
  readonly recommendations: ReadonlyArray<string>;
}

/**
 * Configuration for GrimRepo tools
 */
export interface GrimRepoConfig {
  readonly enabled: boolean;
  readonly autoSuggest: boolean;
  readonly strictMode: boolean;
  readonly customDirs: ReadonlyArray<DirectoryCheck>;
  readonly customFiles: ReadonlyArray<FileCheck>;
}

/**
 * Platform detection
 */
export type Platform = 'gitlab' | 'github' | 'bitbucket' | 'unknown';

/**
 * Platform context
 */
export interface PlatformContext {
  readonly platform: Platform;
  readonly repoOwner: string;
  readonly repoName: string;
  readonly currentPath: string;
}

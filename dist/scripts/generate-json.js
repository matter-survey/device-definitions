#!/usr/bin/env tsx
/**
 * Generate JSON Registry
 *
 * This script generates the device-registry.json file from TypeScript definitions.
 * The JSON file is included in the npm package for Python/non-JS consumers.
 *
 * Usage:
 *   npm run build:json
 *   tsx src/scripts/generate-json.ts
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRegistry } from '../index.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '../../dist');
const OUTPUT_PATH = join(DIST_DIR, 'device-registry.json');
function main() {
    console.log('Generating device registry JSON...');
    // Ensure dist directory exists
    if (!existsSync(DIST_DIR)) {
        mkdirSync(DIST_DIR, { recursive: true });
    }
    // Build the registry
    const registry = buildRegistry();
    // Write JSON with pretty formatting
    const json = JSON.stringify(registry, null, 2);
    writeFileSync(OUTPUT_PATH, json, 'utf-8');
    // Log statistics
    console.log(`  Devices: ${registry.devices.length}`);
    console.log(`  Clusters: ${registry.clusters.length}`);
    console.log(`  Output: ${OUTPUT_PATH}`);
    console.log('Done!');
}
main();
//# sourceMappingURL=generate-json.js.map
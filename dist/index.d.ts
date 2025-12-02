/**
 * Matter Device Definitions
 *
 * A registry of proprietary Matter device metadata for clusters, attributes,
 * and device definitions that aren't covered by the standard Matter specification.
 *
 * @example
 * ```typescript
 * import { allDevices, findDevice, getCluster } from '@matter-survey/device-definitions';
 *
 * // Find a device by vendor ID and clusters
 * const device = findDevice(4874, [0x130AFC01]);
 *
 * // Get cluster metadata
 * const cluster = getCluster(0x130AFC01);
 * ```
 */
export * from './types.js';
export * from './vendors/index.js';
import type { DeviceDefinition, ClusterDefinition, DeviceRegistry } from './types.js';
/** All device definitions from all vendors */
export declare const allDevices: DeviceDefinition[];
/** All cluster definitions from all vendors */
export declare const allClusters: ClusterDefinition[];
/**
 * Find a device definition by fingerprint matching.
 *
 * @param vendorId - Matter vendor ID
 * @param clusterIds - Cluster IDs present on the device
 * @param deviceTypes - Device type IDs present on the device
 * @returns Matching device definition or undefined
 */
export declare function findDevice(vendorId: number, clusterIds?: number[], deviceTypes?: number[]): DeviceDefinition | undefined;
/**
 * Get a cluster definition by ID.
 *
 * @param clusterId - Cluster ID to look up
 * @returns Cluster definition or undefined
 */
export declare function getCluster(clusterId: number): ClusterDefinition | undefined;
/**
 * Get all clusters for a specific vendor.
 *
 * @param vendorId - Vendor ID
 * @returns Array of cluster definitions
 */
export declare function getVendorClusters(vendorId: number): ClusterDefinition[];
/**
 * Get all devices for a specific vendor.
 *
 * @param vendorId - Vendor ID
 * @returns Array of device definitions
 */
export declare function getVendorDevices(vendorId: number): DeviceDefinition[];
/**
 * Build the complete device registry.
 * Used by the JSON generation script.
 *
 * @returns Complete device registry
 */
export declare function buildRegistry(): DeviceRegistry;
//# sourceMappingURL=index.d.ts.map
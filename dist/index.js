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
// Re-export all types
export * from './types.js';
// Re-export vendor definitions
export * from './vendors/index.js';
import { eveDevices, eveClusters } from './vendors/eve.js';
import { aqaraDevices, aqaraClusters } from './vendors/aqara.js';
// =============================================================================
// Registry
// =============================================================================
/** All device definitions from all vendors */
export const allDevices = [...eveDevices, ...aqaraDevices];
/** All cluster definitions from all vendors */
export const allClusters = [
    ...eveClusters,
    ...aqaraClusters,
];
// =============================================================================
// Lookup Functions
// =============================================================================
/**
 * Find a device definition by fingerprint matching.
 *
 * @param vendorId - Matter vendor ID
 * @param clusterIds - Cluster IDs present on the device
 * @param deviceTypes - Device type IDs present on the device
 * @returns Matching device definition or undefined
 */
export function findDevice(vendorId, clusterIds, deviceTypes) {
    return allDevices.find((device) => {
        const fp = device.fingerprint;
        // Vendor ID must match
        if (fp.vendorId !== vendorId) {
            return false;
        }
        // If required clusters are specified, all must be present
        if (fp.requiredClusters && clusterIds) {
            const hasAllClusters = fp.requiredClusters.every((id) => clusterIds.includes(id));
            if (!hasAllClusters) {
                return false;
            }
        }
        // If required device types are specified, all must be present
        if (fp.requiredDeviceTypes && deviceTypes) {
            const hasAllTypes = fp.requiredDeviceTypes.every((id) => deviceTypes.includes(id));
            if (!hasAllTypes) {
                return false;
            }
        }
        return true;
    });
}
/**
 * Get a cluster definition by ID.
 *
 * @param clusterId - Cluster ID to look up
 * @returns Cluster definition or undefined
 */
export function getCluster(clusterId) {
    return allClusters.find((cluster) => cluster.id === clusterId);
}
/**
 * Get all clusters for a specific vendor.
 *
 * @param vendorId - Vendor ID
 * @returns Array of cluster definitions
 */
export function getVendorClusters(vendorId) {
    return allClusters.filter((cluster) => cluster.vendorId === vendorId);
}
/**
 * Get all devices for a specific vendor.
 *
 * @param vendorId - Vendor ID
 * @returns Array of device definitions
 */
export function getVendorDevices(vendorId) {
    return allDevices.filter((device) => device.fingerprint.vendorId === vendorId);
}
/**
 * Build the complete device registry.
 * Used by the JSON generation script.
 *
 * @returns Complete device registry
 */
export function buildRegistry() {
    return {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        devices: allDevices,
        clusters: allClusters,
    };
}
//# sourceMappingURL=index.js.map
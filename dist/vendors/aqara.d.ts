/**
 * Aqara Device Definitions
 *
 * Vendor ID: 4447 (0x115F)
 * https://www.aqara.com
 *
 * Known proprietary clusters:
 * - 0x115FFC02: Lock settings cluster (found on U200 Smart Lock)
 * - 0x134BFC00: Unknown cluster (found on U200 endpoint 0)
 */
import type { ClusterDefinition, DeviceDefinition, DeviceExtension } from '../types.js';
export declare const AQARA_VENDOR_ID = 4447;
export declare const AQARA_VENDOR_PREFIX = 291438592;
export declare const AQARA_LOCK_CLUSTER_ID = 291503106;
export declare const AQARA_UNKNOWN_CLUSTER_ID = 323746816;
/**
 * Aqara Lock Settings Cluster (0x115FFC02)
 *
 * Found on Aqara U200 Smart Lock, endpoint 1.
 * Attribute IDs and meanings are not fully documented.
 *
 * Discovered attributes:
 * - 0x115F0011: uint8 (value: 1) - possibly lock mode
 * - 0x115F0012: uint8 (value: 2) - possibly sound setting
 * - 0x115F0013: uint8 (value: 0) - unknown
 * - 0x115F0014: uint8 (value: 0) - unknown
 * - 0x115F0015: uint8 (value: 1) - unknown
 */
export declare const aqaraLockCluster: ClusterDefinition;
/**
 * Aqara Unknown Cluster (0x134BFC00)
 *
 * Found on Aqara U200 Smart Lock, endpoint 0 (Root Node).
 * Purpose unknown.
 */
export declare const aqaraUnknownCluster: ClusterDefinition;
/**
 * Aqara Lock Settings extension
 */
export declare const aqaraLockExtension: DeviceExtension;
/**
 * Aqara Smart Lock U200
 *
 * Smart lock with Matter support, fingerprint reader, and NFC.
 */
export declare const aqaraU200Lock: DeviceDefinition;
/**
 * Aqara Climate Sensor W100
 *
 * Temperature and humidity sensor with Matter support.
 * Uses only standard Matter clusters.
 */
export declare const aqaraW100: DeviceDefinition;
/** All Aqara clusters */
export declare const aqaraClusters: ClusterDefinition[];
/** All Aqara devices */
export declare const aqaraDevices: DeviceDefinition[];
//# sourceMappingURL=aqara.d.ts.map
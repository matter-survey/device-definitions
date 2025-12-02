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
// =============================================================================
// Constants
// =============================================================================
export const AQARA_VENDOR_ID = 4447;
export const AQARA_VENDOR_PREFIX = 0x115f0000;
// Aqara proprietary cluster IDs (discovered via inspection)
export const AQARA_LOCK_CLUSTER_ID = 0x115ffc02;
export const AQARA_UNKNOWN_CLUSTER_ID = 0x134bfc00;
// =============================================================================
// Clusters
// =============================================================================
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
export const aqaraLockCluster = {
    id: AQARA_LOCK_CLUSTER_ID,
    vendorId: AQARA_VENDOR_ID,
    name: 'Aqara Lock Settings',
    description: 'Aqara proprietary lock settings cluster. Attribute meanings are partially documented.',
    attributes: [
        {
            id: 0x115f0011,
            name: 'setting1',
            type: 'uint8',
            access: ['R'],
            description: 'Unknown setting (possibly lock mode). Observed value: 1',
        },
        {
            id: 0x115f0012,
            name: 'setting2',
            type: 'uint8',
            access: ['R'],
            description: 'Unknown setting (possibly sound). Observed value: 2',
        },
        {
            id: 0x115f0013,
            name: 'setting3',
            type: 'uint8',
            access: ['R'],
            description: 'Unknown setting. Observed value: 0',
        },
        {
            id: 0x115f0014,
            name: 'setting4',
            type: 'uint8',
            access: ['R'],
            description: 'Unknown setting. Observed value: 0',
        },
        {
            id: 0x115f0015,
            name: 'setting5',
            type: 'uint8',
            access: ['R'],
            description: 'Unknown setting. Observed value: 1',
        },
    ],
};
/**
 * Aqara Unknown Cluster (0x134BFC00)
 *
 * Found on Aqara U200 Smart Lock, endpoint 0 (Root Node).
 * Purpose unknown.
 */
export const aqaraUnknownCluster = {
    id: AQARA_UNKNOWN_CLUSTER_ID,
    vendorId: AQARA_VENDOR_ID,
    name: 'Aqara Unknown',
    description: 'Unknown Aqara proprietary cluster found on endpoint 0',
    attributes: [
        {
            id: 0x134b0000,
            name: 'unknown',
            type: 'bool',
            access: ['R'],
            description: 'Unknown boolean attribute. Observed value: true',
        },
    ],
};
// =============================================================================
// Extensions
// =============================================================================
/**
 * Aqara Lock Settings extension
 */
export const aqaraLockExtension = {
    name: 'aqaraLockSettings',
    clusters: [aqaraLockCluster, aqaraUnknownCluster],
    showInDetails: true,
};
// =============================================================================
// Devices
// =============================================================================
/**
 * Aqara Smart Lock U200
 *
 * Smart lock with Matter support, fingerprint reader, and NFC.
 */
export const aqaraU200Lock = {
    id: 'aqara_u200',
    fingerprint: {
        vendorId: AQARA_VENDOR_ID,
        requiredClusters: [AQARA_LOCK_CLUSTER_ID],
        requiredDeviceTypes: [10], // Door Lock
    },
    vendor: 'Aqara',
    model: 'Smart Lock U200',
    description: 'Smart lock with Matter, fingerprint reader, NFC, and smartphone unlock',
    extends: [aqaraLockExtension],
    productUrl: 'https://www.aqara.com/eu/product/smart-lock-u200',
};
/**
 * Aqara Climate Sensor W100
 *
 * Temperature and humidity sensor with Matter support.
 * Uses only standard Matter clusters.
 */
export const aqaraW100 = {
    id: 'aqara_w100',
    fingerprint: {
        vendorId: AQARA_VENDOR_ID,
        productNamePattern: 'W100',
        requiredDeviceTypes: [770], // Temperature Sensor
    },
    vendor: 'Aqara',
    model: 'Climate Sensor W100',
    description: 'Temperature and humidity sensor with Matter support. Uses standard clusters only.',
    productUrl: 'https://www.aqara.com/eu/product/temperature-humidity-sensor-w100',
};
// =============================================================================
// Exports
// =============================================================================
/** All Aqara clusters */
export const aqaraClusters = [
    aqaraLockCluster,
    aqaraUnknownCluster,
];
/** All Aqara devices */
export const aqaraDevices = [aqaraU200Lock, aqaraW100];
//# sourceMappingURL=aqara.js.map
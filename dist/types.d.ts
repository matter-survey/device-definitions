/**
 * Matter Device Definitions - Core Types
 *
 * This module defines the TypeScript types for proprietary Matter device metadata.
 * These types describe vendor-specific clusters, attributes, and device fingerprints
 * that aren't covered by the standard Matter specification.
 */
/**
 * Device fingerprint for matching physical devices to definitions.
 * At minimum, vendorId is required. Other fields narrow the match.
 */
export interface DeviceFingerprint {
    /** Matter vendor ID (e.g., 4874 for Eve Systems) */
    vendorId: number;
    /** Optional Matter product ID */
    productId?: number;
    /** Optional regex pattern to match product name */
    productNamePattern?: string;
    /** Cluster IDs that must be present on the device */
    requiredClusters?: number[];
    /** Device type IDs that must be present (e.g., 769 for Thermostat) */
    requiredDeviceTypes?: number[];
}
/**
 * Primitive attribute types supported by Matter
 */
export type PrimitiveAttributeType = 'bool' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'int8' | 'int16' | 'int32' | 'int64' | 'float' | 'double' | 'string' | 'bytes';
/**
 * Enum attribute type with named values
 */
export interface EnumAttributeType {
    type: 'enum';
    /** Mapping of numeric values to human-readable names */
    values: Record<number, string>;
}
/**
 * Bitmap attribute type with named bits
 */
export interface BitmapAttributeType {
    type: 'bitmap';
    /** Mapping of bit positions to human-readable names */
    bits: Record<number, string>;
}
/**
 * Blob attribute type that requires custom parsing
 */
export interface BlobAttributeType {
    type: 'blob';
    /** Parser identifier (e.g., "eve.schedule") */
    parser: string;
}
/**
 * All supported attribute types
 */
export type AttributeType = PrimitiveAttributeType | EnumAttributeType | BitmapAttributeType | BlobAttributeType;
/**
 * Attribute access modes
 */
export type AttributeAccess = 'R' | 'W' | 'S';
/**
 * Attribute definition within a cluster
 */
export interface AttributeDefinition {
    /** Attribute ID (may include vendor prefix for proprietary attributes) */
    id: number;
    /** Human-readable attribute name */
    name: string;
    /** Attribute data type */
    type: AttributeType;
    /** Access modes: R=Read, W=Write, S=Subscribe */
    access: AttributeAccess[];
    /** Optional description */
    description?: string;
    /** Optional unit (e.g., "%", "C", "ms") */
    unit?: string;
    /** Optional parser reference for complex types */
    parser?: string;
}
/**
 * Cluster definition (standard or vendor-specific)
 */
export interface ClusterDefinition {
    /** Cluster ID (vendor-specific clusters have vendor prefix in upper bits) */
    id: number;
    /** Vendor ID for vendor-specific clusters */
    vendorId?: number;
    /** Human-readable cluster name */
    name: string;
    /** Optional description */
    description?: string;
    /** Attributes defined by this cluster */
    attributes: AttributeDefinition[];
}
/**
 * Device extension - a composable feature that can be mixed into devices.
 * Inspired by zigbee2mqtt's "extends" pattern.
 */
export interface DeviceExtension {
    /** Extension name (e.g., "thermostatSchedule") */
    name: string;
    /** Clusters provided by this extension */
    clusters: ClusterDefinition[];
    /** Optional UI component to render for this extension */
    uiComponent?: string;
    /** Whether to show in device details panel */
    showInDetails?: boolean;
}
/**
 * Full device definition
 */
export interface DeviceDefinition {
    /** Unique device ID (e.g., "eve_thermo") */
    id: string;
    /** Fingerprint for matching physical devices */
    fingerprint: DeviceFingerprint;
    /** Vendor name */
    vendor: string;
    /** Model name */
    model: string;
    /** Optional description */
    description?: string;
    /** Extensions this device supports */
    extends?: DeviceExtension[];
    /** Optional product URL */
    productUrl?: string;
    /** Optional image URL */
    imageUrl?: string;
}
/**
 * Device registry containing all known devices
 */
export interface DeviceRegistry {
    /** Schema version */
    version: string;
    /** ISO 8601 timestamp of generation */
    generatedAt: string;
    /** All device definitions */
    devices: DeviceDefinition[];
    /** All cluster definitions (for lookup) */
    clusters: ClusterDefinition[];
}
//# sourceMappingURL=types.d.ts.map
/**
 * Eve Systems Device Definitions
 *
 * Vendor ID: 4874 (0x130A)
 * https://www.evehome.com
 *
 * Known proprietary clusters:
 * - Eve Thermo (0x130AFC01): Thermostat schedule and valve data
 */
import type { ClusterDefinition, DeviceDefinition, DeviceExtension } from '../types.js';
export declare const EVE_VENDOR_ID = 4874;
export declare const EVE_VENDOR_PREFIX = 319422464;
export declare const EVE_THERMO_CLUSTER_ID = 319486977;
export declare const EVE_ATTR_SCHEDULE = 319422464;
export declare const EVE_ATTR_VALVE_POSITION = 319422488;
export declare const EVE_ATTR_TEMPERATURE_OFFSET = 319422480;
/**
 * Eve Thermo proprietary cluster
 *
 * Contains heating schedule and valve state information.
 * The schedule attribute is a binary blob with TLV-like encoding.
 */
export declare const eveThermoCluster: ClusterDefinition;
/**
 * Eve Thermostat Schedule extension
 *
 * Provides heating schedule functionality for Eve Thermo devices.
 */
export declare const eveThermoScheduleExtension: DeviceExtension;
/**
 * Eve Thermo - Smart radiator valve
 *
 * Features:
 * - Thread/Matter connectivity
 * - Weekly heating schedule
 * - Valve position reporting
 * - Temperature calibration
 */
export declare const eveThermo: DeviceDefinition;
/** All Eve clusters */
export declare const eveClusters: ClusterDefinition[];
/** All Eve devices */
export declare const eveDevices: DeviceDefinition[];
//# sourceMappingURL=eve.d.ts.map
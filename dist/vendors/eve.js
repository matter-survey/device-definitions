/**
 * Eve Systems Device Definitions
 *
 * Vendor ID: 4874 (0x130A)
 * https://www.evehome.com
 *
 * Known proprietary clusters:
 * - Eve Thermo (0x130AFC01): Thermostat schedule and valve data
 */
// =============================================================================
// Constants
// =============================================================================
export const EVE_VENDOR_ID = 4874;
export const EVE_VENDOR_PREFIX = 0x130a0000;
// Eve Thermo proprietary cluster
export const EVE_THERMO_CLUSTER_ID = 0x130afc01;
// Eve Thermo attribute IDs
export const EVE_ATTR_SCHEDULE = 0x130a0000;
export const EVE_ATTR_VALVE_POSITION = 0x130a0018;
export const EVE_ATTR_TEMPERATURE_OFFSET = 0x130a0010;
// =============================================================================
// Clusters
// =============================================================================
/**
 * Eve Thermo proprietary cluster
 *
 * Contains heating schedule and valve state information.
 * The schedule attribute is a binary blob with TLV-like encoding.
 */
export const eveThermoCluster = {
    id: EVE_THERMO_CLUSTER_ID,
    vendorId: EVE_VENDOR_ID,
    name: 'Eve Thermo',
    description: 'Eve thermostat proprietary cluster for schedule and valve data',
    attributes: [
        {
            id: EVE_ATTR_SCHEDULE,
            name: 'schedule',
            type: { type: 'blob', parser: 'eve.schedule' },
            access: ['R'],
            description: 'Heating schedule binary data. Contains weekly schedule with day entries and time slots.',
            parser: 'eve.schedule',
        },
        {
            id: EVE_ATTR_VALVE_POSITION,
            name: 'valvePosition',
            type: 'uint8',
            access: ['R', 'S'],
            description: 'Current valve opening position',
            unit: '%',
            sensor: {
                entityType: 'sensor',
                stateClass: 'measurement',
                entityCategory: 'diagnostic',
                icon: 'mdi:valve',
            },
        },
        {
            id: EVE_ATTR_TEMPERATURE_OFFSET,
            name: 'temperatureOffset',
            type: 'int8',
            access: ['R', 'W'],
            description: 'Temperature calibration offset. Value in 0.1°C increments.',
            unit: '°C',
            sensor: {
                entityType: 'number',
                deviceClass: 'temperature',
                entityCategory: 'config',
                scale: 0.1,
                icon: 'mdi:thermometer-plus',
            },
        },
    ],
};
// =============================================================================
// Extensions
// =============================================================================
/**
 * Eve Thermostat Schedule extension
 *
 * Provides heating schedule functionality for Eve Thermo devices.
 */
export const eveThermoScheduleExtension = {
    name: 'thermostatSchedule',
    clusters: [eveThermoCluster],
    uiComponent: 'eve-schedule',
    showInDetails: true,
};
// =============================================================================
// Devices
// =============================================================================
/**
 * Eve Thermo - Smart radiator valve
 *
 * Features:
 * - Thread/Matter connectivity
 * - Weekly heating schedule
 * - Valve position reporting
 * - Temperature calibration
 */
export const eveThermo = {
    id: 'eve_thermo',
    fingerprint: {
        vendorId: EVE_VENDOR_ID,
        requiredClusters: [EVE_THERMO_CLUSTER_ID],
        requiredDeviceTypes: [769], // Thermostat
    },
    vendor: 'Eve Systems',
    model: 'Eve Thermo',
    description: 'Smart radiator valve with Thread/Matter, HomeKit and weekly heating schedules',
    extends: [eveThermoScheduleExtension],
    productUrl: 'https://www.evehome.com/eve-thermo',
};
// =============================================================================
// Exports
// =============================================================================
/** All Eve clusters */
export const eveClusters = [eveThermoCluster];
/** All Eve devices */
export const eveDevices = [eveThermo];
//# sourceMappingURL=eve.js.map
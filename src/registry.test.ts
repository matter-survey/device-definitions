import { describe, it, expect } from 'vitest';
import {
  allDevices,
  allClusters,
  findDevice,
  getCluster,
  getVendorDevices,
  getVendorClusters,
  buildRegistry,
  EVE_VENDOR_ID,
  EVE_THERMO_CLUSTER_ID,
  AQARA_VENDOR_ID,
} from './index.js';

describe('Registry Contents', () => {
  it('should have at least one device', () => {
    expect(allDevices.length).toBeGreaterThan(0);
  });

  it('should have at least one cluster', () => {
    expect(allClusters.length).toBeGreaterThan(0);
  });

  it('should have unique device IDs', () => {
    const ids = allDevices.map((d) => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique cluster IDs', () => {
    const ids = allClusters.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all devices should have required fields', () => {
    for (const device of allDevices) {
      expect(device.id).toBeDefined();
      expect(device.id.length).toBeGreaterThan(0);
      expect(device.vendor).toBeDefined();
      expect(device.model).toBeDefined();
      expect(device.fingerprint).toBeDefined();
      expect(device.fingerprint.vendorId).toBeDefined();
      expect(typeof device.fingerprint.vendorId).toBe('number');
    }
  });

  it('all clusters should have required fields', () => {
    for (const cluster of allClusters) {
      expect(cluster.id).toBeDefined();
      expect(typeof cluster.id).toBe('number');
      expect(cluster.name).toBeDefined();
      expect(cluster.attributes).toBeDefined();
      expect(Array.isArray(cluster.attributes)).toBe(true);
    }
  });

  it('all attributes should have required fields', () => {
    for (const cluster of allClusters) {
      for (const attr of cluster.attributes) {
        expect(attr.id).toBeDefined();
        expect(typeof attr.id).toBe('number');
        expect(attr.name).toBeDefined();
        expect(attr.type).toBeDefined();
        expect(attr.access).toBeDefined();
        expect(Array.isArray(attr.access)).toBe(true);
        expect(attr.access.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('findDevice', () => {
  it('should find Eve Thermo by vendor ID and cluster', () => {
    const device = findDevice(EVE_VENDOR_ID, [EVE_THERMO_CLUSTER_ID]);
    expect(device).toBeDefined();
    expect(device?.id).toBe('eve_thermo');
  });

  it('should find Eve Thermo by vendor ID and device type', () => {
    const device = findDevice(EVE_VENDOR_ID, undefined, [769]);
    expect(device).toBeDefined();
    expect(device?.id).toBe('eve_thermo');
  });

  it('should return undefined for unknown vendor', () => {
    const device = findDevice(99999);
    expect(device).toBeUndefined();
  });

  it('should return undefined for missing required cluster', () => {
    const device = findDevice(EVE_VENDOR_ID, [0x12345678]);
    expect(device).toBeUndefined();
  });
});

describe('getCluster', () => {
  it('should find Eve Thermo cluster', () => {
    const cluster = getCluster(EVE_THERMO_CLUSTER_ID);
    expect(cluster).toBeDefined();
    expect(cluster?.name).toBe('Eve Thermo');
    expect(cluster?.vendorId).toBe(EVE_VENDOR_ID);
  });

  it('should return undefined for unknown cluster', () => {
    const cluster = getCluster(0x99999999);
    expect(cluster).toBeUndefined();
  });
});

describe('getVendorDevices', () => {
  it('should return Eve devices', () => {
    const devices = getVendorDevices(EVE_VENDOR_ID);
    expect(devices.length).toBeGreaterThan(0);
    expect(devices.every((d) => d.fingerprint.vendorId === EVE_VENDOR_ID)).toBe(
      true
    );
  });

  it('should return Aqara devices', () => {
    const devices = getVendorDevices(AQARA_VENDOR_ID);
    expect(devices.length).toBeGreaterThan(0);
    expect(
      devices.every((d) => d.fingerprint.vendorId === AQARA_VENDOR_ID)
    ).toBe(true);
  });

  it('should return empty array for unknown vendor', () => {
    const devices = getVendorDevices(99999);
    expect(devices).toEqual([]);
  });
});

describe('getVendorClusters', () => {
  it('should return Eve clusters', () => {
    const clusters = getVendorClusters(EVE_VENDOR_ID);
    expect(clusters.length).toBeGreaterThan(0);
    expect(clusters.every((c) => c.vendorId === EVE_VENDOR_ID)).toBe(true);
  });

  it('should return Aqara clusters', () => {
    const clusters = getVendorClusters(AQARA_VENDOR_ID);
    expect(clusters.length).toBeGreaterThan(0);
    expect(clusters.every((c) => c.vendorId === AQARA_VENDOR_ID)).toBe(true);
  });
});

describe('buildRegistry', () => {
  it('should build a complete registry', () => {
    const registry = buildRegistry();

    expect(registry.version).toBeDefined();
    expect(registry.generatedAt).toBeDefined();
    expect(registry.devices).toBeDefined();
    expect(registry.clusters).toBeDefined();

    // Verify ISO 8601 timestamp
    expect(() => new Date(registry.generatedAt)).not.toThrow();
  });

  it('registry should contain all devices', () => {
    const registry = buildRegistry();
    expect(registry.devices.length).toBe(allDevices.length);
  });

  it('registry should contain all clusters', () => {
    const registry = buildRegistry();
    expect(registry.clusters.length).toBe(allClusters.length);
  });
});

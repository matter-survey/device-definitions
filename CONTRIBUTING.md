# Contributing to Matter Device Definitions

Thank you for your interest in contributing! This guide will help you add new device definitions.

## Quick Start

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create or update a vendor file in `src/vendors/`
4. Run tests: `npm test`
5. Submit a pull request

## Adding a New Device

### 1. Identify the Vendor

Each vendor has their own file in `src/vendors/`. If your vendor doesn't exist yet, create a new file.

Vendor IDs can be found in the Matter specification or by inspecting your device with tools like the [Matter Binding Helper](https://github.com/cedricziel/ha-matter-helper).

### 2. Document Proprietary Clusters

If your device has proprietary (vendor-specific) clusters:

```typescript
export const myCluster: ClusterDefinition = {
  id: 0x12345FC01,           // Full cluster ID
  vendorId: MY_VENDOR_ID,     // Your vendor ID
  name: 'My Cluster Name',
  description: 'What this cluster does',
  attributes: [
    {
      id: 0x12340001,
      name: 'attributeName',
      type: 'uint8',          // See AttributeType below
      access: ['R'],          // R=Read, W=Write, S=Subscribe
      description: 'What this attribute does',
      unit: '%',              // Optional unit
    },
  ],
};
```

### 3. Create Device Definition

```typescript
export const myDevice: DeviceDefinition = {
  id: 'vendor_model',         // Unique ID (lowercase, underscores)
  fingerprint: {
    vendorId: MY_VENDOR_ID,
    requiredClusters: [0x12345FC01],  // Clusters that identify this device
    requiredDeviceTypes: [769],        // Optional: Matter device types
  },
  vendor: 'Vendor Name',
  model: 'Model Name',
  description: 'Brief description',
  extends: [myExtension],      // Optional: Reusable extensions
  productUrl: 'https://...',   // Optional: Product page
};
```

### 4. Export from Vendor Index

Add to `src/vendors/index.ts`:

```typescript
export * from './myvendor.js';
export { myDevices, myClusters } from './myvendor.js';
```

### 5. Update Main Index

Add to `src/index.ts`:

```typescript
import { myDevices, myClusters } from './vendors/myvendor.js';

export const allDevices: DeviceDefinition[] = [
  ...eveDevices,
  ...aqaraDevices,
  ...myDevices,  // Add here
];

export const allClusters: ClusterDefinition[] = [
  ...eveClusters,
  ...aqaraClusters,
  ...myClusters,  // Add here
];
```

## Attribute Types

### Primitive Types

- `'bool'` - Boolean
- `'uint8'`, `'uint16'`, `'uint32'`, `'uint64'` - Unsigned integers
- `'int8'`, `'int16'`, `'int32'`, `'int64'` - Signed integers
- `'float'`, `'double'` - Floating point
- `'string'` - UTF-8 string
- `'bytes'` - Raw bytes

### Enum Type

For attributes with named values:

```typescript
type: {
  type: 'enum',
  values: {
    0: 'Off',
    1: 'On',
    2: 'Auto',
  },
}
```

### Bitmap Type

For bit flags:

```typescript
type: {
  type: 'bitmap',
  bits: {
    0: 'Flag A',
    1: 'Flag B',
    2: 'Flag C',
  },
}
```

### Blob Type

For binary data requiring custom parsing:

```typescript
type: {
  type: 'blob',
  parser: 'vendor.parser_name',  // Reference to parser
}
```

## Documenting Unknown Attributes

If you discover proprietary clusters but don't know what the attributes mean, document them anyway:

```typescript
{
  id: 0x12340001,
  name: 'unknown1',
  type: 'uint8',
  access: ['R'],
  description: 'Unknown attribute. Observed value: 42',
}
```

This helps others who may have more information.

## Testing

Run tests before submitting:

```bash
npm test
```

Tests verify:
- All devices have required fields
- All clusters have required fields
- Device IDs are unique
- Cluster IDs are unique
- Lookup functions work correctly

## Code Style

- Use TypeScript strict mode
- Document exported items with JSDoc
- Use descriptive names
- Include units where applicable

## Questions?

- Open an issue on GitHub
- Check existing vendor files for examples

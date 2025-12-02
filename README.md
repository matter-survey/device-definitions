# Matter Device Definitions

A community-maintained registry of proprietary Matter device metadata. Captures vendor-specific clusters, attributes, and device fingerprints that aren't covered by the standard Matter specification.

## Installation

```bash
npm install @matter-survey/device-definitions
```

## Usage

### TypeScript/JavaScript

```typescript
import {
  findDevice,
  getCluster,
  allDevices,
  allClusters,
  EVE_VENDOR_ID,
  EVE_THERMO_CLUSTER_ID,
} from '@matter-survey/device-definitions';

// Find a device by vendor ID and clusters
const device = findDevice(4874, [0x130AFC01]);
console.log(device?.model); // "Eve Thermo"

// Get cluster metadata
const cluster = getCluster(0x130AFC01);
console.log(cluster?.name); // "Eve Thermo"
console.log(cluster?.attributes); // [{ id: 0x130A0000, name: "schedule", ... }, ...]

// Iterate all devices
for (const device of allDevices) {
  console.log(`${device.vendor} ${device.model}`);
}
```

### Python / Non-JS Consumers

Import the generated JSON registry:

```python
import json
import urllib.request

# Option 1: Fetch from unpkg CDN
url = "https://unpkg.com/@matter-survey/device-definitions/dist/device-registry.json"
with urllib.request.urlopen(url) as response:
    registry = json.loads(response.read())

# Option 2: Bundle in your package
with open("device-registry.json") as f:
    registry = json.load(f)

# Use the registry
for device in registry["devices"]:
    print(f"{device['vendor']} {device['model']}")
```

## Supported Vendors

| Vendor | ID | Devices |
|--------|-----|---------|
| Eve Systems | 4874 | Eve Thermo |
| Aqara | 4447 | Smart Lock U200, Climate Sensor W100 |

## Contributing

We welcome contributions! Adding a new device is as simple as creating a vendor file.

### Adding a New Vendor

1. Create `src/vendors/<vendor>.ts`
2. Define clusters with attributes
3. Define device definitions with fingerprints
4. Export devices and clusters
5. Add to `src/vendors/index.ts`
6. Run tests: `npm test`
7. Submit a PR

### Example Vendor File

```typescript
import type { ClusterDefinition, DeviceDefinition } from '../types.js';

export const MY_VENDOR_ID = 12345;

export const myCluster: ClusterDefinition = {
  id: 0x12345FC01,
  vendorId: MY_VENDOR_ID,
  name: 'My Cluster',
  attributes: [
    {
      id: 0x12340001,
      name: 'myAttribute',
      type: 'uint8',
      access: ['R'],
      description: 'My custom attribute',
    },
  ],
};

export const myDevice: DeviceDefinition = {
  id: 'my_device',
  fingerprint: {
    vendorId: MY_VENDOR_ID,
    requiredClusters: [0x12345FC01],
  },
  vendor: 'My Vendor',
  model: 'My Device',
};

export const myDevices = [myDevice];
export const myClusters = [myCluster];
```

## Schema

### DeviceDefinition

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique device identifier |
| `fingerprint` | DeviceFingerprint | Matching criteria |
| `vendor` | string | Vendor name |
| `model` | string | Model name |
| `description` | string? | Optional description |
| `extends` | DeviceExtension[]? | Extensions |
| `productUrl` | string? | Product page URL |

### ClusterDefinition

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Cluster ID |
| `vendorId` | number? | Vendor ID for proprietary clusters |
| `name` | string | Human-readable name |
| `description` | string? | Optional description |
| `attributes` | AttributeDefinition[] | Cluster attributes |

### AttributeDefinition

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Attribute ID |
| `name` | string | Attribute name |
| `type` | AttributeType | Data type |
| `access` | ('R'\|'W'\|'S')[] | Access modes |
| `description` | string? | Optional description |
| `unit` | string? | Unit (e.g., "%", "C") |
| `parser` | string? | Parser reference for blobs |

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Generate JSON only
npm run build:json
```

## License

MIT

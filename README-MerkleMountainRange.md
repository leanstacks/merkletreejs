# MerkleMountainRange Class Documentation

A specialized Merkle tree implementation designed for append-only data structures. Merkle Mountain Range (MMR) is optimized for scenarios where data is continuously added but never modified, making it perfect for blockchain applications, audit logs, and immutable data structures.

## Features

- **Append-Only**: Optimized for adding new data without modifying existing entries
- **Efficient Proofs**: Generate inclusion proofs for any historical data
- **Peak Management**: Maintains multiple tree peaks for efficient operations
- **Blockchain Ready**: Perfect for blockchain and cryptocurrency applications
- **Roll-up Support**: Supports efficient batch updates and roll-ups
- **Immutable History**: Once data is added, it cannot be changed
- **Custom Hash Functions**: Support for various hash functions and peak bagging strategies
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { MerkleMountainRange } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Create MMR
const mmr = new MerkleMountainRange(SHA256)

// Append data
mmr.append('transaction 1')
mmr.append('transaction 2')
mmr.append('transaction 3')
mmr.append('transaction 4')

// Get root
const root = mmr.getHexRoot()
console.log('MMR Root:', root)

// Generate proof for transaction 2 (index 2)
const proof = mmr.getMerkleProof(2)
console.log('Proof generated for transaction 2')

// Verify proof
const isValid = mmr.verify(
  proof.root,
  proof.width,
  2, // index
  'transaction 2',
  proof.peakBagging,
  proof.siblings
)
console.log('Proof valid:', isValid)
```

## Constructor

### `new MerkleMountainRange(hashFn?, leaves?, hashLeafFn?, peakBaggingFn?, hashBranchFn?)`

Creates a new Merkle Mountain Range instance.

**Parameters:**
- `hashFn` (Function): Hash function to use (defaults to SHA256)
- `leaves` (any[]): Initial data to append (optional)
- `hashLeafFn` (Function): Custom leaf hashing function (optional)
- `peakBaggingFn` (Function): Custom peak bagging function (optional)  
- `hashBranchFn` (Function): Custom branch hashing function (optional)

**Example:**
```typescript
import SHA256 from 'crypto-js/sha256'

// Basic MMR
const mmr = new MerkleMountainRange(SHA256)

// MMR with initial data
const mmrWithData = new MerkleMountainRange(SHA256, ['data1', 'data2', 'data3'])

// MMR with custom functions
const customMMR = new MerkleMountainRange(
  SHA256,
  [],
  (index, dataHash) => customLeafHash(index, dataHash),
  (size, peaks) => customPeakBagging(size, peaks),
  (index, left, right) => customBranchHash(index, left, right)
)
```

## Properties

- `root` (Buffer): Current root hash of the MMR
- `size` (number): Total number of nodes in the MMR
- `width` (number): Number of leaves in the MMR
- `hashes` (object): Storage for node hashes
- `data` (object): Storage for original data

## Core Methods

### Data Operations

#### `append(data)`
Appends new data to the MMR.

**Parameters:**
- `data` (Buffer | string): Data to append

```typescript
mmr.append('new transaction')
mmr.append(Buffer.from('binary data'))
mmr.append('another entry')
```

#### `getRoot()`
Returns the current root hash as a Buffer.

```typescript
const root = mmr.getRoot()
```

#### `getHexRoot()`
Returns the current root hash as a hex string.

```typescript
const hexRoot = mmr.getHexRoot()
console.log('Root:', hexRoot)
```

#### `getNode(index)`
Returns the hash value of a node at the given index.

**Parameters:**
- `index` (number): Node index (1-based)

```typescript
const nodeHash = mmr.getNode(5)
```

### Peak Operations

#### `getPeaks()`
Returns all current peak hashes.

```typescript
const peaks = mmr.getPeaks()
console.log('Number of peaks:', peaks.length)
```

#### `getPeakIndexes(width)`
Returns the indexes of all peaks for a given width.

**Parameters:**
- `width` (number): Width to calculate peaks for

```typescript
const peakIndexes = mmr.getPeakIndexes(mmr.width)
```

#### `numOfPeaks(width)`
Returns the number of peaks for a given width.

**Parameters:**
- `width` (number): Width to calculate for

```typescript
const numPeaks = mmr.numOfPeaks(mmr.width)
```

### Proof Operations

#### `getMerkleProof(index)`
Generates a Merkle proof for a leaf at the given index.

**Parameters:**
- `index` (number): Leaf index (1-based)

**Returns:** Object with proof components

```typescript
const proof = mmr.getMerkleProof(3)
console.log('Proof:', {
  root: proof.root,
  width: proof.width,
  peakBagging: proof.peakBagging,
  siblings: proof.siblings
})
```

#### `verify(root, width, index, value, peaks, siblings)`
Verifies a proof for a specific value.

**Parameters:**
- `root` (Buffer): Root hash to verify against
- `width` (number): Width when proof was generated
- `index` (number): Leaf index
- `value` (Buffer | string): Original value
- `peaks` (Buffer[]): Peak hashes
- `siblings` (Buffer[]): Sibling hashes

**Returns:** boolean - true if proof is valid

```typescript
const isValid = mmr.verify(root, width, index, value, peaks, siblings)
```

### Utility Methods

#### `mountainHeight(size)`
Returns the height of the highest peak.

**Parameters:**
- `size` (number): Size to calculate height for

```typescript
const height = mmr.mountainHeight(mmr.size)
```

#### `heightAt(index)`
Returns the height of a node at the given index.

**Parameters:**
- `index` (number): Node index

```typescript
const height = mmr.heightAt(5)
```

#### `isLeaf(index)`
Checks if a node at the given index is a leaf.

**Parameters:**
- `index` (number): Node index

```typescript
const isLeaf = mmr.isLeaf(3)
```

#### `getChildren(index)`
Returns the children of a parent node.

**Parameters:**
- `index` (number): Parent node index

**Returns:** Array with [left, right] child indexes

```typescript
const [left, right] = mmr.getChildren(parentIndex)
```

### Roll-up Operations

#### `rollUp(root, width, peaks, itemHashes)`
Performs a roll-up operation with new item hashes.

**Parameters:**
- `root` (Buffer): Current root
- `width` (number): Current width
- `peaks` (Buffer[]): Current peaks
- `itemHashes` (Buffer[]): New item hashes to roll up

**Returns:** New root hash after roll-up

```typescript
const newRoot = mmr.rollUp(currentRoot, currentWidth, currentPeaks, newItemHashes)
```

## Examples

### Basic Blockchain Transaction Log

```typescript
import { MerkleMountainRange } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

const txLog = new MerkleMountainRange(SHA256)

// Add transactions
txLog.append('tx1: Alice -> Bob: 10 ETH')
txLog.append('tx2: Bob -> Charlie: 5 ETH')
txLog.append('tx3: Charlie -> Alice: 2 ETH')
txLog.append('tx4: Alice -> Dave: 3 ETH')

console.log('Transaction log root:', txLog.getHexRoot())
console.log('Total transactions:', txLog.width)

// Prove transaction 2 exists
const proof = txLog.getMerkleProof(2)
const isValid = txLog.verify(
  proof.root,
  proof.width,
  2,
  'tx2: Bob -> Charlie: 5 ETH',
  proof.peakBagging,
  proof.siblings
)
console.log('Transaction 2 proof valid:', isValid)
```

### Audit Log System

```typescript
const auditLog = new MerkleMountainRange(SHA256)

// Add audit events
const events = [
  'User login: admin@example.com at 2023-01-01T10:00:00Z',
  'File accessed: /secure/document.pdf by admin@example.com',
  'Permission changed: user123 granted read access to /data/',
  'User logout: admin@example.com at 2023-01-01T11:30:00Z',
  'Failed login attempt: hacker@evil.com at 2023-01-01T12:00:00Z'
]

events.forEach(event => auditLog.append(event))

console.log('Audit log root:', auditLog.getHexRoot())

// Generate proof for security event
const securityEventProof = auditLog.getMerkleProof(5)
console.log('Security event proof generated')

// Verify the failed login attempt
const proofValid = auditLog.verify(
  securityEventProof.root,
  securityEventProof.width,
  5,
  'Failed login attempt: hacker@evil.com at 2023-01-01T12:00:00Z',
  securityEventProof.peakBagging,
  securityEventProof.siblings
)
console.log('Security event proof valid:', proofValid)
```

### Document Version Control

```typescript
const versionControl = new MerkleMountainRange(SHA256)

// Add document versions
const versions = [
  'doc-v1.0: Initial document creation',
  'doc-v1.1: Added introduction section',
  'doc-v1.2: Fixed typos in chapter 2',
  'doc-v2.0: Major restructure and new content',
  'doc-v2.1: Added appendix and references'
]

versions.forEach(version => versionControl.append(version))

// Prove a specific version exists
const v2Proof = versionControl.getMerkleProof(4)
const v2Valid = versionControl.verify(
  v2Proof.root,
  v2Proof.width,
  4,
  'doc-v2.0: Major restructure and new content',
  v2Proof.peakBagging,
  v2Proof.siblings
)
console.log('Document v2.0 proof valid:', v2Valid)
```

### Supply Chain Tracking

```typescript
const supplyChain = new MerkleMountainRange(SHA256)

// Track supply chain events
const events = [
  'Raw materials sourced from Supplier A',
  'Materials processed at Factory B',
  'Quality inspection passed at 2023-01-15',
  'Product packaged and labeled',
  'Shipped to Distribution Center C',
  'Delivered to Retailer D',
  'Sold to end customer'
]

events.forEach(event => supplyChain.append(event))

// Prove quality inspection occurred
const qualityProof = supplyChain.getMerkleProof(3)
const qualityValid = supplyChain.verify(
  qualityProof.root,
  qualityProof.width,
  3,
  'Quality inspection passed at 2023-01-15',
  qualityProof.peakBagging,
  qualityProof.siblings
)
console.log('Quality inspection proof valid:', qualityValid)
```

### Timestamped Data Archive

```typescript
const archive = new MerkleMountainRange(SHA256)

// Add timestamped data
const data = [
  { timestamp: '2023-01-01T00:00:00Z', data: 'sensor reading: 23.5°C' },
  { timestamp: '2023-01-01T01:00:00Z', data: 'sensor reading: 24.1°C' },
  { timestamp: '2023-01-01T02:00:00Z', data: 'sensor reading: 23.8°C' },
  { timestamp: '2023-01-01T03:00:00Z', data: 'sensor reading: 22.9°C' }
]

data.forEach(entry => archive.append(JSON.stringify(entry)))

// Prove a specific reading
const reading2Proof = archive.getMerkleProof(2)
const reading2Valid = archive.verify(
  reading2Proof.root,
  reading2Proof.width,
  2,
  JSON.stringify(data[1]),
  reading2Proof.peakBagging,
  reading2Proof.siblings
)
console.log('Sensor reading 2 proof valid:', reading2Valid)
```

### Custom Hash Functions

```typescript
import { keccak256 } from 'js-sha3'

// Custom hash function
const customHash = (data) => {
  return Buffer.from(keccak256.arrayBuffer(data))
}

// Custom leaf hash function
const customLeafHash = (index, dataHash) => {
  const indexBuffer = Buffer.alloc(4)
  indexBuffer.writeUInt32BE(index, 0)
  return customHash(Buffer.concat([Buffer.from('LEAF'), indexBuffer, dataHash]))
}

// Custom branch hash function
const customBranchHash = (index, left, right) => {
  const indexBuffer = Buffer.alloc(4)
  indexBuffer.writeUInt32BE(index, 0)
  return customHash(Buffer.concat([Buffer.from('BRANCH'), indexBuffer, left, right]))
}

const customMMR = new MerkleMountainRange(
  customHash,
  [],
  customLeafHash,
  undefined, // use default peak bagging
  customBranchHash
)

customMMR.append('data with custom hashing')
```

### Peak Analysis

```typescript
const mmr = new MerkleMountainRange(SHA256)

// Add various amounts of data to see peak changes
for (let i = 1; i <= 10; i++) {
  mmr.append(`data-${i}`)
  
  const peaks = mmr.getPeaks()
  const peakIndexes = mmr.getPeakIndexes(mmr.width)
  
  console.log(`After ${i} items:`)
  console.log(`  Width: ${mmr.width}, Size: ${mmr.size}`)
  console.log(`  Peaks: ${peaks.length}, Indexes: [${peakIndexes.join(', ')}]`)
  console.log(`  Root: ${mmr.getHexRoot()}`)
}
```

### Batch Roll-up Operations

```typescript
const mmr = new MerkleMountainRange(SHA256)

// Initial data
mmr.append('initial-1')
mmr.append('initial-2')

const currentRoot = mmr.getRoot()
const currentWidth = mmr.width
const currentPeaks = mmr.getPeaks()

// Prepare new data for roll-up
const newData = ['batch-1', 'batch-2', 'batch-3']
const newItemHashes = newData.map(item => SHA256(item))

// Perform roll-up
const newRoot = mmr.rollUp(currentRoot, currentWidth, currentPeaks, newItemHashes)
console.log('New root after roll-up:', newRoot.toString('hex'))
```

## Advanced Features

### Tree Structure Analysis

```typescript
// Analyze tree structure
console.log('MMR Analysis:')
console.log('Width (leaves):', mmr.width)
console.log('Size (total nodes):', mmr.size)
console.log('Number of peaks:', mmr.numOfPeaks(mmr.width))
console.log('Mountain height:', mmr.mountainHeight(mmr.size))

// Check each node
for (let i = 1; i <= mmr.size; i++) {
  const height = mmr.heightAt(i)
  const isLeaf = mmr.isLeaf(i)
  console.log(`Node ${i}: Height ${height}, ${isLeaf ? 'Leaf' : 'Branch'}`)
}
```

### Proof Size Analysis

```typescript
// Analyze proof sizes for different positions
for (let i = 1; i <= mmr.width; i++) {
  const proof = mmr.getMerkleProof(i)
  console.log(`Proof for leaf ${i}: ${proof.siblings.length} siblings`)
}
```

## Performance Considerations

- **Append-Only**: Optimized for adding new data, not modifying existing
- **Proof Size**: Logarithmic proof size relative to total data size
- **Peak Management**: Efficient peak tracking for large datasets
- **Memory Usage**: Only stores hashes, not full data (data can be stored separately)
- **Batch Operations**: Roll-up operations allow efficient batch updates

## Security Notes

- **Immutable History**: Once data is appended, it cannot be changed
- **Hash Function Security**: Use cryptographically secure hash functions
- **Index Validation**: Ensure indexes are within valid ranges
- **Proof Verification**: Always verify proofs against trusted roots

## Use Cases

- **Blockchain**: Transaction logs and block history
- **Audit Logs**: Immutable audit trails for security
- **Version Control**: Document and code version tracking  
- **Supply Chain**: Product tracking and provenance
- **Timestamping**: Proof of existence at specific times
- **Certificate Transparency**: Log of issued certificates
- **IoT Data**: Sensor data with integrity proofs

## Browser Support

Works in both Node.js and browser environments. Ensure you have appropriate Buffer support for your target environment.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all methods and data structures. The library provides proper typing for all MMR operations and proof structures. 
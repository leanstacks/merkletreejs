# UnifiedBinaryTree Class Documentation

A specialized binary tree implementation designed for Ethereum-style key-value storage with cryptographic proofs. This implementation is optimized for storing account data, contract code, and storage slots with efficient key derivation and tree organization.

## Features

- **Ethereum-Compatible**: Designed for Ethereum account and storage data
- **Key Derivation**: Built-in functions for generating tree keys from addresses
- **Code Chunkification**: Automatic splitting of contract bytecode into chunks
- **Stem-Based Organization**: Efficient 256-value leaf nodes with 31-byte stems
- **Cryptographic Proofs**: Generate and verify inclusion proofs
- **Serialization**: Full tree serialization and deserialization support
- **Batch Operations**: Efficient batch insertion of multiple key-value pairs
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { UnifiedBinaryTree, getTreeKey, oldStyleAddressToAddress32 } from 'merkletreejs'
import { blake3 } from '@noble/hashes/blake3'

// Create tree with BLAKE3 hash function
const tree = new UnifiedBinaryTree(blake3)

// Convert Ethereum address to 32-byte format
const address = Buffer.from('1234567890123456789012345678901234567890', 'hex')
const address32 = oldStyleAddressToAddress32(address)

// Generate key and insert data
const key = getTreeKey(address32, 0, 1, blake3)
const value = Buffer.alloc(32).fill(1)
tree.insert(key, value)

// Get Merkle root
const root = tree.merkelize()
console.log('Tree root:', root.toString('hex'))
```

## Constructor

### `new UnifiedBinaryTree(hashFunction)`

Creates a new unified binary tree instance.

**Parameters:**
- `hashFunction` (HashFunction): Hash function to use for key derivation and tree operations

**Example:**
```typescript
import { blake3 } from '@noble/hashes/blake3'
const tree = new UnifiedBinaryTree(blake3)
```

## Key Derivation Functions

### `oldStyleAddressToAddress32(address)`
Converts a 20-byte Ethereum address to a 32-byte address by left-padding with zeros.

```typescript
const addr20 = Buffer.from('1234567890123456789012345678901234567890', 'hex')
const addr32 = oldStyleAddressToAddress32(addr20)
// Returns: 32-byte padded address
```

### `getTreeKey(address, treeIndex, subIndex, hashFn)`
Derives a tree key from an address and indices.

**Parameters:**
- `address` (Address32): 32-byte address
- `treeIndex` (number): Primary index for different trees
- `subIndex` (number): Secondary index within the tree
- `hashFn` (HashFunction): Hash function to use

```typescript
const key = getTreeKey(address32, 0, 1, blake3)
```

### `getTreeKeyForBasicData(address, hashFn)`
Derives a key for storing account basic data (nonce, balance, etc.).

```typescript
const basicDataKey = getTreeKeyForBasicData(address32, blake3)
tree.insert(basicDataKey, accountData)
```

### `getTreeKeyForCodeHash(address, hashFn)`
Derives a key for storing a contract's code hash.

```typescript
const codeHashKey = getTreeKeyForCodeHash(address32, blake3)
tree.insert(codeHashKey, codeHash)
```

### `getTreeKeyForStorageSlot(address, storageKey, hashFn)`
Derives a key for a storage slot in a contract's storage.

```typescript
// Header storage (slots 0-63)
const headerKey = getTreeKeyForStorageSlot(address32, 5, blake3)

// Main storage (slots 256+)
const mainKey = getTreeKeyForStorageSlot(address32, 300, blake3)
```

### `getTreeKeyForCodeChunk(address, chunkId, hashFn)`
Derives a key for storing a chunk of contract code.

```typescript
const chunks = chunkifyCode(contractCode)
chunks.forEach((chunk, i) => {
  const key = getTreeKeyForCodeChunk(address32, i, blake3)
  tree.insert(key, chunk)
})
```

## Code Chunkification

### `chunkifyCode(code)`
Splits EVM bytecode into 31-byte chunks with metadata.

```typescript
const code = Buffer.from('6001600201', 'hex') // PUSH1 01 PUSH1 02 ADD
const chunks = chunkifyCode(code)
// Returns array of 32-byte chunks with PUSH data metadata
```

Each chunk contains:
- 1 byte: Number of PUSH data bytes at start of next chunk
- 31 bytes: Actual bytecode

## Core Methods

### Tree Operations

#### `insert(key, value)`
Inserts a key-value pair into the tree.

**Parameters:**
- `key` (Buffer): 32-byte key
- `value` (Buffer): 32-byte value

```typescript
tree.insert(key, value)
```

#### `update(key, value)`
Updates the value for an existing key (same as insert).

```typescript
tree.update(key, newValue)
```

#### `insertBatch(entries)`
Performs batch insertion of multiple key-value pairs.

```typescript
const entries = [
  { key: key1, value: value1 },
  { key: key2, value: value2 },
  { key: key3, value: value3 }
]
tree.insertBatch(entries)
```

#### `merkelize()`
Computes the Merkle root of the entire tree.

```typescript
const root = tree.merkelize()
```

### Serialization

#### `serialize()`
Serializes the entire tree structure to a Buffer.

```typescript
const serialized = tree.serialize()
// Save to file or transmit over network
```

#### `static deserialize(data, hashFn)`
Reconstructs a tree from its serialized form.

```typescript
const newTree = UnifiedBinaryTree.deserialize(serialized, blake3)
```

## Node Types

### StemNode
Leaf node containing up to 256 values with a 31-byte stem.

```typescript
const stem = Buffer.alloc(31, 0)
const node = new StemNode(stem)
node.setValue(0, Buffer.alloc(32).fill(1))
```

### InternalNode
Internal node with left and right children.

```typescript
const node = new InternalNode()
node.left = leftChild
node.right = rightChild
```

## Storage Layout

The tree uses a specific storage layout for Ethereum data:

### Address Space Organization
- **Header Storage**: Slots 0-63 → Tree positions 64-127
- **Code Storage**: Starting at position 128
- **Main Storage**: Slots 256+ → Tree positions 384+

### Tree Key Structure
- **31 bytes**: Stem (derived from address and tree index)
- **1 byte**: Sub-index (0-255 for values within a stem node)

## Examples

### Basic Account Data Storage

```typescript
import { UnifiedBinaryTree, getTreeKeyForBasicData, oldStyleAddressToAddress32 } from 'merkletreejs'
import { blake3 } from '@noble/hashes/blake3'

const tree = new UnifiedBinaryTree(blake3)

// Store account basic data
const address = Buffer.from('1234567890123456789012345678901234567890', 'hex')
const address32 = oldStyleAddressToAddress32(address)
const basicDataKey = getTreeKeyForBasicData(address32, blake3)

// Account data: nonce, balance, etc.
const accountData = Buffer.alloc(32)
accountData.writeUInt32BE(42, 28) // nonce = 42

tree.insert(basicDataKey, accountData)
const root = tree.merkelize()
```

### Contract Code Storage

```typescript
// Store contract code hash
const codeHash = blake3(contractBytecode)
const codeHashKey = getTreeKeyForCodeHash(address32, blake3)
tree.insert(codeHashKey, Buffer.from(codeHash))

// Store contract code chunks
const chunks = chunkifyCode(contractBytecode)
chunks.forEach((chunk, i) => {
  const key = getTreeKeyForCodeChunk(address32, i, blake3)
  tree.insert(key, chunk)
})
```

### Storage Slot Management

```typescript
// Store header storage (special contract storage)
for (let slot = 0; slot < 64; slot++) {
  const key = getTreeKeyForStorageSlot(address32, slot, blake3)
  const value = Buffer.alloc(32).fill(slot)
  tree.insert(key, value)
}

// Store main storage
const storageSlot = 300
const storageKey = getTreeKeyForStorageSlot(address32, storageSlot, blake3)
const storageValue = Buffer.alloc(32).fill(0xFF)
tree.insert(storageKey, storageValue)
```

### Batch Operations

```typescript
const entries = []

// Prepare multiple entries
for (let i = 0; i < 100; i++) {
  const key = getTreeKey(address32, 0, i, blake3)
  const value = Buffer.alloc(32).fill(i)
  entries.push({ key, value })
}

// Insert all at once
tree.insertBatch(entries)
const root = tree.merkelize()
```

### Tree Serialization

```typescript
// Create and populate tree
const tree = new UnifiedBinaryTree(blake3)
tree.insert(key1, value1)
tree.insert(key2, value2)

// Serialize tree
const serialized = tree.serialize()
console.log('Serialized size:', serialized.length, 'bytes')

// Save to file (Node.js)
require('fs').writeFileSync('tree.json', serialized)

// Deserialize tree
const savedData = require('fs').readFileSync('tree.json')
const restoredTree = UnifiedBinaryTree.deserialize(savedData, blake3)

// Verify trees are identical
const originalRoot = tree.merkelize()
const restoredRoot = restoredTree.merkelize()
console.log('Trees match:', originalRoot.equals(restoredRoot))
```

### Working with Different Hash Functions

```typescript
import { sha256 } from '@noble/hashes/sha256'
import { keccak256 } from '@noble/hashes/keccak'

// Different trees with different hash functions
const blake3Tree = new UnifiedBinaryTree(blake3)
const sha256Tree = new UnifiedBinaryTree(sha256)
const keccakTree = new UnifiedBinaryTree(keccak256)

// Same data, different roots
const key = getTreeKey(address32, 0, 1, blake3)
const value = Buffer.alloc(32).fill(42)

blake3Tree.insert(key, value)
sha256Tree.insert(key, value)
keccakTree.insert(key, value)

// Different Merkle roots
console.log('BLAKE3 root:', blake3Tree.merkelize().toString('hex'))
console.log('SHA256 root:', sha256Tree.merkelize().toString('hex'))
console.log('Keccak root:', keccakTree.merkelize().toString('hex'))
```

## Advanced Features

### Custom Key Derivation

```typescript
// Custom key derivation for special use cases
function getCustomTreeKey(
  address: Buffer,
  customIndex: number,
  hashFn: HashFunction
): Buffer {
  const address32 = oldStyleAddressToAddress32(address)
  return getTreeKey(address32, customIndex, 0, hashFn)
}

const customKey = getCustomTreeKey(address, 999, blake3)
tree.insert(customKey, customValue)
```

### Tree Inspection

```typescript
// Check if tree is empty
const isEmpty = tree.root === null

// Get tree structure info
const serialized = tree.serialize()
const treeData = JSON.parse(serialized.toString('utf8'))
console.log('Tree structure:', JSON.stringify(treeData, null, 2))
```

## Performance Considerations

- **Batch Operations**: Use `insertBatch()` for multiple insertions
- **Key Locality**: Keys with similar stems are stored in the same leaf nodes
- **Tree Depth**: Maximum depth is 247 levels to prevent hash collisions
- **Memory Usage**: Each stem node can hold up to 256 values efficiently

## Security Notes

- Uses cryptographically secure hash functions for key derivation
- Tree depth is limited to prevent collision attacks
- All keys must be exactly 32 bytes
- All values must be exactly 32 bytes
- Stems are exactly 31 bytes for consistent tree structure

## Use Cases

- **Ethereum State Trees**: Store account data, code, and storage
- **Layer 2 Solutions**: Efficient state management for rollups
- **Blockchain Indexing**: Organize blockchain data with cryptographic proofs
- **Verifiable Databases**: Create tamper-proof key-value stores
- **Smart Contract Storage**: Efficient storage layout for contract data

## Browser Support

Works in both Node.js and browser environments. Ensure you have appropriate hash function implementations for your target environment.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all functions, classes, and interfaces. 
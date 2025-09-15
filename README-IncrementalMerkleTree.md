# IncrementalMerkleTree Class Documentation

A fixed-depth Merkle tree implementation optimized for scenarios where you know the maximum number of leaves in advance. This tree supports efficient insertions, updates, deletions, and proof generation while maintaining a consistent structure, making it ideal for applications like voting systems, membership proofs, and zero-knowledge applications.

## Features

- **Fixed Depth**: Pre-defined tree depth for consistent structure
- **Configurable Arity**: Support for binary and n-ary trees (2, 4, 8, etc. children per node)
- **Zero Value Padding**: Automatic padding with zero values for incomplete levels
- **Efficient Updates**: Update individual leaves without rebuilding the tree
- **Proof Generation**: Generate and verify inclusion proofs for any leaf
- **Deletions**: Remove leaves by setting them to zero values
- **Visual Representation**: Built-in tree visualization for debugging
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { IncrementalMerkleTree } from 'merkletreejs'
import { poseidon } from 'circomlib' // Common in zero-knowledge applications

// Create a binary tree with depth 4 (max 16 leaves)
const tree = new IncrementalMerkleTree(poseidon, {
  depth: 4,
  arity: 2,
  zeroValue: 0
})

// Insert leaves
tree.insert(1)
tree.insert(2)
tree.insert(3)

// Get root
const root = tree.getHexRoot()
console.log('Tree root:', root)

// Generate proof for leaf at index 1
const proof = tree.getProof(1)

// Verify proof
const isValid = tree.verify(proof)
console.log('Proof valid:', isValid)

// Update a leaf
tree.update(1, 10)
console.log('Updated root:', tree.getHexRoot())
```

## Constructor

### `new IncrementalMerkleTree(hashFunction, options)`

Creates a new incremental Merkle tree instance.

**Parameters:**
- `hashFunction` (Function): Hash function to use for node calculations
- `options` (Options): Configuration options

**Options:**
```typescript
interface Options {
  depth?: number    // Tree depth (required)
  arity?: number    // Number of children per node (default: 2)
  zeroValue?: any   // Value used for empty positions (default: 0)
}
```

**Example:**
```typescript
import { poseidon } from 'circomlib'

// Binary tree (2 children per node)
const binaryTree = new IncrementalMerkleTree(poseidon, {
  depth: 3,
  arity: 2,
  zeroValue: 0
})

// Quaternary tree (4 children per node)
const quaternaryTree = new IncrementalMerkleTree(poseidon, {
  depth: 3,
  arity: 4,
  zeroValue: BigInt(0)
})
```

## Core Methods

### Tree Operations

#### `insert(leaf)`
Inserts a new leaf at the next available position.

**Parameters:**
- `leaf` (any): Value to insert

```typescript
tree.insert(42)
tree.insert('hello')
tree.insert(BigInt(123))
```

#### `update(index, newLeaf)`
Updates the leaf at a specific index.

**Parameters:**
- `index` (number): Index of leaf to update
- `newLeaf` (any): New value for the leaf

```typescript
tree.update(0, 'updated value')
tree.update(2, BigInt(999))
```

#### `delete(index)`
Deletes a leaf by setting it to the zero value.

**Parameters:**
- `index` (number): Index of leaf to delete

```typescript
tree.delete(1) // Sets leaf at index 1 to zeroValue
```

### Tree Information

#### `getRoot()`
Returns the current root hash.

```typescript
const root = tree.getRoot()
```

#### `getHexRoot()`
Returns the current root hash as a hex string.

```typescript
const hexRoot = tree.getHexRoot()
```

#### `getDepth()`
Returns the tree depth.

```typescript
const depth = tree.getDepth()
```

#### `getArity()`
Returns the tree arity (children per node).

```typescript
const arity = tree.getArity()
```

#### `getMaxLeaves()`
Returns the maximum number of leaves the tree can hold.

```typescript
const maxLeaves = tree.getMaxLeaves() // depth^arity
```

#### `getLeaves()`
Returns all leaves, including zero-padded positions.

```typescript
const allLeaves = tree.getLeaves()
```

#### `indexOf(leaf)`
Returns the index of a specific leaf value.

**Parameters:**
- `leaf` (any): Leaf value to find

**Returns:** Index of the leaf, or -1 if not found

```typescript
const index = tree.indexOf(42)
```

### Layer Operations

#### `getLayers()`
Returns all tree layers as a 2D array.

```typescript
const layers = tree.getLayers()
console.log('Number of layers:', layers.length)
```

#### `getHexLayers()`
Returns all tree layers as hex strings.

```typescript
const hexLayers = tree.getHexLayers()
```

#### `getLayersAsObject()`
Returns tree layers as a nested object for visualization.

```typescript
const layersObj = tree.getLayersAsObject()
console.log(JSON.stringify(layersObj, null, 2))
```

### Proof Operations

#### `getProof(index)`
Generates an inclusion proof for a leaf at the given index.

**Parameters:**
- `index` (number): Index of leaf to prove

**Returns:** Proof object with root, leaf, path indices, and siblings

```typescript
const proof = tree.getProof(2)
console.log('Proof:', {
  root: proof.root,
  leaf: proof.leaf,
  pathIndices: proof.pathIndices,
  siblings: proof.siblings
})
```

#### `verify(proof)`
Verifies an inclusion proof.

**Parameters:**
- `proof` (object): Proof object from getProof()

**Returns:** boolean - true if proof is valid

```typescript
const isValid = tree.verify(proof)
```

### Utility Methods

#### `toString()`
Returns a visual representation of the tree.

```typescript
console.log(tree.toString())
```

#### `computeRoot()`
Manually recomputes the root hash.

```typescript
const computedRoot = tree.computeRoot()
```

## Examples

### Voting System

```typescript
import { IncrementalMerkleTree } from 'merkletreejs'
import { poseidon } from 'circomlib'

// Create tree for up to 1024 voters (depth 10, binary)
const voterTree = new IncrementalMerkleTree(poseidon, {
  depth: 10,
  arity: 2,
  zeroValue: 0
})

// Register voters with their IDs
const voterIds = [12345, 67890, 11111, 22222, 33333]
voterIds.forEach(id => voterTree.insert(id))

console.log('Voter tree root:', voterTree.getHexRoot())
console.log('Registered voters:', voterIds.length)

// Generate proof for voter 67890 (index 1)
const voterProof = voterTree.getProof(1)
const proofValid = voterTree.verify(voterProof)
console.log('Voter 67890 proof valid:', proofValid)

// Remove a voter (set to 0)
voterTree.delete(2) // Remove voter 11111
console.log('After removing voter:', voterTree.getHexRoot())
```

### Membership System

```typescript
const memberTree = new IncrementalMerkleTree(poseidon, {
  depth: 5, // Max 32 members
  arity: 2,
  zeroValue: BigInt(0)
})

// Add members
const members = [
  BigInt(1001), // Alice
  BigInt(1002), // Bob  
  BigInt(1003), // Charlie
  BigInt(1004), // Dave
]

members.forEach(member => memberTree.insert(member))

// Prove Alice's membership
const aliceProof = memberTree.getProof(0)
console.log('Alice membership proof:')
console.log('  Root:', aliceProof.root.toString())
console.log('  Leaf:', aliceProof.leaf.toString())
console.log('  Path indices:', aliceProof.pathIndices)
console.log('  Siblings count:', aliceProof.siblings.length)

// Verify proof
const aliceValid = memberTree.verify(aliceProof)
console.log('Alice membership valid:', aliceValid)
```

### Whitelist Management

```typescript
// Whitelist for NFT minting
const whitelist = new IncrementalMerkleTree(poseidon, {
  depth: 8, // Max 256 addresses
  arity: 2,
  zeroValue: 0
})

// Add whitelisted addresses (as numbers for simplicity)
const addresses = [
  0x1234567890abcdef,
  0xfedcba0987654321,
  0x1111222233334444,
  0x5555666677778888
]

addresses.forEach(addr => whitelist.insert(addr))

// Generate proof for an address
const addressProof = whitelist.getProof(1)
const addressValid = whitelist.verify(addressProof)
console.log('Address whitelisted:', addressValid)

// Update an address
whitelist.update(1, 0x9999aaaa0000bbbb)
console.log('Updated whitelist root:', whitelist.getHexRoot())
```

### Quaternary Tree Example

```typescript
// 4-ary tree (4 children per node)
const quaternaryTree = new IncrementalMerkleTree(poseidon, {
  depth: 3, // Max 4^3 = 64 leaves
  arity: 4,
  zeroValue: 0
})

// Insert data
for (let i = 1; i <= 10; i++) {
  quaternaryTree.insert(i * 10)
}

console.log('Quaternary tree structure:')
console.log('Depth:', quaternaryTree.getDepth())
console.log('Arity:', quaternaryTree.getArity())
console.log('Max leaves:', quaternaryTree.getMaxLeaves())
console.log('Current leaves:', quaternaryTree.getLeaves().filter(leaf => leaf !== 0).length)

// Generate proof
const proof = quaternaryTree.getProof(5)
console.log('Proof for index 5 valid:', quaternaryTree.verify(proof))
```

### Zero-Knowledge Application

```typescript
import { poseidon } from 'circomlib'

// Tree for zero-knowledge proofs
const zkTree = new IncrementalMerkleTree(poseidon, {
  depth: 20, // Large tree for many users
  arity: 2,
  zeroValue: BigInt(0)
})

// Simulate user commitments
const userCommitments = [
  BigInt('12345678901234567890'),
  BigInt('98765432109876543210'),
  BigInt('11111111111111111111'),
  BigInt('22222222222222222222')
]

userCommitments.forEach(commitment => zkTree.insert(commitment))

// Generate proof for privacy-preserving verification
const userIndex = 1
const userProof = zkTree.getProof(userIndex)

console.log('ZK Proof components:')
console.log('Root:', userProof.root.toString())
console.log('Leaf:', userProof.leaf.toString())
console.log('Path indices:', userProof.pathIndices)
console.log('Siblings:', userProof.siblings.map(s => s.toString()))

// Verify proof
const zkValid = zkTree.verify(userProof)
console.log('ZK proof valid:', zkValid)
```

### Batch Operations

```typescript
const batchTree = new IncrementalMerkleTree(poseidon, {
  depth: 4,
  arity: 2,
  zeroValue: 0
})

// Batch insert
const batchData = [100, 200, 300, 400, 500]
batchData.forEach(value => batchTree.insert(value))

// Batch update
const updates = [
  { index: 0, value: 150 },
  { index: 2, value: 350 },
  { index: 4, value: 550 }
]

updates.forEach(({ index, value }) => {
  batchTree.update(index, value)
})

// Generate proofs for all updated positions
updates.forEach(({ index }) => {
  const proof = batchTree.getProof(index)
  const valid = batchTree.verify(proof)
  console.log(`Proof for index ${index}: ${valid}`)
})
```

### Tree Visualization

```typescript
const visualTree = new IncrementalMerkleTree(poseidon, {
  depth: 3,
  arity: 2,
  zeroValue: 0
})

// Add some data
visualTree.insert(10)
visualTree.insert(20)
visualTree.insert(30)

// Print tree structure
console.log('Tree visualization:')
console.log(visualTree.toString())

// Print layers
const layers = visualTree.getLayers()
layers.forEach((layer, i) => {
  console.log(`Layer ${i}:`, layer.map(node => node.toString()))
})
```

## Advanced Features

### Custom Hash Functions

```typescript
import SHA256 from 'crypto-js/sha256'

// Custom hash function for SHA256
const sha256Hash = (inputs) => {
  const combined = inputs.join('')
  return SHA256(combined).toString()
}

const sha256Tree = new IncrementalMerkleTree(sha256Hash, {
  depth: 4,
  arity: 2,
  zeroValue: '0'
})

sha256Tree.insert('hello')
sha256Tree.insert('world')
```

### Large Trees

```typescript
// Very large tree for scalable applications
const largeTree = new IncrementalMerkleTree(poseidon, {
  depth: 32, // Max 2^32 leaves (over 4 billion)
  arity: 2,
  zeroValue: BigInt(0)
})

// Insert data efficiently
for (let i = 0; i < 1000; i++) {
  largeTree.insert(BigInt(i))
}

console.log('Large tree root:', largeTree.getHexRoot())
```

### Tree Comparison

```typescript
// Compare trees before and after operations
const tree1 = new IncrementalMerkleTree(poseidon, {
  depth: 3, arity: 2, zeroValue: 0
})

const tree2 = new IncrementalMerkleTree(poseidon, {
  depth: 3, arity: 2, zeroValue: 0
})

// Add same data to both trees
[1, 2, 3].forEach(value => {
  tree1.insert(value)
  tree2.insert(value)
})

console.log('Trees equal:', tree1.getHexRoot() === tree2.getHexRoot())

// Modify one tree
tree1.update(1, 99)
console.log('After update equal:', tree1.getHexRoot() === tree2.getHexRoot())
```

## Performance Considerations

- **Fixed Depth**: All operations are O(depth), providing predictable performance
- **Arity Choice**: Higher arity reduces depth but increases hash computation per node
- **Memory Usage**: Tree stores all nodes, memory usage is O(arity^depth)
- **Zero Padding**: Unused positions are filled with zero values
- **Batch Operations**: Multiple updates can be done before recomputing root

## Security Notes

- **Hash Function**: Use cryptographically secure hash functions for production
- **Zero Values**: Choose zero values that cannot be valid leaf values
- **Index Validation**: Ensure indexes are within valid ranges
- **Proof Verification**: Always verify proofs in critical applications

## Use Cases

- **Voting Systems**: Voter registration and proof of eligibility
- **Membership Proofs**: Whitelist management and access control
- **Zero-Knowledge Proofs**: Privacy-preserving membership proofs
- **Airdrops**: Prove eligibility for token distributions
- **Identity Systems**: Decentralized identity and reputation systems
- **Gaming**: Leaderboards and achievement systems
- **Compliance**: Regulatory reporting with privacy

## Browser Support

Works in both Node.js and browser environments. Ensure you have appropriate hash function implementations for your target environment.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all methods and data structures. The library provides proper typing for all tree operations and proof structures. 
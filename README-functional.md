# Functional API for MerkleTreeJS

A functional programming interface for merkletreejs that provides an intuitive, viem-inspired API for working with Merkle trees. This wrapper makes it easy to create, manipulate, and verify Merkle trees with a clean, functional interface.

## Features

- **Functional API**: Intuitive, functional interface inspired by viem
- **Type Safety**: Full TypeScript support with proper type definitions
- **Flexible Input**: Accepts strings, buffers, objects, and numbers as leaves
- **Multiple Hash Functions**: Built-in support for SHA256 (default), keccak256, and custom hash functions
- **Proof Generation**: Easy proof creation and verification
- **Tree Manipulation**: Add, remove, and update leaves
- **Serialization**: Marshal/unmarshal trees and proofs to JSON
- **Advanced Options**: Support for Bitcoin-style trees, sorted trees, and complete trees

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { createMerkleTree, getHexRoot, getProof, verifyProof } from 'merkletreejs'

// Create a simple Merkle tree
const leaves = ['a', 'b', 'c', 'd']
const tree = createMerkleTree(leaves)
const root = getHexRoot(tree)

// Generate and verify a proof
const proof = getProof(tree, 'b')
const isValid = verifyProof(proof, 'b', root)
console.log('Proof valid:', isValid) // true
```

You can also import the original MerkleTree class if needed:

```typescript
import { MerkleTree, createMerkleTree } from 'merkletreejs'

// Using the functional API
const functionalTree = createMerkleTree(['a', 'b', 'c'])

// Using the original class API
const classTree = new MerkleTree(['a', 'b', 'c'])
```

## API Reference

### Core Functions

#### `createMerkleTree(leaves, hashFn?, options?)`
Creates a Merkle tree from an array of leaves. Uses SHA256 as the default hash function.

```typescript
const tree = createMerkleTree(['a', 'b', 'c'])
// Using custom hash function
const customHashFn = (data) => {
  const crypto = require('crypto')
  return crypto.createHash('sha256').update(data).digest()
}
const treeWithOptions = createMerkleTree(leaves, customHashFn, { sort: true })
```



#### `getHexRoot(tree)`
Gets the root hash as a hex string.

```typescript
const root = getHexRoot(tree)
```

#### `getRoot(tree)`
Gets the root hash as a Buffer.

```typescript
const rootBuffer = getRoot(tree)
```

### Tree Manipulation

#### `addLeaf(tree, leaf, options?)`
Adds a single leaf to the tree.

```typescript
const updatedTree = addLeaf(tree, 'newLeaf')
const updatedTreeWithHash = addLeaf(tree, 'newLeaf', { shouldHash: true })
```

#### `addLeaves(tree, leaves, options?)`
Adds multiple leaves to the tree.

```typescript
const updatedTree = addLeaves(tree, ['leaf1', 'leaf2'])
const updatedTreeWithHash = addLeaves(tree, ['leaf1', 'leaf2'], { shouldHash: true })
```

#### `removeLeaf(tree, index)`
Removes a leaf by index.

```typescript
const removedLeaf = removeLeaf(tree, 0)
```

#### `updateLeaf(tree, index, value, options?)`
Updates a leaf at a specific index.

```typescript
updateLeaf(tree, 0, 'newValue')
updateLeaf(tree, 0, 'newValue', { shouldHash: true })
```

### Proof Operations

#### `getProof(tree, leaf, index?)`
Gets a proof for a specific leaf.

```typescript
const proof = getProof(tree, 'targetLeaf')
```

#### `getHexProof(tree, leaf, index?)`
Gets a proof as hex strings.

```typescript
const hexProof = getHexProof(tree, 'targetLeaf')
```

#### `verifyProof(proof, leaf, root, hashFn?, options?)`
Verifies a proof against a root and target leaf.

```typescript
const isValid = verifyProof(proof, 'targetLeaf', root)
```

#### `getMultiProof(tree, indices)`
Gets a multiproof for multiple indices.

```typescript
const multiProof = getMultiProof(tree, [0, 2, 4])
```

#### `verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof, hashFn?, options?)`
Verifies a multiproof.

```typescript
const isValid = verifyMultiProof(root, [0, 2], [leaf0, leaf2], 5, proof)
```

### Tree Information

#### `getLeaves(tree)`
Gets all leaves as Buffers.

```typescript
const leaves = getLeaves(tree)
```

#### `getHexLeaves(tree)`
Gets all leaves as hex strings.

```typescript
const hexLeaves = getHexLeaves(tree)
```

#### `getLeafCount(tree)`
Gets the number of leaves.

```typescript
const count = getLeafCount(tree)
```

#### `getLeaf(tree, index)`
Gets a specific leaf by index.

```typescript
const leaf = getLeaf(tree, 0)
```

#### `getHexLeaf(tree, index)`
Gets a specific leaf by index as a hex string.

```typescript
const hexLeaf = getHexLeaf(tree, 0)
```

#### `getLeafIndex(tree, leaf)`
Gets the index of a specific leaf.

```typescript
const index = getLeafIndex(tree, 'targetLeaf')
```

### Serialization

#### `marshalTree(tree)`
Converts a tree to JSON string.

```typescript
const json = marshalTree(tree)
```

#### `unmarshalTree(jsonStr, hashFn?, options?)`
Creates a tree from JSON string.

```typescript
const tree = unmarshalTree(jsonStr)
```

#### `marshalProof(proof)`
Converts a proof to JSON string.

```typescript
const proofJson = marshalProof(proof)
```

#### `unmarshalProof(jsonStr)`
Creates a proof from JSON string.

```typescript
const proof = unmarshalProof(proofJson)
```



## Hash Functions

The functional API uses **SHA256** as the default hash function. You can specify a custom hash function as the second parameter:

```typescript
import { createMerkleTree } from 'merkletreejs'

// Default SHA256
const tree = createMerkleTree(['a', 'b', 'c'])

// Custom keccak256
const keccakTree = createMerkleTree(['a', 'b', 'c'], (data) => {
  const keccak256 = require('keccak256')
  return keccak256(Buffer.from(String(data)))
})

// Custom SHA1
const sha1Tree = createMerkleTree(['a', 'b', 'c'], (data) => {
  const crypto = require('crypto')
  return crypto.createHash('sha1').update(data).digest()
})
```

## Options

The wrapper supports all options from the original MerkleTree class:

```typescript
const options = {
  duplicateOdd: false,        // Duplicate odd nodes
  hashLeaves: false,          // Hash leaves before adding (default: false)
  isBitcoinTree: false,       // Use Bitcoin-style tree
  sortLeaves: false,          // Sort leaves
  sortPairs: false,           // Sort pairs
  sort: false,                // Sort leaves and pairs
  fillDefaultHash: null,      // Fill default hash function
  complete: false,            // Create complete tree (recommended for multiproofs)
  concatenator: Buffer.concat // Concatenation function
}
```

## Examples

### Basic Usage

```typescript
import { createMerkleTree, getHexRoot, getProof, verifyProof } from 'merkletreejs'

// Create tree
const leaves = ['a', 'b', 'c', 'd']
const tree = createMerkleTree(leaves)
const root = getHexRoot(tree)

// Generate proof
const proof = getProof(tree, 'b')

// Verify proof
const isValid = verifyProof(proof, 'b', root)
console.log('Valid:', isValid) // true
```

### Object Data

```typescript
import { createMerkleTree, getHexRoot, getProof } from 'merkletreejs'

const data = [
  { owner: "0x123...", handle: "alice" },
  { owner: "0x456...", handle: "bob" }
]

// Hash the objects first, then create tree
const hashedData = data.map(item => Buffer.from(JSON.stringify(item)))
const tree = createMerkleTree(hashedData)
const root = getHexRoot(tree)

// Get proof for bob's data (need to hash it first)
const bobHash = Buffer.from(JSON.stringify(data[1]))
const bobProof = getProof(tree, bobHash)
```

### Advanced Options

```typescript
import { createMerkleTree } from 'merkletreejs'

// Bitcoin-style tree with SHA256 (default hash function)
const bitcoinTree = createMerkleTree(leaves, undefined, { 
  isBitcoinTree: true 
})

// Using keccak256 hash function
const keccakTree = createMerkleTree(leaves, (data) => {
  const keccak256 = require('keccak256')
  return keccak256(Buffer.from(String(data)))
})

// Sorted tree (recommended for multiproofs)
const sortedTree = createMerkleTree(leaves, undefined, { 
  sort: true 
})

// Complete tree (recommended for multiproofs)
const completeTree = createMerkleTree(leaves, undefined, { 
  complete: true 
})
```

### Tree Manipulation

```typescript
import { createMerkleTree, addLeaf, addLeaves, removeLeaf, updateLeaf } from 'merkletreejs'

let tree = createMerkleTree(['a', 'b'])

// Add single leaf
tree = addLeaf(tree, 'c')

// Add multiple leaves
tree = addLeaves(tree, ['d', 'e'])

// Add leaves with hashing
tree = addLeaf(tree, 'f', { shouldHash: true })
tree = addLeaves(tree, ['g', 'h'], { shouldHash: true })

// Update leaf
updateLeaf(tree, 0, 'newValue')

// Remove leaf
const removed = removeLeaf(tree, 0)
```

## Comparison with Original API

### Original MerkleTreeJS
```typescript
const tree = new MerkleTree(leaves, hashFn, options)
const root = tree.getHexRoot()
const proof = tree.getProof(leaf)
const isValid = tree.verify(proof, leaf, root)
```

### Functional API
```typescript
const tree = createMerkleTree(leaves, hashFn, options)
const root = getHexRoot(tree)
const proof = getProof(tree, leaf)
const isValid = verifyProof(proof, leaf, root)
```

## Benefits

1. **Intuitive API**: Functional approach inspired by viem
2. **Type Safety**: Full TypeScript support
3. **Flexible Input**: Accepts various data types
4. **Easy Integration**: Drop-in replacement for existing code
5. **Comprehensive**: All original features available
6. **Well Documented**: Clear examples and documentation

## Contributing

This functional API is designed to be a thin layer over the original MerkleTreeJS library. All the original functionality is preserved while providing a more intuitive API. Feel free to contribute improvements or additional features! 
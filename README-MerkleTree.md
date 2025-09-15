# MerkleTree Class Documentation

A comprehensive implementation of a Merkle Tree data structure for creating tamper-proof data structures and generating cryptographic proofs. This is the core class of the merkletreejs library.

## Features

- **Standard Merkle Tree**: Classic binary tree implementation
- **Multiple Hash Functions**: Support for SHA256, keccak256, and custom hash functions
- **Proof Generation**: Generate and verify inclusion proofs
- **Multi-Proofs**: Generate and verify proofs for multiple leaves simultaneously
- **Bitcoin Compatibility**: Support for Bitcoin-style Merkle trees
- **Serialization**: Marshal/unmarshal trees and proofs to/from JSON
- **Flexible Options**: Configurable sorting, duplicate handling, and tree completion
- **Type Safety**: Full TypeScript support with proper type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Create leaves (typically hashed data)
const leaves = ['a', 'b', 'c', 'd'].map(x => SHA256(x))

// Create tree
const tree = new MerkleTree(leaves, SHA256)

// Get root
const root = tree.getRoot()
const hexRoot = tree.getHexRoot()

// Generate proof
const leaf = SHA256('b')
const proof = tree.getProof(leaf)

// Verify proof
const verified = tree.verify(proof, leaf, root)
console.log('Proof verified:', verified) // true
```

## Constructor

### `new MerkleTree(leaves, hashFunction?, options?)`

Creates a new Merkle tree instance.

**Parameters:**
- `leaves` (Buffer[]): Array of leaf nodes (should be pre-hashed)
- `hashFunction` (Function): Hash function to use (defaults to SHA256)
- `options` (Options): Configuration options

**Example:**
```typescript
const tree = new MerkleTree(leaves, SHA256, {
  sortPairs: true,
  duplicateOdd: false
})
```

## Options

```typescript
interface Options {
  duplicateOdd?: boolean        // Duplicate odd nodes (default: false)
  hashLeaves?: boolean          // Hash leaves before adding (default: false)
  isBitcoinTree?: boolean       // Use Bitcoin-style tree (default: false)
  sortLeaves?: boolean          // Sort leaves (default: false)
  sortPairs?: boolean           // Sort pairs (default: false)
  sort?: boolean                // Sort leaves and pairs (default: false)
  fillDefaultHash?: Function    // Fill function for odd layers
  complete?: boolean            // Create complete tree (default: false)
  concatenator?: Function       // Custom concatenation function
}
```

## Core Methods

### Tree Information

#### `getRoot()`
Returns the Merkle root as a Buffer.

```typescript
const root = tree.getRoot()
```

#### `getHexRoot()`
Returns the Merkle root as a hex string with '0x' prefix.

```typescript
const hexRoot = tree.getHexRoot()
```

#### `getLeaves(values?)`
Returns array of leaves. Optionally filter by specific values.

```typescript
const allLeaves = tree.getLeaves()
const filteredLeaves = tree.getLeaves([specificHash1, specificHash2])
```

#### `getHexLeaves()`
Returns array of leaves as hex strings.

```typescript
const hexLeaves = tree.getHexLeaves()
```

#### `getLeafCount()`
Returns the total number of leaves.

```typescript
const count = tree.getLeafCount()
```

#### `getDepth()`
Returns the tree depth (number of layers).

```typescript
const depth = tree.getDepth()
```

### Leaf Operations

#### `getLeaf(index)`
Gets a leaf by index.

```typescript
const leaf = tree.getLeaf(0)
```

#### `getHexLeaf(index)`
Gets a leaf by index as hex string.

```typescript
const hexLeaf = tree.getHexLeaf(0)
```

#### `getLeafIndex(leaf)`
Gets the index of a leaf (-1 if not found).

```typescript
const index = tree.getLeafIndex(leafHash)
```

#### `addLeaf(leaf, shouldHash?)`
Adds a single leaf to the tree.

```typescript
tree.addLeaf(newLeafHash)
tree.addLeaf('raw data', true) // Hash before adding
```

#### `addLeaves(leaves, shouldHash?)`
Adds multiple leaves to the tree.

```typescript
tree.addLeaves([hash1, hash2, hash3])
tree.addLeaves(['data1', 'data2'], true) // Hash before adding
```

#### `removeLeaf(index)`
Removes a leaf by index.

```typescript
const removedLeaf = tree.removeLeaf(2)
```

#### `updateLeaf(index, value, shouldHash?)`
Updates a leaf at specific index.

```typescript
tree.updateLeaf(1, newHash)
tree.updateLeaf(1, 'new data', true) // Hash before updating
```

### Proof Operations

#### `getProof(leaf, index?)`
Generates a proof for a leaf.

```typescript
const proof = tree.getProof(leafHash)
// For duplicate leaves, specify index
const proof = tree.getProof(leafHash, 2)
```

#### `getHexProof(leaf, index?)`
Generates a proof as hex strings.

```typescript
const hexProof = tree.getHexProof(leafHash)
```

#### `getPositionalHexProof(leaf, index?)`
Generates a proof with positional information.

```typescript
const positionalProof = tree.getPositionalHexProof(leafHash)
// Returns: [[position, hash], [position, hash], ...]
```

#### `verify(proof, targetNode, root)`
Verifies a proof against a root.

```typescript
const isValid = tree.verify(proof, leafHash, root)
```

#### `getProofs()`
Gets proofs for all leaves.

```typescript
const allProofs = tree.getProofs()
```

#### `getHexProofs()`
Gets proofs for all leaves as hex strings.

```typescript
const allHexProofs = tree.getHexProofs()
```

### Multi-Proof Operations

#### `getMultiProof(indices)`
Generates a multi-proof for multiple leaves.

```typescript
const multiProof = tree.getMultiProof([0, 2, 4])
```

#### `getHexMultiProof(tree, indices)`
Generates a multi-proof as hex strings.

```typescript
const hexMultiProof = tree.getHexMultiProof(flatTree, [0, 2, 4])
```

#### `verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof)`
Verifies a multi-proof.

```typescript
const isValid = tree.verifyMultiProof(
  root, 
  [0, 2, 4], 
  [leaf0, leaf2, leaf4], 
  totalLeaves, 
  multiProof
)
```

#### `getProofFlags(leaves, proofs)`
Gets boolean flags for multi-proof verification.

```typescript
const flags = tree.getProofFlags([leaf0, leaf2], multiProof)
```

### Layer Operations

#### `getLayers()`
Gets all tree layers as 2D array of Buffers.

```typescript
const layers = tree.getLayers()
```

#### `getHexLayers()`
Gets all tree layers as 2D array of hex strings.

```typescript
const hexLayers = tree.getHexLayers()
```

#### `getLayersFlat()`
Gets all tree layers as flat array.

```typescript
const flatLayers = tree.getLayersFlat()
```

#### `getHexLayersFlat()`
Gets all tree layers as flat array of hex strings.

```typescript
const hexFlatLayers = tree.getHexLayersFlat()
```

### Serialization

#### `static marshalLeaves(leaves)`
Converts leaves to JSON string.

```typescript
const jsonLeaves = MerkleTree.marshalLeaves(leaves)
```

#### `static unmarshalLeaves(jsonStr)`
Converts JSON string back to leaves.

```typescript
const leaves = MerkleTree.unmarshalLeaves(jsonLeaves)
```

#### `static marshalProof(proof)`
Converts proof to JSON string.

```typescript
const jsonProof = MerkleTree.marshalProof(proof)
```

#### `static unmarshalProof(jsonStr)`
Converts JSON string back to proof.

```typescript
const proof = MerkleTree.unmarshalProof(jsonProof)
```

#### `static marshalTree(tree)`
Converts entire tree to JSON string.

```typescript
const jsonTree = MerkleTree.marshalTree(tree)
```

#### `static unmarshalTree(jsonStr, hashFn?, options?)`
Recreates tree from JSON string.

```typescript
const tree = MerkleTree.unmarshalTree(jsonTree, SHA256)
```

### Utility Methods

#### `resetTree()`
Clears all leaves and layers.

```typescript
tree.resetTree()
```

#### `toString()`
Returns visual representation of the tree.

```typescript
console.log(tree.toString())
```

#### `getOptions()`
Returns current tree options.

```typescript
const options = tree.getOptions()
```

## Static Methods

### `MerkleTree.verify(proof, targetNode, root, hashFn?, options?)`
Static method to verify a proof without tree instance.

```typescript
const isValid = MerkleTree.verify(proof, leaf, root, SHA256)
```

### `MerkleTree.getMultiProof(tree, indices)`
Static method to generate multi-proof from flat tree.

```typescript
const multiProof = MerkleTree.getMultiProof(flatTree, [0, 2, 4])
```

## Examples

### Basic Usage

```typescript
import { MerkleTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Prepare data
const leaves = ['alice', 'bob', 'charlie', 'dave'].map(x => SHA256(x))

// Create tree
const tree = new MerkleTree(leaves, SHA256)

// Get root
const root = tree.getHexRoot()
console.log('Root:', root)

// Generate and verify proof
const leaf = SHA256('bob')
const proof = tree.getProof(leaf)
const verified = tree.verify(proof, leaf, tree.getRoot())
console.log('Proof verified:', verified)
```

### Bitcoin-Style Tree

```typescript
const tree = new MerkleTree(leaves, SHA256, {
  isBitcoinTree: true
})
```

### Sorted Tree (Recommended for Multi-Proofs)

```typescript
const tree = new MerkleTree(leaves, SHA256, {
  sortPairs: true,
  sortLeaves: true
})
```

### Complete Tree

```typescript
const tree = new MerkleTree(leaves, SHA256, {
  complete: true // Creates a complete binary tree
})
```

### Working with Raw Data

```typescript
// Hash leaves automatically
const tree = new MerkleTree(['a', 'b', 'c'], SHA256, {
  hashLeaves: true
})

// Or hash manually
const leaves = ['a', 'b', 'c'].map(x => SHA256(x))
const tree = new MerkleTree(leaves, SHA256)
```

### Multi-Proof Example

```typescript
const tree = new MerkleTree(leaves, SHA256, { complete: true })
const indices = [0, 2, 4]
const multiProof = tree.getMultiProof(indices)
const proofLeaves = indices.map(i => leaves[i])

const verified = tree.verifyMultiProof(
  tree.getRoot(),
  indices,
  proofLeaves,
  leaves.length,
  multiProof
)
```

### Serialization Example

```typescript
// Serialize tree
const jsonTree = MerkleTree.marshalTree(tree)
localStorage.setItem('merkleTree', jsonTree)

// Deserialize tree
const savedTree = localStorage.getItem('merkleTree')
const restoredTree = MerkleTree.unmarshalTree(savedTree, SHA256)
```

## Advanced Features

### Custom Hash Functions

```typescript
const customHash = (data) => {
  return crypto.createHash('sha1').update(data).digest()
}

const tree = new MerkleTree(leaves, customHash)
```

### Custom Concatenator

```typescript
const tree = new MerkleTree(leaves, SHA256, {
  concatenator: (buffers) => {
    // Custom way to combine buffers
    return Buffer.concat(buffers.reverse())
  }
})
```

### Fill Default Hash

```typescript
const tree = new MerkleTree(leaves, SHA256, {
  fillDefaultHash: (index, hashFn) => {
    return hashFn(`default-${index}`)
  }
})
```

## Performance Considerations

- Use `complete: true` for better multi-proof performance
- Sort pairs and leaves for consistent tree structure
- Consider tree depth for large datasets
- Use static methods when you don't need tree instance

## Security Notes

- Always hash your input data before creating leaves
- Use cryptographically secure hash functions
- Validate proofs on both client and server side
- Be aware of second preimage attacks with certain configurations

## Browser Support

The MerkleTree class works in both Node.js and browser environments. For browser usage, ensure you have appropriate polyfills for Buffer operations.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all methods and options. 
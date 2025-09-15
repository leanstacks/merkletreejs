# MerkleSumTree Class Documentation

A specialized Merkle tree implementation that maintains sums of ranges, enabling efficient range queries and proofs. This implementation is based on the Merkle Sum Tree concept and is particularly useful for applications requiring verifiable range proofs and sum calculations.

## Features

- **Range-Based Proofs**: Generate proofs for data within specific ranges
- **Sum Verification**: Verify that sums are correctly calculated across ranges
- **Consecutive Ranges**: Ensures leaf ranges are consecutive and non-overlapping
- **Bucket Organization**: Efficient bucket-based storage with size tracking
- **Cryptographic Security**: Uses configurable hash functions for security
- **Proof Steps**: Detailed proof steps with positional information
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { MerkleSumTree, Leaf } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Create leaves with ranges and data
const leaves = [
  new Leaf(SHA256, [0, 10], Buffer.from('data1')),
  new Leaf(SHA256, [10, 25], Buffer.from('data2')),
  new Leaf(SHA256, [25, 30], Buffer.from('data3'))
]

// Create tree
const tree = new MerkleSumTree(leaves, SHA256)

// Get root bucket
const root = tree.root
console.log('Root size:', root.size.toString())
console.log('Root hash:', root.hashed.toString('hex'))

// Generate proof for leaf at index 1
const proof = tree.getProof(1)

// Verify proof
const isValid = tree.verifyProof(root, leaves[1], proof)
console.log('Proof verified:', isValid)
```

## Core Classes

### Leaf Class

Represents a leaf node with a range and associated data.

#### Constructor
```typescript
new Leaf(hashFn, range, data)
```

**Parameters:**
- `hashFn` (Function): Hash function to use
- `range` (number[] | BigInt[]): [start, end] range values
- `data` (Buffer | null): Associated data

**Example:**
```typescript
const leaf = new Leaf(SHA256, [0, 100], Buffer.from('my data'))
```

#### Methods

##### `getBucket()`
Returns a bucket representation of the leaf.

```typescript
const bucket = leaf.getBucket()
console.log('Bucket size:', bucket.size.toString())
console.log('Bucket hash:', bucket.hashed.toString('hex'))
```

### Bucket Class

Represents a tree node with size and hash information.

#### Constructor
```typescript
new Bucket(size, hashed)
```

**Parameters:**
- `size` (BigInt | number): Size of the bucket
- `hashed` (Buffer): Hash of the bucket

#### Properties
- `size` (BigInt): Size of the bucket
- `hashed` (Buffer): Hash value
- `parent` (Bucket | null): Parent bucket
- `left` (Bucket | null): Left sibling
- `right` (Bucket | null): Right sibling

### ProofStep Class

Represents a step in a proof path.

#### Constructor
```typescript
new ProofStep(bucket, right)
```

**Parameters:**
- `bucket` (Bucket): The bucket for this proof step
- `right` (boolean): Whether the bucket should be on the right side

## MerkleSumTree Class

### Constructor

```typescript
new MerkleSumTree(leaves, hashFn)
```

**Parameters:**
- `leaves` (Leaf[]): Array of leaf nodes with consecutive ranges
- `hashFn` (Function): Hash function to use

**Example:**
```typescript
const tree = new MerkleSumTree(leaves, SHA256)
```

### Properties

- `leaves` (Leaf[]): Original leaf nodes
- `buckets` (Bucket[]): Bucket representation of leaves
- `root` (Bucket): Root bucket of the tree
- `hashFn` (Function): Hash function used

### Methods

#### `getProof(index)`
Generates an inclusion/exclusion proof for a bucket at the specified index.

**Parameters:**
- `index` (number | BigInt): Index of the leaf to prove

**Returns:** Array of ProofStep objects

```typescript
const proof = tree.getProof(1)
console.log('Proof steps:', proof.length)
```

#### `verifyProof(root, leaf, proof)`
Verifies a proof for a specific leaf against the root bucket.

**Parameters:**
- `root` (Bucket): Root bucket to verify against
- `leaf` (Leaf): Leaf being proven
- `proof` (ProofStep[]): Proof steps

**Returns:** boolean - true if proof is valid

```typescript
const isValid = tree.verifyProof(tree.root, leaves[1], proof)
```

#### `sum(arr)`
Calculates the sum of an array of BigInt values.

**Parameters:**
- `arr` (BigInt[]): Array of values to sum

**Returns:** BigInt - Sum of all values

```typescript
const total = tree.sum([BigInt(10), BigInt(20), BigInt(30)])
// Returns: BigInt(60)
```

#### `static checkConsecutive(leaves)`
Validates that leaf ranges are consecutive and non-overlapping.

**Parameters:**
- `leaves` (Leaf[]): Array of leaves to validate

**Throws:** Error if ranges are invalid

```typescript
MerkleSumTree.checkConsecutive(leaves) // Validates ranges
```

## Examples

### Basic Usage

```typescript
import { MerkleSumTree, Leaf } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Create consecutive range leaves
const leaves = [
  new Leaf(SHA256, [0, 50], Buffer.from('Alice: 50 tokens')),
  new Leaf(SHA256, [50, 120], Buffer.from('Bob: 70 tokens')),
  new Leaf(SHA256, [120, 200], Buffer.from('Charlie: 80 tokens'))
]

// Create tree
const tree = new MerkleSumTree(leaves, SHA256)

console.log('Total sum:', tree.root.size.toString()) // 200
console.log('Root hash:', tree.root.hashed.toString('hex'))
```

### Range Proof Generation and Verification

```typescript
// Generate proof for Bob's tokens (index 1)
const bobProof = tree.getProof(1)

console.log('Proof steps for Bob:')
bobProof.forEach((step, i) => {
  console.log(`Step ${i}:`, {
    size: step.bucket.size.toString(),
    hash: step.bucket.hashed.toString('hex'),
    right: step.right
  })
})

// Verify the proof
const isValidProof = tree.verifyProof(tree.root, leaves[1], bobProof)
console.log('Bob\'s proof is valid:', isValidProof)
```

### Financial Balance Verification

```typescript
// Financial balance example
const balanceLeaves = [
  new Leaf(SHA256, [0, 1000], Buffer.from('Account A: $1000')),
  new Leaf(SHA256, [1000, 2500], Buffer.from('Account B: $1500')),
  new Leaf(SHA256, [2500, 3000], Buffer.from('Account C: $500')),
  new Leaf(SHA256, [3000, 5000], Buffer.from('Account D: $2000'))
]

const balanceTree = new MerkleSumTree(balanceLeaves, SHA256)

console.log('Total balance:', balanceTree.root.size.toString()) // $5000

// Prove Account B's balance
const accountBProof = balanceTree.getProof(1)
const accountBValid = balanceTree.verifyProof(
  balanceTree.root, 
  balanceLeaves[1], 
  accountBProof
)
console.log('Account B proof valid:', accountBValid)
```

### Supply Chain Tracking

```typescript
// Supply chain with cumulative quantities
const supplyLeaves = [
  new Leaf(SHA256, [0, 100], Buffer.from('Supplier A: 100 units')),
  new Leaf(SHA256, [100, 350], Buffer.from('Supplier B: 250 units')),
  new Leaf(SHA256, [350, 500], Buffer.from('Supplier C: 150 units'))
]

const supplyTree = new MerkleSumTree(supplyLeaves, SHA256)

// Verify total supply
console.log('Total supply:', supplyTree.root.size.toString()) // 500 units

// Generate proof for Supplier B
const supplierBProof = supplyTree.getProof(1)
const supplierBValid = supplyTree.verifyProof(
  supplyTree.root,
  supplyLeaves[1],
  supplierBProof
)
```

### Voting System with Weighted Votes

```typescript
// Voting system where ranges represent vote weights
const voteLeaves = [
  new Leaf(SHA256, [0, 25], Buffer.from('Proposal A: 25 votes')),
  new Leaf(SHA256, [25, 70], Buffer.from('Proposal B: 45 votes')),
  new Leaf(SHA256, [70, 100], Buffer.from('Proposal C: 30 votes'))
]

const voteTree = new MerkleSumTree(voteLeaves, SHA256)

console.log('Total votes:', voteTree.root.size.toString()) // 100

// Prove Proposal B received 45 votes
const proposalBProof = voteTree.getProof(1)
const proposalBValid = voteTree.verifyProof(
  voteTree.root,
  voteLeaves[1],
  proposalBProof
)

console.log('Proposal B vote proof valid:', proposalBValid)
```

### Working with Large Numbers

```typescript
// Using BigInt for large values
const largeLeaves = [
  new Leaf(SHA256, [0n, 1000000000000n], Buffer.from('Large value 1')),
  new Leaf(SHA256, [1000000000000n, 2500000000000n], Buffer.from('Large value 2')),
  new Leaf(SHA256, [2500000000000n, 3000000000000n], Buffer.from('Large value 3'))
]

const largeTree = new MerkleSumTree(largeLeaves, SHA256)
console.log('Large total:', largeTree.root.size.toString())

// Proof generation works the same
const largeProof = largeTree.getProof(0)
const largeValid = largeTree.verifyProof(largeTree.root, largeLeaves[0], largeProof)
```

### Custom Hash Functions

```typescript
import { keccak256 } from 'js-sha3'

// Using keccak256 instead of SHA256
const customHashFn = (data) => {
  return Buffer.from(keccak256.arrayBuffer(data))
}

const customLeaves = [
  new Leaf(customHashFn, [0, 10], Buffer.from('data1')),
  new Leaf(customHashFn, [10, 20], Buffer.from('data2'))
]

const customTree = new MerkleSumTree(customLeaves, customHashFn)
```

## Advanced Features

### Range Validation

The tree automatically validates that ranges are consecutive:

```typescript
// This will throw an error - ranges are not consecutive
try {
  const invalidLeaves = [
    new Leaf(SHA256, [0, 10], Buffer.from('data1')),
    new Leaf(SHA256, [15, 25], Buffer.from('data2')), // Gap: 10-15 missing
    new Leaf(SHA256, [25, 30], Buffer.from('data3'))
  ]
  const invalidTree = new MerkleSumTree(invalidLeaves, SHA256)
} catch (error) {
  console.log('Error:', error.message) // "leaf ranges are invalid"
}
```

### Proof Analysis

```typescript
// Analyze proof structure
const proof = tree.getProof(1)
console.log('Proof analysis:')

let totalLeftSize = BigInt(0)
let totalRightSize = BigInt(0)

proof.forEach((step, i) => {
  if (step.right) {
    totalRightSize += step.bucket.size
  } else {
    totalLeftSize += step.bucket.size
  }
  
  console.log(`Step ${i}: Size ${step.bucket.size}, Position: ${step.right ? 'right' : 'left'}`)
})

console.log('Total left size:', totalLeftSize.toString())
console.log('Total right size:', totalRightSize.toString())
```

### Tree Structure Inspection

```typescript
// Inspect tree structure
console.log('Tree structure:')
console.log('Number of leaves:', tree.leaves.length)
console.log('Number of buckets:', tree.buckets.length)
console.log('Root size:', tree.root.size.toString())

// Inspect individual buckets
tree.buckets.forEach((bucket, i) => {
  console.log(`Bucket ${i}: Size ${bucket.size}, Hash ${bucket.hashed.toString('hex').slice(0, 8)}...`)
})
```

## Performance Considerations

- **Range Continuity**: Ensure ranges are consecutive to avoid validation errors
- **Data Size**: Large data in leaves affects hash computation time
- **Proof Size**: Proof size is logarithmic with respect to number of leaves
- **BigInt Operations**: Use BigInt for large range values to avoid overflow

## Security Notes

- **Range Validation**: Tree validates range continuity automatically
- **Hash Function**: Use cryptographically secure hash functions
- **Proof Verification**: Always verify proofs on both client and server
- **Range Boundaries**: Ensure range boundaries are correctly specified

## Use Cases

- **Financial Systems**: Prove account balances within ranges
- **Supply Chain**: Track cumulative quantities with proofs
- **Voting Systems**: Verify weighted vote totals
- **Resource Allocation**: Prove resource distribution across ranges
- **Audit Trails**: Maintain verifiable sum calculations
- **Token Distribution**: Prove token allocations within ranges

## Browser Support

Works in both Node.js and browser environments. Ensure you have appropriate Buffer and BigInt support for your target environment.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all classes and methods. The library properly handles BigInt types for large range values. 
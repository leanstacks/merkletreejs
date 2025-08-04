// eslint-disable-next-line no-unused-vars
import { MerkleTree, Options } from './MerkleTree'
import SHA256 from 'crypto-js/sha256'

// Types for the viem-like interface
export type Leaf = Buffer | string | number | BigInt
export type LeafData = Buffer
export type HashFunction = (data: any) => Buffer
export type Proof = { position: 'left' | 'right'; data: Buffer }[]
export type HexProof = string[]

// Default hash function
const defaultHashFn = SHA256

/**
 * Creates a Merkle tree from an array of leaves
 * @param leaves - Array of leaves (strings, buffers, objects, etc.)
 * @param hashFn - Optional hash function (defaults to SHA256)
 * @param options - Merkle tree options
 * @returns MerkleTree instance
 */
export function createMerkleTree (
  leaves: LeafData[],
  hashFn: HashFunction = defaultHashFn,
  options: Options = {}
): MerkleTree {
  return new MerkleTree(leaves, hashFn, options)
}

/**
 * Gets the root hash of a Merkle tree as hex string
 * @param tree - MerkleTree instance
 * @returns Root hash as hex string
 */
export function getHexRoot (tree: MerkleTree): string {
  return tree.getHexRoot()
}

/**
 * Gets the root hash of a Merkle tree as Buffer
 * @param tree - MerkleTree instance
 * @returns Root hash as Buffer
 */
export function getRoot (tree: MerkleTree): Buffer {
  return tree.getRoot()
}

/**
 * Adds a leaf to an existing Merkle tree
 * @param tree - MerkleTree instance
 * @param leaf - Leaf to add
 * @param options - Options object with shouldHash property
 * @returns Updated MerkleTree instance
 */
export function addLeaf (
  tree: MerkleTree,
  leaf: LeafData,
  options: { shouldHash?: boolean } = {}
): MerkleTree {
  tree.addLeaf(leaf, options.shouldHash || false)
  return tree
}

/**
 * Adds multiple leaves to an existing Merkle tree
 * @param tree - MerkleTree instance
 * @param leaves - Array of leaves to add
 * @param options - Options object with shouldHash property
 * @returns Updated MerkleTree instance
 */
export function addLeaves (
  tree: MerkleTree,
  leaves: LeafData[],
  options: { shouldHash?: boolean } = {}
): MerkleTree {
  tree.addLeaves(leaves, options.shouldHash || false)
  return tree
}

/**
 * Gets a proof for a specific leaf
 * @param tree - MerkleTree instance
 * @param leaf - Target leaf
 * @param index - Optional leaf index (for duplicate leaves)
 * @returns Proof as array of objects with position and data
 */
export function getProof (
  tree: MerkleTree,
  leaf: LeafData,
  index?: number
): Proof {
  return tree.getProof(leaf, index)
}

/**
 * Gets a proof for a specific leaf as hex strings
 * @param tree - MerkleTree instance
 * @param leaf - Target leaf
 * @param index - Optional leaf index (for duplicate leaves)
 * @returns Proof as array of hex strings
 */
export function getHexProof (
  tree: MerkleTree,
  leaf: LeafData,
  index?: number
): HexProof {
  return tree.getHexProof(leaf, index)
}

/**
 * Verifies a proof against a root and target leaf
 * @param proof - Proof array
 * @param leaf - Target leaf
 * @param root - Merkle root
 * @param hashFn - Hash function used to create the tree
 * @param options - Options used to create the tree
 * @returns Boolean indicating if proof is valid
 */
export function verifyProof (
  proof: Proof | HexProof,
  leaf: LeafData,
  root: string | Buffer,
  hashFn: HashFunction = defaultHashFn,
  options: Options = {}
): boolean {
  return MerkleTree.verify(proof, leaf, root, hashFn, options)
}

/**
 * Gets all leaves from a Merkle tree
 * @param tree - MerkleTree instance
 * @returns Array of leaves as Buffers
 */
export function getLeaves (tree: MerkleTree): Buffer[] {
  return tree.getLeaves()
}

/**
 * Gets all leaves from a Merkle tree as hex strings
 * @param tree - MerkleTree instance
 * @returns Array of leaves as hex strings
 */
export function getHexLeaves (tree: MerkleTree): string[] {
  return tree.getHexLeaves()
}

/**
 * Gets a leaf from a Merkle tree as hex string
 * @param tree - MerkleTree instance
 * @param index - Leaf index
 * @returns Leaf as hex string
 */
export function getHexLeaf (tree: MerkleTree, index: number): string {
  return tree.getHexLeaf(index)
}

/**
 * Gets the leaf count
 * @param tree - MerkleTree instance
 * @returns Number of leaves
 */
export function getLeafCount (tree: MerkleTree): number {
  return tree.getLeafCount()
}

/**
 * Gets a specific leaf by index
 * @param tree - MerkleTree instance
 * @param index - Leaf index
 * @returns Leaf as Buffer
 */
export function getLeaf (tree: MerkleTree, index: number): Buffer {
  return tree.getLeaf(index)
}

/**
 * Gets the index of a specific leaf
 * @param tree - MerkleTree instance
 * @param leaf - Target leaf
 * @returns Leaf index or -1 if not found
 */
export function getLeafIndex (tree: MerkleTree, leaf: LeafData): number {
  return tree.getLeafIndex(leaf)
}

/**
 * Removes a leaf by index
 * @param tree - MerkleTree instance
 * @param index - Leaf index to remove
 * @returns Removed leaf as Buffer
 */
export function removeLeaf (tree: MerkleTree, index: number): Buffer {
  return tree.removeLeaf(index)
}

/**
 * Updates a leaf at a specific index
 * @param tree - MerkleTree instance
 * @param index - Leaf index to update
 * @param value - New leaf value
 * @param options - Options object with shouldHash property
 */
export function updateLeaf (
  tree: MerkleTree,
  index: number,
  value: LeafData,
  options: { shouldHash?: boolean } = {}
): void {
  tree.updateLeaf(index, value, options.shouldHash || false)
}

/**
 * Gets all proofs for all leaves
 * @param tree - MerkleTree instance
 * @returns Array of all proofs
 */
export function getProofs (tree: MerkleTree): Proof[] {
  return tree.getProofs()
}

/**
 * Gets all proofs for all leaves as hex strings
 * @param tree - MerkleTree instance
 * @returns Array of all proofs as hex strings
 */
export function getHexProofs (tree: MerkleTree): string[] {
  return tree.getHexProofs()
}

/**
 * Gets multiproof for multiple indices
 * @param tree - MerkleTree instance
 * @param indices - Array of leaf indices
 * @returns Multiproof as array of Buffers
 */
export function getMultiProof (tree: MerkleTree, indices: number[]): Buffer[] {
  return tree.getMultiProof(indices)
}

/**
 * Gets multiproof for multiple indices as hex strings
 * @param tree - MerkleTree instance
 * @param indices - Array of leaf indices
 * @returns Multiproof as array of hex strings
 */
export function getHexMultiProof (tree: MerkleTree, indices: number[]): string[] {
  return tree.getHexMultiProof(tree.getLayersFlat(), indices)
}

/**
 * Verifies a multiproof
 * @param root - Merkle root
 * @param proofIndices - Leaf indices for proof
 * @param proofLeaves - Leaf values at indices
 * @param leavesCount - Total number of leaves
 * @param proof - Multiproof
 * @param hashFn - Hash function
 * @param options - Tree options
 * @returns Boolean indicating if multiproof is valid
 */
export function verifyMultiProof (
  root: string | Buffer,
  proofIndices: number[],
  proofLeaves: LeafData[],
  leavesCount: number,
  proof: Buffer[] | string[],
  hashFn: HashFunction = defaultHashFn,
  options: Options = {}
): boolean {
  const tree = new MerkleTree([], hashFn, options)
  return tree.verifyMultiProof(root, proofIndices, proofLeaves, leavesCount, proof)
}

// Note: getProofFlags function removed due to compilation issue with the underlying method
// The getProofFlags method exists in the source but is not being compiled correctly

/**
 * Gets the tree depth
 * @param tree - MerkleTree instance
 * @returns Tree depth (number of layers - 1)
 */
export function getDepth (tree: MerkleTree): number {
  return tree.getDepth()
}

/**
 * Gets all layers of the tree
 * @param tree - MerkleTree instance
 * @returns Array of layers as Buffers
 */
export function getLayers (tree: MerkleTree): Buffer[][] {
  return tree.getLayers()
}

/**
 * Gets all layers of the tree as hex strings
 * @param tree - MerkleTree instance
 * @returns Array of layers as hex strings
 */
export function getHexLayers (tree: MerkleTree): string[][] {
  return tree.getHexLayers()
}

/**
 * Gets flattened layers
 * @param tree - MerkleTree instance
 * @returns Flattened array of all nodes
 */
export function getLayersFlat (tree: MerkleTree): Buffer[] {
  return tree.getLayersFlat()
}

/**
 * Gets flattened layers as hex strings
 * @param tree - MerkleTree instance
 * @returns Flattened array of all nodes as hex strings
 */
export function getHexLayersFlat (tree: MerkleTree): string[] {
  return tree.getHexLayersFlat()
}

/**
 * Resets the tree by clearing all leaves and layers
 * @param tree - MerkleTree instance
 */
export function resetTree (tree: MerkleTree): void {
  tree.resetTree()
}

/**
 * Gets tree options
 * @param tree - MerkleTree instance
 * @returns Tree options object
 */
export function getOptions (tree: MerkleTree): Options {
  return tree.getOptions()
}

/**
 * Converts tree to string representation
 * @param tree - MerkleTree instance
 * @returns String representation of the tree
 */
export function treeToString (tree: MerkleTree): string {
  return tree.toString()
}

/**
 * Marshals leaves to JSON string
 * @param leaves - Array of leaves
 * @returns JSON string representation
 */
export function marshalLeaves (leaves: LeafData[]): string {
  return MerkleTree.marshalLeaves(leaves)
}

/**
 * Unmarshals leaves from JSON string
 * @param jsonStr - JSON string or object
 * @returns Array of leaves as Buffers
 */
export function unmarshalLeaves (jsonStr: string | object): Buffer[] {
  return MerkleTree.unmarshalLeaves(jsonStr)
}

/**
 * Marshals proof to JSON string
 * @param proof - Proof array
 * @returns JSON string representation
 */
export function marshalProof (proof: Proof | HexProof): string {
  return MerkleTree.marshalProof(proof)
}

/**
 * Unmarshals proof from JSON string
 * @param jsonStr - JSON string or object
 * @returns Proof array
 */
export function unmarshalProof (jsonStr: string | object): Proof {
  return MerkleTree.unmarshalProof(jsonStr)
}

/**
 * Marshals entire tree to JSON string
 * @param tree - MerkleTree instance
 * @returns JSON string representation of the tree
 */
export function marshalTree (tree: MerkleTree): string {
  return MerkleTree.marshalTree(tree)
}

/**
 * Unmarshals tree from JSON string
 * @param jsonStr - JSON string or object
 * @param hashFn - Hash function
 * @param options - Tree options
 * @returns MerkleTree instance
 */
export function unmarshalTree (
  jsonStr: string | object,
  hashFn: HashFunction = defaultHashFn,
  options: Options = {}
): MerkleTree {
  return MerkleTree.unmarshalTree(jsonStr, hashFn, options)
}

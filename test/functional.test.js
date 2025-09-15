const test = require('tape')
const SHA256 = require('crypto-js/sha256')
const {
  createMerkleTree,
  getRoot,
  getHexRoot,
  getProof,
  getHexProof,
  verifyProof,
  addLeaf,
  addLeaves,
  getLeaves,
  getHexLeaves,
  getHexLeaf,
  getLeafCount,
  getLeaf,
  getLeafIndex,
  removeLeaf,
  updateLeaf,
  getProofs,
  getHexProofs,
  getMultiProof,
  getHexMultiProof,
  verifyMultiProof,
  getDepth,
  getLayers,
  getHexLayers,
  getLayersFlat,
  getHexLayersFlat,
  resetTree,
  getOptions,
  treeToString,
  marshalLeaves,
  unmarshalLeaves,
  marshalProof,
  unmarshalProof,
  marshalTree,
  unmarshalTree,
  MerkleTree
} = require('../dist')

test('functional - Basic Merkle Tree Creation', t => {
  t.plan(5)

  const leaves = ['a', 'b', 'c', 'd']
  const tree = createMerkleTree(leaves)
  const root = getRoot(tree)
  const hexRoot = getHexRoot(tree)

  t.ok(Buffer.isBuffer(root), 'Root should be a Buffer')
  t.ok(hexRoot.startsWith('0x'), 'Hex root should be a hex string with 0x prefix')
  t.equal(hexRoot.length, 66, 'Hex root should be 32 bytes (64 hex chars) + 0x prefix')

  const leavesResult = getHexLeaves(tree)
  const tree2 = new MerkleTree(leaves)

  t.deepEqual(leavesResult, tree2.getHexLeaves(), 'Leaves should be SHA256 hashed values')
  t.equal(hexRoot, tree2.getHexRoot(), 'Hex root should be the same')
})

test('functional - Object Data Tree', t => {
  t.plan(2)

  const data = [
    {
      foo: 'bar'
    },
    {
      qux: 'baz'
    }
  ]

  const leaves = data.map(item => JSON.stringify(item))
  const objectTree = createMerkleTree(leaves)
  const objectRoot = getHexRoot(objectTree)

  t.ok(objectRoot.startsWith('0x'), 'Object tree root should be a hex string with 0x prefix')
  t.equal(objectRoot.length, 66, 'Object tree root should be 32 bytes (64 hex chars) + 0x prefix')
})

test('functional - Proof Generation and Verification', t => {
  t.plan(5)

  const leaves = ['a', 'b', 'c', 'd']
  const tree = createMerkleTree(leaves)
  const root = getHexRoot(tree)

  const targetLeaf = 'b'
  const proof = getProof(tree, targetLeaf)

  t.ok(Array.isArray(proof), 'Proof should be an array')
  t.ok(proof.length > 0, 'Proof should not be empty')

  const isValid = verifyProof(proof, targetLeaf, root)
  t.ok(isValid, 'Proof verification should be true')

  const hexProof = getHexProof(tree, targetLeaf)
  t.ok(Array.isArray(hexProof), 'Hex proof should be an array')

  const tree2 = new MerkleTree(leaves)
  t.deepEqual(hexProof, tree2.getHexProof(targetLeaf), 'Hex proof should be the same')
})

test('functional - Adding Leaves', t => {
  t.plan(5)

  const tree = createMerkleTree(['a', 'b', 'c'])
  const originalRoot = getHexRoot(tree)

  const updatedTree = addLeaf(tree, 'd')
  const newRoot = getHexRoot(updatedTree)

  t.notEqual(originalRoot, newRoot, 'Root should change after adding leaf')
  t.equal(getLeafCount(updatedTree), 4, 'Leaf count should be 4')

  const updatedTree2 = addLeaves(updatedTree, ['e', 'f'])
  t.equal(getLeafCount(updatedTree2), 6, 'Leaf count should be 6 after adding multiple leaves')

  const leaves = getLeaves(updatedTree2)
  t.deepEqual(leaves, updatedTree2.getLeaves(), 'Leaves should be the same')

  const tree2 = new MerkleTree(['a', 'b', 'c', 'd', 'e', 'f'])
  t.deepEqual(getHexLeaves(updatedTree2), tree2.getHexLeaves(), 'Leaves should be the same')
})

test('functional - Different Hash Functions', t => {
  t.plan(4)

  const leaves = ['a', 'b', 'c', 'd']

  // Use default hash function (SHA256) vs custom keccak256
  const sha256Tree = createMerkleTree(leaves)
  const sha256Root = getHexRoot(sha256Tree)

  const keccak256Tree = createMerkleTree(leaves, (data) => {
    const keccak256 = require('keccak256')
    return keccak256(Buffer.from(String(data)))
  })
  const keccak256Root = getHexRoot(keccak256Tree)

  t.notEqual(sha256Root, keccak256Root, 'Different hash functions should produce different roots')
  t.ok(sha256Root.startsWith('0x'), 'SHA256 root should be hex string')
  t.ok(keccak256Root.startsWith('0x'), 'Keccak256 root should be hex string')

  const tree2 = new MerkleTree(leaves, (data) => {
    const keccak256 = require('keccak256')
    return keccak256(Buffer.from(String(data)))
  })
  t.deepEqual(keccak256Root, tree2.getHexRoot(), 'Hex root should be the same')
})

test('functional - Complex Objects', t => {
  t.plan(4)

  const complexData = [
    { id: 1, name: 'Alice', balance: '100' },
    { id: 2, name: 'Bob', balance: '200' },
    { id: 3, name: 'Charlie', balance: '300' }
  ]

  const leaves = complexData.map(item => SHA256(JSON.stringify(item)).toString())
  const complexTree = createMerkleTree(leaves)
  const complexRoot = getHexRoot(complexTree)

  t.ok(complexRoot.startsWith('0x'), 'Complex object root should be hex string')

  // Get proof for Bob's data (need to hash the object first)
  const bobHash = Buffer.from(SHA256(JSON.stringify(complexData[1])).toString(), 'hex')
  const bobProof = getProof(complexTree, bobHash)

  t.ok(Array.isArray(bobProof), 'Bob proof should be an array')
  t.ok(bobProof.length > 0, 'Bob proof should not be empty')

  const isValid = verifyProof(bobProof, bobHash, complexRoot)
  t.ok(isValid, 'Bob proof verification should be true')
})

test('functional - Tree Manipulation', t => {
  t.plan(7)

  let tree = createMerkleTree(['a', 'b', 'c'])
  const originalCount = getLeafCount(tree)

  // Add single leaf
  tree = addLeaf(tree, 'd')
  t.equal(getLeafCount(tree), originalCount + 1, 'Leaf count should increase by 1')

  // Add multiple leaves
  tree = addLeaves(tree, ['e', 'f'])
  t.equal(getLeafCount(tree), originalCount + 3, 'Leaf count should increase by 3')

  // Get leaf by index
  const leaf = getLeaf(tree, 0)
  t.ok(Buffer.isBuffer(leaf), 'getLeaf should return a Buffer')

  // Get leaf index
  const index = getLeafIndex(tree, 'a')
  t.equal(index, 0, 'getLeafIndex should return correct index')

  // Remove leaf
  const removed = removeLeaf(tree, 0)
  t.ok(Buffer.isBuffer(removed), 'removeLeaf should return a Buffer')
  t.equal(getLeafCount(tree), originalCount + 2, 'Leaf count should decrease by 1 after removal')

  const tree2 = new MerkleTree(['a', 'b', 'c', 'd', 'e', 'f'])
  t.deepEqual(getHexLeaves(tree2), tree2.getHexLeaves(), 'Leaves should be the same')
})

test('functional - Advanced Options', t => {
  t.plan(5)

  const leaves = ['a', 'b', 'c', 'd']

  // Bitcoin-style tree
  const bitcoinTree = createMerkleTree(leaves, (data) => {
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(data).digest()
  }, { isBitcoinTree: true })
  const bitcoinRoot = getHexRoot(bitcoinTree)
  t.ok(bitcoinRoot.startsWith('0x'), 'Bitcoin-style root should be hex string')

  // Sorted tree
  const sortedTree = createMerkleTree(leaves, undefined, { sort: true })
  const sortedRoot = getHexRoot(sortedTree)
  t.ok(sortedRoot.startsWith('0x'), 'Sorted tree root should be hex string')

  // Complete tree
  const completeTree = createMerkleTree(leaves, undefined, { complete: true })
  const completeRoot = getHexRoot(completeTree)
  t.ok(completeRoot.startsWith('0x'), 'Complete tree root should be hex string')

  // Get options
  const options = getOptions(completeTree)
  t.ok(options.complete, 'Complete tree should have complete option set to true')

  const tree2 = new MerkleTree(leaves, (data) => {
    const crypto = require('crypto')
    return crypto.createHash('sha256').update(data).digest()
  }, { isBitcoinTree: true })
  t.deepEqual(bitcoinRoot, tree2.getHexRoot(), 'Hex root should be the same')
})

test('functional - Tree Information', t => {
  t.plan(12)

  const tree = createMerkleTree(['a', 'b', 'c', 'd'])

  const depth = getDepth(tree)
  t.ok(typeof depth === 'number', 'Depth should be a number')
  t.ok(depth >= 0, 'Depth should be non-negative')

  const layers = getLayers(tree)
  t.ok(Array.isArray(layers), 'Layers should be an array')
  t.ok(layers.length > 0, 'Layers should not be empty')

  const hexLayers = getHexLayers(tree)
  t.ok(Array.isArray(hexLayers), 'Hex layers should be an array')

  const layersFlat = getLayersFlat(tree)
  t.ok(Array.isArray(layersFlat), 'Flat layers should be an array')

  const hexLayersFlat = getHexLayersFlat(tree)
  t.ok(Array.isArray(hexLayersFlat), 'Hex flat layers should be an array')
  t.ok(hexLayersFlat.every(item => typeof item === 'string'), 'All hex flat layer items should be strings')

  const tree2 = new MerkleTree(['a', 'b', 'c', 'd'])
  t.deepEqual(layers, tree2.getLayers(), 'Layers should be the same')
  t.deepEqual(hexLayers, tree2.getHexLayers(), 'Hex layers should be the same')
  t.deepEqual(layersFlat, tree2.getLayersFlat(), 'Flat layers should be the same')
  t.deepEqual(hexLayersFlat, tree2.getHexLayersFlat(), 'Hex flat layers should be the same')
})

test('functional - MultiProof', t => {
  t.plan(5)

  const tree = createMerkleTree(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
  const indices = [0, 2, 4]

  const multiProof = getMultiProof(tree, indices)
  t.ok(Array.isArray(multiProof), 'MultiProof should be an array')

  const hexMultiProof = getHexMultiProof(tree, indices)
  t.ok(Array.isArray(hexMultiProof), 'Hex MultiProof should be an array')

  const root = getHexRoot(tree)
  const proofLeaves = indices.map(i => getLeaf(tree, i))
  const isValid = verifyMultiProof(root, indices, proofLeaves, getLeafCount(tree), multiProof)
  t.ok(isValid, 'MultiProof verification should be true')

  const tree2 = new MerkleTree(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
  t.deepEqual(multiProof, tree2.getMultiProof(indices), 'MultiProof should be the same')
  t.deepEqual(hexMultiProof, tree2.getHexMultiProof(indices), 'Hex MultiProof should be the same')
})

test('functional - Serialization', t => {
  t.plan(7)

  const tree = createMerkleTree(['a', 'b', 'c'])

  // Marshal tree
  const treeJson = marshalTree(tree)
  t.ok(typeof treeJson === 'string', 'Marshaled tree should be a string')
  t.ok(treeJson.includes('"root"'), 'Marshaled tree should contain root')

  // Unmarshal tree
  const unmarshaledTree = unmarshalTree(treeJson)
  const originalRoot = getHexRoot(tree)
  const unmarshaledRoot = getHexRoot(unmarshaledTree)
  t.equal(originalRoot, unmarshaledRoot, 'Unmarshaled tree should have same root')

  // Marshal proof
  const proof = getProof(tree, 'b')
  const proofJson = marshalProof(proof)
  t.ok(typeof proofJson === 'string', 'Marshaled proof should be a string')

  // Unmarshal proof
  const unmarshaledProof = unmarshalProof(proofJson)
  t.ok(Array.isArray(unmarshaledProof), 'Unmarshaled proof should be an array')

  // Marshal leaves
  const leaves = ['a', 'b', 'c']
  const leavesJson = marshalLeaves(leaves)
  t.ok(typeof leavesJson === 'string', 'Marshaled leaves should be a string')

  t.deepEqual(leavesJson, MerkleTree.marshalLeaves(leaves), 'Hex leaves should be the same')
})

test('functional - Tree Reset', t => {
  t.plan(2)

  const tree = createMerkleTree(['a', 'b', 'c'])
  const originalCount = getLeafCount(tree)

  resetTree(tree)
  const newCount = getLeafCount(tree)

  t.equal(newCount, 0, 'Tree should be empty after reset')
  t.notEqual(originalCount, newCount, 'Leaf count should change after reset')
})

test('functional - String Representation', t => {
  t.plan(2)

  const tree = createMerkleTree(['a', 'b', 'c'])
  const treeString = treeToString(tree)

  t.ok(typeof treeString === 'string', 'Tree string representation should be a string')

  const tree2 = new MerkleTree(['a', 'b', 'c'])
  t.deepEqual(treeString, tree2.toString(), 'Tree string representation should be the same')
})

test('functional - Buffer Operations', t => {
  t.plan(2)

  const tree = createMerkleTree(['a', 'b', 'c'])

  const rootBuffer = getRoot(tree)
  t.ok(Buffer.isBuffer(rootBuffer), 'Root buffer should be a Buffer')

  const hexLeaves = getHexLeaves(tree)
  t.ok(Array.isArray(hexLeaves), 'Hex leaves should be an array')
})

test('functional - All Proofs', t => {
  t.plan(4)

  const tree = createMerkleTree(['a', 'b', 'c'])

  const proofs = getProofs(tree)
  t.ok(Array.isArray(proofs), 'All proofs should be an array')

  const hexProofs = getHexProofs(tree)
  t.ok(Array.isArray(hexProofs), 'All hex proofs should be an array')

  const tree2 = new MerkleTree(['a', 'b', 'c'])
  t.deepEqual(proofs, tree2.getProofs(), 'Proofs should be the same')
  t.deepEqual(hexProofs, tree2.getHexProofs(), 'Hex proofs should be the same')
})

test('functional - Update Leaf', t => {
  t.plan(4)

  const tree = createMerkleTree(['a', 'b', 'c'])
  const originalRoot = getHexRoot(tree)
  const originalLeaf = getLeaf(tree, 1)

  // Update leaf at index 1 (originally 'b') to 'x'
  updateLeaf(tree, 1, 'x')
  const newRoot = getHexRoot(tree)
  const updatedLeaf = getHexLeaf(tree, 1)

  t.notEqual(originalRoot, newRoot, 'Root should change after updating leaf')
  t.notEqual(originalLeaf.toString('hex'), updatedLeaf.toString('hex'), 'Leaf should be different after update')
  t.equal(getLeafCount(tree), 3, 'Leaf count should remain the same')

  const tree2 = new MerkleTree(['a', 'x', 'c'])
  t.equal(updatedLeaf, tree2.getHexLeaf(1), 'Updated leaf should have correct value')
})

test('functional - Unmarshal Leaves', t => {
  t.plan(4)

  const originalLeaves = ['a', 'b', 'c']

  // Marshal leaves first
  const leavesJson = marshalLeaves(originalLeaves)
  t.ok(typeof leavesJson === 'string', 'Marshaled leaves should be a string')

  // Unmarshal leaves
  const unmarshaledLeaves = unmarshalLeaves(leavesJson)
  t.ok(Array.isArray(unmarshaledLeaves), 'Unmarshaled leaves should be an array')
  t.equal(unmarshaledLeaves.length, 3, 'Unmarshaled leaves should have correct length')

  // Verify the unmarshaled leaves match original (as hex)
  const tree2 = new MerkleTree(originalLeaves)

  t.deepEqual(unmarshaledLeaves, tree2.getLeaves(), 'Unmarshaled leaves should match original leaves')
})

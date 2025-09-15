[merkletreejs](../README.md) › [Globals](../globals.md) › ["src/functional"](_src_functional_.md)

# Module: "src/functional"

## Index

### Type aliases

* [HashFunction](_src_functional_.md#hashfunction)
* [HexProof](_src_functional_.md#hexproof)
* [Leaf](_src_functional_.md#leaf)
* [LeafData](_src_functional_.md#leafdata)
* [Proof](_src_functional_.md#proof)

### Variables

* [defaultHashFn](_src_functional_.md#const-defaulthashfn)

### Functions

* [addLeaf](_src_functional_.md#addleaf)
* [addLeaves](_src_functional_.md#addleaves)
* [createMerkleTree](_src_functional_.md#createmerkletree)
* [getDepth](_src_functional_.md#getdepth)
* [getHexLayers](_src_functional_.md#gethexlayers)
* [getHexLayersFlat](_src_functional_.md#gethexlayersflat)
* [getHexLeaf](_src_functional_.md#gethexleaf)
* [getHexLeaves](_src_functional_.md#gethexleaves)
* [getHexMultiProof](_src_functional_.md#gethexmultiproof)
* [getHexProof](_src_functional_.md#gethexproof)
* [getHexProofs](_src_functional_.md#gethexproofs)
* [getHexRoot](_src_functional_.md#gethexroot)
* [getLayers](_src_functional_.md#getlayers)
* [getLayersFlat](_src_functional_.md#getlayersflat)
* [getLeaf](_src_functional_.md#getleaf)
* [getLeafCount](_src_functional_.md#getleafcount)
* [getLeafIndex](_src_functional_.md#getleafindex)
* [getLeaves](_src_functional_.md#getleaves)
* [getMultiProof](_src_functional_.md#getmultiproof)
* [getOptions](_src_functional_.md#getoptions)
* [getProof](_src_functional_.md#getproof)
* [getProofs](_src_functional_.md#getproofs)
* [getRoot](_src_functional_.md#getroot)
* [marshalLeaves](_src_functional_.md#marshalleaves)
* [marshalProof](_src_functional_.md#marshalproof)
* [marshalTree](_src_functional_.md#marshaltree)
* [removeLeaf](_src_functional_.md#removeleaf)
* [resetTree](_src_functional_.md#resettree)
* [treeToString](_src_functional_.md#treetostring)
* [unmarshalLeaves](_src_functional_.md#unmarshalleaves)
* [unmarshalProof](_src_functional_.md#unmarshalproof)
* [unmarshalTree](_src_functional_.md#unmarshaltree)
* [updateLeaf](_src_functional_.md#updateleaf)
* [verifyMultiProof](_src_functional_.md#verifymultiproof)
* [verifyProof](_src_functional_.md#verifyproof)

## Type aliases

###  HashFunction

Ƭ **HashFunction**: *function*

#### Type declaration:

▸ (`data`: any): *Buffer*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

___

###  HexProof

Ƭ **HexProof**: *string[]*

___

###  Leaf

Ƭ **Leaf**: *Buffer | string | number | BigInt*

___

###  LeafData

Ƭ **LeafData**: *Buffer*

___

###  Proof

Ƭ **Proof**: *object[]*

## Variables

### `Const` defaultHashFn

• **defaultHashFn**: *any* = SHA256

## Functions

###  addLeaf

▸ **addLeaf**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `leaf`: [LeafData](_src_functional_.md#leafdata), `options`: object): *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Adds a leaf to an existing Merkle tree

**Parameters:**

▪ **tree**: *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

MerkleTree instance

▪ **leaf**: *[LeafData](_src_functional_.md#leafdata)*

Leaf to add

▪`Default value`  **options**: *object*= {}

Options object with shouldHash property

Name | Type |
------ | ------ |
`shouldHash?` | boolean |

**Returns:** *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Updated MerkleTree instance

___

###  addLeaves

▸ **addLeaves**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `leaves`: [LeafData](_src_functional_.md#leafdata)[], `options`: object): *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Adds multiple leaves to an existing Merkle tree

**Parameters:**

▪ **tree**: *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

MerkleTree instance

▪ **leaves**: *[LeafData](_src_functional_.md#leafdata)[]*

Array of leaves to add

▪`Default value`  **options**: *object*= {}

Options object with shouldHash property

Name | Type |
------ | ------ |
`shouldHash?` | boolean |

**Returns:** *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Updated MerkleTree instance

___

###  createMerkleTree

▸ **createMerkleTree**(`leaves`: [LeafData](_src_functional_.md#leafdata)[], `hashFn`: [HashFunction](_src_functional_.md#hashfunction), `options`: [Options](../interfaces/_src_merkletree_.options.md)): *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Creates a Merkle tree from an array of leaves

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`leaves` | [LeafData](_src_functional_.md#leafdata)[] | - | Array of leaves (strings, buffers, objects, etc.) |
`hashFn` | [HashFunction](_src_functional_.md#hashfunction) | defaultHashFn | Optional hash function (defaults to SHA256) |
`options` | [Options](../interfaces/_src_merkletree_.options.md) | {} | Merkle tree options |

**Returns:** *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

MerkleTree instance

___

###  getDepth

▸ **getDepth**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *number*

Gets the tree depth

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *number*

Tree depth (number of layers - 1)

___

###  getHexLayers

▸ **getHexLayers**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string[][]*

Gets all layers of the tree as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string[][]*

Array of layers as hex strings

___

###  getHexLayersFlat

▸ **getHexLayersFlat**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string[]*

Gets flattened layers as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string[]*

Flattened array of all nodes as hex strings

___

###  getHexLeaf

▸ **getHexLeaf**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `index`: number): *string*

Gets a leaf from a Merkle tree as hex string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`index` | number | Leaf index |

**Returns:** *string*

Leaf as hex string

___

###  getHexLeaves

▸ **getHexLeaves**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string[]*

Gets all leaves from a Merkle tree as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string[]*

Array of leaves as hex strings

___

###  getHexMultiProof

▸ **getHexMultiProof**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `indices`: number[]): *string[]*

Gets multiproof for multiple indices as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`indices` | number[] | Array of leaf indices |

**Returns:** *string[]*

Multiproof as array of hex strings

___

###  getHexProof

▸ **getHexProof**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `leaf`: [LeafData](_src_functional_.md#leafdata), `index?`: number): *[HexProof](_src_functional_.md#hexproof)*

Gets a proof for a specific leaf as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`leaf` | [LeafData](_src_functional_.md#leafdata) | Target leaf |
`index?` | number | Optional leaf index (for duplicate leaves) |

**Returns:** *[HexProof](_src_functional_.md#hexproof)*

Proof as array of hex strings

___

###  getHexProofs

▸ **getHexProofs**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string[]*

Gets all proofs for all leaves as hex strings

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string[]*

Array of all proofs as hex strings

___

###  getHexRoot

▸ **getHexRoot**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string*

Gets the root hash of a Merkle tree as hex string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string*

Root hash as hex string

___

###  getLayers

▸ **getLayers**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *Buffer[][]*

Gets all layers of the tree

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *Buffer[][]*

Array of layers as Buffers

___

###  getLayersFlat

▸ **getLayersFlat**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *Buffer[]*

Gets flattened layers

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *Buffer[]*

Flattened array of all nodes

___

###  getLeaf

▸ **getLeaf**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `index`: number): *Buffer*

Gets a specific leaf by index

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`index` | number | Leaf index |

**Returns:** *Buffer*

Leaf as Buffer

___

###  getLeafCount

▸ **getLeafCount**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *number*

Gets the leaf count

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *number*

Number of leaves

___

###  getLeafIndex

▸ **getLeafIndex**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `leaf`: [LeafData](_src_functional_.md#leafdata)): *number*

Gets the index of a specific leaf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`leaf` | [LeafData](_src_functional_.md#leafdata) | Target leaf |

**Returns:** *number*

Leaf index or -1 if not found

___

###  getLeaves

▸ **getLeaves**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *Buffer[]*

Gets all leaves from a Merkle tree

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *Buffer[]*

Array of leaves as Buffers

___

###  getMultiProof

▸ **getMultiProof**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `indices`: number[]): *Buffer[]*

Gets multiproof for multiple indices

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`indices` | number[] | Array of leaf indices |

**Returns:** *Buffer[]*

Multiproof as array of Buffers

___

###  getOptions

▸ **getOptions**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *[Options](../interfaces/_src_merkletree_.options.md)*

Gets tree options

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *[Options](../interfaces/_src_merkletree_.options.md)*

Tree options object

___

###  getProof

▸ **getProof**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `leaf`: [LeafData](_src_functional_.md#leafdata), `index?`: number): *[Proof](_src_functional_.md#proof)*

Gets a proof for a specific leaf

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`leaf` | [LeafData](_src_functional_.md#leafdata) | Target leaf |
`index?` | number | Optional leaf index (for duplicate leaves) |

**Returns:** *[Proof](_src_functional_.md#proof)*

Proof as array of objects with position and data

___

###  getProofs

▸ **getProofs**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *[Proof](_src_functional_.md#proof)[]*

Gets all proofs for all leaves

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *[Proof](_src_functional_.md#proof)[]*

Array of all proofs

___

###  getRoot

▸ **getRoot**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *Buffer*

Gets the root hash of a Merkle tree as Buffer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *Buffer*

Root hash as Buffer

___

###  marshalLeaves

▸ **marshalLeaves**(`leaves`: [LeafData](_src_functional_.md#leafdata)[]): *string*

Marshals leaves to JSON string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`leaves` | [LeafData](_src_functional_.md#leafdata)[] | Array of leaves |

**Returns:** *string*

JSON string representation

___

###  marshalProof

▸ **marshalProof**(`proof`: [Proof](_src_functional_.md#proof) | [HexProof](_src_functional_.md#hexproof)): *string*

Marshals proof to JSON string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`proof` | [Proof](_src_functional_.md#proof) &#124; [HexProof](_src_functional_.md#hexproof) | Proof array |

**Returns:** *string*

JSON string representation

___

###  marshalTree

▸ **marshalTree**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string*

Marshals entire tree to JSON string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string*

JSON string representation of the tree

___

###  removeLeaf

▸ **removeLeaf**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `index`: number): *Buffer*

Removes a leaf by index

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |
`index` | number | Leaf index to remove |

**Returns:** *Buffer*

Removed leaf as Buffer

___

###  resetTree

▸ **resetTree**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *void*

Resets the tree by clearing all leaves and layers

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance  |

**Returns:** *void*

___

###  treeToString

▸ **treeToString**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md)): *string*

Converts tree to string representation

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`tree` | [MerkleTree](../classes/_src_merkletree_.merkletree.md) | MerkleTree instance |

**Returns:** *string*

String representation of the tree

___

###  unmarshalLeaves

▸ **unmarshalLeaves**(`jsonStr`: string | object): *Buffer[]*

Unmarshals leaves from JSON string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jsonStr` | string &#124; object | JSON string or object |

**Returns:** *Buffer[]*

Array of leaves as Buffers

___

###  unmarshalProof

▸ **unmarshalProof**(`jsonStr`: string | object): *[Proof](_src_functional_.md#proof)*

Unmarshals proof from JSON string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jsonStr` | string &#124; object | JSON string or object |

**Returns:** *[Proof](_src_functional_.md#proof)*

Proof array

___

###  unmarshalTree

▸ **unmarshalTree**(`jsonStr`: string | object, `hashFn`: [HashFunction](_src_functional_.md#hashfunction), `options`: [Options](../interfaces/_src_merkletree_.options.md)): *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

Unmarshals tree from JSON string

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`jsonStr` | string &#124; object | - | JSON string or object |
`hashFn` | [HashFunction](_src_functional_.md#hashfunction) | defaultHashFn | Hash function |
`options` | [Options](../interfaces/_src_merkletree_.options.md) | {} | Tree options |

**Returns:** *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

MerkleTree instance

___

###  updateLeaf

▸ **updateLeaf**(`tree`: [MerkleTree](../classes/_src_merkletree_.merkletree.md), `index`: number, `value`: [LeafData](_src_functional_.md#leafdata), `options`: object): *void*

Updates a leaf at a specific index

**Parameters:**

▪ **tree**: *[MerkleTree](../classes/_src_merkletree_.merkletree.md)*

MerkleTree instance

▪ **index**: *number*

Leaf index to update

▪ **value**: *[LeafData](_src_functional_.md#leafdata)*

New leaf value

▪`Default value`  **options**: *object*= {}

Options object with shouldHash property

Name | Type |
------ | ------ |
`shouldHash?` | boolean |

**Returns:** *void*

___

###  verifyMultiProof

▸ **verifyMultiProof**(`root`: string | Buffer, `proofIndices`: number[], `proofLeaves`: [LeafData](_src_functional_.md#leafdata)[], `leavesCount`: number, `proof`: Buffer[] | string[], `hashFn`: [HashFunction](_src_functional_.md#hashfunction), `options`: [Options](../interfaces/_src_merkletree_.options.md)): *boolean*

Verifies a multiproof

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`root` | string &#124; Buffer | - | Merkle root |
`proofIndices` | number[] | - | Leaf indices for proof |
`proofLeaves` | [LeafData](_src_functional_.md#leafdata)[] | - | Leaf values at indices |
`leavesCount` | number | - | Total number of leaves |
`proof` | Buffer[] &#124; string[] | - | Multiproof |
`hashFn` | [HashFunction](_src_functional_.md#hashfunction) | defaultHashFn | Hash function |
`options` | [Options](../interfaces/_src_merkletree_.options.md) | {} | Tree options |

**Returns:** *boolean*

Boolean indicating if multiproof is valid

___

###  verifyProof

▸ **verifyProof**(`proof`: [Proof](_src_functional_.md#proof) | [HexProof](_src_functional_.md#hexproof), `leaf`: [LeafData](_src_functional_.md#leafdata), `root`: string | Buffer, `hashFn`: [HashFunction](_src_functional_.md#hashfunction), `options`: [Options](../interfaces/_src_merkletree_.options.md)): *boolean*

Verifies a proof against a root and target leaf

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`proof` | [Proof](_src_functional_.md#proof) &#124; [HexProof](_src_functional_.md#hexproof) | - | Proof array |
`leaf` | [LeafData](_src_functional_.md#leafdata) | - | Target leaf |
`root` | string &#124; Buffer | - | Merkle root |
`hashFn` | [HashFunction](_src_functional_.md#hashfunction) | defaultHashFn | Hash function used to create the tree |
`options` | [Options](../interfaces/_src_merkletree_.options.md) | {} | Options used to create the tree |

**Returns:** *boolean*

Boolean indicating if proof is valid

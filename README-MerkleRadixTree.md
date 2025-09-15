# MerkleRadixTree Class Documentation

A space-efficient tree data structure that combines the benefits of a radix tree (compressed trie) with Merkle tree cryptographic properties. This implementation is optimized for storing key-value pairs with shared prefixes and provides cryptographic proofs for data integrity.

## Features

- **Space Efficient**: Compresses common prefixes to reduce tree size
- **Cryptographic Proofs**: Generate and verify inclusion proofs with hash chains
- **Key-Value Storage**: Efficient storage and retrieval of string keys with any value type
- **Prefix Compression**: Automatic compression of nodes with common prefixes
- **Hash Updates**: Automatic hash recalculation when tree structure changes
- **Proof Generation**: Create proofs for key existence and value verification
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install merkletreejs
```

## Quick Start

```typescript
import { MerkleRadixTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

// Create tree
const tree = new MerkleRadixTree(SHA256)

// Insert key-value pairs
tree.insert('apple', 'red fruit')
tree.insert('application', 'software program')
tree.insert('apply', 'to put on')
tree.insert('banana', 'yellow fruit')

// Lookup values
const value = tree.lookup('apple')
console.log('Apple is:', value) // 'red fruit'

// Generate proof
const proof = tree.generateProof('apple')
if (proof) {
  console.log('Proof generated for apple')
  
  // Verify proof
  const rootHash = tree.root.hash
  const isValid = tree.verifyProof(proof, rootHash)
  console.log('Proof valid:', isValid)
}
```

## Constructor

### `new MerkleRadixTree(hashFunction)`

Creates a new Merkle radix tree instance.

**Parameters:**
- `hashFunction` (Function): Hash function to use for node hashing

**Example:**
```typescript
import SHA256 from 'crypto-js/sha256'
const tree = new MerkleRadixTree(SHA256)
```

## Core Methods

### Tree Operations

#### `insert(key, value)`
Inserts a key-value pair into the tree.

**Parameters:**
- `key` (string): The key to insert
- `value` (any): The value to associate with the key

```typescript
tree.insert('hello', 'world')
tree.insert('help', 'assistance')
tree.insert('helicopter', 'aircraft')
```

#### `lookup(key)`
Retrieves the value associated with a key.

**Parameters:**
- `key` (string): The key to look up

**Returns:** The value associated with the key, or `null` if not found

```typescript
const value = tree.lookup('hello')
if (value !== null) {
  console.log('Found:', value)
} else {
  console.log('Key not found')
}
```

### Proof Operations

#### `generateProof(key)`
Generates a cryptographic proof for a key's existence and value.

**Parameters:**
- `key` (string): The key to generate a proof for

**Returns:** Array of proof items, or `null` if key not found

```typescript
const proof = tree.generateProof('hello')
if (proof) {
  console.log('Proof generated with', proof.length, 'steps')
} else {
  console.log('Key not found, cannot generate proof')
}
```

#### `verifyProof(proof, rootHash)`
Verifies a proof against a root hash.

**Parameters:**
- `proof` (ProofItem[]): The proof to verify
- `rootHash` (Buffer): The root hash to verify against

**Returns:** boolean - true if proof is valid

```typescript
const rootHash = tree.root.hash
const isValid = tree.verifyProof(proof, rootHash)
console.log('Proof verification:', isValid)
```

## Proof Structure

Each proof item contains:

```typescript
interface ProofItem {
  key: string        // Node key
  hash: Buffer       // Node hash
  siblings: {        // Sibling nodes
    key: string
    hash: Buffer
  }[]
}
```

## Examples

### Basic Key-Value Operations

```typescript
import { MerkleRadixTree } from 'merkletreejs'
import SHA256 from 'crypto-js/sha256'

const tree = new MerkleRadixTree(SHA256)

// Insert data
tree.insert('cat', 'feline animal')
tree.insert('car', 'vehicle')
tree.insert('card', 'playing card')
tree.insert('care', 'attention')
tree.insert('dog', 'canine animal')

// Lookup data
console.log('cat:', tree.lookup('cat'))     // 'feline animal'
console.log('car:', tree.lookup('car'))     // 'vehicle'
console.log('care:', tree.lookup('care'))   // 'attention'
console.log('cat:', tree.lookup('cat'))     // 'feline animal'
console.log('bird:', tree.lookup('bird'))   // null (not found)
```

### Dictionary/Glossary System

```typescript
const dictionary = new MerkleRadixTree(SHA256)

// Add dictionary entries
dictionary.insert('algorithm', 'A step-by-step procedure for solving a problem')
dictionary.insert('blockchain', 'A distributed ledger technology')
dictionary.insert('cryptography', 'The practice of secure communication')
dictionary.insert('database', 'An organized collection of data')
dictionary.insert('encryption', 'The process of encoding information')

// Look up definitions
const definition = dictionary.lookup('blockchain')
console.log('Blockchain:', definition)

// Generate proof for a definition
const proof = dictionary.generateProof('cryptography')
if (proof) {
  const rootHash = dictionary.root.hash
  const isValid = dictionary.verifyProof(proof, rootHash)
  console.log('Cryptography definition proof valid:', isValid)
}
```

### File System Simulation

```typescript
const fileSystem = new MerkleRadixTree(SHA256)

// Add files and directories
fileSystem.insert('/home/user/documents/readme.txt', 'File content: README')
fileSystem.insert('/home/user/documents/notes.md', 'File content: Notes')
fileSystem.insert('/home/user/pictures/photo1.jpg', 'Image data')
fileSystem.insert('/home/user/pictures/photo2.png', 'Image data')
fileSystem.insert('/var/log/system.log', 'System log entries')
fileSystem.insert('/var/log/error.log', 'Error log entries')

// Look up files
const readmeContent = fileSystem.lookup('/home/user/documents/readme.txt')
console.log('README content:', readmeContent)

// Generate proof for file existence
const fileProof = fileSystem.generateProof('/home/user/pictures/photo1.jpg')
if (fileProof) {
  console.log('File existence proof generated')
}
```

### Configuration Management

```typescript
const config = new MerkleRadixTree(SHA256)

// Store configuration values
config.insert('database.host', 'localhost')
config.insert('database.port', '5432')
config.insert('database.name', 'myapp')
config.insert('database.ssl', 'true')
config.insert('server.port', '3000')
config.insert('server.timeout', '30000')
config.insert('logging.level', 'info')
config.insert('logging.file', '/var/log/app.log')

// Retrieve configuration
const dbHost = config.lookup('database.host')
const serverPort = config.lookup('server.port')
console.log(`Database: ${dbHost}, Server port: ${serverPort}`)

// Generate proof for configuration integrity
const proof = config.generateProof('database.host')
const rootHash = config.root.hash
console.log('Config integrity proof valid:', config.verifyProof(proof, rootHash))
```

### User Session Management

```typescript
const sessions = new MerkleRadixTree(SHA256)

// Store session data
sessions.insert('session_abc123', JSON.stringify({
  userId: 'user1',
  loginTime: '2023-01-01T10:00:00Z',
  permissions: ['read', 'write']
}))

sessions.insert('session_def456', JSON.stringify({
  userId: 'user2',
  loginTime: '2023-01-01T11:00:00Z',
  permissions: ['read']
}))

// Retrieve session
const sessionData = sessions.lookup('session_abc123')
if (sessionData) {
  const session = JSON.parse(sessionData)
  console.log('User ID:', session.userId)
  console.log('Permissions:', session.permissions)
}

// Verify session integrity
const sessionProof = sessions.generateProof('session_abc123')
if (sessionProof) {
  const isValid = sessions.verifyProof(sessionProof, sessions.root.hash)
  console.log('Session integrity verified:', isValid)
}
```

### Multi-language Text Storage

```typescript
const translations = new MerkleRadixTree(SHA256)

// Store translations
translations.insert('en.welcome', 'Welcome')
translations.insert('en.goodbye', 'Goodbye')
translations.insert('en.hello', 'Hello')
translations.insert('es.welcome', 'Bienvenido')
translations.insert('es.goodbye', 'Adiós')
translations.insert('es.hello', 'Hola')
translations.insert('fr.welcome', 'Bienvenue')
translations.insert('fr.goodbye', 'Au revoir')
translations.insert('fr.hello', 'Bonjour')

// Get translations
console.log('English welcome:', translations.lookup('en.welcome'))
console.log('Spanish hello:', translations.lookup('es.hello'))
console.log('French goodbye:', translations.lookup('fr.goodbye'))

// Prove translation exists
const proof = translations.generateProof('es.welcome')
const rootHash = translations.root.hash
console.log('Translation proof valid:', translations.verifyProof(proof, rootHash))
```

### Working with Different Data Types

```typescript
const mixedData = new MerkleRadixTree(SHA256)

// Store different types of data
mixedData.insert('user:1:name', 'Alice')
mixedData.insert('user:1:age', 25)
mixedData.insert('user:1:active', true)
mixedData.insert('user:2:name', 'Bob')
mixedData.insert('user:2:age', 30)
mixedData.insert('user:2:active', false)

// Store complex objects as JSON
mixedData.insert('config:app', JSON.stringify({
  version: '1.0.0',
  features: ['auth', 'api', 'ui'],
  settings: { theme: 'dark', lang: 'en' }
}))

// Retrieve and parse complex data
const appConfig = mixedData.lookup('config:app')
if (appConfig) {
  const config = JSON.parse(appConfig)
  console.log('App version:', config.version)
  console.log('Features:', config.features)
}
```

## Advanced Features

### Custom Hash Functions

```typescript
import { keccak256 } from 'js-sha3'

// Custom hash function
const customHashFn = (data) => {
  return Buffer.from(keccak256.arrayBuffer(data))
}

const tree = new MerkleRadixTree(customHashFn)
tree.insert('test', 'value')
```

### Proof Analysis

```typescript
const proof = tree.generateProof('somekey')
if (proof) {
  console.log('Proof analysis:')
  proof.forEach((item, index) => {
    console.log(`Step ${index}:`)
    console.log(`  Key: ${item.key}`)
    console.log(`  Hash: ${item.hash.toString('hex')}`)
    console.log(`  Siblings: ${item.siblings.length}`)
    
    item.siblings.forEach((sibling, sibIndex) => {
      console.log(`    Sibling ${sibIndex}: ${sibling.key}`)
    })
  })
}
```

### Tree Inspection

```typescript
// Access tree structure
console.log('Root hash:', tree.root.hash.toString('hex'))
console.log('Root key:', tree.root.key)
console.log('Root value:', tree.root.value)
console.log('Root children count:', tree.root.children.size)

// Iterate through immediate children
tree.root.children.forEach((child, key) => {
  console.log(`Child key: ${key}, Child hash: ${child.hash.toString('hex')}`)
})
```

### Batch Operations

```typescript
// Batch insert for better performance
const batchData = [
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3'],
  ['key4', 'value4']
]

batchData.forEach(([key, value]) => {
  tree.insert(key, value)
})

// Batch lookup
const keys = ['key1', 'key2', 'key3', 'key4']
const values = keys.map(key => tree.lookup(key))
console.log('Batch lookup results:', values)
```

## Performance Considerations

- **Prefix Compression**: Keys with common prefixes are stored efficiently
- **Hash Updates**: Hash recalculation happens automatically on changes
- **Memory Usage**: Space-efficient storage for keys with shared prefixes
- **Lookup Time**: O(k) where k is the key length
- **Proof Size**: Logarithmic with respect to the number of unique prefixes

## Security Notes

- **Hash Function**: Use cryptographically secure hash functions
- **Proof Verification**: Always verify proofs against trusted root hashes
- **Key Uniqueness**: Ensure keys are unique to avoid overwrites
- **Value Integrity**: Hash includes both key and value for tamper detection

## Use Cases

- **Configuration Management**: Store and verify application settings
- **Dictionary/Glossary**: Efficient storage of definitions with proofs
- **File Systems**: Simulate file system with cryptographic integrity
- **Session Management**: Store session data with tamper detection
- **Internationalization**: Multi-language text storage and retrieval
- **Database Indexing**: Create verifiable indexes for database records
- **DNS Records**: Store domain name mappings with integrity proofs

## Browser Support

Works in both Node.js and browser environments. Ensure you have appropriate Buffer support for your target environment.

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all methods and data structures. The library provides proper typing for keys, values, and proof structures. 
# extend-objects-only

Performs a deep merge on objects but overwrites arrays

## Install

Install with npm

```
npm install extend-objects-only
```

## Usage

```js
import { extendObjectsOnly } from 'extend-objects-only';

// merging objects deeply and overwrite arrays
const base = {
  num: 123,
  str: 'foobar',
  obj: { a: 1, b: 2 },
  arr: [1, 2, 3],
};
const add = {
  root: 'new-value',
  obj: { nested: true },
  arr: [4, 5],
};

extendObjectsOnly(base, add);
console.log(base);
// {
//   num: 123,
//   str: 'foobar',
//   obj: { a: 1, b: 2, nested: true },
//   arr: [4, 5],
//   root: 'new-value
// }

// to avoid modifying the target object, just pass an empty one?
const result = extendObjectsOnly({}, base, add);
```

## Running tests

Install dev dependencies and execute the tests

```
npm install -d && npm test
```

## Change log

### 1.0.2

- Improve signature: accept `undefined` as parameters (and keep ignoring them)

### 1.0.1

- Compare and copy DOM objects as direct values (no-deep)

### 1.0.0

- First version

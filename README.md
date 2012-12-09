#diff-utils

Simple utility functions that give you diffs of objects or arrays with unique strings.

For diffing arrays based on longest common subsequences see [array-diff](https://github.com/mirkok/array-diff).

Diffing objects:
``` js
var before = {key1: 1, key2: 2}
var after = {key1: 2, key3: 4}
var diff = findDiff.dictionary(before, after)
// returns:
{modified: ['key1'], added: ['key3'], deleted: ['key2']}
```

Diffing arrays (must have unique strings as elements):
```js
var before = ['1','2','3','4']
var after = ['2','1','5']
var diff = findDiff.set(before, after)
// returns:
{added: ['5'], deleted: ['3', '4']}
```

var assert = require('assert')
var _ = require('underscore')
var findDiff = require('./index')

describe('dict', function() {
  var originDict = {key1: 1, key2: 2}
  it('should find the diff with changes', function() {
    var changedDict = {key1: 2, key2: 2}
    var expected = {modified: ['key1'], added: [], deleted: []}
    var diff = findDiff.dictionary(originDict, changedDict)
    assert.ok(_.isEqual(diff, expected))
  })
  it('should find the diff with changes, deletes and additions', function() {
    var changedDict = {key1: 2, key3: 4}
    var expected = {modified: ['key1'], added: ['key3'], deleted: ['key2']}
    var diff = findDiff.dictionary(originDict, changedDict)
    assert.ok(_.isEqual(diff, expected))
  })
})

describe('set', function() {
  it('should find the diff with changes', function() {
    var originSet = ['1','2','3','4']
    var changedSet = ['2','1','5']
    var expected = {added: ['5'], deleted: ['3', '4']}
    var diff = findDiff.set(originSet, changedSet)
    assert.ok(_.isEqual(diff, expected))
  })
})

describe('list', function() {
  it('should find the value and position diff', function() {
    var originList = ['1','2','3','4']
    var changedList = ['2','1','5']
    var posDiffExpected = [
      {oldPos:0, newPos:1},
      {oldPos:1, newPos:0},
      {oldPos: 2, newPos:undefined },
      {oldPos: 3, newPos:undefined },
      {oldPos:undefined, newPos:2}
    ]
    var posDiff = findDiff.setPositions(originList, changedList)
    assert.ok(_.isEqual(posDiff, posDiffExpected))
  })
})


var _ = require('underscore')

diffDict = function(originDict, dict) {
  var diff = {modified: [], added: [], deleted: []}
  _.each(originDict, function(value, key) {
    var dictValue = dict[key]
    if(dictValue == undefined) {
      diff.deleted.push(key)
    } else if(dictValue != value) {
      diff.modified.push(key)
    }
  })
  _.each(dict, function(value, key) {
    var originDictValue = originDict[key]
    if(originDictValue == undefined) {
      diff.added.push(key)
    }
  })
  return diff
}

diffSet = function(originSet, set) {
  var setToDict = function(set) {
    return _.object(set.map(function(each) {return [each, each]}))
  }
  var res = diffDict(setToDict(originSet), setToDict(set))
  return {added: res.added, deleted: res.deleted}
}

diffSetPositions = function(originList, list) {
  var setIndexMap = function(list) {
    return _.object(list.map(function(each, i) {return [each, i]}))
  }
  var indexMapOriginList = setIndexMap(originList)
  var indexMapList = setIndexMap(list)
  var diff = diffDict(indexMapOriginList, indexMapList)
  return _.union(diff.modified, diff.deleted, diff.added).map(function(each) {
    return {oldPos:indexMapOriginList[each], newPos:indexMapList[each]}
  })
}

module.exports = {
  dictionary: diffDict,
  set: diffSet,
  setPositions: diffSetPositions
}

/**
 * @author Andrew Redican <andrew.redican.mejia@gmail.com>
 */

/**
 * Performs deep search for identity on collection, returns the number of matches found by in a specific depth.
 * If depth not provided, it will return the total number of matches including all depths.
 * @param {Any} collection
 * @param {Any} identity
 * @param { Null || number } depth
 * @return {Any} Returns number of matches found.
 */
function countMatches(collection, identity, depth=null){
    var paths = locateAll(collection, identity);
    if(paths===false) return 0;
    if(option===null) return paths.length;
    if(getType(option)==='number'){
        let count = 0;
        paths.forEach( path => { 
            path = path.split('.');
            if(path.length===option) count++;
        });
        return count;
    }
    return undefined;
}

 /**
 * Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria
 * @param {Any} collection
 * @param {Any} identities
 * @param {Any} property
 * @return {Any} Returns a collection of the same type as the 'identities' parameter provided with only the identities that matched.
 */
function onlyFalsy(collection,identities,property, maxdepth=null){
    if(getType(identities)==='array'){
        let result = [];
        identities.forEach( identity => { 
            const subCollection = deepFilter(collection,identity);
            if(isTruthy(subCollection))
            if(foundFalsy(subCollection,property)) result.push(identity);
        });
        return result;
    }
    if(getType(identities)==='object'){
        let result = {};
        Object.keys(identities).forEach( key => {
            const
                identity = identities[key],
                subCollection = deepFilter(collection,identity);
            if(isTruthy(subCollection))
            if(foundFalsy(subCollection,property)) result[key] = identity;
        });
        return result;
    }
    if(foundFalsy(collection,property)) return identities;
}

/**
 * Performs deep search on collection to find any match to the property and evalutates if truthy
 * @param {Any} collection
 * @param {Property} identity
 * @return {boolean} If match confirmed and truthy will return true, otherwise false
 */
function foundFalsy(collection,identity, maxdepth=null){
    identity = singleProperty(identity);
    if(isFalsy(identity)) return undefined;
    function _foundFalsy(collection, identity){
        if(containsKeys(collection,[identity])) return isFalsy(collection[identity]);
        if(isIterable(collection))
        for(var i = 0, keys = Object.keys(collection), l = keys.length; i < l; i++ ){
            const 
                key = keys[i], subcollection = collection[key],
                res = _foundFalsy(subcollection,identity);
            if(res) return true;
        }
        return false;
    }
    return _foundFalsy(collection, identity);
}

/**
 * Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria
 * @param {Any} collection
 * @param {Any} identities
 * @param {Any} property
 * @return {Any} Returns a collection of the same type as the 'identities' parameter provided with only the identities that matched.
 */
function onlyTruthy(collection,identities,property, maxdepth=null){
    if(getType(identities)==='array'){
        let result = [];
        identities.forEach( identity => { 
            const subCollection = deepFilter(collection,identity);
            if(isTruthy(subCollection))
            if(foundTruthy(subCollection,property)) result.push(identity);
        });
        return result;
    }
    if(getType(identities)==='object'){
        let result = {};
        Object.keys(identities).forEach( key => {
            const
                identity = identities[key],
                subCollection = deepFilter(collection,identity);
            if(isTruthy(subCollection))
            if(foundTruthy(subCollection,property)) result[key] = identity;
        });
        return result;
    }
    if(foundTruthy(collection,property)) return identities;
}

/**
 * Performs deep search on collection to find any match to the property and evalutates if truthy
 * @param {Any} collection
 * @param {Property} identity
 * @return {boolean} If match confirmed and truthy will return true, otherwise false
 */
function foundTruthy(collection,identity, maxdepth=null){
    identity = singleProperty(identity);
    if(isFalsy(identity)) return undefined;
    function _foundTruthy(collection, identity){
        if(containsKeys(collection,[identity])) return isTruthy(collection[identity]);
        if(isIterable(collection))
        for(var i = 0, keys = Object.keys(collection), l = keys.length; i < l; i++ ){
            const 
                key = keys[i], subcollection = collection[key],
                res = _foundTruthy(subcollection,identity);
            if(res) return true;
        }
        return false;
    }
    return _foundTruthy(collection, identity);
}

/**
 * Validates if identity is equal to a property definition or contains a single property key.
 * @param {Property} identity
 * @return {String || boolean} If criteria matched will return property name as string, otherwise false
 */
function singleProperty(identity){
    const propCount = length(identity);
    if(propCount > 1) return false;
    if(propCount===1) return Object.keys(identity)[0]; 
    if(propCount===0) if(['string','number'].indexOf(getType(identity))>-1) return identity;
    return false;
}

/**
 * Determines if identity is non-falsy
 * @param {Any} identity
 * @return {boolean} Returns true if criteria matched, otherwise false.
 */
function isTruthy(identity){ return !isFalsy(identity); }

/**
 * Determines if identity is falsy
 * @param {Any} identity
 * @return {boolean} Returns true if criteria matched, otherwise false.
 */
function isFalsy(identity){
    if(falser(identity)===false) return true;
    return false;
}

/**
 * Converts false-like values into actual boolean value of false
 * @param {Any} identity
 * @return {Any || boolean} Returns false is value is falsy, otherwise returns original value.
 */
function falser(identity){
    if(isIterable(identity)) return identity;
    if(['null','undefined'].indexOf(getType(identity))>-1) return false;
    if(['',0,false].indexOf(identity)>-1) return false;
    return identity;
}

/**
 * Check the length of the top-most depth of the identity
 * @param {Any} identity
 * @return {integer} Greater than or equal to 0.
 */
function length(identity){
    if(['array','object'].indexOf(getType(identity)) === -1) return 0;
    return Object.keys(identity).length;
}

/**
 * Performs deep search for each identity on collection, to shorten the identities to those that does meets the match criteria
 * @param {Any} collection
 * @param {Any} identities
 * @return {Any} Returns a collection of the same type as the 'identities' parameter provided with only the identities that were not matched.
 */
function onlyMissing(collection,identities, maxdepth=null){
    if(getType(identities)==='array'){
        let result = [];
        identities.forEach( identity => { 
            if(!exists(collection,identity)) result.push(identity);
        });
        return result;
    }
    if(getType(identities)==='object'){
        let result = {};
        Object.keys(identities).forEach( key => {
            let identity = identities[key]; 
            if(!exists(collection,identity)) result[key] = identity;
        });
        return result;
    }
    if(!exists(collection,identities)) return identities;
}

/**
 * Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria
 * @param {Any} collection
 * @param {Any} identities
 * @return {Any} Returns a collection of the same type as the 'identities' parameter provided with only the identities that matched.
 */
function onlyExisting(collection,identities, maxdepth=null){
    if(getType(identities)==='array'){
        let result = [];
        identities.forEach( identity => { 
            if(exists(collection,identity)) result.push(identity);
        });
        return result;
    }
    if(getType(identities)==='object'){
        let result = {};
        Object.keys(identities).forEach( key => {
            let identity = identities[key]; 
            if(exists(collection,identity)) result[key] = identity;
        });
        return result;
    }
    if(exists(collection,identities)) return identities;
}

/**
 * Performs deep search on collection to find any match to the identity
 * @param {Any} collection
 * @param {Any} identity
 * @return {boolean} If a match is confirmed will return true, otherwise false
 */
function exists(collection, identity, maxdepth=null){
    if(identical(collection,identity)) return true;
    if(isIterable(identity))
    if(sameType(collection,identity))
    if(containsKeys(collection,Object.keys(identity))){
        const trimmed = trim(collection,Object.keys(identity));
        if(identical(trimmed,identity)) return true;
    }
    if(isIterable(collection))
    for(var i = 0, keys = Object.keys(collection), l = keys.length; i < l; i++ ){
        const 
            key = keys[i], subcollection = collection[key],
            res = exists(subcollection,identity);
        if(res) return true;
    }
    return false;
}

/**
 * Performs deep search on collection to find all matches to the identity, will return the entity containing the matched instances.
 * @param {Any} collection
 * @param {Any} identity
 * @return {Array || undefined} For positive matches returns a string array to the paths of the locations, otherwise undefined
 */
function deepFilter(collection, identity, maxdepth=null){
    var paths = locateAll(collection, identity);
    if(paths === false) return undefined;
    const results = paths.map(path => {
        if(path === '') return collection;
        path = path.split('.');
        if(['array','object'].indexOf(getType(identity)) === - 1) path.splice(-1,1);
        var result = collection;
        if(!Array.isArray(path)) return result[path];
        path.forEach( key => { result = result[key]; });
        return result;
    })
    return results;
}

/**
 * Performs deep search on collection to find all matches to the identity, returns a string array.
 * @param {Any} collection
 * @param {Any} identity
 * @return {Array || false} For positive matching returns an array of paths to the locations, otherwise false
 */
function locateAll(collection, identity, maxdepth=null){
    var R = [];
    function _locateAll(collection, identity, path = ''){
        if(isIterable(identity))
        if(sameType(collection,identity))
        if(containsKeys(collection,Object.keys(identity))){
            const trimmed = trim(collection,Object.keys(identity));
            if(identical(trimmed,identity)) R[R.length] = path;
        }
        if(identical(collection,identity)) R[R.length] = path;
        var result = false;
        if(isIterable(collection))
        for(var i = 0, keys = Object.keys(collection), l = keys.length; i < l; i++ ){
            const key = keys[i], subcollection = collection[key];
            _locateAll(subcollection,identity,(path === '' ? path : path + '.') + key);
        }    
    }
    _locateAll(collection, identity);
    return R.length === 0 ? false : R;
}

/**
 * Performs deep search on collection to find a match to the identity, will return the entity containing of the first instance matched.
 * @param {Any} collection
 * @param {Any} identity
 * @return {String || undefined} For positive match returns the path of the location as string, otherwise undefined
 */
function deepGet(collection, identity, maxdepth=null){
    var path = locate(collection, identity);
    if(path === false) return undefined;
    if(path === '') return collection;
    path = path.split('.');
    if(['array','object'].indexOf(getType(identity)) === - 1) path.splice(-1,1);
    var result = collection;
    if(!Array.isArray(path)) return result[path];
    path.forEach( key => { result = result[key]; });
    return result;
}

/**
 * Performs deep search on collection to find a match to the identity, will return the path of the first instance matched.
 * @param {Any} collection
 * @param {Any} identity
 * @return {String || False} For positive match returns the path to location as string, otherwise false
 */
function locate(collection, identity, path = '', maxdepth=null){
    if(isIterable(identity))
    if(sameType(collection,identity))
    if(containsKeys(collection,Object.keys(identity))){
        const trimmed = trim(collection,Object.keys(identity));
        if(identical(trimmed,identity)) return path;
    }
    if(identical(collection,identity)) return path;
    var result = false;
    if(isIterable(collection))
    for(var i = 0, keys = Object.keys(collection), l = keys.length; i < l; i++ ){
        const 
            key = keys[i], subcollection = collection[key],
            res = locate(subcollection,identity,key);
        if(res) { path = path === '' ? path : path + '.'; result = path + res; break; }
    }    
    return result;
}

/**
 * Trims an identity to only contain the specified properties.
 * @param {Any} identity
 * @param {Any} keyList
 * @return {Object or Array} Returns , otherwise false
 */
function trim(identity,keyList){
    const identityType = getType(identity);
    if(['array','object'].indexOf(identityType) === -1) return undefined;
    const keyCount = keyList.length;
    if(keyCount === 0) return undefined;
    var newIdentity;
    switch(identityType){
        case 'object' : newIdentity = {}; keyList.forEach(key => { if(key in identity) newIdentity[key] = identity[key]; }); break;
        case 'array'  : newIdentity = []; keyList.forEach(key => { if(key in identity) newIdentity.push(identity[key]); }); break;
    }
    return newIdentity;
}

/**
 * Check if identity contains all of the specified keys
 * @param {Any} identity
 * @param {Array} keyList
 * @return {boolean} true || false
 */
function containsKeys(identity,keyList){
    const keyCount = keyList.length;
    if(keyCount === 0 || !isIterable(identity)) return false;
    const identitykeys = Object.keys(identity);
    var result = true;
    for(var i = 0; i < keyCount; i++){
        const key = '' + keyList[i]; 
        if(identitykeys.indexOf(key) === -1){ result = false; break; }
    }
    return result;
}

/**
 * Check if identity has one or more keys to iterate
 * @param {Any} identity
 * @return {boolean} true || false
 */
function isIterable(identity){
    if(['array','object'].indexOf(getType(identity)) === -1) return false;
    if(Object.keys(identity).length === 0) return false;
    return true;
}

/**
 * Compares two identities, will return either true if identical, otherwise false.
 * @param {Any} identityA
 * @param {Any} identityB
 * @return {boolean} true || false
 */
function identical(identityA,identityB){
    const structureMatch = sameStructure(identityA,identityB);
    if(structureMatch === false) return structureMatch;
    if(['array','object'].indexOf(structureMatch) === -1) return identityA === identityB;
    const Keys = Object.keys(identityA), KeyCount = Keys.length;
    var childMatch = true;
    for(var i = 0; i < KeyCount; i++) {
        const Key = Keys[i], identicalMatch = identical(identityA[Key],identityB[Key]);
        if(identicalMatch === false){ childMatch = identicalMatch; break; };
    }
    return childMatch;
}

/**
 * Compares data structure of two identities, will return either the dataType or true/false.
 * @param {Any} identityA
 * @param {Any} identityB
 * @return {String || False} DataType as string for positive match, otherwise false
 */
function sameStructure(identityA,identityB){
    const typeMatch = sameType(identityA,identityB);
    if(typeMatch === false) return false;
    if(['array','object'].indexOf(typeMatch) > -1){
        const 
            AKeys     = Object.keys(identityA),
            BKeys     = Object.keys(identityB),
            AKeyCount = AKeys.length,
            BKeyCount = BKeys.length;
        if(!(AKeyCount === BKeyCount)) return false;
        if(AKeyCount === 0) return true;
        for (var i = 0; i < AKeyCount; i++) {
            if(AKeys[i] !== BKeys[i]) return false;
        }
    }
    return typeMatch;
}

/**
 * Compares data type of two identities, will dataType if true.
 * @param {Any} identityA
 * @param {Any} identityB
 * @return {boolean} true || false
 */
function sameType(identityA,identityB){ 
    const typeA = getType(identityA); return typeA === getType(identityB) ? typeA : false; 
}

/**
 * Gets data type; makes distintion between object, array, and null.
 * @param {Any} identity
 * @return {String} dataType
 */
function getType(identity) { 
    if(identity === null) return 'null';
    const it = typeof identity;
    if(it === 'object') if(Array.isArray(identity)) return 'array';
    return it;
}

mitsuketa = {
    getType          : function(identity)                       { return getType(identity);                          }, 
    sameType         : function(identityA,identityB)            { return sameType(identityA,identityB);              },
    sameStructure    : function(identityA,identityB)            { return sameStructure(identityA,identityB);         },
    identical        : function(identityA,identityB)            { return identical(identityA,identityB);             },
    isIterable       : function(identity)                       { return isIterable(identity);                       },
    containsKeys     : function(identity,keyList)               { return containsKeys(identity,keyList);             },
    trim             : function(identity,keyList)               { return trim(identity,keyList);                     },
    locate           : function(collection,identity)            { return locate(collection,identity);                },
    deepGet          : function(collection,identity)            { return deepGet(collection,identity);               },
    locateAll        : function(collection,identity)            { return locateAll(collection,identity);             },
    deepFilter       : function(collection,identity)            { return deepFilter(collection,identity);            },
    exists           : function(collection,identity)            { return exists(collection,identity);                },
    onlyExisting     : function(collection,identities)          { return onlyExisting(collection,identities);        },
    onlyMissing      : function(collection,identities)          { return onlyMissing(collection,identities);         },
    length           : function(identity)                       { return length(identity);                           },
    isFalsy          : function(identity)                       { return isFalsy(identity);                          },
    isTruthy         : function(identity)                       { return isTruthy(identity);                         },
    foundTruthy      : function(collection,identity)            { return foundTruthy(collection,identity);           },
    onlyTruthy       : function(collection,identities,property) { return onlyTruthy(collection,identities,property); },
    foundFalsy       : function(collection,identity)            { return foundFalsy(collection,identity);            },
    onlyFalsy        : function(collection,identities,property) { return onlyFalsy(collection,identities,property);  }
}

module.exports = exports = mitsuketa;
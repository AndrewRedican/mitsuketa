/**
 * @author Andrew Redican <andrew.redican.mejia@gmail.com>
 */


export function deepGet(collection, identity){
    var path = locate(collection, identity); console.log(path);
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
 * @param {Any} identity
 * @param {Any} collection
 * @return {String || False} For positive match returns the path to location as string, otherwise false
 */
export function locate(collection, identity, path = ''){
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
export function trim(identity,keyList){
    const identityType = getType(identity);
    if(['array','object'].indexOf(identityType) === -1) return undefined;
    const keyCount = keyList.length;
    if(keyCount === 0) return undefined;
    switch(identityType){
        case 'object'    : var newIdentity   = {}; keyList.forEach(key => { newIdentity[key] = identity[key]; }); return newIdentity; break;
        case 'array'     : const newIdentity = keyList.map(key => { return identity[key]; }); return newIdentity; break;
    }
}

/**
 * Check if identity contains all of the specified keys
 * @param {Any} identity
 * @return {boolean} true || false
 */
export function containsKeys(identity,keyList){
    const keyCount = keyList.length;
    if(keyCount === 0 || !isIterable(identity)) return false;
    const identitykeys = Object.keys(identity);
    var result = true;
    for(var i = 0; i < keyCount; i++){
        const key = keyList[i];
        if(identitykeys.indexOf(key) === -1){ result = false; break; }
    }
    return result;
}

/**
 * Check if identity has one or more keys to iterate
 * @param {Any} identity
 * @return {boolean} true || false
 */
export function isIterable(identity){
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
export function identical(identityA,identityB){
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
export function sameStructure(identityA,identityB){
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
export function sameType(identityA,identityB){ 
    const typeA = getType(identityA); return typeA === getType(identityB) ? typeA : false; 
}

/**
 * Gets data type; makes distintion between object, array, and null.
 * @param {Any} identity
 * @return {String} dataType
 */
export function getType(identity){ 
    if(identity === null) return 'null';
    const it = typeof identity;
    if(it === 'object') if(Array.isArray(identity)) return 'array';
    return it;
}
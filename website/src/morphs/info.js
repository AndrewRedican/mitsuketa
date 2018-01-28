/**
 * @author Andrew Redican <andrew.redican.mejia@gmail.com>
 */

var Info = {
    getType : { 
        parameters  : { type : ['Any'] }, result : { type : 'String', name : 'dataType' }, 
        description : 'Gets data type; makes distinction between object, array, and null.'
    }, 
    sameType : { 
        parameters  : { type : ['Any','Any'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Compares data type of two identities, will data type as string if true.'
    }, 
    sameStructure : { 
        parameters  : { type : ['Any','Any'] }, result : { type : 'String || false', name : 'DataType' }, 
        description : 'Compares data structure of two identities, will return either the dataType or true/false.'
    }, 
    identical : { 
        parameters  : { type : ['Any','Any'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Compares two identities, will return either true if identical, otherwise false.'
    }, 
    isIterable : { 
        parameters  : { type : ['Any'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Check if identity has one or more keys to iterate.'
    }, 
    containsKeys : { 
        parameters  : { type : ['Any','Array'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Check if identity contains all of the specified keys.'
    }, 
    trim : { 
        parameters  : { type : ['Any','Any'] }, result : { type : 'Object || Array || false', name : 'Object or Array || false' }, 
        description : 'Trims an identity to only contain the specified properties.'
    }, 
    locate : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'String || false', name : 'Path' }, 
        description : 'Performs deep search on collection to find a match to the identity, will return the path of the first instance matched as string. If no matches found, returns `false`.'
    }, 
    deepGet : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'identity || undefined', name : 'identity' }, 
        description : 'Performs deep search on collection to find a match to the identity, will return the identity containing of the first instance matched. If no matches found, it returns `undefined`.'
    }, 
    locateAll          : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'Array || false', name : 'Paths' }, 
        description : 'Performs deep search on collection to find all matches to the identity, returns a string array containing the location of all matches. If no matches found, it returns `false`.'
    }, 
    deepFilter         : { 
        parameters :  { type : ['Any','Any','[optional=number]'] }, result : { type : 'Array || undefined', name : 'identities' }, 
        description : 'Performs deep search on collection to find all matches to the identity, will return a list of identities containing the match. If no matches found, it returns `undefined`.'
    }, 
    exists             : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Performs deep search on collection to find any match to the identity.'
    }, 
    onlyExisting       : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'Any', name : '' }, 
        description : 'Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria.'
    }, 
    onlyMissing        : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'Any', name : '' }, 
        description : 'Performs deep search for each identity on collection, to shorten the identities to those that does meets the match criteria.'
    }, 
    length             : { 
        parameters  : { type : ['Any'] }, result : { type : 'number', name : '' }, 
        description : 'Check the length of the top-most depth of the identity.'
    }, 
    isFalsy            : { 
        parameters  : { type : ['Any'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Determines if identity is falsy: null, undefined, false, 0.'
    }, 
    isTruthy           : { 
        parameters  : { type : ['Any'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Determines if identity is non-falsy.'
    }, 
    foundTruthy        : { 
        parameters  : { type : ['Any','Property','[optional=number]'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Performs deep search on collection to find any match to the property and evalutates if truthy.'
    }, 
    onlyTruthy         : { 
        parameters  : { type : ['Any','Any','Any','[optional=number]'] }, result : { type : 'Any', name : 'collection' }, 
        description : 'Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria.'
    }, 
    foundFalsy         : { 
        parameters  : { type : ['Any','Property','[optional=number]'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Performs deep search on collection to find any match to the property and evalutates if truthy.'
    }, 
    onlyFalsy          : { 
        parameters  : { type : ['Any','Any','Any','[optional=number]'] }, result : { type : 'Any', name : 'collection' }, 
        description : 'Performs deep search for each identity on collection, to shorten the identities to those that meets the match criteria.'
    }, 
    countMatches       : { 
        parameters  : { type : ['Any','Any','number','[optional=number]'] }, result : { type : 'number', name : '' }, 
        description : 'Performs deep search for identity on collection, returns the number of matches found.'
    }, 
    matchDepth         : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'boolean', name : 'true || false' }, 
        description : 'Performs deep search for identity on collection to return the location\'s depth of the first match. If no match found, it returns `false`.'
    }, 
    maxDepth           : { 
        parameters  : { type : ['Any','[optional=number]'] }, result : { type : 'number', name : '' }, 
        description : 'Walks through the entire object tree to return the maximum number of layers it contains.'
    }, 
    locate_Key         : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'String || false', name : 'Path' }, 
        description : 'Performs deep search on collection to find a match to the key name, will return the path of the first instance matched. If no match found, it returns `false`.'
    }, 
    deepGet_Key        : { 
        parameters  : { type : ['Any','Any','[optional=number]']  }, result : { type : 'Identity || undefined', name : '' }, 
        description : 'Performs deep search on collection to find a match to the key name, and returns the first identity containing the match. If no match found, it returns `undefined`.'
    }, 
    locateAll_Key      : { 
        parameters  : { type : ['Any','Any','[optional=number]'] }, result : { type : 'Array || false', name : '' }, 
        description : 'Performs deep search on collection to find all matches to the key name, returns the location of each match in a string array. If no matches found, it returns `false`.'
    }, 
    deepFilter_Key     : { 
        parameters  : { type : ['Any','Any','[optional=number]']  }, result : { type : 'Identity || undefined', name : '' }, 
        description : 'Performs deep search on collection to find all matches to the key name, and returns a list of identities containing the matched instances. If no matches found, it returns `undefined`.'
    }, 
    deepClone          : { 
        parameters  : { type : ['Any','[optional=number]','[optional=number]'] }, result : { type : 'Any', name : 'identity' }, 
        description : 'Creates a non-reference clone that is an exact copy to the identity provided.'
    }, 
    renameKey          : { 
        parameters  : { type : ['Any','String','String','[optional=number]'] }, result : { type : 'Any', name : 'identity' }, 
        description : 'Performs deep search on object tree, then renames the first matching key.'
    }, 
    renameKeys         : { 
        parameters  : { type : ['Any','String','String','[optional=number]'] }, result : { type : 'Any', name : 'identity' },
        description : 'Performs deep search on object tree, and renames the all matching keys.'
    }, 
    deepRemove_Key     : { 
        parameters  : { type : ['Any','String','[optional=number]']  }, result : { type : 'Any', name : 'identity' }, 
        description : 'Performs deep search on object tree, removes the first property with matching key, returns a new identity without the specified property.'
    }, 
    deepRemoveAll_Key  : { 
        parameters  : { type : ['Any','String','[optional=number]'] }, result : { type : 'Any', name : 'identity' }, 
        description : 'Performs deep search on object tree, removes all properties with matching key, returns a new identity without the specified property.'
    }, 
}

export default Info;
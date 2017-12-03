# Mitsuketa

A Javascript library that enables you to handle deeply nested objects easily.

## Installation

Using npm:

```
$ npm i -g npm
$ npm i --save mitsuketa
```

## Why mitsuketa?

Mitsuketa makes JavaScript easier by taking the hassle out of working with deeply nested data structures. Allows you to strict compare object, locate deeply nested entities, etc.

## Overview

| Method   | Description                 | Parameters/Input  | Output  |
| ------------- |-----------------------------| ------| :-----:|
| [getType](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)       | Gets `typeof` `identity` also makes distinction between `object`, `null`, and `array`               | identity | string |
| [sameType](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)      | Compares two `identities` using `getType` method | identityA, identityB | `identity` or `false` |
| [sameStructure](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features) | Compares two `identities` using `sameType` then validates both have the same `keys`  | identityA, identityB | `identity` or `false` |
| [identical](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)     | Compares two `identities` using `sameStructure` then validates children or nested structures for `iterble identities` or actual `values`  | identityA, identityB | `identity` or `false` |
| [isIterable](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)    | Checks if `identity` contains one or more keys or properties       | identity | boolean |
| [length](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)        | Returns the number of keys or properties contained in `identity` | identity | number |
| [containsKeys](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)  | Checks if `identity` contains the specified properties | identity, keyList | boolean |
| [trim](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)          | Removes properties from `identity` and only keeps the specified properties | identity, keyList | `identity` |
| [locate](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)        | Performs a deep search by iterating through the `collection`'s entire object tree an returns the path to the first `identical` match that is found as a string of dot . separated property names | collection, identity | string |
| [deepGet](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)       | Uses `locate` and returns the `indentity`'s container if found in `collection` |    collection, identity | identity |
| [locateAll](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)     | Uses `locate` and returns all the paths to all matches | collection, identity | array of string |
| [deepFilter](https://github.com/AndrewRedican/mitsuketa/wiki/v1.1.0-Features)    | Users `locateAll` and returns an array of all an identites matched inside `collection`  | collection, identity | array of identities |
| [exists](https://github.com/AndrewRedican/mitsuketa/wiki)        | Performs deep search on `collection` for an identical match to `identity` | collection, identity | boolean |
| [onlyExisting](https://github.com/AndrewRedican/mitsuketa/wiki)  | For each identity in `identities`, performs a deep search on `collection` using `exists`, to shorten the list `identities` to those that were found | collection, identities | identities |
| [onlyMissing](https://github.com/AndrewRedican/mitsuketa/wiki)   | For each identity in `identities`, performs a deep search on `collection` using `exists`, to shorten the list `identities` to those that were **not** found | collection, identities | identities |
| [isFalsy](https://github.com/AndrewRedican/mitsuketa/wiki)       | Checks if identity has or false or false-like values. These include: null, undefined, '', false, and 0 | identity | `identity` or `false` |
| [isTruthy](https://github.com/AndrewRedican/mitsuketa/wiki)      | Checks if identity is non-falsy | identity | `identity` or `false` |
| [foundTruthy](https://github.com/AndrewRedican/mitsuketa/wiki)   | Performs deep search on `collection`, and evaluate if `isTruthy` on the first identical match to `identity` | collection, identity | boolean |
| [foundFalsy](https://github.com/AndrewRedican/mitsuketa/wiki)    | Performs deep search on `collection`, and evaluate if `isFalsy` on the first identical match to `identity` | collection, identity | boolean |
| [onlyTruthy](https://github.com/AndrewRedican/mitsuketa/wiki)    | For each identity in `identities`, performs a deep search on `collection` using `exists`, and evaluates if `isTruthy` on the first identical match of `property` to shorten the list `identities` to those that were found and also truthy | collection, identities, property | identities |
| [onlyFalsy](https://github.com/AndrewRedican/mitsuketa/wiki)     | For each identity in `identities`, performs a deep search on `collection` using `exists`, and evaluates if `isFalsy` on the first identical match of `property` to shorten the list `identities` to those that were found and also truthy | collection, identities, property | identities |


## Examples

Dummy object used in examples:

```
const complexObject = {
    A : {
        Example : {
            DeeplyNested : {
                SamePropName     : 'SamePropName1',
                OtherProperty    : ['One','Two','Three'],
                AnotherProperty  : { type: 'test' }
            }
        }
    },
    B : '100',
    C : { 
        SamePropName     : 'SamePropName2',
        OtherProperty    : ['x','y','z']
    },
    D : {
        A : 100,
        B : 'a string',
        C : [
            {
                name : 'Andrew Redican',
                id : 1,
                description: 'this is a description HELLO'
            },
            {
                name : 'John Teage',
                id : 2,
                description: 'this is a description WORLD'
            }
        ]
    },
    E : {
        ANumber : 7,
        OtherProperty : 'check this out'
    }
}
```

### deepFilter( *collection*, *identity* )
Performs deep search on collection to find all matches to the identity, will return the entity containing the matched instances.

_*See **deepGet().** Performs similar operation. Instead of returning a single identity, it returns an array of all containers with matching identities._

### locateAll( *collection*, *identity* )
Performs deep search on collection to find all matches to the identity, returns a string array.

_*See **locate().** Performs similar operation. Instead of returning a single path, it returns an array of all paths of containers with matching the identities._

### deepGet( *collection*, *identity* )
Performs deep search on collection to find a match to the identity, will return the entity containing of the first instance matched.

```
    deepGet(complexObject, 2)
    // returns: {name: "John Teage", id: 2, description: "this is a description WORLD"}
    
    
    deepGet(complexObject, { id : 1 })
    // returns: {name: "Andrew Redican", id: 1, description: "this is a description HELLO"}
    
    
    deepGet(complexObject, '7')
    // returns: undefined
    
    
    deepGet(complexObject, 'this is a description WORLD')
    // returns: {name: "John Teage", id: 2, description: "this is a description WORLD"} 
    
    
    deepGet(complexObject, 'x')
    // returns: ["x", "y", "z"]
    
    
    deepGet(complexObject, { type: 'test' })
    // returns: {type: "test"}
     
```


### locate( *collection*, *identity* )
Performs deep search on collection to find a match to the identity, will return the path of the first instance matched.

```
    locate(complexObject, 2)
    // returns: 'D.C.1.id'
    
    
    locate(complexObject, { id : 1 })
    // returns: 'D.C.0'
    
    
    locate(complexObject, '7')
    // returns: false
    
    
    locate(complexObject, 'this is a description WORLD')
    // returns: 'D.C.1.description'
    
    
    locate(complexObject, 'x')
    // returns: 'C.OtherProperty.0'
    
    
    locate(complexObject, { type: 'test' })
    // returns: 'A.Example.DeeplyNested.AnotherProperty'
    
```


### identical( *identityA*, *identityB* )
Compares two identities, will return either true if identical, otherwise false. Makes distintiction between datatypes, values, properties, iterables ( Object !== Array), and child/nested entities.

```
    const test = '5';
    
    identical(test,'5') // returns: true
    
    identical(test, 5 ) // returns: false
    
    identical(test,[5]) // returns: false
    
    identical({A: 'Hello'},{A: 'Hi!'}) // returns: false
    
```


### trim( *identity*, *keyList* )
Trims an identity to only contain the specified properties.

```
    const O = {
        propA : 'Test',
        propB: [1,2,3],
        propC: {
            name: 'mitsuketa',
            type : 'javascript'
        },
        propD: 37
    };
    
    
    trim(O,['propA','propB'])
    returns { propA : 'Test', propB: [1,2,3] }
    
    
    trim(O,[])
    trim({},['propA','propB'])
    trim([],['propA','propB'])
    // returns undefined
    
```


### isIterable( *identity* )
Checks if identity has one or more keys to iterate

```
    isIterable(5)
    // returns false
    
    
    isIterable({})
    // returns false
    
    
    isIterable({ A: '1', B: '2' })
    isIterable([1,2,3])
    // returns true
    
```


### containsKeys( *identity*, *keyList* )
Checks if identity contains all of the specified keys
```
    const O = {
        propA : 'Test',
        propB: [1,2,3],
        propC: {
            name: 'mitsuketa',
            type : 'javascript'
        },
        propD: 37
    };
    
    
    containsKeys( O, 'propC' )
    containsKeys( O, ['propA','propB'] )
    // returns true
    
    
    containsKeys( O, ['doesnt','exist'] )
    // returns false
    
```


### sameStructure( *identityA*, *identityB* )
Compares data structure of two identities, will return either the dataType or true/false.
```
    const objA = { A: '4', B: 0, C: 'for the win' };
    const objB = { A: null, B: {}, C: ['hello','world'] };
    
    sameStructure(objA,objB)
    // returns true
    
    sameStructure(objA,{ A: 'missing', C: 'B property'})
    // returns false
    
```


### sameType( *identityA*, *identityB* )
Compares data type of two identities, will dataType if true.
```
    sameType(10,8)
    // returns : 'number'
    
    
    sameType(10,'8')
    // returns : false
    
    
    sameType('hype','8')
    // returns : 'string'
    
    
    sameType({ print: 3 }, { print: 'foobar' })
    // returns : 'object'
    
    
    sameType([], ['one',2,'III'])
    // returns : 'array'
    
```


### getType( *identity* )
Gets data type. Also makes distintion between object, array, and null.
```
    getType(5)
    // returns: 'number'


    getType('7')
    getType('apple')
    // returns: 'string'


    getType(null)
    // returns: 'null'


    getType(void(0))
    getType(undefined)
    // returns: 'undefined'


    getType([])
    getType(['one','two','three'])
    getType(['hello',4,{}])
    // returns: 'array'

    getType({})
    getType({A: 'test', B: 'foobar'})
    // returns: 'object'

```


## Built With

* Vanilla Javascript, ES5, ES6

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* Got my inspiration from lodash.js

## Help me improve!

If you have a minute to spare, can you answer these two questions?
https://www.surveymonkey.com/r/XJ37XSP

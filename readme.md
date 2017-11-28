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

deepGet( *collection*, *identity* )

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


locate( *collection*, *identity* )

```
    locate(complexObject, 2)
    // returns: D.C.1.id
    
    
    locate(complexObject, { id : 1 })
    // returns: D.C.0
    
    
    locate(complexObject, '7')
    // returns: false
    
    
    locate(complexObject, 'this is a description WORLD')
    // returns: D.C.1.description
    
    
    locate(complexObject, 'x')
    // returns: C.OtherProperty.0
    
    
    locate(complexObject, { type: 'test' })
    // returns: A.Example.DeeplyNested.AnotherProperty
    
```


identical( *identityA*, *identityB* )

```
    const test = '5';
    identical(test,'5') // returns: true
    identical(test, 5 ) // returns: false
    identical(test,[5]) // returns: false
    
    /** 
    /* identical makes deep comparision between entities. 
    /* Makes distintiction between datatypes, values, properties,
    /* iterables ( Object !== Array), and child/nested entities.
    **/
    
```


trim( *identity*, *keyList* )

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


isIterable( *identity* )

```
    isIterable(5)
    // returns false
    
    
    isIterable({})
    // returns false
    
    
    isIterable({ A: '1', B: '2' })
    isIterable([1,2,3])
    // returns true
    
```


containsKeys( *identity*, *keyList* )

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


sameStructure( *identityA*, *identityB* )

```
    const objA = { A: '4', B: 0, C: 'for the win' };
    const objB = { A: null, B: {}, C: ['hello','world'] };
    
    sameStructure(objA,objB)
    // returns true
    
    sameStructure(objA,{ A: 'missing', C: 'B property'})
    // returns false
    
```


sameType( *identityA*, *identityB* )

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


getType( *identity* )

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Got my inspiration from lodash.js

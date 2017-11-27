# Mitsuketa

A Javascript library that enables you to handle deeply nested objects easily.

## Installation

In a browser:

```
<script src="mitsuketa.js"></script>
```

Using npm:

```
$ npm i -g npm
$ npm i --save mitsuketa
```

## Why mitsuketa?

Mitsuketa makes JavaScript easier by taking the hassle out of working with deeply nested data structures.

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
Give an example
```


containsKeys( *identity*, *keyList* )

```
Give an example
```


sameStructure( *identityA*, *identityB* )

```
Give an example
```


sameType( *identityA*, *identityB* )

```
Give an example
```


getType( *identity* )

```
getType(5) // returns: 'number'

getType('apple')
getType('7') // returns: 'string'

getType(null) // returns: 'null'

getType(undefined) // returns: 'undefined'

getType([])
getType(['one','two','three'])
getType(['hello',4,{}]) // returns: 'array'

getType({A: 'test', B: 'foobar'})
getType({}) // returns: 'object'

```


## Built With

* Vanilla Javascript, ES5, ES6

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Got my inspiration from lodash.js

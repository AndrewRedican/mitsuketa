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
Give an example
```


locate( *collection*, *identity* )

```
Give an example
```


identical( *identityA*, *identityB* )

```
Give an example
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
Give an example
```


## Built With

* Vanilla Javascript, ES5, ES6

## Authors

* **Andrew Redican** [andrewredican](https://github.com/andrewredican)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Got my inspiration from lodash.js

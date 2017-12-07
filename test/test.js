var assert = require('chai').assert;
var mitsuketa = require('../index');

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('getType()', function() {
  var tests = [
    {args: false,               expected: 'boolean'  },
    {args: true,                expected: 'boolean'  },
    {args: 'foobar',            expected: 'string'   },
    {args: [],                  expected: 'array'    },
    {args: {},                  expected: 'object'   },
    {args: ['one',2,'three'],   expected: 'array'    },
    {args: { hello: 'world' },  expected: 'object'   },
    {args: null,                expected: 'null'     },
    {args: undefined,           expected: 'undefined'},
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.getType(test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('sameType()', function() {
    var tests = [
      {args: ['3',3],                   expected: false      },
      {args: [false,null],              expected: false      },
      {args: [null,undefined],          expected: false      },
      {args: [{},[]],                   expected: false      },
      {args: ['','hello'],              expected: 'string'   },
      {args: [100000,1],                expected: 'number'   },
      {args: [[1,2,3],[]],              expected: 'array'    },
      {args: [{},{ hello : 'world'}],   expected: 'object'   },
      {args: [null,null],               expected: 'null'     },
      {args: [void(0),undefined],       expected: 'undefined'},
    ];
  
    tests.forEach(function(test) {
      it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
        var res = mitsuketa.sameType(test.args[0],test.args[1]);
        assert.equal(res, test.expected);
      });
    });
});

describe('sameStructure()', function() {
  var tests = [
    {args: ['3',3],                                    expected: false      },
    {args: [false,null],                               expected: false      },
    {args: [null,undefined],                           expected: false      },
    {args: [{},[]],                                    expected: false      },
    {args: ['','hello'],                               expected: 'string'   },
    {args: [100000,1],                                 expected: 'number'   },
    {args: [null,null],                                expected: 'null'     },
    {args: [void(0),undefined],                        expected: 'undefined'},
    {args: [[1,2,3],['one','two','three']],            expected: 'array'    },
    {args: [{ A:true, B:false },{ A:'foo', B:'bar' }], expected: 'object'   },
    {args: [[1,2,3],[]],                               expected: false      },
    {args: [{},{ hello : 'world'}],                    expected: false      },
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.sameStructure(test.args[0],test.args[1]);
      assert.equal(res, test.expected);
    });
  });
});

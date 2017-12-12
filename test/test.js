var assert = require('chai').assert;
var mitsuketa = require('../index');

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('getType(identity)', function() {
  var tests = [
    {args: false,               expected: 'boolean'  },
    {args: true,                expected: 'boolean'  },
    {args: 'foobar',            expected: 'string'   },
    {args: [],                  expected: 'array'    },
    {args: {},                  expected: 'object'   },
    {args: ['one',2,'three'],   expected: 'array'    },
    {args: { hello: 'world' },  expected: 'object'   },
    {args: null,                expected: 'null'     },
    {args: undefined,           expected: 'undefined'}
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.getType(test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('sameType(identityA,identityB)', function() {
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
      {args: [void(0),undefined],       expected: 'undefined'}
    ];
  
    tests.forEach(function(test) {
      it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
        var res = mitsuketa.sameType(test.args[0],test.args[1]);
        assert.equal(res, test.expected);
      });
    });
});

describe('sameStructure(identityA,identityB)', function() {
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
    {args: [{},{ hello : 'world'}],                    expected: false      }
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.sameStructure(test.args[0],test.args[1]);
      assert.equal(res, test.expected);
    });
  });
});

describe('identical(identityA,identityB)', function() {
  const
    a = { tasks : ['do laundry','tidy room','mow the lawn'], status : "I really don't want to" },
    b = { tasks : ['do laundry','tidy room','mow the lawn'], status : "I really don't want to" },
    c = { tasks : [1,2,3], status : "I hope this fails." },
    d = { tasks : [], status : '' },
    e = [ [1,2,3], "I hope this fails." ],
    f = { tasks : ['do laundry','tidy room','mow the lawn'] },
    g = [ { tasks : [1,2,3] }, { status : "I hope this fails." } ],
    h = { tasks : a.tasks, status : a.status },
    i = 0,
    j = null,
    k = undefined,
    l = {};

  var tests = [
    {args: [a,b], expected: true  },
    {args: [a,h], expected: true  },
    {args: [a,c], expected: false },
    {args: [a,d], expected: false },
    {args: [a,e], expected: false },
    {args: [a,f], expected: false },
    {args: [a,g], expected: false },
    {args: [j,i], expected: false },
    {args: [l,j], expected: false },
    {args: [k,i], expected: false },
    {args: [k,l], expected: false }
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.identical(test.args[0],test.args[1]);
      assert.equal(res, test.expected);
    });
  });
});

describe('isIterable(identity)', function() {
  var tests = [
    {args: { foo : 'bar' },         expected: true  },
    {args: [ null ],                expected: true  },
    {args: [[]],                    expected: true  },
    {args: [{}],                    expected: true  },
    {args: [1,'two'],               expected: true  },
    {args: { earth: '', mars: '' }, expected: true  },
    {args: [],                      expected: false },
    {args: {},                      expected: false },
    {args: 3,                       expected: false },
    {args: 'helloWorld',            expected: false },
    {args: undefined,               expected: false }
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.isIterable(test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('containsKeys(identity,keyList)', function() {
  const
    Obj = { type : 'bicycle', used : 'yes', speed : 5, acceleration : 3, grip: 2 },
    Arr = ['hyper','super','extra','ultra','plus'];
  var tests = [
    {args: [Obj,['speed','acceleration']], expected: true  },
    {args: [Arr,[1,2]],                    expected: true  },
    {args: [Arr,['ultra','hyper']],        expected: false },
    {args: [Obj,[]],                       expected: false },
    {args: [{},['speed','acceleration']],  expected: false },
    {args: [Obj,['speed','model']],        expected: false },
    {args: [Obj,['model','maker']],        expected: false }
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.containsKeys(test.args[0],test.args[1]);
      assert.equal(res, test.expected);
    });
  });
});

describe('trim(identity,keyList)', function() {
  const
    Obj = { type : 'bicycle', used : 'yes', speed : 5, acceleration : 3, grip: 2 },
    Arr = ['hyper','super','extra','ultra','plus'];
  var tests = [
    {args: [Obj,['speed','acceleration']], expected: { speed : 5, acceleration : 3 }  },
    {args: [Arr,[1,2]],                    expected: ['super','extra']                },
    {args: ['string',['speed','model']],   expected: undefined                        },
    {args: [null,['model','maker']],       expected: undefined                        },
    {args: [3,['model','maker']],          expected: undefined                        },
    {args: [Obj,[]],                       expected: undefined                        }
  ];

  tests.forEach(function(test) {
    it('correctly defines ' + test.args + " as '" + test.expected + "'", function() {
      var res = mitsuketa.trim(test.args[0],test.args[1]);
      assert.equal(res, test.expected);
    });
  });
});
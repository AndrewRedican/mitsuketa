/**
 * Dependencies
 */
var assert     = require('chai').assert;

/**
 * Test Subject
 */
var mitsuketa  = require('../index');

/**
 * Wrapper that returns a string representation of an object
 * @param {*} O 
 */
function stringify(O){ 
  if([null,undefined].indexOf(O) > -1) return typeof O;
  return JSON.stringify(O).replace(/"/g, '\'');
}

/**
 * Returns a string that describes the operation
 * @param {number} n number of arguments in operation
 * @param {*} arg arguments of operation
 * @param {*} res expected results of opetation
 */
function opDesciption(n,arg,res){
  var str = 'correctly defines ';
      res = stringify(res);
  if(n === 1) return str + stringify(arg) + ' as ' + res;
  for(var i = 0; i < n; i++){
    str += (stringify(arg[i]) + ( i + 1 === n ? '' : ' , ' ));
  }
  str += ' as ' + res;
  return str;
}

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

/**
 * 
 *  VERSION 1 FEATURES
 * 
 */

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
    it(opDesciption(1,test.args,test.expected), function() {
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
      it(opDesciption(2,test.args,test.expected), function() {
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
    it(opDesciption(2,test.args,test.expected), function() {
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
    it(opDesciption(2,test.args,test.expected), function() {
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
    it(opDesciption(1,test.args,test.expected), function() {
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
    it(opDesciption(2,test.args,test.expected), function() {
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
    {args: [Arr,['super','extra']],        expected: []                               },
    {args: [Arr,[1,2]],                    expected: ['super','extra']                },
    {args: ['string',['speed','model']],   expected: undefined                        },
    {args: [null,['model','maker']],       expected: undefined                        },
    {args: [3,['model','maker']],          expected: undefined                        },
    {args: [Obj,[]],                       expected: undefined                        }
  ];
  tests.forEach(function(test) {
    it(opDesciption(2,test.args,test.expected), function() {
      var res = mitsuketa.trim(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

const complexObject = {
  A : {
      Example : {
          DeeplyNested : {
              SamePropName     : 'SamePropName1',
              OtherProperty    : ['One','Two','Three'],
              AnotherProperty  : { type: 'test' },
              DepthTest        : 'sameValue'
          }
      }
  },
  B : '100',
  C : { 
      SamePropName     : 'SamePropName2',
      OtherProperty    : ['x','y','z'],
      DepthTest        : 'sameValue'
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

describe('locate(collection,identity)', function() {
  var tests = [
    {args: [complexObject,2],                             expected: 'D.C.1.id'                               },
    {args: [complexObject,{ id : 1 }],                    expected: 'D.C.0'                                  },
    {args: [complexObject,'7'],                           expected: false                                    },
    {args: [complexObject,'this is a description WORLD'], expected: 'D.C.1.description'                      },
    {args: [complexObject,'x'],                           expected: 'C.OtherProperty.0'                      },
    {args: [complexObject,{ type: 'test' }],              expected: 'A.Example.DeeplyNested.AnotherProperty' }
  ];
  tests.forEach(function(test) {
    it(opDesciption(2,test.args,test.expected), function() {
      var res = mitsuketa.locate(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locate(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [complexObject,2,0],                           expected: false                    },
    {args: [complexObject,2,1],                           expected: false                    },
    {args: [complexObject,2,2],                           expected: false                    },
    {args: [complexObject,2,3],                           expected: false                    },
    {args: [complexObject,2,4],                           expected: 'D.C.1.id'               },
    {args: [complexObject,{DepthTest : 'sameValue'},0],   expected: false                    },
    {args: [complexObject,{DepthTest : 'sameValue'},1],   expected: 'C'                      },
    {args: [complexObject,{DepthTest : 'sameValue'},2],   expected: 'C'                      },
    {args: [complexObject,{DepthTest : 'sameValue'},3],   expected: 'A.Example.DeeplyNested' },
    {args: [complexObject,{DepthTest : 'sameValue'},4],   expected: 'A.Example.DeeplyNested' }
  ];
  tests.forEach(function(test) {
    it(opDesciption(3,test.args,test.expected), function() {
      var res = mitsuketa.locate(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepGet(collection,identity)', function() {
  var tests = [
    {args: [complexObject,2],                             expected: {name: 'John Teage', id: 2, description: 'this is a description WORLD'}       },
    {args: [complexObject,{ id : 1 }],                    expected: {name: 'Andrew Redican', id: 1, description: 'this is a description HELLO'}   },
    {args: [complexObject,'7'],                           expected: undefined                                                                     },
    {args: [complexObject,'this is a description WORLD'], expected: {name: 'John Teage', id: 2, description: 'this is a description WORLD'}       },
    {args: [complexObject,'x'],                           expected: ['x', 'y', 'z']                                                               },
    {args: [complexObject,{ type: 'test' }],              expected: {type: 'test'}                                                                }
  ];
  tests.forEach(function(test) {
    it(opDesciption(2,test.args,test.expected), function() {
      var res = mitsuketa.deepGet(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepGet(collection,identity,maxDepth)', function() {
  var res1 = { 
    SamePropName  : 'SamePropName2',
    OtherProperty : ['x','y','z'],
    DepthTest     : 'sameValue'
  };
  var res2 = {
    SamePropName     : 'SamePropName1',
    OtherProperty    : ['One','Two','Three'],
    AnotherProperty  : { type: 'test' },
    DepthTest        : 'sameValue'
  };
  var tests = [
    {args: [complexObject,2,0],                           expected: undefined                                                               },
    {args: [complexObject,2,1],                           expected: undefined                                                               },
    {args: [complexObject,2,2],                           expected: undefined                                                               },
    {args: [complexObject,2,3],                           expected: undefined                                                               },
    {args: [complexObject,2,4],                           expected: {name: 'John Teage', id: 2, description: 'this is a description WORLD'} },
    {args: [complexObject,{DepthTest : 'sameValue'},0],   expected: undefined                                                               },
    {args: [complexObject,{DepthTest : 'sameValue'},1],   expected: res1                                                                    },
    {args: [complexObject,{DepthTest : 'sameValue'},2],   expected: res1                                                                    },
    {args: [complexObject,{DepthTest : 'sameValue'},3],   expected: res2                                                                    },
    {args: [complexObject,{DepthTest : 'sameValue'},4],   expected: res2                                                                    }
  ];
  tests.forEach(function(test) {
    it(opDesciption(3,test.args,test.expected), function() {
      var res = mitsuketa.deepGet(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locateAll(collection,identity)', function() {
  var tests = [
    {args: [complexObject,2],                             expected: ['D.C.1.id']                   },
    {args: [complexObject,{ id : 1 }],                    expected: ['D.C.0']                      },
    {args: [complexObject,'7'],                           expected: false                          },
    {args: [complexObject,'x'],                           expected: ['C.OtherProperty.0']          },
    {args: [complexObject,{DepthTest : 'sameValue'}],     expected: ['A.Example.DeeplyNested','C'] }
  ];
  tests.forEach(function(test) {
    it(opDesciption(2,test.args,test.expected), function() {
      var res = mitsuketa.locateAll(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locateAll(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [complexObject,2,2],                         expected: false                          },
    {args: [complexObject,2,4],                         expected: ['D.C.1.id']                   },
    {args: [complexObject,{DepthTest : 'sameValue'},1], expected: ['C']                          },
    {args: [complexObject,{DepthTest : 'sameValue'},4], expected: ['A.Example.DeeplyNested','C'] }
  ];
  tests.forEach(function(test) {
    it(opDesciption(3,test.args,test.expected), function() {
      var res = mitsuketa.locateAll(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepFilter(collection,identity)', function() {
  var res1 = {
      SamePropName     : 'SamePropName1',
      OtherProperty    : ['One','Two','Three'],
      AnotherProperty  : { type: 'test' },
      DepthTest        : 'sameValue'
  };
  var res2 = { 
      SamePropName     : 'SamePropName2',
      OtherProperty    : ['x','y','z'],
      DepthTest        : 'sameValue'
  };
  var tests = [
    {args: [complexObject,2],                         expected: [{'name':'John Teage','id':2,'description':'this is a description WORLD'}] },
    {args: [complexObject,'7'],                       expected: undefined                                                                  },
    {args: [complexObject,{DepthTest : 'sameValue'}], expected: [res1,res2]                                                                }
  ];
  tests.forEach(function(test) {
    it(opDesciption(2,test.args,test.expected), function() {
      var res = mitsuketa.deepFilter(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepFilter(collection,identity,maxDepth)', function() {
  var res1 = {
      SamePropName     : 'SamePropName1',
      OtherProperty    : ['One','Two','Three'],
      AnotherProperty  : { type: 'test' },
      DepthTest        : 'sameValue'
  };
  var res2 = { 
      SamePropName     : 'SamePropName2',
      OtherProperty    : ['x','y','z'],
      DepthTest        : 'sameValue'
  };
  var tests = [
    {args: [complexObject,2,2],                       expected: undefined                                                                  },
    {args: [complexObject,2,4],                       expected: [{'name':'John Teage','id':2,'description':'this is a description WORLD'}] },
    {args: [complexObject,'7',5],                     expected: undefined                                                                  },
    {args: [complexObject,{DepthTest : 'sameValue'}], expected: [res1,res2]                                                                }
  ];
  tests.forEach(function(test) {
    it(opDesciption(3,test.args,test.expected), function() {
      var res = mitsuketa.deepFilter(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});


/**
 * 
 *  VERSION 2 FEATURES
 * 
 */
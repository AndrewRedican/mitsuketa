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
function opDescription(n,arg,res){
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
 *  VERSION 1.1 FEATURES
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
    it(opDescription(1,test.args,test.expected), function() {
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
      it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(1,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(3,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(3,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(3,test.args,test.expected), function() {
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
    it(opDescription(2,test.args,test.expected), function() {
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
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.deepFilter(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

/**
 * 
 *  VERSION 1.2 FEATURES
 * 
 */

describe('length(identity)', function() {
  var listA = ['Henry','Lissa','Michael','Tom'];
  let listB = {
      nancy_mccarty: "Nancy McCarty",
      george_richardson: "George Richardson",
      heidy_white: ["Heidy White","Anita_Salgado"]
  };
  var tests = [
    {args: listA,         expected: 4 },
    {args: listB,         expected: 3  },
    {args: 68,            expected: 0  },
    {args: null,          expected: 0  },
    {args: 'hello world', expected: 0  },
    {args: {},            expected: 0  },
    {args: '',            expected: 0  }
  ];
  tests.forEach(function(test) {
    it(opDescription(1,test.args,test.expected), function() {
      var res = mitsuketa.length(test.args);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

const assessments= {
  nancy_mccarty : {
      A1: {
          userID: "nancy_mccarty",
          userName: "Nancy McCarty",
          id : "A1",
          score : 0.75,
          date_created : 151208443563,
          date_signed : 151208448055,
          date_approved: 151208471190,
          answers: ['Yes','No','No','Yes','No']
      },
      A2: {
          userID: "nancy_mccarty",
          userName: "Nancy McCarty",
          id : "A2",
          score : 0.9,
          date_created : 151208450090,
          date_signed : false,
          date_approved: false,
          answers: ['No','No','No','Yes','Yes']
      }
  },
  george_richardson : {
      A2: {
          userID: "george_richardson",
          userName: "George Richardson",
          id : "A2",
          score : 0.35,
          date_created : 1512076585058,
          date_signed : false,
          date_approved: false,
          answers: ['No','Yes','Yes','Yes','Yes']
      }
  },
  tom_hughe : { 
      A4: {
          userID: "tom_hughe",
          userName: "Tom Hughe",
          id : "A4",
          score : 0.75,
          date_created : 1512076575026,
          date_signed : 1512076609894,
          date_approved: false,
          answers: ['Yes','No','No','Yes','No']
      },
      M1: {
          userID: "tom_hughe",
          userName: "Tom Hughe",
          id : "M1",
          score : false,
          date_created : 1512076587361,
          date_signed : false,
          date_approved: false,
          answers: [false,false,false,false,false]
      }
  },
  heidy_white : {
      L2: {
          userID: "heidy_white",
          userName: "Heidy White",
          id : "L2",
          score : false,
          date_created : 15120765766312,
          date_signed : false,
          date_approved: false,
          answers: [false,false,false,false,false]
      }
  }
}

describe('length(identity)', function() {
  var listA = ['Henry','Lissa','Michael','Tom'];
  let listB = {
      nancy_mccarty: "Nancy McCarty",
      george_richardson: "George Richardson",
      heidy_white: ["Heidy White","Anita_Salgado"]
  };
  var tests = [
    {args: listA,         expected: 4  },
    {args: listB,         expected: 3  },
    {args: 68,            expected: 0  },
    {args: null,          expected: 0  },
    {args: 'hello world', expected: 0  },
    {args: {},            expected: 0  },
    {args: '',            expected: 0  }
  ];
  tests.forEach(function(test) {
    it(opDescription(1,test.args,test.expected), function() {
      var res = mitsuketa.length(test.args);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('exists(collection,identity)', function() {
  var obj   = { answers: [false,false,false,false,false] };
  var tests = [
    {args: [assessments,{userName: 'Tom Hughe'}], expected: true },
    {args: [assessments,{score : false}],         expected: true },
    {args: [assessments,{id : 'M1'}],             expected: true },
    {args: [assessments,obj],                     expected: true }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.exists(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('exists(collection,identity,maxDepth)', function() {
  var obj   = { answers: [false,false,false,false,false] };
  var tests = [
    {args: [assessments,{userName: 'Tom Hughe'},0], expected: false },
    {args: [assessments,{score : false},1],         expected: false },
    {args: [assessments,{id : 'M1'},2],             expected: true  },
    {args: [assessments,obj,3],                     expected: true  }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.exists(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyExisting(collection,identity)', function() {
  var userIDs = ['nancy_mccarty','sean_mccollin','george_richardson','giselle_lopez'];
  var tests = [
    {args: [assessments,userIDs],       expected: ['nancy_mccarty','george_richardson'] },
    {args: [assessments,[]],            expected: []                                    },
    {args: ['nothing goes on',userIDs], expected: []                                    }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.onlyExisting(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyExisting(collection,identity,maxDepth)', function() {
  var userIDs = ['nancy_mccarty','sean_mccollin','george_richardson','giselle_lopez'];
  var IDs     = ['A1', 'A2', 'A3', 'A4', 'L1', 'L2', 'L3', 'L4', 'M1', 'M2'];
  var tests = [
    {args: [assessments,userIDs,1], expected: []                                    },
    {args: [assessments,userIDs,2], expected: []                                    },
    {args: [assessments,userIDs,3], expected: ['nancy_mccarty','george_richardson'] },
    {args: [assessments,IDs,1],     expected: []                                    },
    {args: [assessments,IDs,2],     expected: []                                    },
    {args: [assessments,IDs,3],     expected: ['A1','A2','A4','L2','M1']            }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.onlyExisting(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyMissing(collection,identity)', function() {
  var userIDs = ['nancy_mccarty','sean_mccollin','george_richardson','giselle_lopez'];
  var tests = [
    {args: [assessments,userIDs],       expected: ['sean_mccollin','giselle_lopez'] },
    {args: [assessments,[]],            expected: []                                },
    {args: ['nothing goes on',userIDs], expected: userIDs                           }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.onlyMissing(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyMissing(collection,identity,maxDepth)', function() {
  var userIDs = ['nancy_mccarty','sean_mccollin','george_richardson','giselle_lopez'];
  var IDs     = ['A1', 'A2', 'A3', 'A4', 'L1', 'L2', 'L3', 'L4', 'M1', 'M2'];
  var tests = [
    {args: [assessments,userIDs,1], expected: userIDs                           },
    {args: [assessments,userIDs,2], expected: userIDs                           },
    {args: [assessments,userIDs,3], expected: ['sean_mccollin','giselle_lopez'] },
    {args: [assessments,IDs,1],     expected: IDs                               },
    {args: [assessments,IDs,2],     expected: IDs                               },
    {args: [assessments,IDs,3],     expected: ['A3','L1','L3','L4','M2']        }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.onlyMissing(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('isFalsy(identity)', function() {
  var tests = [
    {args: null,               expected: true  },
    {args: undefined,          expected: true  },
    {args: false,              expected: true  },
    {args: 0,                  expected: true  },
    {args: [1,'domingo',null], expected: false },
    {args: -3,                 expected: false },
    {args: {},                 expected: false }
  ];

  tests.forEach(function(test) {
    it(opDescription(1,test.args,test.expected), function() {
      var res = mitsuketa.isFalsy(test.args);
      assert.equal(res, test.expected);
    });
  });
});

describe('isTruthy(identity)', function() {
  var tests = [
    {args: [1,'domingo',null],     expected: true  },
    {args: -3,                     expected: true  },
    {args: [],                     expected: true  },
    {args: { propA: 'some text' }, expected: true  },
    {args: null,                   expected: false },
    {args: undefined,              expected: false },
    {args: false,                  expected: false },
    {args: 0,                      expected: false }
  ];

  tests.forEach(function(test) {
    it(opDescription(1,test.args,test.expected), function() {
      var res = mitsuketa.isTruthy(test.args);
      assert.equal(res, test.expected);
    });
  });
});

var testObj = {
  userID: "nancy_mccarty",
  userName: "Nancy McCarty",
  id : "A2",
  score : 0.9,
  date_created : 151208450090,
  date_signed : false,
  deeplynested : {
      propA: 88,
      propB: 0,
      newDepth : { propC: 'I have some answers' }
  }
};

describe('foundTruthy(collection,identity)', function() {
  var tests = [
    {args: [testObj,{date_created : false}], expected: true  },
    {args: [testObj,'propA'],                expected: true  },
    {args: [testObj,'deeplynested'],         expected: true  },
    {args: [testObj,'propD'],                expected: false }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.foundTruthy(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('foundTruthy(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [testObj,'propC',1], expected: false },
    {args: [testObj,'propC',2], expected: true  }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.foundTruthy(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('foundFalsy(collection,identity)', function() {
  var tests = [
    {args: [testObj,{date_created : false}], expected: false      },
    {args: [testObj,['foo','bar']],          expected: undefined  },
    {args: [testObj,{score: false}],         expected: false      },
    {args: [testObj,'propB'],                expected: true       }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.foundFalsy(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('foundFalsy(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [testObj,{propA: 88},1], expected: false },
    {args: [testObj,{propA: 88},0], expected: false },
    {args: [testObj,{propB: 0},1],  expected: true  },
    {args: [testObj,{propB: 0},0],  expected: false },
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.foundFalsy(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyTruthy(collection,identities,property)', function() {
  var team = ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white'];
  var team2 = {
    nancy_mccarty : "Nancy McCarty",
    george_richardson : "George Richardson",
    tom_hughe : "Tom Hughe",
    heidy_white : "Heidy White"
  };
  var tests = [
    {args: [assessments,team,'date_signed'],  expected: ['Nancy McCarty','Tom Hughe']                                 },
    {args: [assessments,team2,'date_signed'], expected: { nancy_mccarty : "Nancy McCarty", tom_hughe : "Tom Hughe" }  }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.onlyTruthy(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyTruthy(collection,identities,property,maxDepth)', function() {
  var team = ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white'];
  var team2 = {
    nancy_mccarty : "Nancy McCarty",
    george_richardson : "George Richardson",
    tom_hughe : "Tom Hughe",
    heidy_white : "Heidy White"
  };
  var tests = [
    {args: [assessments,team,'date_signed',0],  expected: []                                                            },
    {args: [assessments,team,'date_signed',1],  expected: ['Nancy McCarty','Tom Hughe']                                 },
    {args: [assessments,team2,'date_signed',0], expected: {}                                                            },
    {args: [assessments,team2,'date_signed',1], expected: { nancy_mccarty : "Nancy McCarty", tom_hughe : "Tom Hughe" }  }
  ];
  tests.forEach(function(test) {
    it(opDescription(4,test.args,test.expected), function() {
      var res = mitsuketa.onlyTruthy(test.args[0],test.args[1],test.args[2],test.args[3]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyFalsy(collection,identities,property)', function() {
  var team = ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white','Scott Wickham'];
  var team2 = {
    nancy_mccarty : "Nancy McCarty",
    george_richardson : "George Richardson",
    tom_hughe : "Tom Hughe",
    heidy_white : "Heidy White",
    scott_wickham : "Scott Wickham"
  };
  var tests = [
    {args: [assessments,team,'date_signed'],         expected: ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white']  },
    {args: [assessments,team2,{ date_signed : 65 }], expected: {'nancy_mccarty':'Nancy McCarty','george_richardson':'George Richardson','tom_hughe':'Tom Hughe','heidy_white':'Heidy White'}  }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.onlyFalsy(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('onlyFalsy(collection,identities,property,maxDepth)', function() {
  var team = ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white','Scott Wickham'];
  var team2 = {
    nancy_mccarty : "Nancy McCarty",
    george_richardson : "George Richardson",
    tom_hughe : "Tom Hughe",
    heidy_white : "Heidy White",
    scott_wickham : "Scott Wickham"
  };
  var tests = [
    {args: [assessments,team,'date_signed',0],         expected: []                                                                                                                             },
    {args: [assessments,team,'date_signed',1],         expected: ['Nancy McCarty','George Richardson','Tom Hughe','heidy_white']                                                                },
    {args: [assessments,team2,{ date_signed : 65 },0], expected: {}                                                                                                                             },
    {args: [assessments,team2,{ date_signed : 65 },1], expected: {'nancy_mccarty':'Nancy McCarty','george_richardson':'George Richardson','tom_hughe':'Tom Hughe','heidy_white':'Heidy White'}  }
  ];
  tests.forEach(function(test) {
    it(opDescription(4,test.args,test.expected), function() {
      var res = mitsuketa.onlyFalsy(test.args[0],test.args[1],test.args[2],test.args[3]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

/**
 * 
 *  VERSION 1.3 FEATURES
 * 
 */

const bicycles = [
  { 
    unique_id: 299, factory_id: 'alpha', model: 'br-chrome', maker: 'breez TM',
    year: '2017', type: 'racing',
    status: { hasOwner: false, price: 345.99 },
    specs : {
      dimensions: { length: '1.68m', width: '13cm', height: '1.02m' },
      usability: { grip : 5, speed : 4, accelaration : 8, weight: '', durability: 10 },
      color: 'silver',
      components: [ 'basket', 'chain', 'handle', 'seat' ]
    },
    sales: {
      date_arrived: 'Nov 30, 2017', date_showcased: 'Dec 4, 2017', date_sold: false,
      sale_opportunities: [
        { name: 'Donn Reddick',  contact_info: '1-987-652-8775', date: 'Dec 19, 2017'},
        { name: 'Susan Boyle',   contact_info: '1-555-101-9875', date: 'Dec 4, 2017'}
      ]
    }
  },

  { 
    unique_id: 300, factory_id: 'beta', model: 'XV17', maker: 'hyperwheel',
    year: '2017', type: 'city',
    status: { hasOwner: true, price: 1100 },
    specs : {
      dimensions: { length: '1.65m', width: '13cm', height: '1.03m' },
      usability: { grip : 5.5, speed : 3, accelaration : 5, weight: '', durability: 6 },
      color: 'red',
      components: [ 'basket', 'chain', 'handle', 'seat' ]
    },
    sales: {
      date_arrived: 'Nov 13, 2017', date_showcased: 'Nov 16, 2017', date_sold: false,
      sale_opportunities: [
        { name: 'Tom Stark', contact_info: 'N/A', date: ''},
        { name: "Jane O'Neil", contact_info: 'N/A', date: ''}
      ]
    }
  },

  { 
    unique_id: 301, factory_id: 'gamma', model: 'XV15', maker: 'hyperwheel', year: '2017', type: 'sport',
    status: { hasOwner: true, price: 1800 },
    specs : {
      dimensions: { length: '1.68m', width: '13cm', height: '1.02m' },
      usability: { grip : 5, speed : 4, accelaration : 8, weight: '', durability: 10 },
      color: 'red',
      components: [ 'basket', 'chain', 'handle', 'seat', 'kinetic lights' ]
    },
    sales: {
      date_arrived: 'Nov 28, 2017', date_showcased: 'Nov 29, 2017', date_sold: 'Nov 29, 2017',
      sale_opportunities: []
    }
  },

  { 
    unique_id: 302, factory_id: 'gamma',
    model: '2019 pro', maker: 'hyperwheel', year: '2018', type: 'racing',
    status: { hasOwner: false, price: 1499 },
    specs : {
      dimensions: { length: '1.69m', width: '11cm', height: '0.95m' },
      usability: { grip : 5, speed : 4, accelaration : 8, weight: '', durability: 10 },
      color: 'pink',
      components: [ 'basket', 'chain', 'handle', 'seat', 'reflector lights', 'usb charger' ]
    },
    sales: {
      date_arrived: false, date_showcased: false, date_sold: false,
      sale_opportunities: []
    }
  }

];



describe('countMatches(collection,identity)', function() {
  var tests = [
    {args: [bicycles,false],            expected: 7 },
    {args: [bicycles,{ color : 'red'}], expected: 2 },
    {args: [bicycles,'hyperwheel'],     expected: 3 },
    {args: [bicycles,{durability: 10}], expected: 3 }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.countMatches(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('countMatches(collection,identity,nthDepth)', function() {
  var tests = [
    {args: [bicycles,false,2],            expected: 0 },
    {args: [bicycles,false,3],            expected: 7 }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.countMatches(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('countMatches(collection,identity,nthDepth,maxDepth)', function() {
  var tests = [
    {args: [bicycles,false,2,2],            expected: 0 },
    {args: [bicycles,false,3,2],            expected: 0 }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.countMatches(test.args[0],test.args[1],test.args[2],test.args[3]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('maxDepth(identity)', function() {
  var tests = [
    {args: 'Hello World',                          expected: 0 },
    {args: { A : 'Nested World' },                 expected: 1 },
    {args: ['Foo','Bar'],                          expected: 1 },
    {args: { A: [1,2,3], B : { _b : [1,2,[3]] }},  expected: 4 }
  ];
  tests.forEach(function(test) {
    it(opDescription(1,test.args,test.expected), function() {
      var res = mitsuketa.maxDepth(test.args);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('maxDepth(identity,maxDepth)', function() {
  var tests = [
    {args: [{ A: [1,2,3], B : { _b : [1,2,[3]] }},4],  expected: 4 },
    {args: [{ A: [1,2,3], B : { _b : [1,2,[3]] }},3],  expected: 3 },
    {args: [{ A: [1,2,3], B : { _b : [1,2,[3]] }},2],  expected: 2 },
    {args: [{ A: [1,2,3], B : { _b : [1,2,[3]] }},1],  expected: 1 },
    {args: [{ A: [1,2,3], B : { _b : [1,2,[3]] }},0],  expected: 0 }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.maxDepth(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('matchDepth(collection,identity)', function() {
  var tests = [
    {args: [bicycles,"Jane O'Neil"],         expected: 5 },
    {args: [bicycles,{name: "Jane O'Neil"}], expected: 4 },
    {args: [bicycles,302],                   expected: 2 }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.matchDepth(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('matchDepth(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [bicycles,"Jane O'Neil",5],         expected: 5     },
    {args: [bicycles,"Jane O'Neil",4],         expected: false },
    {args: [bicycles,{name: "Jane O'Neil"},4], expected: 4     },
    {args: [bicycles,{name: "Jane O'Neil"},3], expected: false }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.matchDepth(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

/**
 * 
 *  VERSION 2.0 FEATURES
 * 
 */


describe('locate_Key(collection,identity)', function() {
  var tests = [
    {args: [bicycles,'date_sold'],           expected: '0.sales' },
    {args: [bicycles,'date'],                expected: '0.sales.sale_opportunities.0' },
    {args: [bicycles,'silver'],              expected: false },
    {args: [bicycles,{name: "Jane O'Neil"}], expected: undefined }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.locate_Key(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locate_Key(collection,identity,maxDepth)', function() {
  var tests = [
    {args: [bicycles,'date',5], expected: '0.sales.sale_opportunities.0' },
    {args: [bicycles,'date',4], expected: false                          },
    {args: [bicycles,'date',3], expected: false                          }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.locate_Key(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepGet_Key(collection,keyName)', function() {
  var tests = [
    {args: [bicycles,'date'],                expected: 'Dec 19, 2017' },
    {args: [bicycles,'silver'],              expected: undefined      },
    {args: [bicycles,{name: "Jane O'Neil"}], expected: undefined      },
    {args: [bicycles,'type'],                expected: 'racing'       }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.deepGet_Key(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepGet_Key(collection,keyName,maxDepth)', function() {
  var tests = [
    {args: [bicycles,'date',5], expected: 'Dec 19, 2017' },
    {args: [bicycles,'date',4], expected: undefined      },
    {args: [bicycles,'date',3], expected: undefined      }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.deepGet_Key(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locateAll_Key(collection,keyName)', function() {
  var res1 = ['0.sales.sale_opportunities.0','0.sales.sale_opportunities.1','1.sales.sale_opportunities.0','1.sales.sale_opportunities.1'];
  var tests = [
    {args: [bicycles,'date'], expected: res1 },
    {args: [bicycles,'maker'], expected: ['0','1','2','3']  }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.locateAll_Key(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('locateAll_Key(collection,keyName,maxDepth)', function() {
  var res1 = ['0.sales.sale_opportunities.0','0.sales.sale_opportunities.1','1.sales.sale_opportunities.0','1.sales.sale_opportunities.1'];
  var tests = [
    {args: [bicycles,'maker',2], expected: ['0','1','2','3']  },
    {args: [bicycles,'maker',1], expected: false              },
    {args: [bicycles,'date',5],  expected: res1               },
    {args: [bicycles,'date',4],  expected: false              }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.locateAll_Key(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepFilter_Key(collection,keyName)', function() {
  var tests = [
    {args: [bicycles,'date'],   expected: ['Dec 19, 2017','Dec 4, 2017','','']                },
    {args: [bicycles,'maker'],  expected: ['breez TM','hyperwheel','hyperwheel','hyperwheel'] }
  ];
  tests.forEach(function(test) {
    it(opDescription(2,test.args,test.expected), function() {
      var res = mitsuketa.deepFilter_Key(test.args[0],test.args[1]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});

describe('deepFilter_Key(collection,keyName,maxDepth)', function() {
  var res1 = ['0.sales.sale_opportunities.0','0.sales.sale_opportunities.1','1.sales.sale_opportunities.0','1.sales.sale_opportunities.1'];
  var tests = [
    {args: [bicycles,'maker',2], expected: ['breez TM','hyperwheel','hyperwheel','hyperwheel'] },
    {args: [bicycles,'maker',1], expected: undefined                                           },
    {args: [bicycles,'date',5],  expected: ['Dec 19, 2017','Dec 4, 2017','','']                },
    {args: [bicycles,'date',4],  expected: undefined                                           }
  ];
  tests.forEach(function(test) {
    it(opDescription(3,test.args,test.expected), function() {
      var res = mitsuketa.deepFilter_Key(test.args[0],test.args[1],test.args[2]);
      assert.equal(stringify(res), stringify(test.expected));
    });
  });
});
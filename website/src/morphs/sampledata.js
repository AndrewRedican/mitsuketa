const SampleData = {
    bicycles : [
        { 
            unique_id   : 299,
            factory_id  : 'alpha',
            model       : 'br-chrome',
            maker       : 'breez TM',
            year        : '2017',
            type        : 'racing',
            status: { 
                hasOwner : false,
                price    : 345.99
            },
            specs : {
                dimensions: { 
                    length : '1.68m',
                    width  : '13cm',
                    height : '1.02m'
                },
                usability: { 
                    grip         : 5,
                    speed        : 4,
                    accelaration : 8,
                    weight       : '',
                    durability   : 10
                },
                color: 'silver',
                components: [ 
                    'basket',
                    'chain',
                    'handle',
                    'seat'
                ]
            },
            sales: {
                date_arrived   : 'Nov 30, 2017',
                date_showcased : 'Dec 4, 2017',
                date_sold      : false,
                sale_opportunities: [
                    { 
                        name         : 'Donn Reddick',
                        contact_info : '1-987-652-8775',
                        date         : 'Dec 19, 2017'
                    },
                    { 
                        name         : 'Susan Boyle',
                        contact_info : '1-555-101-9875',
                        date         : 'Dec 4, 2017'
                    }
                ]
            }
        },
        { 
            unique_id  : 300,
            factory_id : 'beta',
            model      : 'XV17',
            maker      : 'hyperwheel',
            year       : '2017',
            type       : 'city',
            status: { 
                hasOwner : true,
                price    : 1100
            },
            specs : {
                dimensions: {
                    length: '1.65m',
                    width: '13cm',
                    height: '1.03m'
                },
                usability: {
                    grip         : 5.5,
                    speed        : 3,
                    accelaration : 5,
                    weight       : '',
                    durability   : 6
                },
                color: 'red',
                components: [
                    'basket',
                    'chain',
                    'handle',
                    'seat'
                ]
            },
            sales: {
                date_arrived: 'Nov 13, 2017',
                date_showcased: 'Nov 16, 2017',
                date_sold: false,
                sale_opportunities: [
                    {
                        name         : 'Tom Stark',
                        contact_info : 'N/A',
                        date         : ''
                    },
                    {
                        name         : "Jane O'Neil",
                        contact_info : 'N/A',
                        date         : ''
                    }
                ]
            }
        },
        { 
            unique_id  : 301,
            factory_id : 'gamma',
            model      : 'XV15',
            maker      : 'hyperwheel',
            year       : '2017',
            type       : 'sport',
            status: { 
                hasOwner : true,
                price    : 1800
            },
            specs : {
                dimensions: {
                    length : '1.68m',
                    width  : '13cm',
                    height : '1.02m'
                },
                usability: {
                    grip         : 5,
                    speed        : 4,
                    accelaration : 8,
                    weight       : '',
                    durability   : 10
                },
                color: 'red',
                components: [ 
                    'basket',
                    'chain',
                    'handle',
                    'seat', 
                    'kinetic lights'
                ]
            },
            sales: {
                date_arrived       : 'Nov 28, 2017',
                date_showcased     : 'Nov 29, 2017',
                date_sold          : 'Nov 29, 2017',
                sale_opportunities : []
            }
        },
        { 
            unique_id  : 302,
            factory_id : 'gamma',
            model      : '2019 pro',
            maker      : 'hyperwheel',
            year       : '2018',
            type       : 'racing',
            status: {
                hasOwner : false,
                price    : 1499
            },
            specs : {
                dimensions: { 
                    length : '1.69m',
                    width  : '11cm',
                    height : '0.95m'
                },
                usability: {
                    grip         : 5,
                    speed        : 4,
                    accelaration : 8,
                    weight       : '',
                    durability   : 10
                },
                color: 'pink',
                components: [ 
                    'basket',
                    'chain',
                    'handle',
                    'seat',
                    'reflector lights',
                    'usb charger'
                ]
            },
            sales: {
                date_arrived       : false,
                date_showcased     : false,
                date_sold          : false,
                sale_opportunities : []
            }
        }
      
    ],
    complexObject : {
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
    },
    assessments : {
        nancy_mccarty : {
            A1: {
                userID        : "nancy_mccarty",
                userName      : "Nancy McCarty",
                id            : "A1",
                score         : 0.75,
                date_created  : 151208443563,
                date_signed   : 151208448055,
                date_approved : 151208471190,
                answers       : ['Yes','No','No','Yes','No']
            },
            A2: {
                userID        : "nancy_mccarty",
                userName      : "Nancy McCarty",
                id            : "A2",
                score         : 0.9,
                date_created  : 151208450090,
                date_signed   : false,
                date_approved : false,
                answers       : ['No','No','No','Yes','Yes']
            }
        },
        george_richardson : {
            A2: {
                userID        : "george_richardson",
                userName      : "George Richardson",
                id            : "A2",
                score         : 0.35,
                date_created  : 1512076585058,
                date_signed   : false,
                date_approved : false,
                answers       : ['No','Yes','Yes','Yes','Yes']
            }
        },
        tom_hughe : { 
            A4: {
                userID        : "tom_hughe",
                userName      : "Tom Hughe",
                id            : "A4",
                score         : 0.75,
                date_created  : 1512076575026,
                date_signed   : 1512076609894,
                date_approved : false,
                answers       : ['Yes','No','No','Yes','No']
            },
            M1: {
                userID        : "tom_hughe",
                userName      : "Tom Hughe",
                id            : "M1",
                score         : false,
                date_created  : 1512076587361,
                date_signed   : false,
                date_approved : false,
                answers       : [false,false,false,false,false]
            }
        },
        heidy_white : {
            L2: {
                userID        : "heidy_white",
                userName      : "Heidy White",
                id            : "L2",
                score         : false,
                date_created  : 15120765766312,
                date_signed   : false,
                date_approved : false,
                answers       : [false,false,false,false,false]
            }
        }
    }
};

export default SampleData;
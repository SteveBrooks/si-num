'use strict';
/*jshint node:true, expr:true, mocha:true*/

var expect = require('chai').expect;
var SiNum = require('../lib/siNum');

describe('SiNum', function () {
    var dv = 0.0000000001;
    var siNum = new SiNum();

    var testData = [
        { v: -3.14E24,          m: -3.14,       e: 24, symbol: 'Y', prefix: 'yotta',   formatted: '-3.1Y'},
        { v: -3.14E21,          m: -3.14,       e: 21, symbol: 'Z', prefix: 'zetta',   formatted: '-3.1Z'},
        { v: -3.14E18,          m: -3.14,       e: 18, symbol: 'E', prefix: 'exa',   formatted: '-3.1E'},
        { v: -3.14E15,          m: -3.14,       e: 15, symbol: 'P', prefix: 'peta',   formatted: '-3.1P'},
        { v: -3.14E12,          m: -3.14,       e: 12, symbol: 'T', prefix: 'tera',   formatted: '-3.1T'},
        { v: -524542000000,     m: -524.542,    e:  9, symbol: 'G', prefix: 'giga',   formatted: '-524G' },
        { v: -52454200000,      m: -52.4542,    e:  9, symbol: 'G', prefix: 'giga',   formatted: '-52G'  },
        { v: -5245420000,       m: -5.24542,    e:  9, symbol: 'G', prefix: 'giga',   formatted: '-5.2G' },
        { v: -1000000000,       m: -1,          e:  9, symbol: 'G', prefix: 'giga',   formatted: '-1G'   },
        { v: -524542000,        m: -524.542,    e:  6, symbol: 'M', prefix: 'mega',   formatted: '-524M' },
        { v: -100000000,        m: -100,        e:  6, symbol: 'M', prefix: 'mega',   formatted: '-100M' },
        { v: -52454200,         m: -52.4542,    e:  6, symbol: 'M', prefix: 'mega',   formatted: '-52M'  },
        { v: -10000000,         m: -10,         e:  6, symbol: 'M', prefix: 'mega',   formatted: '-10M'  },
        { v: -5245420,          m: -5.24542,    e:  6, symbol: 'M', prefix: 'mega',   formatted: '-5.2M' },
        { v: -1000000,          m: -1,          e:  6, symbol: 'M', prefix: 'mega',   formatted: '-1M'   },
        { v: -524542,           m: -524.542,    e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-524K' },
        { v: -100000,           m: -100,        e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-100K' },
        { v: -52454.2,          m: -52.4542,    e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-52K'  },
        { v: -10000,            m: -10,         e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-10K'  },
        { v: -5245.42,          m: -5.24542,    e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-5.2K' },
        { v: -1000,             m: -1,          e:  3, symbol: 'K', prefix: 'kilo',   formatted: '-1K'   },
        { v: -100,              m: -100,        e:  0, symbol: '',  prefix: '',       formatted: '-100'  },
        { v: -10,               m: -10,         e:  0, symbol: '',  prefix: '',       formatted: '-10'   },
        { v: -1,                m: -1,          e:  0, symbol: '',  prefix: '',       formatted: '-1'    },
        { v: -0.1,              m: -100,        e: -3, symbol: 'm', prefix: 'milli',  formatted: '-100m' },
        { v: -0.01,             m: -10,         e: -3, symbol: 'm', prefix: 'milli',  formatted: '-10m'  },
        { v: -0.001,            m: -1,          e: -3, symbol: 'm', prefix: 'milli',  formatted: '-1m'   },
        { v: -0.0001,           m: -100,        e: -6, symbol: 'u', prefix: 'micro',  formatted: '-100u' },
        { v: -0.00001,          m: -10,         e: -6, symbol: 'u', prefix: 'micro',  formatted: '-10u'  },
        { v: -0.000005322161,   m: -5.322161,   e: -6, symbol: 'u', prefix: 'micro',  formatted: '-5.3u' },
        { v: -0.000001,         m: -1,          e: -6, symbol: 'u', prefix: 'micro',  formatted: '-1u'   },
        { v: -1E-7,             m: -100,        e: -9, symbol: 'n', prefix: 'nano',  formatted: '-100n' },
        { v: -1E-8,             m: -10,         e: -9, symbol: 'n', prefix: 'nano',   formatted: '-10n'  },
        { v: -1E-9,             m: -1,          e: -9, symbol: 'n', prefix: 'nano',   formatted: '-1n'   },
        { v: 0,                 m: 0,           e:  0, symbol: '',  prefix: '',       formatted: '0'     },
        { v: 1E-9,              m: 1,           e: -9, symbol: 'n', prefix: 'nano',   formatted: '1n'    },
        { v: 1E-8,              m: 10,          e: -9, symbol: 'n', prefix: 'nano',   formatted: '10n'   },
        { v: 1E-7,              m: 100,         e: -9, symbol: 'n', prefix: 'nano',   formatted: '100n'  },
        { v: 0.000001,          m: 1,           e: -6, symbol: 'u', prefix: 'micro',  formatted: '1u'    },
        { v: 0.000005322161,    m: 5.322161,    e: -6, symbol: 'u', prefix: 'micro',  formatted: '5.32u' },
        { v: 0.00001,           m: 10,          e: -6, symbol: 'u', prefix: 'micro',  formatted: '10u'   },
        { v: 0.0001,            m: 100,         e: -6, symbol: 'u', prefix: 'micro',  formatted: '100u'  },
        { v: 0.001,             m: 1,           e: -3, symbol: 'm', prefix: 'milli',  formatted: '1m'    },
        { v: 0.01,              m: 10,          e: -3, symbol: 'm', prefix: 'milli',  formatted: '10m'   },
        { v: 0.1,               m: 100,         e: -3, symbol: 'm', prefix: 'milli',  formatted: '100m'  },
        { v: 1,                 m: 1,           e:  0, symbol: '',  prefix: '',       formatted: '1'     },
        { v: 10,                m: 10,          e:  0, symbol: '',  prefix: '',       formatted: '10'    },
        { v: 100,               m: 100,         e:  0, symbol: '',  prefix: '',       formatted: '100'   },
        { v: 1000,              m: 1,           e:  3, symbol: 'K', prefix: 'kilo',   formatted: '1K'    },
        { v: 5245.42,           m: 5.24542,     e:  3, symbol: 'K', prefix: 'kilo',   formatted: '5.24K' },
        { v: 10000,             m: 10,          e:  3, symbol: 'K', prefix: 'kilo',   formatted: '10K'   },
        { v: 52454.2,           m: 52.4542,     e:  3, symbol: 'K', prefix: 'kilo',   formatted: '52.4K' },
        { v: 100000,            m: 100,         e:  3, symbol: 'K', prefix: 'kilo',   formatted: '100K'  },
        { v: 524542,            m: 524.542,     e:  3, symbol: 'K', prefix: 'kilo',   formatted: '524K'  },
        { v: 1000000,           m: 1,           e:  6, symbol: 'M', prefix: 'mega',   formatted: '1M'    },
        { v: 5245420,           m: 5.24542,     e:  6, symbol: 'M', prefix: 'mega',   formatted: '5.24M' },
        { v: 10000000,          m: 10,          e:  6, symbol: 'M', prefix: 'mega',   formatted: '10M'   },
        { v: 52454200,          m: 52.4542,     e:  6, symbol: 'M', prefix: 'mega',   formatted: '52.4M' },
        { v: 100000000,         m: 100,         e:  6, symbol: 'M', prefix: 'mega',   formatted: '100M'  },
        { v: 524542000,         m: 524.542,     e:  6, symbol: 'M', prefix: 'mega',   formatted: '524M'  },
        { v: 1000000000,        m: 1,           e:  9, symbol: 'G', prefix: 'giga',   formatted: '1G'    },
        { v: 5245420000,        m: 5.24542,     e:  9, symbol: 'G', prefix: 'giga',   formatted: '5.24G' },
        { v: 52454200000,       m: 52.4542,     e:  9, symbol: 'G', prefix: 'giga',   formatted: '52.4G' },
        { v: 524542000000,      m: 524.542,     e:  9, symbol: 'G', prefix: 'giga',   formatted: '524G'  },
        { v: 3.14E12,           m: 3.14,        e: 12, symbol: 'T', prefix: 'tera',   formatted: '3.14T' },
        { v: 3.14E15,           m: 3.14,        e: 15, symbol: 'P', prefix: 'peta',   formatted: '3.14P' },
        { v: 3.14E18,           m: 3.14,        e: 18, symbol: 'E', prefix: 'exa',    formatted: '3.14E' },
        { v: 3.14E21,           m: 3.14,        e: 21, symbol: 'Z', prefix: 'zetta',  formatted: '3.14Z' },
        { v: 3.14E24,           m: 3.14,        e: 24, symbol: 'Y', prefix: 'yotta',  formatted: '3.14Y' },
    ];

    testData.forEach(function(test) {
        var result;

        before(function() {
            result = siNum.normalize(test.v);
        });

        describe('Test ' + test.v + ' shoud equal ' + test.expected, function () {

            it('should have the correct normalized mantissa: ' + test.m, function () {
                expect(result.mantissa).to.be.within(test.m-dv, test.m+dv);
            });

            it('should have the corred normalized exponent: ' + test.e, function () {
                expect(result.exponent).to.be.eql(test.e);
            });

            it('should have the correct SI symbol:' + test.si, function () {
                expect(result.symbol).to.be.eql(test.symbol);
            });

            it('should have the correct SI prefix:' + test.si, function () {
                expect(result.prefix).to.be.eql(test.prefix);
            });

            it('should have the correct expected formatted value: ' + test.formatted, function () {
                expect(result.formatted).to.be.eql(test.formatted);
            });
        });
    });
});

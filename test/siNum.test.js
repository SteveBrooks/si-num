'use strict';
/*jshint node:true, expr:true, mocha:true*/

var expect = require('chai').expect;
var SiNum = require('../lib/siNum');

describe('SiNum', function () {
    var dv = 0.0000000001;
    var siNum = new SiNum();

    var testData = [
        { v: -524542000000,     m: -524.542,    e:  9,  si: 'G',    expected: '-524G' },
        { v: -52454200000,      m: -52.4542,    e:  9,  si: 'G',    expected: '-52G' },
        { v: -5245420000,       m: -5.24542,    e:  9,  si: 'G',    expected: '-5.2G' },
        { v: -1000000000,       m: -1,          e:  9,  si: 'G',    expected: '-1G' },
        { v: -524542000,        m: -524.542,    e:  6,  si: 'M',    expected: '-524M' },
        { v: -100000000,        m: -100,        e:  6,  si: 'M',    expected: '-100M' },
        { v: -52454200,         m: -52.4542,    e:  6,  si: 'M',    expected: '-52M' },
        { v: -10000000,         m: -10,         e:  6,  si: 'M',    expected: '-10M' },
        { v: -5245420,          m: -5.24542,    e:  6,  si: 'M',    expected: '-5.2M' },
        { v: -1000000,          m: -1,          e:  6,  si: 'M',    expected: '-1M' },
        { v: -524542,           m: -524.542,    e:  3,  si: 'K',    expected: '-524K' },
        { v: -100000,           m: -100,        e:  3,  si: 'K',    expected: '-100K' },
        { v: -52454.2,          m: -52.4542,    e:  3,  si: 'K',    expected: '-52K' },
        { v: -10000,            m: -10,         e:  3,  si: 'K',    expected: '-10K' },
        { v: -5245.42,          m: -5.24542,    e:  3,  si: 'K',    expected: '-5.2K' },
        { v: -1000,             m: -1,          e:  3,  si: 'K',    expected: '-1K' },
        { v: -100,              m: -100,        e:  0,  si: '',     expected: '-100' },
        { v: -10,               m: -10,         e:  0,  si: '',     expected: '-10' },
        { v: -1,                m: -1,          e:  0,  si: '',     expected: '-1' },
        { v: -0.1,              m: -100,        e: -3,  si: 'm',    expected: '-100m' },
        { v: -0.01,             m: -10,         e: -3,  si: 'm',    expected: '-10m' },
        { v: -0.001,            m: -1,          e: -3,  si: 'm',    expected: '-1m' },
        { v: -0.0001,           m: -100,        e: -6,  si: 'u',    expected: '-100u' },
        { v: -0.00001,          m: -10,         e: -6,  si: 'u',    expected: '-10u' },
        { v: -0.000005322161,   m: -5.322161,   e: -6,  si: 'u',    expected: '-5.3u' },
        { v: -0.000001,         m: -1,          e: -6,  si: 'u',    expected: '-1u' },
        { v: -1E-7,             m: -100,        e: -9,  si: 'n',    expected: '-100n' },
        { v: -1E-8,             m: -10,         e: -9,  si: 'n',    expected: '-10n' },
        { v: -1E-9,             m: -1,          e: -9,  si: 'n',    expected: '-1n' },
        { v: 0,                 m: 0,           e:  0,  si: '',     expected: '0' },
        { v: 1E-9,              m: 1,           e: -9,  si: 'n',    expected: '1n' },
        { v: 1E-8,              m: 10,          e: -9,  si: 'n',    expected: '10n' },
        { v: 1E-7,              m: 100,         e: -9,  si: 'n',    expected: '100n' },
        { v: 0.000001,          m: 1,           e: -6,  si: 'u',    expected: '1u' },
        { v: 0.000005322161,    m: 5.322161,    e: -6,  si: 'u',    expected: '5.32u' },
        { v: 0.00001,           m: 10,          e: -6,  si: 'u',    expected: '10u' },
        { v: 0.0001,            m: 100,         e: -6,  si: 'u',    expected: '100u' },
        { v: 0.001,             m: 1,           e: -3,  si: 'm',    expected: '1m' },
        { v: 0.01,              m: 10,          e: -3,  si: 'm',    expected: '10m' },
        { v: 0.1,               m: 100,         e: -3,  si: 'm',    expected: '100m' },
        { v: 1,                 m: 1,           e:  0,  si: '',     expected: '1' },
        { v: 10,                m: 10,          e:  0,  si: '',     expected: '10' },
        { v: 100,               m: 100,         e:  0,  si: '',     expected: '100' },
        { v: 1000,              m: 1,           e:  3,  si: 'K',    expected: '1K' },
        { v: 5245.42,           m: 5.24542,     e:  3,  si: 'K',    expected: '5.24K' },
        { v: 10000,             m: 10,          e:  3,  si: 'K',    expected: '10K' },
        { v: 52454.2,           m: 52.4542,     e:  3,  si: 'K',    expected: '52.4K' },
        { v: 100000,            m: 100,         e:  3,  si: 'K',    expected: '100K' },
        { v: 524542,            m: 524.542,     e:  3,  si: 'K',    expected: '524K' },
        { v: 1000000,           m: 1,           e:  6,  si: 'M',    expected: '1M' },
        { v: 5245420,           m: 5.24542,     e:  6,  si: 'M',    expected: '5.24M' },
        { v: 10000000,          m: 10,          e:  6,  si: 'M',    expected: '10M' },
        { v: 52454200,          m: 52.4542,     e:  6,  si: 'M',    expected: '52.4M' },
        { v: 100000000,         m: 100,         e:  6,  si: 'M',    expected: '100M' },
        { v: 524542000,         m: 524.542,     e:  6,  si: 'M',    expected: '524M' },
        { v: 1000000000,        m: 1,           e:  9,  si: 'G',    expected: '1G' },
        { v: 5245420000,        m: 5.24542,     e:  9,  si: 'G',    expected: '5.24G' },
        { v: 52454200000,       m: 52.4542,     e:  9,  si: 'G',    expected: '52.4G' },
        { v: 524542000000,      m: 524.542,     e:  9,  si: 'G',    expected: '524G' }
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

            it('should have the correct SI prefix:' + test.si, function () {
                expect(result.si).to.be.eql(test.si);
            });

            it('should have the correct expected formatted value: ' + test.expected, function () {
                expect(result.fmt).to.be.eql(test.expected);
            });
        });
    });
});

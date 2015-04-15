// Created by sbrooks on 4/14/15.
'use strict';

var expect = require('chai').expect;
var async = require('async');

var SiNum = require('../lib/siNum');

describe('siNum', function () {

    var dv = 0.0000000001;

    var siNum = new SiNum();

    var testData = [

        { v: -524.542E9,        m: -524.542,    e: 9,   si: 'G' },
        { v: -52.4542E9,        m: -52.4542,    e: 9,   si: 'G' },
        { v: -5.24542E9,        m: -5.24542,    e: 9,   si: 'G' },
        { v: -1E9,              m: -1,          e: 9,   si: 'G' },
        { v: -0.524542E9,       m: -524.542,    e: 6,   si: 'M' },
        { v: -1E8,              m: -100,        e: 6,   si: 'M' },
        { v: -0.0524542E9,      m: -52.4542,    e: 6,   si: 'M' },
        { v: -1E7,              m: -10,         e: 6,   si: 'M' },
        { v: -0.00524542E9,     m: -5.24542,    e: 6,   si: 'M' },
        { v: -1E6,              m: -1,          e: 6,   si: 'M' },
        { v: -0.000524542E9,    m: -524.542,    e: 3,   si: 'K' },
        { v: -1E5,              m: -100,        e: 3,   si: 'K' },
        { v: -0.0000524542E9,   m: -52.4542,    e: 3,   si: 'K' },
        { v: -1E4,              m: -10,         e: 3,   si: 'K' },
        { v: -0.00000524542E9,  m: -5.24542,    e: 3,   si: 'K' },
        { v: -1E3,              m: -1,          e: 3,   si: 'K' },
        { v: -1E2,              m: -100,        e: 0,   si: '' },
        { v: -1E1,              m: -10,         e: 0,   si: '' },
        { v: -1,                m: -1,          e: 0,   si: '' },
        { v: 0,                 m: 0,           e: 0,   si: '' },
        { v: -0.1,              m: -100,        e: -3,  si: 'm' },
        { v: -0.01,             m: -10,         e: -3,  si: 'm' },
        { v: -0.001,            m: -1,          e: -3,  si: 'm' },
        { v: -0.0001,           m: -100,        e: -6,  si: 'u' },
        { v: -0.00001,          m: -10,         e: -6,  si: 'u' },
        { v: -0.000005322161,   m: -5.322161,   e: -6,  si: 'u' },
        { v: -0.000001,         m: -1,          e: -6,  si: 'u' },
        { v: -0.0000001,        m: -100,        e: -9,  si: 'n' },
        { v: -0.00000001,       m: -10,         e: -9,  si: 'n' },
        { v: -0.000000001,      m: -1,          e: -9,  si: 'n' },

        { v: 0.000000001,       m: 1,           e: -9,  si: 'n' },
        { v: 0.00000001,        m: 10,          e: -9,  si: 'n' },
        { v: 0.0000001,         m: 100,         e: -9,  si: 'n' },
        { v: 0.000001,          m: 1,           e: -6,  si: 'u' },
        { v: 0.000005322161,    m: 5.322161,    e: -6,  si: 'u' },
        { v: 0.00001,           m: 10,          e: -6,  si: 'u' },
        { v: 0.0001,            m: 100,         e: -6,  si: 'u' },
        { v: 0.001,             m: 1,           e: -3,  si: 'm' },
        { v: 0.01,              m: 10,          e: -3,  si: 'm' },
        { v: 0.1,               m: 100,         e: -3,  si: 'm' },

        { v: 1,                 m: 1,           e: 0,   si: '' },
        { v: 1E1,               m: 10,          e: 0,   si: '' },
        { v: 1E2,               m: 100,         e: 0,   si: '' },
        { v: 1E3,               m: 1,           e: 3,   si: 'K' },
        { v: 0.00000524542E9,   m: 5.24542,     e: 3,   si: 'K' },
        { v: 1E4,               m: 10,          e: 3,   si: 'K' },
        { v: 0.0000524542E9,    m: 52.4542,     e: 3,   si: 'K' },
        { v: 1E5,               m: 100,         e: 3,   si: 'K' },
        { v: 0.000524542E9,     m: 524.542,     e: 3,   si: 'K' },
        { v: 1E6,               m: 1,           e: 6,   si: 'M' },
        { v: 0.00524542E9,      m: 5.24542,     e: 6,   si: 'M' },
        { v: 1E7,               m: 10,          e: 6,   si: 'M' },
        { v: 0.0524542E9,       m: 52.4542,     e: 6,   si: 'M' },
        { v: 1E8,               m: 100,         e: 6,   si: 'M' },
        { v: 0.524542E9,        m: 524.542,     e: 6,   si: 'M' },
        { v: 1E9,               m: 1,           e: 9,   si: 'G' },
        { v: 5.24542E9,         m: 5.24542,     e: 9,   si: 'G' },
        { v: 52.4542E9,         m: 52.4542,     e: 9,   si: 'G' },
        { v: 524.542E9,         m: 524.542,     e: 9,   si: 'G' },

    ];


    async.each(testData, function(test, callback) {

        describe('Test ' + test.v, function () {

            var result = siNum.normalize(test.v);
            console.log(siNum.format(test.v));

            it('should normalize mantissa', function () {
                expect(result.mantissa).to.be.within(test.m-dv, test.m+dv);
            });

            it('should normalize exponent', function () {
                expect(result.exponent).to.be.eql(test.e);
            });

            it('should have the correct SI prefix', function () {
                expect(result.si).to.be.eql(test.si);
            });
        });

        callback();
    });

});
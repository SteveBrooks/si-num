// Created by sbrooks on 4/14/15.
'use strict';

function toSi(exponent) {
    switch(exponent) {
        case -9: return 'n';
        case -6: return 'u';
        case -3: return 'm';
        case 3: return 'K';
        case 6: return 'M';
        case 9: return 'G';
        default: return '';
    }
}

var SiNum = function SiNum() {
    var self = this;

    self._digits = 3;
};

SiNum.prototype = {
    get type() {
        return 'SiNum';
    },
    get digits() {
        return self._digits;
    },
    set digits(n) {
        self._digits = n;
    }
};

SiNum.prototype.format = function format(val) {
    var self = this;
    var norm = self.normalize(val);

    var len = self._digits;
    var mantissa = '' + norm.mantissa;
    if(mantissa.search('.') >= 0) {
        len++;
    }

    mantissa = mantissa.slice(0,len);

    if(mantissa.length < len) {
    }

    return '' + mantissa + norm.si;
};

SiNum.prototype.normalize = function normalize(val) {
    var self = this;

    function log10(val) {
        return Math.log(val) / Math.LN10;
    }

    function exponent(v) {
        if(v !== 0) {
            return Math.round(log10(Math.abs(v)));
        }
        return 0;
    }

    function siExponent(e) {
        return Math.floor(e / 3);
    }

    var power = exponent(val);
    var siPower = siExponent(power);

    var mantissa = val / Math.pow(10, power);

    var mantissaShift = (power % 3);

    if (siPower < 0) {
        if(mantissaShift !== 0) {
            mantissa *= Math.pow(10, 3 - Math.abs(mantissaShift));
        }
    }else {
        mantissa *= Math.pow(10, Math.abs(mantissaShift));
    }

    // Special Case: Convert 0.123EN to 123E(N-3)
    if((Math.abs(mantissa) > 0) && (Math.abs(mantissa) < 1)) {
        siPower--;
        mantissa *= Math.pow(10, 3)
    }

    return { mantissa: mantissa, exponent: (3*siPower), si: toSi(3*siPower) };
};

module.exports = SiNum;

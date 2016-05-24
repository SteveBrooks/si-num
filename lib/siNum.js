/*jshint node:true, expr:true*/
'use strict';

function toSi(exponent) {
    switch(exponent) {
        case -24: return 'y';
        case -21: return 'z';
        case -18: return 'a';
        case -15: return 'f';
        case -12: return 'p';
        case -9: return 'n';
        case -6: return 'u';
        case -3: return 'm';
        case 3: return 'K';
        case 6: return 'M';
        case 9: return 'G';
        case 12: return 'T';
        case 15: return 'P';
        case 18: return 'E';
        case 21: return 'Z';
        case 24: return 'Y';
        default: return '';
    }
}

var SiNum = function SiNum() {

    var normalize = function normalize(val) {
        var power = exponent(val);
        var siPower = siExponent(power);
        var mantissa = val / Math.pow(10, power);
        var mantissaShift = (power % 3);
        var result = {};

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

        function format() {
            var len = 3;
            var mantissa = '' + result.mantissa;
            if(mantissa.search('.') >= 0) {
                len++;
            }

            mantissa = mantissa.slice(0,len);

            if(mantissa[mantissa.length-1] === '.') {
                mantissa = mantissa.slice(0,-1);
            }
            return '' + mantissa + result.si;
        }

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
            mantissa *= Math.pow(10, 3);
        }

        result.mantissa = mantissa;
        result.exponent = (3*siPower); 
        result.si = toSi(3*siPower);
        result.fmt = format();
        return result;
    };

    return {
        normalize: normalize
    };
};

module.exports = SiNum;


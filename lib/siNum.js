/*jshint node:true, expr:true*/
'use strict';

function toSi(exponent) {
    switch(exponent) {
        case -24: return { symbol: 'y', prefix: 'yocto' };
        case -21: return { symbol: 'z', prefix: 'zepto' };
        case -18: return { symbol: 'a', prefix: 'atto' };
        case -15: return { symbol: 'f', prefix: 'femto' };
        case -12: return { symbol: 'p', prefix: 'pico' };
        case  -9: return { symbol: 'n', prefix: 'nano' };
        case  -6: return { symbol: 'u', prefix: 'micro' };
        case  -3: return { symbol: 'm', prefix: 'milli' };
        case   3: return { symbol: 'K', prefix: 'kilo' };
        case   6: return { symbol: 'M', prefix: 'mega' };
        case   9: return { symbol: 'G', prefix: 'giga' };
        case  12: return { symbol: 'T', prefix: 'tera' };
        case  15: return { symbol: 'P', prefix: 'peta' };
        case  18: return { symbol: 'E', prefix: 'exa' };
        case  21: return { symbol: 'Z', prefix: 'zetta' };
        case  24: return { symbol: 'Y', prefix: 'yotta' };
        default: return  { symbol: '' , prefix: '' };
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
            return '' + mantissa + result.symbol;
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
        result.symbol = toSi(3*siPower).symbol;
        result.prefix = toSi(3*siPower).prefix;
        result.formatted = format();
        return result;
    };

    return {
        normalize: normalize
    };
};

module.exports = SiNum;


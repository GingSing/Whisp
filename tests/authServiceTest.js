const chai = require('chai');
const assert = require('assert');

describe('Basic Mocha String Test', function (){
    it('should return number of characters in a string', function(){
        assert.equal("hello".length, 4);
    });
    it('should return first character of the string', function() {
        assert.equal("Hello".charAt(0), 'H');
    });
});
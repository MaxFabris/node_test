var assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

var globalObj;

function fixedValue ()  {
    return 10;
}

function copy (obj)  {
    globalObj = {};

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) globalObj[prop] = obj[prop];
    }
    return obj;
}

function asyncFn (cb) {
    process.nextTick(function () {
        cb();
    })
}

describe('Make some testing test', function () {

    xdescribe(' Come utente voglio vedere i miei dati', function () {

        it('should give some date to the user', function () {
                // assert.equal(10, 10);
                assert.equal(process.env.NODE_ENV, 'testing');
                expect(process.env.NODE_ENV).to.equal('testing');
                process.env.NODE_ENV.should.equal('testing');
            });

        it('should return a fixed value', function () {
            var result = fixedValue();

            result.should.be.not.null;
            result.should.be.a('number');
            result.should.equal(10);
        });

        it('should make a copy of a given object', function () {
            var obj = copy({name: 'Max'});

            obj.should.be.not.null;
            obj.should.be.an('object');
            obj.should.have.property('name', 'Max');

            globalObj.should.be.not.null;
            globalObj.should.be.an('object');
            globalObj.should.have.property('name', 'Max');

            obj.should.deep.equal(globalObj);
        });

    });

    describe('Testing async code', function () {
        it('should call the callback', function () {
            asyncFn(function (result) {
                result.should.defined;
            });
        });

    });
});


var assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

function fixedValue(){
    return 10;
}

function copy (obj) {
    globalObj = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) globalObj[prop]= obj[prop];
    }
    return obj;
}


function asyncFn(cb) {
    setTimeout
    (function () {
        cb('');
    },2000    );

}


var globalObj;
var globalVar,globalAfterVar;

before(function () {
    globalVar = 10;
    //globalAfterVar = 10;
});
beforeEach(function () {
    globalVar = 10;
});
after(function () {

});
afterEach(function () {
    // globalAfterVar = 'luca';
});

xdescribe('make testing', function (){

    this.timeout(5000);

    describe('TEstinf before before eac afeter after each', function (){
        it ('should define a global variable', function () {
            globalVar.should.be.a('number');
            globalVar = 20;


        })
        it ('should define a global variable with value 10', function () {
            globalVar.should.be.a('number');
            globalVar.should.equal(10);

        })

        it ('should define a global variable with a string', function () {
            //globalAfterVar.should.be.a('string');
            expect(globalAfterVar).to.be.undefined;

        })

    });
    describe('test async code', function (){
        it ('should call back', function (done) {

            asyncFn(function (result){
                result.should.defined;
                done();
            })
        })
    });

    describe('Come utente voglio vedere i miei dati', function (){
        it('should give some data to the user',function (){
            assert.equal(process.env.NODE_ENV,'testing');
            expect(process.env.NODE_ENV).to.equal('testing');

            process.env.NODE_ENV.should.equal('testing');
        });

        it('should return a fixed value', function (){
            var result = fixedValue();
            result.should.be.not.null;
            result.should.be.a('number');
            result.should.equal(10);

        });
        it('should make a copy of a given object', function (){
            var obj = copy({name: 'luca'});
            obj.should.be.not.null;
            obj.should.be.an('object');
            obj.should.have.property('name','luca');

            globalObj.should.be.not.null;
            globalObj.should.be.an('object');
            globalObj.should.have.property('name','luca');

            obj.should.deep.equal(globalObj);

        } )
    });

});

var chai = require('chai'),
    Person = require('../person');


chai.should();

describe('Module testing', function (){
    describe('Testing our module',function(){
        it('should be a Person', function () {
            var person = new Person ();
            person.should.be.instanceOf(Person);
        });
    });
});
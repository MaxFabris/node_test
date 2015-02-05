var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    fs = require('fs'),
    rewire = require('rewire'),
    Person = rewire('../person');

Person.__set__('os', {
    cpus: function () {
        return [1,2,3,4,5,6,7,8,9,10];
    }
});

var person;

chai.should();

beforeEach(function () {
    person = new Person('Max');
});

after(function (done) {
    if (!fs.existsSync('/tmp/test.json'))  done();
    fs.unlink('/tmp/test.json', done);
});

describe('Module testing', function () {

    this.timeout(8000);

    describe('Testing our module',function(){
        it('should be a Person', function () {
            person.should.be.instanceOf(Person);
        });

        it('should return the person name', function () {
            person.hello().should.be.equal('Hello, I\'m Max');
        });

        it('should throw an error', function (done) {
            person.study(function (err) {
                err.should.be.instanceOf(Error);
                err.toString().should.equal('Error: never');
                done();
            });
        });
    });

    describe('Testing fs module',function() {
        it('should be write a file', function (done) {
            fs.writeFile('/tmp/test.json', JSON.stringify({test: 'test'}), function (err) {
                expect(err).to.be.null;

                fs.readFile('/tmp/test.json', function (err, buf) {
                    expect(err).to.be.null;

                    var test = JSON.parse(buf.toString());
                    test.should.be.not.null;
                    test.should.have.property('test', 'test');
                    test.should.deep.equal({test: 'test'});

                    done();
                });
            });
        });

        it('should return a value', function () {
            var stub = sinon.stub();

            stub.withArgs('the meaning of the life').returns(42);

            function caller(cb) {
                return cb('the meaning of the life');
            }

            caller(stub).should.equal(42);
        });

        it('should return 10', function () {
            person.getCpus().should.equal(10);
        });

    });
});
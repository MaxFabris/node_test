var assert = require('assert');

describe(' Come utente voglio vedere i miei dati', function () {
    it('should give some date to the user', function () {
            // assert.equal(10, 10);
            assert.equal(process.env.NODE_ENV, 'testing');
        });
});
var sys = require('sys')
var djtesto = require('..')

var tests = {
    pass: function(test) {
        test.pass()
    },
    expectOK: function(test) {
        var callback = test.expectOK(function(err) {
            if (err) {
                test.fail(new Error('Got error'))
            } else {
                test.pass()
            }
        })
        callback(null)
    },
    expectError: function(test) {
        var callback = test.expectError(function(err) {
            if (err) {
                test.pass()
            } else {
                test.fail(new Error("Didn't get error"))
            }
        })
        callback(new Error('test'))
    },
    failingTest: function(test) {
        var tests = {
            doomed: function(innerSelf) {
                innerSelf.fail(new Error('doomed'))
            }
        }
        djtesto.runTests(tests, test.expectError(function() {
            test.pass()
        }), false)
    },
    passingTest: function(test) {
        var tests = {
            ok: function(innerSelf) {
                innerSelf.pass()
            }
        }
        djtesto.runTests(tests, test.expectOK(function(err) {
            test.pass()
        }), false)
    },
    assertTrue: function(test) {
        var tests = {
            ok: function(innerSelf) {
                innerSelf.assert(true)
                innerSelf.pass()
            }
        }
        djtesto.runTests(tests, test.expectOK(function(err) {
            test.pass()
        }), false)
    },
    assertFalse: function(test) {
        var tests = {
            doomed: function(innerSelf) {
                innerSelf.assert(false)
                innerSelf.pass()
            }
        }
        djtesto.runTests(tests, test.expectError(function(err) {
            test.pass()
        }), false)
    },
}

sys.puts('Running tests')

djtesto.runTests(tests, function(err) {
    if (err) {
        sys.puts('Tests failed')
    } else {
        sys.puts('Tests succeeded')
    }
})

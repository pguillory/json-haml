Testing framework.  (Yeah, another one.)  It does very little.

    var tests = {
      allsWell: function(test) {
        // ...do some stuff...
        test.pass()
      },
      catsAndDogsTogether: function(test) {
        test.assert(1 == 0)  // generates error
        test.pass()  // still fails due to failed assertion above
      },
    }
    
    jqueue.runTests(tests, function(err) {
      if (err) throw err
      // done!
    })

See [jqueue] [1] for a real world example.  In particular, it shows wrapping each test to run with a fresh database.

  [1]: https://github.com/pguillory/jqueue/blob/master/test/backend.js

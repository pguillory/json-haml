var sys = require('sys')
var child_process = require('child_process')
var fs = require('fs')

exports.runTests = function(tests, callback, verbose) {
    if (verbose === undefined) verbose = true

    var runningTestCount = 0
    var ranTestCount = 0
    var failed = false

    var start = function() {
        runningTestCount += 1
    }
    
    var end = function() {
        runningTestCount -= 1

        if (runningTestCount < 0) {
            throw new Error('runningTestCount went negative')
        }

        if (runningTestCount == 0) {
            sys.puts('')
            runAnotherTest()
        }
    }

    var pass = function() {
        end()
    }

    var fail = function(err) {
        failed = true

        if (verbose) {
            sys.puts('')
            sys.puts('*** FAIL ***')
            sys.puts(err.stack)
            sys.puts('')
        }

        end()
    }
    
    var assert = function(expression) {
        //start()
        if (expression) {
            //pass()
        } else {
            throw new Error('Assertion failed')
            //fail(new Error('Assertion failed'))
        }
    }

    var matches = function(a, b) {
        if (!matches2(a, b) || !matches2(b, a)) {
            sys.puts('A: ' + sys.inspect(a))
            sys.puts('B: ' + sys.inspect(b))
            fail(new Error('Values do not match'))
        }
    }

    var runAnotherTest = function () {
        if (failed) {
            callback(new Error('A test failed, stopping test sequence'))
            return
        }
        for (var name in tests) {
            ranTestCount += 1

            testToRun = tests[name]
            if (typeof testToRun !== 'function') {
                throw new Error('Test should be a function, got ' + typeof testToRun)
            }
            delete tests[name]

            if (verbose) {
                sys.puts('Test: ' + name)
            }

            start()
            testToRun({
                start: start,
                pass: pass,
                fail: fail,
                assert: assert,
                matches: matches,
            })
            return
        }

        if (verbose) {
            sys.puts(ranTestCount + ' tests complete')
        }

        callback(null)
    }

    runAnotherTest()
}

exports.runRedisServer = function(port, callback) {
    var redisProcess = runBackend(['redis-server', '-'])

    redisProcess.stdin.write("port " + port + "\n")
    redisProcess.stdin.write("bind 127.0.0.1\n")
    redisProcess.stdin.write("loglevel debug\n")
    redisProcess.stdin.write("logfile stdout\n")
    redisProcess.stdin.end()
    
    redisProcess.stdout.addListener('data', function(data) {
        //sys.puts('* ' + data)
    })
    
    setTimeout(function() {
        return callback(null, redisProcess)
    }, 100)
}

function runBackend(args) {
    var stdout = fs.createWriteStream(args[0] + '.out', {
        flags: 'w',
        encoding: 'UTF-8',
        mode: 0666
    })

    var backend = child_process.spawn(args[0], args.slice(1))

    ;(function() {
        var callback
        callback = function (err) {
            process.removeListener('uncaughtException', callback)
            if (backend) {
                backend.kill()
                backend = null

                process.nextTick(function() {
                    throw err
                })
            }
        }
        process.addListener('uncaughtException', callback)
    })()

    backend.stdout.addListener('data', function (data) {
        stdout.write(data)
    })
    backend.stderr.addListener('data', function (data) {
        stdout.write('* ' + data)
    })
    backend.addListener('exit', function (code, signal) {
        sys.puts('** Backend exit: code ' + code + ',  signal ' + signal + "\n")
        process.exit(code)
    })
    process.addListener('exit', function (code, signal) {
        if (backend && backend.pid) {
            backend.kill()
            backend = null
        }
    })

    return backend
}

function matches2(a, b) {
    switch (typeof a) {
        case 'object':
            for (var i in a) {
                if (!matches2(a[i], b[i])) return false
            }
            return true
        default:
            return (a == b)
    }
}

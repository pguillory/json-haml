require.paths.unshift(__dirname + '/../..')

var sys = require('sys')
var djtesto = require('djtesto')
var haml = require('..')

var tests = {}

var inputs = {
    '""': '',
    '"a"': 'a',
    '[]': '',
    '["a"]': 'a',
    '["%b"]': '<b/>',
    '["%b", ""]': '<b></b>',
    '["%b", "asdf"]': '<b>asdf</b>',
    '["%div", {"class":"foo"}]': '<div class="foo"/>',
    '["%div", {"class":"foo", "style":"bar"}]': '<div class="foo" style="bar"/>',
    '["%div", ["%span"]]': '<div><span/></div>',
    '["%div", "before", ["%span", "during"], "after"]': '<div>before<span>during</span>after</div>',
    '["before", ["%span", "during"], "after"]': 'before<span>during</span>after',
    '[".foo"]': '<div class="foo"/>',
    '["#foo"]': '<div id="foo"/>',
    '["%tag#id.foo.bar"]': '<tag id="id" class="foo bar"/>',
}

for (var json in inputs) {
    tests[json] = (function(input, expected_output) {
        return function(test) {
            var output = haml.stringify(input)
            test.assert(output === expected_output)
            test.pass()
        }
    })(JSON.parse(json), inputs[json])
}

djtesto.runTests(tests, function(err) {
    if (err) throw err
})

require.paths.unshift(__dirname + '/../..')

var sys = require('sys')
var djtesto = require('djtesto')
var haml = require('..')

var tests = {}

var expected_outputs = {
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
    '"<"': '&lt;',
    '">"': '&gt;',
    '"&"': '&amp;',
    '"\\""': '&quot;',
    '"\'"': '&apos;',
}

for (var input_json in expected_outputs) {
    tests[input_json] = (function(input_json, expected_output) {
        return function(test) {
            var input = JSON.parse(input_json)
            var output = haml.stringify(input)
            test.assert(output === expected_output)
            test.pass()
        }
    })(input_json, expected_outputs[input_json])
}

djtesto.runTests(tests, function(err) {
    if (err) throw err
})

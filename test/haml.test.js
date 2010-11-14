require.paths.unshift(__dirname + '/../..')

var sys = require('sys')
var djtesto = require('djtesto')
var haml = require('..')

var expected_outputs = {
    'empty string': [
        '""',
        '',
    ],
    'string': [
        '"a"',
        'a',
    ],
    'empty array': [
        '[]',
        '',
    ],
    'array with one string': [
        '["a"]',
        'a',
    ],
    'array with two strings': [
        '["a", "b"]',
        'ab',
    ],
    'tag': [
        '["%b"]',
        '<b/>',
    ],
    'tag with empty content': [
        '["%b", ""]',
        '<b></b>',
    ],
    'tag with content': [
        '["%b", "asdf"]',
        '<b>asdf</b>',
    ],
    'tag with attribute': [
        '["%div", {"class":"foo"}]',
        '<div class="foo"/>',
    ],
    'tag with two attributes': [
        '["%div", {"class":"foo", "style":"bar"}]',
        '<div class="foo" style="bar"/>',
    ],
    'nested tags': [
        '["%div", ["%span"]]',
        '<div><span/></div>',
    ],
    'concatenating text and tags': [
        '["before", ["%span", "during"], "after"]',
        'before<span>during</span>after',
    ],
    'concatenating text and tags in a tag': [
        '["%div", "before", ["%span", "during"], "after"]',
        '<div>before<span>during</span>after</div>',
    ],
    'tag class': [
        '[".foo"]',
        '<div class="foo"/>',
    ],
    'tag id': [
        '["#foo"]',
        '<div id="foo"/>',
    ],
    'combining tag, id, and classes': [
        '["%tag#id.foo.bar"]',
        '<tag id="id" class="foo bar"/>',
    ],
    'xml encoding: <': [
        '"<"',
        '&lt;',
    ],
    'xml encoding: >': [
        '">"',
        '&gt;',
    ],
    'xml encoding: &': [
        '"&"',
        '&amp;',
    ],
    'xml encoding: "': [
        '"\\""',
        '&quot;',
    ],
    'xml encoding: \'': [
        '"\'"',
        '&apos;',
    ],
}

var tests = {}

for (var name in expected_outputs) {
    tests[name] = (function(input_json, expected_output) {
        return function(test) {
            var input = JSON.parse(input_json)
            var output = haml.stringify(input)
            test.assert(output === expected_output)
            test.pass()
        }
    })(expected_outputs[name][0], expected_outputs[name][1])
}

djtesto.runTests(tests, function(err) {
    if (err) throw err
})

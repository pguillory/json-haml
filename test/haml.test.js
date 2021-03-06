var sys = require('sys')
var djtesto = require('../deps/djtesto')
var haml = require('..')
var assert = require('assert')

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
        '<b></b>',
    ],
    'tag with content': [
        '["%b", "asdf"]',
        '<b>asdf</b>',
    ],
    'tag with attribute': [
        '["%div", {"class":"foo"}]',
        '<div class="foo"></div>',
    ],
    'tag with two attributes': [
        '["%div", {"class":"foo", "style":"bar"}]',
        '<div class="foo" style="bar"></div>',
    ],
    'nested tags': [
        '["%div", ["%span"]]',
        '<div><span></span></div>',
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
        '<div class="foo"></div>',
    ],
    'tag id': [
        '["#foo"]',
        '<div id="foo"></div>',
    ],
    'combining tag, id, and classes': [
        '["%tag#id.foo.bar"]',
        '<tag id="id" class="foo bar"></tag>',
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
    'tag class with dash': [
        '[".a-b"]',
        '<div class="a-b"></div>',
    ],
}

var tests = {}

for (var name in expected_outputs) {
    tests[name] = (function(input_json, expected_output) {
        return function(test) {
            var input = JSON.parse(input_json)
            var output = haml.stringify(input)
            assert.equal(output, expected_output)
            test.pass()
        }
    })(expected_outputs[name][0], expected_outputs[name][1])
}

djtesto.runTests(tests, function(err) {
    if (err) throw err
})

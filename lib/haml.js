var sys = require('sys')
var haml = exports

haml.stringify = function(template) {
    //sys.puts(typeof template + ': ' + JSON.stringify(template))

    switch (typeof template) {
        case 'string':
            return xml_encode(template)
        
        case 'number':
            return template + ''
        
        case 'object':
            if (typeof template.length === 'number') {
                if (typeof template[0] === 'string' && template[0][0] === '%') {
                    var tagName = template.shift().slice(1)

                    var s = ''
                    if (typeof template[0] === 'object' && typeof template[0].length === 'undefined') {
                        var attrs = template.shift()
                        s += '<' + tagName
                        for (var name in attrs) {
                            s += ' ' + name + '="' + xml_encode(attrs[name]) + '"'
                        }
                    } else {
                        s += '<' + tagName
                    }
                    if (template.length > 0) {
                        s += '>'
                        template.forEach(function(t) {
                            s += haml.stringify(t)
                        })
                        s += '</' + tagName + '>'
                    } else {
                        s += '/>'
                    }
                    return s
                }

                return template.map(function(t) {
                    return haml.stringify(t)
                }).join('')
            }
            
            break
    }
    
    throw new Error('Invalid template: ' + require('sys').inspect(template))
}

function xml_encode(s) {
    return s
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace('\'', '&apos;')
}

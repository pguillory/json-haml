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
                if (typeof template[0] === 'string') {
                    if (/^([.%#][\w\-]+)+$/.test(template[0])) {
                        var tag = 'div'
                        var classes = []
                        var id = null
                        
                        template.shift().match(/([.%#][\w\-]+)/g).forEach(function(part) {
                            var name = part.slice(1)
                            switch (part[0]) {
                                case '.':
                                    classes.push(name)
                                    break
                                case '#':
                                    id = name
                                    break
                                case '%':
                                    tag = name
                                    break
                            }
                        })

                        if (typeof template[0] === 'object' && typeof template[0].length === 'undefined') {
                            var attrs = template.shift()
                            if (attrs.class) {
                                classes.push(attrs.class)
                            }
                        } else {
                            var attrs = {}
                        }
                        if (id) {
                            attrs.id = id
                        }
                        if (classes.length > 0) {
                            attrs.class = classes.join(' ')
                        }

                        s = '<' + tag
                        for (var name in attrs) {
                            s += ' ' + name + '="' + xml_encode(attrs[name]) + '"'
                        }
                        s += '>'
                        template.forEach(function(t) {
                            s += haml.stringify(t)
                        })
                        s += '</' + tag + '>'
                        return s
                    }
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

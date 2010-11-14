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
                    if (template[0][0] === '%') {
                        var tag_name = template.shift().slice(1)

                        var s = ''
                        if (typeof template[0] === 'object' && typeof template[0].length === 'undefined') {
                            var attrs = template.shift()
                            s += '<' + tag_name
                            for (var name in attrs) {
                                s += ' ' + name + '="' + xml_encode(attrs[name]) + '"'
                            }
                        } else {
                            s += '<' + tag_name
                        }
                        if (template.length > 0) {
                            s += '>'
                            template.forEach(function(t) {
                                s += haml.stringify(t)
                            })
                            s += '</' + tag_name + '>'
                        } else {
                            s += '/>'
                        }
                        return s
                    }

                    if (template[0][0] === '.') {
                        var tag_name = 'div'
                        var tag_class = template.shift().slice(1)

                        var s = ''
                        if (typeof template[0] === 'object' && typeof template[0].length === 'undefined') {
                            var attrs = template.shift()
                            s += '<' + tag_name
                            for (var name in attrs) {
                                s += ' ' + name + '="' + xml_encode(attrs[name]) + '"'
                            }
                        } else {
                            s += '<' + tag_name
                        }
                        s += ' class="' + tag_class + '"'
                        if (template.length > 0) {
                            s += '>'
                            template.forEach(function(t) {
                                s += haml.stringify(t)
                            })
                            s += '</' + tag_name + '>'
                        } else {
                            s += '/>'
                        }
                        return s
                    }

                    if (template[0][0] === '#') {
                        var tag_name = 'div'
                        var tag_id = template.shift().slice(1)

                        var s = ''
                        if (typeof template[0] === 'object' && typeof template[0].length === 'undefined') {
                            var attrs = template.shift()
                            s += '<' + tag_name
                            for (var name in attrs) {
                                s += ' ' + name + '="' + xml_encode(attrs[name]) + '"'
                            }
                        } else {
                            s += '<' + tag_name
                        }
                        s += ' id="' + tag_id + '"'
                        if (template.length > 0) {
                            s += '>'
                            template.forEach(function(t) {
                                s += haml.stringify(t)
                            })
                            s += '</' + tag_name + '>'
                        } else {
                            s += '/>'
                        }
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

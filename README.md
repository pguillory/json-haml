Reimplementation of [jquery-haml] [1] in Node.js.

    var name = "foo"
    var template = ["%div", "my name is ", ["%span", {class:"name"}, name]]

    var html = haml.stringify(template)

    // <div>my name is <span class="name">foo</span></div>

  [1]: https://github.com/creationix/jquery-haml

Tim Caswell's [jquery-haml] [1] is super handy, but it only works client-side.  No sir!  We must have all the sides!

  [1]: https://github.com/creationix/jquery-haml

    var name = "foo"
    var template = ["%div", "my name is ", ["%span", {class:"name"}, name]]

    var html = haml.stringify(template)

    // <div>my name is <span class="name">foo</span></div>

Depencencies
------------
* https://github.com/pguillory/node-djtesto (for testing)

Tim Caswell's [jquery-haml] [2] is super handy, but it only works client-side, not server-side.  No sir!  We must have all the sides!

    var name = "foo"
    var template = ["%div", "my name is ", ["%span", {class:"name"}, name]]

    var html = haml.stringify(template)

    // <div>my name is <span class="name">foo</span></div>

Dependencies
------------
* [djtesto] [1] (for testing)

  [1]: https://github.com/pguillory/node-djtesto
  [2]: https://github.com/creationix/jquery-haml

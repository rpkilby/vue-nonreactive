# vue-nonreactive


Disable Vue reactivity for a given object. If you're using this,
you may want to rethink your data model. However, this plugin is
useful in a small subset of cases where you need to prevent Vue
from walking nested properties that do not represent application
state. eg, your model has a reference to a data store or cache.

Example:

```js
new Vue({
    el: 'body',
    data() {
        const instance = postStore.fetch({include: ['author', 'comments.author']})
        Vue.nonreactive(instance._cache)

        return {post: instance, },
    },
    ...
});
```

In the above case, the object `_cache` does not represent pure state
and should not be observed.


## How this works

When Vue observes an object, it walks each attribute and converts it into a
reactive property. Any nested objects are then also observed. However, Vue
will skip observation if it detects that the object is already observed.
We can make an object non-reactive by assigning a dummy observer, duping
Vue's observer detection.

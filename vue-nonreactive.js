/**
 * Disable Vue reactivity for a given object. If you're using this,
 * you may want to rethink your data model. However, this plugin is
 * useful in a small subset of cases where you need to prevent Vue
 * from walking nested properties that do not represent application
 * state. eg, your model has a reference to a data store or cache.
 *
 * Example:
 *
 *     new Vue({
 *         el: 'body',
 *         data() {
 *             const instance = postStore.fetch({include: ['author', 'comments.author']})
 *             Vue.nonreactive(instance._cache)
 *
 *             return {post: instance, },
 *         },
 *         ...
 *     });
 */


/* eslint-disable no-param-reassign */
function install(Vue) {
    const Observer = (new Vue()).$data
                                .__ob__
                                .constructor;

    Vue.nonreactive = function nonreactive(value) {
        // Set dummy observer on value
        value.__ob__ = new Observer({});
        return value;
    };
}


// auto install
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue)
    window.Vue.use(install);


export default install;

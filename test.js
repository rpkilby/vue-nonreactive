
import tap from 'tap';
import Vue from 'vue';
import VueNonreactive from './vue-nonreactive';

Vue.use(VueNonreactive);


function derived() {
    return this.obj.prop + 1;
}


const reactive = new Vue({
    data() {
        return {obj: {
            sub: {},
            prop: 0,
        }};
    },

    computed: {
        derived,
    },
});


const nonReactive = new Vue({
    data() {
        const data = {obj: {
            sub: {},
            prop: 0,
        }};
        Vue.nonreactive(data.obj);

        return data;
    },

    computed: {
        derived,
    },
});

tap.test('reactive data is reactive', t => {
    t.plan(6);

    const obj = reactive.$data.obj;

    // obj should retain attributes
    t.ok(obj.hasOwnProperty('sub'));
    t.ok(obj.hasOwnProperty('prop'));

    // all objects should be observed
    t.type(obj.__ob__, 'Observer');
    t.type(obj.sub.__ob__, 'Observer');

    // derived should update on prop update
    t.equal(reactive.derived, 1);
    reactive.obj.prop += 1;
    t.equal(reactive.derived, 2);
});


tap.test('non-reactive data is not reactive', t => {
    t.plan(6);

    const obj = nonReactive.$data.obj;

    // obj should retain attributes
    t.ok(obj.hasOwnProperty('sub'));
    t.ok(obj.hasOwnProperty('prop'));

    // primary obj should remain observed
    // sub object should not be observed
    t.type(obj.__ob__, 'Observer');
    t.type(obj.sub.__ob__, 'undefined');

    // derived should not update on prop update

    // derived should update on prop update
    t.equal(nonReactive.derived, 1);
    nonReactive.obj.prop += 1;
    t.equal(nonReactive.derived, 1);
});

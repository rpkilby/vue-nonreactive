// Declares the functions added by vue-nonreactive.
// See https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins

// AFAICT this has to be in a separate file from vue-nonreactive.d.ts, which
// does `declare module 'vue-nonreactive', because there the `declare module`
// has to be the first line and only module.

import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    nonreactive<T>(obj: T): T
  }

  interface VueConstructor {
    nonreactive<T>(obj: T): T
  }
}

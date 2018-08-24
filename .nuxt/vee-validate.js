import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'

import en from 'vee-validate/dist/locale/en'

Validator.localize('en', en)

Vue.use(VeeValidate, {})

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: `bs-template-form`,
  mixins: [validationMixin],
  model: { prop: `template`, event: `update` },
  props: {
    template: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
  },
  validations() {
    return {
      template: {
        name: { required },
      },
    };
  },
  computed: {
    localModel: {
      get() {
        return this.template;
      },
      set(updatedTemplate) {
        this.$emit(`update`, updatedTemplate);
      },
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.template.name.$dirty) return errors;
      !this.$v.template.name.required &&
        errors.push(this.$t('global.errors.nameRequired'));
      return errors;
    },
  },
  methods: {
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit(`submit`, this.template);
    },
  },
};
</script>

<template>
  <v-card tag="form">
    <v-card-title>{{ $t('global.newTemplate') }}</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="localModel.name"
        id="name"
        :label="$t('global.name')"
        name="name"
        :error-messages="nameErrors"
        :disabled="disabled"
        @input="$v.template.name.$touch()"
        @blur="$v.template.name.$touch()"
      />
      <v-textarea
        v-model="localModel.description"
        id="description"
        :label="$t('global.description')"
        name="description"
        auto-grow
        rows="1"
        :disabled="disabled"
      />
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-btn
        text
        large
        color="primary"
        @click="onSubmit"
        :disabled="disabled"
        >{{ $t('global.create') }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

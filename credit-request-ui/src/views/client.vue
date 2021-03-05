<template>
  <article class="panel">
    <p class="panel-heading">Novo Cliente</p>
    <div class="panel-block">
      <section>
        <b-field
          label="Razão Social"
          :type="has_error_name"
          label-position="inside"
        >
          <b-input v-model="name" :value="name"></b-input>
        </b-field>
        <b-field label="CNPJ" :type="has_error_cnpj" label-position="inside">
          <b-input v-model="cnpj" :value="cnpj"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success" outlined @click="addAddress()">
            +
          </b-button>
          <div class="label">Endereços</div>
        </div>
        <b-field
          :type="has_error_addresses"
          v-for="address in addresses"
          :key="address.uid"
        >
          <b-input v-model="address.value" :value="address.value"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success" outlined @click="addPhone()">
            +
          </b-button>
          <div class="label">Telefones</div>
        </div>
        <b-field
          :type="has_error_phones"
          v-for="phone in phones"
          :key="phone.uid"
        >
          <b-input v-model="phone.value" :value="phone.value"></b-input>
        </b-field>

        <div class="buttons">
          <b-button type="is-danger is-light" @click="clearForm()"
            >Limpar</b-button
          >
          <b-button :loading="loading" type="is-success" @click="submit()"
            >Salvar</b-button
          >
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import { HTTP } from "../libaries/http-common";

export default {
  name: "client",
  data: () => {
    return {
      name: "",
      cnpj: "",
      addresses: [{ uid: "a1", value: "" }],
      phones: [{ uid: "p1", value: "" }],
      errors: {},
      loading: false
    };
  },
  computed: {
    has_error_name() {
      return this.has_error("name");
    },
    has_error_cnpj() {
      return this.has_error("cnpj");
    },
    has_error_addresses() {
      return this.has_error("addresses.value");
    },
    has_error_phones() {
      return this.has_error("phones.value");
    }
  },
  methods: {
    addAddress() {
      return this.addresses.push({
        uid: `a${this.addresses.length + 1}`,
        value: ""
      });
    },
    addPhone() {
      return this.phones.push({ uid: `p${this.phones.length + 1}`, value: "" });
    },
    clearForm() {
      this.name = "";
      this.cnpj = "";
      this.addresses = [{ uid: "a1", value: "" }];
      this.phones = [{ uid: "a1", value: "" }];
    },
    has_error(field) {
      if (this.errors[field]) {
        return "is-danger";
      } else {
        return "";
      }
    },
    submit() {
      if (this.loading) return;

      this.loading = true;
      const params = {
        name: this.name,
        cnpj: this.cnpj,
        addresses_attributes: this.addresses,
        phones_attributes: this.phones
      };

      HTTP.post("clients", params)
        .then(() => {
          this.loading = false;
          this.errors = {};
          this.clearForm();
          this.$buefy.notification.open({
            message: "Cadastrado com sucesso",
            type: "is-success"
          });
        })
        .catch(e => {
          this.loading = false;
          this.errors = e.response.data;

          this.$buefy.notification.open({
            message: "Ocorreu um erro",
            type: "is-danger"
          });
        });
    }
  }
};
</script>

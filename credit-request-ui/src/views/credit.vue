<template>
  <article class="panel">
    <p class="panel-heading">Solicitação de Crédito</p>
    <div class="panel-block">
      <section>
        <b-field
          label="Cliente"
          :type="has_error_client"
          label-position="inside"
        >
          <b-autocomplete
            :data="filteredDataArray"
            v-model="search_client"
            :open-on-focus="true"
            clearable
            field="name"
            @select="client_selected"
          >
            <template #empty>Nenhum cliente foi encontrado</template>
          </b-autocomplete>
        </b-field>

        <b-field
          label="Crédito"
          :type="has_error_value"
          label-position="inside"
        >
          <b-input v-model="value" v-currency :value="value"></b-input>
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
      clients: [],
      client: null,
      value: "",
      errors: {},
      search_client: "",
      loading: false
    };
  },
  computed: {
    filteredDataArray() {
      return this.clients.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.search_client.toLowerCase()) >= 0
        );
      });
    },
    has_error_client() {
      return this.has_error("client");
    },
    has_error_value() {
      return this.has_error("value");
    }
  },
  methods: {
    client_selected(option) {
      this.client = option;
    },
    clearForm() {
      this.value = null;
      this.search_client = "";
      this.client = null;
    },
    has_error(field) {
      if (this.errors[field]) {
        return "is-danger";
      } else {
        return "";
      }
    },
    getClients() {
      HTTP.get("clients")
        .then(response => {
          this.clients = response.data.map(client => {
            return { id: client.id, name: `${client.name} - ${client.cnpj}` };
          });
        })
        .catch(() => {
          this.$buefy.notification.open({
            message: "Ocorreu um erro ao carregar",
            type: "is-danger"
          });
        });
    },
    submit() {
      if (this.loading) return;

      this.loading = true;
      const params = {
        client_id: this.client ? this.client.id : null,
        value: parseFloat(
          this.value
            .toString()
            .replace("R$", "")
            .replace(",", "")
        )
      };

      HTTP.post("credits", params)
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
  },
  created() {
    this.getClients();
  }
};
</script>

<template>
  <article class="panel">
    <p class="panel-heading">Solicitação de Empréstimo</p>
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
          :type="has_error_credit"
          label-position="inside"
        >
          <b-select v-model="credit_id">
            <option
              v-for="option in credits"
              :value="option.id"
              :key="option.id"
            >
              {{ option.created_at }} - {{ option.value }}: {{ option.remain }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Valor" :type="has_error_value" label-position="inside">
          <b-input v-model="value" v-currency :value="value"></b-input>
        </b-field>

        <b-field
          label="Parcelamento"
          :type="has_error_subdivision"
          label-position="inside"
        >
          <b-input
            placeholder="12"
            v-model="subdivision"
            :value="subdivision"
          ></b-input>
        </b-field>

        <b-field
          label="Juros"
          :type="has_error_interest"
          label-position="inside"
        >
          <b-input
            placeholder="1.5"
            v-model="interest"
            :value="interest"
          ></b-input>
        </b-field>

        <b-table
          :data="installments"
          :striped="true"
          :hoverable="true"
          v-if="show_table"
        >
          <b-table-column
            field="id"
            label="Vencimento"
            width="40"
            date
            v-slot="props"
          >
            {{ props.row.payday }}
          </b-table-column>

          <b-table-column
            field="value"
            label="Valor"
            width="40"
            numeric
            v-slot="props"
          >
            {{ props.row.value }}
          </b-table-column>

          <template #footer>
            <div class="has-text-right">
              {{ total }}
            </div>
          </template>
        </b-table>

        <div class="buttons">
          <b-button type="is-primary" @click="submit(true)">Simular</b-button>
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
      search_client: "",
      credit_id: null,
      value: null,
      credits: [],
      subdivision: null,
      interest: null,
      errors: {},
      total: 0,
      installments: [],
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
    has_error_credit() {
      return this.has_error("credit_id");
    },
    has_error_value() {
      return this.has_error("value");
    },
    has_error_subdivision() {
      return this.has_error("subdivision");
    },
    has_error_interest() {
      return this.has_error("interest");
    },
    show_table() {
      return this.installments.length > 0;
    }
  },
  methods: {
    client_selected(option) {
      this.client = option;

      this.getCredits();
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
    getCredits() {
      const params = { client_id: this.client.id };

      HTTP.get("credits", { params: params })
        .then(response => {
          this.credits = response.data.map(credit => {
            return {
              id: credit.id,
              created_at: credit.created_at,
              value: credit.value,
              remain: credit.remain
            };
          });
        })
        .catch(() => {
          this.$buefy.notification.open({
            message: "Ocorreu um erro ao carregar",
            type: "is-danger"
          });
        });
    },
    clearForm() {
      this.value = null;
      this.search_client = "";
      this.client = null;
      this.credit_id = null;
      this.installments = [];
      this.total = 0;
      this.subdivision = null;
      this.interest = null;
    },
    submit(preview = false) {
      if (this.loading) return;

      this.loading = true;
      const params = {
        client_id: this.client.id,
        credit_id: this.credit_id,
        value: parseFloat(
          this.value
            .toString()
            .replace("R$", "")
            .replace(",", "")
        ),
        subdivision: this.subdivision,
        interest: parseFloat(this.interest) / 100.0,
        preview: preview
      };

      HTTP.post("loans", params)
        .then(response => {
          this.loading = false;
          this.errors = {};

          if (!preview) {
            this.clearForm();
            this.$buefy.notification.open({
              message: "Cadastrado com sucesso",
              type: "is-success"
            });
          } else {
            this.total = response.data.total;
            this.installments = response.data.installments.map(installment => {
              return { payday: installment.payday, value: installment.value };
            });
          }
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

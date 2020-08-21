<template>
  <q-page padding class="">
    <div class="text-h4 q-mb-md">
      {{
        processInfo.label
          ? processInfo.label
          : "Error : Process with name '" +
            this.$route.params.name +
            "' doesn't have a label"
      }}
    </div>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Exécutions totales</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section class="row">
        <div class="col-1">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="done" />
              </q-item-section>
              <q-item-section
                ><div class="text-weight-medium">
                  {{ processSummary.successfulCount }}
                </div></q-item-section
              >
            </q-item>
          </q-list>
        </div>
        <div class="col-1">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="error" />
              </q-item-section>
              <q-item-section
                ><div class="text-weight-medium">
                  {{ processSummary.errorsCount }}
                </div></q-item-section
              >
            </q-item>
          </q-list>
        </div>
        <div class="col-1">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="timer_off" />
              </q-item-section>
              <q-item-section
                ><div class="text-weight-medium">
                  {{ processSummary.misfiredCount }}
                </div></q-item-section
              >
            </q-item>
          </q-list>
        </div>
        <div class="col">
          <q-btn
            label="voir toutes les exécutions"
            color="primary"
            :to="executionLink"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mt-lg">
      <q-card-section>
        <div class="text-h6">
          Identification fonctionnelle
          <q-btn round color="primary" icon="edit" class="q-ml-sm" size="sm" />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-icon name="engineering" color="primary" size="xl" class="q-ml-lg"
      /></q-card-section>
    </q-card>

    <q-card class="my-card q-mt-lg">
      <q-card-section>
        <div class="text-h6">
          Identification technique
          <q-btn round color="primary" icon="edit" class="q-ml-sm" size="sm" />
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section class="q-gutter-sm">
        <div style="max-width: 400px">
          <q-list dense>
            <q-item>
              <q-item-section>
                <div class="text-weight-medium">
                  Expression cron
                </div>
              </q-item-section>
              <q-item-section side>
                {{
                  processInfo.triggeringStrategy
                    ? processInfo.triggeringStrategy.cronExpression
                    : "-"
                }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="text-weight-medium">
                  Actif
                </div>
              </q-item-section>
              <q-item-section side>
                {{
                  Object.entries(processInfo).length
                    ? processInfo.active
                      ? "Oui"
                      : "Non"
                    : "-"
                }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="text-weight-medium">
                  Autorise la multi-exécution
                </div>
              </q-item-section>
              <q-item-section side>
                {{
                  processInfo.triggeringStrategy
                    ? processInfo.triggeringStrategy.multiExecution
                      ? "Oui"
                      : "Non"
                    : "-"
                }}
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <div class="text-weight-medium">
                  Temps de validité d'une planification
                </div>
              </q-item-section>
              <q-item-section side>
                <!-- Temps de validité d'une planification = rescuePeriodInSeconds -->
                {{
                  processInfo.triggeringStrategy
                    ? processInfo.triggeringStrategy.rescuePeriodInSeconds
                    : "-"
                }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card q-mt-lg">
      <q-card-section>
        <div class="text-h6">
          Paramètres
          <q-btn round color="primary" icon="edit" class="q-ml-sm" size="sm" />
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-icon name="engineering" color="primary" size="xl" class="q-ml-lg"
      /></q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  created() {
    console.log();
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/definitions/${this.$route.params.name}`
      )
      .then(res => {
        this.processInfo = res.data;
        this.executionLink = "/process/" + res.data.name + "/executions";
      });
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/summaries/${this.$route.params.name}`
      )
      .then(res => {
        this.processSummary = res.data;
      });
  },
  data() {
    return {
      processInfo: {},
      processSummary: {},
      executionLink: ""
    };
  }
};
</script>

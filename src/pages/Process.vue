<template>
  <q-page padding>
    <q-splitter v-model="splitterModel" style="" :limits="[0, 100]">
      <template v-slot:before>
        <div class="q-pa-md">
          <div class="text-h4 q-mb-md">
            {{
              processInfo.label
                ? processInfo.label
                : "Error : No process with name '" + $route.params.name + "'"
            }}
          </div>

          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6">Exécutions totales de la semaine</div>
            </q-card-section>

            <q-separator inset />

            <q-card-section class="row">
              <div class="col">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <div class="text-weight-medium">
                        <q-icon color="primary" name="done" size="sm" />
                        {{ processSummary.successfulCount }}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <div class="text-weight-medium ">
                        <q-icon color="primary" name="error" size="sm" />
                        {{ processSummary.errorsCount }}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col">
                <q-list>
                  <q-item>
                    <q-item-section
                      ><div class="text-weight-medium">
                        <q-icon color="primary" name="timer_off" size="sm" />
                        {{ processSummary.misfiredCount }}
                      </div></q-item-section
                    >
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="my-card q-mt-lg">
            <q-card-section>
              <div class="text-h6">
                Identification fonctionnelle
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  class="q-ml-sm"
                  size="sm"
                />
              </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <q-icon
                name="engineering"
                color="primary"
                size="xl"
                class="q-ml-lg"
            /></q-card-section>
          </q-card>

          <q-card class="my-card q-mt-lg">
            <q-card-section>
              <div class="text-h6">
                Identification technique
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  class="q-ml-sm"
                  size="sm"
                />
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
                <q-btn
                  round
                  color="primary"
                  icon="edit"
                  class="q-ml-sm"
                  size="sm"
                />
              </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <q-icon
                name="engineering"
                color="primary"
                size="xl"
                class="q-ml-lg"
            /></q-card-section>
          </q-card>
        </div>
      </template>
      <template v-slot:after>
        <div class="q-pa-md">
          <div class="text-h4 q-gutter-x-md q-mx-auto row">
            <div class="col">Exécutions</div>
            <div class="col-auto">
              <q-tabs
                v-model="filterTab"
                inline-label
                class="text-primary q-mx-auto"
              >
                <q-tab
                  name="all"
                  icon="list"
                  label="All"
                  @click="updateExecutions('')"
                />
                <q-tab
                  name="done"
                  icon="done"
                  label="Done"
                  @click="updateExecutions('DONE')"
                />
                <q-tab
                  name="error"
                  icon="error"
                  label="Error"
                  @click="updateExecutions('ERROR')"
                />
              </q-tabs>
            </div>
          </div>
          <q-infinite-scroll @load="onLoad" :offset="50">
            <q-list bordered class="rounded-borders q-mt-sm">
              <div v-for="execution in executions" :key="execution.preId">
                <q-expansion-item
                  expand-separator
                  :icon="
                    execution.status == 'DONE'
                      ? 'done'
                      : execution.status == 'ERROR'
                      ? 'error'
                      : 'help'
                  "
                  :label="execution.beginTime"
                  @show="fetchActivities(execution.preId)"
                >
                  <q-card>
                    <q-separator />
                    <q-card-section>
                      <q-splitter v-model="splitterModelExecutions">
                        <template v-slot:before>
                          <q-tabs
                            v-model="tabs[execution.preId]"
                            vertical
                            class="text-primary"
                          >
                            <q-tab name="info" label="Informations" />
                            <q-tab name="activities" label="Activités" />
                            <q-tab name="support" label="Prise en charge" />
                          </q-tabs>
                        </template>
                        <template v-slot:after>
                          <q-tab-panels
                            v-model="tabs[execution.preId]"
                            animated
                            vertical
                            transition-prev="jump-up"
                            transition-next="jump-up"
                          >
                            <q-tab-panel name="info">
                              <div class="text-h5">Informations</div>
                              <q-separator class="q-mt-sm q-mb-md" />
                              <div style="max-width: 400px">
                                <q-list dense>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Date de début
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      {{ execution.beginTime }}
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Date de fin
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      {{ execution.endTime }}
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Durée
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      {{ execution.executionTime }}
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                            </q-tab-panel>
                            <q-tab-panel name="activities">
                              <div class="text-h5">Activités</div>
                              <q-separator class="q-mt-sm q-mb-md" />
                              <q-list bordered class="rounded-borders">
                                <div
                                  v-for="activity in activities[
                                    execution.preId
                                  ]"
                                  :key="activity.aceId"
                                >
                                  <q-expansion-item
                                    expand-separator
                                    :icon="
                                      execution.status == 'RUNNING'
                                        ? 'help'
                                        : activity.status == 'DONE'
                                        ? 'done'
                                        : 'error'
                                    "
                                    :label="activity.label"
                                  >
                                    <q-card>
                                      <q-separator />
                                      <q-card-section>
                                        <div style="max-width: 400px">
                                          <q-list dense>
                                            <q-item>
                                              <q-item-section>
                                                <div class="text-weight-medium">
                                                  Date de début
                                                </div>
                                              </q-item-section>
                                              <q-item-section side>
                                                {{ activity.beginTime }}
                                              </q-item-section>
                                            </q-item>
                                          </q-list>
                                        </div>
                                      </q-card-section>
                                    </q-card> </q-expansion-item
                                  ><q-separator />
                                </div>
                              </q-list>
                            </q-tab-panel>
                            <q-tab-panel name="support">
                              <div class="text-h5">
                                Prise en charge
                                <q-btn
                                  round
                                  color="primary"
                                  icon="edit"
                                  class="q-ml-sm"
                                  size="sm"
                                />
                              </div>
                              <q-separator class="q-mt-sm q-mb-md" />
                              <div style="max-width: 400px">
                                <q-list dense>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Prise en charge
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      To fill !
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Date de prise en charge
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      To fill !
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="text-weight-medium">
                                        Commentaire
                                      </div>
                                    </q-item-section>
                                    <q-item-section side>
                                      To fill !
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                            </q-tab-panel>
                          </q-tab-panels>
                        </template>
                      </q-splitter>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-separator />
              </div>
            </q-list>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-ios color="primary" size="2em" />
              </div>
            </template>
          </q-infinite-scroll>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  created() {
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/definitions/${this.$route.params.name}`
      )
      .then(res => {
        this.processInfo = res.data;
      });
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/summaries/${this.$route.params.name}`
      )
      .then(res => {
        this.processSummary = res.data;
      });
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/?processName=${this.$route.params.name}&limit=${this.limit}`
      )
      .then(res => {
        this.executions = this.formatExecutions(res.data);

        res.data.map(execution => {
          this.$set(this.tabs, execution.preId, "info");
        });
      });
    // Get process label from its name
    this.$axios
      .get(
        `http://localhost:8080/getting-started-vertigo/api/orchestra/definitions/${this.$route.params.name}`
      )
      .then(res => {
        this.processLabel = res.data.label;
      });
  },
  data() {
    return {
      limit: 0,
      status: "",
      processInfo: {},
      processSummary: {},
      processLabel: "",
      filterTab: "all", // Tab for filtering executions
      executions: [],
      activities: {},
      expandedExecutions: {},
      tabs: {}, //Tabs for navigating inside execution
      splitterModel: 50,
      splitterModelExecutions: 20
    };
  },
  methods: {
    formatDate(unformattedDate) {
      // Date is assumed to be in YYYY-MM-DDTHH:mm... format
      let timestamp = date.extractDate(
        unformattedDate.substring(0, 16),
        "YYYY-MM-DDTHH:mm"
      );
      return date.formatDate(timestamp, "DD/MM/YYYY HH:mm");
    },
    formatExecutions: function(unformattedExecutions) {
      return unformattedExecutions.map(execution => {
        let formattedBeginTime = this.formatDate(execution.beginTime);
        let formattedEndTime = execution.endTime
          ? this.formatDate(execution.endTime)
          : "Exécution en cours ...";
        let formattedExecutionTime = execution.executionTime
          ? execution.executionTime + "s"
          : "Exécution en cours ...";
        return {
          preId: execution.preId,
          beginTime: formattedBeginTime,
          endTime: formattedEndTime,
          executionTime: formattedExecutionTime,
          status: execution.status
        };
      });
    },
    fetchActivities: function(preId) {
      // Fetch data only once
      if (!this.activities[preId]) {
        this.$axios
          .get(
            `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/${preId}/activities`
          )
          .then(res => {
            this.$set(this.activities, preId, this.formatActivities(res.data));
          });
      }
    },
    formatActivities: function(unformattedActivities) {
      return unformattedActivities.map(activity => {
        activity.beginTime = this.formatDate(activity.beginTime);
        // More to come
        return activity;
      });
    },
    updateExecutions: function(status) {
      this.limit = 20;
      this.status = status
      this.$axios
        .get(
          `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then(res => {
          this.executions = this.formatExecutions(res.data);
          res.data.map(execution => {
            this.$set(this.tabs, execution.preId, "info");
          });
        });
    },
    onLoad(index, done) {
      console.log("called");
      this.limit += 20;
      this.$axios
        .get(
          `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then(res => {
          this.executions = this.formatExecutions(res.data);
          res.data.slice(-20).map(execution => {
            this.$set(this.tabs, execution.preId, "info");
          });
          done();
        });
    }
  }
};
</script>

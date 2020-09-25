<template>
  <q-splitter v-model="splitterModel" style="height: 85vh" :limits="[0, 100]">
    <template v-slot:before>
      <div class="q-pa-md">
        <div class="text-h4 q-mb-md">
          <div v-if="processInfo.label || errorMessage">
            {{ processInfo.label || errorMessage }}
          </div>
          <div v-else>
            <q-spinner-ios color="primary" size="sm"></q-spinner-ios>
          </div>
        </div>

        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ $q.lang.orchestra.totalExecutions }}</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section class="row">
            <div class="col">
              <q-list>
                <q-item>
                  <q-item-section>
                    <div class="text-weight-medium">
                      <q-icon color="green" name="done" size="sm"></q-icon>
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
                    <div class="text-weight-medium">
                      <q-icon color="red" name="error" size="sm"></q-icon>
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
                      <q-icon color="grey" name="timer_off" size="sm"></q-icon>
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
              {{ $q.lang.orchestra.functionalId }}
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-list dense>
              <div v-for="(value, name) in processInfo.metadatas" :key="name">
                <q-item>
                  <q-item-section class="text-weight-medium">{{
                    name
                  }}</q-item-section>
                  <q-item-section side>{{ value }}</q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-lg">
          <q-card-section>
            <div class="text-h6">
              {{ $q.lang.orchestra.technicalId }}
              <q-btn
                round
                color="indigo"
                icon="edit"
                class="q-ml-sm"
                size="sm"
                @click="editMode.technical = !editMode.technical"
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>
          <q-card-section class="q-gutter-sm">
            <div>
              <q-list dense>
                <div v-if="editMode.technical">
                  <q-form @submit="onSubmit('technical')">
                    <q-item>
                      <q-item-section class="text-weight-medium">
                        {{ $q.lang.orchestra.cronExpression }}
                      </q-item-section>
                      <q-item-section side>
                        <q-input
                          v-model="form.technical.cronExpression"
                          :dense="true"
                          placeholder="* * * * * ? *"
                        />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section class="text-weight-medium">
                        {{ $q.lang.orchestra.active }}
                      </q-item-section>
                      <q-item-section side>
                        <div class="q-gutter-sm">
                          <q-radio
                            size="xs"
                            v-model="form.technical.active"
                            val="true"
                            :label="$q.lang.orchestra.yes"
                          />
                          <q-radio
                            size="xs"
                            v-model="form.technical.active"
                            val="false"
                            :label="$q.lang.orchestra.no"
                          />
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section class="text-weight-medium">
                        {{ $q.lang.orchestra.multiExecution }}
                      </q-item-section>
                      <q-item-section side>
                        <div class="q-gutter-sm">
                          <q-radio
                            size="xs"
                            v-model="form.technical.multiExecution"
                            val="true"
                            :label="$q.lang.orchestra.yes"
                          />
                          <q-radio
                            size="xs"
                            v-model="form.technical.multiExecution"
                            val="false"
                            :label="$q.lang.orchestra.no"
                          />
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section class="text-weight-medium">
                        {{ $q.lang.orchestra.rescuePeriod }}
                      </q-item-section>
                      <q-item-section side>
                        <q-input
                          v-model.number="form.technical.rescuePeriod"
                          type="number"
                          :dense="true"
                        />
                      </q-item-section>
                    </q-item>
                    <div>
                      <q-item>
                        <q-btn
                          :label="$q.lang.orchestra.submit"
                          type="submit"
                          color="indigo"
                          class="q-mx-auto"
                        />
                      </q-item>
                    </div>
                  </q-form>
                </div>

                <div v-else>
                  <q-item>
                    <q-item-section class="text-weight-medium">
                      {{ $q.lang.orchestra.cronExpression }}
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
                    <q-item-section class="text-weight-medium">
                      {{ $q.lang.orchestra.active }}
                    </q-item-section>
                    <q-item-section side>
                      {{
                        Object.entries(processInfo).length
                          ? processInfo.active
                            ? $q.lang.orchestra.yes
                            : $q.lang.orchestra.no
                          : "-"
                      }}
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-weight-medium">
                      {{ $q.lang.orchestra.multiExecution }}
                    </q-item-section>
                    <q-item-section side>
                      {{
                        processInfo.triggeringStrategy
                          ? processInfo.triggeringStrategy.multiExecution
                            ? $q.lang.orchestra.yes
                            : $q.lang.orchestra.no
                          : "-"
                      }}
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-weight-medium">
                      {{ $q.lang.orchestra.rescuePeriod }}
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
                </div>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="my-card q-mt-lg">
          <q-card-section>
            <div class="text-h6">
              {{ $q.lang.orchestra.settings }}
              <q-btn
                round
                color="indigo"
                icon="edit"
                class="q-ml-sm"
                size="sm"
                @click="editMode.settings = !editMode.settings"
              ></q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-list dense>
              <div
                v-if="
                  processInfo.triggeringStrategy &&
                    processInfo.triggeringStrategy.initialParams
                "
              >
                <div v-if="editMode.settings">
                  <q-form @submit="onSubmit('settings')">
                    <div
                      v-for="(value, name) in processInfo.triggeringStrategy
                        .initialParams"
                      :key="name"
                    >
                      <q-item>
                        <q-item-section class="text-weight-medium">
                          {{ name }}
                        </q-item-section>
                        <q-item-section side>
                          <q-input
                            v-model="form.settings[name]"
                            :dense="true"
                            :rules="[
                              (val) =>
                                (val && val.length > 0) ||
                                $q.lang.orchestra.fieldCannotBeEmpty,
                            ]"
                          />
                        </q-item-section>
                      </q-item>
                    </div>
                    <div>
                      <q-item>
                        <q-btn
                          :label="$q.lang.orchestra.submit"
                          type="submit"
                          color="indigo"
                          class="q-mx-auto"
                        />
                      </q-item>
                    </div>
                  </q-form>
                </div>
                <div v-else>
                  <div
                    v-for="(value, name) in processInfo.triggeringStrategy
                      .initialParams"
                    :key="name"
                  >
                    <q-item>
                      <q-item-section class="text-weight-medium">
                        {{ name }}
                      </q-item-section>
                      <q-item-section side>
                        {{ value }}
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </template>
    <template v-slot:after>
      <div class="q-pa-md">
        <div class="text-h4 q-gutter-x-md q-mx-auto row">
          <div class="col">{{ $q.lang.orchestra.executions }}</div>
          <div class="col-auto">
            <q-tabs
              v-model="filterTab"
              inline-label
              class="text-primary q-mx-auto"
            >
              <q-tab
                name="all"
                icon="list"
                :label="$q.lang.orchestra.all"
                @click="updateExecutions('')"
              ></q-tab>
              <q-tab
                name="done"
                icon="done"
                :label="$q.lang.orchestra.done"
                @click="updateExecutions('DONE')"
                class="text-green"
              ></q-tab>
              <q-tab
                name="error"
                icon="error"
                :label="$q.lang.orchestra.error"
                @click="updateExecutions('ERROR')"
                class="text-red"
              ></q-tab>
            </q-tabs>
          </div>
        </div>
        <q-infinite-scroll
          @load="onLoad"
          :offset="50"
          scroll-target="div.q-splitter__panel.q-splitter__after.col"
        >
          <q-list bordered class="rounded-borders q-mt-sm">
            <div v-for="execution in executions" :key="execution.preId">
              <q-expansion-item
                expand-separator
                @show="fetchActivities(execution.preId)"
              >
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar
                      :icon="
                        execution.status == 'DONE'
                          ? 'done'
                          : execution.status == 'ERROR'
                          ? 'error'
                          : execution.status == 'ABORTED'
                          ? 'flash_on'
                          : 'help'
                      "
                      :color="
                        execution.status == 'DONE'
                          ? 'green'
                          : execution.status == 'ERROR'
                          ? 'red'
                          : execution.status == 'ABORTED'
                          ? 'orange'
                          : 'grey'
                      "
                      text-color="white"
                    ></q-avatar>
                    <q-tooltip>
                      {{ execution.status }}
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section class="text-weight-medium">
                    {{ execution.beginTime }}
                  </q-item-section>
                </template>
                <q-card>
                  <q-separator></q-separator>
                  <q-card-section>
                    <q-splitter v-model="splitterModelExecutions">
                      <template v-slot:before>
                        <q-tabs
                          v-model="tabs[execution.preId]"
                          vertical
                          class="text-primary"
                        >
                          <q-tab
                            name="info"
                            :label="$q.lang.orchestra.informations"
                          ></q-tab>
                          <q-tab
                            name="activities"
                            :label="$q.lang.orchestra.activities"
                          ></q-tab>
                          <q-tab
                            name="support"
                            :label="$q.lang.orchestra.support"
                          ></q-tab>
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
                            <div class="text-h5">
                              {{ $q.lang.orchestra.informations }}
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <div style="max-width: 400px;">
                              <q-list dense>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.startTime }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ execution.beginTime }}
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.endTime }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    {{ execution.endTime }}
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.duration }}
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
                            <div class="text-h5">
                              {{ $q.lang.orchestra.activities }}
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <q-list bordered class="rounded-borders">
                              <div
                                v-for="activity in activities[execution.preId]"
                                :key="activity.aceId"
                              >
                                <q-expansion-item expand-separator>
                                  <template v-slot:header>
                                    <q-item-section avatar>
                                      <q-avatar
                                        :icon="
                                          activity.status == 'RUNNING'
                                            ? 'help'
                                            : activity.status == 'DONE'
                                            ? 'done'
                                            : activity.status == 'ABORTED'
                                            ? 'flash_on'
                                            : 'error'
                                        "
                                        :color="
                                          activity.status == 'RUNNING'
                                            ? 'grey'
                                            : activity.status == 'DONE'
                                            ? 'green'
                                            : activity.status == 'ABORTED'
                                            ? 'orange'
                                            : 'red'
                                        "
                                        text-color="white"
                                      ></q-avatar>
                                      <q-tooltip>
                                        {{ activity.status }}
                                      </q-tooltip>
                                    </q-item-section>
                                    <q-item-section class="text-weight-medium">
                                      {{ activity.label }}
                                    </q-item-section>
                                  </template>
                                  <q-card>
                                    <q-separator></q-separator>
                                    <q-card-section>
                                      <div style="max-width: 400px;">
                                        <q-list dense>
                                          <q-item>
                                            <q-item-section>
                                              <div class="text-weight-medium">
                                                {{
                                                  $q.lang.orchestra.startTime
                                                }}
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
                                ><q-separator></q-separator>
                              </div>
                            </q-list>
                          </q-tab-panel>
                          <q-tab-panel name="support">
                            <div class="text-h5">
                              {{ $q.lang.orchestra.support }}
                              <q-btn
                                round
                                color="primary"
                                icon="edit"
                                class="q-ml-sm"
                                size="sm"
                              ></q-btn>
                            </div>
                            <q-separator class="q-mt-sm q-mb-md"></q-separator>
                            <div style="max-width: 400px;">
                              <q-list dense>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.support }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    To fill !
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.supportDate }}
                                    </div>
                                  </q-item-section>
                                  <q-item-section side>
                                    To fill !
                                  </q-item-section>
                                </q-item>
                                <q-item>
                                  <q-item-section>
                                    <div class="text-weight-medium">
                                      {{ $q.lang.orchestra.comment }}
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
              <q-separator></q-separator>
            </div>
          </q-list>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <div v-if="!errorMessage && !executionsLoaded">
                <q-spinner-ios color="primary" size="2em"></q-spinner-ios>
              </div>
              <div v-else class="text-weight-medium">{{ errorMessage }}</div>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </template>
  </q-splitter>
</template>

<script>
import Quasar from "quasar";
import axios from "axios";
export default {
  created() {
    axios
      .get(`${this.apiUrl}/definitions/${this.$route.params.name}`)
      .then((res) => {
        this.processInfo = res.data;

        // Init technical form fields
        this.form.technical = {
          cronExpression: this.processInfo.triggeringStrategy
            ? this.processInfo.triggeringStrategy.cronExpression
            : "",
          active: Object.entries(this.processInfo).length
            ? this.processInfo.active
              ? "true"
              : "false"
            : "-",
          multiExecution: this.processInfo.triggeringStrategy
            ? this.processInfo.triggeringStrategy.multiExecution
              ? "true"
              : "false"
            : "-",
          rescuePeriod: this.processInfo.triggeringStrategy
            ? this.processInfo.triggeringStrategy.rescuePeriodInSeconds
            : "",
        };

        // Init settings form fields

        this.form.settings = this.processInfo.triggeringStrategy
          ? this.processInfo.triggeringStrategy.initialParams
            ? { ...this.processInfo.triggeringStrategy.initialParams }
            : {}
          : {};
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          this.errorMessage = `${this.$q.lang.orchestra.noProcess}: ${this.$route.params.name}`;
        } else {
          this.errorMessage = this.$q.lang.orchestra.connectionFailed;
        }
        this.connectionFailure = err.response ? false : true;
      });
    axios
      .get(`${this.apiUrl}/executions/summaries/${this.$route.params.name}`)
      .then((res) => {
        this.processSummary = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
    this.updateExecutions("");
  },
  props: ["apiUrl"],
  data() {
    return {
      editMode: { technical: false, settings: false },
      executionsLoaded: false,
      limit: 0,
      connectionFailure: "?",
      errorMessage: "",
      status: "",
      processInfo: {},
      processSummary: {},
      filterTab: "all", // Tab for filtering executions
      executions: [],
      activities: {},
      expandedExecutions: {},
      form: {
        technical: {},
        settings: {},
      },
      tabs: {}, //Tabs for navigating inside execution
      splitterModel: 50,
      splitterModelExecutions: 20,
    };
  },
  watch: {
    "$q.lang": function() {
      // Avoid displaying message when this.connectionFailure == ?
      if (this.errorMessage) {
        if (this.connectionFailure == false) {
          this.errorMessage = `${this.$q.lang.orchestra.noProcess}: ${this.$route.params.name}`;
        } else if (this.connectionFailure == true) {
          this.errorMessage = this.$q.lang.orchestra.connectionFailed;
        }
      }
    },
  },
  methods: {
    formatDate(unformattedDate) {
      // Date is assumed to be in YYYY-MM-DDTHH:mm... format
      let timestamp = Quasar.utils.date.extractDate(
        unformattedDate.substring(0, 16),
        "YYYY-MM-DDTHH:mm"
      );
      return Quasar.utils.date.formatDate(timestamp, "DD/MM/YYYY HH:mm");
    },
    formatExecutions: function(unformattedExecutions) {
      return unformattedExecutions.map((execution) => {
        let formattedBeginTime = this.formatDate(execution.beginTime);
        let formattedEndTime = execution.endTime
          ? this.formatDate(execution.endTime)
          : "...";
        let formattedExecutionTime = execution.executionTime
          ? execution.executionTime + "s"
          : "...";
        return {
          preId: execution.preId,
          beginTime: formattedBeginTime,
          endTime: formattedEndTime,
          executionTime: formattedExecutionTime,
          status: execution.status,
        };
      });
    },
    fetchActivities: function(preId) {
      axios
        .get(`${this.apiUrl}/executions/${preId}/activities`)
        .then((res) => {
          this.$set(this.activities, preId, this.formatActivities(res.data));
        })
        .catch((err) => {
          console.error(err);
        });
    },
    formatActivities: function(unformattedActivities) {
      return unformattedActivities.map((activity) => {
        activity.beginTime = this.formatDate(activity.beginTime);
        // More to come
        return activity;
      });
    },
    updateExecutions: function(status) {
      this.limit = 20;
      this.status = status;
      this.errorMessage = "";
      this.connectionFailure = "?";
      axios
        .get(
          `${this.apiUrl}/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then((res) => {
          this.executions = this.formatExecutions(res.data);
          res.data.map((execution) => {
            this.$set(this.tabs, execution.preId, "info");
          });
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            this.errorMessage = `${this.$q.lang.orchestra.noProcess}: ${this.$route.params.name}`;
          } else {
            this.errorMessage = this.$q.lang.orchestra.connectionFailed;
          }
          this.connectionFailure = err.response ? false : true;
        });
    },
    onLoad(index, done) {
      this.limit += 20;
      axios
        .get(
          `${this.apiUrl}/executions/?processName=${this.$route.params.name}&status=${this.status}&limit=${this.limit}`
        )
        .then((res) => {
          let formattedExecutions = this.formatExecutions(res.data);
          if (
            this.executions[this.executions.length - 1].preId ==
            formattedExecutions[formattedExecutions.length - 1].preId
          ) {
            this.executionsLoaded = true;
          } else {
            this.executions = formattedExecutions;
            res.data.slice(-20).map((execution) => {
              this.$set(this.tabs, execution.preId, "info");
            });
          }
          done();
        });
    },
    onSubmit(form) {
      if (form == "technical") {
        axios
          .put(
            `${this.apiUrl}/definitions/${this.$route.params.name}/properties`,
            {
              cronExpression: this.form.technical.cronExpression,
              multiExecution: this.form.technical.multiExecution == "true",
              rescuePeriod: this.form.technical.rescuePeriod,
              active: this.form.technical.active == "true",
            }
          )
          .then(this.$router.go())
          .catch(console.error);
      } else if (form == "settings") {
        axios
          .put(`${this.apiUrl}/definitions/${this.$route.params.name}/params`, {
            initialParams: this.form.settings,
          })
          .then(this.$router.go())
          .catch(console.error);
      }
    },
  },
};
</script>

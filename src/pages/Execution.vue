<template>
  <q-page padding>
    <div class="text-h4 q-gutter-x-md q-mx-auto row">
      <div class="col">{{ processLabel }} - Exécutions</div>
      <div class="col-auto">
        <q-tabs v-model="filterTab" inline-label class="text-primary q-mx-auto">
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

      <!--
        <q-btn round color="primary" icon="list" />
      <q-btn round color="primary" icon="error" />
      <q-btn round color="primary" icon="done" />
      <q-btn round color="primary" icon="help" />-->
    </div>
    <q-timeline color="primary">
      <q-timeline-entry
        v-for="execution in executions"
        :subtitle="execution.beginTime"
        :key="execution.preId"
        :icon="
          execution.status == 'DONE'
            ? 'done'
            : execution.status == 'ERROR'
            ? 'error'
            : 'help'
        "
      >
        <q-list bordered dense class="rounded-borders">
          <q-expansion-item
            expand-separator
            label="Learn more"
            @show="fetchActivities(execution.preId)"
            dense
            class="text-subtitle2"
          >
            <q-card>
              <q-separator />
              <q-card-section>
                <q-splitter v-model="splitterModel">
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
                        <q-timeline color="primary">
                          <q-timeline-entry
                            v-for="activity in activities[execution.preId]"
                            :key="activity.aceId"
                            :subtitle="activity.label"
                            :icon="
                              execution.status == 'RUNNING'
                                ? 'help'
                                : activity.status == 'DONE'
                                ? 'done'
                                : 'error'
                            "
                          >
                            <q-list bordered class="rounded-borders" dense>
                              <q-expansion-item
                                expand-separator
                                label="Learn more"
                                dense
                                class="text-weight-medium"
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
                                </q-card>
                              </q-expansion-item>
                            </q-list>
                          </q-timeline-entry>
                        </q-timeline>
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
        </q-list>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  created() {
    this.$axios
      .get(
        "http://localhost:8080/getting-started-vertigo/api/orchestra/executions/?processName=" +
          this.$route.params.name +
          "&limit=10"
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
      processLabel: "",
      filterTab: "all", // Tab for filtering executions
      executions: [],
      activities: {},
      tabs: {}, //Tabs for navigating inside execution
      splitterModel: 1
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
      this.$axios
        .get(
          `http://localhost:8080/getting-started-vertigo/api/orchestra/executions/?processName=${this.$route.params.name}&status=${status}&limit=10`
        )
        .then(res => {
          this.executions = this.formatExecutions(res.data);
          res.data.map(execution => {
            this.$set(this.tabs, execution.preId, "info");
          });
        });
    }
  }
};
</script>

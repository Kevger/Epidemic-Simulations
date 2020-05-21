<template>
  <v-app>
    <v-app-bar app>
      <v-col class="text-center" cols="12">
        <strong>Narrative Economics</strong>
      </v-col>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="12">
            <Explanation></Explanation>
          </v-col>
          <v-col cols="12">
            <SimulationSI></SimulationSI>
          </v-col>
          <v-col cols="12">
            <SimulationSIR></SimulationSIR>
          </v-col>
          <v-col cols="12">
            <SimulationSIS></SimulationSIS>
          </v-col>
          <v-col cols="12">
            <SimulationSIRD></SimulationSIRD>
          </v-col>
          <v-col cols="12">
            <SimulationSEIR></SimulationSEIR>
          </v-col>
          <v-col cols="12">
            <SimulationSEIS></SimulationSEIS>
          </v-col>
          <v-col cols="12">
            <SimulationMSIR></SimulationMSIR>
          </v-col>
          <v-col cols="12">
            <SimulationMSEIR></SimulationMSEIR>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Future of Making</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Explanation from "./components/Explanation.vue";
import SimulationSI from "./components/SimulationSI.vue";
import SimulationSIR from "./components/SimulationSIR.vue";
import SimulationSIS from "./components/SimulationSIS.vue";
import SimulationSIRD from "./components/SimulationSIRD.vue";
import SimulationSEIR from "./components/SimulationSEIR.vue";
import SimulationSEIS from "./components/SimulationSEIS.vue";
import SimulationMSIR from "./components/SimulationMSIR.vue";
import SimulationMSEIR from "./components/SimulationMSEIR.vue";

export default {
  name: "App",
  components: {
    Explanation,
    SimulationSI,
    SimulationSIR,
    SimulationSIS,
    SimulationSIRD,
    SimulationSEIR,
    SimulationSEIS,
    SimulationMSIR,
    SimulationMSEIR
  }
};
</script>

<style></style>

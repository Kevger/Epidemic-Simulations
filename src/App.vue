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
          <v-col v-for="component in allComponents" :key="component" cols="12">
            <component :is="component" />
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
  data() {
    return {
      allComponents: [
        "Explanation",
        "SimulationSI",
        "SimulationSIR",
        "SimulationSIS",
        "SimulationSIRD",
        "SimulationSEIR",
        "SimulationSEIS",
        "SimulationMSIR",
        "SimulationMSEIR"
      ]
    };
  },
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

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

    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn fab fixed right bottom v-on="on">?</v-btn>
      </template>
      <v-card raised="true" max-width="220">
        <v-container>
          <v-row dense>
            <v-col cols="12"> <strong>β</strong> = rate of infection </v-col>
            <v-col cols="12"> <strong>γ</strong> = recovery rate </v-col>
            <v-col cols="12"> <strong>μ</strong> = population dynamics </v-col>
            <v-col cols="12">
              <strong>δ</strong> = rate passive immunity
            </v-col>
            <v-col cols="12"> <strong>a</strong> = incubation rate </v-col>
            <v-col cols="12"> <strong>I₀</strong> = initial infected </v-col>
            <v-col cols="12"> <strong>time</strong> = sim. duration </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>

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

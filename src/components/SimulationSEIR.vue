<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Susceptible - Exposed - Infected - Recovered</v-card-title
          >
          <v-card-text>
            In this model the SIR model is extended to include Exposed (E), and
            four groups are modelled - Susceptible (S), Exposed (E), Infected
            (I) and Recovered (R). Susceptible people have a rate of infection
            <b>β</b> of being infected by infected people and to prematurely
            belong to the group of exposed people. Exposed persons are not yet
            infectious, cannot be reinfected, and with an incubation rate
            <b>a</b>, belong to the group of infected persons after some time.
            Infected persons have an infection rate β to infect other
            susceptible persons. β models both the chance of contact between
            people and the chance of successful transmission. Infected persons
            can recover with a recovery rate <b>γ</b> and belong to the group of
            recovering persons. The recovery rate can represent both the
            mortality rate and the recovery rate, since in this model, the
            recovering individuals are characterized by the absence of
            infectivity after infection, and this can be assumed from both dead
            and immune individuals. <b>μ</b> models here the normal population
            dynamics and describes how many people die (not related to the
            disease) and are born, thus, the dynamic behaviour of an epidemic
            can be represented in the model. <b>I₀</b> is the initial percentage
            of the initial population infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings SEIR</v-card-title>
          <v-container>
            <v-slider
              thumb-label
              v-model="b"
              min="0.0"
              max="4"
              step="0.01"
              label="β"
            ></v-slider>
            <v-slider
              thumb-label
              v-model="y"
              min="0.0"
              max="1"
              step="0.01"
              label="γ"
            ></v-slider>
            <v-slider
              thumb-label
              v-model="m"
              min="0.0"
              max="0.10"
              step="0.0005"
              label="μ"
            ></v-slider>
            <v-slider
              thumb-label
              v-model="a"
              min="0.0"
              max="1"
              step="0.01"
              label="a"
            ></v-slider>
            <v-slider
              thumb-label
              v-model="io"
              min="0.0"
              max="1"
              step="0.01"
              label="I₀"
            ></v-slider>
            <v-slider
              thumb-label
              v-model="time"
              min="10"
              max="1000"
              step="1"
              label="time"
            ></v-slider>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <div>
          <line-chart
            :dataset="{ pointRadius: 0 }"
            pointRadius="0"
            xtitle="Time"
            :data="simData"
          ></line-chart>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { simulation } from "./../plugins/compEpidemiology";

export default {
  data: () => {
    return {
      b: 0.3,
      y: 0.15,
      io: 0.1,
      time: 200,
      step: 0.5,
      a: 0.3,
      m: 0.0005
    };
  },
  methods: {},
  computed: {
    simData() {
      const data = [
        { name: "S", data: [[0, 1.0 - this.io]] },
        { name: "E", data: [[0, 0]] },
        { name: "I", data: [[0, this.io]] },
        { name: "R", data: [[0, 0]] }
      ];
      const seir = (dydt, y) => {
        dydt[0] = this.m - this.m * y[0] - this.b * y[2] * y[0];
        dydt[1] = this.b * y[0] * y[2] - (this.m + this.a) * y[1];
        dydt[2] = this.a * y[1] - (this.y + this.m) * y[2];
        dydt[3] = this.y * y[2] - this.m * y[3];
      };

      return simulation(data, seir, this.time, this.step);
    }
  }
};
</script>

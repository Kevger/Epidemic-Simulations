<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Susceptible - Infected - Susceptible</v-card-title>
          <v-card-text>
            In this model, two groups are modelled - susceptible (S) and
            infected (I). Infected people have a rate of infection <b>β</b> to
            infect other susceptible people. β models both the chance of contact
            between people and the chance of successful transmission. Infected
            persons can recover with a recovery rate <b>γ</b> and rejoin the
            group of infected persons. After a certain period of time, a balance
            between infected and susceptible persons is always established. β
            (together with γ) determines this balance, as well as the speed at
            which it is achieved. <b>I₀</b> is the percentage of the initial
            population which is infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings SIS</v-card-title>

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
            min="0"
            max="1"
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
      io: 0.01,
      time: 200,
      step: 0.5
    };
  },
  methods: {},
  computed: {
    simData() {
      const data = [
        { name: "S", data: [[0, 1.0 - this.io]] },
        { name: "I", data: [[0, this.io]] }
      ];
      const sis = (dydt, y) => {
        dydt[0] = -this.b * y[0] * y[1] + this.y * y[1];
        dydt[1] = this.b * y[0] * y[1] - this.y * y[1];
      };

      return simulation(data, sis, this.time, this.step);
    }
  }
};
</script>

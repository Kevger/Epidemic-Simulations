<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Susceptible - Infected</v-card-title>
          <v-card-text>
            In this model, the simplest of those presented here, two groups are
            modelled - susceptible (S) and infected (I). Once infected, a person
            remains permanently infected, infectious and can infect other
            people, inevitably infecting the entire population. The infection
            rate <b>β</b> alone determines the speed of spread. <b>I₀</b> is the
            percentage of the initial population which is infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings SI</v-card-title>
          <v-container>
            <v-slider
              thumb-label
              v-model="b"
              min="0.0"
              max="3"
              step="0.01"
              label="β"
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
      const si = (dydt, y) => {
        dydt[0] = -this.b * y[0] * y[1];
        dydt[1] = this.b * y[0] * y[1];
      };
      return simulation(data, si, this.time, this.step);
    }
  }
};
</script>

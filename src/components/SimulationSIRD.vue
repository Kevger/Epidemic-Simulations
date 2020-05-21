<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Susceptible - Infected - Recovered - Deceased</v-card-title
          >
          <v-card-text>
            In this model, an extension of the SIR model, three groups are
            modelled - susceptible (S) infected (I), recovered (R) and deceased
            (D). Susceptible persons have a rate of infection β of infected
            persons to be infected. Infected persons have a rate of infection
            <b>β</b> to infect other susceptible persons and can die with a
            mortality rate of <b>μ</b>. β models both the chance of contact
            between people and the chance of successful transmission. Infected
            persons can recover with a recovery rate of <b>γ</b> and belong to
            the group of recovering persons. Since already in the SIR model the
            recovered (R) can represent dead as well as living immune persons,
            this extension effectively adds nothing to the SIR model except for
            the information about deceased
            <b>
              I₀
            </b>
            is the initial percentage of the initial population infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings SIRD</v-card-title>
          <v-container>
            <v-slider
              thumb-label
              v-model="b"
              min="0.0"
              max="1"
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
              max="1"
              step="0.01"
              label="µ"
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
      m: 0.01,
      io: 0.01,
      time: 200,
      step: 0.5
    };
  },
  methods: {},
  computed: {
    simData() {
      const sird = (dydt, y) => {
        dydt[0] = -this.b * y[0] * y[1];
        dydt[1] = this.b * y[0] * y[1] - this.y * y[1] - this.m * y[1];
        dydt[2] = this.y * y[1];
        dydt[3] = this.m * y[1];
      };
      const data = [
        { name: "S", data: [[0, 1.0 - this.io]] },
        { name: "I", data: [[0, this.io]] },
        { name: "R", data: [[0, 0]] },
        { name: "D", data: [[0, 0]] }
      ];
      return simulation(data, sird, this.time, this.step);
    }
  }
};
</script>

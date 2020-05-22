<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Susceptible - Exposed - Infected - Susceptible</v-card-title
          >
          <v-card-text>
            Three groups are modelled in this model - susceptible (S), exposed
            (E) and infected (I). Compared to the SEIR model, individuals cannot
            become immune and are potentially reinfectable after successful
            recovery. Susceptible persons have a rate of infection
            <b>β</b> of being infected by infected persons and belonging
            prematurely to the exposed group. Exposed persons are not yet
            infectious, cannot be re-infected and belong to the group of
            infected persons with an incubation rate a after some time. Infected
            persons have an infection rate β to infect other susceptible
            persons. β models both the chance of contact between people and the
            chance of successful transmission. Infected persons can recover with
            a recovery rate <b>γ</b> and again belong to the group of
            susceptible persons. <b>μ</b> models here the normal population
            dynamics and describes how many people die (not related to the
            disease) and are born, thus, the dynamic behaviour of an epidemic
            can be represented in the model. <b>I₀</b> is the initial percentage
            of the initial population infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings SEIS</v-card-title>
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
      a: 0.3,
      m: 0.0005,
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
        { name: "E", data: [[0, 0]] },
        { name: "I", data: [[0, this.io]] }
      ];
      const seis = (dydt, y) => {
        dydt[0] = this.m - this.b * y[0] * y[2] - this.m * y[0] + this.y * y[2];
        dydt[1] = this.b * y[0] * y[2] - (this.a + this.m) * y[1];
        dydt[2] = this.a * y[1] - (this.y + this.m) * y[2];
      };

      return simulation(data, seis, this.time, this.step);
    }
  }
};
</script>

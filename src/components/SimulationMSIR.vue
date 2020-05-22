<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Maternally Immunity - Susceptible - Infected -
            Recovered</v-card-title
          >
          <v-card-text>
            In this model, an extension of the SIR model, four groups are
            modeled: maternal immune (M), susceptible (S) infected (I) and
            recovered (R). For some pathogens, such as measles, newborns with a
            certain chance cannot become infected because they receive maternal
            antibodies from the mother and thus temporarily develop a passive
            immunity. <b>μ</b> models here the normal population dynamics and
            describes how many people die (not related to the disease) and are
            born, thus, the dynamic behaviour of an epidemic can be represented
            in the model. Newborns M have a chance <b>δ</b> not to develop
            passive immunity or lose it and thus belong to the susceptible group
            S. Susceptible have an infection rate <b>β</b> of being infected by
            infected persons. Infected people have a rate of infection β to
            infect other susceptible people. β models both the chance of contact
            between people and the chance of successful transmission. Infected
            persons can recover with a recovery rate <b>γ</b> and belong to the
            group of recovering persons. The recovery rate can represent both
            the mortality rate and the recovery rate, since in this model, the
            recovering individuals are characterized by the absence of
            infectivity after infection, and this can be assumed from both dead
            and immune individuals. <b>I₀</b> is the initial percentage of the
            initial population infected.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="4" xl="4">
        <v-card>
          <v-card-title>Settings MSIR</v-card-title>
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
              v-model="d"
              min="0.0"
              max="1"
              step="0.01"
              label="δ"
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
      m: 0.0005,
      d: 0.3,
      time: 200,
      step: 0.5
    };
  },
  methods: {},
  computed: {
    simData() {
      const data = [
        { name: "M", data: [[0, 0]] },
        { name: "S", data: [[0, 1.0 - this.io]] },
        { name: "I", data: [[0, this.io]] },
        { name: "R", data: [[0, 0]] }
      ];
      const msir = (dydt, y) => {
        dydt[0] = this.m - (this.m + this.d) * y[0];
        dydt[1] = this.d * y[0] - this.b * y[1] * y[2] - this.m * y[1];
        dydt[2] = this.b * y[1] * y[2] - (this.y + this.m) * y[2];
        dydt[3] = this.y * y[2] - this.m * y[3];
      };

      return simulation(data, msir, this.time, this.step);
    }
  }
};
</script>

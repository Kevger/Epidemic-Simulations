const rk4 = require("ode-rk4");

export function simulation(data, diffEquations, time, stepSize = 0.1) {
  let integrator = rk4(
    data.reduce((acc, val) => {
      acc.push(val.data[0][1]);
      return acc;
    }, []),
    diffEquations,
    data[0].data[0][0],
    stepSize
  );

  for (let t = data[0].data[0][0] + stepSize; t <= time; t = t + stepSize) {
    integrator = integrator.step();
    data.forEach((e, i) => e.data.push([t, integrator.y[i]]));
  }
  return data;
}

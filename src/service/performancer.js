const initialState = {
  totalTime: {}
};

class Performancer {
  constructor() {
    this.statisticsData = initialState;
    this.isStatisticsOn = false;
    this.isDevMode = process.env.NODE_ENV !== "production";
  }

  start(name) {
    if (!this.isDevMode) return false;
    return performance.mark(`${name} start`);
  }

  end(name) {
    if (!this.isDevMode) return false;
    return performance.mark(`${name} end`);
  }

  measure(name) {
    if (!this.isDevMode) return false;
    if (this.isStatisticsOn) return false;
    const { duration } = performance.measure(
      `${name} measure`,
      `${name} start`,
      `${name} end`
    );

    this.statisticsData.totalTime[name] = this.statisticsData.totalTime[name]
      ? this.statisticsData.totalTime[name] + duration
      : duration;

    this.print();

    return this.statisticsData;
  }

  startTracking() {
    if (!this.isDevMode) return false;
    this.isStatisticsOn = true;
    return this.isStatisticsOn;
  }

  stopTracking() {
    if (!this.isDevMode) return false;
    this.isStatisticsOn = false;
    return this.isStatisticsOn;
  }

  print() {
    if (!this.isDevMode) return false;
    console.log("Total time:", this.statisticsData.totalTime);
    return this.statisticsData.totalTime;
  }

  clear() {
    if (!this.isDevMode) return false;
    this.statisticsData = initialState;
    return this.statisticsData;
  }
}

const performancer = new Performancer();

export default performancer;

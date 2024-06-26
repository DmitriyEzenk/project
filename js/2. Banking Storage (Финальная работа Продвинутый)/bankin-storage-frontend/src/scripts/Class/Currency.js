export class Currencys {
  constructor(emitter) {
    this.currencysMap = new Map();
    this.emitter = emitter;
  }

  setCurrency(json) {
    const currency = new Currency(json);
    this.currencysMap.set(
      this.getCurrencyKey(currency.from, currency.to),
      currency,
    );

    this.emitter.emit(
      'change',
      this.getCurrencyKey(currency.from, currency.to),
    );
  }

  getCurrency(key) {
    return this.currencysMap.get(key);
  }

  getCurrencyKey(from, to) {
    return `${from}/${to}`;
  }
}

export class Currency {
  constructor(json) {
    const data = JSON.parse(json);

    this.from = data.from;
    this.to = data.to;
    this.rate = data.rate;
    this.change = data.change;
  }

  getKey() {
    return `${this.from}/${this.to}`;
  }
}

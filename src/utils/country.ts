import { find, orderBy } from 'lodash';

let instance: any = null;

class Country {
  countryCodes: Array<String>[];
  countriesData: any;
  countries: any;

  static getInstance() {
    if (!instance) {
      instance = new Country();
    }
    return instance;
  }

  constructor() {
    this.countryCodes = [];
    this.countriesData = null;
  }

  setCustomCountriesData(json: any) {
    this.countriesData = json;
  }

  addCountryCode(code: any, dial_code: any, priority?: any) {
    if (!(dial_code in this.countryCodes)) {
      this.countryCodes[dial_code] = [];
    }

    const index = priority || 0;
    this.countryCodes[dial_code][index] = code;
  }

  getAll() {
    if (!this.countries) {
      this.countries = orderBy(
        this.countriesData || require('./countries.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.countries;
  }

  getCountryCodes() {
    if (!this.countryCodes.length) {
      this.getAll().map((country: any) => {
        this.addCountryCode(country.code, country.dial_code, country.priority);
        if (country.areaCodes) {
          country.areaCodes.map((areaCode: any) => {
            this.addCountryCode(country.code, country.dial_code + areaCode);
          });
        }
      });
    }
    return this.countryCodes;
  }

  getCountryDataByCode(code: any) {
    return find(this.getAll(), (country) => country.code === code);
  }

  getCountryDataByDialCode(dialCode: any) {
    return find(this.getAll(), (country) => country.dial_code === dialCode);
  }
}

export default Country.getInstance();

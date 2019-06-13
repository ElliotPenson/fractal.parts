import Cookies from 'js-cookie';

const timeToLive = 100; // days

export class Flag {
  constructor(key) {
    this.key = key;
  }

  get() {
    return Cookies.getJSON(this.key);
  }

  set(boolean) {
    return Cookies.set(this.key, boolean, { expires: timeToLive });
  }

  on() {
    this.set(true);
  }

  off() {
    this.set(false);
  }
}

export const preventWelcome = new Flag('preventWelcome');

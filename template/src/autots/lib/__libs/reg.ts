class Regular {
  private u = navigator.userAgent;

  public isAndroid() {
    return this.u.indexOf('Android') > -1 || this.u.indexOf('Adr') > -1;
  }

  public isiOS() {
    return !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  }

  public isAtzuche() {
    return this.u.indexOf('atzuche') > -1;
  }

  public isAtzucheIPhoneX() {
    return this.u.indexOf('iphonex') > -1;
  }
}

export default new Regular();

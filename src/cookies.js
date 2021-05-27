/**
 * Class cookie controller
 */
class Cookies {
  constructor() {
    const cookies = localStorage.getItem('cookies');
    this._cookiesAllowed = (cookies) ? cookies : '00';
    this._html = document.querySelector('html');
    this._analiticas = document.getElementById('analiticas');
    // console.log(`[z:cookies:${this._cookiesAllowed}]`);
  }

  /**
   * inicializa los eventos del dom
   */
  init() {
    window.addEventListener('load', () => this.initAllowCookies());
    document.getElementById('allowCookies').addEventListener('click', (e) => this.initAllowCookiesClick(e));
    document.addEventListener('scroll', () => this.initAllowCookiesScroll());
    document.querySelectorAll('input').forEach((item) => this.initAllowCookiesInputs(item));
  }

  /**
   * Comprueba si ha de mostrar la caja al cargar la página
   */
  initAllowCookies() {
    this.askCookies(true);
    if (this._cookiesAllowed[0] !== '0') {
      this._analiticas.checked = Number(this._cookiesAllowed[1]);
      this.allowCookies();
    }
  }

  /**
   * Click handler del boton de aceptar
   * @param {event} e - evento de click
   */
  initAllowCookiesClick(e) {
    e.preventDefault();
    this.allowCookies();
  }

  /**
   * Evento de scroll en la página
   */
  initAllowCookiesScroll() {
    if (this._html.scrollTop > 100) {
      this.allowCookies();
    }
  }

  /**
   * Al seleccionar un input se aceptan las cookies
   * @param item
   */
  initAllowCookiesInputs(item) {
    item.addEventListener('focus', () => {
      this.allowCookies();
    });
  }

  /**
   * Muestra o no la caja de aceptar cookies
   * @param {boolean} ask - Si o no muestra la caja
   */
  askCookies(ask) {
    let display = 'block';
    if (!ask || this._cookiesAllowed[0] !== '0') display = 'none';
    document.getElementById('cajaCookies').style.display = display;
  }

  /**
   * Fuerza mostrar la caja de aceptar cookies
   */
  askCookiesForce() {
    document.querySelector('input[name="masCookies"]').checked = true;
    document.getElementById('cajaCookies').style.display = 'block';
  }

  /**
   * Acepta las cookies y guarda la respuesta en localStorage
   * @param {boolean} allow - Si o no
   */
  allowCookies() {
    this._cookiesAllowed = `1${(this._analiticas.checked) ? 1 : 0}`;
    this.askCookies(false);
    localStorage.setItem('cookies', this._cookiesAllowed);
    if (this._cookiesAllowed[1] === '1') window.enableAnalytics();
  }

  /**
   * Devuleve si se han aceptado las cookies
   * @returns {boolean}
   */
  isCookiesAllowed() {
    return this._cookiesAllowed;
  }
}

/**
 * Se inicializa cuando el DOM está cargado
 */
document.addEventListener('DOMContentLoaded', () => (new Cookies()).init());
window.analyticsEnabled = false;
window.askCookies = (new Cookies()).askCookiesForce;
/**
 * modulo para poder hacer test
 * istanbul ignore next
 */
if (typeof exports !== 'undefined') {
  module.exports = new Cookies();
}

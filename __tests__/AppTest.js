/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const cookies = require('../src/cookies.js');
//---------------------------------------------------
const html = fs.readFileSync(path.join(__dirname, '../dist/index.php')).toString();
const cookies_html = fs.readFileSync(path.join(__dirname, '../src/cookies.html')).toString();
document.body.innerHTML = html.replace('<?php include_once "./src/cookies.html"; ?>', cookies_html);
window.enableAnalytics = () => {
};
cookies.init();
cookies._html = document.querySelector('html');
cookies._input = document.getElementById('analiticas');
//---------------------------------------------------
test('cookies class', () => {
  expect(typeof cookies).toBe('object');
});
test('isCookiesAllowed', () => {
  cookies.initAllowCookies();
  expect(cookies.isCookiesAllowed()).toBeFalsy();
  cookies._cookiesAllowed = true;
  cookies.initAllowCookies();
  expect(cookies.isCookiesAllowed()).toBeTruthy();
});
test('initAllowCookiesClick', () => {
  cookies.allowCookies(false);
  cookies.initAllowCookiesClick(new Event('click'));
  expect(cookies.isCookiesAllowed()).toBeTruthy();
});
test('initAllowCookiesScroll', () => {
  cookies.allowCookies(false);
  cookies._html.scrollTop = 0;
  cookies.initAllowCookiesScroll();
  expect(cookies.isCookiesAllowed()).toBeFalsy();
  cookies._html.scrollTop = 101;
  cookies.initAllowCookiesScroll();
  expect(cookies.isCookiesAllowed()).toBeTruthy();
});
test('initAllowCookiesInputs', () => {
  cookies.allowCookies(false);
  let item = document.querySelector('#nombre');
  cookies.initAllowCookiesInputs(item);
  item.focus();
  expect(cookies.isCookiesAllowed()).toBeTruthy();
});

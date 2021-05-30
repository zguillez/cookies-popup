/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const cookies = require('../src/cookies.js');
//---------------------------------------------------
const html = fs.readFileSync(path.join(__dirname, '../dist/index.php')).toString();
const cookies_html = fs.readFileSync(path.join(__dirname, '../src/cookies.html')).toString();
document.body.innerHTML = html.replace('<?php include_once "./inc/cookies.html"; ?>', cookies_html);
window.enableAnalytics = () => {};
cookies.init();
cookies._html = document.querySelector('html');
cookies._analiticas = document.getElementById('analiticas');
//---------------------------------------------------
test('cookies class', () => {
  expect(typeof cookies).toBe('object');
});
test('isCookiesAllowed', () => {
  cookies.initAllowCookies();
  expect(cookies.isCookiesAllowed()).toBe('00');
  cookies._cookiesAllowed = '11';
  cookies.initAllowCookies();
  expect(cookies.isCookiesAllowed()).toBe('11');
});
test('initAllowCookiesClick', () => {
  cookies.allowCookies();
  cookies.initAllowCookiesClick(new Event('click'));
  expect(cookies.isCookiesAllowed()).toBeTruthy();
});
test('initAllowCookiesScroll', () => {
  cookies.allowCookies();
  cookies._html.scrollTop = 0;
  cookies.initAllowCookiesScroll();
  expect(cookies.isCookiesAllowed()).toBe('00');
  cookies._html.scrollTop = 101;
  cookies.initAllowCookiesScroll();
  expect(cookies.isCookiesAllowed()).toBe('11');
});
test('initAllowCookiesInputs', () => {
  cookies.allowCookies();
  const item = document.querySelector('#nombre');
  cookies.initAllowCookiesInputs(item);
  item.focus();
  expect(cookies.isCookiesAllowed()).toBe('11');
});

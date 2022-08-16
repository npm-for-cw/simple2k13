
/**
 * @jest-environment jsdom
 */
import { env } from '../..'

describe('test env', () => {
  test('all true', () => {
    expect(env('ipad;mobile;phone;android;iphone;windows mobile;micromessenger', 'Win;Mac;Linux;X11')).toEqual({
      isWin: true,
      isMac: true,
      isLinux: true,
      isIpad: true,
      isMobile: true,
      isAndroid: true,
      IsIphone: true,
      isWM: true,
      isWeChat: true,
    })
  })
})
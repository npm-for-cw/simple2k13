import { importScript } from '../..'

const url = 'https://cdn.jsdelivr.net/npm/simple2k13/dist/simple.min.js'
const name = 'simple'
describe('importScript', () => {
  importScript(url, name)
  importScript(url, name)
  importScript(url, name)
  importScript(url, name)
  importScript(url, name)
  const el = document.querySelector(`#script${name}`) as HTMLScriptElement
  const script = document.querySelectorAll('script')
  console.log(el, script.length)
  test('https', () => {
    expect(el?.src).toBe(url)
    expect(script.length).toBe(1)
    importScript(url, name + '2')
    expect(document.querySelectorAll('script').length).toBe(2)
  })
})
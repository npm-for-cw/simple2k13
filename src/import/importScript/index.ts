
type ScriptAttributes<T = HTMLScriptElement> = {
  [K in keyof T]?: T[K]
}
type AttributeObject = Pick<ScriptAttributes, 'async' | 'charset' | 'crossOrigin' | 'defer' | 'noModule' | 'src' | 'type'>

const importScript = (url: string, name: string, attributes: AttributeObject) => {
  if (name) {
    name = `#script${name}`
    if (!!document.querySelector(name)) return
  }
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  name && script.setAttribute('id', name)
  for (const [key, value] of Object.entries(attributes)) {
    //@ts-ignore
    script.setAttribute(key, value);
  }
  document.querySelector('head')?.appendChild(script);
}
export default importScript

declare module '*.json' {
  const version: string;
  export {
    version
  }
  export default {version};
}
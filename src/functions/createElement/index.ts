

type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

type WritablePart<T> = Pick<T, WritableKeysOf<T>>;


type TagNames = keyof HTMLElementTagNameMap

type HTMLElements = HTMLElementTagNameMap[TagNames]

type CreateElement = Partial<HTMLElements> & { tagName?: TagNames }

const createElement = (options?: CreateElement) => {
  const { tagName = 'div', ...reset } = options || {}
  const element = document.createElement(tagName)
  for (const [key, value] of Object.entries(reset)) {
    // const [key, value] = item as [keyof WritablePart<HTMLElements>, any]
    // @ts-ignore
    element[key] = value
  }
  return element
}
export default createElement
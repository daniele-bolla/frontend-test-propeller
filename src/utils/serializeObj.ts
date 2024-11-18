function propsToString(obj: Record<string|number|symbol, string|number>) {
  return Object.keys(obj).reduce(
    (a, k: string) => {
      a[k] = `${obj[k]}`
      return a
    },
    {} as Record<string, string>
  )
}
export function serializeObj(obj: Record<string|number|symbol, string|number>) {
  return new URLSearchParams(propsToString(obj))
}

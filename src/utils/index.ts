export const trimObjectValues = (object: any) =>
  Object.keys(object).reduce((acc, curr) => {
    acc[curr] =
      typeof object[curr] === 'string'
        ? object[curr].trim() || undefined
        : object[curr] || undefined
    return acc
  }, {} as any)

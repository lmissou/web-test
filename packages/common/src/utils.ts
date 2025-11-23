export function getCodeOptions(codes: { [key: string]: any }) {
  return Object.keys(codes).map((key) => {
    const lastIndex = key.lastIndexOf('/');
    const label = key.substring(lastIndex ? lastIndex + 1 : 0, key.length);
    return {
      value: key,
      label,
      content: codes[key],
    };
  });
}

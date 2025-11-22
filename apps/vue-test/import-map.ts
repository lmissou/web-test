const importMap = {
  imports: {},
};

try {
  // @ts-ignore
  const importMapLib = await import('../../packages/lib/import-map-lib.json');
  // @ts-ignore
  Object.assign(importMap.imports, importMapLib.imports);
} catch (err) {
  console.log(
    'import-map-lib.json not found. Please run npm script "build:lib" to generage it.'
  );
}

export default importMap;

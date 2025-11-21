export default function rollupPluginImportMapGen(prefix: string) {
  return {
    name: 'vite-plugin-import-map-gen',
    buildEnd() {
      const fs = (this as any).fs;
      const buildConfig = (this as any).environment.config.build;
      const outDir = buildConfig.outDir;
      const entry = buildConfig.lib?.entry;
      if (!entry) return;
      const imports: any = {};
      Object.keys(entry).forEach((key) => {
        imports[key] = `${prefix}${key}.js`;
      });
      fs.writeFile('import-map-lib.json', JSON.stringify({ imports }, null, 2));
    },
  };
}

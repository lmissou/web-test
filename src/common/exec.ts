interface IVueModuleProps {
  component: string;
  render?: string;
}

function getCodeBlobUrl(code: string) {
  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  return url;
}

// 执行代码
export function exec(code: string) {
  const url = getCodeBlobUrl(code);
  import(url).finally(() => {
    URL.revokeObjectURL(url);
  });
}
// 执行vue组件代码（挂载）
export function execVue(
  id: string,
  containerSelector: string,
  modules: IVueModuleProps
) {
  const compUrl = getCodeBlobUrl(modules.component);
  const renderUrl = modules.render ? getCodeBlobUrl(modules.render) : '';
  let codeResult = `import { createApp, defineComponent } from 'vue';
import * as Vue from 'vue';\n`;
  codeResult += `import _sfc_main from "${compUrl}"\n`;
  if (renderUrl) {
    codeResult += `import { render as _sfc_render } from "${renderUrl}"\n
_sfc_main.render = _sfc_render;\n`;
  }
  codeResult += `_sfc_main.__scopeId = 'data-v-${id}';\n`;
  codeResult += `\n
const app = createApp(_sfc_main);
app.mount('${containerSelector}');\n`;
  const resultUrl = getCodeBlobUrl(codeResult);
  import(resultUrl).finally(() => {
    URL.revokeObjectURL(compUrl);
    URL.revokeObjectURL(renderUrl);
    URL.revokeObjectURL(resultUrl);
  });
}

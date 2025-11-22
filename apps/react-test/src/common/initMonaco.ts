import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

function initMonaco() {
  if (window.MonacoEnvironment) {
    return;
  }
  window.MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === 'javascript' || label === 'typescript') {
        return new tsWorker();
      }
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'html') {
        return new htmlWorker();
      }
      if (label === 'css') {
        return new cssWorker();
      }
      return new editorWorker();
    },
  };
}
initMonaco();

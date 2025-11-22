import { parse, compileScript, compileStyle, compileTemplate } from '@vue/compiler-sfc';

// 编译vue组件
export default function (codeStr: string, id: string = 'tmp') {
  const parseResult = parse(codeStr, {
    filename: id,
  });
  const descriptor = parseResult.descriptor;
  // 样式是否有scoped
  let scoped = false;
  // 处理新样式，添加到head
  const styles: any[] = descriptor.styles.map((style) => {
    if (style.scoped) {
      scoped = true;
    }
    const styleResult = compileStyle({
      id,
      source: style.content,
      scoped: !!style.scoped,
      filename: id,
    });
    return styleResult;
  });
  // 编译组件代码和模板
  const script = compileScript(descriptor, { id });
  // 编译模板
  const template = compileTemplate({
    id,
    filename: id,
    source: descriptor.template?.content ?? '',
    scoped,
    compilerOptions: {
      bindingMetadata: {
        ...script.bindings,
        __isScriptSetup: script.setup ? true : undefined,
      } as any,
    },
  });
  return { render: template.code, component: script.content, styles };
}

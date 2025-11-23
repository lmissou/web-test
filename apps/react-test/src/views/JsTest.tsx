import { useState } from 'react';
import { exec, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/js/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function JsTest() {
  const [codeContent, setCodeContent] = useState('');
  const [codeOptions] = useState<any[]>(() => getCodeOptions(codes));
  function handleEval(code: string) {
    exec(code);
  }
  return (
    <PlayGround value={codeContent} codeOptions={codeOptions} onChange={setCodeContent} onEval={handleEval}>
      <div id="jslog-container" className="flex-1"></div>
    </PlayGround>
  );
}

export default JsTest;
export const meta = {
  title: 'js测试',
};

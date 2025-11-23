import { useState } from 'react';
import { exec } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/echarts/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function EchartsTest() {
  const [codeContent, setCodeContent] = useState('');
  const [codeOptions] = useState<any[]>(() =>
    Object.keys(codes).map((key) => ({
      value: key,
      label: key,
      content: codes[key],
    }))
  );
  function handleEval(code: string) {
    exec(code);
  }
  return (
    <PlayGround value={codeContent} codeOptions={codeOptions} onChange={setCodeContent} onEval={handleEval}>
      <div id="echarts-container" className="flex-1"></div>
    </PlayGround>
  );
}

export default EchartsTest;
export const meta = {
  title: 'echarts测试',
};

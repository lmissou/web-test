import { useState } from 'react';
import { exec } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/g6/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function G6Test() {
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
      <div id="g6-container" className="flex-1"></div>
    </PlayGround>
  );
}

export default G6Test;
export const meta = {
  title: 'echarts测试',
};

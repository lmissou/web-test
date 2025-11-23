import { useEffect, useState, type PropsWithChildren } from 'react';
import { Select, Splitter } from 'antd';
import { PlayCircleOutlined, SwapOutlined } from '@ant-design/icons';
import MonacoEditor from './MonacoEditor';

type Props = PropsWithChildren<{
  value: string;
  onChange: (val: string) => void;
  // 编辑器配置选项
  editorOptions?: any;
  // 代码选项列表
  codeOptions?: any[];
  // 执行代码
  onEvel?: (code: string) => void;
}>;

function PlayGround(props: Props) {
  const [splitDirection, setSplitDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  function toggleDirection() {
    setSplitDirection(splitDirection === 'vertical' ? 'horizontal' : 'vertical');
  }
  const [codeSelect, setCodeSelect] = useState('');
  useEffect(() => {
    console.log(codeSelect)
    if (props.codeOptions?.length! > 0) {
      setCodeSelect(props.codeOptions?.[0].value);
      props.onChange?.(props.codeOptions?.[0].content);
    }
  }, []);
  function handleCodeChange(value: string, option: any) {
    setCodeSelect(value);
    props.onChange?.(option.content);
  }
  function handleRun() {
    props.onEvel?.(props.value);
  }
  return (
    <Splitter orientation={splitDirection}>
      <Splitter.Panel className="flex flex-col">
        <div className="flex flex-row justify-between items-center m-2.5 text-base">
          <div className="flex flex-row justify-end items-center gap-1">
            <Select size="small" style={{ width: 200 }} options={props.codeOptions ?? []} value={codeSelect} onChange={handleCodeChange} />
          </div>
          <div className="flex flex-row justify-end items-center gap-1">
            <SwapOutlined onClick={toggleDirection} />
            <PlayCircleOutlined onClick={handleRun} />
          </div>
        </div>
        <MonacoEditor value={props.value} onChange={props.onChange} />
      </Splitter.Panel>
      <Splitter.Panel className="flex flex-col">
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-auto">{props.children}</div>
      </Splitter.Panel>
    </Splitter>
  );
}

export default PlayGround;

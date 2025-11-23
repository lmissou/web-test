import { useEffect, useState, type PropsWithChildren } from 'react';
import { Select, Splitter } from 'antd';
import { PlayCircleOutlined, SwapOutlined } from '@ant-design/icons';
import MonacoEditor from './MonacoEditor';
import { usePlayGroundStore } from '@/store/playGround';

type Props = PropsWithChildren<{
  value: string;
  onChange: (val: string) => void;
  // 编辑器配置选项
  editorOptions?: any;
  // 代码选项列表
  codeOptions?: any[];
  // 执行代码
  onEval?: (code: string) => void;
}>;

function PlayGround(props: Props) {
  const splitDirection = usePlayGroundStore((state) => state.splitDirection);
  const setSplitDirection = usePlayGroundStore((state) => state.setSplitDirection);
  const splitSize = usePlayGroundStore((state) => state.splitSize);
  const setSplitSize = usePlayGroundStore((state) => state.setSplitSize);
  function toggleDirection() {
    setSplitDirection(splitDirection === 'vertical' ? 'horizontal' : 'vertical');
  }
  function handleSplitterResize(sizes: number[]) {
    const firstSize = sizes?.[0] ?? 0;
    const totalSize = sizes?.reduce((res, num) => res + num, 0) ?? 0;
    setSplitSize((firstSize / totalSize) * 100);
  }
  const [showDefSlot, setShowDefSlot] = useState(true);
  function refreshDefSlot() {
    setShowDefSlot(false);
    setTimeout(() => {
      setShowDefSlot(true);
    });
  }
  const [codeSelect, setCodeSelect] = useState('');
  useEffect(() => {
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
    refreshDefSlot();
    props.onEval?.(props.value);
  }
  return (
    <Splitter orientation={splitDirection} onResizeEnd={handleSplitterResize}>
      <Splitter.Panel className="flex flex-col" defaultSize={`${splitSize}%`}>
        <div className="flex flex-row justify-between items-center m-2.5 text-base">
          <div className="flex flex-row justify-end items-center gap-1">
            <Select size="small" style={{ width: 200 }} options={props.codeOptions ?? []} value={codeSelect} onChange={handleCodeChange} />
          </div>
          <div className="flex flex-row justify-end items-center gap-1">
            <SwapOutlined onClick={toggleDirection} />
            <PlayCircleOutlined onClick={handleRun} />
          </div>
        </div>
        <MonacoEditor value={props.value} editorOptions={props.editorOptions} onChange={props.onChange} />
      </Splitter.Panel>
      <Splitter.Panel className="flex flex-col" defaultSize={`${100 - splitSize}%`}>
        <div className="flex flex-col flex-1 min-w-0 min-h-0 overflow-auto">{showDefSlot ? props.children : ''}</div>
      </Splitter.Panel>
    </Splitter>
  );
}

export default PlayGround;

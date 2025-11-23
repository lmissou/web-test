import React from 'react';
const { useState } = React;
import { Button } from 'antd';

const styleStr = `
.test-wrap {
  width: 100%;
  height: 100%;
  color: red;
}
`;

function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="test-wrap">
      <style>{styleStr}</style>
      <div>Num: {num}</div>
      <Button onClick={() => setNum(num - 1)}>-</Button>
      <Button onClick={() => setNum(num + 1)}>+</Button>
    </div>
  );
}

export default App;

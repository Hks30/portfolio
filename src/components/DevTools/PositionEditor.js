import React, { useState } from 'react';
import styled from 'styled-components';

const EditorPanel = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(0,0,0,0.8);
  padding: 10px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
`;

const PositionEditor = ({ onUpdatePosition }) => {
  const [selectedId, setSelectedId] = useState(1);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const handleUpdate = () => {
    onUpdatePosition(selectedId, { x: parseInt(xPos), y: parseInt(yPos) });
  };

  return (
    <EditorPanel>
      <div>
        <label>ID: </label>
        <input type="number" value={selectedId} onChange={e => setSelectedId(e.target.value)} />
      </div>
      <div>
        <label>X: </label>
        <input type="number" value={xPos} onChange={e => setXPos(e.target.value)} />
      </div>
      <div>
        <label>Y: </label>
        <input type="number" value={yPos} onChange={e => setYPos(e.target.value)} />
      </div>
      <button onClick={handleUpdate}>Update Position</button>
    </EditorPanel>
  );
};

export default PositionEditor;
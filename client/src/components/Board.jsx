import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import {ACTIONS} from '../Actions';
import toast from 'react-hot-toast';
import { Code2 } from 'lucide-react';

const Board = ({ socket, roomId, setBoard }) => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    
    if(socket) {
      socket.on(ACTIONS.BOARD_CHANGE, ({slines}) => {
        if(slines !== undefined) {
          setLines(slines);
        }
      })
    }
  }, [])

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if(socket === null || socket === undefined)
      return;

    socket.emit(ACTIONS.BOARD_CHANGE, {
      roomId,
      lines,
    });
  };

  const cleanBoard = () => {
    setLines([]);    
    const lines = [];
    socket.emit(ACTIONS.BOARD_CHANGE, {
      roomId,
      lines,
    });
  }

  return (
    <div className="flex flex-col h-full w-full">

      <div className="flex items-center justify-between px-4 p-2 space-x-4 bg-transparent h-12 border-l-teal-200 border-l-2">
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
          className="rounded-lg px-2 py-1 font-semibold bg-teal-600 text-white shadow-xl"
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <button className="bg-red-600 text-slate-100 font-semibold px-4 py-1 rounded-md text-sm hover:bg-red-700" onClick={() => cleanBoard()}>Clear</button>
        <div className="md:hidden flex-1 flex justify-end items-center text-teal-800">
          <Code2 onClick={() => setBoard(false)} />
        </div>
      </div>

    <div className=" bg-slate-800/85 overflow-y-hidden overflow-x-auto h-full w-full">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#FF4C29"
              strokeWidth={line.tool === "eraser" ? 15: 5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
      
    </div>
  );
};

export default Board
import { useRef } from 'react'
import Editor from "@monaco-editor/react";
import {ACTIONS} from '../Actions';

const CodeEditor = ({ socket, roomId }) => {
  const editorRef = useRef(null);

  const default_snip =
    `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
}
`

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    if(socket && editorRef.current) {
      socket.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if(code !== null && code !== undefined) {
          editorRef.current.setValue(code);
        }
      })
    }
  }

  const handleEditorChange = (value, event) => {
    if(event.isFlush === true || socket === null || socket === undefined)
      return;

    socket.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      value,
    })
  }

  return (
    <div className='flex h-full w-full bg-red-400'>
      <Editor
      theme="vs-dark"
      height="100%"
      width="100%"
      defaultLanguage="cpp"
      defaultValue={default_snip}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
    </div>
    
  )
}

export default CodeEditor
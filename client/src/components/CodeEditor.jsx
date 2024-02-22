import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { ACTIONS } from "../Actions";
import { PanelBottomClose, PanelBottomOpen, PencilLine } from "lucide-react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../languages";
import axios from 'axios';
import {RotatingLines} from 'react-loader-spinner';
import toast from "react-hot-toast";

const CodeEditor = ({ socket, roomId, setBoard }) => {
  const editorRef = useRef(null);

  const [language, setLanguage] = useState("cpp14"); 
  const [snippet, setSnippet] = useState(CODE_SNIPPETS[language]); 
  const [results, setResults] = useState(false);
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);

  const languages = Object.entries(LANGUAGE_VERSIONS);

    const toggleSlide = () => {
        setResults(!results);
    }


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    if (socket && editorRef.current) {
      socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null && code !== undefined) {
          editorRef.current.setValue(code);
        }
      });
    }
  }

  const handleEditorChange = (value, event) => {
    if (event.isFlush === true || socket === null || socket === undefined)
      return;

    socket.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      value,
    });
  };

  const runCODE = async () => {

    setResults(true);
    setLoading(true);

    const options = {
      method: 'POST',
      url: import.meta.env.VITE_OUTPUT_FETCH_URL,
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
      },
      data: {
        language: language,
        version: 'latest',
        code: editorRef.current?.getValue(),
        input: input
      }
    };
    
    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setLoading(false);
      setOutput(response.data.output);
    } catch (error) {
      toast.error(error);
    }
    

  }

  return (
    <div className="flex flex-col h-full w-full relative justify-end">
      <div className="flex items-center h-12 p-2 pl-8 pr-4 justify-start space-x-4">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setSnippet(CODE_SNIPPETS[e.target.value]);
            editorRef.current.setValue(CODE_SNIPPETS[e.target.value]);
          }}
          className="rounded-lg px-2 py-1 font-semibold bg-teal-600 text-white shadow-2xl shadow-teal-800"
        >
        {
          languages.map((lang) => {
            return (<option value={lang[0]} key={lang[1]}>{lang[1]}</option>)
          })
        }
        </select>
        <button className="bg-teal-700 text-slate-100 font-semibold px-4 py-1.5 border-2 border-teal-200 rounded-md text-sm hover:bg-teal-800" onClick={runCODE}>
          Run
        </button>

        <div className="md:hidden inline-flex flex-1 justify-end items-center text-teal-800">
          <PencilLine onClick={() => setBoard(true)} />
        </div>
      </div>
      <div className="h-9/10 flex-1 z-0 overflow-auto">
        <Editor
          theme="vs-dark"
          height="100%"
          width="100%"
          defaultLanguage={LANGUAGE_VERSIONS[language]}
          defaultValue={snippet}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className="h-auto absolute w-full bg-slate-700/80 ">
        <div className={`${(results) ? 'h-72' : ''} w-full flex flex-col`}>
            <div className="h-10 flex items-center justify-end font-bold bg-slate-700">
                <div className="flex-1 flex justify-center text-slate-100/80">Input</div>
                <div className="w-3/5 flex justify-center text-slate-100/80">Output</div>
                <div className="absolute cursor-pointer px-4 text-teal-300/80" onClick={toggleSlide}>
                {(!results) ? <PanelBottomOpen /> : <PanelBottomClose />}
                </div>
            </div>
            <div className={`h-5/6 w-full ${(results) ? 'flex' : 'hidden'}`}>
              <div className="bg-cyan-400/50 flex-1 ">
                    <textarea className="h-full w-full p-2 overflow-auto resize-none bg-slate-100/50 text-slate-700 font-semibold placeholder-slate-700/50" placeholder="Type input separated by a white-space" id="codeResults" onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="bg-teal-400/50 w-3/5">
                  {(loading) ? 
                  <div className="h-full w-full flex justify-center items-center">
                  <RotatingLines
                    visible={true}
                    height="72"
                    width="72"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  </div>
                   :
                  ((output !== '') && <div className="h-full w-full overflow-auto p-2 font-semibold" id="codeResults2">{output}</div>)}
                </div>  
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

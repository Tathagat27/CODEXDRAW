import { Expand, Menu, Plus, Send, Shrink } from "lucide-react"
import toast from "react-hot-toast"
import logo from '../../public/codexDrawFavicon.png'


function Sidebar({expanded, setExpanded, users, room_code, fullScreen, setFullscreen, element}) {

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code)
    toast.success("Room code copied to clipboard!")
  }

  const toggleScreenMode = () => {

    if(fullScreen){
      setFullscreen(false);
      document.exitFullscreen();
    }else{
      setFullscreen(true);
      element.requestFullscreen();
    }

  }

  return (
    <div className="flex flex-col h-full w-full">
        <div className="flex justify-center items-center h-12 p-2 bg-slate-800 text-teal-400 font-bold cursor-pointer">
         <Menu onClick={() => setExpanded(!expanded)} />
        </div>

        <div id="sidebar_users" className="flex-1 flex flex-col items-center overflow-auto scroll-none bg-slate-800 py-2">
        {
          users.map((user) => (
              <div key={user.socketId} className="bg-gray-700/50 rounded-[50%] hover:rounded-md my-2 hover:text-white/80 hover:bg-teal-500 transition-all delay-100 ease-in-out select-none min-h-10 w-10 flex justify-center items-center shadow-lg font-extrabold text-2xl text-teal-400 group">
            {user?.username?.charAt(0).toUpperCase()}
            <span className="absolute w-auto m-2 px-2 py-1 left-12 rounded-md shadow-md text-slate-300 bg-gray-800 text-sm font-semibold transition-all duration-100 origin-left z-10 scale-0 group-hover:scale-100">{user.username}</span>
            </div>
            
            
          ))
        }        

        <button className="bg-gray-700/50 rounded-[50%] hover:rounded-md hover:text-white/80 hover:bg-teal-500 transition-all delay-250 ease-in-out select-none min-h-10 w-10 flex justify-center items-center my-2 shadow-lg font-light text-teal-400 group" onClick={() => copyRoomCode(room_code)} >
        <Plus />
            <span className="absolute w-auto m-2 px-2 py-1 left-12 rounded-md shadow-md text-slate-300 bg-gray-800 text-xs font-semibold transition-all duration-100 origin-left z-10 scale-0 group-hover:scale-100">Add another 🧑🏻‍💻</span>
        </button>

        <button className="bg-gray-700/50 rounded-[50%] hover:rounded-md hover:text-white/80 hover:bg-teal-500 transition-all delay-250 ease-in-out select-none min-h-10 w-10 flex justify-center items-center my-2 shadow-lg font-light text-teal-400 group" onClick={toggleScreenMode} >
        {(fullScreen) ? <Shrink className="h-6" /> : <Expand className="h-6" />}
            <span className="absolute w-auto m-2 px-2 py-1 left-12 rounded-md shadow-md text-slate-300 bg-gray-800 text-xs font-semibold transition-all duration-100 origin-left z-10 scale-0 group-hover:scale-100">{(fullScreen) ? 'Exit Fullscreen Mode' : 'Fullscreen Mode'}</span>
        </button>
            
        </div>

        <div className="h-10 flex justify-center items-center bg-slate-800 p-2">
            <div className="bg-slate-800/50 m-2 flex justify-center items-center font-extrabold rounded-[50%] ">
              <img src={logo} alt="codexdraw logo" className="animate-bounce select-none" />
            </div>
        </div>
    
    </div>
  )
}

export default Sidebar
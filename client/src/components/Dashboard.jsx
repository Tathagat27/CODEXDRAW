import logo from '../assets/codexDrawcropedAdobe.svg'
import {Copy, XCircle} from 'lucide-react'
import User from '../components/User'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = ({ users, room_code, expanded, setExpanded }) => {
  const navigateTo = useNavigate();

  // console.log(users,room_code);

  function handleExit() {
    navigateTo('/');
    window.location.reload();
  }

  const copyRoomCode = (code) => {
    navigator.clipboard.writeText(code)
    toast.success("Room code copied to clipboard!")
  }

  return (
    <div className="flex flex-col h-full w-full bg-teal-800/80 rounded-r-2xl">
      <div className="flex pl-4 items-center h-12 p-2 bg-cyan-200/90 rounded-tr-2xl">
        <span className='absolute z-10 text-teal-900 cursor-pointer'><XCircle onClick={() => setExpanded(!expanded)} /></span>
        <img className="h-10 w-full mix-blend-multiply select-none" src={logo} alt='logo'/>
        {/* <button className={styles.menu}><img src={menu_close} alt='menu_close' /></button> */}
      </div>
      <div className='flex-1 w-full h-full flex justify-center overflow-auto shadow-inner shadow-teal-500 p-2' id='dashboardUsersScroll'>
        <div className='w-4/5 grid grid-cols-2 gap-4 auto-rows-max'>
        {users.map((user) => <User key={user.socketId} username={user.username} />)}
      </div>
      </div>
      

      <div className='flex flex-col h-30 bg-cyan-200/90 space-y-2 shadow-2xl py-2 rounded-br-2xl'>
        <p className="text-center text-slate-700 font-bold select-none ">Room Code</p>
        <div className="flex px-1 rounded-lg overflow-auto">
          <p className='bg-slate-200 rounded-l-lg shadow-inner shadow-slate-700 font-semibold p-2 text-teal-700 w-full '>{room_code}</p>
          <button onClick={() => copyRoomCode(room_code)} className='text-white bg-slate-700 hover:bg-slate-600 p-2 rounded-r-lg'><Copy /></button>
        </div>
        <button onClick={handleExit} className="bg-red-600 hover:bg-red-700 self-center w-2/3 text-white font-bold py-1 px-4 border border-red-700 rounded">{` Exit`}</button>
      </div>
      
      
    </div>
  )
}

export default Dashboard
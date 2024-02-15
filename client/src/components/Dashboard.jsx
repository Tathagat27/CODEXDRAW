import logo from '../assets/codexDrawcropedAdobe.svg'
import {Copy} from 'lucide-react'
import User from '../components/User'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Dashboard = ({ users, room_code }) => {
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
    <div className="flex flex-col h-full w-full bg-slate-100/30">
      <div className="items-center p-2 bg-slate-100/25">
        <img className="w-full mix-blend-multiply" src={logo} alt='logo'/>
        {/* <button className={styles.menu}><img src={menu_close} alt='menu_close' /></button> */}
      </div>

      <div className='flex-1 overflow-auto grid grid-cols-2 auto-rows-max gap-2 shadow-inner shadow-teal-500 p-2'>
        {users.map((user) => <User key={user.socketId} username={user.username} />)}
      </div>

      <div className='flex flex-col bg-white/35 space-y-2 shadow-2xl py-2'>
        <p className="text-center text-slate-600 font-bold select-none text-">Room Code</p>
        <div className="flex px-1 rounded-lg">
          <p className='bg-slate-200 rounded-l-lg shadow-inner shadow-slate-700 text-teal-700 w-full '>{room_code}</p>
          <button onClick={() => copyRoomCode(room_code)} className='text-white bg-slate-500 hover:bg-slate-600 p-2 rounded-r-lg'><Copy /></button>
        </div>
        <button onClick={handleExit} className="bg-red-500 hover:bg-red-700 self-center w-2/3 text-white font-bold py-1 px-4 border border-red-700 rounded">{` Exit`}</button>
      </div>
      
      
    </div>
  )
}

export default Dashboard
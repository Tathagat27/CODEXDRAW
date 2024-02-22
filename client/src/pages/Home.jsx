import { useState } from 'react';
import logo from '../assets/codexDrawcropedAdobe.svg'
import { v4 } from 'uuid';
import Join from '../components/Join';
import Create from '../components/Create';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Home() {

  const [enterCategory, setEnterCategory] = useState('join');
  const [username, setUsername] = useState('');  
  const [roomId, setRoomId] = useState('');

  const navigate = useNavigate();

  const joinRoom = () => {
    if((!roomId || !username)) {
        toast.error('Username and room id is required');
      return;
    }

    //router redirect
    navigate(`/room/${roomId}`, {
      state: {
        username,
      },
    })
  }

  const createRoom = () => {
    if(!username){
        toast.error('Username is required');
        return;
    }

    const id = v4();
    setRoomId(id);

    navigate(`/room/${id}`, {
        state: {
            username,
        },
    });

  }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <div className='flex h-4/6 max-h-5/6 w-5/6 md:w-4/6 justify-center bg-slate-600 rounded-2xl shadow-2xl shadow-slate-500/50'>
        <div className='sm:flex flex-col flex-1 rounded-l-2xl bg-slate-100 items-center justify-center hidden'>
            <img src={logo} alt='logo' className='flex select-none h-auto max-h-48 w-auto p-10 mix-blend-multiply' />
            <div className='-translate-y-20'>
                <h2></h2>            
            </div>
        </div>

        <div className='flex flex-col flex-1 rounded-r-lg h-full w-full'>
            <div className='flex flex-1 justify-center items-center rounded-tr-2xl rounded-tl-2xl sm:rounded-tl-none max-h-11 w-auto'>
                <button className={`flex-auto h-full text-center ${(enterCategory === 'join')? 'bg-slate-600 font-semibold text-white': 'shadow-inner bg-slate-400'} rounded-tl-2xl sm:rounded-tl-none`} onClick={() => setEnterCategory('join')}>Join</button>
                <button className={`flex-auto h-full text-center rounded-tr-2xl ${(enterCategory === 'create')? 'bg-slate-600 font-semibold text-white': 'shadow-inner bg-slate-400'}`} onClick={() => setEnterCategory('create')}>Create</button>
            </div>
            <div className='flex-1 overflow-auto'>
                {enterCategory === 'join' && <Join username={username} setUsername={setUsername}
                roomId={roomId} setRoomId={setRoomId} clickHandler={joinRoom}/>}
                {enterCategory === 'create' && <Create username={username} setUsername={setUsername} clickHandler={createRoom}/>}
            </div>
        </div>
    </div>
    </div>    
        
  )
}

export default Home
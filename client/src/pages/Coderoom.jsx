import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import CodeEditor from '../components/CodeEditor';
import Board from '../components/Board';
import { initSocket } from '../socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {ACTIONS} from '../Actions';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';

const socket = initSocket();

const Coderoom = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const navigateTo = useNavigate();

  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [board, setBoard] = useState(false);

  useEffect(() => {
    const init = () => {
      socket.connect();
      socket.on('connect_error', (err) => handleErrors(err))
      socket.on('connect_failed', (err) => handleErrors(err))

      function handleErrors(e) {
        console.log('socket connection error', e);
        toast.error('Connection failed, please retry.')
        navigateTo('/');
      }

      //JOIN emitter
      socket.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //JOINED handler
      socket.on(ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined.`)
          }
          setUsers(clients)
        })

      //DISCONNECTED handler
      socket.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left.`)
        setUsers((prev) => {
          return prev.filter((user) => user.socketId !== socketId)
        })
      })
    }

    if (socket !== null || socket !== undefined)
      init();

    return () => {
      socket?.off(ACTIONS.JOINED)
      socket?.off(ACTIONS.DISCONNECTED)
      socket?.disconnect();
    }
  }, []);

    if (!location.state)
      return <Navigate to='/' />

    return (
      <div className='h-screen w-screen flex border- border-black'>
        <div className='w-14 h-full'><Sidebar room_code={roomId} expanded={expanded} setExpanded={setExpanded} users={users} /></div>
        <div className={`h-screen absolute ${(expanded) ? 'translate-x-0' : '-translate-x-full'} border- border-red-700 transition-all ease-in-out duration-300 w-full sm:w-2/5 z-20 shadow-2xl rounded-r-2xl`}><Dashboard users={users} room_code={roomId} expanded={expanded} setExpanded={setExpanded} /></div>
        
        <div className={`h-auto flex-1 flex w-72 border- border-yellow-700 ${(expanded) ? 'blur-sm' : ''}`}>
          <div className={`${(board) ? 'hidden' : 'w-full'} md:flex-1 md:w-1/2 border- border-green-700`}><CodeEditor socket={socket} roomId={roomId} setBoard={setBoard} /></div>
          <div className={`${(board) ? 'w-full' : 'hidden'} md:inline-flex md:flex-1 md:w-1/2 border- border-blue-700`}><Board socket={socket} roomId={roomId} setBoard={setBoard} /></div>
        </div>
      </div>
    )
  }

  export default Coderoom
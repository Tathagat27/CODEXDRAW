import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const User = ({ username }) => {
  
  const navigateTo = useNavigate();

  const handleConnectionError = () => {
        toast.error('Connection failed, please retry.');
        navigateTo('/');
      }

  return (
    (!username) ? (
        handleConnectionError()
        )
     :
    (
    <div className='flex justify-center items-center'>
      <div className="bg-slate-100/50 rounded-md select-none h-16 min-w-24 flex flex-col justify-center items-center shadow-lg truncate">
      {/* <Avatar className={''} name={username} round="0.3rem" color="#DC593F" size="2.1rem"/> */}
      <div className="h-8 w-8 overflow-hidden flex justify-center items-center rounded-lg text-slate-100 font-bold bg-teal-700">{username.charAt(0).toUpperCase()}</div>
      <p className="font-semibold text-slate-700 text-sm">{username}</p>
    </div>
    </div>)
  )
}



export default User
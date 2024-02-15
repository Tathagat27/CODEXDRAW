
const User = ({ username }) => {
  return (
    <div className="bg-slate-100/50 rounded-md select-none h-16 flex flex-col justify-center items-center shadow-lg">
      {/* <Avatar className={''} name={username} round="0.3rem" color="#DC593F" size="2.1rem"/> */}
      <div className="h-8 w-8 flex justify-center items-center rounded-lg text-slate-100 font-bold bg-teal-600">{username.charAt(0).toUpperCase()}</div>
      <span className="font-semibold text-slate-700 text-sm">{username}</span>
    </div>
  )
}

export default User
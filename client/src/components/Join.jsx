const Join = ({username, setUsername, roomId, setRoomId, clickHandler}) => {
    return (
      <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col justify-center h-3/5 w-3/5 space-y-7">
        <input type="text" placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)}
        value={username} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <input type="text" placeholder="Room Code" 
        onChange={(e) => setRoomId(e.target.value)}
        value={roomId} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
        <button onClick={clickHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">{'Join Coderoom'}</button>
      </div>
        
      </div>
    )
  }
  
  export default Join
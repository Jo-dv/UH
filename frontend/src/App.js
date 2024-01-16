


function App() {
  return (
    <>
    <div className="w-full h-screen bg-black
      text-9xl text-white
      flex justify-center items-center">
        {/* <h1>abc 가나다</h1>
        <h2 className="font-['pixel']">abc 가나다</h2> */}
      <img className="w-4/5 max-w-2xl
      animate-jump-in animate-duration-[2000ms] z-10" 
      alt="Logo" src="img/logo.png" />

      <img className="animate-fade animate-delay-[2000ms] 
        absolute h-screen w-full" 
        alt="Background" src="img/background.png"/>
      {/* <div className='z-10 absolute w-3/4 h-3/4
      bg-gradient-to-r from-spaceP via-amber-300 via-white via-cyan-100 to-spaceB
      animate-fade-right animate-once animate-delay-[2000ms]'>
        Login
      </div> */}
    </div>
    </>
  );
}

export default App;

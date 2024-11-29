import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-28 w-28 object-cover cursor-pointer self-center' />
        <input type="text" placeholder="username" className='rounded-lg border p-3' name="" id="username"  />
        <input type="text" placeholder="email" className='border p-3 rounded-lg' name="" id="email"  />
        <input type="text" placeholder="password" className='border p-3 rounded-lg' name="" id="password"  />
        <button  className='bg-slate-700 text-white rounded-lg p-2 hover:opacity-55 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

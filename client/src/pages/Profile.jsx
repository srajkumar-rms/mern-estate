import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()
console.log('error', error);


  // firebase Storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
        console.log('upload is ' + progress + '% done');

      },

      (error) => {
        setfileUploadError(true)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    )

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log(data);
      
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={e => setFile(e.target.files[0])} hidden accept='image/*' type="file" name="" id="" ref={fileRef} />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-28 w-28 object-cover cursor-pointer self-center' />


        <p className='text-sm self-center'>
          {fileUploadError ?
            (<span className='text-red-700'>Error image upload</span>) :
            filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'>
                {`Uploading ${filePerc}%`}
              </span>)
              :
              filePerc === 100 ? (
                <span className='text-green-700'>successfully uploaded</span>
              )
                :
                ('')
          }
        </p>



        <input type="text" placeholder="username" defaultValue={currentUser.username} className='rounded-lg border p-3' name="" id="username" onChange={handleChange} />

        <input type="text" placeholder="email" defaultValue={currentUser.email} className='border p-3 rounded-lg' name="" id="email" onChange={handleChange} />

        <input type="password" placeholder="password" className='border p-3 rounded-lg' name="" id="password" onChange={handleChange} />

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-2 hover:opacity-55 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
          </button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
          <p className='text-red-700 mt-5'> { error ? error : ''}</p>
          <p className='text-green-700 mt-5'> { updateSuccess ? 'User updated Successfully!!' : ''}</p>

    </div>
  )
}




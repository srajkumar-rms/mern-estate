import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react"
import { app } from "../firebase";

export default function CreateListing() {

  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: []
  })
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log(formData);
  
  const handleImageSubmit = (e)=>{
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
        setImageUploadError(false)
        setUploading(false)

      }).catch((err)=>{
        setImageUploadError('Image upload failed(2mb per image ')
        setUploading(false)

      })
    }else{
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false)

    }
  }
  const storeImage = async(file)=>{
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,file)

      uploadTask.on('state_changed', 
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`upload is ${progress} % done`);
        },
        (error)=>{
          reject(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL)
          })
        }
      )
    })
  }

  const handleRemoveImage = (index)=> {
    setFormData({
      ...formData, imageUrls: formData.imageUrls.filter((_, i)=> i !== index), 
    })
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-5 flex-1'>
          <input type="text" placeholder='Name' className='border p-3 rounded-lg' id="name" maxLength='62' minLength='12' required />
          <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id="description" maxLength='62' minLength='12' required />
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' id="address" required   />

        <div className='flex gap-6 flex-wrap'>
          <div className='flex gap-2'>
            <input type="checkbox" id="sale" className='w-5' />
            <span>Sell</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="rent" className='w-5' />
            <span>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="parking" className='w-5' />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="furnished" className='w-5' />
            <span>Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id="offer" className='w-5' />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>

          <div className='flex gap-2 items-center'>
            <input className=' p-3 border rounded-lg border-gray-300' type="number"  id="bedrooms" min='1' max='10' required />
            <p>Beds</p>
          </div>
          <div className='flex gap-2 items-center'>
            <input className=' p-3 border rounded-lg border-gray-300' type="number"  id="bathrooms" min='1' max='10' required />
            <p>Baths</p>
          </div>
          <div className='flex gap-2 items-center'>
            <input className=' p-3 border rounded-lg border-gray-300' type="number"  id="regularPrice" min='1' max='10' required />
            <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>($ / month)</span>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <input className=' p-3 border rounded-lg border-gray-300' type="number"  id="discountPrice" min='1' max='10' required />
            <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            <span className='text-xs'>($ / month)</span>
            
            </div>
          </div>
        </div>
        </div>


        <div className='flex flex-col flex-1 gap-2'>
          <p className='font-semibold'>Images: 
            <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (6 max)</span>
          </p>
          <div className='flex gap-4'>
            <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
            <button type="button" onClick={handleImageSubmit} className='p-3 text-green-700 border-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
        <p className="text-red-400 text-sm">{imageUploadError && imageUploadError} </p>  

        {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
            <div key={index} className="flex justify-between border rounded-lg p-3">
              <img  src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
              <button type="button" onClick={()=> handleRemoveImage(index)} className="p-3 text-red-600 rounded-lg uppercase hover:opacity-8">Delete</button>

            </div>
          )

)
}

          <button className='uppercase text-white p-3  bg-slate-600 rounded-lg hover:opacity-85 disabled:opacity-60'>Create listing</button>
        </div>

      </form>
    </main>
  )
}

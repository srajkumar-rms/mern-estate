import React from 'react'

export default function CreateListing() {
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
            <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
            <button className='p-3 text-green-700 border-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='uppercase text-white p-3  bg-slate-600 rounded-lg hover:opacity-85 disabled:opacity-60'>Create listing</button>
        </div>


        
      </form>
    </main>
  )
}

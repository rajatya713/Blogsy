import React, { useState } from 'react'
import appWriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
    const [isImageLoading, setIsImageLoading] = useState(true)

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full rounded-xl bg-[#efdcc3] p-4'>
                <div className='w-full justify-center mb-4 relative'>
                    {isImageLoading && (
                        <div className='absolute inset-0 flex items-center justify-center bg-[#efdcc3] rounded-xl'>
                            <div className="w-8 h-8 border-4 border-dashed border-gray-600 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        src={appWriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className={`rounded-xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => setIsImageLoading(false)}
                    />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard

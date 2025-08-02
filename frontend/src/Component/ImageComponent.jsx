import React from 'react'
export default function ImageComponent({ width, height, src = null, alt = "demo"}) {
  return (
    <>
        <div style={{width:width,height:height, backgroundColor:'gray'}}>
            {src && <img className='h-full object-cover' src={(src.indexOf('blob') === -1) ? `data:image/jpeg;base64,${src}` : src} width={width} height={height} alt={`${alt}`}></img>} 
        </div>
    </>
  )
}

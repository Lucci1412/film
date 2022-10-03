import React, { useEffect, useRef } from 'react'

const LoadImg = ({ url }) => {
  const imgRef = useRef()

  useEffect(() => {
    const img = imgRef.current;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        img.setAttribute("src", url)
      }
    })
    if (img) observer.observe(img)

    return () => {
      if (img) observer.unobserve(img)
    }
  }, [url])


  return (
    <img alt='' ref={imgRef} className="lazy-load" />
  )
}

export default LoadImg
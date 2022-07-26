import {useState, useEffect, useCallback } from 'react';
const useImageData = () => {
  const [imageData, setImageData] = useState([]);
  const [filteredImageData, setFilteredImageData] = useState([]);
  const [tags, setTags] = useState([]);

  const filterTags = useCallback(() => {
    const combinedTags = imageData.map((image)=>image.tags).flat();
    const filteredTags = combinedTags.filter((item, index)=>combinedTags.indexOf(item) === index);
    setTags(filteredTags);
  }, [imageData]); 

  // https://hanilim.github.io/interview/gallery-98j9ewmt7i/sizes.json
  // https://hanilim.github.io/interview/gallery-98j9ewmt7i/metadata.json

  const fetchImageData = async()=>{
    const imageSizeDataRequest = await fetch('https://hanilim.github.io/interview/gallery-98j9ewmt7i/sizes.json');
    const imageMetaDataRequest = await fetch('https://hanilim.github.io/interview/gallery-98j9ewmt7i/metadata.json');
    const imageSizeData = await imageSizeDataRequest.json();
    const imageMetaData = await imageMetaDataRequest.json();
    
    let formattedImageData = [];
    imageSizeData.forEach((image)=>{
      const metadata = imageMetaData.find(({id})=>id===image.id)
      formattedImageData.push(
        {
          filename: `image${image.id}.jpeg`,
          path: 'https://hanilim.github.io/interview/gallery-98j9ewmt7i',
          ...image,
          ...metadata
        }
      )
    })
    setImageData(formattedImageData);
    setFilteredImageData(formattedImageData);
    
  }

  const filterImages = (orientation, tags) => {
    //tag filter
    const filtered = imageData.filter((image)=>{
      return tags.every((val) => image.tags.includes(val));
    })
    setFilteredImageData(filtered);
  }

  useEffect(()=>{
    fetchImageData();
  },[]);

  useEffect(()=>{
    if(imageData.length > 0){
      filterTags();
    }
  },[filterTags, imageData])

  return {imageData, tags, filteredImageData, filterImages}
};

export default useImageData;
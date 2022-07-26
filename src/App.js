import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import useImageData from './hooks/useImageData';
import Image from './components/Image';

function App() {
  const {imageData, tags, filterImages, filteredImageData} = useImageData();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedOrientation, setOrientation] = useState(null);

  useEffect(()=>{
    if(imageData.length > 0){

    }
  },[imageData])

  const handleTagSelection = (tag, e) => {
    const isChecked = e.target.checked;
    if(isChecked){
      setSelectedTags(oldTags => [...oldTags, tag]);
    }else{
      setSelectedTags(selectedTags.filter(item => {
        return item !== tag;
      }))
    }
  }

  useEffect(()=>{
    if(tags){
      filterImages(selectedOrientation, selectedTags);
    }
  }, [filterImages, selectedOrientation, selectedTags, tags])


  return (
    <div className="App">
      <form>
        <h2>Orientation</h2>
        <h2>Tags</h2>
        <fieldset>
        {tags.length > 0  &&
          <>
            {tags.map((tag, i)=>{
              return(
                <React.Fragment key={tag}>
                <input key={tag} type="checkbox" name="tags_filter" value={tag} onChange={(e)=>handleTagSelection(tag, e)}/>{tag}&nbsp;
                </React.Fragment>
              )
            })}
          </>
        }
        </fieldset>
      </form>
      <div style={{'marginTop':'25px', 'marginBottom':'25px'}}>Images: {filteredImageData.length}</div>
      <div style={{
        'display':'flex',
        'width': '100%',
        'flexWrap': 'wrap',

      }}>
        {imageData.length < 0 ?
          <span>Loading</span>
        :
          <>
            
            {filteredImageData.map((image)=>{
              return (
                <Image image={image} key={image.filename} />
              )
            })};
          </>   
        }
      </div>
    </div>
  );
}

export default App;

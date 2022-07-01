import {useEffect, useState} from 'react';
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
  }, [selectedOrientation, selectedTags, tags])


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
                <>
                <input key={tag} type="checkbox" name="tags_filter" value={tag} onChange={(e)=>handleTagSelection(tag, e)}/>{tag}&nbsp;
                </>
              )
            })}
          </>
        }
        </fieldset>
      </form>
      <div style={{
        'display':'flex',
        'width': '100%',
        'flex-wrap': 'wrap',

      }}>
        {imageData.length < 0 ?
          <span>Loading</span>
        :
          <>
            {imageData.map((image)=>{
              return (
                <Image image={image} />
              )
            })};
          </>   
        }
      </div>
    </div>
  );
}

export default App;

const Image = ({image}) => {
  return (
    <div style={{
      'width':'33%'
    }}>
      <img style={{'width':'100%', 'height':'auto'}} src={`${image.path}/${image.filename}`} alt={image.filename}/>
    </div>
    
  );
}
export default Image;
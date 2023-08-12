import React, { useEffect, useRef, useState } from 'react'
import './Card.css'
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux'
import { deleteMovies, updateMovies } from '../../Redux/movies/movie.action'
import {useDisclosure} from '@chakra-ui/react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
};

function Card({title,image,description,rating,user,_id}) {
    const dispatch = useDispatch()
      const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const [ttitle, setTitle] = useState(title)
      const [timage, setImage] = useState(image)
      const [tdescription, setBody] = useState(description)
      const [trating, setRating] = useState(rating)
  
      const updateMovie = () => {
          dispatch(updateMovies(_id,{title:ttitle,image:timage,body:tdescription,rating:trating}))
          onClose()   
      }


      useEffect(() => {
        dispatch(updateMovies())
    }, [])
  return (
    <div className='card-tile col-lg-3 col-md-6 col-12 my-2'>
      
    <div className='card-pic'>
        <img src={timage} alt='movie-pic' />
    </div>
    <div className="card-name-box">
        <center>
            <p>{ttitle}</p>
            <h3 style={{overflow:"hidden"}}>{tdescription}</h3>
            <Rating name="half-rating-read" defaultValue={trating} precision={0.5} readOnly />
        </center>
     
        
    </div>
    <div  className='bottom'><EditIcon onClick={
      ()=>onOpen()
    }/></div>   
      <>
      
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a movie details
          </Typography>
          <TextField sx={{ mb:2, width: '38ch' }}
          required
          id="standard-required"
          label="Title"
          placeholder='Title'
          variant="standard"
          onChange={(e)=>setTitle(e.target.value)} 
          value={ttitle} 
        />
    <TextField sx={{ mb:2, width: '38ch' }}
          required
          id="standard-required"
          label="Image Url"
          placeholder='https://www.w3schools.com/howto/img_avatar.png'
          variant="standard"
          onChange={(e)=>setImage(e.target.value)}
          value={timage}
        />
        <TextField sx={{ mb:2, width: '38ch' }}
          id="standard-textarea"
          label="Description"
          placeholder="Description"
          multiline
          variant="standard"
          onChange={(e)=>setBody(e.target.value)}
          value={description}
        />
         <TextField sx={{ mb:2, width: '38ch' }}
          id="standard-number"
          label="Rating"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder='Out of 5'
          onChange={(e)=>setRating(e.target.value)}
          variant="standard"
          value={trating}
        />
          <Button sx={{
            width:'60px',float: 'right',
          }} onClick={()=>updateMovie()} variant="contained">Update</Button>
          <Button sx={{
            width:'60px'
          }}onClick={()=>
            dispatch(deleteMovies(_id))  
            } variant="contained" color="error" >Delete</Button>
        </Box>
      </Modal>
      </>
</div>
  )
}

export default Card

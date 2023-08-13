
import React, { useState, useEffect } from 'react';
import './Home.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../Redux/users/user.types';
import Card from '../../Components/Card/Card';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { createMovies, getMovies } from '../../Redux/movies/movie.action';
import { useDisclosure } from '@chakra-ui/react';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper', 
  borderRadius:'10px',

  boxShadow: 24,
  p: 4,
};

function Home() {
  const dispatch = useDispatch();

  const { auth, loading: authLoading, token, error: authError } = useSelector(state => state.userReducer);
  const { loading: movieLoading, data: movies } = useSelector(state => state.movieReducer);
  const Token = useSelector(state => state.userReducer.token);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const getUserDetails = (auth) => {
    if (auth && auth.user) {
      const { username, email } = auth.user;
      return { username, email };
    }
    return { username: '', email: '' };
  };
  const { username, email } = getUserDetails(auth);

  const addMovie = () => {
    dispatch(createMovies({ title, image, description, rating }));
    onClose();
  };

  const contributions = () => {
    return movieLoading ? 0 : movies.length;
  };
  
  useEffect(() => {
    dispatch(getMovies());
    addMovie();
  }, []);

  return (
    <div className='home row '>
      <div className='sidebar row'>
        <h1>Dashboard</h1>
        <div className="user-profile row row-cols-1">
          <div className='userdp'>
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user profile"/>
          </div>
          <h6 className="username">Name: Abc</h6>
          <h6 className="mail">Email:abc@mail.com</h6>
          <h6 className="total-contribution">Total contribution: {contributions()}</h6>
          <div className='logout' onClick={() => dispatch({ type: LOGOUT })} style={{ display: auth ? "block" : "none" }}>
            Logout <LogoutIcon/>
          </div>
        </div>
      </div>
      <div className='main-area container-fluid '>
        <div className="main-top">Your Movie List.</div>
        <div className='add-icon col'>
          <DashboardCustomizeIcon onClick={onOpen} />
        </div>
        <div className="row main-content">
        {movies && Array.isArray(movies) && movies.map((card) => <Card key={card._id} {...card} />)}
        </div>
        <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Add a movie details
            </Typography>
            <TextField
              sx={{ mb: 2, width: '38ch' }}
              required
              label="Title"
              placeholder='Title'
              variant="standard"
              onChange={e => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              sx={{ mb: 2, width: '38ch' }}
              required
              label="Image Url"
              placeholder='https://www.w3schools.com/howto/img_avatar.png'
              variant="standard"
              onChange={e => setImage(e.target.value)}
              value={image}
            />
            <TextField
              sx={{ mb: 2, width: '50ch' }}
              label="Description"
              placeholder="Description"
              multiline
              variant="standard"
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
            <TextField
              sx={{ mb: 2, width: '38ch' }}
              label="Rating"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Out of 5'
              onChange={e => setRating(e.target.value)}
              variant="standard"
              value={rating}
            />
            <Button
              sx={{ width: '100px', float: 'right' }}
              onClick={addMovie}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box, Grid } from '@mui/material';
import '../styles/dashboard.css';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";


const ADD_COMMENTS = gql`
mutation Mutation($comment: Comment) {
  AddComment(comment: $comment)
}

`

export default function PostDetail() {
  const {id} = useParams();
  const post = JSON.parse(localStorage.getItem("detail"))
   console.log(post)
   const [allComments, setAllComments] = useState(post.comments);
  const [cmnt, setCmnt] = useState('')
  const [AddComment, {loading, error}] = useMutation(ADD_COMMENTS) 
 const addComnt = async() => {
   post.comments.push(cmnt)
  try {
    const res = await AddComment({
      variables: {comment:{postId: post.postId, content:post.comments} },
    });
    if (res.data) {
     setAllComments(res.data.AddComment)
     localStorage.setItem("detail", JSON.stringify(post))
     setCmnt('')
    }
  } catch (err) {
    console.error(err);
  }
  
 }
   
  return (
    <div>
    {id}<br/>
    <Box sx={{ flexGrow: 1 }}>
           <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
    <Card sx={{ margin:'2em' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="70"
          image={post.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"sx={{display:"block"}}>
            {post.name}
          </Typography>
          <Typography variant="body2"sx={{display:"block"}} >
           {post.description}
          </Typography>
          <Typography variant="p" color="text.secondary"sx={{display:"block"}}>
           Category: {post.category}
          </Typography>
          <Typography variant="p" color="text.secondary"sx={{display:"block"}}>
           Post Date: {post.time && new Date(Number(post.time)).toLocaleDateString()}
          </Typography>
          <h3 style={{textAlign:"center"}}>Comments:</h3>
          {allComments ? allComments.map((comment)=>(
             <Typography variant="p"  sx={{display:"block"}}>
            {comment}
            </Typography>
          )): <Typography variant="p" color="red" sx={{textAlign:"center", placeContent:"center"}}>
                     no comments 
         </Typography>}
         <input type="text" value={cmnt} onChange={(e)=>setCmnt(e.target.value)}/>
         <br/>
         <button onClick={()=>addComnt()}> Add Comment</button>
        </CardContent>
      </CardActionArea>
    </Card>  
    </Grid>
    <Grid item xs={2}></Grid>
    </Grid>
    </Box>
      </div>
  )
}


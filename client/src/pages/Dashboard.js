import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { useQuery, useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import {  Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postDetail} from '../store/counterSlice';
import '../styles/dashboard.css';

 const GET_POSTS_QUERY = gql`
  query Query($offset: Int, $limit: Int, $category:String) {
  getAllDetails(offset: $offset, limit: $limit, category:$category) {
    url
    name
    lastItemId
    postId
    description
    category
    username
    userId
    comments
    time
  }
}
`;

const Explore = () => {

 const [category, setCategory] = React.useState('all')
  const [page, setPage] =  React.useState(0)
  const { data, loading, error, refetch } = useQuery(GET_POSTS_QUERY,{
    variables: {
      offset: page * 1,
      limit: 2,
      category:category
    }
  });
  console.log(data)
  const handleCategory = (e) => {
    setCategory(e.target.value)    
    setPage(0)
   
  }
  const lastItem = data && data.getAllDetails.filter((detail)=>detail.lastItemId === detail.postId);
  console.log(lastItem)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  React.useEffect(async()=>{

   await refetch()
   if(data.getAllDetails.length > 0){
    dispatch(postDetail(data.getAllDetails))
   }
  },[page, category])
  React.useEffect(async()=>{
   },[1])
console.log(page)
 if (loading) return <h1>loading files...</h1>;
 if (error) return <p>{error.message}</p>;
  return (
   <>
   <Box sx={{ flexGrow: 1 }}>
           <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
              <Box sx={{ flexGrow: 1 }}>
           <Grid container spacing={2}>
           <select
        name="categories"
        value={category}
        onChange={(e) => handleCategory(e)}
      >
        <option value="all" selected>All Categories</option>
        <option value="house">House Category</option>
        <option value="groceries">Groceries Category</option>
        <option value="schools">Schools Category</option>
      </select>
              {data.getAllDetails.length > 0  ? data.getAllDetails.map((f, i) => {
        console.log(f)
        return (      
          <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 300, margin:'2em' }}>
      <button onClick={()=>{
        dispatch(postDetail(f))
        navigate(`/postdetails/${f.postId}`)
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={f.url}
          alt="green iguana"
        />
        <CardContent>
        <Typography variant="p" color="text.secondary" sx={{display:"block"}}>
           {f.name}
          </Typography>
          <Typography variant="p" color="text.secondary" sx={{display:"block"}}>
           Category: {f.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      </button>
    </Card>
    </Grid>
    )}
  ): <p style={{color:"red", textAlignLast:"center", marginTop:"1em"}}>No Posts found</p>}
</Grid>
</Box>
{data.getAllDetails.length > 0 && (
<div className='pagination' style={{float:'right'}}>    
  <button disabled={(page > 0 && lastItem.length === 1) && true} onClick={()=>setPage((prev)=>prev+1)}>Next</button>
  <button disabled={!page} onClick={()=>setPage((prev)=>prev-1)}>Back</button>
</div>
            ) }             </Grid>
              <Grid item xs={2}></Grid>
           </Grid>
   </Box>


   </>
  );
};

export default Explore;

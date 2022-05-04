import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

 const GET_PHOTOS_QUERY = gql`
  query Query {
  getDetails {
    url
    name
    description
    category
  }
}
`;

const Projects = () => {

  const { data, loading, error,  refetch } = useQuery(GET_PHOTOS_QUERY);


 React.useEffect(()=>{
refetch()

 },[1])
 if (loading) return <h1>loading files....</h1>;
 if (error) return <p>{error.message}</p>;
  return (
   <>
    {data.getDetails.length > 0 ? data.getDetails.map((f, i) => {
        console.log(f)
        return (      
      <Card sx={{ maxWidth: 300, margin:'2em' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={f.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {f.name}
          </Typography>
          <Typography variant="body2" >
           {f.description}
          </Typography>
          <Typography variant="p" color="text.secondary">
           Category: {f.category}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )}
  ): <p style={{color:"red", textAlignLast:"center", marginTop:"1em"}}>No Posts found</p>};
   </>
  );
};

export default Projects;

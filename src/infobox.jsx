import "./infobox.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function InfoBox({info}){
    
    return (
     <div className="infobox">
        <h3> Today's Weather : {info.description}</h3>
       
       <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
    
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {info.city}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
          <p>Current-Temperature={info.temp}&deg;C</p>
          <p>Max-Temperature={info.maxtemp}</p>
          <p>Min-Temperature={info.mintemp}</p>
          <p>Humidity={info.humidity}</p>
          <p>Weather at the City of {info.city} feels like {info.feelslike}&deg;C and can be described as {info.description}</p>
        </Typography>
      </CardContent>
     
     </Card>
     </div>
     </div>
    );
}
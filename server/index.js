import axios from 'axios';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Route to fetch weather by location
app.get('/api/weather', async (req, res) => {
    const location = req.query.location || '101010100'; // Default to Beijing if no location provided
    try {

        //gives location code from the location name
        const geocodeResponse = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${process.env.RITWIK_GEOCODE_API_KEY}`);
      
        //retrive the location code from the data
        const locationcode=geocodeResponse.data.location[0].id;


        //gives weather information according to location code
        const response = await axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${locationcode}&key=${process.env.RITWIK_WEATHER_API_KEY}`);
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ message: 'Error fetching weather' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});

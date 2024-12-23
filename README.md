# movie-recommender
 

This is a simple movie recommendation system that suggests movies based on user preferences. The project utilizes **Flask** for the backend and machine learning models for generating recommendations.  

## Features  
- Recommend movies based on a selected title.  
- Contains data for **4,800 movies** for accurate suggestions.  
- User-friendly web interface to select a movie and view recommendations.  
- Deployed on **Render** for public access.  

## Deployment  
The project is deployed on **Render** and can be accessed at:  
https://movie-recommender-v3bx.onrender.com  

## Tech Stack  
- **Python**  
- **Flask**  
- **Pandas**  
- **Pickle**  
- **Render** (for deployment)  

## How It Works  
1. The system loads a dataset containing 4,800 movies.  
2. When a user selects a movie from the dropdown, the system calculates similarity scores using precomputed models.  
3. The top 10 similar movies are recommended to the user.  

 


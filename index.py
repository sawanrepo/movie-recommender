from flask import Flask, render_template, request
import pandas as pd 
import pickle

app = Flask(__name__)
# Load the DataFrame from the .pkl file
df = pd.read_pickle("movies1.pkl")
movie = df['title'].tolist()
similarity = pickle.load(open("similaritiy.pkl","rb"))
def recommend(movie_name):
    mi = df[df["title"] == movie_name].index[0]
    distances = similarity[mi]
    movie_list = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:11] 
    l =[]
    for i in movie_list:
        l.append(df.iloc[i[0]].title)
    return l




@app.route('/', methods=['GET', 'POST'])
def home():
    selected_movie = None
    recm =[]
    if request.method == 'POST':
        selected_movie = request.form.get('movie')  # Get the selected movie from the form
        recm = recommend(selected_movie)
    return render_template("index.html", movies=movie, selected_movie=selected_movie,recm=recm)

if __name__ == '__main__':
    app.run(debug=True)
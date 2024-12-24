from flask import Flask, render_template, request
import pandas as pd 
import pickle
import bz2

app = Flask(__name__)


df = pd.read_pickle("movies1.pkl")
movie = df['title'].tolist()
df1 = pd.read_pickle("movieshn.pkl")
movie_hn = df1['title_y'].tolist()
movie_hn =["Krrish(hn)" if i == "Krrish" else i for i in movie_hn]#found krrish is both en and hn movie name while texting webpage so made change in data on runtime.plz ignore
movie_en = movie
movie = movie + movie_hn

with bz2.BZ2File('similaritiy.pkl.bz2', 'rb') as f:
    similarity = pickle.load(f)
similarityhn = pickle.load(open("similarityhn.pkl", "rb"))

def recommend(movie_name):
    mi = df[df["title"] == movie_name].index[0]
    distances = similarity[mi]
    movie_list = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:11]
    l =[]
    for i in movie_list:
        l.append(df.iloc[i[0]].title)
    return l
def recommendhn(movie_name):
    mi = df1[df1["title_y"] == movie_name].index[0]
    distances = similarityhn[mi]
    movie_list = sorted(list(enumerate(distances)), key=lambda x: x[1], reverse=True)[1:11] 
    l=[]
    for i in movie_list:
        l.append(df1.iloc[i[0]].title_y)
    return l
@app.route('/', methods=['GET', 'POST'])
def home():
    selected_movie = None
    recm = []
    if request.method == 'POST':
        selected_movie = request.form.get('movie')  # Get the selected movie from the form
    if selected_movie in movie_en:
        recm = recommend(selected_movie)
    elif selected_movie in movie_hn:
        if selected_movie == "Krrish(hn)":
            selected_movie = "Krrish"
        recm = recommendhn(selected_movie)
    return render_template("index.html", movies=movie, selected_movie=selected_movie, recm=recm)

if __name__ == '__main__':
    app.run(debug=True)

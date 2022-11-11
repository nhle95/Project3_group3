from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_covid19
from jinja2 import escape

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/covid19_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    destination_data = mongo.db.collection.find_one()
    # print(destination_data)

    # Return template and data
    return render_template("index.html", covid19=destination_data)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    covid19_data = scrape_covid19.scrape()
    # print(covid19_data)

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.update_one({}, {"$set": covid19_data}, upsert=True)
    # print("mongo update complete")

    # Redirect back to home page
    return redirect("/")


@app.route("/dashboard")
def dashboard():
    return redirect("file:///Users/xenialiu/Desktop/SMU_Data_Camp/Project/Project3/index2.html")



if __name__ == "__main__":
    app.run(debug=True)

from splinter import Browser
from bs4 import BeautifulSoup
import time
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd


def scrape():
    # Set up Splinter
    executable_path = {'executable_path': ChromeDriverManager().install()}
    browser = Browser('chrome', **executable_path, headless=False)

    # Visit visitcostarica.herokuapp.com
    url = "https://www.verywellhealth.com/coronavirus-flu-differences-4798752"
    browser.visit(url)

    # Scrape page into Soup
    html = browser.html
    soup = BeautifulSoup(html,'html.parser')


    url2 = "https://www.mayoclinic.org/diseases-conditions/coronavirus/in-depth/coronavirus-myths/art-20485720"
    browser.visit(url2)

    # Scrape page into Soup
    html2 = browser.html
    soup2 = BeautifulSoup(html2,'html.parser')

    url3 = "https://www.boredpanda.com/post-covid-lungs-coronavirus-brittany-kendall/?utm_source=bing&utm_medium=organic&utm_campaign=organic"
    browser.visit(url3)

    html3 = browser.html
    soup3 = BeautifulSoup(html3,'html.parser')

    url4 = "https://www.bing.com/search?q=covid%20vaccine%20data&qs=ds&form=QBRE"
    browser.visit(url4)
    
    html4 = browser.html
    soup4 = BeautifulSoup(html4,'html.parser')

    time.sleep(1)


    ##############  covid-19 vs flu difference ##################

    # collect the flu and covid-19 picture 
    difference_graph = soup.find("div",class_="figure-media").find("img", class_="img--noscript")["src"]

    ################ how can i avoid covid-19 and the flu  ##############

    # collect the title 
    trt_title = soup2.find_all("h3")[3].text

    # collect the treatment
    treatment = []
    for i in range(10):
        treatment.append(soup2.find_all("ul")[-8].find_all("li")[i].text)


    ######################## lung X_Ray  ###########################
    
    # collect the title
    lung_big_title = soup3.find("h1").text
    
    # collect graph title
    lung_title1 = soup3.find_all("h3")[1].text

    # collect the photo
    lung_photo1 = soup3.find("p", id = "3-60016276050a4__700").find("img")["src"]

    # collect graph title
    lung_title2 = soup3.find_all("h3")[2].text

    # collect the photo
    lung_photo2 = soup3.find("p", id = "4-600162776a2db__700").find("img")["src"]

    # collect graph title
    lung_title3 = soup3.find_all("h3")[3].text

    # collect the photo
    lung_photo3 = soup3.find("p", id = "post-covid-lungs-coronavirus-brittany-kendall-600169deefed1__700").find("img")["src"]

    # print("line83")
    ######################## vaccine data  ###########################

    # collect the covid title 
    vaccine_title = soup4.find("h2", class_="b_topTitle").text
    # print(vaccine_title)

    # collect the dose_adminstered 
    dose_adminstered = []
    for i in range(3):
        dose_adminstered.append(soup4.find_all("div", class_ = "cov_leg_grp cov_leg_dotGrp")[i].find_all("div")[1].find("div").text)
    dose_adminstered.append(soup4.find_all("div", class_ = "cov_leg_grp")[3].find("div").text)
    # print(dose_adminstered)
    
    dose_adminstered_number = []
    for i in range(6):
        dose_adminstered_number.append(soup4.find_all("div", class_ = "cov_leg_grp cov_leg_dotGrp")[i].find_all("div")[1].find("div", class_= "cov_leg_val").text)
    # print(dose_adminstered_number)

    # collect us dose number 
    us_dose_number = dose_adminstered_number[0:3]
    us_dose_number.append(soup4.find_all("div", class_ = "cov_leg_grp")[3].find("div", class_ = "cov_leg_val").text)

    # collect global dose number 
    global_dose_number = dose_adminstered_number[3:6]
    global_dose_number.append(soup4.find_all("div", class_ = "cov_leg_grp")[-1].find("div", class_ = "cov_leg_val").text)


    covid19_data = {
        "difference_graph" : difference_graph,
        "trt_title" : trt_title,
        "treatment" : treatment,
        "lung_big_title" : lung_big_title,
        "lung_title1" : lung_title1,
        "lung_photo1" : lung_photo1,
        "lung_title2" : lung_title2,
        "lung_photo2" : lung_photo2,
        "lung_title3" : lung_title3,
        "lung_photo3" : lung_photo3,
        "vaccine_title": vaccine_title,
        "dose_adminstered": dose_adminstered,
        "us_dose_number": us_dose_number,
        "global_dose_number": global_dose_number
    }

    # print(covid19_data["vaccine_title"])
    # Close the browser after scraping
    browser.quit()

    # Return results
    return covid19_data
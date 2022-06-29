# Toc

- [Toc](#toc)
- [Movie Finder](#movie-finder)
- [How to use it](#how-to-use-it)
- [Endpoints](#endpoints)
  - [Auth User](#auth-user)
  - [Get Movie](#get-movie)
  - [Orders](#orders)
  - [User](#user)
  - [SuperAdmin](#superadmin)
  - [Author](#author)
      - [Marc Serrats Pagès :es:](#marc-serrats-pagès-es)
      - [Ibrahim Alzuru Cortés  :venezuela:](#ibrahim-alzuru-cortés--venezuela)
      - [Luciano Germani :it:](#luciano-germani-it)

# Movie Finder

*If you prefer you can read this in* [Spanish](README-ESP.md)

This project it's a replication of a serching engine in a Movie database

# How to use it

To be able to use it you will need to install Postman ((https://www.postman.com/) and aim to this heroku server: https://buscadordepeliculas.herokuapp.com/


![Postman](./img-readme/Screenshot_1.png)


# Endpoints

Here you can find all the methods you can use on Postman to be able to do your research

## Auth User

    URL: POST / api / auth / register --> You can register an account
    BODY {"name": " ", "email": " ", "password": " " }  

    ---------------------------------------------------------------

    URL: POST / api / auth / login  --> You can login with your account  
    BODY {"email": " ", "password": " " }  
    ---------------------------------------------------------------

    URL: GET / api / auth / profile --> You can see your profile
    
    

## Get Movie

    GET /api/movie/id=:id  --> You can research a movie by id
    URL: ID Movie
    ---------------------------------------------------------------
    GET /api/movie/ --> You can research a movie by title
    BODY {"name": " " }
    ---------------------------------------------------------------
    GET /api/movie/all --> You can research all movie in our catalogue
    ---------------------------------------------------------------
    GET /api/movie/director --> You can research all movie filtered by a particular director
    URL: "Director Name"
    ---------------------------------------------------------------
    GET /api/movie/actors/:actors --> You can research all movie filtered by a particular actor
    ---------------------------------------------------------------
    GET /api/movie/genre/:genre --> You can research all movie filtered by a particular genre


    

## Orders

    POST /api/order/:id --> You can post a new order.
    ---------------------------------------------------------------

## User
    GET /api/users/:id --> You can get the user by is own id
    ---------------------------------------------------------------
    DELETE /api/users/:id --> You can delete your own account
    ---------------------------------------------------------------
    PUT /api/users/:id --> You can modify your own account

    
## SuperAdmin

    GET /api/users --> You can see all the users
    ---------------------------------------------------------------
    GET /api/orders --> You can see all the orders
    ---------------------------------------------------------------
    GET /api/orders/user --> You can see all the orders of a particular user.

   
## Author 	

#### [Marc Serrats Pagès](https://github.com/pagesMp) :es:
#### [Ibrahim Alzuru Cortés ](https://github.com/ibralzuru) :venezuela:
#### [Luciano Germani](https://github.com/Germanilu) :it:
 


---------------------

[:top:](#toc)
Github url:https://github.com/Govardhan8/hall-booking

Heroku url: https://hall-booking-g.herokuapp.com/

Api end points:

To get all the rooms,booking and customer details:
  URL: https://hall-booking-g.herokuapp.com/hall
  METHOD: get
  
To add a new room:
  URL: https://hall-booking-g.herokuapp.com/hall/add
  METHOD: post
  SAMPLE REQUEST: {
                      "name":"shinron",
                      "NoOfSeats":60,
                      "amenities":[
                      "toilet",
                      "dining hall",
                      "main hall"
                      ],
                      "price":50000
                  }

To book a room by its ID:
Booking using id of the room in param and body will contain booking details(Start and end time are kept in 24 hours format)
  URL: https://hall-booking-g.herokuapp.com/hall/booking/:id
  METHOD:post
  SAMPLE REQUEST:{
                    "customer_name":"Ash",
                    "date":"2020-10-27",
                    "startTime":"09:00:00",
                    "endTime":"10:00:00"
                 }

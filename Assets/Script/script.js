//All code inside the overall function

$(function () {

  //Container for the page
  var contain = $('.container-fluid')
  //set current time of day on top of page
  var currdatetime = $('#currentDay')

  //get any existing appointments
  function getexistingdayevents(){
    var dailyschedule = localStorage.getItem('dailyschedule');

    if (dailyschedule){
      dailyschedule = JSON.parse(dailyschedule);
    }else{
      dailyschedule = []
    }
    return dailyschedule;
  }

  //Save appointments to local storage
  function saveeventschedule(dailyschedule){
    localStorage.setItem('dailyschedule', JSON.stringify(dailyschedule));
  }

  //Need to setup a calendar on page for time of day you would like to set appointments for.
  //I setup appointments defaults for 8am to 6pm
  function createcalendar(){
    contain.empty();
   
    for (i=9; i > 8 && i < 18; i+= 1){

      var apthr = i;
      // get hour of day so we can compare against past, present and future apts.
      var currhr = 10;//dayjs().hour();
      
     
      var dailydiv = $('<div class="row"   id=hour-' + i + '>');
      var dailyrow = $('<div class="col-2 col-md-1 hour text-center py-3">').text(dayjs().hour(i).format("hA"));
      var dailytext = $('<textarea class="col-8 col-md-10 description" rows="3">');
      var dailysave = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
      var dailimg = $('<i class="fas fa-save" aria-hidden="true" >')


      //set class based on apthr and currhr
      if (apthr < currhr){
        dailydiv.addClass('time-block past')
      }else if (apthr === currhr){
        dailydiv.addClass('time-block present')
      }else {
        dailydiv.addClass(' time-block future')
      }

      dailysave.append(dailimg);
      dailydiv.append(dailyrow, dailytext, dailysave);
      contain.append(dailydiv)


     
    }


    gettodayscalendar();

  }


  //get today appointments
  function gettodayscalendar(){

    var dailysch = getexistingdayevents();

    for (i=0; i < dailysch.length; i+= 1){

      var dailyhrid = dailysch[i].dailyhrid
      var dailyaptnote = dailysch[i].dailyaptnote

       $('#' + dailyhrid).children()[1].value = dailyaptnote;
  

    }

  }

  //save appointment listner for button click
  contain.on('click', '.saveBtn', addappointment);


  //user parent child relationship to get to right textarea
  function addappointment(event){
    event.preventDefault();

    var dailyhrid = $(this).parent().attr('id')
    var dailyaptnote = $('#' + dailyhrid).children()[1].value;

    var dailys = {dailyhrid: dailyhrid, dailyaptnote: dailyaptnote}

    var dailyschedule = getexistingdayevents();
    dailyschedule.push(dailys);
    saveeventschedule(dailyschedule);


    gettodayscalendar();
  }


 //display time on page
  function displayTime() {
   var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
   currdatetime.text(rightNow);
  }

  displayTime();

  createcalendar();
});



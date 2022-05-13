$(document).ready(function () {
  console.log("jquery ready");

  //when price input cliked , it turns into $CAD
  $("#minimum-price").on("click", function () {
    $("#minpriceLabel").text("$CAD");
  });
  $("#minimum-price").on("focusout", function () {
    $("#minpriceLabel").text("Minimum Price");
  });
  $("#maximum-price").on("click", function () {
    $("#maxpriceLabel").text("$CAD");
  });
  $("#maximum-price").on("focusout", function () {
    $("#maxpriceLabel").text("Maximum Price");
  });

  //when input are missing, it turns the input border and label red
  $(".int-area input").on("invalid", function () {
    $(this).css("border-bottom", "1px solid red");
  });
  $(".int-area input").on("input", function () {
    $(this).css("border-bottom", "1px solid black");
  });
  //When user submit search botton, modal popups, when user clikc bg, goes back to search.
  //POST item with same id where inputs are matching in popup modal when user press search button

  //returning html template
  const addItemsInContainer = function (itemsObject) {
    const itemsInContainer = $(
      `<div class="filtered-item" onclick="location.href='http://localhost:8080/${itemsObject.id}';">
      <div class="container1">
        <img class="img" src="${itemsObject.photo_url}">
      </div>
      <div class="container2">
          <div class="title">${itemsObject.title}</div>
          <div class="price">$${itemsObject.price}</div>
        <div class="time">${timeago.format(itemsObject.posted_time)}</div>
      </div>
    </div>
    `
    
    );
    return itemsInContainer;
  };
  //loop through the objects and calls addItemsInContainer to append the result to "itemcontainer"

  const renderItems = function (itemsArray) {
    for (let item of itemsArray) {
      let result = addItemsInContainer(item);
      $(".item-container").prepend(result);
    }
  };
  //Ajax GET request
  // const loadItems = function () {
  //   $.ajax("http://localhost:8080/filter/", { method: "GET" }).then((arr) => {
  //     console.log("GET success!");
  //     console.log('array--->', arr);
  //     $(".item-container").empty();
  //     renderItems(arr);
  //   });
  // };

  $(".newItem").on("submit", function (event) {
    //pops up modal
    event.preventDefault();
    $(".popup-bg").css("display", "block");

    $.ajax("http://localhost:8080/filter/", {
      method: "POST",
      data: $(this).serialize(),
    }).then((data) => {
      console.log("POST working");
      $(".item-container").empty();
      renderItems(data);
    });
  });

  $(".popup-bg").on("click", function () {
    $(this).css("display", "none");
  });

  //when user click the item in modal, redirect to localhost8080/:id
});

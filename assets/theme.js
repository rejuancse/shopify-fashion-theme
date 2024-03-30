$('.btn.edit-address').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').show();
    $(this).siblings('.btn.edit-address-cancel').show();
    $(this).siblings('.btn.edit-address-submit').show();
    $(this).siblings('.btn.delete-address').hide();
    $(this).parents('td').siblings('.address-record').hide()
});

$('.btn.edit-address-submit').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').hide();
    $(this).siblings('.btn.edit-address-cancel').hide();
    $(this).siblings('.btn.edit-address').show();
    $(this).siblings('.btn.delete-address').show();
    $(this).parents('td').siblings('.address-record').show()
});

$('.btn.edit-address-cancel').click(function() {
    $(this).hide();
    $(this).parents('td').siblings('.address-edit').hide();
    $(this).siblings('.btn.edit-address-submit').hide();
    $(this).siblings('.btn.edit-address').show();
    $(this).siblings('.btn.delete-address').show();
    $(this).parents('td').siblings('.address-record').show()
});

$('.carousel').carousel()

$('.single-product-images').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    customPaging : function(slider, i) {
        var thumb = $(slider.$slides[i]).data('thumb');
        return `<a><img class="img-fluid" src=${thumb} /></a>`;
    },
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


var $j = jQuery.noConflict();
$j(document).ready(function() {
    // Your jQuery code using $j instead of $

    // $('.add-to-cart').on('click', function(event) {
    //     event.preventDefault();
    //     var $addToCartForm = $(this).closest('form');
    //     var formData = $addToCartForm.serialize();

    //     $.ajax({
    //         type: 'POST',
    //         url: '/cart/add.js',
    //         data: formData,
    //         dataType: 'json',
    //         success: function() {
    //             $('#cart').load('/cart #cart', function() {
    //                 // Reinitialize any scripts that were in the updated content
    //                 console.log('OK!');
    //             });
    //         }
    //     });
    // });

    // $('.add-to-cart').on('click', function(event) {
    //     event.preventDefault();
    //     var $addToCartForm = $(this).closest('form');
    //     var formData = $addToCartForm.serialize();

    //     $.ajax({
    //         type: 'POST',
    //         url: '/cart/add.js', // Shopify's AJAX endpoint for adding items to the cart
    //         data: formData, // Form data containing the product variant ID and any other necessary parameters
    //         dataType: 'json',
    //         success: function(response) {
    //             // Handle success response
    //             console.log('Product added to cart:', response);
    //             // You may want to update the cart icon, display a success message, or redirect the user to the cart page
    //         },
    //         error: function(xhr, status, error) {
    //             // Handle error response
    //             console.error('Error adding product to cart:', error);
    //             // You may want to display an error message to the user
    //         }
    //     });
    // });

    $(document).ready(function() {
        $('.add-to-cart-btn').click(function(e) {
            e.preventDefault();
            var productId = $(this).data('product-id');
            var quantity = 1; // You can customize this to allow the user to input quantity

            // Send AJAX request to add product to cart
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: {
                    quantity: quantity,
                    id: productId
                },
                dataType: 'json',
                success: function(response) {
                    // Handle success
                    // You may want to update the cart count or show a success message
                    console.log('EE');
                },
                error: function(xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                    console.log('Error!');
                }
            });
        });
    });


});

function getVariantFromOptions() {
    let variantArr = []
    $(".product-category select").map(function(i, el) {
        variant = {value: $(el).val(), index: $(el).data('index')};
        variantArr.push(variant)
    });
    return variantArr;
}

function updateHistoryState(variant) {
    if (!history.replaceState || !variant) {
        return;
    }

    var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;

    window.history.replaceState({ path: newurl }, '', newurl);
}

$('.product-category select').on('change', function() {
    var selectedValues = getVariantFromOptions();
    var variants = window.product.variants;

    // Search for product variants based on what was selected in the dropdowns
    var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
        return _.isEqual(variant[values.index], values.value);
        });
    });
    updateHistoryState(found)
    $('#variant-id').val(found.id)
});

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get video ID
var vidId = document.getElementById("player").dataset.id;

// Build the player
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: vidId,
        events: { onReady: onPlayerReady }
    });
}

// ==== Variables for popup
var modal = document.querySelector(".modal"),
  close = document.querySelector(".close-modal"),
  root = document.getElementsByTagName("html")[0];

// Do stuff when player is ready
function onPlayerReady(event) {
    document.querySelector(".play-video").addEventListener("click", function () {
        modal.classList.add("show-modal");

        // Play video
        setTimeout(function () {
        event.target.playVideo();
        }, 100);
    });

    // Close if outside box is clicked
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
        modal.classList.remove("show-modal");
        root.classList.remove("no-scroll");
        event.target.pauseVideo();
        }
    });

    // Close if close button is clicked
    close.addEventListener("click", function () {
        modal.classList.remove("show-modal");
        root.classList.remove("no-scroll");
        event.target.pauseVideo();
    });
}

/**
 *  CountDown
 * */
var myElement = document.getElementById('demo');
var datetimeValue = myElement.getAttribute('data-dateValue');

// Set the date we're counting down to
var countDownDate = new Date(datetimeValue).getTime();

// Update the count down every 1 second
var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector(".days").innerHTML = days;
    document.querySelector(".hours").innerHTML = hours;
    document.querySelector(".minutes").innerHTML = minutes;
    document.querySelector(".seconds").innerHTML = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

/**
 *  Shopify ajax search
 * */
document.getElementById('searchInput').addEventListener('input', function() {
    var query = this.value;
    var element = document.getElementById("searchGroup");

    if (query.length > 0) {
        // Fetch suggestions
        getSuggestions(query);
        // Search products based on the query
        searchProducts(query);

        element.classList.add("active");
    } else {
        document.getElementById('searchResults').innerHTML = ''; // Clear results if search query is empty
        document.getElementById('suggestions').innerHTML = ''; // Clear suggestions if search query is empty
        element.classList.remove("active");
    }
});

function getSuggestions(query) {
    fetch('/search/suggest.json?q=' + query)
    .then(response => response.json())
    .then(data => {
        var searchData = data;
        var searchResults = searchData.resources.results.collections;
        var suggestionsHTML = '';

        suggestionsHTML += '<h2> suggestion </h2>';
        suggestionsHTML += '<div class="list-view">';
        searchResults.forEach(suggestion => {
            suggestionsHTML += '<a href="'+suggestion.url+'">' + suggestion.title + '</a>';
        });
        suggestionsHTML += '</div>';
        document.getElementById('suggestions').innerHTML = suggestionsHTML;
    })
    .catch(error => console.error('Error fetching suggestions:', error));
}

function searchProducts(query) {
    fetch('/search?q=' + query)
        .then(response => response.text())
        .then(html => {
            var tempElement = document.createElement('div');
            tempElement.innerHTML = html;
            var searchResults = tempElement.querySelectorAll('.search-result');
            document.getElementById('searchResults').innerHTML = '';
            searchResults.forEach(result => {
                document.getElementById('searchResults').appendChild(result);
            });
        })
        .catch(error => console.error('Error:', error));
}


// Search POPUP
var searchpopup = document.getElementById('searchpopup');
searchpopup.addEventListener('click', function() {
    var element = document.getElementById("searchOpen");
    element.classList.add("active");

    document.getElementById("searchInput").focus();
});

var searchClose = document.getElementById('searchClose');
searchClose.addEventListener('click', function() {
    var element = document.getElementById("searchOpen");
    element.classList.remove("active");

    var searchGroup = document.getElementById("searchGroup");
    searchGroup.classList.remove("active");
});

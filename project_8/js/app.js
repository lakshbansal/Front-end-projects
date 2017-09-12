//model
var City = [{
        location: 'The Imperial',
        lat: 28.6255,
        lng: 77.2183,
        fid: '4bc8f2c7762beee1a8bb3d38',
        selected: false,
        show: true
    },
    {
        location: 'Qutub Minar',
        lat: 28.5244,
        lng: 77.1855,
        fid: '4ba47c9bf964a520fe9f38e3',
        selected: false,
        show: true
    },
    {
        location: 'Connaught Place',
        lat: 28.6315,
        lng: 77.2167,
        fid: '4b489b54f964a520595026e3',
        selected: false,
        show: true
    },
    {
        location: 'India Gate',
        lat: 28.6129,
        lng: 77.2295,
        fid: '4b5eeab3f964a520ca9d29e3',
        selected: false,
        show: true
    },
    {
        location: 'Amour Bistro',
        lat: 28.6016,
        lng: 77.1860,
        fid: '528b98b611d285b84d9b26b1',
        selected: false,
        show: true
    }
];

//end of model
var locations = []; //for markers
var viewmodel = function() {
    var defaultMarker = makeMArkerIcon();
    var Infowindow = new google.maps.InfoWindow();

    function makeMArkerIcon() {
        var markerImage = new google.maps.MarkerImage(
            'icon2.png', //marker image to be shown
            //marker details
            new google.maps.Size(31, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(31, 34));
        return markerImage;
    }

    //putting marker details into each of them 
    for (i = 0; i < City.length; i++) {
        var marker = new google.maps.Marker({
            position: {
                lat: City[i].lat,
                lng: City[i].lng
            },
            icon: defaultMarker,
            map: map,
            title: City[i].location,
            rating: '', //rating of palce
            likes: '', //likes of place
            venue: City[i].fid,
            selected: City[i].selected,
            image: '', //image to be displayed
            show: ko.observable(true)
        });

        locations.push(marker); //putting marker to the array named locations.
        //adding animation to the marker i.e.BOUNCE
        var makeBounce = null;
        var clickListener = function() {
            if (makeBounce != null)
                makeBounce.setAnimation(null);

            if (makeBounce != this) {
                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    makeBounce.setAnimation(null);

                }, 1450)
                makeBounce = this;
            } else
                makeBounce = null;
        }
        google.maps.event.addListener(marker, 'click', clickListener); //aniate on click
        marker.addListener('click', function() {
            openInfoWindow(this, Infowindow);
        });
    }

    //function for info window to be shown
    function openInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + "<h4>location is rated:" + marker.rating + "<h4>location has " + marker.likes + '</h4></div><div><img src="' + marker.image + '"></div>');
            if (marker.rating != null || marker.image != null) {
                infowindow.open(map, marker);
            }
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };

    //getting info about all the markers
    locations.forEach(function(m) {
        $.ajax({
            method: 'GET',
            datatype: "json",
            url: "https://api.foursquare.com/v2/venues/" + m.venue + "?client_id=2JYEJY5E54SCTS2TJRILIIVLFPXCLQFXF0MPWI2YS2UQCJY3&client_secret=TH4C4MYFH44B2V02JS3YZEXYTKND5IEI4CTX0U51UT4JTKZ4&v=20170303",
            success: function(data) {
                var venue = data.response.venue;
                var imgurl = data.response.venue.photos.groups[0].items[0];
                if (venue.hasOwnProperty('rating') === '') {
                    m.rating = "oops....... error";
                } else {
                    m.rating = venue.rating;
                }
                if (venue.hasOwnProperty('likes') === '') {
                    m.likes = "Error....";
                } else {
                    m.likes = venue.likes.summary;
                }
                if (venue.hasOwnProperty('imgurl') === '') {
                    m.image = "No one submitted......";
                } else {
                    m.image = imgurl.prefix + "100x100" + imgurl.suffix;
                }
            },
            error: function(e) {
                alert('there is some error in fetching data');
            }
        });
    });

    //funtion for the selected marker
    this.selectAll = function(marker) {
        openInfoWindow(marker, Infowindow);
        marker.selected = true;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1450)
    };

    //function for search bar
    this.inputText = ko.observable('');
    this.filtersearch = function() {
        Infowindow.close();
        var inputSearch = this.inputText();
        if (inputSearch.length === 0) {
            this.showAll(true);
        } else {
            for (i = 0; i < locations.length; i++) {
                    if (locations[i].title.toLowerCase().indexOf(inputSearch.toLowerCase()) > -1) {
                        locations[i].show(true);
                    locations[i].setVisible(true);
                } else {
                    locations[i].show(false);
                    locations[i].setVisible(false);
                }

            }
        }
        Infowindow.close();
    };
    
    this.showAll = function(variable) {
        for (i = 0; i < locations.length; i++) {
            locations[i].show(variable);
            locations[i].setVisible(variable);

        }
    };
};
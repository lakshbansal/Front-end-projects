var bio = {
    "name": "Laksh",
    "role": "Web developer",
    "contacts": {
        "mobile": "+919728883441",
        "email": "lakshbansal@gmail.com",
        "github": "lakshbansal",
        "location": "india"
    },
    "biopic": "images/fry1.jpg",
    "welcomeMessage": "'Welcome to my world'",
    "skills": ["awesomeness", "creative", "innovative", "self learning"]
};
bio.display = function() {
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name) + HTMLheaderRole.replace("%data%", bio.role));
    $("#topContacts,#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile));
    $("#topContacts,#footerContacts").append(HTMLemail.replace("%data%", bio.contacts.email));
    $("#topContacts,#footerContacts").append(HTMLgithub.replace("%data%", bio.contacts.github));
    $("#topContacts,#footerContacts").append(HTMLlocation.replace("%data%", bio.contacts.location));
    $("#header").append(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (i = 0; i < bio.skills.length; i++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }

    }
};

var work = {
    "jobs": [{
        "employer": "Chitkara University",
        "title": "Student",
        "dates": "2015 - 2019",
        "location": "Chitkara university, Punjab",
        "description": "budding engineer"
    }]
};
work.display = function() {
    $("#workExperience").append(HTMLworkStart);
    for (i = 0; i < work.jobs.length; i++) {
        $(".work-entry").append((HTMLworkEmployer.replace("%data%", work.jobs[i].employer)) + (HTMLworkTitle.replace("%data%", work.jobs[i].title)));
        $(".work-entry").append(HTMLworkDates.replace("%data%", work.jobs[i].dates));
        $(".work-entry").append(HTMLworkLocation.replace("%data%", work.jobs[i].location));
        $(".work-entry").append(HTMLworkDescription.replace("%data%", work.jobs[i].description));
    }
};

var projects = {
    "projects": [{
            "title": "website",
            "dates": "20-jan",
            "description": "website editing",
            "images": ["images/web.png"]
        },
        {
            "title": "animal trading card",
            "dates": "20-feb",
            "description": "card making",
            "images": ["images/animal.png"]
        },
        {
            "title": "portfolio",
            "dates": "20-mar",
            "description": "portfolio designing",
            "images": ["images/port.png"]
        }
    ]
};
projects.display = function() {
    $("#projects").append(HTMLprojectStart);
    for (i = 0; i < projects.projects.length; i++) {
        $(".project-entry").append(HTMLprojectTitle.replace("%data%", projects.projects[i].title));
        $(".project-entry").append(HTMLprojectDates.replace("%data%", projects.projects[i].dates));
        $(".project-entry").append(HTMLprojectDescription.replace("%data%", projects.projects[i].description));
        for (j = 0; j < projects.projects[i].images.length; j++) {
            $(".project-entry").append(HTMLprojectImage.replace("%data%", projects.projects[i].images[j]));
        }

    }
};

var education = {
    "schools": [{
            "name": "The s.d.vidya",
            "degree": "highschool",
            "dates": "2000",
            "location": "ambala",
            "majors": ["PCM"],
            "url": "http://thesdvidya.com"
        },
        {
            "name": "Chitkara",
            "degree": "B.E.",
            "dates": "2015",
            "location": "Rajpura",
            "majors": ["CSE"],
            "url": "http://unjab.hitkara.edu.in"
        }
    ],
    "onlineCourses": [{
            "title": "html syntax",
            "school": "udacity",
            "dates": "2016",
            "url": "https://classroom.udacity.com/nanodegrees/nd001/parts/0011345402/modules/735989977175460/lessons/6987421963/concepts/74229206040923"
        },
        {
            "title": "css syntax",
            "school": "udacity",
            "dates": "2016",
            "url": "https://classroom.udacity.com/nanodegrees/nd001/parts/0011345403/modules/742847927175460/lessons/7473321627/concepts/74478058180923"
        }
    ]
};
education.display = function() {
    $("#education").append(HTMLschoolStart);
    for (i = 0; i < education.schools.length; i++) {
        $(".education-entry").append((HTMLschoolName.replace("%data%", education.schools[i].name)) + (HTMLschoolDegree.replace("%data%", education.schools[i].degree)));
        $(".education-entry").append(HTMLschoolDates.replace("%data%", education.schools[i].dates));
        $(".education-entry").append(HTMLschoolLocation.replace("%data%", education.schools[i].location));
        for (j = 0; j < education.schools[i].majors.length; j++) {
            $(".education-entry").append(HTMLschoolMajor.replace("%data%", education.schools[i].majors[j]));
        }
    }
    $(".education-entry").append(HTMLonlineClasses);
    for (j = 0; j < education.onlineCourses.length; j++) {
        $(".education-entry").append((HTMLonlineTitle.replace("%data%", education.onlineCourses[j].title)) + (HTMLonlineSchool.replace("%data%", education.onlineCourses[j].school)));
        $(".education-entry").append(HTMLonlineDates.replace("%data%", education.onlineCourses[j].dates));
        $(".education-entry").append(HTMLonlineURL.replace("%data%", education.onlineCourses[j].url));
    }
};
bio.display();
work.display();
projects.display();
education.display();
$("#mapDiv").append(googleMap);
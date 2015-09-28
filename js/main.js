(function () {
    var body = document.body
        , dropArea = document.getElementById('drop-area')
        , droppableArr = []
        , dropAreaTimeout = 1000;

    // initialize droppables
    [].slice.call(document.querySelectorAll('#drop-area .drop-area__item'))
        .forEach(function (el) {
            droppableArr.push(new Droppable(el, {
                onDrop: function (instance, draggableEl) {
                    // show checkmark inside the droppabe element
                    classie.add(instance.el, 'drop-feedback');
                    clearTimeout(instance.checkmarkTimeout);
                    instance.checkmarkTimeout = setTimeout(function () {
                        classie.remove(instance.el, 'drop-feedback');
                    }, 800);
                    // ...
                }
            }));
        });

    // initialize draggable(s)
    [].slice.call(document.querySelectorAll('#grid .grid__item'))
        .forEach(function (el) {
            new Draggable(el, droppableArr, {
                draggabilly: {
                    containment: document.body
                }
                , onStart: function () {
                    // add class 'drag-active' to body
                    classie.add(body, 'drag-active');
                    // clear timeout: dropAreaTimeout (toggle drop area)
                    clearTimeout(dropAreaTimeout);
                    // show dropArea
                    classie.add(dropArea, 'show');
                }
                , onEnd: function (wasDropped) {
                    var afterDropFn = function () {

                        // hide dropArea
                        classie.remove(dropArea, 'show');
                        // remove class 'drag-active' from body

                        classie.remove(body, 'drag-active');

                    };

                    if (!wasDropped) {
                        afterDropFn();
                    }
                    if (wasDropped) {


                    }
                }
            });
        });
})();

$(document)
    .ready(function () {

        var IsFloorActive = false;
        var chartInit = false;
        var bsd = 1;
        var firstSearch = true;
        var allSkills = [];
        $.cookie('dropAreaActive', false);
        $('#mainScreen')
            .hide();
        $('#firstTimeScreen')
            .hide();
        $('#loginTriged')
            .hide();
        $('#light')
            .hide();
        $('#fade')
            .hide();
        $('#depCon')
            .hide();
        $('#skiCon')
            .hide();
        $('#proCon')
            .hide();
        $('#intCon')
            .hide();
        $('#searchRes')
            .hide();
        $('#incpsw')
            .hide();
        $('#loginLoading')
            .fadeOut();
        $('.container')
            .hide();
        $('#homep')
            .hide();
        $('#profi')
            .hide();
        $('#searchResults')
            .hide();
        Parse.initialize("KC1eJ0pORqFD9mnj6jxrFTKlHKE5Ou32d8ULgOkR", "DiSSicuCql0ZE9FH4tghrRDY5pv8CZtQMq7jBipQ");
        window.searchTerms = [];
        setMaxWidth();
        $(window)
            .bind("resize", setMaxWidth); //Remove this if it's not needed. It will react when window changes size.

        function setMaxWidth() {
            $(".grid")
                .css("height", (window.innerHeight - 205) + "px");
        }

        function removeSearchElements() {
            $("#dropItems #boxed")
                .each(function () {
                    $(this)
                        .remove();
                });

            $("#getSoome li")
                .each(function () {
                    $(this)
                        .remove();
                });
        }

        if (Parse.User.current() != null) {
            //fix this later plz
            $('#logInForm')
                .fadeOut(200);
            startMainDrag();
            grabTheD();
        };

        function getDaSkills() {

            var query2 = Parse.Object.extend('skillsMap');
            var query = new Parse.Query(query2);
            query.equalTo('Uzer', $.cookie('username'));
            query.first({
                success: function (object) {
                    allSkills = object.get('Allskills');
                    for (var i = allSkills.length - 1; i >= 0; i--) {
                        $('.badgeCount')
                            .append('<div id="boxed">' + allSkills[i] + ' </div>');
                        $('#skillCout')
                            .text("Skills" + '(' + allSkills.length + ')');

                    };

                }
                , error: function (error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        }

        function updateAbout() {
            var query2 = Parse.Object.extend('profileData');
            var query = new Parse.Query(query2);
            query.equalTo('User', $.cookie('username'));
            query.first({
                success: function (object) {

                    object.set('About', ($('#AboutContent')
                        .text()));
                    object.save();
                }
                , error: function (error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });
        }

        function propSearch() {



            //this code doesnt bring back search results, it pushes the search results to the db lol
            var searcht = [];


            $('#dropItems')
                .children()
                .each(function (i) {
                    if (i > 0 && !((this.innerHTML.toString() == "Departments") || (this.innerHTML.toString() == "Internal Resources") || (this.innerHTML.toString() == "Products") || (this.innerHTML.toString() == "Skills"))) {

                        searcht.push(this.innerHTML.toString());

                    }

                    /*
                            var query2 = Parse.Object.extend('skillsMap');
                            var query = new Parse.Query(query2);
                            query.equalTo('Uzer', $.cookie('username'));
                            query.first({
                              success: function (object) {
                                object.set('Allskills', searcht);
                                object.save();
                                alert("yaaaaaaaasss");
                              },
                              error: function (error) {
                                alert('Error: ' + error.code + ' ' + error.message);
                              }
                            });
                    */



                    /*

                            var query2 =  Parse.Object.extend('skillsMap');
                            var kery = new query2();
                            kery.set('User', $.cookie('username') );
                            kery.set('Allskills', searcht);
                            kery.save(null, {
                          success: function (tableobject) {
                            // Execute any logic that should take place after the object is saved.
                            alert("yaas");
                          },
                          error: function (tableobject, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and description.
                            alert('Failed to create new object, with error code: ' + error.description);
                          }
                        })
                    */

                });

            //this is the search that works

            for (var i = 0; i < searcht.length; i++) {
                if (searcht[i] == "CSS") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('CSS');
                            object.set('CSS', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }

                if (searcht[i] == "VS") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('VS');
                            object.set('VS', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "Kinect") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('Kinect');
                            object.set('Kinect', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "Cortana") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('Cortana');
                            object.set('Cortana', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "WP8") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('WP8');
                            object.set('WP8', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "TraxHR") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('TraxHR');
                            object.set('TraxHR', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "Trax") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('Trax');
                            object.set('Trax', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
                if (searcht[i] == "Azure") {

                    var query2 = Parse.Object.extend('MetricData');
                    var query = new Parse.Query(query2);
                    query.equalTo('DataTruth', false);
                    query.first({
                        success: function (object) {
                            var num = object.get('Azure');
                            object.set('Azure', (num + 1));
                            object.save();
                        }
                        , error: function (error) {
                            alert('Error: ' + error.code + ' ' + error.message);
                        }
                    });

                }
            }

            var query2 = Parse.Object.extend('skillsMap');
            var query = new Parse.Query(query2);
            query.containsAll('Allskills', searcht);
            query.find({
                success: function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        //$('#resultsList').append('<li id="searchResult">' + object.get('Uzer') + '</li>');
                        //$('#getSoome').append('<li>' + '<div class="content">' + '<div class="grid" id="geg">' + '<figure class="effect-winston">' + '<img src="' + 'http://who/Photos/' + object.get('Uzer') + '.jpg" alt="img01" style="width:480px; height:360px;"/>' + '<figcaption style ="width: 480px; height:360px">' + '<h2>' + object.get('Uzer') + '</h2>' + '<p>' + '<a href="#"><i class="fa fa-fw fa-star-o" id="favourite"></i></a><a href="sip:' + object.get('Uzer') + '@microsoft.com"><i class="fa fa-fw fa-comments-o"></i></a><a href="mailto:' + object.get('Uzer') + '@microsoft.com"><i class="fa fa-fw fa-envelope-o"></i></a>' + '</p>' + '</figcaption>' + '</figure>' + '</div>' + '</div>' + '<li>');
                        $('.griid')
                            .append('<a class="grid__iteem" href=""> <h2 class="title title--preview">' + object.get('perf') + '</h2> <div class="loader"></div> <span class="category"></span> <div class="meta meta--preview"> <img class="meta__avatar" src="' + 'http://who/Photos/' + object.get('Uzer') + '.jpg' + '" alt="author01" style="width: 40px; height:40px;"/> <span class="meta__date"><i class="fa fa-comment-o"></i> </span> <span class="meta__reading-time"><i class="fa fa-envelope-o"></i> </span> </div> </a>');
                        $('.coontent')
                            .append('<article class="content__item"> <span class="category category--full">' + '</span> <h2 class="title title--full">' + object.get('perf') + '</h2> <div class="meta meta--full"> <img class="meta__avatar" src="' + 'http://who/Photos/' + object.get('Uzer') + '.jpg' + '" alt="author01" style="width: 40px; "/> <span class="meta__author">' + object.get('Uzer') + '</span> <span class="meta__date"><a href="sip:' + object.get('Uzer') + '@microsoft.com"><i class="fa fa-fw fa-comments-o"></i></a> </span> <span class="meta__reading-time"><a href="mailto:' + object.get('Uzer') + '@microsoft.com"><i class="fa fa-fw fa-envelope-o"></i></a> </span> </div> </article>');
                        firstSearch = false;

                    }
                    pleaseWork();
                }
                , error: function (error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });


            /*

                    var query2 = new Parse.Query('skillsMap');
                    query2.equalTo('Allskills', searcht);
                    query2.first({
                      success: function (results) {
                        for (var i = 0; i < results.length; i++) {
                          var object = results[i];
                          var auth = object.get('Uzer');
                          alert(auth);
                        }
                        alert("yaaaaaas");
                      },
                      error: function (error) {
                        alert('Error: ' + error.code + ' ' + error.message);
                      }
                    });
            */
        }

        function grabTheD() {
            var Auth = Parse.Object.extend('profileData');
            var query = new Parse.Query(Auth);
            query.equalTo('User', $.cookie('username'));
            query.find({
                success: function (results) {
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        //alert(object.get("site"));
                        $.cookie('site', object.get("site"));
                        $.cookie('building', object.get("building"));
                        $.cookie('floor', object.get("floor"));
                        $.cookie('perf', object.get("perfName"));
                    }
                }
                , error: function (error) {

                }
            });

            var query2 = Parse.Object.extend('profileData');
            var query = new Parse.Query(query2);
            query.equalTo('User', $.cookie('username'));
            query.first({
                success: function (object) {

                    ($('#AboutContent')
                        .text(object.get('About')));
                    $('#extr1')
                        .text(object.get('site'));
                    $('#extr2')
                        .text(object.get('building'));
                    $('#extr3')
                        .text(object.get('floor'));


                }
                , error: function (error) {
                    alert('Error: ' + error.code + ' ' + error.message);
                }
            });

            var allSearchSkills = [];
            $('#skiCon #grid .grid__item')
                .each(function () {
                    allSearchSkills.push($(this)
                        .text());
                });
            $('#proCon #grid .grid__item')
                .each(function () {
                    allSearchSkills.push($(this)
                        .text());
                });
            $('#intCon #grid .grid__item')
                .each(function () {
                    allSearchSkills.push($(this)
                        .text());
                });
            $('#depCon #grid .grid__item')
                .each(function () {
                    allSearchSkills.push($(this)
                        .text());
                });

            for (var i = allSearchSkills.length - 1; i >= 0; i--) {
                $('#displayToAdd ul')
                    .append('<li>' + '<div id="boxed">' + allSearchSkills[i] + '</div>' + '</li>');
            };

            $.cookie('allser', allSearchSkills);
        }

        function signIn() {




            var username = $('#usr')
                .val();
            var password = $('#psw')
                .val();
            window.Usersname = username;

            $.cookie('username', username);
            Parse.User.logIn(username, password, {
                success: function (user) {
                    //Authentication
                    var Auth = Parse.Object.extend('User');
                    var query = new Parse.Query(Auth);
                    query.equalTo('username', Usersname);
                    query.find({
                        success: function (results) {
                            for (var i = 0; i < results.length; i++) {
                                var object = results[i];

                                $('#logInForm')
                                    .fadeOut(200);

                                startMainDrag();
                                grabTheD();
                                location.reload();
                            }
                        }
                        , error: function (error) {
                            alert(error.message);
                        }
                    });
                    //End Authentication
                }
                , error: function (user, error) {
                    shake($('#logInForm'));
                    $('#incpsw')
                        .fadeIn(300);
                    //$('#logInForm').shake();
                }
            });
        }

        function shake(div, interval, distance, times) {
            interval = 80;
            distance = 10;
            times = 3;
            $(div)
                .css('position', 'relative');
            for (var iter = 0; iter < (times + 1); iter++) {
                $(div)
                    .animate({
                        left: ((iter % 2 == 0 ? distance : distance * -1))
                    }, interval);
            } //for
            $(div)
                .animate({
                    left: 0
                }, interval);
        }

        function goBack() {
            $(this)
                .parent()
                .parent()
                .fadeOut(100);
            $('#mainCon')
                .fadeIn(100);
        }

        function startMainDrag() {

            $('.container')
                .fadeOut(100);
            $('#selector .container')
                .fadeIn(100);
            $('#start')
                .fadeOut(100);
            $("link[id='logincss']")
                .attr('href', '');
            $("link[id='grabData_def']")
                .attr('href', 'css/mainDrag/normalize.css');
            $("link[id='grabData_comp']")
                .attr('href', 'fonts/font-awesome-4.2.0/css/font-awesome.min.css');
            $("link[id='grabData_comp2']")
                .attr('href', 'css/mainDrag/demo.css');
            $("link[id='grabData_comp3']")
                .attr('href', 'css/mainDrag/bottom-area.css');
            $('#mainScreen')
                .fadeIn(100);
            IsFloorActive = true;
            getDaSkills();
        }

        function clearFloor() {
            $('#selector')
                .hide();
            $('#homep')
                .hide();
            $('#slidein')
                .hide();
            $('#indivForm')
                .hide();
            $('#profi')
                .hide();
            $('#searchResults')
                .hide();
            IsFloorActive = false;
        }

        $('#help')
            .click(function () {
                alert("Thanks for using loop. Questions/concerns? contact us: loopteam@microsoft.com");
            });

        $('#feedBack')
            .click(function () {
                $("#fade")
                    .toggle("slow");
                $("#light")
                    .toggle("slow");
            });

        $('#cncl')
            .click(function () {
                $("#fade")
                    .toggle("slow");
                $("#light")
                    .toggle("slow");
            });

        $('#sendFeedback')
            .click(function () {


                var Feedback = Parse.Object.extend("FeedBack");
                var feedback = new Feedback();

                var content = $('#comments')
                    .val();

                feedback.set("Content", content);


                feedback.save(null, {
                    success: function (tableobject) {
                        // Execute any logic that should take place after the object is saved.
                        alert('thanks!');
                        $("#fade")
                            .toggle("slow");
                        $("#light")
                            .toggle("slow");
                    }
                    , error: function (tableobject, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and description.
                        alert('Failed to create new object, with error code: ' + error.description);
                        $("#fade")
                            .toggle("slow");
                        $("#light")
                            .toggle("slow");
                    }
                });
            });

        $('#addToAdd #boxed')
            .click(function () {
                $('<li>' + this + '</li>')
                    .appendTo($('#dialk'));
            });

        $('#addSkillContainer')
            .click(function () {
                var searcht = [];


                $('#addToAdd #boxed')
                    .each(function () {
                        searcht.push(this.innerHTML.toString());
                    });

                var query2 = Parse.Object.extend('skillsMap');
                var query = new Parse.Query(query2);
                query.equalTo('Uzer', $.cookie('username'));
                query.first({
                    success: function (object) {
                        var holder = [];
                        holder = (object.get('Allskills'));
                        for (var j = holder.length - 1; j >= 0; j--) {
                            searcht.push(holder[j]);
                        };

                        object.set('Allskills', searcht);
                        object.save();

                        $('.badgeCount #boxed')
                            .each(function () {
                                $(this)
                                    .remove();
                            });
                        $('#addToAdd #boxed')
                            .each(function () {
                                $(this)
                                    .remove();
                            });
                        for (var i = searcht.length - 1; i >= 0; i--) {

                            $('.badgeCount')
                                .append('<div id="boxed">' + searcht[i] + ' </div>');
                            $('#skillCout')
                                .text("Skills" + '(' + searcht.length + ')');

                        };
                    }
                    , error: function (error) {
                        alert('Error: ' + error.code + ' ' + error.message);
                    }
                });
            });

        $('#dropTrigger')
            .click(function () {
                if (!($("#drop-area")
                        .hasClass("show"))) {

                    classie.add(document.getElementById('drop-area'), 'show');
                    bsd = 2;
                    $.cookie('dropAreaActive', true);

                    $('#dropTrigger')
                        .css("top", "-55px");
                    $('#searchInit')
                        .css("top", "-30px");
                    $('#clearDaSearch')
                        .css("top", "-30px");
                } else if (($("#drop-area")
                        .hasClass("show"))) {
                    bsd = 1;
                    $.cookie('dropAreaActive', false);
                    classie.remove(document.getElementById('drop-area'), 'show');
                    $('#dropTrigger')
                        .animate({
                            "top": "-105px"
                        }, 700);
                    $('#searchInit')
                        .animate({
                            "top": "-60px"
                        }, 700);
                    $('#clearDaSearch')
                        .animate({
                            "top": "-60px"
                        }, 700);
                };
            })

        $('#searchInit')
            .click(function serh() {
                if (IsFloorActive) {
                    clearFloor();

                    serh();
                } else {
                    $('#searchResults')
                        .fadeIn(200);
                    propSearch();
                    IsFloorActive = true;
                };
            })


        $('#searb')
            .click(function lodSer() {
                if (IsFloorActive) {
                    clearFloor();
                    lodSer();
                    $('.griid')
                        .empty();
                    $('.coontent')
                        .empty();
                   
                } else {
                    $('#selector')
                        .fadeIn(200);
                    IsFloorActive = true;
                     //$('.coontent').removeClass('content--show');
                };
            });

        $('#profb')
            .click(function goPro() {
                if (IsFloorActive) {
                    clearFloor();
                    goPro();
                } else {

                    $('#profi')
                        .fadeIn(200);
                    //$('#usersName').text(Parse.User.current().getUsername());
                    Parse.User.current()
                        .fetch()
                        .then(function (user) {

                            $('#usersName')
                                .text(user.get('Perf'));
                        });
                    IsFloorActive = true;

                };

            });

        $('#initSearch')
            .click(function () {
                getSearchRes();
                $('#searchRes')
                    .fadeIn(300);
            });

        $('#logInSubmit')
            .click(function () {
                signIn();
            });

        $('#logInTrigger')
            .click(function () {

                $('#furst')
                    .fadeOut(1);
                $('#loginTriged')
                    .fadeIn(900);
            });

        $('#clearDaSearch')
            .click(function () {
                removeSearchElements();
            });

        $('#updateAbout')
            .click(function () {
                updateAbout();
            }); // save button on about me in profile

        $('#logOut')
            .click(function logOut() {
                Parse.User.logOut();
                location.reload();
            }); // log out button

        $('#favourite')
            .click(function () {}); // **NOT COMPLETE**

        $('#backBtn')
            .on('click', function () {
                //explicitly clear ALL subcategories
                $('#depCon')
                    .hide();
                $('#skiCon')
                    .hide();
                $('#proCon')
                    .hide();
                $('#intCon')
                    .hide();
                $('#mainCon')
                    .fadeIn(100);
            }); // back button nav from main search categories

        $('#backBtn1')
            .on('click', function () {

                $('#depCon')
                    .hide();
                $('#skiCon')
                    .hide();
                $('#proCon')
                    .hide();
                $('#intCon')
                    .hide();
                $('#mainCon')
                    .fadeIn(100);
            }); // back button nav from main search categories

        $('#backBtn2')
            .on('click', function () {
                $('#depCon')
                    .hide();
                $('#skiCon')
                    .hide();
                $('#proCon')
                    .hide();
                $('#intCon')
                    .hide();
                $('#mainCon')
                    .fadeIn(100);
            }); // back button nav from main search categories

        $('#backBtn3')
            .on('click', function () {
                $('#depCon')
                    .hide();
                $('#skiCon')
                    .hide();
                $('#proCon')
                    .hide();
                $('#intCon')
                    .hide();
                $('#mainCon')
                    .fadeIn(100);
            }); // back button nav from main search categories

        var $rows = $('#dialk li #boxed'); // Adding skills from profile menu

        $('.search')
            .keyup(function () {

                var val = '^(?=.*\\b' + $.trim($(this)
                        .val())
                    .split(/\s+/)
                    .join('\\b)(?=.*\\b') + ').*$'
                    , reg = RegExp(val, 'i')
                    , text;

                $rows.show()
                    .filter(function () {
                        text = $(this)
                            .text()
                            .replace(/\s+/g, ' ');
                        return !reg.test(text);
                    })
                    .hide();
            }); // Adding skills from profile menu

        $('#dialk li #boxed')
            .click(function () {
                $(this)
                    .appendTo($('#addToAdd'));
            }); // Adding skills from profile menu

        $('#more')
            .click(function () {
                $('#slidein')
                    .animate({
                        width: "180px"
                    }, 1000);
            }); // This is for the more tab on the azure SO

        $('#loog')
            .submit(function (event) {
                event.preventDefault();
                signIn();
            }); // login button

        $('.selectable')
            .each(function () {

                $(this)
                    .on("click", function () {
                        $(this)
                            .remove()
                    });
            }); // Attempt at beting able to remove individual search items
        function pleaseWork() {

            

                var bodyEl = document.body
                    , docElem = window.document.documentElement
                    , support = {
                        transitions: Modernizr.csstransitions
                    }
                    , // transition end event name
                    transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd'
                        , 'MozTransition': 'transitionend'
                        , 'OTransition': 'oTransitionEnd'
                        , 'msTransition': 'MSTransitionEnd'
                        , 'transition': 'transitionend'
                    }
                    , transEndEventName = transEndEventNames[Modernizr.prefixed('transition')]
                    , onEndTransition = function (el, callback) {
                        var onEndCallbackFn = function (ev) {
                            if (support.transitions) {
                                if (ev.target != this) return;
                                this.removeEventListener(transEndEventName, onEndCallbackFn);
                            }
                            if (callback && typeof callback === 'function') {
                                callback.call(this);
                            }
                        };
                        if (support.transitions) {
                            el.addEventListener(transEndEventName, onEndCallbackFn);
                        } else {
                            onEndCallbackFn();
                        }
                    }
                    , gridEl = document.getElementById('theGrid')
                    , sidebarEl = document.getElementById('theSidebar')
                    , gridItemsContainer = gridEl.querySelector('section.griid')
                    , contentItemsContainer = gridEl.querySelector('section.coontent')
                    , gridItems = gridItemsContainer.querySelectorAll('.grid__iteem')
                    , contentItems = contentItemsContainer.querySelectorAll('.content__item')
                    , closeCtrl = contentItemsContainer.querySelector('.close-button')
                    , searchControl = document.getElementById('searb')
                    , current = -1
                    , lockScroll = false
                    , xscroll, yscroll
                    , isAnimating = false
                    , menuCtrl = document.getElementById('menu-toggle')
                    , menuCloseCtrl = sidebarEl.querySelector('.close-button');

                /**
                 * gets the viewport width and height
                 * based on http://responsejs.com/labs/dimensions/
                 */
                function getViewport(axis) {
                    var client, inner;
                    if (axis === 'x') {
                        client = docElem['clientWidth'];
                        inner = window['innerWidth'];
                    } else if (axis === 'y') {
                        client = docElem['clientHeight'];
                        inner = window['innerHeight'];
                    }

                    return client < inner ? inner : client;
                }

                function scrollX() {
                    return window.pageXOffset || docElem.scrollLeft;
                }

                function scrollY() {
                    return window.pageYOffset || docElem.scrollTop;
                }

                function init() {
                    initEvents();
                }

                function initEvents() {
        [].slice.call(gridItems)
                        .forEach(function (item, pos) {
                            // grid item click event
                            item.addEventListener('click', function (ev) {
                                ev.preventDefault();
                                if (isAnimating || current === pos) {
                                    return false;
                                }
                                isAnimating = true;
                                // index of current item
                                current = pos;
                                // simulate loading time..
                                classie.add(item, 'grid__iteem--loading');
                                setTimeout(function () {
                                    classie.add(item, 'grid__iteem--animate');
                                    // reveal/load content after the last element animates out (todo: wait for the last transition to finish)
                                    setTimeout(function () {
                                        loadContent(item);
                                    }, 500);
                                }, 1000);
                            });
                        });

                    closeCtrl.addEventListener('click', function () {
                        // hide content
                        hideContent();
                    });
                    searchControl.addEventListener('click', function(){
                        hideContent();
                    })

                    // keyboard esc - hide content
                    document.addEventListener('keydown', function (ev) {
                        if (!isAnimating && current !== -1) {
                            var keyCode = ev.keyCode || ev.which;
                            if (keyCode === 27) {
                                ev.preventDefault();
                                if ("activeElement" in document)
                                    document.activeElement.blur();
                                hideContent();
                            }
                        }
                    });

                    // hamburger menu button (mobile) and close cross
                    menuCtrl.addEventListener('click', function () {
                        if (!classie.has(sidebarEl, 'sidebar--open')) {
                            classie.add(sidebarEl, 'sidebar--open');
                        }
                    });

                    menuCloseCtrl.addEventListener('click', function () {
                        if (classie.has(sidebarEl, 'sidebar--open')) {
                            classie.remove(sidebarEl, 'sidebar--open');
                        }
                    });
                }

                function loadContent(item) {
                    // add expanding element/placeholder 
                    var dummy = document.createElement('div');
                    dummy.className = 'placeholder';

                    // set the width/heigth and position
                    dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth / gridItemsContainer.offsetWidth + ',' + item.offsetHeight / getViewport('y') + ',1)';
                    dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth / gridItemsContainer.offsetWidth + ',' + item.offsetHeight / getViewport('y') + ',1)';

                    // add transition class 
                    classie.add(dummy, 'placeholder--trans-in');

                    // insert it after all the grid items
                    gridItemsContainer.appendChild(dummy);

                    // body overlay
                    classie.add(bodyEl, 'view-single');

                    setTimeout(function () {
                        // expands the placeholder
                        dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
                        dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
                        // disallow scroll
                        window.addEventListener('scroll', noscroll);
                    }, 25);

                    onEndTransition(dummy, function () {
                        // add transition class 
                        classie.remove(dummy, 'placeholder--trans-in');
                        classie.add(dummy, 'placeholder--trans-out');
                        // position the content container
                        contentItemsContainer.style.top = scrollY() + 'px';
                        // show the main content container
                        classie.add(contentItemsContainer, 'content--show');
                        // show content item:
                        classie.add(contentItems[current], 'content__item--show');
                        // show close control
                        classie.add(closeCtrl, 'close-button--show');
                        // sets overflow hidden to the body and allows the switch to the content scroll
                        classie.addClass(bodyEl, 'noscroll');

                        isAnimating = false;
                    });
                }

                function hideContent() {
                    var gridItem = gridItems[current]
                        , contentItem = contentItems[current];

                    classie.remove(contentItem, 'content__item--show');
                    classie.remove(contentItemsContainer, 'content--show');
                    classie.remove(closeCtrl, 'close-button--show');
                    classie.remove(bodyEl, 'view-single');

                    setTimeout(function () {
                        var dummy = gridItemsContainer.querySelector('.placeholder');

                        classie.removeClass(bodyEl, 'noscroll');

                        dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';
                        dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';

                        onEndTransition(dummy, function () {
                            // reset content scroll..
                            contentItem.parentNode.scrollTop = 0;
                            gridItemsContainer.removeChild(dummy);
                            classie.remove(gridItem, 'grid__iteem--loading');
                            classie.remove(gridItem, 'grid__iteem--animate');
                            lockScroll = false;
                            window.removeEventListener('scroll', noscroll);
                        });

                        // reset current
                        current = -1;
                    }, 25);
                }

                function noscroll() {
                    if (!lockScroll) {
                        lockScroll = true;
                        xscroll = scrollX();
                        yscroll = scrollY();
                    }
                    window.scrollTo(xscroll, yscroll);
                }

                init();

            

        };
    });

var dataset;
var smalldataset;
var dataset2 = [
    {"title": "Budget", "subtitle": "US$", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "Gross Profit", "subtitle": "US$", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "IMDB Score", "subtitle": "IMDB Score", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "User Reviews", "subtitle": "Number of User Reviews", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "Movie Likes", "subtitle": "Movie Facebook Likes", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "Director Likes", "subtitle": "Number of Director Facebook Likes", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "Actor1 Likes", "subtitle": "Actor1 Facebook Likes", "ranges": [0, 0, 0], "measures": [0], "markers": [0]},
    {"title": "Critic Reviews", "subtitle": "Number of Critic Reviews", "ranges": [0, 0, 0], "measures": [0], "markers": [0]}
];
//Define bar chart function 
function barChart(dataset, smalldataset) {
    //Set width and height as fixed variables
    var w = 520;
    var h = 500;
    var padding = 25;
    //Scale function for axes and radius
    var yScale = d3.scale.linear()
            .domain(d3.extent(smalldataset, function (d) {
                return d.profit;
            }))
            .range([w + padding, padding]);
    var xScale = d3.scale.ordinal()
            .domain(smalldataset.map(function (d) {
                return d.movie_title;
            }))
            .rangeRoundBands([padding, h + padding], .5);
    //To format axis as a percent
    var formatPercent = d3.format("%1");
    var formatMoney = d3.format("$,");
    var formatNormal = d3.format(",");
    //Create y axis
    var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(8).tickFormat(d3.format("%s"));
    var yAxis2 = d3.svg.axis().scale(yScale).orient("left").ticks(8).tickFormat(d3.format("$s"));
    var yAxis3 = d3.svg.axis().scale(yScale).orient("left").ticks(8).tickFormat(d3.format("s"));
    //Define key function
    var key = function (d) {
        return d.movie_title
    };
    //Define tooltip for hover-over info windows
    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    //Create svg element
    var svg = d3.select("#chart-container").append("svg")
            .attr("width", w).attr("height", h)
            .attr("id", "chart")
            .attr("viewBox", "0 0 " + w + " " + h)
            .attr("preserveAspectRatio", "xMinYMin");
    //Resizing function to maintain aspect ratio (uses jquery)
    var aspect = w / h;
    var chart = $("#chart");
    $(window).on("resize", function () {
        var targetWidth = $("body").width();
        if (targetWidth < w) {
            chart.attr("width", targetWidth);
            chart.attr("height", targetWidth / aspect);
        } else {
            chart.attr("width", w);
            chart.attr("height", w / aspect);
        }

    });



    //Initialize state of chart according to drop down menu
    var state = d3.selectAll("option");
    //Create barchart
    svg.selectAll("rect")
            .data(smalldataset, key)
            .enter()
            .append("rect")
            .attr("class", function (d) {
                return d.profit < 0 ? "negative" : "positive";
            })
            .attr({
                x: function (d) {
                    return xScale(d.movie_title);
                },
                y: function (d) {
                    return yScale(Math.max(0, d.profit));
                },
                width: xScale.rangeBand(),
                height: function (d) {
                    return Math.abs(yScale(d.profit) - yScale(0));
                }
            })
            .on('mouseover', function (d) {
                d3.select(this)
                        .style("opacity", 0.2)
                        .style("stroke", "black")

                var info = div
                        .style("opacity", 1)
                        .style("left", (d3.event.pageX + 10) + "px")
                        .style("top", (d3.event.pageY - 30) + "px")
                        .text("Movie: " + d.movie_title)
                        .append("p")
                        .text("Lead Actor/Actress: " + d.actor_1_name)
                        .append("p")
                        .text("Directed by: " + d.director_name)

                if (state[0][0].selected) {
                    info.append("p")
                            .text("Profit Margin: " + formatMoney(d.profit))
                } else if (state[0][1].selected) {
                    info.append("p")
                            .text("Production Budget: " + formatMoney(d.budget));
                } else if (state[0][2].selected) {
                    info.append("p")
                            .text("Grossing: " + formatMoney(d.gross));
                } else if (state[0][3].selected) {
                    info.append("p")
                            .text("IMDB Score: " + formatNormal(d.imdb_score));
                } else if (state[0][4].selected) {
                    info.append("p")
                            .text("Director FaceBook Likes: " + formatNormal(d.director_facebook_likes));
                } else if (state[0][5].selected) {
                    info.append("p")
                            .text("Lead Actor/Actress FaceBook Likes: " + formatNormal(d.actor_1_facebook_likes));
                } else if (state[0][6].selected) {
                    info.append("p")
                            .text("Movie FaceBook Likes: " + formatNormal(d.movie_facebook_likes));
                } else if (state[0][7].selected) {
                    info.append("p")
                            .text("Num of User Votes: " + formatNormal(d.num_voted_users));
                }

                var dataset3 = [
                    {"title": "Budget", "subtitle": "US$", "ranges": [8000000, 19500000, 52000000], "measures": [d.budget], "markers": [32996849]},
                    {"title": "Gross Profit", "subtitle": "US$", "ranges": [8111360, 25450527, 75600000], "measures": [d.gross], "markers": [48337261]},
                    {"title": "IMDB Score", "subtitle": "US$", "ranges": [5, 7, 10], "measures": [d.imdb_score], "markers": [6.4]},
                    {"title": "User Reviews", "subtitle": "Number of User Reviews", "ranges": [81, 156, 389], "measures": [d.num_user_for_reviews], "markers": [273]},
                    {"title": "Movie Likes", "subtitle": "Number of Movie Facebook Likes", "ranges": [0, 161, 11000], "measures": [d.movie_facebook_likes], "markers": [7489]},
                    {"title": "Director Likes", "subtitle": "Number of Director Facebook Likes", "ranges": [11, 49, 277], "measures": [d.director_facebook_likes], "markers": [689]},
                    {"title": "Actor1 Likes", "subtitle": "Actor1 Facebook Likes", "ranges": [696, 984, 13000], "measures": [d.actor_1_facebook_likes], "markers": [6559]},
                    {"title": "Critic Reviews", "subtitle": "Number of Critic for Reviews", "ranges": [61, 110, 222], "measures": [d.num_critic_for_reviews], "markers": [140]}

                ];

                div.call(update12(dataset3));
            })
            .on('mouseout', function (d) {
                d3.select(this)
                        .style({'stroke-opacity': 0.5, 'stroke': '#a8a8a8'})
                        .style("opacity", 1);
                div
                        .style("opacity", 0);
            });
    //Add y-axis
    svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(40,0)")
            .call(yAxis2);
    //Sort data when sort is checked
    d3.selectAll(".checkbox").
            on("change", function () {
                var x0 = xScale.domain(smalldataset.sort(sortChoice())
                        .map(function (d) {
                            return d.movie_title;
                        }))
                        .copy();
                var transition = svg.transition().duration(750);
                var delay = function (d, i) {
                    return i * 10;
                };
                transition.selectAll("rect")
                        .delay(delay)
                        .attr("x", function (d) {
                            return x0(d.movie_title);
                        });
            })

    //Function to sort data when sort box is checked
    function sortChoice() {
        var state = d3.selectAll("option");
        var sort = d3.selectAll(".checkbox");
        if (sort[0][0].checked && state[0][0].selected) {
            var out = function (a, b) {
                return b.profit - a.profit;
            }
            return out;
        } else if (sort[0][0].checked && state[0][1].selected) {
            var out = function (a, b) {
                return b.budget - a.budget;
            }
            return out;
        } else if (sort[0][0].checked && state[0][2].selected) {
            var out = function (a, b) {
                return b.gross - a.gross;
            }
            return out;
        } else if (sort[0][0].checked && state[0][3].selected) {
            var out = function (a, b) {
                return b.imdb_score - a.imdb_score;
            }
            return out;
        } else if (sort[0][0].checked && state[0][4].selected) {
            var out = function (a, b) {
                return b.director_facebook_likes - a.director_facebook_likes;
            }
            return out;
        } else if (sort[0][0].checked && state[0][5].selected) {
            var out = function (a, b) {
                return b.actor_1_facebook_likes - a.actor_1_facebook_likes;
            }
            return out;
        } else if (sort[0][0].checked && state[0][6].selected) {
            var out = function (a, b) {
                return b.movie_facebook_likes - a.movie_facebook_likes;
            }
            return out;
        } else if (sort[0][0].checked && state[0][7].selected) {
            var out = function (a, b) {
                return b.num_voted_users - a.num_voted_users;
            }
            return out;
        } else {
            var out = function (a, b) {
                return d3.ascending(a.movie_title, b.movie_title);
            }
            return out;
        }
    }
    ;
    //Change data to correct values on input change
    function GetTopSelected3(arrayData) {  //sorting to top 3 function
        arrayData.sort(function (a, b) {
            return b.gross - a.gross;
        });
        return arrayData.slice(0, 15);
    }
    function GetTopSelected2(arrayData) {  //sorting to top 3 function
        arrayData.sort(function (a, b) {
            return b.budget - a.budget;
        });
        return arrayData.slice(0, 15);
    }
    var newsmalldataset;
    d3.selectAll("select").
            on("change", function () {
                var value = this.value;
                if (value == "bus") {
                    var x_value = function (d) {
                        return d.budget;
                    };
                    var color = function (d) {
                        return d.budget < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.budget));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.budget) - yScale(0));
                    };
                } else if (value == "demand") {
                    var x_value = function (d) {
                        return d.profit;
                    };
                    var color = function (d) {
                        return d.profit < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.profit));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.profit) - yScale(0));
                    };
                } else if (value == "gross") {
                    var x_value = function (d) {
                        return d.gross;
                    };
                    var color = function (d) {
                        return d.gross < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.gross));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.gross) - yScale(0));
                    };
                } else if (value == "score") {
                    var x_value = function (d) {
                        return d.imdb_score;
                    };
                    var color = function (d) {
                        return d.imdb_score < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.imdb_score));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.imdb_score) - yScale(0));
                    };
                } else if (value == "director") {
                    var x_value = function (d) {
                        return d.director_facebook_likes;
                    };
                    var color = function (d) {
                        return d.director_facebook_likes < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.director_facebook_likes));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.director_facebook_likes) - yScale(0));
                    };
                } else if (value == "lead") {
                    var x_value = function (d) {
                        return d.actor_1_facebook_likes;
                    };
                    var color = function (d) {
                        return d.actor_1_facebook_likes < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.actor_1_facebook_likes));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.actor_1_facebook_likes) - yScale(0));
                    };
                } else if (value == "movie") {
                    var x_value = function (d) {
                        return d.movie_facebook_likes;
                    };
                    var color = function (d) {
                        return d.movie_facebook_likes < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.movie_facebook_likes));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.movie_facebook_likes) - yScale(0));
                    };
                } else if (value == "user") {
                    var x_value = function (d) {
                        return d.num_voted_users;
                    };
                    var color = function (d) {
                        return d.num_voted_users < 0 ? "negative" : "positive";
                    };
                    var y_value = function (d) {
                        return yScale(Math.max(0, d.num_voted_users));
                    };
                    var height_value = function (d) {
                        return Math.abs(yScale(d.num_voted_users) - yScale(0));
                    };
                }
                //Update y scale
                yScale.domain(d3.extent(smalldataset, x_value));
                //Update with correct data
                var rect = svg.selectAll("rect").data(smalldataset, key);
                rect.exit().remove();
                //Transition chart to new data
                rect
                        .transition()
                        .duration(2000)
                        .ease("linear")
                        .each("start", function () {
                            d3.select(this)
                                    .attr("width", "0.2")
                                    .attr("class", color)
                        })
                        .attr({
                            x: function (d) {
                                return xScale(d.movie_title);
                            },
                            y: y_value,
                            width: xScale.rangeBand(),
                            height: height_value

                        });
                //Update y-axis
                if (value == "bus") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis2);
                } else if (value == "demand") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis);
                } else if (value == "gross") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis2);
                } else if (value == "score") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis3);
                } else if (value == "director") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis3);
                } else if (value == "lead") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis3);
                } else if (value == "movie") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis3);
                } else if (value == "user") {
                    svg.select(".y.axis")
                            .transition()
                            .duration(1000)
                            .ease("linear")
                            .call(yAxis3);
                }
            });
}
;

d3.csv("movie_metadata.csv", function (error, data) {
    if (error) {
        console.log(error);
    } else {

        data.forEach(function (d) {
            d.profit = parseFloat(d.gross-d.budget);
            d.budget = parseFloat(d.budget);
            d.gross = parseFloat(d.gross);
            d.imdb_score = parseFloat(d.imdb_score);
            d.director_facebook_likes = parseFloat(d.director_facebook_likes);
            d.actor_1_facebook_likes = parseFloat(d.actor_1_facebook_likes);
            d.movie_facebook_likes = parseFloat(d.movie_facebook_likes);
            d.num_voted_users = parseFloat(d.num_voted_users);
        });
        dataset = data;
        smalldataset = GetTopSelected1(data);
        barChart(dataset, smalldataset);
    }
});

function GetTopSelected1(arrayData) {  //sorting to top 10 function
    arrayData.sort(function (a, b) {
        return b.profit - a.profit;
    });
    return arrayData.slice(0, 10);
}




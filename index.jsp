

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->



<html>
    <head>
        <title>Big Screen</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="robots" content="noindex, nofollow">
        <meta name="googlebot" content="noindex, nofollow">
        <script type="text/javascript" src="//d3js.org/d3.v3.js"></script>
        <script src='bootstrap.js'></script>
        <link href='bootstrap.css' rel='stylesheet'>
        <link href='custom.css' rel='stylesheet'>
        <link href="transport.css" rel="stylesheet">
        <script src="bullet.js"></script>
        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
        <style>
            .bullet { font: 10px sans-serif; }
            .bullet .marker { stroke: #000; stroke-width: 2px; }
            .bullet .tick line { stroke: #666; stroke-width: .5px; }
            .bullet .range.s0 { fill: #eee }   
            .bullet .range.s1 { fill: #ddd; }
            .bullet .range.s2 { fill: #ccc; }
            .bullet .measure.s0 { fill: lightsteelblue; }
            .bullet .measure.s1 { fill: steelblue; }
            .bullet .title { font-size: 14px; font-weight: bold; }
            .bullet .subtitle { fill: #999; }
        </style>


    </head>
    <body class="pagebg">
        <!--<div class="navbar navbar-inverse navbar-fixed-top">-->
        <div  role="navigation" class=' post container  navbar navbar-default navbar-inverse blue'>   
            <div class="navbar-header">
                <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.jsp">Big Screen</a>
            </div>

            <div id="navbarCollapse" class="collapse navbar-collapse">
                <form action="index.jsp" method="post">
                    <ul class="nav navbar-nav">
                        <li ><button class='navbar-brand btn-link' name="menu" value="profit">Most Profitable Movies </button></li>
                        <li ><button class='navbar-brand btn-link' name="menu" value="budget">Highest Budget Movies</button>  </li>
                        <li ><button class='navbar-brand btn-link' name="menu" value="imdb">Highest Rated IMDB Score Movies</button></li>
                        <li ><button class='navbar-brand btn-link' name="menu" value="facebook">Most 'Likes' Movies</button>  </li>
                    </ul>
                </form>

            </div>
        </div>
        <div>
            <%
                String option = request.getParameter("menu");
                String linktoJS = "";
                if (option != null) {

                    if (option.equals("profit")) {
                        linktoJS = "profit.js";
                    } else if (option.equals("budget")) {
                        linktoJS = "budget.js";
                    } else if (option.equals("imdb")) {
                        linktoJS = "imdb.js";
                    } else if (option.equals("facebook")) {
                        linktoJS = "facebook.js";
                    }
            %>
            <div id='dashboard'></div>
            <div class ="description">
                <table cellpadding='10'>
                    <tr>
                        <td>
                            <select>
                                <option id="item" value="demand">Profit</option>
                                <option id="item" value="bus">Budget</option>
                                <option id="item" value="gross">Grossing</option>
                                <option id="item" value="score">IMDB Score</option>
                                <option id="item" value="director">Director Popularity (Facebook)</option>
                                <option id="item" value="lead">Lead Actor Popularity (Facebook)</option>
                                <option id="item" value="movie">Movie Popularity (FaceBook)</option>
                                <option id="item" value="user">Number of Votes by IMDB Users</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <ul>
                                <li><input type="checkbox" class="checkbox" name="check" value="sort"> </li>
                                <li>Sort by Descending Order</li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </div>
            <br>
            <div id="chart-container">
                <script type="text/javascript" src= "<%=linktoJS%>"></script>
            </div> <!--description-->

            <%
                }

            %>

        </div>
        <div id="bulletchartz">
            <script>
                var margin = {top: 5, right: 40, bottom: 20, left: 120},
                width = 760 - margin.left - margin.right,
                        height = 50 - margin.top - margin.bottom;

                var chart1 = d3.bullet()
                        .width(width)
                        .height(height);

                var svg = d3.select("body").selectAll("svg")
                        .data(dataset2)
                        .enter().append("svg")
                        .attr("class", "bullet")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .call(chart1);

                var title = svg.append("g")
                        .style("text-anchor", "end")
                        .attr("transform", "translate(-6," + height / 2 + ")");

                title.append("text")
                        .attr("class", "title")
                        .text(function (d) {
                            return d.title;
                        });

                title.append("text")
                        .attr("class", "subtitle")
                        .attr("dy", "1em")
                        .text(function (d) {
                            return d.subtitle;
                        });

                function update12(data123) {
                    svg.data(data123).call(chart1.duration(1000)); // TODO automatic transition
                }

                function randomize(d) {
                    if (!d.randomizer)
                        d.randomizer = randomizer(d);
                    d.ranges = d.ranges.map(d.randomizer);
                    d.markers = d.markers.map(d.randomizer);
                    d.measures = d.measures.map(d.randomizer);
                    return d;
                }

                function randomizer(d) {
                    var k = d3.max(d.ranges) * .2;
                    return function (d) {
                        return Math.max(0, d + k * (Math.random() - .5));
                    };
                }
            </script>
        </div>
    </body>


</html>

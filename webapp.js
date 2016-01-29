document.addEventListener("DOMContentLoaded", start);

function start() {
    DatenAbfrage(DatenVisualisierung);
    
    // Alle 30 Sekunden
    window.setInterval (function () {
        console.log ("Daten aktualisiert um " + uhrzeit());
        DatenAbfrage(DatenVisualisierung);
    }, 30 * 1000);
}

function uhrzeit () {
    var a = new Date();
    var b = a.getHours();
    var c = a.getMinutes();
    var d = a.getSeconds();
    return b + ":" + c + ":" + d;   
}

function DatenAbfrage(callback) {
    var xhttp = new XMLHttpRequest ();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            callback(xhttp.responseText);
        }
    };
    xhttp.open("GET", "https://arsnova.eu/api/statistics", true);
    xhttp.send();
}

var daten;
function DatenVisualisierung(json) {
    daten = JSON.parse(json);
    
    // OpenSessions, ClosedSessions
    var chart = new CanvasJS.Chart("sessionVisualisierung",
	{
		title: { text: "Offene und geschlossene Sessions" },
		data: [
            {       
                type: "pie",
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["openSessions"], label: "Open Sessions" },
                    {  y: daten["closedSessions"], label: "Closed Sessions" }
                ]
            }
        ]
	});
    
    // Questions
    var chart2 = new CanvasJS.Chart("questionVisualisierung",
	{
		title: { text: "Typen von Fragen" },
		data: [
            {       
                type: "pie",
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["lectureQuestions"], label: "Lecture Questions" },
                    {  y: daten["preparationQuestions"], label: "Preparation Questions" },
                    {  y: daten["interposedQuestions"], label: "Interposed Questions" },
                    {  y: daten["conceptQuestions"], label: "Concept Questions" }
                ]
            }
        ]
	});
    
    // Users
    var chart3 = new CanvasJS.Chart("userVisualisierung",
	{
		title: { text: "Nutzerdaten" },
		data: [
            {       
                type: "pie",
                indexLabel: "{y} {label}",
                dataPoints: [
                    {  y: daten["activeUsers"], label: "Active Users" },
                    {  y: daten["activeStudents"], label: "Active Students" },
                    {  y: daten["creators"], label: "Creators" }
                ]
            }
        ]
	});
/*

				{  y: daten["lectureQuestions"], label: "Vortragsfragen" },
                {  y: daten["preparationQuestions"], label: "Vorbereitungsfragen" },
                {  y: daten["interposedQuestions"], label: "Zwischenfragen" },
                {  y: daten["conecptQuestions"], label: "Konzipierte Fragen" }
                */
    // Questions
	chart.render();
	chart2.render();
	chart3.render();
}
var playing = false;
var score;
var action;
var timeremaining;
var ans;

//click on ok
document.getElementById("okay").onclick = function() {
    location.reload();
}

//click on start/reset
document.getElementById("startreset").onclick = function() {

    //if we playing then reset
    if (playing)
    {
        location.reload();    //reload
    }

    //if not playing then start
    else
    {
        hide("correct");
        hide("wrong");
        hide("instruction");
        hide("gameover");
        show("score");
        show("option");
        show("statement");
        show("question");
        

        playing = true;
        
        //set score to zero
        score = 0;
        document.getElementById("scorecount").innerHTML = score;

        //show countdown box
        show("timeremaining");
        timeremaining = 60;

        //reduce time
        document.getElementById("timecount").innerHTML = timeremaining;
        startcount();

        //button text to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //generate question answers
        generate();
    }

}


//when click on answer box
for (i=1;i<=4;i++) {
document.getElementById("option"+i).onclick = function() {
        //if we playing
        if(playing==true) {
            //correct
            if(this.innerHTML==ans) {
                //increase score
                score += 10;
                document.getElementById("scorecount").innerHTML = score;
                hide("wrong");
                //show correct box for 1 sec
                show("correct");
                setTimeout(function() {
                    hide("correct");
                },1000);
                //generate new question answer
                generate();
            }
            //incorrect
            else
            {
                //decrease score
                score -= 5;
                document.getElementById("scorecount").innerHTML = score;
                //show try again box for 1 sec
                hide("correct");
                //show correct box for 1 sec
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                },1000);
            }
        }   
} 
}




//FUNCTIONS

//show gameover when time is 0, otherwise decrease time
function startcount() {
    action = setInterval(function() {
        timeremaining--;
        document.getElementById("timecount").innerHTML = timeremaining;
        if (timeremaining<=10) {
            document.getElementById("timeremaining").style.color = "rgb(201, 111, 111)";
            document.getElementById("timeremaining").style.fontWeight = "bold";
        }
        if (timeremaining==0) {
            clearInterval(action);
            timeremaining = 0;
            show("gameover");
            document.getElementById("gameover").innerHTML = "GAMEOVER!<br/>YOUR SCORE IS: " + score;
            show("okay");
            hide("startreset");
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    },1000);
}

// function stopCountdown() {
//     clearInterval(action);
// }

//generate questions
function generate() {
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    ans = x*y;
    document.getElementById("question").innerHTML = x+" x "+y;
    var pos = 1+Math.round(3*Math.random());
    document.getElementById("option"+pos).innerHTML = ans;

    var options = [ans];
    for (i=1;i<=4;i++)
    {
        if (i!=pos)
        {
            var temp;
            do {
                temp = (1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
            }while (options.indexOf(temp)>-1)
            document.getElementById("option"+i).innerHTML = temp;
            options.push(temp);
        }
    }
}

//hide a div
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

//show a div
function show(Id) {
    document.getElementById(Id).style.display = "block";
}
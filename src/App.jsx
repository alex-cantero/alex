import React from 'react';
import './App.css';

let SHAPECOUNT = 200;
const stars = [];
for (let i=0;i<SHAPECOUNT;i++) {
  var s = [i,getRandomInt(2,10),getRandomFloat(0.65,1,2),getRandomFloat(0.8,1.2,1),getRandomInt(1,99),getRandomInt(1,99)];
  stars.push(s);
}
class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 25,
      stars: stars
    }
  };

  onChangeValue = event => {
    for (let i=0;i<event.target.value;i++) {
        document.getElementById("star-"+i).style.visibility = "visible";
    }
    for (let i=event.target.value;i<SHAPECOUNT;i++) {
        document.getElementById("star-"+i).style.visibility = "hidden";
    }
    this.setState({ count: event.target.value });
   };

  render() {
    //[id,size,opacity,duration,x,y]
    const items = this.state.stars.map( (e,i) => <div key={e[0]} style={{
      height: e[1] + 'px',
      width: e[1] + 'px',
      opacity: e[2],
      animationDuration: + e[3] +'s',
      top: e[4] + '%',
      left: e[5] + '%',
      visibility: (i<25) ? 'visible' : 'hidden'
    }} className={"star-" + e[0] + " star"} id={"star-" + e[0]}></div> );

    return (
      <div>
        <div id="slidecontainer">
          <input value={this.state.count} onChange={this.onChangeValue} type="range" min={1} max={SHAPECOUNT} className="slider" id="myRange" /><span id="demo"></span>
        </div>
        {items}
      </div>
    )
  }
}

class Quotes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        randomIndex: 5,
        error : null,
        isLoaded : false,
        color : 0,
        quotes : []    
    };
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount(){
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then( response => response.json())
    .then(
        // handle the result
        (result) => {
          var thisQuotes = Object.values(result.quotes);
          this.setState({
            isLoaded : true,
            quotes : thisQuotes
          });
        },
        // Handle error 
        (error) => {
            this.setState({
              isLoaded: true,
              error
            })
        },
    )
  }
  getQuote() {
    this.setState({
      randomIndex: Math.floor(Math.random() * this.state.quotes.length),
      color: Math.floor(Math.random() * 9)
    });
  }
  render() {
    const colors = ['(137,45,45)','(52,38,116)','(58,21,90)','(105,83,83)','(78,108,126)','(50,130,254)','(124,98,162)','(84,87,170)','(45,200,170)','(131,106,155)'];
    let rgbacolors = colors.map( e => e.slice(0, e.length-1) + ", 0.75" + ")");
    let fontcolor = colors[this.state.color];
    let quoteColor = rgbacolors[this.state.color];
    return (
      <div style={{background: "rgba"+quoteColor}}>
        {this.state.isLoaded &&
        <blockquote style={{color: "rgba"+fontcolor}} id={'text'}>{this.state.quotes[this.state.randomIndex].quote}<span id={'author'}> -{this.state.quotes[this.state.randomIndex].author}</span></blockquote>}
        {this.state.isLoaded &&
        <ul className={"buttons"}>
          <li><a className="button" id={'tweet-quote'} style={{background: "rgba"+quoteColor}} target={'_blank'} href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + this.state.quotes[this.state.randomIndex].quote + '" ' + this.state.quotes[this.state.randomIndex].author)}>Tweet this!</a></li>
          <li><a className="button" id={'tumblr-quote'} style={{background: "rgba"+quoteColor}} target={'_blank'} href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=" + encodeURIComponent(this.state.quotes[this.state.randomIndex].quote)+ "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}>Tumblr this!</a></li>
          <li><a className="button" id={'new-quote'} onClick={this.getQuote}>New Quote</a></li>
        </ul>
        }     
      </div>
    )
  }
}

function getRandomFloat(min, max, n) {
	return (Math.random() * (max - min) + min).toFixed(n);
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export {
  Quotes,
  Stars
}

//Get the modal
let modal = document.getElementById("hire-me");
// Get the button that opens the modal
let btnModal = document.getElementById("my-btn");
// Get the <span> element that closes the modal
let spanClose = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnModal.onclick = () => {
  modal.style.display = "flex";
  document.getElementsByClassName("close")[0].classList.remove("animate-close");
  document.getElementById("modal-body").setAttribute("style","height:auto;");
}

// When the user clicks on <span> (x), close the modal
spanClose.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    document.getElementsByClassName("close")[0].classList.remove("animate-close");
    document.getElementById("modal-body").setAttribute("style","height:auto;");
    modal.style.display = "none";
  }
}

  let $email = document.getElementById("theemail").value;
  document.getElementById("hireme").addEventListener("click", (e) => {
    e.preventDefault();
    sendEmail();
  })

function validateEmail(elementValue){
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(elementValue);
}

function sendEmail() {
  var email = document.getElementById("theemail").value;
	var name =  document.getElementById("thename").value;
	var comments = document.getElementById("thecomments").value;
	if (validateEmail(email)) {
  
		var request = new XMLHttpRequest();
		var url = "http://alexcantero.com/sendemail.php";
		request.open("POST", url, true);
		request.setRequestHeader("Content-Type", "application/json");
		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				var jsonData = JSON.parse(request.response);
				console.log(request.response);
				console.log(jsonData);
			}
		};
		var data = JSON.stringify({"name": name, "email": email, "comments": comments});
		request.send(data);
		document.getElementsByClassName("close")[0].classList.add("animate-close");
		document.getElementById("modal-footer").setAttribute("style","opacity:1");
		document.getElementById("hireme-form").reset();
	}
}
let goUp = document.getElementById("up");
goUp.onclick = () => {
  console.log('sdf');
}
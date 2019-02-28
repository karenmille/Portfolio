function id(ID){
	return document.getElementById(ID);
}
time();
checkCookie(); 
pageMenu();


function time() {
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    id('time').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(time, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


//Page main menu
function pageMenu(){
	var pageNav = [
		['Home','index.html'],
		['About Me','aboutme.html'],
		['Gallery','gallery.html'],
		['Demo','mypage.html'],
		['Contact Me','contactme.html']
	];
	var nav = document.getElementsByTagName('nav')[0];
	var div = document.createElement('div'); // create div tag
	div.setAttribute('class','wrap'); //add wrap class to nav
	nav.appendChild(div);// add div tag to nav 
	
	var ul = document.createElement('ul');
	
	div.appendChild(ul);
	
	for(var i = 0; i < pageNav.length; i++) {
    // Create the list item:
    var item = document.createElement('li');
    
    for(var x = 1; x < 2;x++){
	    var pageLink = document.createElement("a");
			pageLink.href = pageNav[i][1];
			pageLink.text = pageNav[i][0];
			item.appendChild(pageLink);
		}
    ul.appendChild(item);
     
  }
 
  if(pageLink.text == pageLink.text){
		 ul.removeChild(pageLink);
  }
}

//Cookies
var username;
var counter = 1;

function checkCookie(){
	
if(document.cookie != ''){
	var len = document.cookie.length - 1;
	var user_name = document.cookie.substr(5, len);
	//var visits = getCookie("visits");
	var visits = 1;
	visits = parseInt(visits) + 1;
	id('vistor').innerHTML =  'Welcome back, ' + user_name + ' I note, you have been here ' + visits + ' times.';
	
}
else {
	
	username = prompt("Please enter your name");
	
	id('vistor').innerHTML = 'Welcome ' + username + 'By the way, this is your first time here.';
	if (username != "" && username != null)
		check(username);
	}


}

function check(user){
	var expires = new Date();
	expires.setFullYear(expires.getFullYear() - 1);
	
	document.cookie = escape('name') + '=' + escape(username) + '; expires' + expires.toGMTString();
}


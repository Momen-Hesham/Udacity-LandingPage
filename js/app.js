/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const MainElement = document.querySelector("main");
const MainTitle = document.querySelector("html");


const Sec4 = document.querySelector("section").cloneNode(true);

const NavBar=document.querySelector(".navbar__menu");
const NavList=document.querySelector("#navbar__list");

const fragment= document.createDocumentFragment();

const TextNav="<button id ='Logo'> Landing Page </button>";

const UpElement=document.createElement("button");

let LastActiveSec=document.querySelector("section");
let SectionsId=[];
let ButtonsIds=[];
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
let myVar;
function HideNav() {
    myVar=setTimeout(function(){
        NavBar.style.display="none";
    }, 3000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

/************************ Change the Height of Nav bar *******************/
NavBar.style.height="3em";

/*****************************  Build The UP Button ***********************/
UpElement.innerText="Up";
UpElement.id="UpButton";
UpElement.style.cssText="font-size:large;background-color:#000;padding:15px 32px;bottom:0px;right:0px;position:fixed;color:red;z-index: 5;"
MainElement.appendChild(UpElement);

/************************** Build The 4th Section**************************/
MainElement.appendChild(Sec4);
Sec4.id="section4"
Sec4.setAttribute("data-nav","Section 4");
const Sec4Header=document.querySelector("#section4 h2");
Sec4Header.innerText="Section 4";


/************************ Build the 4 Sections Buttons at nav bar *********/
const Sections=document.querySelectorAll("section");

for(let sec of Sections)
{
  SectionsId.push(sec.id);
  //const SecXLi=document.createElement("li");
  const SecXNav=document.createElement("button");
  SecXNav.id = `${sec.id}Nav`;
  ButtonsIds.push(SecXNav.id);
  SecXNav.innerText=sec.getAttribute("data-nav");

  SecXNav.style.cssText="display: inline-block; font-size: large;background-color:#FFFFFF;font-weight: bold;border: none;color: #000;padding: 15px 32px;text-align: center;font-family: Arial, Helvetica, sans-serif;"
  fragment.appendChild(SecXNav);

}
NavList.appendChild(fragment);


/**************** Build The Logo or the "Landing Page" Button**************/
NavBar.insertAdjacentHTML("afterBegin",TextNav);
const TextElement=document.querySelector("#Logo");
TextElement.style.cssText="display: inline-block; background-color:#FFFFFF;border: none;font-family: Arial, Helvetica, sans-serif;font-size:large;font-weight:bold;float:left;color:#000;padding: 15px 32px;text-align: center;"

/****************** Helper Variable ***************************************/
let LastActiveButton = document.querySelector("ul button");
LastActiveButton.style.backgroundColor="#02B3E4";

// Add class 'active' to section when near top of viewport
function SetActive()
{
  clearTimeout(myVar);
  NavBar.style.display="block";
  for(let sec of Sections)
  {
      const rect = sec.getBoundingClientRect();
      if( rect.top <100 && rect.top >-450 && sec!=LastActiveSec)
      {
        // Set the On-Window Section to active Section0
        let but =document.querySelector(`#${sec.id}Nav`);
        LastActiveSec.classList.toggle("your-active-class");
        sec.classList.add("your-active-class");
        LastActiveSec=sec;

        // Turn the background color of relative Button
        LastActiveButton.style.backgroundColor="#FFFFFF";
        but.style.backgroundColor="#02B3E4";
        LastActiveButton=but;

      }

      // Display or non-display the Up Button
      if(MainTitle.getBoundingClientRect().y != 0){
        UpElement.style.display="block";
      }
      else {
        UpElement.style.display="none";
      }
  }
  // Hide The nav bar after time
  HideNav();

}



// Scroll to anchor ID using scrollTO event

function ScrollFunc(XEvent) {
  NavBar.style.display="block";

  for(let i in ButtonsIds )
  {
    if(XEvent.target.id == ButtonsIds[i])
      document.getElementById(SectionsId[i]).scrollIntoView({behavior: "smooth"});
  }
  if( XEvent.target.id == "Logo")
      MainTitle.scrollIntoView({behavior: "smooth"});
  if( XEvent.target.id == "UpButton")
      MainTitle.scrollIntoView({behavior: "smooth"});

}

/**
 * End Main Functions
 * Begin Events
 *
*/

/********************** Build Events Listeners For Up Button ***********************/

// Up Button Event
UpElement.addEventListener('click', ScrollFunc);

// 4 Section Buttons Events
const buttons=document.querySelectorAll("button");
for(let button of buttons)
{
  button.addEventListener('click', ScrollFunc);
}

// "Logo" Button or "Landing Page" Button Event
TextElement.addEventListener('click', ScrollFunc);
// Scroll Event
window.addEventListener('scroll',SetActive);

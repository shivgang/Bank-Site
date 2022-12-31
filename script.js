'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  //preventDefault prevents the page from jumping to the top
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Opening the Modal window upon clicking on oprnModal buttons
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  //returns a DOMrect() which gives info like x position(position from left), y position(position from right side)
  //RETURNS THE RELATIVE COORDINATES WRT TO THE PAGE(i.e at any point where we are on a page)
  // const s1coords = section1.getBoundingClientRect();

  // console.log(s1coords);

  //e.Target is the event that is clicked
  //getBoundingClientRect() Returns the x-distance,y-distance, width, height and so on...
  // console.log(e.target.getBoundingClientRect());

  //Returnes the current scroll(i.e. where we are on the page according to how much the page is scrolled)
  // console.log('Current scroll(X/Y)', window.pageXOffset, window.pageYOffset);
  //The below function returns the height and width viewport
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //Scrolling to targeted section 2 using coordinates extracted from section1
  //(Adding the current depth of scroll + how much the location is below the top of the page)
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   //makes the scrolling smooth
  //   behavior: 'smooth',
  // });

  //Simple way of scrolling to the targeted location
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     //Getting the id of the element that has been clicked
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event Delegation--> Putting event listener on the common parent of all the events we are interested in
//Event delegation-->
//1. Add event listener to common parent element.
//2.Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    //Getting the id of the element that has been clicked
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TARGETING THE OPERATIONS(Transfers,Loans,Closure)
//Includes the individual buttons
const tabs = document.querySelectorAll('.operations__tab');

//All the buttons are included inside this
const tabsContainer = document.querySelector('.operations__tab-container');

//Contains the area which includes the description of facilities
const tabsContent = document.querySelectorAll('.operations__content');

//We are adding the event to the parent of all buttons for good speed practice

tabsContainer.addEventListener('click', function (e) {
  //Will look for the closest operations tab(i.e. button)
  const clicked = e.target.closest('.operations__tab');
  //Ignoring the clicks at places than than our operations tab
  if (!clicked) return;
  //To set the clicked button to rise high(removing the class for this operation is done on all the tabs first)
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate the content area(and removing the content area of all other buttons)

  //First selecting the clicked button

  //Removing the class from all
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //Adding the class to the clicked button
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation

const nav = document.querySelector('.nav');

//This contains the accepted value in the accepting function
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    //Selecting the siblings using the parent
    const siblings = link.closest('.nav').querySelectorAll('nav__link');
    //Selecting our logo
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Bind is used in callBack functions when we want to bind values to the function while calling(the value passed is present inside this of the accepting function)
nav.addEventListener('mouseover', handleHover.bind(0.5));
//Changing the opacity back to 1 after the mouse is hovered out
nav.addEventListener('mouseout', handleHover.bind(1));

//STICKY NAVIGATION
//Getting the initial coordinates from section 1
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// //scroll is available on window
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);
//   //initialCoords.top is the position of section 1 wrt to the start of page
//   //windiow.scrollY is the amount by which we have scrolled down the page
//   //As soon we reach section 1, the nav is sticked to the top of page
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//entries is the array of threshold entries
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   //root is the element we want our target element to intersect
//   root: null,
//   //threshold is the percentage of intersection at which the callback is called(the entire section 1 should be atleast 20% of the area of intersection for callback to be called)
//   //For 0%, it means that the section is moved completely out of the view or as soon as it enters the view
//   threshold: [0,0.2],
// };

// //The first parameter is a callback function, second one is an object
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// //We are going to observe the section 1
// //Whenver section  1 intersects with viewport(root) by threshold amount of percent, the obsCallback will be triggered
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  //sticky class sticks the nav to the screen
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  //When 0% of the header is visible, we will stick the nav
  threshold: 0,
  //rootMargin is a box of assigned pixels(navHeight-height) that will be applied outside of our target element(header here) after passing our target element+ this amount of rootMargin is when the sticky will be applied
  //(So navHeight-height before the end of header is when this will be applied)
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  //An entry that has been observed once, we need to unobserve it after that
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);

  //Hiding all the sections
  //
});

//LAZY LOADING IMAGE

//Selecting all the images which have the peopert(data-src) i.e. we are selecting all the images inside the features
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  //If the img(targeted) are not intersecting, we return
  if (!entry.isIntersecting) return;

  //Else, we replace the (replace the image with high resolution one)
  entry.target.src = entry.target.dataset.src;
  //We are removing the lazy-img from our target only when the img(targeted is loaded)

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  //root set to entire viewport
  root: null,
  //As soon as the image appears on the viewport with 0 or more percent threshold, the callback will be activated
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (s, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    //Remove active class from all the dots and then add only on dots that are active
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //TranslateX will move them by certain percentages(the width of each image is 100% )
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  //Initially at 0 slide

  //next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    //First slide 0%,
    //Second 100%
    //Third 200%
    //Fourth 300%
    goToSlide(0);
  };
  init();

  //EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  //curSlide =1
  //-100%, 0%, 100%, 200%

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////
//////////////////////////////
////////////////////////////
//Selecting the entire document
// console.log(document.documentElement);
// //head
// console.log(document.head);
// //body
// console.log(document.body);
// //Selects the first element with header class
// const header = document.querySelector('.header');
// //Selects all elements with section class
// //returns a nodelist that we store in a const
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// //Select with id name
// document.getElementById('section--1');
// //Selecting using querySelector will require # symbol to depict id
// document.querySelector('#section--1');

// //Selecting with tag name(i.e elements with a particular name)
// //Returns HTML collection to be store
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// //Getting elements specifically with a class
// //Returns HTMLCollection
// console.log(document.getElementsByClassName('btn'));

// //Creating and inserting elements
// //.insertAdjacentHTML (used in Bankist)

// //Creates a DOM element andwe store it in message
// //This DOM will be created but as it is, it won't be found on our webpage
// const message = document.createElement('div');
// //Adding a class to our DOM element
// message.classList.add('cookie-message');
// //Adding textContent to our element
// // message.textContent = 'We use cookies for improved functionality and analytics';
// //We can also use innerHTML to read and to set textContent(we can also add  HTMl elements)
// //Here we are adding button with text
// message.innerHTML =
//   'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

// //Adding this element before header
// // header.prepend(message);
// //Putting the element after the element
// //Moves the element to after of header
// header.append(message);
// //with cloneNode we can keep the element at multiple places
// // header.append(message.cloneNode(true));

// //Adding message before and after an element
// // header.before(message);
// // header.after(message);

// //Delete element
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     //Delete the elements after we are done
//     message.parentElement.removeChild(message);
//   });

// //Styles
// //We put the property that we want to change in camelcase
// //Style works for inline styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// //To display the properties, however we can only see the inline styles
// console.log(message.style.width);
// console.log(message.style.backgroundColor);
// //getComputedStyle can be used to get all the styles for an element
// console.log(getComputedStyle(message));
// //to get specific property
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// console.log(getComputedStyle(message).height);

// //CSS Custom properties

// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// //Attributes--Attributes are the components present inside html elements such as src, alt, class

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// //Non-standard-- To access the non- standard properties that we have not set in the CSS but we have assigned values from our side in HTML
// //Can not be accessed directly
// console.log(logo.designer);
// //getAttribute will be able to access these non standard properties
// console.log(logo.getAttribute('designer'));

// //setAttribute- opposite of getAttribute(Can be used to create an attribute)

// logo.setAttribute('company', 'Bankist');
// //Gives the absolute source
// console.log(logo.src);
// //Gives the relative source
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// //Both return absolute source
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data attributes
// //These can be used to store the data in the useer interface
// //index.html stores in normal format whereas in js, it is used in camelCase
// console.log(logo.dataset.versionNumber);

// // Classes

// // logo.classList.add('c', 'j');
// // logo.classList.remove('c', 'j');
// // logo.classList.toggle('c');
// // logo.classList.contains('c');

//Types of events and events handlers
//An event is a signal that is generated by a certain DOM Node
//A signal happens when something happens(mouse moves, click,etc)

// const h1 = document.querySelector('h1');

//ADDING EVENT UPON A MOUSE CLICK
//addEventListener is available for multiple events
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// });

//There are other on properties such as onclick, etc.
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   //Removing the event listener after it has been handled
//   h1.removeEventListener('mouseenter', alertH1);
// };
//Events can also be added on HTML using onclick="" Ex-> <h1 onclick="">

//

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   //Stops the propagation of the event to the parents from the target
//   e.stopPropagation();
// });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (e) {});

// document.querySelector('.nav').addEventListener('click', function (e) {});
//When we add an event on an element, we can get  things done on the parent element too of the target element

//addEventListener listens to the events in the bubbling phase(return from the target element) and not the capture phase in which the events are listened from top the child

// const h1 = document.querySelector('h1');

// //Selecting the children elements of h1
// console.log(h1.querySelectorAll('.highlight'));
// // Nodes can be text, comment, elements ,etc.
// console.log(h1.childNodes);

// //to get the elements(works for direct children)
// console.log(h1.children);

// //The first element is selected and assigned the property given
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards: Selecting parents

// //Getting the parent Node
// console.log(h1.parentNode);

// //Getting the parent Element
// console.log(h1.parentElement);

//Lecture 202
//DOMContentLoaded-  This event is parsed as soon as the HTML is completely parsed(doesnt wait for images, just HTML and JS )
//Also, all the script must be loaded before the DOMContentLoaded is loaded

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log(e);
// });

// //LOAD is fired when everything is loaded completely

// window.addEventListener('load', function (e) {
//   console.log(e);
// });

// //beforeUnload is loaded just before the user is going to leave the page
// //Can be used to confirm the user if they want to really leave the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

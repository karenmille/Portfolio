(function() {
  
	var ssContainer = document.querySelector('.slideshowContainer'),
		slide = document.querySelectorAll('.slide'),
		indicator = document.querySelectorAll('.indicator'),
		currentImage = 0;
		autoPlay = setInterval(next, 5000);
		
	function slideShow(n) {
	  slide[currentImage].classList.remove('displayImg');
	  indicator[currentImage].classList.remove('indicatorBg');
	  currentImage = (n+slide.length)%slide.length;
	  slide[currentImage].classList.add('displayImg');
	  indicator[currentImage].classList.add('indicatorBg');
	}  
	
	function goToImage(e) {
	  if ( e.target.classList.contains('one') ) {
		slideShow(0);    
	  } else if ( e.target.classList.contains('two') ) {
		  slideShow(1);
		} else if ( e.target.classList.contains('three') ) {
			slideShow(2);
		  } else if ( e.target.classList.contains('four') ) {
			  slideShow(3);
			} else if ( e.target.classList.contains('five') ) {
			  slideShow(4);
			  } else if ( e.target.classList.contains('next') ) {
				  slideShow(currentImage+1);
				} else if ( e.target.classList.contains('prev') ) {
					slideShow(currentImage-1);
				  }
	  }
	
	function next() {
	  slideShow(currentImage+1);
	}
	
	function pauseSlide() {
	  clearInterval(autoPlay);
	}
	
	function resumeSlide() {
	  autoPlay = setInterval(next, 5000);
	}
  
	
	/***Event Listeners***/
	ssContainer.addEventListener('mouseover', pauseSlide, false);
	ssContainer.addEventListener('mouseout', resumeSlide, false);
	
	ssContainer.addEventListener('click', goToImage, false);
	
  })();
function Carousel(props) {
  const carousel = document.querySelector(".carousel");
  let firstItem, firstItemWidth;
  let clickCount = 0;
  const maxClicks = 3;
  if (carousel) {
    firstItem = carousel.firstElementChild;
  }
  if (firstItem) {
    firstItemWidth = firstItem.clientWidth + 80;
  }
  let isDragStart = false,
    prevPageX,
    prevScrollLeft;

  const icons = document.querySelectorAll(".carouselwrapper .btn");

  if (props) {
    firstItemWidth = firstItem?.clientWidth;
    icons.forEach((icon) => {
			icon.addEventListener("click", () => {
				clickCount++;
				const distanceToScroll = firstItemWidth ;
				carousel.scrollLeft +=
					icon.id === "left" ? -distanceToScroll : distanceToScroll;
			});
		});
  }

  else {
    icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      clickCount++;
      const distanceToScroll = firstItemWidth * Math.min(clickCount, maxClicks);
      carousel.scrollLeft +=
        icon.id === "left" ? -distanceToScroll : distanceToScroll;
    });
  });
  }





  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff * 3;
  };

  const dragStop = () => {
    isDragStart = false;
  };

  if (carousel) {
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("touchend", dragStop);
  }
}

export { Carousel };

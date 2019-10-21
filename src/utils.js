export const delay = time =>
new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, time);
});

export const contentInView = element => {
    const scroll = window.scrollY || window.pageYOffset;
    const elementPositionProps = element.getBoundingClientRect();
    const elementTopPosition = elementPositionProps.top + scroll;

    const viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight
    };

    const elementPosition = {
      top: elementTopPosition,
      bottom: elementTopPosition + elementPositionProps.height
    };
    return (
      (elementPosition.bottom >= viewport.top &&
        elementPosition.bottom <= viewport.bottom) ||
      (elementPosition.top <= viewport.bottom &&
        elementPosition.top >= viewport.top)
    );
  };
  
  export const getCircumference = radius => 2 * 3.142 * radius;
 
 export const getTrackPathRadius = (radius, trackWidth) => Number(radius) - Number(trackWidth / 2);
 export const getTrackPathBorderElementRadius = (radius, trackWidth) => Number(radius) - Number(trackWidth);

 export const getResponsiveFontsize = radius => radius * 3 / 100;

  export const getSVGPosition = radius => Number(radius) + 20;

  export const getViewPort = radius => (Number(radius) + 20) * 2;
  
  export const getPercentLevel = (radius, percentage) =>  {
    let circumference = getCircumference(radius);
    let level = circumference - (percentage * circumference) / 100;
    return level;
  }

  export const getColorType = (percent, defColor) => {
    const poor = (defColor && defColor.poor) || "#F32013";
    const fair = (defColor && defColor.fair) || "#ff6700";
    const good = (defColor && defColor.good) || "rgb(255, 217, 0)";
    const excellent = (defColor && defColor.excellent) || "#48AE2C";

    const res =
      (percent < 25 && poor) ||
      (percent < 50 && fair) ||
      (percent < 70 && good) ||
      excellent;
    return res;
  };
/**
 * anumate.css 动画库
 * @param dom  dom元素
 * @param animation  动画名称
 * @param prefix  动画前缀
 */
export function animateCSS(dom: Element, animation: String, prefix = 'animate__'){
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      const node = dom
      node.classList.add(`${prefix}animated`, animationName);
      function handleAnimationEnd(event: Event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }
  
      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
}
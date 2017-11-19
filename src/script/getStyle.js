export default function (obj) {
  let style;
  try{
    style = window.getComputedStyle(obj,null);
  }catch(e){
    style = obj.currentStyle;
  }
  return style;
}

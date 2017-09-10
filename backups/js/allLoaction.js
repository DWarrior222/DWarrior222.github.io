function getAllTop(obj) {
  var allTop = obj.offsetTop;
  var currentObj = obj;
  while(currentObj = currentObj.offsetParent) {
    allTop += currentObj.offsetTop;
  }
  return allTop;
}

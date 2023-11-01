var generateGuid = function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
  
    var ToEncodedGuid = function(){
      var encoded=(window.btoa(generateGuid()));
      for (var i = 0; i < 22; i++)
      {
          switch (encoded[i].charCodeAt(0))
          {
              case 47:
                  encoded[i] = '\u005F';
                  break;
              case 43:
                  encoded[i] = '-';
                  break;
          }
      } 
      return "a" + encoded.substring(1, 23);  
    };
  
console.log(ToEncodedGuid());
/*opt nomin*/
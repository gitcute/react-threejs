import React from 'react';
import mammoth  from 'mammoth';

class Word extends React.Component{
   constructor(props){
       super(props);
       this.state = { 
          word:null
       }
       this.fileInput = React.createRef();

   }

    readFileInputEventAsArrayBuffer = (event, callback) => {
    var file = event.target.files[0];

    var reader = new FileReader();
    
    reader.onload = function(loadEvent) {
        var arrayBuffer = loadEvent.target.result;
        callback(arrayBuffer);
    };
    
    reader.readAsArrayBuffer(file);
}

 handleFileSelect = (event) => {
    this.readFileInputEventAsArrayBuffer(event, function(arrayBuffer) {
        mammoth.convertToHtml({arrayBuffer: arrayBuffer})
            .then(function (resultObject) {
                console.log(resultObject)
              document.getElementById('result1').innerHTML = resultObject.value
              console.log(resultObject.value)
            })
            .done();
    });
}

    parseWordDocxFile  = (inputElement) => {
        console.log(this.fileInput.current.files[0])
    var files = this.fileInput.current.files[0] || [];
    if (!files.length) return;
    var file = files[0];

    console.time();
    var reader = new FileReader();
    reader.onloadend = function(event) {
      var arrayBuffer = reader.result;
      // debugger

      mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
          console.log(resultObject)
        document.getElementById('result1').innerHTML = resultObject.value
        console.log(resultObject.value)
      })
      console.timeEnd();

      mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        result2.innerHTML = resultObject.value
        console.log(resultObject.value)
      })

      mammoth.convertToMarkdown({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        result3.innerHTML = resultObject.value
        console.log(resultObject.value)
      })
    };
    reader.readAsArrayBuffer(file);
  }

   componentDidMount(){
       let _this = this;
    // mammoth.convertToHtml({arrayBuffer: new ArrayBuffer('../../风城企业移动应用APP系统设计说明书.doc')})
    // .then(function(result){
    //     var html = result.value; // The generated HTML
    //     var messages = result.messages; // Any messages, such as warnings during conversion
    //     _this.setState({word:html})
    // })
    // .done();
   }

   render(){
       return(
           <div>
               <input type="file" ref={this.fileInput}  onChange={this.handleFileSelect.bind(this)}/>
               <div id="result1"  style={{height:'500px'}}></div>
           </div>
       )
   }
}

export default Word;
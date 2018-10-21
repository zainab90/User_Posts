/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function searchFiles(){
    
var xmlhttp = new XMLHttpRequest();
var userId=document.getElementById("searchTxt").value;;
var myArr,myArr2; 
var listOfId=[];
var finalJsonObject=[];
// which is final object that contains: [{ post_tiitle:'',
// post_body:'',
// postComments:[{name:'', emai:'', body:''}]
// }]

xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        LoadFile(this,Number(userId)); // read posts file
    }
   
};
//open the connection with JSON (posts) file
xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
xmlhttp.send();

// this function is used to read posts file and save the user's post title and body in  JSON object
// initailly it saves comments in an empty array inside the json object.
function LoadFile(xmlObj,user_id){
            myArr = JSON.parse(xmlObj.responseText);
            for (var i=0; i< myArr.length; i++){
                if (myArr[i].userId===user_id){
                  listOfId.push(myArr[i].id);
                  finalJsonObject.push({title:myArr[i].title,body:myArr[i].body,postComments:[]});
                  
                }
            }
            
             FindComments(listOfId);
}


// this function is used to open connection with comments file 
function FindComments(list){
var xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        LoadFile2(this,list);// read the comments file
    }
};
  xmlhttp2.open("GET", "https://jsonplaceholder.typicode.com/comments", true);
xmlhttp2.send();  
}


// this function is used to read comments file and save comments (related to each post) in postComments[{name:'', email:'', body:''}] 
function LoadFile2(xmlObj,list){
            myArr2 = JSON.parse(xmlObj.responseText);
            for (var j=0; j< list.length;j++){
               for (var k=0; k< myArr2.length; k++){
                    if (list[j]=== myArr2[k].postId){
                   finalJsonObject[j].postComments.push({name:myArr2[k].name,email:myArr2[k].email,body:myArr2[k].body});
                }
               }
            }
    PrintResult();// print final json object on page
}






function PrintResult(){
    var para=document.getElementById('test');
   para.innerHTML=JSON.stringify(finalJsonObject, null, '\t');
  
   
  
}
    
    
    
    
    
}



//var http = require('http');
//
//http.createServer(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/plain'});
//    res.end('Hello World!');
//}).listen(8000);
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

//writestream.write


request('http://catalog.missouri.edu/undergraduategraduate/collegeofengineering/computerscience/bs-computer-science/', (error, res, html)=>{
   if(!error && res.statusCode == 200){
         //console.log(html);
         const $ = cheerio.load(res.body.toString());
      var h1 = $('h1').text();
      var nav = $('.accessible-menu').text();
      var link= $('.codecol').find('a').attr('href');
      var course1=[];
      $('.sc_courselist').each(function(){
            const course2 = $(this).find('.codecol').text();
            var name=$(this).find('.codecol').next().text();
            var hours=$(this).find('.codecol').next().next().text();
           // const courselink = $(this).find('a').attr('href');
            const course = course2.split(/(\d+)/);
            const parsename = name.split(/\s+/);
            console.log(course.length);
            
            var courseandnumber=[];
            for(var i=0; i<=course.length;i+=2){
                const a = course[i];
                const b = course[i+1];
                const c = a.concat(b);
                courseandnumber.push(c);
            }
            for(var i=0; i<=name.length;i++){
                if(((name[i]>='a' && name[i]<='z') && (name[i+1]>='A' && name[i+1] <= 'Z')) || (name[i]=="I" && (name[i+i] >= 'A' && name[i+1] <='Z' && name[i+1] != 'X')) || (name[i]=='P' && (name[i+1] >= 'A' && name[i+1] <= 'Z'))){
                   
//                    if(name[i+1]=="I" && name[i+2]=="I"){
//                         name = [name.slice(0, i+3), '?', name.slice(i+3)].join('');
//                    }
//                    if(name[i+1]=="I"){
//                          name = [name.slice(0, i+1), '?', name.slice(i+1)].join('');
//                    } 
                    name = [name.slice(0, i+1), '?', name.slice(i+1)].join('');
                    
                }
            }
            var complete=[]
            var beautifullist = (name.split('?'));
           
            console.log(courseandnumber);
            console.log(beautifullist);
            
                 //hours= [hours.slice(0, a+1), '?', hours.slice(a+1)].join('');
             var  coursehours = hours.toString(hours.length).split("")
            
          
            //var coursehours=coursehours.split('?');
            console.log(coursehours);
            //var file = 'title:' +h1 + '\n\n\n' +'course:'+ courseandnumber + '\n\n\n' + 'name:' + beautifullist + '\n\n\n' + 'hours: '+ //coursehours;
            var file2 = '<!DOCTYPE html>\n'+'<html>\n'+'<head>\n'+'<title>'+'CS students course'+'</title>\n'+'</head>\n'+ '<body>\n'+ '<h3>' +
                        h1 + '</h3>\n' + '<h2>course:</h2>'+ courseandnumber + '\n\n\n' + '<h2>name:</h2>' + beautifullist + '\n\n\n' + '<h2>hours:</h2>' + coursehours + '</body>\n'+'</html>';


          
       

          
            fs.writeFile('index.html', file2, (err)=>{
               if(err) throw err;
                console.log('saved');
            });
          });
         console.log(link);
         console.log(h1);
         console.log(nav); 
             
    
}else{
        console.log("wrong");
   } 
    
    
});




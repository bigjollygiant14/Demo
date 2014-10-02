//REST API and SHAREPOINT 2010

$.getJSON("https://mysite/reports/_vti_bin/ListData.svc/BaseReporting",function(data){
       var count = 0;
       $.each(data.d.results, function(i,result) {
           var src = result.__metadata.media_src;
           var title = result.Title;
           //console.log(title + " " + src);
       });
});

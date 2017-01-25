'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        app.home.getImage();
    }
});

app.home.getImage = function()
{
    try{
        document.getElementById("output").innerHTML = "Fetching text....."
        $("#imgLoad").css("display", "block");
        document.getElementById("imageText").src ="";
        navigator.camera.getPicture(app.home.cameraSuccess, app.home.cameraError, 
                                {
                                    quality: 100,
                                    destinationType: navigator.camera.DestinationType.FILE_URI,
                                    correctOrientation: true
                                });
    }
    catch(error)
    {
        alert(error);
    }

};

app.home.cameraSuccess = function(imgUri)
{
    document.getElementById("imageText").src = imgUri;    
}

app.home.cameraError = function(err)
{
    alert(err);
}
app.home.readText1 = function(image)
{
    try{
        var canvas = document.getElementById("canvas1");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);

        OCRAD(document.getElementById("pic"), {
					numeric: true
				}, function(text){
					alert(text);
				});
        var output = document.getElementById("output");
        output.innerHTML = parsedText;
    }
    catch(err)
    {
        alert(err);
    }
};

app.home.readText = function(image)
{
    try {
        if(image.src != "")
        {
        var canvas = document.getElementById("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        
        OCRAD(canvas,  {
					numeric: true
				}, function(textRec){
                    //alert(textRec);
                    var finalText = '';
                    //document.getElementById("output").innerHTML = document.getElementById("output").innerHTML 
                    //                                            +'</br>' + textRec;
                    for (var i = 0, len = textRec.length; i < len; i++) {
                        if(i < textRec.length && textRec[i+1] != ' ' && textRec[i] != '_' && textRec[i+1] != '_'
                            && textRec[i+2] != ' ' && textRec[i] != '_' && textRec[i+2] != '_')
                        {
                            finalText = finalText + textRec[i];
                            //alert(finalText);
                        }
                    }
                    //alert(finalText);
                    //document.getElementById("output").innerHTML = document.getElementById("output").innerHTML 
                    //                                            +'</br>' + finalText; 
                    var finalText1 = '';                                                    
                    for (var i = 0, len = finalText.length; i < len; i++) {
                        if(i > 0 && finalText[i] != ' ' && finalText[i-1] != ' ')
                        {
                            finalText = finalText + finalText[i];
                            //alert(finalText);
                        }
                    }                                                    
                    //alert(finalText);                                                       
                    //var parsedText = textRec.replace(/_/g , "");
					if(finalText.trim() == "")
                        alert("Unable to read text. Please try again.");
                    $("#imgLoad").css("display", "none");
                    var output = document.getElementById("output");
                    output.innerHTML = finalText;
				});
        // Or:
        // var parsedText = OCRAD(context);
        }
        
    }
    catch(err)
    {
        alert(err);
    }
};
app.localization.registerView('home');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home
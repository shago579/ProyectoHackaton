var imagen = new Image(), canvas,ctx;
var imgWidth,imgHeight,datosPrim;
imagen.onload = function()
{
	
}
$(document).on('ready',function(e){
	$('#mainButton').on('click',function(){
		$(this).parent().slideUp('slow');
	});
	iniciar();
	 var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#img");
	takePicture.onchange = function (event) {
    alert('D:sadasd');
		var files = event.target.files,file;
		if (files && files.length > 0) {
			file = files[0];
			try {
				var URL = window.URL;
				var imgURL = URL.createObjectURL(file);
				alert('D:');
				addSrc(imgURL);
				URL.revokeObjectURL(imgURL);
			}
			catch (e) {
				try {
					var fileReader = new FileReader();
					fileReader.onload = function (event) {
						alert('D:');
						showPicture.src = event.target.result;
	        };
					fileReader.readAsDataURL(file);
				}
				catch (e) {
					var error = document.querySelector("#error");
					if (error) {
						error.innerHTML = "Neither createObjectURL or FileReader are supported";
					}
				}
			}
		}
  };
});
function addSrc(url){
	imagen.src = imgURL;
	alert(':P');
	imgWidth = imagen.width;
	imgHeight = imagen.height;
	canvas.width = imgWidth/2;
	canvas.height = imgHeight/2;
	ctx.drawImage(imagen,0,0,imgWidth/2,imgHeight/2);
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	datosPrim = datosDeLaImagen.data;
	aBlancoNegro(imagen,canvas,ctx);
}
function inciar()
{
	canvas = document.getElementById("miCanvas");
	if(canvas.getContext)
	{
		$("#btnBN").click(function(){
			aBlancoNegro(img,canvas,ctx);
		});
		$("#btnIC").on("click",function(){
			invertirColores(img,canvas,ctx);
		});
		$("#btnRI").click(function(){
			restaurarImagen(img,canvas,ctx)
		});
		$("#btnRS").click(function(){
			aSepia(img,canvas,ctx)
		});
		ctx = canvas.getContext("2d");
	}
};
function aBlancoNegro(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		var brightness = 0.34 * datos[i] + 0.5 * datos[i + 1] +0.16 * datos[i + 2];
		datos[i] = brightness;
		datos[i+1] = brightness;
		datos[i+2] = brightness;
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}

function invertirColores(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = 255 - datos[i];
		datos[i+1] = 255 - datos[i+1];
		datos[i+2] = 255 - datos[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}

function restaurarImagen(img,canvas,ctx)
{
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = datosPrim[i];
		datos[i+1] = datosPrim[i+1];
		datos[i+2] = datosPrim[i+2];
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
function aSepia(img,canvas,ctx)
{
	console.log("entre");
	var datosDeLaImagen = ctx.getImageData(0,0,imgWidth,imgHeight);
	var datos = datosDeLaImagen.data;
	for (var i = 0; i < datos.length; i+=4) 
	{
		datos[i] = datos[i]*0.393 + datos[i+1]*0.769 + datos[i+2]*0.189;
		datos[i+1] = datos[i]*0.349 + datos[i+1]*0.686 + datos[i+2]*0.168;
		datos[i+2] = datos[i]*0.272 + datos[i+1]*0.534 + datos[i+2]*0.131;
	}
	ctx.putImageData(datosDeLaImagen,0,0);
}
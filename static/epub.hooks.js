EPUBJS.Hooks.register("beforeChapterDisplay").smartimages = function(callback, renderer){
		var images = renderer.contents.querySelectorAll('img'),
			items = Array.prototype.slice.call(images),
			iheight = renderer.height,//chapter.bodyEl.clientHeight,//chapter.doc.body.getBoundingClientRect().height,
			oheight;

		if(renderer.layoutSettings.layout != "reflowable") {
			callback();
			return; //-- Only adjust images for reflowable text
		}

		items.forEach(function(item){

			var size = function() {
				var itemRect = item.getBoundingClientRect(),
					rectHeight = itemRect.height,
					top = itemRect.top,
					oHeight = item.getAttribute('data-height'),
					height = oHeight || rectHeight,
					newHeight,
					fontSize = Number(getComputedStyle(item, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]),
					fontAdjust = fontSize ? fontSize / 2 : 0;

				iheight = renderer.contents.clientHeight;
				if(top < 0) top = 0;

				item.style.maxWidth =  "100%";

				if(height + top >= iheight) {

					if(top < iheight/2) {
						// Remove top and half font-size from height to keep container from overflowing
						newHeight = iheight - top - fontAdjust;
						item.style.maxHeight = newHeight + "px";
						item.style.width= "auto";
					}else{
						if(height > iheight) {
							item.style.maxHeight = iheight + "px";
							item.style.width= "auto";
							itemRect = item.getBoundingClientRect();
							height = itemRect.height;
						}
						item.style.display = "block";
						item.style["WebkitColumnBreakBefore"] = "always";
						item.style["breakBefore"] = "column";

					}

					item.setAttribute('data-height', newHeight);

				}else{
					item.style.removeProperty('max-height');
					item.style.removeProperty('margin-top');
				}
			}

			var unloaded = function(){
				// item.removeEventListener('load', size); // crashes in IE
				renderer.off("renderer:resized", size);
				renderer.off("renderer:chapterUnload", this);
			};

			item.addEventListener('load', size, false);

			renderer.on("renderer:resized", size);

			renderer.on("renderer:chapterUnload", unloaded);

			size();

		});

		if(callback) callback();

}


var font = new FontFace("defaultText", "url(../static/fonts/SourceHanSerifSC-Regular.otf)", {});

console.log(font)


EPUBJS.Hooks.register("beforeChapterDisplay").addFonts = function(callback, renderer){
    // var newStyle = document.createElement('style');
    // var fontName = "defaultText"
    // var fontURL = "../../static/fonts/SourceHanSerifSC-Regular.otf"
    // newStyle.appendChild(
    //     document.createTextNode("@font-face {font-family: '" + fontName + "';src: url(" + fontURL + ");}")
    // );    
    // renderer.doc.head.appendChild(newStyle);
    // 修改HTML方式添加font-face
    // renderer.doc.body.style.background = "url(../../static/addbook.svg)"
    



    font.load().then(function(loadedFace){ 
        renderer.doc.fonts.add(loadedFace);
    })

    if(callback){
        callback();
    } 

}
//HEADER TAGLINE
var headerTagline = document.querySelector(".header-tagline");
var headerProcess=document.querySelector(".header-process");
var mainContent=document.querySelector(".mainContent");
var mainContentPlaceholder1Btn=document.querySelector(".mainContent-placeholder-1-btn");
var fileInput=document.querySelector(".mainContent-fileInput");


const sleep=(delay)=>new Promise((resolve)=>setTimeout(resolve, delay));

async function write() {
    var texts=[
        "Process 10 Images Up to 6000x4000 Instantly",
        "Unlimited Conversions, Forge Pixels Without Limits",
        "Batch 10 Images, Reconstruct Pixels in Seconds"
    ];
    var z=0;
    while(z<texts.length){
        var text=texts[z];
        var insert="";
        for(var i=0;i<text.length;i++){
            insert+=text[i];
            headerTagline.innerText=insert +(i<text.length-1?"|":"");
            if(text[i]=== " ")headerTagline.innerText+="\xa0";
            await sleep(150); // Slower typing
        }
        await sleep(3000); // Longer pause
        z=(z + 1)% texts.length;
    }
}
write();

//HEADER PROCESSTYPE

headerProcess.addEventListener("click",switchProcess=()=>{
    var elements=headerProcess.children;
    console.log(elements[0].innerText)
    if(elements[0].innerText=="Image"){
        elements[0].innerText="Pixels";
        elements[2].innerText="Image"
    }else if(elements[0].innerText=="Pixels"){
        elements[0].innerText="Image";
        elements[2].innerText="Pixels"
    }
});


//mainContent dragginf files

mainContent.classList.add("drag");

mainContentPlaceholder1Btn.addEventListener("click",()=>{
    fileInput.click();
})

var hideInsideBoxElements=()=>{
    var insideBoxElements=mainContent.children;
    for(var i=0;i<insideBoxElements.length;i++){
        insideBoxElements[i].style.display="none";
    }
}


fileInput.addEventListener("change",(e)=>{
    hideInsideBoxElements();
    var files=e.target.files;
    mainContent.classList.remove("drag");
    mainContent.classList.toggle("transform");

    fillDataHeadings();
    for(var i=0;i<files.length;i++){
        createRow(files[i].name,i);
    }

});


var fillDataHeadings=()=>{
    var columns=["Sno","Name","Shrink Pixels?","Convert type"];

    var row=document.createElement("div");
    row.classList.add("data-heading-row");

    for(var i=0;i<columns.length;i++){
        var cell=document.createElement("div");
        cell.innerText=columns[i];
        cell.classList.add("data-heading-cell");
        if(i==0){
            cell.classList.add("data-heading-sno");
        }
        row.append(cell);
    }
    mainContent.append(row);

}

var createRow=(fname,k)=>{
    var row=document.createElement("div");
    row.classList.add("data-row");

    var sno=document.createElement("div");
    sno.innerText=(k+1)+".";
    sno.classList.add("data-sno");

    var name=document.createElement("div");
    name.innerText=fname;
    name.classList.add("data-cell");

    var width=document.createElement("input");
    width.type="number";
    width.value="1920";
    width.classList.add("data-pixels");
    var height=document.createElement("input");
    height.type="number";
    height.value="1080";
    height.classList.add("data-pixels");
    var pixels=document.createElement("div");
    pixels.classList.add("data-cell");
    pixels.append(width);
    pixels.append(height);

    var rgb=document.createElement("option");
    rgb.innerText="RGB";
    var hsl=document.createElement("option");
    hsl.innerText="HSL";
    var hex=document.createElement("option");
    hex.innerText="HEX";
    var type=document.createElement("select");
    type.classList.add("data-cell");
    type.classList.add("data-type");
    type.append(rgb);
    type.append(hsl);
    type.append(hex);

    var convert=document.createElement("button");
    convert.innerText="Convert";
    convert.classList.add("data-cell");
    convert.classList.add("data-convert");

    var copy=document.createElement("button");
    copy.innerText="Copy";
    copy.classList.add("data-cell");
    copy.classList.add("data-copy");

    var download=document.createElement("button");
    download.innerText="Downlaod";
    download.classList.add("data-cell");
    download.classList.add("data-download");

    row.append(sno);
    row.append(name);
    row.append(pixels);
    row.append(type);
    row.append(convert);
    row.append(copy);
    row.append(download);


    mainContent.append(row);

}





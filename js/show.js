function changeSrc(imgSrc,imgUrl,index) {
	var homePicDoc = document.getElementById("homePic");
	var homePicHref = document.getElementById("homePicHref");
	var smallPicSelect = document.getElementById("small_pic_0");
	var defaultImgSrc = jsonSlidPic[0]["big_pic_src"];
	var defaultImgUrl = jsonSlidPic[0]["game_url"];
	
	if(imgSrc == null||imgUrl==null||index==null){
		homePicDoc.setAttribute("src", defaultImgSrc);
		//homePicHref.setAttribute("href", defaultImgUrl);
		smallPicSelect.setAttribute("Class", "Slid_select_div");
	}else{
		homePicDoc.setAttribute("src", imgSrc);
		//homePicHref.setAttribute("href", imgUrl);
		var smallPicOld = document.getElementById("small_pic_"+oIndex);
		var smallPicSelect = document.getElementById("small_pic_"+index);
		smallPicSelect.setAttribute("Class", "Slid_select_div");
		smallPicOld.setAttribute("class", "Slid_pic_div");
		nIndex = index+1;
		oIndex = index;
	}
}
function installGame(url){
	window.open(url);
}

function showSlidPics() {
	var slidPicDoc = document.getElementById("slidPics");
	var slidPicHtml = '';
	var length = jsonSlidPic.length;
	for ( var i = 0; i <length ; i++) {
		slidPicHtml+='<span class = "Slid_pic_div" id =  "small_pic_'+i+'">';
		slidPicHtml+='<img  class = "Slid_pic" width=121px height=60px src="'+jsonSlidPic[i]["small_pic_src"]+'"';
		// slidPicHtml+=' onClick = changeSrc("'+jsonSlidPic[i]["big_pic_src"]+'","'+jsonSlidPic[i]["game_url"]+'",'+i+')></img></span>';
		slidPicHtml+=' ></img></span>';
	}
	slidPicDoc.innerHTML += slidPicHtml;
}
function showIndexNews() {
	var showTop = 5;
	var newsDoc = document.getElementById("news");
	var newsHtml = "";
	var length = jsonNews.length >showTop?showTop:jsonNews.length;
	for ( var i = 0; i <length ; i++) {
		newsHtml+="<p><b>"+jsonNews[i]["news_date"]+"</b>";
		newsHtml+='<a href="'+jsonNews[i]["news_href"]+'">';
		newsHtml+=jsonNews[i]["news_desc"]+"</a></p>";
	}
	newsDoc.innerHTML += newsHtml;
}

function showGames(firstRow,lastRow) {

	var gamesDoc = document.getElementById("games");
	gamesDoc.innerHTML = "";
	var gamesHtml = "";
	
	for ( var i = firstRow; i <lastRow ; i++) {
		var insallUrl=jsonGames[i]["game_url"];
		// gamesHtml+='<div class="List_p"> <a href="'+insallUrl+'" class="RPic">';
		// gamesHtml+='<img width="307px" height="151px" src="'+jsonGames[i]["img_src"]+'"/></a> ';
		gamesHtml+='<div class="List_p"><img width="307px" height="181px" src="'+jsonGames[i]["img_src"]+'"/> ';
		gamesHtml+='<span class="Name">'+jsonGames[i]["game_desc"]+'</span>';
		//gamesHtml+='<input type="button" value="Install" onClick = installGame("'+insallUrl+'") class="Ins_bu"/></div>';
		gamesHtml+='</div>';
	}
	gamesDoc.innerHTML += gamesHtml;
}
function showPage(totalPage,currentPage,nextPage,prevPage){
	
	if(totalPage==1) return;//只有一页不显示分页
	var pageDoc = document.getElementById("page");
	pageDoc.innerHTML = "";
	var prevHtml = "";
	var pageHtml = "";
	var nextHtml = "";
	var showPageHtml = "";
	if(prevPage == 0) 
		prevHtml +='<b class="none"><</b>';
	else
		prevHtml +='<b><a href="#" onClick = clickPage('+prevPage+')><</a></b>';
	showPageHtml += prevHtml;
	for(var i = 1;i<=totalPage;i++){
		if(currentPage==i)
			pageHtml +='<b class="cur_page"><a href="#" id = "page_'+i+'" onClick = clickPage('+i+')>'+i+'</a></b>';
		else
			pageHtml +='<b><a href="#" id = "page_'+i+'" onClick = clickPage('+i+')>'+i+'</a></b>';
	}
	showPageHtml += pageHtml;
	if(nextPage == 0) 
		nextHtml +='<b class="none">></b>';
	else
		nextHtml +='<b><a href="#" onClick = clickPage('+nextPage+')>></a></b>';
	
	showPageHtml += nextHtml;
	pageDoc.innerHTML += showPageHtml;
}
function showFollow(){
	var followDoc = document.getElementById("follow");
	var followHtml = '';
	var length = jsonFollow.length;
	for ( var i = 0; i <length ; i++) {
		followHtml+='<a href = "'+jsonFollow[i]["follow_url"]+'">';
		followHtml+='<img src="'+jsonFollow[i]["pic_src"]+'"></img>';
		followHtml+='</a>';
	}
	followDoc.innerHTML += followHtml;
}
function clickPage(pageNo){
	
	var prevPage = 0;
	var nextPage = 0;
	var pageSize = 9;
	var currentPage = pageNo;
	var totalRows = jsonGames.length;
	var totalPage = Math.floor((totalRows+pageSize-1)/pageSize);
	if(currentPage>1) prevPage=currentPage-1;
	if(currentPage<totalPage)nextPage=currentPage+1;
	var firstRow = (pageNo-1)*pageSize;
	var lastRow = firstRow+pageSize>totalRows?totalRows:firstRow+pageSize;
	showGames(firstRow,lastRow);
	showPage(totalPage,currentPage,nextPage,prevPage);
}
function showCompany(companyData) {
	var companyDoc = document.getElementById("company");
	companyDoc.innerHTML += companyData;
}

function slidingImg(nIndex) {
	var length =  jsonSlidPic.length;
	var homePicDoc = document.getElementById("homePic");
	var homePicHref = document.getElementById("homePicHref");
	var smallPicSelect = document.getElementById("small_pic_"+nIndex %length);
	var smallPicOld = document.getElementById("small_pic_"+oIndex);
	homePicDoc.src = jsonSlidPic[nIndex %length]["big_pic_src"];
	homePicHref.href = jsonSlidPic[nIndex % length]["game_url"];
	smallPicSelect.setAttribute("Class", "Slid_select_div");
	smallPicOld.setAttribute("class", "Slid_pic_div");
	oIndex = nIndex %length;
}

function slidingLoop(){
	objTimer = window.setInterval(function() {
		slidingImg(nIndex);
		nIndex++;
	}, delay);
	document.getElementById("homePic").onmousemove = function() {
		clearInterval(objTimer);
	};
	document.getElementById("homePic").onmouseout = function() {
		objTimer = window.setInterval(function() {
			slidingImg(nIndex);
			nIndex++;
		}, delay);
	};
}

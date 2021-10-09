function Star(el, count, callback) {
	// Write a logic to create star rating problem
  this.el = document.querySelector(el);
  this.count = count;
  this.callback = callback;
  this.active = -1;
  
  this.init();
  this.bindEvents();
  
}

Star.prototype.init = function(){
	var div = document.createDocumentFragment("div");
	for(var i=1; i<= this.count; i++){
  	var iElem = document.createElement("i");
    iElem.classList.add("fa");
    iElem.classList.add("fa-star-o");
    iElem.dataset["ratingVal"] = i;
    
    div.appendChild(iElem);
  }
  this.el.appendChild(div);
}

Star.prototype.fill = function(activeVal){
	for(var i=1; i<=this.count; i++){
  	if(i <= activeVal){
    	document.querySelector("i[data-rating-val='"+i+"']").classList.add("fa-star");
    }else{
    	document.querySelector("i[data-rating-val='"+i+"']").classList.remove("fa-star");
    }
  }
}

Star.prototype.bindEvents = function(){
	this.el.addEventListener('mouseover', (e)=>{
  	this.fill(e.target.dataset['ratingVal']);
  });
  
  this.el.addEventListener('mouseout', (e)=>{
  	this.fill(this.active);
  });
  
  this.el.addEventListener('click', (e)=>{
  	this.active = e.target.dataset['ratingVal'];
    this.callback(this.active);
  });
}



function getStar(value){
  document.getElementById("display-star").innerHTML = value;
}
new Star("#star", 8, getStar);
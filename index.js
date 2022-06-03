var errorOpacity = 0;
var mouseY = 0;
var mouseX = 0;

function enterFrame(){

	if(errorOpacity > 0){
		errorOpacity -= 0.02;
	} else{
		errorOpacity = 0;
	}

	document.getElementById('error').style.opacity = errorOpacity;

}

onload = function(){

	document.getElementById('area').addEventListener('click', function(){
		setTimeout(function(){refresh();}, 1);
	});

	// error 이벤트
	document.addEventListener('mousemove', function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	document.getElementById('error').addEventListener('click', function(e){
		e.stopPropagation();
	});
	setInterval(enterFrame, 30);

	// javascript를 통한 이미지 로드
	e = document.getElementById('resistanceImage');
	ee = document.createElement('TD');
	e.appendChild(ee);
	for(let i = 0;i<6;i++){
		ee = document.createElement('TD');
		ee.style.width='80px';
		eee = document.createElement('IMG');
		eee.src = 'data:image/png;base64,' + imageData.resistance[i];
		ee.appendChild(eee);
		e.appendChild(ee);
	}
	e = document.getElementById('resistanceResult');
	ee = document.createElement('TD');
	e.appendChild(ee);
	for(let i = 0;i<6;i++){
		ee = document.createElement('TD');
		ee.innerText = 0;
		ee.style.textAlign = 'center';
		e.appendChild(ee);
	}
	// 위와 이어짐
	for(let i=0;i<4;i++){
		e = e.nextSibling;
		while(e.tagName != 'TR'){
			e = e.nextSibling;
		}
		ee = document.createElement('TD');
		ee.innerText = '해역 Lv. ' + (i + 1).toString(10);
		e.appendChild(ee);
		for(let j=0;j<6;j++){
			ee = document.createElement('TD');
			e.appendChild(ee);
			ee.innerText = 0;
			ee.style.textAlign = 'center';
		}
	}
	
	setDefaultPreset();

	var e, ee, eee;

	e = document.getElementById('shipList');
	for(let i=0;i<shipName.length;i++){
		ee = document.createElement('OPTION');
		ee.innerText = shipName[i];
		ee.value = i;
		e.appendChild(ee);
	}

	e = document.getElementById('shipLevel');
	for(let i=1;i<=_maxLevel;i++){
		ee = document.createElement('OPTION');
		ee.innerText = 'Lv. ' + i.toString(10);
		ee.value = i;
		e.appendChild(ee);
	}

	e = document.getElementById('skinResistance').childNodes[0];
	for(let i=0;i<6;i++){
		while(e.tagName != 'INPUT'){
			e = e.nextSibling;
		}
		e.addEventListener('keydown', function(){
			setTimeout(function(){savePreset();}, 1);
		});
		e.addEventListener('change', function(){
			setTimeout(function(){savePreset();}, 1);
		});
		e = e.nextSibling;
	}

	e = document.getElementById('adventurePoint');
	e.addEventListener('keydown', function(){
		setTimeout(function(){refresh();}, 1);
	});
	e.addEventListener('change', function(){
		setTimeout(function(){refresh();}, 1);
	});

	sortSailor();

}

var sortBy = 0;

function sortSailor(){

	if(presetSelected < 0 || presetSelected >= preset.length){
		return;
	}

	if(sortBy == 0){ // select
		sailors.sort(function(x, y){
			let xExist = 0;
			for(let i = 0;i<preset[presetSelected].sailor.length;i++){
				if(preset[presetSelected].sailor[i] == x.index){
					xExist = 1;
					break;
				}
			}

			let yExist = 0;
			for(let i = 0;i<preset[presetSelected].sailor.length;i++){
				if(preset[presetSelected].sailor[i] == y.index){
					yExist = 1;
					break;
				}
			}
			
			if(xExist != yExist){
				return yExist - xExist;
			} else{
				return x.index - y.index;
			}
		});
	}
	if(sortBy == 1){ // speed
		sailors.sort(function(x, y){
			if(x.speed != y.speed){
				return y.speed - x.speed;
			} else{
				return x.index - y.index;
			}
		});
	}
	if(sortBy == 2){
		sailors.sort(function(x, y){
			if(x.resistance[0] != y.resistance[0]){
				return y.resistance[0] - x.resistance[0];
			} else{
				return x.resistance[0] - y.resistance[0];
			}
		});
	}
	if(sortBy == 3){
		sailors.sort(function(x, y){
			if(x.resistance[1] != y.resistance[1]){
				return y.resistance[1] - x.resistance[1];
			} else{
				return x.resistance[1] - y.resistance[1];
			}
		});
	}
	if(sortBy == 4){
		sailors.sort(function(x, y){
			if(x.resistance[2] != y.resistance[2]){
				return y.resistance[2] - x.resistance[2];
			} else{
				return x.resistance[2] - y.resistance[2];
			}
		});
	}
	if(sortBy == 5){
		sailors.sort(function(x, y){
			if(x.resistance[3] != y.resistance[3]){
				return y.resistance[3] - x.resistance[3];
			} else{
				return x.resistance[3] - y.resistance[3];
			}
		});
	}
	if(sortBy == 6){
		sailors.sort(function(x, y){
			if(x.resistance[4] != y.resistance[4]){
				return y.resistance[4] - x.resistance[4];
			} else{
				return x.resistance[4] - y.resistance[4];
			}
		});
	}
	if(sortBy == 7){
		sailors.sort(function(x, y){
			if(x.resistance[5] != y.resistance[5]){
				return y.resistance[5] - x.resistance[5];
			} else{
				return x.resistance[5] - y.resistance[5];
			}
		});
	}

	let e = null;
	let ee = null;
	let eee = null;
	let eeee = null;

	e = document.getElementById('sailors');
	e.innerHTML = '';

	ee = document.createElement('TR');
	ee.style.borderBottom = '1px solid #000000';
	e.appendChild(ee);
	
	eee = document.createElement('TD');
	eee.style.width = '150px';
	eee.innerText = '이름';
	ee.appendChild(eee);

	eee = document.createElement('TD');
	eee.style.width = '120px';
	eee.innerText = '전용 선박';
	ee.appendChild(eee);

	eee = document.createElement('TD');
	eee.style.width = '40px';
	eee.innerText = '속도';
	if(sortBy == 1){
		eee.style.backgroundColor = '#dddddd';
	}
	eee.style.cursor = 'pointer';
	eee.addEventListener("click", function(){
		if(sortBy == 1){
			sortBy = 0;
		} else{
			sortBy = 1;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance0;
	if(sortBy == 2){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 2){
			sortBy = 0;
		} else{
			sortBy = 2;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance1;
	if(sortBy == 3){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 3){
			sortBy = 0;
		} else{
			sortBy = 3;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance2;
	if(sortBy == 4){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 4){
			sortBy = 0;
		} else{
			sortBy = 4;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance3;
	if(sortBy == 5){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 5){
			sortBy = 0;
		} else{
			sortBy = 5;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance4;
	if(sortBy == 6){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 6){
			sortBy = 0;
		} else{
			sortBy = 6;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	eee = document.createElement('TD');
	eeee = document.createElement('IMG');
	eeee.src = 'data:image/png;base64,' + imageData.resistance5;
	if(sortBy == 7){
		eeee.style.backgroundColor = '#dddddd';
	}
	eeee.style.cursor = 'pointer';
	eeee.addEventListener("click", function(){
		if(sortBy == 7){
			sortBy = 0;
		} else{
			sortBy = 7;
		}
		sortSailor();
	});
	ee.appendChild(eee);
	eee.appendChild(eeee);
	
	for(let i=0;i<sailors.length;i++){
		let tr = document.createElement('TR');
		tr.style.cursor = 'pointer';
		tr.addEventListener("click", function(){
			
			(function(){
				let sailorIndex = sailors[i].index;
				selectSailor(sailorIndex);
			})();

		});
		
		e.appendChild(tr);

		let td = null;
		
		td = document.createElement('TD');
		td.innerText = sailors[i].name;
		td.style.fontWeight='900';
		if(sailors[i].grade == '유물'){
			td.className = 'grade5Text';
		}
		if(sailors[i].grade == '전설'){
			td.className = 'grade4Text';
		}
		if(sailors[i].grade == '영웅'){
			td.className = 'grade3Text';
		}
		if(sailors[i].grade == '희귀'){
			td.className = 'grade2Text';
		}
		if(sailors[i].grade == '고급'){
			td.className = 'grade1Text';
		}
		if(sailors[i].grade == '일반'){
			td.className = 'grade0Text';
		}
		tr.appendChild(td);
		
		td = document.createElement('TD');
		td.innerText = sailors[i].ship;
		tr.appendChild(td);
		
		td = document.createElement('TD');
		td.innerText = sailors[i].speed;
		tr.appendChild(td);
		
		for(let j = 0;j<6;j++){
			td = document.createElement('TD');
			td.innerText = sailors[i].resistance[j];
			tr.appendChild(td);
			if(-0.01 < sailors[i].resistance[j] && sailors[i].resistance[j] < 0.01){
				td.style.color= '#acacac';
			} else if(sailors[i].resistance[j] < -10){
				td.style.color= '#ff4444';
			} else if(sailors[i].resistance[j] < 0){
				td.style.color= '#ff5555';
			}
			td.style.textAlign = 'center';
		}
		
	}

	refresh();
	
}

function setDefaultPreset(){
	
	preset = [];
	presetSelected = -1;
	createPreset();
	preset[0].ship = 0;
	preset[0].shipLevel = 10;
	
}

function Preset(){
	this.ship = 0;
	this.shipLevel = 10;
	this.sailor = [];
	this.resistance = [0, 0, 0, 0, 5, 7];
}

var preset = [];
var presetSelected = -1;
var contents = -1;

var imageData = {};
imageData.resistance0 = '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';
imageData.resistance1 = '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';
imageData.resistance2 = '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';
imageData.resistance3 = 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAVnSURBVEhL3VVpUFNXGA0CYqUFLDotWtsZqxVxqQuiIyBFpQONRh14sgSMgISiMAgUiQs8jSBgIAthC1sCKQJBQDREA5IAotUaZEeIslRFKFJGB2sKIfn6HmQ6tXYZa3/1zNy5b+bdOeee7zv3XsL/CnoIgugjiEgfEYn0URSdRSCAnu7f28MBlRt4F0iNnRhSY4fUjnepol5T/BsX0y15O7gl33yHGHt50Q5y7EFHr7PHNnkwNvnlNC0kcyQmuPhbu4koGDJevS1yfShb3Jle1w9eUfkNtu7JXjao5COyUGnizJEY4eXTLX9zUHm9pjaucfaH2eKWehVAZmM/BDMvPt0VxI1ftvvcWt9c5QIy55YJlcczBCC8uRsKq9nM1jfVLphZeav22RSkybomSYfT+49wxRMH6efrtngyybtolUuDCtvm4W4I0yF4AyC8GtPVBzLXh3HKa0paBoFRcWfS/WjBYEZdl5on64IIduUIKSgjaY1r0jqf/C5z74IWY1zIAUUNpoMwI/jXzhAsOZY++Z8FJRSVx19ohGM8iYZ7tQVu/KyG1gk15Db0AC2vVutHL6q2cUtwI8bXLCELuyzcOA0LvNLb5uF9ovIUcxFRx2xd8l4Vw1NkhYg+9D8l4PvTBS+js8SqyEyJ5ij/mrpQ0aft1AJEn29QHUqqgPDUy4O7w3OznA5lRxOP5IXaB2aQLXfGOawgJi6jsORmEVjcX4s3pm74QYTUeG9gwrntHqebzhbKfgpllo95RAl7XY/mP7k5PqFlVXdO5d3s1bCqWiBaIANaVjXQsmumojKuPAtJKlV+Hfut1MU/OXiHH3ch7kRHPQNckaoAQzs31HnFF6EnEopqRyNYZcrNZDaHGM6vkz8dh/J7I6BQaaHpFw1U9Q1DzcMxqGh/DKXNDyG7rhNY4ibw/Cb9zirXuDXopcG5OurfoIegotk+5Y/NP9ka6Xg6u3I0ii26s84vx/WrcL6gZnAM6kdUwK1u03YDgOKlGiq6h7XVA6Nw/ccX0IyJKjVaoOdf6V3ihG6jihSmOOcMtQ64C0pFv5nF+qANsRmlfeFx/Cqb4JJtTv5prKv3h7VCRT/siy6cbHkxAXefq0BwvVubLe+EdGk7pEhatTnyexDGuajc7M1xxuOMUb4qgKIwy1s6ZGy0dP+nYWeyWr1DErMc6bWfO/klnyxT9GgOxlc88DxZNCC4cR8GMBd92GgdV0Pz+CS0Yo66VWo4lSPtX7WXQfTP7ngfo/xDbAH0QiRKI4IFdb5nAL0a8aWf2Z12f7EdEhPAKpFNUGKKS/bHFIvOlSmg7vEzeKAByJN3aVMuNQHn8l1trqwdaKmXuq29Ulx8uF3mGONr50IPTxMBBYNN9r40W8cAr4ReMN1KiiTFsItH9wQmnbA/wApklX03livrgR5sx48wFz9gEVaqpqBpaAyOZYp71rozXP7cAQa8DyjArHkWOz5evsVvIR9gzsoNFFtPX/TB9n3HXbdGXVxHiRYWixq7QSjrhBFM4PbQc+CKm7T8a+0QySztsSFzvqTwm810lK9j5rGZAU+hMFxp7b5440byKTsSahVQNmBhuSdx5+kscVuF4iFUtQ7CKCbyBO/JCzVEMkp6ljifsQvBTraO4m+hhzsSAegTljobOVDkc5xRicmBtO8Xr3VPRo6nS275R+cPxAqkjzIu1A/nlTc8CUsUllmR4qzwa0PH8Y/QwzY3XUt8dpDLDUiJje+RmfUWy12Z1tb7U1xWu7MRS1KCx6Ltx4lr9jFW0fJvm0/38l8Ce7uxdxvtmI3fqHitfXPvLqAWKub7YMR+OY3v4bfs78v8XwB3OD1gZtaBQPgV4Y7kmleUGxkAAAAASUVORK5CYII=';
imageData.resistance4 = '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';
imageData.resistance5 = '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';
imageData.resistance = [];
imageData.resistance.push(imageData.resistance0);
imageData.resistance.push(imageData.resistance1);
imageData.resistance.push(imageData.resistance2);
imageData.resistance.push(imageData.resistance3);
imageData.resistance.push(imageData.resistance4);
imageData.resistance.push(imageData.resistance5);

var shipName = [];
shipName.push('에스토크');
shipName.push('풍백');
shipName.push('바크스툼');
shipName.push('프뉴마');
shipName.push('브람스');
shipName.push('트라곤');
shipName.push('아스트레이');
shipName.push('에이번의 상처');
var _maxLevel = 11;

var shipData = [];
shipData.push([
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 20.0, [12, 12, 12, 12, 12, 12]),
	new ShipData(2, 20.8, [14, 14, 14, 14, 14, 14]),
	new ShipData(2, 21.7, [16, 16, 16, 16, 16, 16]),
	new ShipData(3, 22.7, [18, 18, 18, 18, 18, 18]),
	new ShipData(3, 23.8, [20, 20, 20, 20, 20, 20]),
	new ShipData(3, 23.8, [22, 22, 22, 22, 22, 22]),
	new ShipData(4, 23.8, [24, 24, 24, 24, 24, 24]),
	new ShipData(4, 23.8, [26, 26, 26, 26, 26, 26]),
	new ShipData(4, 23.8, [28, 28, 28, 28, 28, 28]),
	new ShipData(5, 23.8, [30, 30, 30, 30, 30, 30]),
	new ShipData(5, 23.8, [32, 32, 32, 32, 32, 32]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 풍백
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 19.0, [6, 14, 11, 3, 3, 3]),
	new ShipData(2, 19.8, [7, 18, 12, 4, 4, 4]),
	new ShipData(2, 20.8, [8, 22, 13, 5, 5, 5]),
	new ShipData(3, 21.9, [9, 26, 14, 6, 6, 6]),
	new ShipData(3, 23.1, [10, 30, 15, 7, 7, 7]), //
	new ShipData(3, 23.1, [11, 34, 17, 8, 8, 8]),
	new ShipData(4, 23.1, [12, 38, 19, 9, 9, 9]),
	new ShipData(4, 23.1, [13, 42, 21, 10, 10, 10]),
	new ShipData(4, 23.1, [14, 46, 23, 11, 11, 11]),
	new ShipData(5, 23.1, [15, 50, 25, 12, 12, 12]),
	new ShipData(5, 23.1, [16, 54, 26, 13, 13, 13]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 바크스툼
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 18.0, [11, 3, 3, 14, 3, 6]),
	new ShipData(2, 18.7, [12, 4, 4, 18, 4, 7]),
	new ShipData(2, 19.6, [13, 5, 5, 22, 5, 8]),
	new ShipData(3, 20.6, [14, 6, 6, 26, 6, 9]),
	new ShipData(3, 21.6, [15, 7, 7, 30, 7, 10]),
	new ShipData(3, 21.6, [17, 8, 8, 34, 8, 11]),
	new ShipData(4, 21.6, [19, 9, 9, 38, 9, 12]),
	new ShipData(4, 21.6, [21, 10, 10, 42, 10, 13]),
	new ShipData(4, 21.6, [23, 11, 11, 44, 11, 14]),
	new ShipData(5, 21.6, [25, 12, 12, 50, 12, 15]),
	new ShipData(5, 21.6, [26, 13, 13, 54, 13, 16]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 프뉴마
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 21.1, [14, 3, 3, 6, 11, 3]),
	new ShipData(2, 22.1, [18, 4, 4, 7, 12, 4]),
	new ShipData(2, 23.1, [22, 5, 5, 8, 13, 5]),
	new ShipData(3, 24.1, [26, 6, 6, 9, 14, 6]),
	new ShipData(3, 25.1, [30, 7, 7, 10, 15, 7]),
	new ShipData(3, 25.1, [34, 8, 8, 11, 17, 8]),
	new ShipData(4, 25.1, [38, 9, 9, 12, 19, 9]),
	new ShipData(4, 25.1, [42, 10, 10, 13, 21, 10]),
	new ShipData(4, 25.1, [46, 11, 11, 14, 23, 11]),
	new ShipData(5, 25.1, [50, 12, 12, 15, 25, 12]),
	new ShipData(5, 25.1, [54, 13, 13, 16, 26, 13]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 브람스
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 19.4, [3, 6, 14, 3, 3, 11]),
	new ShipData(2, 20.4, [4, 7, 18, 4, 4, 12]),
	new ShipData(2, 21.4, [5, 8, 22, 5, 5, 13]),
	new ShipData(3, 22.4, [6, 9, 26, 6, 6, 14]),
	new ShipData(3, 23.4, [7, 10, 30, 7, 7, 15]),
	new ShipData(3, 23.4, [8, 11, 34, 8, 8, 17]),
	new ShipData(4, 23.4, [9, 12, 38, 9, 9, 19]),
	new ShipData(4, 23.4, [10, 13, 42, 10, 10, 21]),
	new ShipData(4, 23.4, [11, 14, 46, 11, 11, 23]),
	new ShipData(5, 23.4, [12, 15, 50, 12, 12, 25]),
	new ShipData(5, 23.4, [13, 16, 54, 13, 13, 26]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 트라곤
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 18.3, [6, 11, 3, 3, 14, 3]),
	new ShipData(2, 19.3, [7, 12, 4, 4, 18, 4]),
	new ShipData(2, 20.3, [8, 13, 5, 5, 22, 5]),
	new ShipData(3, 21.3, [9, 14, 6, 6, 26, 6]),
	new ShipData(3, 22.3, [10, 15, 7, 7, 30, 7]),
	new ShipData(3, 22.3, [11, 17, 8, 8, 34, 8]),
	new ShipData(4, 22.3, [12, 19, 9, 9, 38, 9]),
	new ShipData(4, 22.3, [13, 21, 10, 10, 42, 10]),
	new ShipData(4, 22.3, [14, 23, 11, 11, 46, 11]),
	new ShipData(5, 22.3, [15, 25, 12, 12, 50, 12]),
	new ShipData(5, 22.3, [16, 26, 13, 13, 54, 13]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 아스트레이
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 22.6, [9, 9, 9, 9, 9, 9]),
	new ShipData(2, 23.6, [10, 10, 10, 10, 10, 10]),
	new ShipData(2, 24.6, [11, 11, 11, 11, 11, 11]),
	new ShipData(3, 25.6, [12, 12, 12, 12, 12, 12]),
	new ShipData(3, 26.6, [13, 13, 13, 13, 13, 13]),
	new ShipData(3, 26.6, [14, 14, 14, 14, 14, 14]),
	new ShipData(4, 26.6, [15, 15, 15, 15, 15, 15]),
	new ShipData(4, 26.6, [16, 16, 16, 16, 16, 16]),
	new ShipData(4, 26.6, [17, 17, 17, 17, 17, 17]),
	new ShipData(5, 26.6, [18, 18, 18, 18, 18, 18]),
	new ShipData(5, 26.6, [19, 19, 19, 19, 19, 19]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

shipData.push([ // 에이번의 상처
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0]),
	new ShipData(2, 18.6, [3, 3, 3, 11, 6, 14]),
	new ShipData(2, 19.6, [4, 4, 4, 12, 7, 18]),
	new ShipData(2, 20.6, [5, 5, 5, 13, 8, 22]),
	new ShipData(3, 21.6, [6, 6, 6, 14, 9, 26]),
	new ShipData(3, 22.6, [7, 7, 7, 15, 10, 30]),
	new ShipData(3, 22.6, [8, 8, 8, 17, 11, 34]),
	new ShipData(4, 22.6, [9, 9, 9, 19, 12, 38]),
	new ShipData(4, 22.6, [10, 10, 10, 21, 13, 42]),
	new ShipData(4, 22.6, [11, 11, 11, 23, 14, 46]),
	new ShipData(5, 22.6, [12, 12, 12, 25, 15, 50]),
	new ShipData(5, 22.6, [13, 13, 13, 26, 16, 54]),
	new ShipData(0, 0, [0, 0, 0, 0, 0, 0])
])

function ShipData(a, b, c){
	this.sailorNumber = a;
	this.speed = b;
	this.resistance = c;
}

var adventureResistance = [];
adventureResistance.push([0, 0, 0, 0, 0, 0]);
adventureResistance.push([1, 0, 0, 0, 0, 0]);
adventureResistance.push([2, 0, 0, 0, 0, 0]);
adventureResistance.push([2, 0, 0, 0, 1, 0]);
adventureResistance.push([2, 0, 0, 0, 1, 1]);
adventureResistance.push([2, 0, 1, 0, 1, 1]);
adventureResistance.push([2, 0, 2, 0, 1, 1]);
adventureResistance.push([3, 0, 2, 0, 1, 1]);
adventureResistance.push([3, 0, 2, 0, 1, 2]);
adventureResistance.push([3, 0, 2, 0, 1, 3]);

adventureResistance.push([3, 0, 3, 0, 1, 3]);
adventureResistance.push([3, 0, 3, 0, 2, 3]);
adventureResistance.push([4, 0, 3, 0, 2, 3]);
adventureResistance.push([5, 0, 3, 0, 2, 3]);
adventureResistance.push([5, 0, 3, 0, 3, 3]);
adventureResistance.push([5, 0, 3, 0, 4, 3]);
adventureResistance.push([5, 0, 3, 0, 4, 4]);
adventureResistance.push([5, 1, 3, 0, 4, 5]);
adventureResistance.push([5, 1, 4, 0, 4, 5]);
adventureResistance.push([6, 1, 4, 0, 4, 5]);

adventureResistance.push([6, 1, 4, 0, 4, 6]);
adventureResistance.push([6, 1, 4, 1, 4, 6]);
adventureResistance.push([6, 1, 4, 1, 5, 6]);
adventureResistance.push([6, 1, 4, 2, 5, 6]);
adventureResistance.push([7, 1, 4, 2, 5, 6]);
adventureResistance.push([8, 2, 5, 3, 6, 7]);
adventureResistance.push([8, 2, 5, 3, 6, 8]);
adventureResistance.push([8, 2, 6, 4, 6, 8]);
adventureResistance.push([8, 2, 6, 5, 6, 8]);
adventureResistance.push([8, 3, 7, 5, 6, 8]);

adventureResistance.push([9, 4, 7, 5, 6, 8]);
adventureResistance.push([9, 5, 7, 5, 7, 8]);
adventureResistance.push([10, 6, 8, 6, 8, 9]);
adventureResistance.push([10, 6, 8, 7, 8, 10]);
adventureResistance.push([10, 7, 9, 7, 8, 10]);
adventureResistance.push([10, 8, 9, 8, 8, 10]);
adventureResistance.push([11, 9, 10, 9, 9, 11]);
adventureResistance.push([11, 9, 10, 9, 10, 11]);
adventureResistance.push([11, 10, 10, 10, 10, 11]);
adventureResistance.push([11, 10, 10, 10, 11, 11]);

adventureResistance.push([12, 11, 11, 11, 12, 12]);
adventureResistance.push([12, 12, 11, 11, 12, 12]);
adventureResistance.push([12, 12, 12, 11, 12, 12]);
adventureResistance.push([12, 12, 12, 12, 12, 12]);
adventureResistance.push([13, 13, 13, 13, 13, 13]);
adventureResistance.push([13, 14, 13, 13, 13, 13]);
adventureResistance.push([13, 15, 13, 13, 13, 13]);
adventureResistance.push([13, 15, 14, 13, 13, 13]);
adventureResistance.push([13, 15, 13, 13, 13, 13]); // placeholder
adventureResistance.push([13, 15, 13, 13, 13, 13]);

for(let i_=0;i_<adventureResistance.length;i_++){
	let t_ = adventureResistance[i_][1];
	adventureResistance[i_][1] = adventureResistance[i_][5];
	adventureResistance[i_][5] = t_;
	t_ = adventureResistance[i_][3];
	adventureResistance[i_][3] = adventureResistance[i_][4];
	adventureResistance[i_][4] = t_;
}

var sailors = [];
sailors.push(new Sailor("유물", "칼스", "에스토크", 2.2, [8, -6, -6, 8, 9, -9], sailors.length));
sailors.push(new Sailor("유물", "엔쯔", "풍백", 2.2, [8, 5, -3, -3, 12, -15], sailors.length));
sailors.push(new Sailor("유물", "엔슬리", "바크스툼", 2.2, [-15, 6, -6, 11, 1, 8], sailors.length));
sailors.push(new Sailor("유물", "포이포이", "프뉴마", 2.2, [12, 6, -3, 6, -6, -12], sailors.length));
sailors.push(new Sailor("유물", "아나벨", "브람스", 2.2, [-15, 1, 12, 6, -6, 6], sailors.length));
sailors.push(new Sailor("유물", "라티나", "트라곤", 2.2, [5, -3, -3, 6, 13, -15], sailors.length));
sailors.push(new Sailor("유물", "검은이빨", "아스트레이", 2.3, [11, 8, 7, -2, -9, -15], sailors.length));
sailors.push(new Sailor("유물", "화린", "에이번의 상처", 2.2, [8, -3, -15, 5, -3, 12], sailors.length));

sailors.push(new Sailor("유물", "푸푸링", "에스토크", 1.3, [-14, 10, -3, 10, -3, 17], sailors.length));
sailors.push(new Sailor("유물", "소랑", "풍백", 1.3, [-14, 17, 10, -1, -6, 10], sailors.length));
sailors.push(new Sailor("유물", "바라트", "바크스툼", 1.3, [-6, 10, -6, 17, 10, -10], sailors.length));
sailors.push(new Sailor("유물", "마티마티", "프뉴마", 1.3, [15, 12, -6, 10, -1, -14], sailors.length));
sailors.push(new Sailor("유물", "셜리", "브람스", 1.3, [10, -1, 17, -3, 10, -16], sailors.length));
sailors.push(new Sailor("유물", "에드워드", "트라곤", 1.3, [-19, 12, -1, -1, 9, 17], sailors.length));
sailors.push(new Sailor("유물", "바라카스", "아스트레이", 1.6, [-16, 1, 21, 12, 1, 12], sailors.length));
sailors.push(new Sailor("유물", "베럴드", "에이번의 상처", 1.0, [-20, 2, -7, 11, 15, 7], sailors.length));

sailors.push(new Sailor("유물", "니에라", "에스토크", 0.3, [15, 15, 16, -11, -22, 16], sailors.length));
sailors.push(new Sailor("유물", "은광", "풍백", 0.3, [-22, 22, 0, 15, 15, 0], sailors.length));
sailors.push(new Sailor("유물", "벤더빌", "바크스툼", 0.3, [0, 16, 15, 20, -6, -17], sailors.length));
sailors.push(new Sailor("유물", "나리나리", "프뉴마", 0.3, [22, 15, -6, 15, 5, -22], sailors.length));
sailors.push(new Sailor("유물", "파르메니온", "브람스", 0.3, [-22, 13, 22, -6, 5, 16], sailors.length));
sailors.push(new Sailor("유물", "오네", "트라곤", 0.3, [15, -6, 15, 0, 20, -17], sailors.length));
sailors.push(new Sailor("유물", "빌헬름", "아스트레이", 0.4, [-13, 18, -13,18, 18, 21], sailors.length));
sailors.push(new Sailor("유물", "검은 망령 빌리어드", "에이번의 상처", 0.3, [-17, 13, -6, 15, 0, 24], sailors.length));



sailors.push(new Sailor("전설", "칼스", "에스토크", 1.7, [-6, -5, -6, 5, 9, 5], sailors.length));
sailors.push(new Sailor("전설", "엔쯔", "풍백", 1.7, [5, 5, -8, -5, 9, -5], sailors.length));
sailors.push(new Sailor("전설", "엔슬리", "바크스툼", 1.7, [-5, -8, -5, 10, 4, 4], sailors.length));
sailors.push(new Sailor("전설", "포이포이", "프뉴마", 1.7, [10, -1, -1, 4, 4, -15], sailors.length));
sailors.push(new Sailor("전설", "아나벨", "브람스", 1.7, [-10, 5, 9, 5, -4, -4], sailors.length));
sailors.push(new Sailor("전설", "라티나", "트라곤", 1.7, [-8, 4, -5, 4, 10, -5], sailors.length));
sailors.push(new Sailor("전설", "검은이빨", "아스트레이", 1.7, [9, 5, -10, 5, -4, -4], sailors.length));
sailors.push(new Sailor("전설", "화린", "에이번의 상처", 1.7, [6, -5, -8, -5, 6, 8], sailors.length));

sailors.push(new Sailor("전설", "푸푸링", "에스토크", 1.0, [-2, 8, 8, -9, -9, 15], sailors.length));
sailors.push(new Sailor("전설", "소랑", "풍백", 1.0, [-9, 13, 8, -5, 8, -5], sailors.length));
sailors.push(new Sailor("전설", "바라트", "바크스툼", 1.0, [8, -7, -5, 13, 8, -7], sailors.length));
sailors.push(new Sailor("전설", "마티마티", "프뉴마", 1.0, [15, 8, -9, -9, -2, 8], sailors.length));
sailors.push(new Sailor("전설", "셜리", "브람스", 1.0, [-9, -2, 13, 8, 8, -9], sailors.length));
sailors.push(new Sailor("전설", "에드워드", "트라곤", 1.0, [-5, 8, 8, -9, -5, 15], sailors.length));
sailors.push(new Sailor("전설", "바라카스", "아스트레이", 1.3, [-2, -11, 16, 9, -2, 9], sailors.length));
sailors.push(new Sailor("전설", "베럴드", "에이번의 상처", 0.8, [-17, -3, -3, 7, 12, 7], sailors.length));

sailors.push(new Sailor("전설", "니에라", "에스토크", 0.2, [11, 11, 13, -10, -19, 13], sailors.length));
sailors.push(new Sailor("전설", "은광", "풍백", 0.2, [-19, 18, 10, 12, -1, -1], sailors.length));
sailors.push(new Sailor("전설", "벤더빌", "바크스툼", 0.2, [-5, 11, -5, 17, -10, 11], sailors.length));
sailors.push(new Sailor("전설", "나리나리", "프뉴마", 0.2, [17, -5, 11, 11, -8, -8], sailors.length));
sailors.push(new Sailor("전설", "파르메니온", "브람스", 0.2, [13, -1, 14, -5, -15, 13], sailors.length));
sailors.push(new Sailor("전설", "오네", "트라곤", 0.2, [13, -3, -3, -15, 14, 13], sailors.length));
sailors.push(new Sailor("전설", "빌헬름", "아스트레이", 0.3, [-12, 14, -12, 14, 14, 17], sailors.length));
sailors.push(new Sailor("전설", "검은 망령 빌리어드", "에이번의 상처", 0.2, [-8, 12, -8, 12, -5, 16], sailors.length));



sailors.push(new Sailor("영웅", "칼스", "에스토크", 1.3, [-7, -4, 3, 5, 8, -4], sailors.length));
sailors.push(new Sailor("영웅", "엔쯔", "풍백", 1.3, [4, -9, -3, -3, 8, 4], sailors.length));
sailors.push(new Sailor("영웅", "엔슬리", "바크스툼", 1.3, [-4, -7, -4, 8, 3, 3], sailors.length));
sailors.push(new Sailor("영웅", "포이포이", "프뉴마", 1.3, [8, 3, -3, 3, -9, -3], sailors.length));
sailors.push(new Sailor("영웅", "아나벨", "브람스", 1.3, [4, -4, 8, 4, -6, -6], sailors.length));
sailors.push(new Sailor("영웅", "라티나", "트라곤", 1.3, [-6, -4, 4, 4, 8, -6], sailors.length));
sailors.push(new Sailor("영웅", "검은이빨", "아스트레이", 1.4, [8, 4, 4, -7, -4, -4], sailors.length));
sailors.push(new Sailor("영웅", "화린", "에이번의 상처", 1.3, [4, -2, -7, 4, -7, 8], sailors.length));

sailors.push(new Sailor("영웅", "푸푸링", "에스토크", 0.7, [-8, 6, -5, -5, 6, 11], sailors.length));
sailors.push(new Sailor("영웅", "소랑", "풍백", 0.7, [7, 10, 7, -5, -8, -5], sailors.length));
sailors.push(new Sailor("영웅", "바라트", "바크스툼", 0.7, [6, -5, -8, 11, 6, -5], sailors.length));
sailors.push(new Sailor("영웅", "마티마티", "프뉴마", 0.7, [11, 6, 6, -5, -5, -8], sailors.length));
sailors.push(new Sailor("영웅", "셜리", "브람스", 0.7, [-14, -2, 12, -2, 6, 6], sailors.length));
sailors.push(new Sailor("영웅", "에드워드", "트라곤", 0.7, [-3, 7, -11, 5, -3, 11], sailors.length));
sailors.push(new Sailor("영웅", "바라카스", "아스트레이", 1.0, [-3, -3, 12, 8, -6, 8], sailors.length));
sailors.push(new Sailor("영웅", "베럴드", "에이번의 상처", 0.6, [-6, 6, -9, 6, 10, -6], sailors.length));

sailors.push(new Sailor("영웅", "니에라", "에스토크", 0.2, [9, 9, 10, -9, -16, 10], sailors.length));
sailors.push(new Sailor("영웅", "은광", "풍백", 0.2, [10, 12, -5, 10, -5, -9], sailors.length));
sailors.push(new Sailor("영웅", "벤더빌", "바크스툼", 0.2, [-7, 9, 9, 14, -5, -7], sailors.length));
sailors.push(new Sailor("영웅", "나리나리", "프뉴마", 0.2, [16, -9, -5, 8, -5, 8], sailors.length));
sailors.push(new Sailor("영웅", "파르메니온", "브람스", 0.2, [-9, 9, 14, -5, -5, 9], sailors.length));
sailors.push(new Sailor("영웅", "오네", "트라곤", 0.2, [10, -5, 10, -7, 12, -7], sailors.length));
sailors.push(new Sailor("영웅", "빌헬름", "아스트레이", 0.2, [-11, 11, -11, 11, 11, 14], sailors.length));
sailors.push(new Sailor("영웅", "검은 망령 빌리어드", "에이번의 상처", 0.2, [-9, -1, 8, 8, -9, 16], sailors.length));

sailors.push(new Sailor("영웅", "제이콥", "에스토크", 0.7, [-7, 0, 17, -3, -3, -3], sailors.length));
sailors.push(new Sailor("영웅", "요조", "풍백", 0.2, [-2, 19, -9, 6, 1, -4], sailors.length));
sailors.push(new Sailor("영웅", "체커", "바크스툼", 0.2, [-4, 6, 3, -14, 19, 1], sailors.length));
sailors.push(new Sailor("영웅", "루키루키", "프뉴마", 0.2, [-14, 6, 19, 6, -2, -4], sailors.length));
sailors.push(new Sailor("영웅", "베르토지", "브람스", 0.2, [6, 6, -2, 19, -4, -14], sailors.length));
sailors.push(new Sailor("영웅", "벨로드", "트라곤", 0.2, [3, 1, 1, -9, -4, 19], sailors.length));
sailors.push(new Sailor("영웅", "로사", "아스트레이", 0.2, [3, 1, -14, -4, 9, 16], sailors.length));
sailors.push(new Sailor("영웅", "스코델", "에이번의 상처", 0.2, [-2, -4, 6, 19, -14, 6], sailors.length));



sailors.push(new Sailor("희귀", "아후", "에스토크", 1.0, [4, -2, 6, -2, -4, -4], sailors.length));
sailors.push(new Sailor("희귀", "이든", "에스토크", 0.6, [3, 1, 9, -4, 7, -11], sailors.length));
sailors.push(new Sailor("희귀", "타샤", "에스토크", 0.1, [5, 5, 5, 5, 5, 5], sailors.length));
sailors.push(new Sailor("희귀", "용진", "풍백", 1.0, [-4, 6, 4, -4, -2, -2], sailors.length));
sailors.push(new Sailor("희귀", "서연", "풍백", 0.6, [6, 10, -3, 0, -5, -3], sailors.length));
sailors.push(new Sailor("희귀", "현궁", "풍백", 0.1, [-1, -7, 13, 2, -4, 8], sailors.length));
sailors.push(new Sailor("희귀", "포포", "바크스툼", 1.0, [4, -3, -6, 6, 0, -3], sailors.length));
sailors.push(new Sailor("희귀", "반돌프", "바크스툼", 0.6, [-3, -6, -3, 11, 1, 5], sailors.length));
sailors.push(new Sailor("희귀", "포이테", "바크스툼", 0.1, [5, -7, -10, 2, 5, 10], sailors.length));
sailors.push(new Sailor("희귀", "코니코니", "프뉴마", 1.0, [0, -3, -3, -6, 4, 6], sailors.length));
sailors.push(new Sailor("희귀", "모리모리", "프뉴마", 0.6, [10, -4, 0, -3, 6, -4], sailors.length));
sailors.push(new Sailor("희귀", "코코리코", "프뉴마", 0.1, [13, -4, -7, -4, 3, 5], sailors.length));
sailors.push(new Sailor("희귀", "미카엘", "브람스", 1.0, [-2, -7, 7, -2, 0, 4], sailors.length));
sailors.push(new Sailor("희귀", "타르밀라", "브람스", 0.6, [-4, 8, 8, -4, -3, 0], sailors.length));
sailors.push(new Sailor("희귀", "쥬리엔", "브람스", 0.1, [9, 2, -4, -1, -7, 12], sailors.length));
sailors.push(new Sailor("희귀", "제프리", "트라곤", 1.0, [-2, 4, -3, -3, 7, -4], sailors.length));
sailors.push(new Sailor("희귀", "카트린느", "트라곤", 0.6, [-3, -3, 6, -3, 10, -3], sailors.length));
sailors.push(new Sailor("희귀", "오도리크", "트라곤", 0.1, [-1, -1, -4, -4, 12, 9], sailors.length));
sailors.push(new Sailor("희귀", "포딘", "아스트레이", 1.3, [7, -1, 4, -1, -3, -3], sailors.length));
sailors.push(new Sailor("희귀", "소피아", "아스트레이", 0.7, [11, -2, -2, -2, -2, 7], sailors.length));
sailors.push(new Sailor("희귀", "퀵실", "아스트레이", 0.2, [-3, 14, 10, 0, 0, -3], sailors.length));
sailors.push(new Sailor("희귀", "케브라", "에이번의 상처", 1.0, [-3, -3, -3, -3, 4, 6], sailors.length));
sailors.push(new Sailor("희귀", "자네스", "에이번의 상처", 0.5, [-1, 5, -7, -5, 9, -1], sailors.length));
sailors.push(new Sailor("희귀", "소멸한 세녹", "에이번의 상처", 0.1, [-4, -1, 8, -1, -4, 13], sailors.length));



sailors.push(new Sailor("고급", "아후", "에스토크", 0.8, [3, -2, 4, -2, -4, -4], sailors.length));
sailors.push(new Sailor("고급", "이든", "에스토크", 0.4, [3, 0, 7, -4, 5, -10], sailors.length));
sailors.push(new Sailor("고급", "타샤", "에스토크", 0.1, [4, 4, 4, 4, 4, 4], sailors.length));
sailors.push(new Sailor("고급", "용진", "풍백", 0.8, [-4, 4, 3, -4, -2, -2], sailors.length));
sailors.push(new Sailor("고급", "서연", "풍백", 0.4, [5, 7, -3, -1, -5, -3], sailors.length));
sailors.push(new Sailor("고급", "현궁", "풍백", 0.1, [-1, -6, 10, 1, -4, 6], sailors.length));
sailors.push(new Sailor("고급", "포포", "바크스툼", 0.8, [3, -3, -6, 4, 0, -3], sailors.length));
sailors.push(new Sailor("고급", "반돌프", "바크스툼", 0.4, [-3, -6, -3, 8, 0, 4], sailors.length));
sailors.push(new Sailor("고급", "포이테", "바크스툼", 0.1, [4, -6, -9, 1, 1, 8], sailors.length));
sailors.push(new Sailor("고급", "코니코니", "프뉴마", 0.8, [0, -3, -3, -6, 3, 4], sailors.length));
sailors.push(new Sailor("고급", "모리모리", "프뉴마", 0.4, [7, -4, -1, -3, 5, -4], sailors.length));
sailors.push(new Sailor("고급", "코코리코", "프뉴마", 0.1, [10, -4, -6, -4, 3, 4], sailors.length));
sailors.push(new Sailor("고급", "미카엘", "브람스", 0.8, [-2, -7, 5, -2, 0, 3], sailors.length));
sailors.push(new Sailor("고급", "타르밀라", "브람스", 0.4, [-4, 6, 6, -4, -3, -1], sailors.length));
sailors.push(new Sailor("고급", "쥬리엔", "브람스", 0.1, [7, 1, -4, -1, -6, 9], sailors.length));
sailors.push(new Sailor("고급", "제프리", "트라곤", 0.8, [-3, 3, -3, -3, 5, -3], sailors.length));
sailors.push(new Sailor("고급", "카트린느", "트라곤", 0.4, [0, -4, 5, -4, 7, -4], sailors.length));
sailors.push(new Sailor("고급", "오도리크", "트라곤", 0.1, [-2, -2, -2, -2, 10, 6], sailors.length));
sailors.push(new Sailor("고급", "포딘", "아스트레이", 1.0, [5, -5, 3, -2, -2, -2], sailors.length));
sailors.push(new Sailor("고급", "소피아", "아스트레이", 0.6, [7, -3, -3, -1, -1, 6], sailors.length));
sailors.push(new Sailor("고급", "퀵실", "아스트레이", 0.1, [2, 9, 9, 2, -5, -5], sailors.length));
sailors.push(new Sailor("고급", "케브라", "에이번의 상처", 0.8, [-3, -3, -3, -3, 3, 5], sailors.length));
sailors.push(new Sailor("고급", "자네스", "에이번의 상처", 0.4, [-4, 5, 0, -4, 7, -4], sailors.length));
sailors.push(new Sailor("고급", "소멸한 세녹", "에이번의 상처", 0.1, [-1, -4, 6, -4, -1, 10], sailors.length));



sailors.push(new Sailor("일반", "아후", "에스토크", 0.6, [3, -2, 3, -2, -4, -4], sailors.length));
sailors.push(new Sailor("일반", "이든", "에스토크", 0.3, [2, 0, 6, -3, 4, -9], sailors.length));
sailors.push(new Sailor("일반", "타샤", "에스토크", 0.1, [3, 3, 3, 3, 3, 3], sailors.length));
sailors.push(new Sailor("일반", "용진", "풍백", 0.6, [-4, 3, 3, -4, -2, -2], sailors.length));
sailors.push(new Sailor("일반", "서연", "풍백", 0.3, [4, 6, -3, -1, -4, -3], sailors.length));
sailors.push(new Sailor("일반", "현궁", "풍백", 0.1, [-1, -5, 9, 1, -3, 5], sailors.length));
sailors.push(new Sailor("일반", "포포", "바크스툼", 0.6, [3, -3, -5, 3, -1, -3], sailors.length));
sailors.push(new Sailor("일반", "반돌프", "바크스툼", 0.3, [-6, -5, -3, 7, 0, 3], sailors.length));
sailors.push(new Sailor("일반", "포이테", "바크스툼", 0.1, [3, -5, -7, 1, 0, 7], sailors.length));
sailors.push(new Sailor("일반", "코니코니", "프뉴마", 0.6, [-1, -3, -3, -5, 3, 3], sailors.length));
sailors.push(new Sailor("일반", "모리모리", "프뉴마", 0.3, [6, -3, -1, -3, 4, -3], sailors.length));
sailors.push(new Sailor("일반", "코코리코", "프뉴마", 0.1, [9, -3, -5, -3, 2, 3], sailors.length));
sailors.push(new Sailor("일반", "미카엘", "브람스", 0.6, [-2, -7, 4, -2, -1, 2], sailors.length));
sailors.push(new Sailor("일반", "타르밀라", "브람스", 0.3, [-3, 5, 5, -3, -3, -1], sailors.length));
sailors.push(new Sailor("일반", "쥬리엔", "브람스", 0.1, [6, 1, -3, -1, -5, 8], sailors.length));
sailors.push(new Sailor("일반", "제프리", "트라곤", 0.6, [-2, -2, -2, -2, 5, -2], sailors.length));
sailors.push(new Sailor("일반", "카트린느", "트라곤", 0.3, [-5, 2, 4, -2, 6, -5], sailors.length));
sailors.push(new Sailor("일반", "오도리크", "트라곤", 0.1, [-3, 1, 5, 5, -1, 5], sailors.length));
sailors.push(new Sailor("일반", "포딘", "아스트레이", 0.8, [-2, -2, -2, -2, 5, -2], sailors.length));
sailors.push(new Sailor("일반", "소피아", "아스트레이", 0.4, [6, 1, -3, -3, -3, 5], sailors.length));
sailors.push(new Sailor("일반", "퀵실", "아스트레이", 0.1, [-1, 9, 7, -1, -1, -1], sailors.length));
sailors.push(new Sailor("일반", "케브라", "에이번의 상처", 0.6, [-2, -2, -2, -2, -2, 5], sailors.length));
sailors.push(new Sailor("일반", "자네스", "에이번의 상처", 0.3, [-3, 4, -3, -5, 6, 2], sailors.length));
sailors.push(new Sailor("일반", "소멸한 세녹", "에이번의 상처", 0.1, [0, 0, -2, 7, -7, 9], sailors.length));

sailors.push(new Sailor("일반", "하버크", "", 0.7, [-3, -3, 4, -3, 3, -3], sailors.length));
sailors.push(new Sailor("일반", "모카모카", "", 0.4, [6, -1, -2, -1, -4, 5], sailors.length));
sailors.push(new Sailor("일반", "에슈", "", 0.1, [4, 4, 5, 5, 2, 3], sailors.length));

function Sailor(a, b, c, d, e, f){

	this.grade = a;
	this.name = b;
	this.ship = c;
	this.speed = d;
	this.resistance = e;
	this.index = f;

}

function selectPreset(n){

	n = parseInt(n);
	if(isNaN(n)){
		setDefaultPreset();
		return;
	}
	if(n < 0 || n >= preset.length){
		return;
	}

	presetSelected = n;
	refresh();

}

function refresh(){

	if(presetSelected < 0 || presetSelected >= preset.length){
		document.getElementById('divRight').style.display = 'none';
	} else{
		document.getElementById('divRight').style.display = '';
		document.getElementById('shipList').selectedIndex = preset[presetSelected].ship;
		document.getElementById('shipLevel').selectedIndex = preset[presetSelected].shipLevel - 1;

		// 배 일치하지 않으면
		for(let i = 0;i<preset[presetSelected].sailor.length;i++){
			for(let j=0;j<sailors.length;j++){
				if(sailors[j].index == preset[presetSelected].sailor[i]){
					if(sailors[j].ship != '' && sailors[j].ship != shipName[preset[presetSelected].ship]){
						preset[presetSelected].sailor.splice(i, 1);
						i--;
						break;
					}
				}
			}
		}

		while(preset[presetSelected].sailor.length > shipData[preset[presetSelected].ship][preset[presetSelected].shipLevel].sailorNumber){
			preset[presetSelected].sailor.pop();
		}
		
		let child = document.getElementById('skinResistance').childNodes[0];
		for(let i=0;i<6;i++){
			while(child.tagName != 'INPUT'){
				child = child.nextSibling;
			}
			child.value = preset[presetSelected].resistance[i];
			child = child.nextSibling;
		}

		var speed = 0;
		speed += shipData[preset[presetSelected].ship][preset[presetSelected].shipLevel].speed;
		for(let i = 0;i<preset[presetSelected].sailor.length;i++){
			for(let j = 0;j<sailors.length;j++){
				if(sailors[j].index == preset[presetSelected].sailor[i]){
					speed += sailors[j].speed;
				}
			}
		}
		var speedLeft = Math.floor(speed);
		var speedRight = Math.round(speed * 10) % 10;
		document.getElementById('shipSpeed').innerHTML = speedLeft + "." + speedRight;

	}
	


	if(preset.length == 0){
		document.getElementById('presetList').innerHTML = '';
	} else {
		var p = document.getElementById('presetList');
		p.innerHTML = '';

		for(let i=0;i<preset.length;i++){
			var e = document.createElement('DIV');
			e.addEventListener("click", function(){
				(function(){
					var innerIndex = i;
					selectPreset(innerIndex);
				})();
			})
			if(i == presetSelected){
				e.className = 'presetSelected';
			} else{
				e.className = 'presetList';
			}

			s = '';
			s += 'Lv. ';
			s += preset[i].shipLevel;
			s += ' ';
			s += shipName[preset[i].ship];
			
			e.innerHTML = s;
			p.appendChild(e);
		}
	}

	weakRefresh();

}

function weakRefresh(){

	if(presetSelected < 0 || presetSelected >= preset.length){
		return;
	}
	
	// 선원 표기
	let onlyRidableSailor = document.getElementById('isRidable').checked;

	let rows = document.getElementById('sailors').rows;

	for(let i = 1;i<rows.length;i++){
		if(onlyRidableSailor == false || sailors[i-1].ship == '' || sailors[i-1].ship == shipName[preset[presetSelected].ship]){
			rows[i].style.display = '';
		} else {
			rows[i].style.display = 'none';
		}

		rows[i].style.backgroundColor = '';
		for(let j = 0;j<preset[presetSelected].sailor.length;j++){
			if(preset[presetSelected].sailor[j] == sailors[i-1].index){
				rows[i].style.backgroundColor = '#c4f9ff';
				break;
			}
		}
	}


	var sum = 0;
	for(let i = 0;i<6;i++){
		sum += preset[presetSelected].resistance[i];
	}

	if(sum < 0 || sum > 12){
		if(sum >= 128){
			document.getElementById('totalSkinResistance').innerText = '[놀자에요?]';
		} else if(sum >= 32){
			document.getElementById('totalSkinResistance').innerText = '총합: ' + sum + " ???";
		} else {
			document.getElementById('totalSkinResistance').innerText = '총합: ' + sum + " ?";
		}
	} else{
		document.getElementById('totalSkinResistance').innerText = '총합: ' + sum;
	}

	e = document.getElementById('resistanceResult');
	ee = e.firstChild;
	while(ee.tagName != 'TD'){
		ee = ee.nextSibling;
	}
	ee = ee.nextSibling;
	for(let i = 0;i<6;i++){
		while(ee.tagName != 'TD'){
			ee = ee.nextSibling;
		}
		ee.innerText = preset[presetSelected].resistance[i];
		ee = ee.nextSibling;
	}
	// 위와 변수 이어짐
	let panelty = [0, -20, -35, -60, -60, -60, 0];
	let additionalResistance = [0, 0, 0, 0, 0, 0];
	for(let i=0;i<6;i++){
		additionalResistance[i] += shipData[preset[presetSelected].ship][preset[presetSelected].shipLevel].resistance[i];
	}
	e = document.getElementById('adventurePoint');
	let n = parseInt(e.value);
	if(isNaN(n) || n < 0){
		e.value = '';
		n = 0;
	}
	if(n > 47){
		e.value = 47;
		n = 47;
	}
	let s = '';
	for(let i=0;i<6;i++){
		s += '<img style="width:16px;" src="data:image/png;base64,' + imageData.resistance[i] + '" />';
		s += '+' + adventureResistance[n][i] + ' ';
		additionalResistance[i] += adventureResistance[n][i];
	}
	document.getElementById('adventurePointResistance').innerHTML = s;
	for(let i=0;i<6;i++){
		for(let j = 0;j<preset[presetSelected].sailor.length;j++){
			for(let k = 0;k<sailors.length;k++){
				if(preset[presetSelected].sailor[j] == sailors[k].index){
					additionalResistance[i] += sailors[k].resistance[i];
					break;
				}
			}
		}
	}

	var areaTable = [];
	for(let i=0;i<6;i++){
		areaTable.push([]);
		for(let j=0;j<4;j++){
			areaTable[i].push([]);
			for(let k=0;k<6;k++){
				areaTable[i][j].push(0);
			}
		}
	}
	
	// 로헨델
	areaTable[2][1][5] = 1;
	areaTable[2][2][3] = 1;
	areaTable[2][2][4] = 1;
	
	// 욘
	areaTable[3][2][1] = 1;
	areaTable[3][2][2] = 1;
	areaTable[3][2][5] = 1;
	
	// 페이튼
	areaTable[4][2][1] = 1;
	areaTable[4][3][3] = 1;
	areaTable[4][3][5] = 1;

	// 파푸니카
	areaTable[5][2][1] = 1;
	areaTable[5][3][2] = 1;
	areaTable[5][3][4] = 1;
	
	var selectedArea = 0;
	e = document.getElementsByName('areaRadio');
	for(let i=0;i<6;i++){
		if(e[i].checked == true){
			selectedArea = parseInt(e[i].value);
			break;
		}
	}
	
	e = document.getElementById('resistanceResult');
	for(let i=0;i<4;i++){
		e = e.nextSibling;
		while(e.tagName != 'TR'){
			e = e.nextSibling;
		}
		ee = e.firstChild;
		while(ee.tagName != 'TD'){
			ee = ee.nextSibling;
		}
		ee = ee.nextSibling;
		for(let j=0;j<6;j++){
			while(ee.tagName != 'TD'){
				ee = ee.nextSibling;
			}

			let grade = 0;
			if(preset[presetSelected].resistance[j] + panelty[i] + additionalResistance[j] >= 60){
				ee.innerText = '강인';
				grade = 4;
			} else if(preset[presetSelected].resistance[j] + panelty[i] + additionalResistance[j] >= 30){
				ee.innerText = '보통';
				grade = 3;
			} else if(preset[presetSelected].resistance[j] + panelty[i] + additionalResistance[j] >= 0){
				ee.innerText = '취약';
				grade = 2;
			} else if(preset[presetSelected].resistance[j] + panelty[i] + additionalResistance[j] >= -29){
				ee.innerText = '매우 취약';
				grade = 1;
			} else {
				ee.innerText = '위험';
				grade = 0;
			}
			
			if(areaTable[selectedArea][i][j] > 0){
				if(grade == 0){
					ee.style.backgroundColor='#ff7777';
				} else if(grade == 1){
					ee.style.backgroundColor='#ffaaaa';
				} else if(grade == 2){
					ee.style.backgroundColor='#ffcccc';
				} else if(grade == 3){
					ee.style.backgroundColor='#ccffba';
				} else if(grade == 4){
					ee.style.backgroundColor='#88ff88';
				}
				
			} else {
				ee.style.backgroundColor='';
			}

			ee = ee.nextSibling;
		}
	}

	e = document.getElementById('resistanceResult');
	ee = e.firstChild;
	while(ee.tagName != 'TD'){
		ee = ee.nextSibling;
	}
	ee = ee.nextSibling;
	for(let i=0;i<6;i++){
		while(ee.tagName != 'TD'){
			ee = ee.nextSibling;
		}
		ee.innerText = preset[presetSelected].resistance[i] + additionalResistance[i];
		ee = ee.nextSibling;
	}
}

function createPreset(){

	savePreset();

	var a = new Preset();
	presetSelected = preset.length;
	preset.push(a);

	refresh();

}

function removePreset(){

	savePreset();

	n = parseInt(presetSelected);
	if(isNaN(n)){
		setDefaultPreset();
		return;
	}
	if(n < 0 || n >= preset.length){
		return;
	}

	preset.splice(n, 1);
	if(n >= preset.length){
		presetSelected = n-1;
	} else{
		presetSelected = n;
	}
	refresh();

}

function displayError(msg){
	errorOpacity = 1.0;
	document.getElementById('error').innerHTML = msg;
	document.getElementById('error').style.marginLeft = mouseX + 'px';
	document.getElementById('error').style.marginTop = mouseY + 'px';
}

function selectSailor(n){

	if(presetSelected < 0 || presetSelected >= preset.length){
		return;
	}
	if(n < 0 || n >= sailors.length){
		return;
	}

	for(let i = 0;i<preset[presetSelected].sailor.length;i++){
		if(preset[presetSelected].sailor[i] == n){
			preset[presetSelected].sailor.splice(i, 1);
			sortSailor();
			return;
		}
	}

	if(preset[presetSelected].sailor.length >= shipData[preset[presetSelected].ship][preset[presetSelected].shipLevel].sailorNumber){
		if(preset[presetSelected].shipLevel < 10){
			displayError('더이상 태울 수 없습니다. 선박 레벨을 올려주세요.');
		} else{
			displayError('더이상 태울 수 없습니다.');
		}
		return;
	}

	for(let i = 0;i<sailors.length;i++){
		if(n == sailors[i].index){
			if(shipName[preset[presetSelected].ship] == sailors[i].ship || sailors[i].ship == ''){
				preset[presetSelected].sailor.push(n);
				sortSailor();
				break;
			}
		}
	}

}

function savePreset(){

	if(presetSelected < 0 || presetSelected >= preset.length){
		return;
	}

	preset[presetSelected].ship = document.getElementById('shipList').selectedIndex;
	preset[presetSelected].shipLevel = document.getElementById('shipLevel').selectedIndex + 1;
	
	let child = document.getElementById('skinResistance').childNodes[0];
	for(let i=0;i<6;i++){

		while(child.tagName != 'INPUT'){
			child = child.nextSibling;
		}

		let value = parseInt(child.value);
		
		if(isNaN(value)){
			preset[presetSelected].resistance[i] = 0;
		} else {
			preset[presetSelected].resistance[i] = value;
		}

		child = child.nextSibling;

	}

	sortSailor();

}

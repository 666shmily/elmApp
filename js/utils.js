function changeStar(score){
	let startArr = [];
	// 求整数部分放整星，用类名on代替
	let int = Math.floor(score);
	for (let i = 0; i < int; i++) {
		startArr.push('on')
	}
	// 判断是否有半颗星，用类名half代替
	if(Math.floor(score * 2) / 2 % 1 !== 0){
		startArr.push('half')
	}
	// 剩下的用off补齐
	while(startArr.length < 5){
		startArr.push('off')
	}
	return startArr;
}

// 根据滚动区域找下标的函数
function getIndex(height,arr){
	let index = 0
	for (var i = 0; i < arr.length; i++) {
		if((height >= arr[i] && height <= arr[i+1]) || !arr[i+1]){
			index = i;
			break;
		}
	}
	return index;
}


// 封装函数实现通过id找下标的功能
function findIndex(id,arr){
	let index = -1;
	for(let i = 0;i < arr.length;i++){
		if(arr[i].id == id){
			index = i;
			break;
		}
	}
	return index;
}


// 转化时间的函数
function changeNow(now) {
				var time = new Date(now);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
			}

			function add0(m) {
				return m < 10 ? '0' + m : m
			}

(function(){
	var choosed = JSON.parse(localStorage.getItem('choosed')) || {};
	console.log(choosed);
	var speed = function(){
		return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
	};
	var getKey = function(item){
		return item.name + '-' + item.phone;
	};
	var createHTML = function(){
		var html = [ '<ul>' ];
		member.forEach(function(item, index){
			item.index = index;
			var key = getKey(item);
			var color = choosed[key] ? 'yellow' : 'white';
			html.push('<li><a href="#" style="color: ' + color + ';">' + item.name + '</a></li>');
		});
		html.push('</ul>');
		return html.join('');
	};
	var winner = [];
	var winners = 0;
	var id =0;
	var special = 0;
	var first = 0;
	var second = 0;
	var third = 0;
	var fourth = 0;
	var lottery = function(count){
		var total = member.length - 1;
		var ret = [];
		var list = canvas.getElementsByTagName('a');
		var color = '#' + ('00000' + Math.floor(Math.random() * 0xffffff)).slice(-6);
		var color = 'yellow';
			if(count == '大奖') {
				if(special < 2) {
					for(var i = 1; i < 2; i++){
						do {
							id = Math.ceil(Math.random() * total);
							console.log(id);
							if(member[id]){
								var key = getKey(member[id]);
							}
						} while(choosed[key] && winners < total);
						choosed[key] = 1;
						if(winner.indexOf(id) < 0){
							winner.push(id);
							ret.push('恭喜 ' + member[id].name + ' ' + member[id].phone + '<br/>' + count );
							winners = winners + 1;
							special++;
							console.log("winners:" + winners);
							list[id].style.color = color;
						} else {
							ret.push('名额已用完');
						}
					}
				} else {
							ret.push('名额已用完');
						}
			}
			if(count == '一等奖') {
				if(first < 6) {
					for(var i = 1; i < 4; i++){
						do {
							id = Math.ceil(Math.random() * total);
							console.log(id);
							if(member[id]){
								var key = getKey(member[id]);
							}
						} while(choosed[key] && winners < total);
						choosed[key] = 1;
						if(winner.indexOf(id) < 0){
							winner.push(id);
							ret.push('恭喜 ' + member[id].name + ' ' + member[id].phone + '<br/>' + count );
							winners = winners + 1;
							first++;
							console.log("winners:" + winners);
							list[id].style.color = color;
						} else {
							ret.push('名额已用完');
						}
					}
				} else {
							ret.push('名额已用完');
						}
			}
			if(count == '二等奖') {
				if(second < 12) {
					for(var i = 1; i < 5; i++){
						do {
							id = Math.ceil(Math.random() * total);
							console.log(id);
							if(member[id]){
								var key = getKey(member[id]);
							}
						} while(choosed[key] && winners < total);
						choosed[key] = 1;
						if(winner.indexOf(id) < 0){
							winner.push(id);
							ret.push('恭喜 ' + member[id].name + ' ' + member[id].phone + '<br/>' + count );
							winners = winners + 1;
							second++;
							console.log("winners:" + winners);
							list[id].style.color = color;
						} else {
							ret.push('名额已用完');
						}
					}
				} else {
							ret.push('名额已用完');
						}
			}
			if(count == '三等奖') {
				if(third < 40) {
					for(var i = 1; i < 21; i++){
						do {
							id = Math.ceil(Math.random() * total);
							console.log(id);
							if(member[id]){
								var key = getKey(member[id]);
							}
						} while(choosed[key] && winners < total);
						choosed[key] = 1;
						if(winner.indexOf(id) < 0){
							winner.push(id);
							ret.push('恭喜 ' + member[id].name + ' ' + member[id].phone + '<br/>' + count );
							winners = winners + 1;
							third++;
							console.log("winners:" + winners);
							list[id].style.color = color;
						} else {
							ret.push('名额已用完');
						}
					}
				} else {
							ret.push('名额已用完');
						}
			}
			if(count == '心水奖') {
				if(fourth < 60) {
					for(var i = 1; i < 21; i++){
						do {
							id = Math.ceil(Math.random() * total);
							console.log(id);
							if(member[id]){
								var key = getKey(member[id]);
							}
						} while(choosed[key] && winners < total);
						choosed[key] = 1;
						if(winner.indexOf(id) < 0){
							winner.push(id);
							ret.push('恭喜 ' + member[id].name + ' ' + member[id].phone + '<br/>' + count );
							winners = winners + 1;
							fourth++;
							console.log("winners:" + winners);
							list[id].style.color = color;
						} else {
							ret.push('名额已用完');
						}
					}
				} else {
							ret.push('名额已用完');
						}
			}
			if(count == '30') {
				ret.push('请选择奖项！');
			}
		localStorage.setItem('choosed', JSON.stringify(choosed));
		return ret;
	};
	var canvas = document.createElement('canvas');
	canvas.id = 'myCanvas';
	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;
	document.getElementById('main').appendChild(canvas);
	new Vue({
		el: '#tools',
		data: {
			selected: 30,
			running: false,
			btns: [
				'大奖', '一等奖', '二等奖', '三等奖', '心水奖',
			]
		},
		ready: function(){
			canvas.innerHTML = createHTML();
			TagCanvas.Start('myCanvas', '', {
				textColour: null,
				initial: speed(),
				dragControl: 1,
				textHeight: 14
			});
		},
		methods: {
			reset: function(){
				if(confirm('确定要重置么？所有之前的抽奖历史将被清除！')){
					localStorage.clear();
					location.reload(true);
				}
			},
			onClick: function(num){
				$('#result').css('display', 'none');
				$('#main').removeClass('mask');
				this.selected = num;
			},
			toggle: function(){
				if(this.running){
					TagCanvas.SetSpeed('myCanvas', speed());
					var ret = lottery(this.selected);
					$('#result').css('display', 'block').html('<span>' + ret.join('</span><span>') + '</span>');
					TagCanvas.Reload('myCanvas');
					setTimeout(function(){
						localStorage.setItem(new Date().toString(), JSON.stringify(ret));
						$('#main').addClass('mask');
					}, 300);
					console.log(ret);
				} else {
					$('#result').css('display', 'none');
					$('#main').removeClass('mask');
					TagCanvas.SetSpeed('myCanvas', [5, 1]);
				}
				this.running = !this.running;
			}
		}
	});
})();
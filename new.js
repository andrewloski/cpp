(function(){
	var limit = 0;
	var special = 2 * 2;
	var first = 2 * 2;
	var second = 3 * 2;
	var third = 4 * 2;
	var fourth = 5 * 2;
        var choosed = JSON.parse(localStorage.getItem('choosed')) || {};
        var speed = function(){
            return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
        };
        var getKey = function(item){
            return item.name + '-' + item.phone;
        };
        var createHTML = function(){
            var html = [ '<ul>' ];
            allmember.forEach(function(item, index){
                item.index = index;
                var key = getKey(item);
                var color = choosed[key] ? 'yellow' : 'white';
                html.push('<li><a href="#" style="color: ' + color + ';">' + item.name + '</a></li>');
            });
            html.push('</ul>');
            return html.join('');
        };
        var lottery = function(limit){
            var list = canvas.getElementsByTagName('a');
            var color = 'yellow';
            var ret = member
                .filter(function(m, index){
                    m.index = index;
                    return !choosed[getKey(m)];
                })
                .map(function(m){
                    return Object.assign({
                        score: Math.random()
                    }, m);
                })
                .sort(function(a, b){
                    return a.score - b.score;
                })
                .slice(special, limit + special)
                .map(function(m){
                  choosed[getKey(m)] = 1;
                  list[m.index].style.color = color;
                  return m.name + '<br/>' + m.phone; 
                });
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
                selected: '安慰奖',
                running: false,
                btns: [
                    '特等奖', '一等奖', '二等奖', '三等奖', '安慰奖'
                ]
            },
            mounted () {
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
		    var number = 0;
		    switch(this.selected) {
			case '特等奖':
			    limit = 1; 
			    number = special;
			    if(special > 0) special--;
			    break;
			case '一等奖':
			    limit = 3; 
			    number = first;
			    if(first > 0) first--;
			    break;
			case '二等奖':
		    	    limit = 4; 
			    number = second;
			    if(second > 0) second--; 
			    break;
			case '三等奖':
		    	    limit = 5; 
			    number = third;
			    if(third > 0) third--; 
			    break;
			case '安慰奖':
			    limit = 8; 
			    number = fourth;
			    if(fourth > 0) fourth--; 
			    break;
		    }
		if(number > 0) {
                    if(this.running){
                        TagCanvas.SetSpeed('myCanvas', speed());
                        var ret = lottery(limit);
                        if (ret.length === 0) {
                            $('#result').css('display', 'block').html('<span>已抽完</span>');
                            return
                        }
                        $('#result').css('display', 'block').html('<span>' + ret.join('</span><span>') + '</span>');
                        TagCanvas.Reload('myCanvas');
                        setTimeout(function(){
                            localStorage.setItem(new Date().toString(), JSON.stringify(ret));
                            $('#main').addClass('mask');
                        }, 300);
                    } else {
                        $('#result').css('display', 'none');
                        $('#main').removeClass('mask');
                        TagCanvas.SetSpeed('myCanvas', [5, 1]);
                    }
                    this.running = !this.running;
                } else {
                    $('#result').css('display', 'block').html('<span>' + this.selected + '已抽完</span>');
		    return
		}
		}
            }
        });
    })();

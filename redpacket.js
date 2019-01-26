var redPacket = {
	numredpacket: 50,
	Init:function (){
		for(var i=0;i<redPacket.numredpacket;i++){
			var leftradom = document.body.offsetWidth || 1920;
			var bodyHeight = document.body.offsetHeight || 1000;
			var div = document.createElement('a');
			div.setAttribute('target','_blank');
			div.href = '192.168.122.135';
			var images = document.createElement('img');
			var roateDiv = (Math.random() < 0.5) ? 'redpacketRote':'redpacketRoteF';
			images.src ='//static.588ku.com/comp/activity/commonVip/images/allvip499/allvip499redPacket.png';
			div.className = 'redpack redpack'+i;
			div.style.top = redPacket.GetIntegerRandomNum(-150,-250)+'px';
			div.style.left = redPacket.GetIntegerRandomNum(0,leftradom)+'px';
			div.style.webkitAnimationName ='dropdown';
			div.style.animationName ='dropdown';
			images.className = roateDiv;
			div.appendChild(images);
			div.style.webkitAnimationDuration = redPacket.delayValue(redPacket.GetrandomFloat(5, 9)) + ', ' + redPacket.GetrandomFloat(redPacket.GetrandomFloat(5, 9));
			div.style.animationDuration = redPacket.delayValue(redPacket.GetrandomFloat(5, 9)) + ', ' + redPacket.delayValue(redPacket.GetrandomFloat(5, 9));
			div.style.webkitAnimationDelay = redPacket.delayValue(redPacket.GetrandomFloat(0, 6)) + ', ' + redPacket.delayValue(redPacket.GetrandomFloat(0, 6));
			div.style.animationDelay = redPacket.delayValue(redPacket.GetrandomFloat(0, 6)) + ', ' + redPacket.delayValue(redPacket.GetrandomFloat(0, 6));
			document.getElementById('redpacketBox').appendChild(div);
		}
		var removetime = setTimeout(function(){
			$('#redpacketBox').remove();
			window.clearTimeout(removetime);
		},15000);
	},
	GetIntegerRandomNum:function(Min, Max) {
	    var Range = Max - Min;
	    var Rand = Math.random();
	    return(Min + Math.round(Rand * Range));
	},
	GetrandomFloat: function (Min, Max) { return Min + Math.random() * (Max - Min); },
	delayValue:function (value) { return value + 's'; }
};


(function(){
	$('body').on('mouseover','.redpack',function(){
		$(this).addClass('pause');
	}).on('mouseout','.redpack',function(){
		$(this).removeClass('pause');
	});
})();

function chatroom() {
	var name = $('#Name').val();
	var room = $('#Room').val();
	link = window.location.href;
	link = link.replace("/chat","");
	window.location.href = link+'?info='+name+'@#$'+room;
}


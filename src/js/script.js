(() => {
	console.log('script');

	var tabLinks = document.getElementsByClassName("tab--button");
	var anchorLink = document.getElementsByClassName("anchor--link");

	var anchorAnimation = function() {

		var top=0

		var getTop = (elem) => {

			while(elem) {
				top = top + parseFloat(elem.offsetTop)
				elem = elem.offsetParent
			}

			return top
		}

		window.scroll(0, getTop(document.getElementById('anchor-marker')))
	}

	var tabFunc = function(obj) {

		var tabContent = document.getElementsByClassName('tabs--content')

		for (var i = tabContent.length - 1; i >= 0; i--) {
			tabContent[i].className = tabContent[i].className.replace(" tabs--content__active", "")
		}

		document.getElementById(obj.getAttribute('data')).className += " tabs--content__active"

		for (var i = tabLinks.length - 1; i >= 0; i--) {
			tabLinks[i].className = tabLinks[i].className.replace(" tab--button__active", "")
			if (tabLinks[i].getAttribute('data') == obj.getAttribute('data')) {
				tabLinks[i].className += " tab--button__active"
			}
		}
	}

	for (var i = tabLinks.length - 1; i >= 0; i--) {
		tabLinks[i].onclick = (function(){
			tabFunc(this)
		})
	}

	for (var i = anchorLink.length - 1; i >= 0; i--) {
		anchorLink[i].onclick = (function(){
			tabFunc(this)
			anchorAnimation()
		})
	}
})()
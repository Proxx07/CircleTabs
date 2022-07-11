document.addEventListener('DOMContentLoaded', function(){
	
	let		circleTab = document.querySelector('.circle-tab'),
			dotsWrapper = circleTab.querySelector('.circle-tab__navigation-dots'),
			navigation = circleTab.querySelector('.nav-list-js'),
			navigationItems = navigation.querySelectorAll('.list-item-js'),
			dotsCount = 6,
			itemsCount = navigationItems.length,
			textBody = circleTab.querySelector('.text-body-js'),
			textBodyWidth = textBody.clientWidth;
			
	const	radius = Math.round(navigation.clientWidth / 2),
			sectorDegree = 100,
			sectorDegreeStart = sectorDegree / -2,
			itemDegree = dotsCount % 2 ? sectorDegree / dotsCount : sectorDegree / (dotsCount - 1),

			itemDegreeValue = itemDegree.toFixed(2),
			
			animationsDuration = 1500;
	
	
	dotsWrapper.style.setProperty('--radius', `-${radius + 5.5}px`)
	
	navigationItems.forEach(function(item, index){
		item.dataset.index = index;
		
		item.dataset.constIndex = index;
		
		item.style.setProperty('--order', index)
		
		if (index == 0) {
			item.classList.add('navigation-item--active')
			
			let itemContent = item.querySelector('.navigation-item__body').innerHTML;
			
			textBody.innerHTML = itemContent;
		}
		
		let rotateValue = sectorDegreeStart + index * itemDegreeValue;
		
		dotsWrapper.insertAdjacentHTML('beforeend', `<div class="dot" data-index="${index}" data-rotate="${rotateValue}" style="--rotate: ${rotateValue}deg"></div>`);
		
		if (index >= 6) {
			item.classList.add('hidden-item')
		}
		
		let itemBody = item.querySelector('.navigation-item__body'),
			bodyList = itemBody.querySelector('.text-list-js');
			
			item.style.display			= 'flex'
			
			itemBody.style.position		= 'fixed'
			itemBody.style.visibility	= 'hidden'
			itemBody.style.display		= 'block'
			itemBody.style.width		= `${textBodyWidth}px`
			
			setTimeout(function(){
				item.dataset.height = `${bodyList.offsetHeight}px`
				item.removeAttribute('style')
				if (index == 0) {
					textBody.style.setProperty('--h', `${item.dataset.height}`)
				}
			}, 100)
			
			setTimeout(function(){
				itemBody.removeAttribute('style')
			}, 150)
	});
	
	let dots = dotsWrapper.querySelectorAll('.dot');
	
	navigationItems.forEach(function(item, index){
		
		item.addEventListener('click', function(){
			
			navigation.classList.add('disabled');
			
			let itemContent = item.querySelector('.navigation-item__body').innerHTML;
			
			textBody.style.setProperty('--h', `${item.dataset.height}`)
			textBody.innerHTML = itemContent;
			
			let fadingDots = [],
				movingDots = [];
			
			
			let dataIndex = +item.dataset.index,
				constIndex = +item.dataset.constIndex;
			
			let maxIndex = itemsCount - 1;
			
			setTimeout(function(){
				navigation.querySelector('.navigation-item--active').classList.remove('navigation-item--active')
				
				for (let i=0; i < itemsCount; i++) {
					
					let el = navigationItems[i],
						elDatatIndex = +el.dataset.index,
						elConstIndex = +el.dataset.constIndex;
						
					if (elConstIndex >= constIndex) {
						
						let itemDifference = elConstIndex - constIndex;
						
						el.style.setProperty('--order', `${itemDifference}`)
						el.dataset.index = itemDifference
						
						if (elConstIndex == constIndex) {
							el.classList.add('navigation-item--active')
						}
						
						if (itemDifference >= 6) {
							el.classList.add('hidden-item')
						} else {
							el.classList.remove('hidden-item')
						}
						
						
					} else {
						let itemDifference = (maxIndex - constIndex) + (elConstIndex + 1);
						
						el.style.setProperty('--order', `${itemDifference}`)
						el.dataset.index = itemDifference
						
						if (itemDifference >= 6) {
							el.classList.add('hidden-item')
						} else {
							el.classList.remove('hidden-item')
						}
					}
				}
			}, 500);
			
			for (let i=0; i < itemsCount; i++) {
				if (i < dataIndex) {
					dots[i].classList.add('animating')
					dots[i].classList.add('fading')
					fadingDots.push(dots[i])
				} else {
					dots[i].classList.add('animating')
					movingDots.push(dots[i])
				}
			}
			
			fadingDots.forEach(function(dot){
				let	rotation = -360 - dot.dataset.rotate;
				
				dot.dataset.rotate = rotation
				
				dot.style.setProperty('--rotate', `${rotation}deg`);
				
				setTimeout(function(){
					dot.classList.remove('animating')
					dot.classList.remove('fading')
				}, animationsDuration)
				
			});
			
			movingDots.forEach(function(dot){
				let	rotation = +dot.dataset.rotate - (itemDegreeValue * dataIndex);
				
				dot.dataset.rotate = rotation
				
				dot.style.setProperty('--rotate', `${rotation}deg`);
				
				setTimeout(function(){
					dot.classList.remove('animating')
				}, animationsDuration)
			});
			
			setTimeout(function(){
				dots.forEach(function(dot, index){
					let rotateValue = sectorDegreeStart + index * itemDegreeValue;
					
					dot.dataset.index = index
					dot.dataset.rotate = rotateValue
					
					dot.style.setProperty('--rotate', `${rotateValue}deg`)
				});
				
				navigation.classList.remove('disabled');
				
			}, animationsDuration+1)
		});
	});
	
});
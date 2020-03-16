Zepto(function($) {
	$.ajax({
		url: 'js/data.json',
		method: 'get',
		success: (res) => {
			let seller = res.seller
			let goods = res.goods
			let rating = res.ratings
			let result = changeStar(seller.score)
			let result2 = changeStar(4.0)
			let minPrice = seller.minPrice // 最低配送费
			let imgData = res.seller.pics
			let infos = res.seller.infos
			$.each(imgData, function(index, item) {
				$(`<img src='${item}'/>`).appendTo('.goods-img .img')
			});
			$.each(infos, function(index, item) {
				$(`<li>${item}</li>`).appendTo('.goods-message ul')
			})
			let supportArr = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			$.each(seller.supports, function(index, item) {
				let li = $('<li class="support-item"></li>')
				li.html(
					`
					<div class="support-icon icon-1 ${supportArr[item.type]}"></div>
					<div class="text">${item.description}</div>
				`
				).appendTo('.supports')
			})

			$(`<div>${seller.bulletin}</div>`).appendTo('.bulletin')
			$.each(seller.supports, function(index, item) {
				let li = $('<li></li>')
				li.html(
					`
					<div class="support-icon icon-1 ${supportArr[item.type]}"></div>
					<div class="text">${item.description}</div>
				`
				).appendTo('.public-content ul')
			})
			$(".title h2").html(seller.name)
			$(".adiv").html(seller.bulletin)
			$.each(result, function(index, item) {
				$(`<div class='star-item ${item}'></div>`).appendTo('.header-detail .star-wrapper')
			})
			$.each(result2, function(index, item) {
				$(`<div class='star-item ${item}'></div>`).appendTo('.star')
			})
			$(
				`<div class="header-wrapper">
				<div class="avatar">
					<img src=${seller.avatar} alt="">
				</div>
				<div class="seller-content">
					<div class="title">
						<div class="brand">
						</div>
						<div class="name">${seller.name}</div>
					</div>	
					<div class="description">
						${seller.description}
					</div>
					<div class="support">
						<span class="support-icon icon-1 ${supportArr[seller.supports[0].type]}"></span>
						<div class="text">${seller.supports[0].description}</div>
					</div>
					<div class="more">
						<span class="text">${seller.supports.length}个</span>
						<span class="icon-keyboard_arrow_right"></span>
					</div>
				</div>
			</div>
			<div class="bulletin-wrapper">
				<div class="bulletin"></div>
				<div class="text">${seller.bulletin}</div>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
			<div class="bg-img">
				<img src=${seller.avatar} alt="">
			</div>`
			).appendTo('.header')

			// tab切换 原生js
//			let itemWidth = $(".tab-contents .item").width();
//			let lineWidth = $(".tab-btns .active-line").width();
//			let prevL = 0;
//			let l = 0;
//			let disX = 0,
//				disY = 0,
//				endX = 0,
//				endY = 0
//			$(window).resize(function() {
//				itemWidth = $(".tab-contents .item").width()
//				lineWidth = $(".tab-btns .active-line").width()
//			})
//			$(".tab-item").tap(function() {
//				let index = $(this).index()
//				translate(index)
//			})
//
//			// 拖动盒子的移动
//			$('.tab-contents')[0].ontouchstart = function(e) {
//				disX = e.touches[0].clientX
//				disY = e.touches[0].clientY
//
//				// 获取按下的坐标
//				l = 0;
//				this.ontouchmove = function(e) {
//					l = e.touches[0].clientX - disX
//					// 按下的坐标减去无关距离之和得到移动的距离
//					if(prevL + l >= 0) {
//						prevL = 0
//						return false;
//					}
//					if(prevL + l <= -2 * itemWidth) {
//						prevL = -2 * itemWidth
//						return false;
//					}
//					// 判断第一个滑块和最后一个滑块禁止左滑和右滑
//					$(this).animate({
//						translateX: (prevL + l) + 'px'
//					})
//					$(".active-line").animate({
//						translateX: (-(lineWidth * (prevL + l) / itemWidth)) + 'px'
//					})
//				}
//				this.ontouchend = function(e) {
//
//					endX = e.changedTouches[0].clientX;
//					endY = e.changedTouches[0].clientY;
//					let moveX = endX - disX
//					let moveY = endY - disY
//					if(Math.abs(moveX) > 60 || Math.abs(moveY) > 60) { //判断是滑动，不是点击
//						if(Math.abs(moveX) < Math.abs(moveY)) {
//							/*判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下*/
//							return false;
//						} else {
//							prevL += l // 抬起的时候纪录上次滑动的距离
//							// 确定松开的时候是左滑（l < 0）还是右滑(l > 0)，让其到对应的块
//							if(l < 0) {
//								if(prevL >= -itemWidth && prevL <= 0 || prevL <= -2 * itemWidth) {
//									translate(1)
//								} else if(prevL >= 2 * -itemWidth && prevL <= -itemWidth) {
//									translate(2)
//								}
//							} else if(l > 0) {
//								if(prevL >= -2 * itemWidth && prevL <= -itemWidth || prevL > 0) {
//									translate(1)
//								} else if(prevL >= -itemWidth && prevL <= 0) {
//									translate(0)
//								}
//							}
//						}
//					}
//				}
//			}
			// swiper实现tab切换
				var tabSwiper = new Swiper(".swiper-container",{
					on:{
						transitionEnd:function (){
							let index = this.activeIndex // 当前滑动块的下标
							$('.tab-item').eq(index).addClass('active').siblings().removeClass('active')
							$(".tab-btns .active-line").animate({
								translateX:index * lineWidth + 'px'
							},300,"linear")
						},
						sliderMove:function (){
							let posx = this.getTranslate();// 滑块的实时位置
							// 控制线的移动距离
							$(".tab-btns .active-line").animate({
								translateX:- rate * posx + 'px'
							},300,"linear")
						}
					}
				});
			// 点击按钮控制滑块
				let lineWidth = $(".tab-btns .active-line").width();
				let itemWidth = $(".tab-contents .item").width();
				let rate = lineWidth / itemWidth;
				$(".tab-item").tap(function (){
					let index= $(this).index()
					tabSwiper.slideTo(index,400)
					$(this).addClass('active').siblings().removeClass('active')
					$(".tab-btns .active-line").animate({
						translateX:index * lineWidth + 'px'
					},300,'linear')
				})
			// 评价页面的数据渲染
			all()
			$(".bottom-div input").on('input',function (e){
				if(e.target.checked == true){
					let hasContentArr = []
					rating.forEach(function (item,index){
						if(item.rateType != 2){
							hasContentArr.push(item)
						}
					})
					$(".hascontent").show().siblings().hide()
					$.each(hasContentArr, function(index, item) {
					$(`<div class="rating-sang index-${index}">
								<div class="avatar">
									<img src="${item.avatar}" alt="" />
								</div>
								<div class="rating-desc">
									<ul class="ul-top">
										<li>${item.username}</li>
										<li>${changeNow(item.rateTime)}</li>
									</ul>
									<div class="star-time">
										<div class="star start-24">
											
										</div>
										<p class="time"  style='display:${ item.deliveryTime ? "block" : "none"}'>${item.deliveryTime}分钟送达</p>
									</div>
									<div class="rating-content">
										${item.text}
									</div>
									<div class="rating-name">
										<ul>
											<li class="icon-thumb_up"></li>
											
										</ul>
									</div>
								</div>
							</div>`).appendTo('.hascontent')
							let scoreArr = changeStar(item.score)
						$.each(scoreArr, function(subIndex,subItem) {
							$(`<div class='star-item ${subItem}'></div>`).appendTo('.index-'+index+' .star')
						});
				});
				} else {
					$(".hascontent").html('')
				}
			})
			
			function all(){
				$(".rating-sang").html( '')
						$.each(rating, function(index, item) {
					$(`<div class="rating-sang index-${index}">
								<div class="avatar">
									<img src="${item.avatar}" alt="" />
								</div>
								<div class="rating-desc">
									<ul class="ul-top">
										<li>${item.username}</li>
										<li>${changeNow(item.rateTime)}</li>
									</ul>
									<div class="star-time">
										<div class="star start-24">
											
										</div>
										<p class="time"  style='display:${ item.deliveryTime ? "block" : "none"}'>${item.deliveryTime}分钟送达</p>
									</div>
									<div class="rating-content">
										${item.text}
									</div>
									<div class="rating-name">
										<ul>
											<li class="icon-thumb_up"></li>
										</ul>
									</div>
								</div>
							</div>`).appendTo('.rating-user')
						let scoreArr = changeStar(item.score)
						$.each(scoreArr, function(subIndex,subItem) {
							$(`<div class='star-item ${subItem}'></div>`).appendTo('.index-'+index+' .star')
						});
				});
			}
			$('.top-div ul li:first-child').on('tap', function() {
				$(".all").html(rating.length)
				$(".rating-user").show().siblings().hide()
				all()
			})
			$(".top-div ul li:nth-child(2)").on('tap', function() {
				let goodArr = []
				rating.forEach(function(item, index) {
					if(item.rateType == 0) {
						goodArr.push(item)
					}
				})
				$(".good").html(goodArr.length)
				$(".aaa").show().siblings().hide()
				$.each(goodArr, function(index, item) {
					$(`<div class="rating-sang index-${index}">
								<div class="avatar">
									<img src="${item.avatar}" alt="" />
								</div>
								<div class="rating-desc">
									<ul class="ul-top">
										<li>${item.username}</li>
										<li>${changeNow(item.rateTime)}</li>
									</ul>
									<div class="star-time">
										<div class="star start-24">
											
										</div>
										<p class="time"  style='display:${ item.deliveryTime ? "block" : "none"}'>${item.deliveryTime}分钟送达</p>
									</div>
									<div class="rating-content">
										${item.text}
									</div>
									<div class="rating-name">
										<ul>
											<li class="icon-thumb_up"></li>
											
										</ul>
									</div>
								</div>
							</div>`).appendTo('.aaa')
							let scoreArr = changeStar(item.score)
						$.each(scoreArr, function(subIndex,subItem) {
							$(`<div class='star-item ${subItem}'></div>`).appendTo('.index-'+index+' .star')
						});
				});
			})
			$(".top-div ul li:last-child").on('tap', function() {
				let hedArr = []
				rating.forEach(function(item, index) {
					if(item.rateType == 1) {
						hedArr.push(item)
					}
				})
				$(".bbb").show().siblings().hide()
				$(".top-div ul li .count").html(hedArr.length)
				$.each(hedArr, function(index, item) {
					$(".bbb").html('')
					$(`<div class="rating-sang index-${index}">
								<div class="avatar">
									<img src="${item.avatar}" alt="" />
								</div>
								<div class="rating-desc">
									<ul class="ul-top">
										<li>${item.username}</li>
										<li>${changeNow(item.rateTime)}</li>
									</ul>
									<div class="star-time">
										<div class="star start-24">
											
										</div>
										<p class="time"  style='display:${ item.deliveryTime ? "block" : "none"}'>${item.deliveryTime}分钟送达</p>
									</div>
									<div class="rating-content">
										${item.text}
									</div>
									<div class="rating-name">
										<ul>
											<li class="icon-thumb_up"></li>
											
										</ul>
									</div>
								</div>
							</div>`).appendTo('.bbb')
							let scoreArr = changeStar(item.score)
						$.each(scoreArr, function(subIndex,subItem) {
							$(`<div class='star-item ${subItem}'></div>`).appendTo('.index-'+index+' .star')
						});
				});
			})

			function translate(index) {
				$('.tab-contents').animate({
					translateX: -index * itemWidth + 'px'
				})
				$(".active-line").animate({
					translateX: index * lineWidth + 'px'
				})
				prevL = -index * itemWidth
				$('.tab-item').eq(index).addClass('active').siblings().removeClass('active')
			}
			getTotal()
			// 购物车的数据
			var cartData = JSON.parse(localStorage.getItem('cart')) || [];
			
			// 清空按钮
			$(".top li:nth-child(2)").on('tap', function() {
				if(confirm('确定要请空购物车么')) {
					cartData = []
					localStorage.setItem('cart', JSON.stringify(cartData))
					$(".shopdetail").hide()
					$(".ctrl-wrapper .ctrl-cut").hide()
					$(".ctrl-wrapper .ctrl-count").hide()
					$(".totalNum").hide()
					$(".shopcart div").removeClass('heightLight')
					$(".totalPrice").html('￥' + 0)
					$(".pay").removeClass('enough').html('￥20元起送')
				}
			})
			$(document).on('tap', '.shop-num .add-detail', function() {
				flyTocart(this)
				let parents = $(this).parents('.border-bottom-1px')
				let id = parents.attr('data-id')
				let _index = findIndex(id, cartData)
				cartData[_index].count++
				parents.find('.ctrl-count').html(cartData[_index].count);
				localStorage.setItem('cart', JSON.stringify(cartData))
			})
			$(document).on('tap', '.shop-num .remove-detail', function() {
				getTotal()
				let parents = $(this).parents('.border-bottom-1px')
				let id = parents.attr('data-id')
				let _index = findIndex(id, cartData)
				cartData[_index].count <= 1 ? cartData[_index].count = 1 : cartData[_index].count--
				parents.find('.ctrl-count').html(cartData[_index].count);
				localStorage.setItem('cart', JSON.stringify(cartData))
			})
			let shopScroll = new BScroll('.list-wrapper')
			let scroll = new BScroll('.scroll')
			// 商品数据渲染  
			$.each(goods, function(index, item) {
				// 左侧
				$(`<li class="menu-item  border-bottom-1px">
							<div class="text">
								<span class="support-icon icon-3 ${supportArr[item.type]}" style='display:${item.type > 0 ? "block" : "none"};'></span>   ${item.name}
							</div>
						</li>`).appendTo('.menu-list')
				// 右侧
				$(`
						<li class="foods">
							<h2>${item.name}</h2>
							<ul class="food food-${index}">
								
							</ul>
						</li>
					`).appendTo('.foods-list')

				$.each(item.foods, function(subIndex, subItem) {
					let id = subItem.id
					let $index = findIndex(id, cartData)
					$(`<li class="food-item border-bottom-1px" data-id='${subItem.id}'>
							<div class="imgsrc">
								<img src="${subItem.image}"/>
							</div>
							<div class="food-dis">
								<h3 class="foods-name">
									<span>${subItem.name}</span>
								</h3>
								<p class="food-disription" style='display:${subItem.description == '' ? "none" : "block"}'>${subItem.description}</p>
								<p class="extra">
									<span>月售${subItem.sellCount}份</span><span class="food-rating">好评率${subItem.rating}%</span>
								</p>
								<p class="food-price">
									<span class="newPrice">￥${subItem.price}</span>
									<span class="oldPrice" style="display:${subItem.oldPrice ? "inline-block" : "none"}">￥${subItem.oldPrice}</span>
									<div class="ctrl-wrapper">
										<div class="ctrl-cut" style='display:${$index == -1 ? "none" : "inline-block"}'>
											<div class="icon-remove_circle_outline inner"></div>
										</div>
										<div class="ctrl-count" style='display:${$index == -1 ? "none" : "inline-block"}'>${cartData[$index] ? cartData[$index].count : ""}
										</div>
										<div class="ctrl-add">
											<span class="icon-add_circle"></span>
										</div>
									</div>
								</p>
							</div>
						</li>`).appendTo('.food-' + index)
				});
			});
			// 点击跳到详情
			$(".imgsrc img").on('tap', function() {
				let id = $(this).parents('.food-item').attr('data-id')
				location.href = 'detail.html?id=' + id
			})
			// 初始化

			let menuScroll = new BScroll('.menu-wrapper')
			let foodScroll = new BScroll('.foods-wrapper', {
				probeType: 2,
				scrollY: true,
				directionbLockThreshold:0
			})

			$(".menu-wrapper .menu-item").eq(0).addClass('current')
			$(document).on('tap', '.menu-wrapper .menu-item', function() {
				$(this).addClass('current').siblings().removeClass('current')

				let index = $(this).index()
				let el = $(".foods-wrapper .foods")[index]
				// 获取对应的元素，点击对应的li滚动到对应的位置
				foodScroll.scrollToElement(el, 600)
			})
			let scollEl = $(".foods-wrapper .foods")
			let item = 0
			let heightArr = [0]
			scollEl.forEach(itemCurrent => {
				item += itemCurrent.offsetHeight
				heightArr.push(item)
			})
//						console.log(heightArr)
			// 获取每一个foods的高度，push到一个数组中
			foodScroll.on('scroll', res => {
				let scrollY = Math.abs(Math.round(res.y))
				$(".menu-wrapper .menu-item").eq(getIndex(scrollY, heightArr)).addClass('current').siblings().removeClass('current')
			})
			// 加按钮的操作
			getTotal()
			// 设置开关纪录小球是否在飞的过程中
			let isFlying = false
			
			$(document).on('tap', '.ctrl-add', function() {
				// 判断小球处于飞的过程中，那么加按钮 禁止点击
				if(isFlying){
					return;
				}
				// 获取父级自定义的id
				let parents = $(this).parents('.food-item')
				let name = parents.find('.foods-name span').html()
				let price = parents.find('.newPrice').html()
				let id = parents.attr('data-id')
				let _index = findIndex(id, cartData) // 返回的下标是-1代表之前没有该商品
				if(_index < 0) {
					parents.find('.ctrl-wrapper').addClass('animate')
					parents.find('.ctrl-count').html(1)
					let obj = {
						id,
						name,
						price,
						count: 1
					}
					cartData.push(obj)
				} else {
						cartData[_index].count++
						parents.find('.ctrl-count').html(cartData[_index].count);
				}
				// 更新缓存
				localStorage.setItem('cart', JSON.stringify(cartData))
				flyTocart(this)
			})
			// 减按钮的操作
			$(document).on('tap', '.ctrl-cut', function() {
				getTotal()
				let id = $(this).parents('.food-item').attr('data-id')
				let Cutindex = findIndex(id, cartData)
				cartData[Cutindex].count--
					if(cartData[Cutindex].count < 1) {
						$(this).parents('.food-item').find('.ctrl-wrapper').removeClass('animate')
						$(this).parents('.food-item').find('.ctrl-cut').hide()
						$(this).parents('.food-item').find('.ctrl-count').hide()
						cartData.splice(Cutindex, 1)
					} else {
						getTotal()
						$(this).parents('.food-item').find('.ctrl-count').html(cartData[Cutindex].count);
					}

				localStorage.setItem('cart', JSON.stringify(cartData))
				getTotal()
			})

			// 计算总数和总价的函数封装
			function getTotal() {
				let cart = JSON.parse(localStorage.getItem('cart')) || []
				let totalNum = 0;
				let totalPrice = 0;
				for(let i = 0; i < cart.length; i++) {
					totalNum += cart[i].count
					totalPrice += cart[i].price.split('￥')[1] * cart[i].count
				}
				$(".shop-wrapper .totalNum").css({
					display: totalNum > 0 ? "block" : "none"
				}).html(totalNum)
				if(totalNum > 0) {
					$(".shopcart .logo").addClass('heightLight')
					$(".shopcart .totalPrice").addClass('heightLight').html('￥' + totalPrice)
				} else {
					$(".shopcart .logo").removeClass('heightLight')
					$(".shopcart .totalPrice").removeClass('heightLight').html('￥' + 0)
				}
				if(totalPrice > 0) {
					if(totalPrice >= minPrice) {
						$(".shopcart .pay").addClass('enough').html('去结算')
					} else {
						$(".shopcart .pay").removeClass('enough').html(`还差￥${minPrice - totalPrice}元起送`)
					}
				} else {
					$(".shopcart .pay").html(`￥${minPrice}元起送`)
				}
				addcart()
			}
			function addcart(){
				if(cartData){
						$(".shop-foods").html('')
						$.each(cartData, function(index, item) {
						$(`<li class="border-bottom-1px" data-id='${item.id}'>
								<div class="name">
									${item.name}
								</div>
								<div class="price-shop">
									<span class="price">${item.price}</span>
									<div class="shop-num">
										<span class="icon-remove_circle_outline remove-detail"></span>
										<span class="ctrl-count ">${item.count}</span>
										<span class="icon-add_circle add-detail"></span>
									</div>
								</div>
							</li>`).appendTo('.shop-foods')
					});
				}
			}
			function flyTocart(obj){
				// obj当前点击的加按钮
				/*
				 	1. 找当前按钮的位置
				 	
				 * */
				isFlying = true
			
				$(".ball-wrapper").removeClass('animate')
				let winH = $(window).height()
				let x = $(obj).offset().left - 32;
				let y = winH - $(obj).offset().top - 22;
				let str = ''
				str = `
					@keyframes ballX{
							from{
								transform: translate3d(${x}px,0,0);
							}
							to{
								transform: translate3d(0,0,0);
							}
					}
						@keyframes ballY{
							from{  
								transform: translate3d(0,-${y}px,0);
							}
							to{
								transform: translate3d(0,0,0);
							}
						}`
				$('.style').html(str)
				$(".ball-wrapper").show()
				$(".ball-wrapper").addClass('animate')
				setTimeout(function (){
					$(".ball-wrapper").hide()
					isFlying = false
					getTotal()
				},500)
			}
		}
	})
	$(".header").on('tap', '.more .text', function(e) {
		$(".header-detail").show()
		$(".detail-close").tap(function() {
			$(".header-detail").hide()
		})
	})
	$(".logo").click(function() {
		var cartData = JSON.parse(localStorage.getItem('cart')) || [];
		if(cartData == '') {
			alert('暂时还没有商品哦！')
		} else {
			$(".shopdetail").toggle()
		}
	})
	
})
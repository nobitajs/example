const grab = require('./grab');
const Iconv = require('iconv-lite');
const base64decode = require('./base64decode');
const fetch = require('node-fetch');
// https://www.manhuaren.com/
// http://mangabz.com/m${id}
// https://www.soman.com/comic.html?comicname=%E5%A4%A9%E4%B8%8A%E5%A4%A9%E4%B8%8B&source=Xmanhua


const urls = [
	["https://www.xmanhua.com/m26658/", '第一话'],
]
grab(urls, {
	name: '天上天下'
}, (res) => {
	const text = res.split('eval(')[1].split(')\n')[0];
	eval('global.func = ' + text);
	eval(global.func);
	return [
		newImgs
	];
})

// const urls = [
// 	["https://www.77mh.cc/201803/382524.html", '第一话'],
// 	["https://www.77mh.cc/201803/382524.html", '第二话'],
// 	["https://www.77mh.cc/201803/382524.html", '第三话'],
// ]
// grab(urls, {
// 	name: '啊啊啊'
// }, (res) => {
// 	const text = res.split('eval(')[1].split(')\n')[0];
// 	eval('global.func = ' + text);
// 	eval(global.func);
// 	return [
// 		msg.split("|").map(src => (`https://a16c.gdbyhtl.net:64443/h53/${src}.webp`))
// 	];
// })



// const urls = [
// 	"http://m.pufei.org/manhua/419/768851.html",
// 	"http://m.pufei.org/manhua/419/768851.html",
// 	"http://m.pufei.org/manhua/419/768851.html",
// ]
// grab(urls, {
// 	name: '啊啊啊',
// 	imageHost: 'http://res.img.scbrxhwl.com/',
// 	encoding: null,
// }, (res) => {
// 	const text = Iconv.decode(res, 'gb2312');
// 	const cp = text.split('cp="')[1].split('";')[0];
// 	const title = text.split('<a href="/manhua/419/">一人之下</a>')[1].split('</h1>')[0].replace('?', '');
// 	const newImgs = eval(eval(base64decode(cp).slice(4)));
// 	return [newImgs, title];
// })

// const urls = [
// 	["http://m.ikkdm.com/comiclist/3007/77871/{index}.htm", '111'],
// 	["http://m.ikkdm.com/comiclist/3007/77872/{index}.htm", '222'],
// ]
// grab(urls, {
// 	name: '不不不',
// 	imageHost: 'https://tu.kukudm.com/',
// 	encoding: null,
// 	async beforeFunction(item){
// 		const arr = [];
//         let index = 1;
//         let total = 2;
// 		while(index <= total){
// 			const host = item.url.replace('{index}', index);
// 			const res = await fetch(host, {
// 				method: 'get',
// 				timeout: 5000,
// 				headers: {
// 					"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.3 Mobile/15E148 Safari/604.1",
// 				}
// 			})
// 			.then(async (res) => (await res.buffer()))
// 			.catch(e => {
// 				console.log('请求超时', host, e)
// 				return null
// 			});

// 			if(res){
// 				text = Iconv.decode(res, 'gb2312');
//                 total = text.match(/<li>\d+\/\d+/)[0].split('/')[1];
//                 const img = text.split(`IMG SRC='"+m2007+"`)[1].split(`'></a>`)[0];
//                 arr.push(encodeURI(img))
// 				index++;
//             }else{
//                 console.log('请求超时', host)
//             }
// 		}

// 		return arr;
// 	}
// }, res => [res])
function getConfig(){

	const _ds = $('meta[data-sever]')

	const _sever = _ds.attr('data-sever');
	const _apisever = _ds.attr('data-apisever');

	let severURL = _ds.length > 0 && _sever != '' ? _sever : window.location.hostname 

	console.log(_ds,_sever,_apisever)

	let config = {

		domain : severURL,
		
		fetchOption:{

			_uri: 'https://erich-t.blockcode.com.tw/api/graphql',
			_method:'POST',
			_headers:{
				'Content-Type': 'application/json'
			}

		}

	}

	//console.log( "config=", config )
	
	return config

}
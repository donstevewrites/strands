exports.textToSentenceCase = (text) =>{
    let newText = text.charAt(0).toUpperCase() + text.slice(1, text.length);
    return newText;
}

exports.convertMongooseData = (data)=> {
	let arrayData = [...data];
	
		let newData = data.map( (arr) => {
	 		return arr;
	 	});
	 

	 return newData;
}
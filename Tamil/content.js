var to = "T";
var status = "nok";

var kCount = 0;
var tCount = 0;
var dCount = 0;
var telcount = 0;
var bcount = 0;
var gcount = 0;
var mcount = 0;
var ocount = 0; 
var pcount = 0;

var San2Tam = {
	'अ':'அ', 'आ':'ஆ', 'इ':'இ', 'ई':'ஈ', 'उ':'உ', 'ऊ	':'ஊ', 'ए':'ஏ', 'ऐ':'ஐ', 'ओ':'ஓ', 'औ':'ஔ',
	'ः':'ஃ','क':'க','ख':'<b>க</b>', 'ग':'க',	'घ':'<b>க</b>', 'ङ':'ங', 'च':'ச', 'छ':'<b>ச</b>', 'झ':'<b>ச</b>',
	'ञ':'ஞ','ट':'ட','ठ':'<b>ட</b>','ड':'ட'	, 'ढ':'<b>ட</b>', 'ण':'ண', 'त':'த','थ':'<b>த</b>','द':'த','ध':'<b>த</b>',
	'न':'ந', 'प':'ப','फ':'<b>ப</b>','ब':'ப', 'भ':'<b>ப</b>','म':'ம', 'य':'ய','र':'ர', 'ल':'ல','व':'வ', 'ळ':'ழ', 'ज':'ஜ', 
	'श':'ஶ','ष':'ஷ', 'स':'ஸ', 'ह':'ஹ','क्ष':'க்ஷ','श्री':'ஸ்ரீ','ा':'ா','ि':'ி','ी':'ீ','ु':'ு','ू':'ூ',
	'े':'ே', 'ै':'ை','ो':'ோ','ौ':'ௌ','्':'்','ं':'ம்', 'ृ':'ிரு'
};

var HalfConsonants = {
	'ा':true,'ि':true,'ी':true,'ु':true,'ू':true,'े':true,'ै':true,'ो':true,'ौ':true,
	'्':true,'ं':true, 'ृ':true	
}

var MahaPrana = {
	'ख':true,'घ':true,'छ':true,'झ':true,'ठ':true,'ढ':true,'थ':true,'ध':true,'फ':true,'भ':true
}

function transliterate(text) // Transliteration function
{
	var prana = false
	if((from == "D") && (to == "T"))
	{
		SaveText = ''
		for(var i=0;i<text.length;i++){
			cur = text.charAt(i)
			if(cur in HalfConsonants && prana == true){
				SaveText = SaveText.replace(/<\/b>$/,"்</b>");
				prana = false
			}

			else if(!(cur in San2Tam)){
				SaveText += cur
				prana = false
			}

			else{
				prana = false
				if(cur in MahaPrana)
					prana = true
				SaveText += San2Tam[cur];
			}
		}
		return SaveText;	
	}
	else
	{
		alert("Not Supported");
		return text;
	}
}

function intelliSense()
{
	var doc = document.getElementsByTagName('html');
	var docText = doc[0].innerHTML;

	var arr = docText.split(/[^\u0C80-\u0CF2\u0B82-\u0BFA\u0900-\u097F\u0C00-\u0C7F\u0D01-\u0D7F\u0A80-\u0AFF\u0980-\u09FF\u0B00-\u0B7F\u0A00-\u0A7F]+/g);

	var tpatt = new RegExp(/[\u0B82-\u0BFA]+/g);
	var kpatt = new RegExp(/[\u0C80-\u0CF2]+/g);
	var dpatt = new RegExp(/[\u0900-\u097F]+/g);
	var telpatt = new RegExp(/[\u0C00-\u0C7F]+/g);
	var mpatt = new RegExp(/[\u0D01-\u0D7F]+/g);
	var gpatt = new RegExp(/[\u0A80-\u0AFF]+/g);
	var bpatt = new RegExp(/[\u0980-\u09FF]+/g);
	var opatt = new RegExp(/[\u0B00-\u0B7F]+/g);
	var ppatt = new RegExp(/[\u0A00-\u0A7F]+/g);

	for(var i = 0; i < arr.length; i++)
	{
		if(kpatt.test(arr[i]) == true)
		{
			kCount++;
		}
		else if(mpatt.test(arr[i]) == true)
		{
			mcount++;
		}
		else if(opatt.test(arr[i]) == true)
		{
			ocount++;
		}
		else if(bpatt.test(arr[i]) == true)
		{
			bcount++;
		}
		else if(tpatt.test(arr[i]) == true)
		{
			tCount++;
		}
		else if(dpatt.test(arr[i]) == true)
		{
			dCount++;
		}
		else if(telpatt.test(arr[i]) == true)
		{
			telcount++;
		}	
		else if(gpatt.test(arr[i]) == true)
		{
			gcount++;
		}
		else if(ppatt.test(arr[i]) == true)
		{
			pcount++;
		}	
	}
	var lArr = ["d", "k", "t", "tel", "m", "g", "b", "o", "p"];
	var vArr = [dCount, kCount, tCount, telcount, mcount, gcount, bcount, ocount, pcount];
	for(var i = 0; i < vArr.length - 1; i++)
	{
		for(var j = i + 1; j < vArr.length; j++)
		{
			if(vArr[i] < vArr[j])
			{
				var temp = vArr[i];
				vArr[i] = vArr[j];
				vArr[j] = temp;
				temp = lArr[i];
				lArr[i] = lArr[j];
				lArr[j] = temp; 
			}
		}
	}
	console.log(lArr);
	console.log(vArr);
	

	if(lArr[0] == "t")
	{
		chrome.runtime.sendMessage('tamMajority', function(response)
		{
			console.log("Content to Background: Tamil Words Majority. Response: " + response);
		});
		from = "T";
	}
	else if(lArr[0] == "k")
	{
		chrome.runtime.sendMessage('kanMajority', function(response)
		{
			console.log("Content to Background: Kannada Words Majority. Response: " + response);
		});
		from = "K";
	}
	else if(lArr[0] == "p")
	{
		chrome.runtime.sendMessage('punMajority', function(response)
		{
			console.log("Content to Background: Punjabi Words Majority. Response: " + response);
		});
		from = "P";
	}
	else if(lArr[0] == "o")
	{
		chrome.runtime.sendMessage('oriMajority', function(response)
		{
			console.log("Content to Background: Oriya Words Majority. Response: " + response);
		});
		from = "O";
	}
	else if(lArr[0] == "b")
	{
		chrome.runtime.sendMessage('benMajority', function(response)
		{
			console.log("Content to Background: Bengali Words Majority. Response: " + response);
		});
		from = "B";
	}
	else if(lArr[0] == "g")
	{
		chrome.runtime.sendMessage('gujMajority', function(response)
		{
			console.log("Content to Background: Gujarati Words Majority. Response: " + response);
		});
		from = "G";
	}
	else if(lArr[0] == "d")
	{
		chrome.runtime.sendMessage('devMajority', function(response)
		{
			console.log("Content to Background: Devnagari Words Majority. Response: " + response);
		});
		from = "D";
	}
	else if(lArr[0] == "tel")
	{
		chrome.runtime.sendMessage('telMajority', function(response)
		{
			console.log("Content to Background: Telugu Words Majority. Response: " + response);
		});
		from = "TEL";
	}
	else if(lArr[0] == "m")
	{
		chrome.runtime.sendMessage('malMajority', function(response)
		{
			console.log("Content to Background: Malayalam Words Majority. Response: " + response);
		});
		from = "M";
	}
}

intelliSense();

chrome.runtime.sendMessage('transliterate', function(response) // Should the page be transliterated?
{
    console.log("Content to Background: Transliterate?. Response: " + response);
    var arr = response.split("_");
    status = arr[0];
    if(status == "ok") // proceed to transliterate
    {
        var transliteratedText = "";
        var body = document.getElementsByTagName('html');
        var fullText = body[0].innerHTML;
        var indicArray;
        var nonindicArray;
        if(from == "K")
        {
            indicArray = fullText.split(/[^\u0C80-\u0CF2]+/g);
            nonindicArray = fullText.split(/[\u0C80-\u0CF2]+/g);
        }
        else if(from == "T")
        {
            indicArray = fullText.split(/[^\u0B82-\u0BFA]+/g);
            nonindicArray = fullText.split(/[\u0B82-\u0BFA]+/g);    
        }
        else if(from == "D")
        {
        	indicArray = fullText.split(/[^\u0900-\u097F]+/g);
            nonindicArray = fullText.split(/[\u0900-\u097F]+/g);
        }
        else if(from == "TEL")
        {
        	indicArray = fullText.split(/[^\u0C00-\u0C7F]+/g);
            nonindicArray = fullText.split(/[\u0C00-\u0C7F]+/g);
        }
        else if(from == "M")
        {
        	indicArray = fullText.split(/[^\u0D01-\u0D7F]+/g);
            nonindicArray = fullText.split(/[\u0D01-\u0D7F]+/g);
        }
        else if(from == "G")
        {
        	indicArray = fullText.split(/[^\u0A80-\u0AFF]+/g);
            nonindicArray = fullText.split(/[\u0A80-\u0AFF]+/g);
        }
        else if(from == "B")
        {
        	indicArray = fullText.split(/[^\u0980-\u09F3]+/g);
            nonindicArray = fullText.split(/[\u0980-\u09FF]+/g);
        }
        else if(from == "O")
        {
        	indicArray = fullText.split(/[^\u0B00-\u0B7F]+/g);
            nonindicArray = fullText.split(/[\u0B00-\u0B7F]+/g);
        }
        else if(from == "P")
        {
        	indicArray = fullText.split(/[^\u0A00-\u0A7F]+/g);
            nonindicArray = fullText.split(/[\u0A00-\u0A7F]+/g);
        }
        for(var i = 0; i < nonindicArray.length; i++)
        {
            transliteratedText += nonindicArray[i];
            if(i < indicArray.length)
                transliteratedText += transliterate(indicArray[i + 1]);
        }
        body[0].innerHTML = transliteratedText;
        chrome.runtime.sendMessage('reset', function(res) // Transliteration done. Reset the transliterate variable
        {
            console.log("Content to Background: Transliteration Done. Reset Please. Response: " + res)
        });
    }
    else
    {
        status = "nok";
    }
});
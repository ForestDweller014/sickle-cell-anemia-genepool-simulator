alleleS = 0;
alleleB = 0;
newAlleleS = 0;
newAlleleB = 0;
offspringNum = 0;
genNum = 0;
inc = 1;
malariaPerc = 0;
type = "";
offspring = [];
unempty = true;
result = "";

function breedPrompt(param) {
    if (param == "real") {
        document.getElementById("breedForm").style.display = "block";
    } 
    else {
        document.getElementById("breedForm").style.display = "none";
    }
}

function createOffspring() {
	for (i = 0; i < offspringNum; i++) {
	    offspring.push({
	        allele1: "null",
	        allele2: "null"
	    });
	    if (Math.random() < alleleS/(alleleB + alleleS)) {
			offspring[i].allele1 = "S";
			if (type == "lab") {
				alleleS = alleleS - 1;
			}
		}
		else {
			offspring[i].allele1 = "B";
			if (type == "lab") {
				alleleB = alleleB - 1;
			}
		}
		if (Math.random() < alleleS/(alleleB + alleleS)) {
			offspring[i].allele2 = "S";
			if (type == "lab") {
				alleleS = alleleS - 1;
			}
		}
		else {
			offspring[i].allele2 = "B";
			if (type == "lab") {
				alleleB = alleleB - 1;
			}
		}
	}
}

function mosquitoBite() {
	if (Math.random() < malariaPerc/100) {
		for (i = 0; i < offspring.length; i++) {
			if ((offspring[i].allele1 == "S" && offspring[i].allele2 == "B") || (offspring[i].allele1 == "B" && offspring[i].allele2 == "S")) {
				newAlleleS = newAlleleS + 1;
				newAlleleB = newAlleleB + 1;
			}
		}
	}
	else {
		for (i = 0; i < offspring.length; i++) {
			if (offspring[i].allele1 == "B" || offspring[i].allele2 == "B") {
				if (offspring[i].allele1 == "S") {
					newAlleleS = newAlleleS + 1;
				}
				else {
					newAlleleB = newAlleleB + 1;
				}
				if (offspring[i].allele2 == "S") {
					newAlleleS = newAlleleS + 1;
				}
				else {
					newAlleleB = newAlleleB + 1;
				}
			}
		}
	}
}

function simulate() {
	alleleS = parseInt(document.getElementById("HbS").value);
	alleleB = parseInt(document.getElementById("HbB").value);
	offspringNum = parseInt(document.getElementById("offspringNum").value);
	genNum = parseInt(document.getElementById("genNum").value) - 1;
	malariaPerc = parseInt(document.getElementById("malariaPerc").value);
	breedNum = parseInt(document.getElementById("breedNum").value);
	var e = document.getElementById("options");
	type = e.options[e.selectedIndex].value;
	if (alleleB + alleleS == 0) {
		result = "Gene pool is empty";
		document.getElementById("result").innerHTML = result;
	}
	else if (offspringNum*2 > alleleS + alleleB) {
		result = "Too few alleles to create offspring";
		document.getElementById("result").innerHTML = result;
	}
	else if (document.getElementById("HbS").value == "" || document.getElementById("HbB").value == "" || document.getElementById("offspringNum").value == "" || document.getElementById("genNum").value == "" || document.getElementById("malariaPerc").value == "" || (breedNum == "" && type == "real")) {
		result = "Fill in all fields";
		document.getElementById("result").innerHTML = result;
	}
	else if (isNaN(alleleS) || isNaN(alleleB) || isNaN(offspringNum) || isNaN(genNum) || isNaN(malariaPerc) || (isNaN(breedNum) && type == "real")) {
		result = "Only number values are allowed";
		document.getElementById("result").innerHTML = result;
	}
	else if ((alleleS + alleleB) % 2 != 0) {
		result = "There are an odd number of alleles in the genepool - each offspring must have 2 alleles";
		document.getElementById("result").innerHTML = result;
	}
	else {
		result = "P1 generation: " + "</br>HbB - " + alleleB + "</br>HbS - " + alleleS + "</br>HbB frequency - " + alleleB/(alleleB + alleleS)*100 + "%</br>HbS frequency - " + alleleS/(alleleB + alleleS)*100 + "%</br>";
		for (r = 0; r < genNum; r++) {
			while (unempty) {
				if (type == "lab") {
					if (alleleS + alleleB - offspringNum*2 <= 0) {
						offspringNum = offspringNum + (alleleS + alleleB - offspringNum*2)/2;
						unempty = false;
					}
				}
				else {
					if (inc == breedNum) {
						unempty = false;
					}
				}
				offspring = [];
				createOffspring();
				mosquitoBite();
				inc++;
			}
			if (newAlleleB + newAlleleS == 0) {
				result = result + "</br>Gene pool is empty";
				genNum = 0;
			}
			else {
				result = result + "</br>F" + (r+1) + " generation: " + "</br>HbB - " + newAlleleB + "</br>HbS - " + newAlleleS + "</br>HbB frequency - " + newAlleleB/(newAlleleB + newAlleleS)*100 + "%</br>HbS frequency - " + newAlleleS/(newAlleleB + newAlleleS)*100 + "%</br>";
			}
			document.getElementById("result").innerHTML = result;
			offspringNum = parseInt(document.getElementById("offspringNum").value);
			alleleS = newAlleleS;
			alleleB = newAlleleB;
			unempty = true;
			inc = 1;
			newAlleleS = 0;
			newAlleleB = 0;
		}
	}
}

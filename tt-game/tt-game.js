window.addEventListener('DOMContentLoaded', function(){
    var tDescription = document.getElementById('travel-description'),
        tDestination = document.getElementById('travel-destination'),
        tCurrentPosition = document.getElementById('travel-current-position'),
        tMovements = document.getElementById('travel-movements'),
        tCommandLine = document.getElementById('command-line'),
        tMap = document.getElementById('country-map'),
        countriesLength = countries.length,
        seasLength = seas.length;
    var randomStartCountry, randomEndCountry, tStartPosition, tDestinationValue, tDescriptionValue, tMove, tCurrentPositionValue, tAllVisitedPlaces, tMapSrc;
    tCommandLine.focus();

    var setRandomCountries = function(){
        randomStartCountry = Math.floor(Math.random()*countriesLength);
        do{
            randomEndCountry = Math.floor(Math.random()*countriesLength);
        }
        while(randomStartCountry == randomEndCountry);
    }

    var setGameStartValues = function(){
        setRandomCountries();
        tStartPosition = countries[randomStartCountry][0],
        tDestinationValue = countries[randomEndCountry][0],
        tDescriptionValue = "Witaj przyjacielu, musisz dostać się do pewnego państwa przekraczając jak najmniejszą ilość granic. Zaczynajmy!<br><br>Twoje obecne położenie: "+tStartPosition+"<br>Twój cel podróży: "+tDestinationValue,
        tMove = 0,
        tCurrentPositionValue = tStartPosition,
        tAllVisitedPlaces = tStartPosition+" -> ",
        tMapSrc = "img/countries/"+countries[randomStartCountry][1]+".svg";
        tDestination.innerHTML = tDestinationValue;
        setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
    }

    var setGameValues = function(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc){
        tDescription.innerHTML = tDescriptionValue;
        tCurrentPosition.innerHTML = tCurrentPositionValue;
        tMovements.innerHTML = tMove;
        tMap.src = tMapSrc;
        tMap.alt = tCurrentPositionValue;
    }

    var makeMove = function(placeToGo){
        var isOk = false,
            needHelp = false;
        if(placeToGo.toLowerCase() == "pomoc"){
            needHelp = true;
            var whereCanYouGo = '';
        }
        for (var i = 0; i < countriesLength; i++) {
            if(countries[i][0] == tCurrentPositionValue){
                var countryLength = countries[i].length;
                for(var j=2; j<countryLength; j++){
                    if(needHelp){
                        whereCanYouGo += countries[i][j]+", ";
                    }
                    if(countries[i][j].toLowerCase() == placeToGo.toLowerCase()){
                        isOk = true;
                        placeToGo = countries[i][j];
                        tAllVisitedPlaces += placeToGo+" -> ";
                        for(var k=0; k<countriesLength; k++){
                            if(countries[k][0] == placeToGo){
                                tMapSrc = "img/countries/"+countries[k][1]+".svg";
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < seasLength; i++) {
            if(seas[i][0].toLowerCase() == placeToGo.toLowerCase()){
                var seaLength = seas[i].length;
                for(var j=1; j<seaLength; j++){
                    if(seas[i][j] == tCurrentPositionValue){
                        isOk = true;
                        placeToGo = seas[i][0];
                        tAllVisitedPlaces += placeToGo+" -> ";
                        tMapSrc = "img/countries/seaPlace.svg";
                    }
                }
            }
        }
        if(isOk){
            tMove +=1;
            tCurrentPositionValue = placeToGo;
            if(tCurrentPositionValue == tDestinationValue){
                tDescriptionValue = "Wspaniale! Dotarłeś do celu!<br>Twoja trasa:<br><br>"+tAllVisitedPlaces.slice(0, -4)+"<br><br>aby rozpocząć nową grę wpisz polecenie: restart";
            }
            else{
                tDescriptionValue = 'Twoja nowa pozycja to: <span class="span_bold">'+tCurrentPositionValue+'</span>';
            }
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
        else if(needHelp){
            tDescriptionValue = "Nie wiesz gdzie się udać? Oto Twoje możliwości:<br><br>"+whereCanYouGo.slice(0,-2);
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
        else{
            tDescriptionValue = 'Nie ma miejsca <span class="span_bold">'+placeToGo+'</span> w okolicy';
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
    }

    var validateString = function(string){
        return true;
    }

    setGameStartValues();

    tCommandLine.addEventListener('keydown', function(e){
        if(e.keyCode == "13"){
            if(validateString(tCommandLine.value)){
                if(tCommandLine.value.trim().toLowerCase() == 'restart'){
                    setGameStartValues();
                }
                else if(tCommandLine.value.trim().toLowerCase() == 'komendy'){
                    tDescriptionValue = 'W każdym momencie gry możesz użyć następujących komend:<br><span class="span_bold">pomoc</span> - wyświetla możliwe ruchy<br><span class="span_bold">restart</span> - restartuje gre losując nowe miejsca<br><span class="span_bold">komendy</span> - pokazuje możliwe komendy';
                    setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
                }
                else makeMove(tCommandLine.value.trim());
            }
            else{
                tDescription.innerHTML = "Nie ma takiego miejsca";
            }
            tCommandLine.value = '';
        }
    });
});

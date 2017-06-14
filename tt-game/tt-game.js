window.addEventListener('DOMContentLoaded', function(){
    var tDescription = document.getElementById('travel-description'),
        tDestination = document.getElementById('travel-destination'),
        tCurrentPosition = document.getElementById('travel-current-position'),
        tMovements = document.getElementById('travel-movements'),
        tCommandLine = document.getElementById('command-line'),
        tMap = document.getElementById('country-map');
    tCommandLine.focus();

    var countriesLength = countries.length,
        randomStartCountry = Math.floor(Math.random()*countriesLength);

    do{  var randomEndCountry = Math.floor(Math.random()*countriesLength);    }
    while(randomStartCountry == randomEndCountry);

    var setGameValues = function(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc){
        tDescription.innerHTML = tDescriptionValue;
        tCurrentPosition.innerHTML = tCurrentPositionValue;
        tMovements.innerHTML = tMove;
        tMap.src = tMapSrc;
        tMap.alt = tCurrentPositionValue;
    }

    var makeMove = function(placeToGo){
        placeToGo = placeToGo.charAt(0).toUpperCase() + placeToGo.toLowerCase().slice(1);
        var isOk = false,
            needHelp = false;
        if(placeToGo.toLowerCase() == "pomoc"){
            needHelp = true;
            var whereCanYouGo = '';
        }
        for (var i = 0; i < countriesLength; i++) {
            if(countries[i][0] == tCurrentPositionValue){
                var countryLength = countries[i].length;
                for(var j=1; j<countryLength; j++){
                    if(needHelp){
                        whereCanYouGo += countries[i][j]+", ";
                    }
                    if(countries[i][j] == placeToGo){
                        isOk = true;
                        tAllVisitedPlaces += placeToGo+" -> ";
                        tMapSrc = "img/countries/"+placeToGo.toLowerCase()+".svg";
                    }
                }
            }
        }
        if(isOk){
            tMove +=1;
            tCurrentPositionValue = placeToGo;
            if(tCurrentPositionValue == tDestinationValue){
                tDescriptionValue = "Wspaniale! Dotarłeś do celu!<br>Twoja trasa:<br><br>"+tAllVisitedPlaces.slice(0, -4);
            }
            else{
                tDescriptionValue = "Dobra robota, Twoja nowa pozycja to: "+tCurrentPositionValue;
            }
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
        else if(needHelp){
            tDescriptionValue = "Nie wiesz gdzie się udać? Oto Twoje możliwości:<br><br>"+whereCanYouGo.slice(0,-2);
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
        else{
            tDescriptionValue = "Nie ma miejsca "+placeToGo+" w okolicy";
            setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);
        }
    }

    var validateString = function(string){
        return true;
    }

    var tStartPosition = countries[randomStartCountry][0],
        tDestinationValue = countries[randomEndCountry][0],
        tDescriptionValue = "Witaj przyjacielu, musisz dostać się do pewnego państwa przekraczając jak najmniejszą ilość granic. Zaczynajmy!<br><br>Twoje obecne położenie: "+tStartPosition+"<br>Twój cel podróży: "+tDestinationValue,
        tMove = 0,
        tCurrentPositionValue = tStartPosition,
        tAllVisitedPlaces = tStartPosition+" -> ",
        tMapSrc = "img/countries/"+tCurrentPositionValue.toLowerCase()+".svg";
    tDestination.innerHTML = tDestinationValue;

    setGameValues(tMove, tCurrentPositionValue, tDescriptionValue, tMapSrc);

    tCommandLine.addEventListener('keydown', function(e){
        if(e.keyCode == "13"){
            if(validateString(tCommandLine.value)){
                makeMove(tCommandLine.value.trim());
            }
            else{
                tDescription.innerHTML = "Nie ma takiego miejsca";
            }
            tCommandLine.value = '';
        }
    });
});

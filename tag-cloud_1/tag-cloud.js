document.addEventListener('DOMContentLoaded', function(){
//lista tagów wraz z popularnością danego tagu
    var tags = [['polityka', 253],
                ['humor', 23],
                ['technologia', 210],
                ['historia', 22],
                ['ciekawostki', 102],
                ['nauka', 88],
                ['ekonomia', 130],
                ['chemia', 110],
                ['sztuka', 10],
                ['muzyka', 243],
                ['teatr', 7],
                ['seriale', 21],
                ['alpaki', 233],
                ['film', 66]
               ];
//lista klas dla poszczególnych tagów od najbardziej popularnego do najmniej popularnego
    var classLevel = ['tag-first', 'tag-second', 'tag-third', 'tag-fourth', 'tag-fifth'];
    var shuffle = function(array){
        var i = 0,
            j = 0,
            temp = null,
            arrayLength = array.length;
        for (i = arrayLength - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    tags.sort(function(a, b){
        return a[1] - b[1];
    })
    classLevel.reverse();
    var classLevelLength = classLevel.length,
        tagsLength = tags.length,
        groups = tagsLength%classLevelLength,
        normalGroups = classLevelLength - groups,
        steps = [];
    if (groups > 0) {
        var groupAmount = (tagsLength+classLevelLength-groups)/classLevelLength,
            normalAmount = groupAmount-1,
            startStep = groupAmount;
        for (var i = 0; i < groups; i++) {
            steps.push(startStep);
            startStep += groupAmount;
        }
        var startStep = steps[steps.length -1]+normalAmount;
    }
    else{
        var normalAmount = tagsLength/classLevelLength,
            startStep = normalAmount;
    }
    for (var i = 0; i < normalGroups; i++) {
        steps.push(startStep);
        startStep += normalAmount;
    }
    var stepsLength = steps.length;
    for(var i=0; i<tagsLength; i++){
        for (var j = 0; j < stepsLength; j++) {
            if(i < steps[j] && tags[i][2] == undefined){
                tags[i][2] = classLevel[j];
            }
        }
    }
    tags = shuffle(tags);
    var container = document.getElementById('tags-container'),
        ul = document.createElement('ul');
    ul.className = 'tag-list';
    container.appendChild(ul);
    for (var i = 0; i < tagsLength; i++) {
        var ulElement = document.createElement('li');
        ul.appendChild(ulElement);
        var tagLink = document.createElement('a');
        tagLink.className = tags[i][2];
        tagLink.innerHTML = tags[i][0];
        tagLink.href = '#';
        ulElement.appendChild(tagLink);
    }

})

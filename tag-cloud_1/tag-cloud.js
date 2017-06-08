document.addEventListener('DOMContentLoaded', function(){
    var tags = [['polityka', 253],
                ['humor', 23],
                ['technologia', 210],
                ['historia', 22],
                ['ciekawostki', 102],
                ['nauka', 88],
                ['ekonomia', 130],
                ['sztuka', 10],
                ['film', 66]
               ];
    tags.sort(function(a, b){
        return a[1] - b[1];
    })
    var classLevel = ['tag-first', 'tag-second', 'tag-third', 'tag-fourth', 'tag-fifth'];
    classLevel.reverse();
    var classLevelLength = classLevel.length;
    var tagsLenght = tags.length;
    var groups = tagsLenght%classLevelLength;
    var groupAmount = (tagsLenght+classLevelLength-groups)/classLevelLength;
    var normalAmount = groupAmount-1;
    var normalGroups = classLevelLength - groups;
    var startStep = groupAmount;
    var steps = [];
    for (var i = 0; i < groups; i++) {
        steps.push(startStep);
        startStep += groupAmount;
    }
    var startStep = steps[steps.length -1]+normalAmount;
    for (var i = 0; i < normalGroups; i++) {
        steps.push(startStep);
        startStep += normalAmount;
    }
    var stepsLength = steps.length;
    console.log(steps[4]);
    console.log(groups);
    console.log(groupAmount);
    for(var i=0; i<tagsLenght; i++){
        for (var j = 0; j < stepsLength; j++) {
            if(i < steps[j] && tags[i][2] == undefined){
                tags[i][2] = classLevel[j];
                console.log(tags[i][0] + tags[i][2]);
            }
        }
    }
    var container = document.getElementById('tags-container');
    
})

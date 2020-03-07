// Javascript document

const sumbitBtn = document.getElementById('add-pc-btn');
const clearBtn = document.getElementById('clear-btn');
//const testBtn = document.getElementById('test-button');
const pcList = document.getElementById('pc-list');
const partyNameBox = document.getElementById('party-name');
const pcMaker = document.getElementById('pc-maker-panel');
const makePcBtn = document.getElementById('make-pc-btn');
const noParty = document.getElementById('no-party');
const yesParty = document.getElementById('yes-party');
const nextMakeFightBtn = document.getElementById('next-make-fight');

//let partyName = window.localStorage.getItem('selected party');
//let party = JSON.parse(window.localStorage.getItem(partyName));
let party = [];

function setUp () {
    partyNameBox.textContent = partyName; 

    let getParty = JSON.parse(window.localStorage.getItem(partyName));

    console.log(`${partyName}: ${party}`);
    if (party != null ) {

        for (let i = 0; i < party.length; i++){
            let memberName = party[i][0];
            writeInPartyMember(memberName);
        }
    }

    if (party.length < 1) {
        noParty.style.display = 'block';
        yesParty.style.display = 'none';
    } else {
        noParty.style.display = 'none';
        yesParty.style.display = 'block';

    }

}


window.onload = setUp ();

function showPcMaker () {
    pcMaker.classList.add('show-pc-maker');
}

function hidePcMaker () {
    pcMaker.classList.remove('show-pc-maker');
}

function addPc(e) {
    e.preventDefault;

    //validate
    let ret = validate();

    if (ret) {
        //document.getElementById('add-pc').submit();
        
        newPcName = document.getElementById('pc-name').value

        //creates OBJECT of party 
        /*
        party.push({
            'pcName': newPcName,
            'pcClass': document.getElementById('pc-class').value,
            'pcLevel': document.getElementById('pc-level').value,
            'pcMaxHP': document.getElementById('pc-maxhp').value,
            'pcInitMod': document.getElementById('pc-init-mod').value,
            'pcAC': document.getElementById('pc-ac').value
        }); */

        // creates simple ARRAY of party stats {this is what is loaded into the initiative tracker}

        party.push([
            newPcName,
            document.getElementById('pc-class').value,
            document.getElementById('pc-level').value,
            document.getElementById('pc-maxhp').value,
            document.getElementById('pc-init-mod').value,
            document.getElementById('pc-ac').value
        ]); 

        noParty.style.display = 'none';

        writeInPartyMember(newPcName);

        
        //reset form & hide it.

        document.getElementById('add-pc-form').reset();
        hidePcMaker();


        //write the party to localStorage
        
        window.localStorage.setItem(partyName, JSON.stringify(party));

    }
   
}

function writeInPartyMember (memberName) {
            
    //make a new li with the name

    let newPc = document.createElement('li'); 
    newPc.className = "name";
    newPc.appendChild(document.createTextNode(memberName));
    pcList.appendChild(newPc);
}

function validate(e){
    return true;
}

function nextMakeFight () {
    window.location = "fight-list.html";
}

function testThis() {
    console.log(party);
}

makePcBtn.addEventListener("click", showPcMaker);
sumbitBtn.addEventListener("click", addPc);

nextMakeFightBtn.addEventListener("click", nextMakeFight );

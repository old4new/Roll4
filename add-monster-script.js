// Javascript document

const sumbitBtn = document.getElementById('add-pc-btn');
const clearBtn = document.getElementById('clear-btn');
const testBtn = document.getElementById('test-button');
const pcList = document.getElementById('pc-list');
const partyNameBox = document.getElementById('party-name');
const pcMaker = document.getElementById('pc-maker');
const makePcBtn = document.getElementById('make-pc-btn');
const noParty = document.getElementById('no-party');


let party = [];
let partyName = window.localStorage.getItem('selected');



function setUp () {
    partyNameBox.textContent = partyName;

    if (party.length < 1) {
        noParty.style.visibility = 'visible';
    }

}


window.onload = setUp ();

function showForm () {
    pcMaker.style.visibility = 'visible';
}

function addPc(e) {
    e.preventDefault;

    //validate
    let ret = validate();

    if (ret) {
        //document.getElementById('add-pc').submit();
        newPcName = document.getElementById('pc-name').value
        party.push({
            'pcName': newPcName,
            'pcClass': document.getElementById('pc-class').value,
            'pcLevel': document.getElementById('pc-level').value,
            'pcMaxHP': document.getElementById('pc-maxhp').value,
            'pcInitMod': document.getElementById('pc-init-mod').value,
            'pcAC': document.getElementById('pc-ac').value
        })

        noParty.style.display = 'none';

        //make a new li with the name
        let newPc = document.createElement('li'); 
        newPc.className = "name";
        newPc.appendChild(document.createTextNode(newPcName));
        pcList.appendChild(newPc);
        
        //reset form & hide it.

        document.getElementById('add-pc-form').reset();
        pcMaker.style.visibility = 'hidden';

        window.localStorage.setItem( partyName, JSON.stringify(party))

    }
   
}

function validate(e){
    return true;
}

function testThis() {
    console.log(party);
}

makePcBtn.addEventListener("click", showForm);
sumbitBtn.addEventListener("click", addPc);

testBtn.addEventListener("click", testThis );

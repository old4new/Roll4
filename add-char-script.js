// Javascript document

const sumbitBtn = document.getElementById('add-pc-btn');
const clearBtn = document.getElementById('clear-btn');
const testBtn = document.getElementById('test-button');
const pcList = document.getElementById('pc-list');

let party = [];
let partyName = "";

function newParty () {
    partyName = "Apocolypse";
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

        let newPc = document.createElement('li'); //create 
        newPc.className = "name";
        newPc.appendChild(document.createTextNode(newPcName));
        pcList.appendChild(newPc);
        
        //pcList.li.innerText = document.getElementById('pc-name').value;

        document.getElementById('add-pc-form').reset();

    

    }
   
}

function validate(e){
    return true;
}

function testThis() {
    console.log(party);
}

sumbitBtn.addEventListener("click", addPc);

testBtn.addEventListener("click", testThis );

// button start
//let start = document.querySelector('.start');
let nameP = document.querySelector('.name-player span '); 
document.querySelector('.start span').addEventListener('click',function(){

    let namePlayer = prompt ('what\'s your name : ');
    if(namePlayer == null | namePlayer == ''){
        nameP.innerHTML='User';
    }else{
        //nameP.append(namePlayer);
        nameP.innerHTML=namePlayer;
    }
    //حذف العنصر 
    //start.style.display= 'none';
    //start.remove();
    document.querySelector('.start').remove()
})


////////// التوزيع العشعوائي ///////////////
let duration = 1000;
let continerBox = document.querySelector('.continer-box');
//انشاء جدول من الابناء
let boxs = Array.from(continerBox.children);
//let orderRange = [...Array(box.length).keys()];

let orderRange = Array.from(Array(boxs.length).keys());

shuffle(orderRange);

// add order css to the elemente (box)
boxs.forEach((box, index )=>{
    box.style.order = orderRange[index];

    //اضافة حدث القلب 
    box.addEventListener('click', function(){
        flipbox(box);
    });
});


// shuffle function 
function shuffle(array){
    let current = array.length;
    let temp,
        random;

   while(current > 0){
        // create random nmb
        random = Math.floor(Math.random() * current);
        current--;
        // swap
        //temp = array[current];
        //array[current] =array[random];
        //array[random] = temp;
        // Swap using destructuring
        [array[current], array[random]] = [array[random], array[current]];
   }
   return array;
}

// دالة قلب العناصر ///////////

// from chat gpt 
//document.querySelectorAll('.box').forEach(box => {
//    box.addEventListener('click', function () {
//        this.classList.toggle('flipped');
//    });
//});

// from vidio
function flipbox(selectedBox){
    // add class flipped
    selectedBox.classList.add('flipped');

    // تحديد كل العناصر التي تملك كلاس (flipped)
    let allBoxFlip = boxs.filter(boxFlip=>boxFlip.classList.contains('flipped'));
    
    // اذا كان عدد العناصر 2 يطبق
    if(allBoxFlip.length === 2){
        // ايقاف خاصية القلب لباقي العاصر 
        stopClick()
        //التحقق من تطابق العنصرين   
        MathBox(allBoxFlip[0], allBoxFlip[1]);      
    }

    setTimeout(() => {
        let allBoxMach = boxs.filter(box => box.classList.contains('match'));
        if(allBoxMach.length === boxs.length){
            document.getElementById('Victory').play();
            console.log('victory');
        }
    }, 1100);
}

// دالة ايقاف القلب 
function stopClick(){
    continerBox.classList.add("stopClicking");   
    setTimeout(() =>{
        // remove class stopClicking
        continerBox.classList.remove('stopClicking');
    },1000)
}

// دالة التحقق 
function MathBox(firstBox, secondBox){
    let attempt = document.querySelector('.attempts span');

    if (firstBox.dataset.cat === secondBox.dataset.cat ){
        firstBox.classList.remove('flipped');
        secondBox.classList.remove('flipped');
        firstBox.classList.add('match');
        secondBox.classList.add('match');
        document.getElementById('success').play();

    }else{
        //تحويله الى قيمة عددية واضافة 1
        attempt.innerHTML = parseInt(attempt.innerHTML) + 1;
        setTimeout(() =>{
            firstBox.classList.remove('flipped');
            secondBox.classList.remove('flipped');
        },1000)
        document.getElementById('field').play();
    }
}
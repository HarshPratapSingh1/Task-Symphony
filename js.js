const allCheckBox=document.querySelectorAll('.checkBox');
const inputFields=document.querySelectorAll('.goalInput');
const error=document.querySelector('.para2');
const track=document.querySelector('.tracker-value');
const para1=document.querySelector('.para1');

allCheckBox.forEach((e)=>{
    e.addEventListener('click',(ev)=>{
        let isFilled=[...inputFields].every((input)=>{
            return input.value;
        })
        if(isFilled) {
            e.parentElement.classList.toggle('completed');
            const inputClass=e.nextElementSibling.classList[1]
            allGoals[inputClass].completed=!allGoals[inputClass].completed
             goalDone=Object.values(allGoals).filter((goal)=>{
                return goal.completed;
            }).length
            track.style.width=`${(goalDone/3)*100}%`;
            track.firstElementChild.innerText=`${goalDone}/3 completed`
            if(goalDone==1){
                para1.innerText='Well begun is half done!'
            }else if(goalDone==2){
                para1.innerText='Just One Step Away'
            }
            else if(goalDone==3){
                para1.innerText='Whoa! You just completed all your goals,time to chill :D'
            }else{
                para1.innerText='Raise the bar by completing your goal'   
            }
            localStorage.setItem('Task',JSON.stringify(allGoals))
        }
        else {
            error.parentElement.classList.add('errorLable');
        }
    })
}
)
const allGoals= JSON.parse(localStorage.getItem('Task'))||{
    in1:{
        name:'',
        completed:false
    },in2:{
        name:'',
        completed:false
    },in3:{
        name:'',
        completed:false
    }
};
let goalDone=Object.values(allGoals).filter((goal)=>{
    return goal.completed;
}).length
track.style.width=`${(goalDone/3)*100}%`;
track.firstElementChild.innerText=`${goalDone}/3 completed`

if(goalDone==1){
    para1.innerText='Well begun is half done!'
}
else if(goalDone==2){
    para1.innerText='Just One Step Away'
}
else if(goalDone==3){
    para1.innerText='Whoa! You just completed all your goals,time to chill :D'
}else{
    para1.innerText='Raise the bar by completing your goal'   
}   
inputFields.forEach((e)=>{
    e.value=allGoals[e.classList[1]].name

    if(allGoals[e.classList[1]].completed){
        e.parentElement.classList.add('completed')
    }
    e.addEventListener('focus',()=>{
        error.parentElement.classList.remove('errorLable');
    })
    e.addEventListener('input',(ev)=>{
        if(allGoals[e.classList[1]].completed){
            e.value=allGoals[e.classList[1]].name
            return
        }
        allGoals[e.classList[1]].name=e.value
        localStorage.setItem('Task',JSON.stringify(allGoals));
    })
})

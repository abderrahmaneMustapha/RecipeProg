form  =  document.getElementsByTagName('form')[0]
inputs = form.getElementsByTagName('input')
submit_btn = document.getElementById('submit-btn')

/// HELPERS
appendto_form = (inputs)=>{
     formData = new FormData()
     Array.prototype.forEach.call(inputs, element=>{
        name = element.name  || element.getAttribute('name') 
        value = element.getAttribute('value') || element.value
        console.log(name)
        if (value && name){
          
            formData.append(name, value)
        }
       
     })


     
     return new URLSearchParams(formData)
}

set_errors = (errors) =>{
    errors.forEach((element)=>{
       input = document.getElementsByName(element.param)[0]
       parent= input.parentNode
 
       if (!parent.getElementsByClassName('bg-danger')[0]){
        small = document.createElement('small')
        small.className = " p-1 mb-3 bg-danger text-white col-12 error"
        error_text = document.createTextNode(element.msg)
        small.appendChild(error_text)
        parent.insertBefore(small, input)
        }       
    
    })
}

remove_errors = ()=>{
    errors = document.getElementsByClassName('error')
    if (errors[0]){
        Array.prototype.forEach.call(errors, element=>{
            element.remove()
        })
    
    }
   
}


//Evenets and main fucntions
submit_btn.addEventListener('click', (e)=>{
    e.preventDefault()
    remove_errors()
    formData = appendto_form(inputs)
   
    console.log('submit btn clicked')
    fetch('/signup', {
        method : "POST",
        headers: {
            "Content-Disposition": "form-data",
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        body : formData,
    }).then((response)=>{
        if (!response.ok){
            return response.json()
          
        }
        else{
            return response.json()
        }
        
       
    }).then((data)=>{
        
       if (data){
           if(data.url) window.location.replace(data.url)
           if(data.errors) set_errors(data.errors)        
       }
        
    })
})


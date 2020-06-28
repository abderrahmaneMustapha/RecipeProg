nav_registrations = document.getElementsByClassName('nav-registration')
form  =  document.getElementsByTagName('form')[0]
inputs = form.getElementsByTagName('input')
signup_submit_btn = document.getElementById('signup-submit-btn')
login_submit_btn = document.getElementById('login-submit-btn')

remove_class= (elements , class_name)=>{
    Array.prototype.forEach.call(elements, element=>{
        element.classList.remove(class_name)
    })
}


Array.prototype.forEach.call(nav_registrations, element=>{
  
    element.addEventListener('click', (e)=>{
        remove_class(nav_registrations, 'active')
        e.path[0].className+=  " active"
        id = e.path[0].getAttribute('goto')
        document.getElementsByClassName('d-show')[0].className="d-none"
        document.getElementById(id).className="d-show"
        
        form  =  document.getElementById(`${id}-form`)
        inputs = form.getElementsByTagName('input')
      
        signup_submit_btn = document.getElementById('signup-submit-btn')
        login_submit_btn = document.getElementById('login-submit-btn')


    })
})


//////////// REEGISTRATION PART

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
       input = document.querySelectorAll(`[name=${element.param}]`)[0]
       console.log(input)
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
/// HELPERS end

//  fetch data 
fetch_signup = (formData)=>{
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
}
fetch_login = (formData)=>{
    fetch('/login', {
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
}
// end fetch data

//Evenets and main fucntions
signup_submit_btn.addEventListener('click', (e)=>{
    e.preventDefault()
    remove_errors()
    formData = appendto_form(inputs)
    fetch_signup(formData)
   
})

login_submit_btn.addEventListener('click', (e)=>{
    e.preventDefault()
    remove_errors()
    formData = appendto_form(inputs)
    Array.prototype.forEach.call(inputs, element=>{
        console.log(element.value)
    })
    fetch_login(formData)
   
})

//Evenets and main fucntions end

// hide and show side bar //

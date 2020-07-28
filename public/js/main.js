

nav_registrations = document.getElementsByClassName('nav-registration')
form  =  document.getElementsByTagName('form')[0] 

if(form) {
inputs = form.getElementsByTagName('input')
textareas = form.getElementsByTagName('textarea')
signup_submit_btn = document.getElementById('signup-submit-btn')
login_submit_btn = document.getElementById('login-submit-btn')
add_recipe_submit_btn = document.getElementById('add-recipe-submit-btn')


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
appendto_form = (inputs,formData)=>{
     
     Array.prototype.forEach.call(inputs, element=>{
        name = element.name  || element.getAttribute('name') || element.id
        value = element.getAttribute('value') || element.value
      
        if (value && name){
          
            formData.append(name, value)
        }
       
     })

     return new URLSearchParams(formData)
}

set_errors = (errors) =>{
    errors.forEach((element)=>{
       input = document.querySelectorAll(`[name=${element.param}]`)[0]
        console.log(errors)
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
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/signup', {
        method : "POST",
        headers: {
            "Content-Disposition": "form-data",
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'CSRF-Token': token
          },
        body : formData,
    }).then((response)=>{
    
            return response.json()
        
       
    }).then((data)=>{
        
       if (data){
           if(data.url) window.location.replace(data.url)
           if(data.errors) set_errors(data.errors)        
       }
        
    })
}
fetch_login = (formData)=>{
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/login', {
        method : "POST",
        headers: {
            "Content-Disposition": "form-data",
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'CSRF-Token': token
          },
        body : formData,
    }).then((response)=>{
       
            return response.json()
        
       
    }).then((data)=>{
        
       if (data){
           if(data.url) window.location.replace(data.url)
           if(data.errors) set_errors(data.errors)        
       }
        
    })
}
fetch_add_recipe = (formData)=>{
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/recipe/add/', {
        method : "POST",
        headers: {
            "Content-Disposition": "form-data",
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'CSRF-Token': token
          },
        body : formData,
    }).then((response)=> { 

        return response.json()})
    .then((data)=>{
       if (data.data){
        message = document.getElementById('modal-add-message') 
        setTimeout(()=>{
            message.className='alert alert-success'
            message.setAttribute('role', 'alert')
            message.innerText = data.data 
        }, 400)
       
          
       }
       else{
        set_errors(data.errors) 
       }
        
    }).catch((err)=>{
        console.log(err)
    })   
}
// end fetch data

//Evenets and main fucntions
// login or signup
if(signup_submit_btn && login_submit_btn ){
    signup_submit_btn.addEventListener('click', (e)=>{
        e.preventDefault()
        remove_errors()
        formData = new FormData()
        formData = appendto_form(inputs,formData)
        fetch_signup(formData)
    })
    
    login_submit_btn.addEventListener('click', (e)=>{
        e.preventDefault()
        remove_errors()
        formData = new FormData()
        formData = appendto_form(inputs,formData)
       
        fetch_login(formData)
    })
    
}
//add recipes
if(add_recipe_submit_btn)
{
    add_recipe_submit_btn.addEventListener('click', (e)=>{
        e.preventDefault()
        remove_errors()
        notes  = document.getElementById('notes')
    
        formData = new FormData()
        formData = appendto_form(inputs,formData)
        formData.append("notes" , notes.value)
        
        fetch_add_recipe(formData)
    })
}

//Evenets and main fucntions end
}   
// hide and show side bar //
document.getElementById('side-nav-hideshow').addEventListener('click', e=>{
    side_nave = document.getElementById('side-bar')
    main_page = document.getElementById('main-page')
    if(side_nave.className.includes('d-none')){
        side_nave.classList.remove('d-none')
        side_nave.classList.add('fadeInRight');
        main_page.classList.remove('wv-100')
        main_page.classList.add('w-80')
    }else{
        side_nave.classList.add('d-none')
        main_page.classList.add('wv-100')
        side_nave.classList.remove('fadeInRight');
        main_page.classList.remove('w-80')
    }

})


// drag and drop

file_inputs_drop  = document.getElementsByClassName('file-input')
if (file_inputs_drop[0]){

    window.addEventListener("dragover",function(e){
        e = e 
        e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
        e = e 
        e.preventDefault();
    },false);
    
    delete_el = (element, tag)=>{
        label = element.getElementsByTagName(tag)[0]
        if(label) {element.removeChild(label)}
        else{
            other = element.getElementsByClassName(tag)[0]
            if(other) element.removeChild(other)
        }
       
        
    }
    
    handle_file = (element,file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function fileReadCompleted() {     
                delete_el(element,'label')
                delete_el(element,'droped-image')
                const img = new Image();          // creates an <img> element
                img.src = reader.result;         // loads the data URL as the image source
                img.className = "droped-image"
                element.appendChild(img);   // adds the image to the body        
            
        };
    }

    file_inputs_drop  = document.getElementsByClassName('file-input')
    Array.prototype.forEach.call(file_inputs_drop, element=>{
        input=  element.getElementsByTagName('input')[0]
        element.addEventListener('drop', event=>{
            handle_file(element,event.dataTransfer.files[0])
            element.getElementsByTagName('input')[0].files += event.dataTransfer.files
    
            console.log(element.getElementsByTagName('input')[0].files)
        })
        
        /// get input inside this element
        input.addEventListener('change', event=>{
            handle_file(element,event.target.files[0],)
        })
    })
}

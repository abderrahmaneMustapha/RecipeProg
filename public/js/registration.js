form  =  document.getElementsByTagName('form')[0]
inputs = form.getElementsByTagName('input')
submit_btn = document.getElementById('submit-btn')

appendto_form = (inputs)=>{
     formData = new FormData()
     Array.prototype.forEach.call(inputs, element=>{
        name = element.name  || element.getAttribute('name') 
        value = element.getAttribute('value') || element.value
        if (value && name){
          
            formData.append(name, value)
        }
       
     })

     // append data to the form "client side"
     formData = new FormData()
     formData.append(name, value)
     
     return new URLSearchParams(formData)
}

submit_btn.addEventListener('click', (e)=>{
    e.preventDefault()
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
            console.log(response.statusText)
        }
        
        return response
    }).then((response)=>{
        if(response.ok && response.status == 200){
            console.log("success")
        }
    })
})


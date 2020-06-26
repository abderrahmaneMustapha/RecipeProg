nav_registrations = document.getElementsByClassName('nav-registration')


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


    })
})


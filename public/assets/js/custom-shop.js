window.addEventListener("DOMContentLoaded", function(event) {
	
		// Dom get element

		const addToCartForms = document.querySelectorAll('.add-to-cart');
		const addToCartArr = [...addToCartForms];

	 	//add events to elements on the DOM 

        addToCartArr.forEach( elem =>{
            elem.addEventListener('submit', addToCart)
        });

});


async function addToCart(e){
  e.preventDefault();
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  console.log(e);
    const productId = e.target.productId.value;
    const quantity = e.target.quantity.value;
    const csrf = e.target._csrf.value;
    const addToCartAlert = e.target.firstElementChild;
    console.log(e.target.firstElementChild);
    const config = {
        credentials: 'same-origin',
        headers: {
          'CSRF-Token': token ,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({productId,quantity})
      }
       try {
           const response = await fetch('/shop/cart/add',config);
           const data = await response.json();
           addToCartAlert.classList.remove('d-none');
           addToCartAlert.innerText = data.message;
           setTimeout(() => {
            addToCartAlert.classList.add('d-none');
            location.reload();
            }, 1000);
           
           console.log(data)
            } catch(e) {
              console.log(e);
            }
  }
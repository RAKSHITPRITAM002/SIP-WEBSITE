// Handle the SIP form submission
document.getElementById('sipForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get form data
    const amount = document.getElementById('amount').value;
    const frequency = document.getElementById('frequency').value;
    const startDate = document.getElementById('startDate').value;
    const email = document.getElementById('email').value;
  
    // Store or send the data to the server (this part can be enhanced with backend integration)
  
    // Show confirmation message
    document.getElementById('confirmationMessage').style.display = 'block';
  
    // Hide the SIP form
    document.getElementById('sipForm').style.display = 'none';
  
    // Show PayPal Payment section
    document.getElementById('paymentSection').style.display = 'block';
  
    // Dynamically set the amount for PayPal payment
    renderPaypalButton(amount);
  });
  
  // PayPal Button Integration
  function renderPaypalButton(amount) {
    paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount // Pass the amount from SIP form
            }
          }]
        });
      },
  
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Payment successful! Thank you, ' + details.payer.name.given_name);
          // You can enhance this with further logic, e.g., updating a database, sending confirmation emails, etc.
        });
      },
  
      onError: function(err) {
        console.error('Error during payment:', err);
        alert('Payment failed. Please try again.');
      }
    }).render('#paypal-button-container');  // Renders the PayPal button in the specified container
  }
  
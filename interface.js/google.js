google.accounts.id.initialize({
    client_id: 'YOUR_CLIENT_ID',
    callback: handleCredentialResponse,
  });
  
  function handleCredentialResponse(response) {
    var credential = response.credential;
    // Use the credential object to access user information
    console.log(credential);
  
    // Perform necessary actions with the user information
  }
  
  google.accounts.id.renderButton(
    document.getElementById('g-id-button'),
    { theme: 'filled_blue', size: 'large' }
  );
  
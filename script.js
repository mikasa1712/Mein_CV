document.addEventListener('DOMContentLoaded', function() {

    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);                    
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async function checkLogin() {
        const eingabeField = document.getElementById('passwordInput');
        if (!eingabeField) return;

        const eingabe = eingabeField.value;
        const errorMsg = document.getElementById('loginError');

        const korrekterHash = "92f60898a68ae967d9f079053b1370af4d90efb58fc48fa39ea03fa80c069f7f";
        
        const eingabeHash = await sha256(eingabe);
        
        if (eingabeHash === korrekterHash) {
            if (errorMsg) errorMsg.style.display = 'none';
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('cv-content').style.display = 'block';
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
        }
    }

    const submitLoginBtn = document.getElementById('submitLoginBtn');
    if (submitLoginBtn) {
        submitLoginBtn.addEventListener('click', checkLogin);
    }

    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(event) {
  
            if (event.key === 'Enter') {
                checkLogin();
            }
        });
    }
})
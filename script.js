
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const message = document.getElementById('login-message');
            if (username === 'student1' && password === 'student1') {
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('welcome-container').style.display = 'block';
            } else {
                message.textContent = 'Invalid username or password.';
            }
        });
    }

    var assessmentForm = document.getElementById('assessment-form');
    if (assessmentForm) {
        assessmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Store answers 1-5
            for (let i = 1; i <= 5; i++) {
                const val = document.querySelector('input[name="q' + i + '"]:checked').value;
                localStorage.setItem('q' + i, val);
            }
            window.location.href = 'page2.html';
        });
    }

    var assessmentForm2 = document.getElementById('assessment-form-2');
    if (assessmentForm2) {
        assessmentForm2.addEventListener('submit', function(e) {
            e.preventDefault();
            // Store answers 6-10
            let total = 0;
            for (let i = 6; i <= 10; i++) {
                const val = document.querySelector('input[name="q' + i + '"]:checked').value;
                localStorage.setItem('q' + i, val);
            }
            // Calculate average
            for (let i = 1; i <= 10; i++) {
                total += parseInt(localStorage.getItem('q' + i) || '0');
            }
            const avg = total / 10;
            // Randomizer for college program suggestion
            const programs = [
                'BS Information Technology (BSIT)',
                'BS Computer Science (BSCS)',
                'BS Information Systems (BSIS)',
                'BS Entertainment and Multimedia Computing (BSEMC)',
                'BS Computer Engineering (BSCpE)',
                'BS Data Science',
                'BS Cybersecurity',
                'ICT-related short courses or certifications'
            ];
            let suggestion = '';
            if (avg >= 4.0) {
                suggestion = 'Suggested Track: Academic - ICT Strand<br>Suggested Program: ' + programs[Math.floor(Math.random() * 3)];
            } else if (avg >= 3.0) {
                suggestion = 'Suggested Track: Academic - STEM or ICT Strand<br>Suggested Program: ' + programs[Math.floor(Math.random() * 5)];
            } else if (avg >= 2.0) {
                suggestion = 'Suggested Track: TVL - ICT Strand<br>Suggested Program: ' + programs[Math.floor(Math.random() * 7)];
            } else {
                suggestion = 'Suggested Track: TVL - ICT Strand<br>Suggested Program: ' + programs[7];
            }
            assessmentForm2.style.display = 'none';
            var loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) loadingScreen.style.display = 'block';
            setTimeout(function() {
                if (loadingScreen) loadingScreen.style.display = 'none';
                var message2 = document.getElementById('assessment-message-2');
                if (message2) message2.innerHTML = 'Thank you for completing the pre-assessment!<br>' + suggestion;
                // Remove (Questions 6-10) from the heading
                var heading = document.querySelector('.welcome-container h2');
                if (heading && heading.textContent.includes('Questions 6-10')) {
                    heading.textContent = 'Pre-Assessment';
                }
                // Optionally clear localStorage
                for (let i = 1; i <= 10; i++) localStorage.removeItem('q' + i);
            }, 2000);
        });
    }
});

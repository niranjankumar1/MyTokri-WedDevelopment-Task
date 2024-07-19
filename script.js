document.addEventListener('DOMContentLoaded', () => {
    const continueButton = document.getElementById('continueButton');
    const loadingDiv = document.getElementById('loading');
    const resultDiv = document.getElementById('result');

    continueButton.addEventListener('click', () => {
        loadingDiv.style.display = 'flex';
        resultDiv.innerHTML = '';
        fetchData();
    });

    function fetchData() {
        const msisdn = document.getElementById('mobile-number').value;
        const apiUrl = 'http://localhost:3000/proxy';

        if (!msisdn) {
            alert("Please enter a mobile number.");
            loadingDiv.style.display = 'none';
            return;
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-encryption-key': 'FtmJ7frzTyWOzintybbqIWzwwclcPtaI',
                'Authorization': `Bearer 0e186445-0647-417c-ae27-8098533f1914`
            },
            body: JSON.stringify({
                campaignId: '6a0fa162-fb4c-4074-a6d4-402744e3590b',
                msisdn: msisdn
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = `<p>The number you have entered is not correct, please check the number and try again.</p>`;
        })
        .finally(() => {
            loadingDiv.style.display = 'none';
        });
    }

    function displayResult(data) {
        if (data.Error) {
            resultDiv.innerHTML = `<p>${data.MessageToShow}</p>`;
            return;
        }

        const nextAction = data.NextAction;
        resultDiv.innerHTML = `
            <p>Description: ${data.Description}</p>
            <p>Message: ${data.MessageToShow}</p>
            <p>Action: ${nextAction.Name}</p>
        `;

        if (nextAction.Disclaimers) {
            resultDiv.innerHTML += `
                <p>Header Info: ${decodeURIComponent(nextAction.Disclaimers.headerInfo)}</p>
                <p>Middle Info: ${decodeURIComponent(nextAction.Disclaimers.middleInfo)}</p>
                <p>Footer Info: ${decodeURIComponent(nextAction.Disclaimers.footerInfo)}</p>
            `;
        }

        if (nextAction.PrivacyPolicy) {
            resultDiv.innerHTML += `<p><a href="${nextAction.PrivacyPolicy}" target="_blank">Privacy Policy</a></p>`;
        }

        if (nextAction.TermsAndConditions) {
            resultDiv.innerHTML += `<p><a href="${nextAction.TermsAndConditions}" target="_blank">Terms and Conditions</a></p>`;
        }
    }
});

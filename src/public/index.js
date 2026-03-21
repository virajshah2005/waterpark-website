const e = require("express");
var obj

function redeem() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = Number(document.getElementById("phone").value);
    let date = document.getElementById("date").value;

    let n_adults = Number(document.getElementById("adults").value);
    let n_children = Number(document.getElementById("children").value);
    let room_type = document.getElementById("rooms").value;
    let n_rooms = Number(document.getElementById("n_rooms").value);
    let promo = document.getElementById("promo").value;

    let amount = (n_adults * 1000) + (n_children * 500);

    // rooms
    if (room_type == 'Super Delux') {
        amount = amount + (1200 * n_rooms);
    }

    else if (room_type == 'Delux') {
        amount = amount + (600 * n_rooms);
    }

    else if (room_type == 'Locker') {
        amount = amount + (100 * n_rooms);
    }

    else if (room_type == 'nil') {
        alert("Room cannot be nil")
    }

    else {
        console.log('kuch nhi')
    }

    let raw_amount = amount

    // promo code
    if (promo == "FAMILYTYM") {
        if (n_adults + n_children < 6) {
            alert("Promo code can be applied for more than 5 members only.")
            document.getElementById("promo").innerHTML = ""
        }
        else {
            amount = amount - (amount * 0.15)
        }
    }

    else if (promo == "FANTASTIC5") {
        if (n_adults + n_children != 5) {
            alert("Total 5 members required if FANTASTIC5 promocode is used.");
        }
        else {
            amount = amount - (amount * 0.10)
        }
    }

    else if (promo == "HUMDUS") {
        if (n_adults + n_children != 10) {
            alert("Total 10 members required if HUMDUS promocode is used.");
        }
        else {
            amount = amount - (amount * 0.15)
        }
    }

    else if (promo == "") {
        promo = 'null'
    }

    else if (promo = null) {
        promo = 'null'
    }

    else {
        alert("Invalid Promo Code")
    }

    document.getElementById("total_amount").innerHTML = amount;

    obj = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        date: date,
        n_adults: n_adults,
        n_children: n_children,
        room_type: room_type,
        n_rooms: n_rooms,
        raw_amount: raw_amount,
        promo: promo,
        amount: amount
    }
}

function pay() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }
    fetch('/bookingDetails', options)
}

function sendEmail() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let emailData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function () {
        console.log(xhr.responseText);
        if (xhr.responseText == "success") {
            alert("Email Sent Successfully");
            name = '';
            email = '';
            subject = '';
            message = '';
        }
        else {
            alert("Something went wrong, please try again.")
        }
    }
    xhr.send(JSON.stringify(emailData));
}

function cancel() {
    const rbs = document.querySelectorAll('input[name="radio"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    
    let poid = document.getElementById("poid").value;
    let bid = document.getElementById("bid").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = Number(document.getElementById("phone").value);
    let date = document.getElementById("date").value;

    obj = {
        radioOption: selectedValue,
        poid: poid,
        bid: bid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }
    fetch('/cancelDetails', options)
}
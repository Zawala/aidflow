$( "#submit" ).click(function (event) {
    event.preventDefault();  

    // Select all form data
    var formData = $('form').serialize();

    $.ajax({
        url: "/api/method/aidflow.www.Interests.upload_interests",
        type: "POST",
        data: formData,
        headers: {
            'X-Frappe-CSRF-Token': '{{csfr_token}}'
        },
        success: function(r) {
            frappe.msgprint('Profile Created');
            window.location.href = '/landing.html';
        },
        error: function(xhr, status, error) {
            frappe.throw("Error Creating Profile: " + error);
        }
    });
});
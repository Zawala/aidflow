$( "#submit" ).click(function (event) {
    event.preventDefault();  

    // Get selected values
    var thematic = $("#thematic").find(":selected").val();
    var province = $("#province").find(":selected").val();

    // Validate input fields
    var isValid = validateInputs(thematic, province);

    if (isValid) {
        var args = {
            'description': $("#description").val(),
            'title': $("#title").val(),
            'thematic': thematic,
            'province': province
        };
        $.ajax({
            url: "/api/method/aidflow.www.upload_issue.upload_issue",
            type: "POST",
            data: args,
            headers: {
                'X-Frappe-CSRF-Token': '{{csfr_token}}'
            },
            success: function(r) {
                frappe.msgprint('Issue uploaded');
                $("#description").val('');

                // Clear title field
                $("#title").val('');
            
                // Clear thematic select
                $("#thematic").val('').trigger('change');
            
                // Clear province select
                $("#province").val('').trigger('change');
            },
            error: function(xhr, status, error) {
                frappe.throw("Error uploading issue: " + error);
            }
        });
    } else {
        // Show error message if validation fails
        frappe.throw("Please fill all required fields", "error");
    }
        
   
});

function validateInputs(thematic, province) {
    // Check if all fields have values
    return !!thematic && !!province && 
           !!$("#title").val() && 
           !!$("#description").val();
}
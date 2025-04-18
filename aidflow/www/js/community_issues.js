$(document).ready(function() {
    const capsuleCard = document.getElementById('capsule_card');
    const childCount = capsuleCard.children.length;

    console.log(`Number of child elements: ${childCount}`);

    // Initialize allChildren with the correct value
    const allChildren = capsuleCard.children.length;
    $.ajax({
        url: "/api/method/aidflow.www.community_issues.custom_search",
        type: "POST",
        data: {
            number: allChildren,
            search: $("#search_field").val(),
            thematic_area: $("#thematic").val(),
            provice: $("#province").val()
        },
        headers: {
            'X-Frappe-CSRF-Token': '{{ csfr_token }}'
        },
        success: function(r) {
            posts = r.message;
            
            // Create a new row container
            let currentRow = document.createElement('div');
            currentRow.className = 'row equal-height-row';
            capsuleCard.appendChild(currentRow);
            
            posts.forEach((post, index) => {
                // Start a new row every 3 items (since you're using col-md-4)
                if (index > 0 && index % 3 === 0) {
                    currentRow = document.createElement('div');
                    currentRow.className = 'row equal-height-row';
                    capsuleCard.appendChild(currentRow);
                }
                
                const col = document.createElement('div');
                col.className = 'post-item col-md-4 col-xs-12 col-sm-6 mb-4 d-flex';
                
                const thumbnailSrc = post[4] ? `${post[4]}` : "images/organisation-placeholder.svg";
                var liked_by = post[5] ? decodeURI(post[5]) : "[]";
                liked_by = JSON.parse(liked_by);
                if (!liked_by || liked_by === null) {
                    var liked_by_length = 0;
                } else {
                    var liked_by_length = liked_by.length;
                }
                if (liked_by.includes("{{user}}")) {
                    var special_class = 'fa fa-heart';
                } else {
                    var special_class = 'fa fa-heart-o';
                }
                
                col.innerHTML = `
                    <div class="card h-100 w-100">
                        <div class="card-header p-0">
                            <img src="${thumbnailSrc}" class="img-responsive card-img-top" style="height: 200px; object-fit: cover;" alt="image"/>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title">${post[1]}</h3>
                            <p class="card-text flex-grow-1"> ${post[2] ? post[2].substring(0, 100) + (post[2].length > 100 ? '...' : '') : 'No description available'}</p>
                            <div class="mt-auto">
                                <div class="pull-left">
                                    <a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}">
                                        <span class="read-more">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="pull-right">
                                <button style="background: none; cursor: pointer; padding: 0;" 
                                    id="${post[0]}" class="btn btn-borderless btn_like">
                                    <i id="${post[0]}_icon" class="${special_class}"></i>
                                </button>
                                <small id="${post[0]}_count">${liked_by_length}</small>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                `;
                
                currentRow.appendChild(col);
            });
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
});

    $( "#load" ).click(function (event) {
        event.preventDefault();
        console.log("jonny bones");
        const capsuleCard = document.getElementById('capsule_card');
        const childCount = capsuleCard.children.length;
    
        console.log(`Number of child elements: ${childCount}`);
    
        // Initialize allChildren with the correct value
        const allChildren = capsuleCard.children.length;
        $.ajax({
            url: "/api/method/aidflow.www.community_issues.custom_search",
            type: "POST",
            data: {
                number: allChildren,
                search: $("#search_field").val(),
                thematic_area: $("#thematic").val(),
                provice: $("#province").val()
            },
            headers: {
                'X-Frappe-CSRF-Token': '{{csfr_token}}'
            },
            success: function(r) {
                posts = r.message;
            
            posts.forEach(post => {
                const col = document.createElement('div');
                col.className = 'post item col-md-4 col-xs-12 col-sm-4"';
                
                const thumbnailSrc = post[4] ? `${post[4]}` : "images/organisation-placeholder.svg";
                var liked_by = post[5] ? decodeURI(post[5]) : "[]";
                liked_by = JSON.parse(liked_by);
                if (!liked_by || liked_by === null) {
                    var liked_by_length = 0;
                }else{
                    var liked_by_length=liked_by.length;
                }
                if (liked_by.includes("{{user}}")){
                    var special_class='fa fa-heart';
                }else{
                    var special_class='fa fa-heart-o';
                }
                col.innerHTML = `
                    <div class="card h-100 w-100">
                        <div class="card-header p-0">
                            <img src="${thumbnailSrc}" class="img-responsive card-img-top" style="height: 200px; object-fit: cover;" alt="image"/>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title">${post[1]}</h3>
                            <p class="card-text flex-grow-1"> ${post[2] ? post[2].substring(0, 100) + (post[2].length > 100 ? '...' : '') : 'No description available'}</p>
                            <div class="mt-auto">
                                <div class="pull-left">
                                    <a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}">
                                        <span class="read-more">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="pull-right">
                                <button style="background: none; cursor: pointer; padding: 0;" 
                                    id="${post[0]}" class="btn btn-borderless btn_like">
                                    <i id="${post[0]}_icon" class="${special_class}"></i>
                                </button>
                                <small id="${post[0]}_count">${liked_by_length}</small>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                `;
                
                    capsuleCard.appendChild(col);
            });
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
    
        });


        $( "#search" ).click(function (event) {
            event.preventDefault();  
            $("#capsule_card").empty();
            const capsuleCard = document.getElementById('capsule_card');
            const childCount = capsuleCard.children.length;
        
            console.log(`Number of child elements: ${childCount}`);
        
            // Initialize allChildren with the correct value
            const allChildren = capsuleCard.children.length;
            console.log(allChildren);
          
            $.ajax({
                url: "/api/method/aidflow.www.community_issues.custom_search",
                type: "POST",
                data: {
                    number: allChildren,
                    search: $("#search_field").val(),
                    thematic_area: $("#thematic").val(),
                    registration_type: $("#registration-type").val(),
                    provice: $("#province").val()
                },
                headers: {
                    'X-Frappe-CSRF-Token':  '{{csfr_token}}'
                },
                success: function(r) {
                    posts = r.message;
                
                console.log(posts);
                posts = r.message;
            
            posts.forEach(post => {
                const col = document.createElement('div');
                col.className = 'post item col-md-4 col-xs-12 col-sm-4"';
                
                const thumbnailSrc = post[4] ? `${post[4]}` : "images/organisation-placeholder.svg";
                var liked_by = post[5] ? decodeURI(post[5]) : "[]";
                liked_by = JSON.parse(liked_by);
                if (!liked_by || liked_by === null) {
                    var liked_by_length = 0;
                }else{
                    var liked_by_length=liked_by.length;
                }
                if (liked_by.includes("{{user}}")){
                    var special_class='fa fa-heart';
                }else{
                    var special_class='fa fa-heart-o';
                }
                col.innerHTML = `
                    <div class="card h-100 w-100">
                        <div class="card-header p-0">
                            <img src="${thumbnailSrc}" class="img-responsive card-img-top" style="height: 200px; object-fit: cover;" alt="image"/>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title">${post[1]}</h3>
                            <p class="card-text flex-grow-1"> ${post[2] ? post[2].substring(0, 100) + (post[2].length > 100 ? '...' : '') : 'No description available'}</p>
                            <div class="mt-auto">
                                <div class="pull-left">
                                    <a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}">
                                        <span class="read-more">Read More</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="pull-right">
                                <button style="background: none; cursor: pointer; padding: 0;" 
                                    id="${post[0]}" class="btn btn-borderless btn_like">
                                    <i id="${post[0]}_icon" class="${special_class}"></i>
                                </button>
                                <small id="${post[0]}_count">${liked_by_length}</small>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                `;
                
                    capsuleCard.appendChild(col);
            });
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                }
            });
        
            });

            $(document).on('click', '.btn_like', function(event) {
                event.stopPropagation();
                event.preventDefault();
            
                // Get the ID of the clicked button
                var buttonId = $(this).attr('id');
                var $btn = $("#" + buttonId + "_icon"); // The like icon
                var $count = $("#" + buttonId + "_count"); // The like count element
                const add = $($btn).hasClass("fa-heart-o") ? "Yes" : "No"; // Check current state
                var doctype = "Project"; // The doctype being liked
            
                console.log(add);
            
                $.ajax({
                    url: "/api/method/frappe.desk.like.toggle_like", // Replace with the correct method endpoint
                    type: "POST",
                    data: {
                        doctype: doctype,
                        name: buttonId,
                        add: add,
                    },
                    headers: {
                        'X-Frappe-CSRF-Token':  '{{csfr_token}}' // Use the global Frappe CSRF token
                    },
                    success: function(r) {
                        // Toggle the icon classes
                        $($btn).toggleClass("fa-heart-o", add === "No");
                        $($btn).toggleClass("fa-heart", add === "Yes");
            
                        // Update the like count
                        var currentCount = parseInt($($count).text(), 10) || 0; // Get current count
                        if (add === "Yes") {
                            currentCount += 1; // Increment count
                        } else if (add === "No") {
                            currentCount -= 1; // Decrement count
                        }
                        $($count).text(currentCount); // Update the count display
            
                        // Update in locals (form)
                        const doc = locals[doctype] && locals[doctype][buttonId];
                        if (doc) {
                            let liked_by = frappe.ui.get_liked_by(doc);
            
                            if (add === "Yes" && !liked_by.includes(frappe.session.user)) {
                                liked_by.push(frappe.session.user);
                            }
            
                            if (add === "No" && liked_by.includes(frappe.session.user)) {
                                liked_by = liked_by.filter((user) => user !== frappe.session.user);
                            }
            
                            doc._liked_by = JSON.stringify(liked_by);
                        }
                    },
                    error: function(xhr, status, error) {
                        frappe.msgprint("Error toggling like: " + error);
                    }
                });
            });
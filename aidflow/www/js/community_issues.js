
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
                     
                    <div class="panel">
                              <div class="panel-header">
                                 <img src=${thumbnailSrc} class="img-responsive"  alt="image"/>
                              </div>
                              <div class="panel-body">
                                   <h3 class="post-title"><a href="blog-post.html">${post[1]}</a></h3>

                                    <p>${post[2]}</p>
                                    <div class="pull-left"><a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}"><span class="read-more">Read More</span></a></div>
                              </div>
                              <div class="panel-footer">
                                <div class="pull-right">
                                <button style="background: none;  cursor: pointer; padding: 0;" 
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
                     
                    <div class="panel">
                              <div class="panel-header">
                                 <img src=${thumbnailSrc} class="img-responsive"  alt="image"/>
                              </div>
                              <div class="panel-body">
                                   <h3 class="post-title"><a href="blog-post.html">${post[1]}</a></h3>

                                    <p>${post[2]}</p>
                                    <div class="pull-left"><a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}"><span class="read-more">Read More</span></a></div>
                              </div>
                              <div class="panel-footer">
                                <div class="pull-right">
                                <button style="background: none;  cursor: pointer; padding: 0;" 
                                id="${post[0]}" class="btn btn-borderless btn_like">
                                <i class="${special_class}"></i>
                                </button>
                                    
                                    <small>${liked_by_length}</small>
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
                url: "/api/method/cso_database.www.organisations.custom_search",
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
                     
                    <div class="panel">
                              <div class="panel-header">
                                 <img src=${thumbnailSrc} class="img-responsive"  alt="image"/>
                              </div>
                              <div class="panel-body">
                                   <h3 class="post-title"><a href="blog-post.html">${post[1]}</a></h3>

                                    <p>${post[2]}</p>
                                    <div class="pull-left"><a class="btn btn-black btn-xs" href="/community_issue?name=${post[0]}"><span class="read-more">Read More</span></a></div>
                              </div>
                              <div class="panel-footer">
                                <div class="pull-right">
                                <button style="background: none;  cursor: pointer; padding: 0;" 
                                id="${post[0]}" class="btn btn-borderless btn_like">
                                <i class="${special_class}"></i>
                                </button>
                                    
                                    <small>${liked_by_length}</small>
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
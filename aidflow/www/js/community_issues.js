
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
            
            console.log(posts);
            posts.forEach(post => {
                const col = document.createElement('div');
                col.className = 'post item col-md-4 col-xs-12 col-sm-4"';
                
                const thumbnailSrc = post[4] ? `${post[4]}` : "images/organisation-placeholder.svg";
                var liked_by = liked_by ? decodeURI(post[5]) : "[]";
                console.log(post[5]);
                liked_by = JSON.parse(liked_by);
                if (!liked_by || liked_by === null) {
                    var liked_by_length = 0;
                }else{
                    var liked_by_length=liked_by.length;
                }
                col.innerHTML = `
                     
                    <div class="panel">
                              <div class="panel-header">
                                 <img src=${thumbnailSrc} class="img-responsive"  alt="image"/>
                              </div>
                              <div class="panel-body">
                                   <h3 class="post-title"><a href="blog-post.html">${post[1]}</a></h3>

                                    <p>${post[2]}</p>
                                    <div class="pull-left"><a class="btn btn-black btn-xs" href="/Issue?name=${post[0]}"><span class="read-more">Read More</span></a></div>
                              </div>
                              <div class="panel-footer">
                                <div class="pull-right">
                                    <a href="#"><i class="fa fa-heart"></i></a>
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
                
                console.log(posts);
                posts.forEach(post => {
                    const col = document.createElement('div');
                    col.className = 'post item col-md-4 col-xs-12 col-sm-4"';
                    
                    const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
                    const aim = post[1] ? `${post[1]}` : "None";
                    col.innerHTML = `
                         
                        <div class="panel">
                                  <div class="panel-header">
                                     <img src="img/blog-bg-school-01.jpg" class="img-responsive"  alt="image"/>
                                  </div>
                                  <div class="panel-body">
                                       <h3 class="post-title"><a href="blog-post.html">Volunteer Spotlight</a></h3>

                                        <p>Ac hendrerit ipsum pellentesque ut. Mauris orci ante, sodales ut lorem sed, semper aliquam diam. Sit amet tellus velit lacus purus.</p>
                                        <div class="pull-left"><a class="btn btn-black btn-xs" href="#"><span class="read-more">Read More</span></a></div>
                                  </div>
                                  <div class="panel-footer">
                                    <div class="pull-right">
                                        <a href="#"><i class="fa fa-heart"></i></a>
                                        <small>1658</small>
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
                    'X-Frappe-CSRF-Token': '{{ csfr_token }}'
                },
                success: function(r) {
                    posts = r.message;
                    
                    console.log(posts);
                    posts.forEach(post => {
                        const col = document.createElement('div');
                        col.className = 'col-lg-4 col-md-6 col-sm-6';
                        
                        const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
                        const aim = post[1] ? `${post[1]}` : "None";
                        col.innerHTML = `
                             
                            <div class="single-cases mb-40">
                                <div class="cases-img">
                                    <img src="${thumbnailSrc}" alt="">
                                </div>
                                <div class="cases-caption">
                                    <h3><a href="/organisation?name=${post[0]}">${post[0].substring(0, 30)}</a></h3>
                                    <!-- Progress Bar -->
                                    <div class="single-skill mb-15">
                                        <div class="bar-progress">
                                            <div id="bar1" class="barfiller">
                                                <div class="tipWrap">
                                                    <span class="tip"></span>
                                                </div>
                                                <span class="fill" data-percentage="70"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- / progress -->
                                    <div class="prices d-flex justify-content-between">
                                        <p>${aim.substring(0, 160)}</p>
                                    </div>
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
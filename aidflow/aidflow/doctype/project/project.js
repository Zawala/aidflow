// Copyright (c) 2025, zawala and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project", {

	
    onload_post_render: function(frm){
        frm.add_custom_button(__('Publish'), function(frm){
            if (cur_frm.is_dirty()) {
                frappe.show_alert('Save Link Doctype First')
            }
            frappe.call({
                method: "aidflow.aidflow.doctype.project.project.publish",
                args: {
                    'name': cur_frm.doc.name,
                    
                },
                freeze: true,
                callback: function(r) {
                    frappe.msgprint('Published')
                        }
                    }, 'primary');
                    
            },);
            frm.add_custom_button(__('Update Progress'), function(frm){
                if (cur_frm.is_dirty()) {
                    frappe.show_alert('Save Doctype First')
                }else{
                    switch(cur_frm.doc.progress.length) {
                        case 0:
                            stage='Initialize';
                            break;
                        case 1:
                            stage='Data Gathering';
                            break;
                        case 2:
                            stage='Analysis';
                            break;
                        case 3:
                           stage='Solution Proposition';
                            break;
                        case 4:
                            stage='Solution Approval';
                            break;
                        case 5:
                            stage='Solution Implementation';
                            break;
                        case 6:
                            stage='Completion';
                            break;
                        case 7:
                            frappe.throw('Project Complete');
                            break;
                        
                      } 
                      let d = new frappe.ui.Dialog({
                        title: 'Progress details',
                        fields: [
                            {
                                label: 'Stage',
                                fieldname: 'stage',
                                fieldtype: 'Select',
                                options: stage,
                                default:stage,
                                read_only: 1
                            },
                            {
                                label: 'Comment',
                                fieldname: 'comment',
                                fieldtype: 'Text',
                                reqd:true
                            },
                            
                        ],
                        size: 'small', // small, large, extra-large 
                        primary_action_label: 'Submit',
                        primary_action(values) {
                            console.log(values);
                            frappe.call({
                                method: "aidflow.aidflow.doctype.project.project.update_progress",
                                args: {
                                    'name': cur_frm.doc.name,
                                    'stage':values.stage,
                                    'comment':values.comment
                                    
                                },
                                freeze: true,
                                callback: function(r) {
                                    frappe.msgprint('Progress Updated')
                                    cur_frm.refresh()
                                        }
                                    }, 'primary');
                            d.hide();
                        }
                    });
                    
                    d.show();

                }
                        
                },"Progress Management");
                frm.add_custom_button(__('Remove Last Stage'), function(frm){
                    var length=cur_frm.doc.progress.length;
                    if (cur_frm.is_dirty()) {
                        frappe.show_alert('Save Doctype First')
                    }else if (length<=0){
                        frappe.throw("Progress Table empty")
                    }
                    else{
                        var lastObj=cur_frm.doc.progress[length-1]
                          frappe.warn('Are you sure you want to proceed?',
                            'This will remove the last progress update: '+lastObj.stage,
                            () => {
                                frappe.call({
                                    method: "aidflow.aidflow.doctype.project.project.remove_progress",
                                    args: {
                                        'name': cur_frm.doc.name,
                                        'stage':lastObj.stage,
                                        
                                    },
                                    freeze: true,
                                    callback: function(r) {
                                        frappe.msgprint('Stage Removed')
                                            }
                                        }, 'primary');
                            },
                            'Continue',
                            true // Sets dialog as minimizable
                        )
                        
                        
                         
                    }
                            
                    },"Progress Management");
        },
    
});




// Copyright (c) 2024, Akash and contributors
// For license information, please see license.txt

frappe.ui.form.on("Customer", {

    validate(frm) {
        frm.set_value('full_name', frm.doc.prefix + " " + frm.doc.first_name + " " + (frm.doc.middle_name ? frm.doc.middle_name : "") + " " + (frm.doc.last_name ? frm.doc.last_name : ""));
        frm.set_value("date", frappe.datetime.nowdate());
    }
});
